import re
from uuid import uuid4

import strawberry
from strawberry.types import Info

from app.models import Event, Member, Testimonial, TestimonialModel

from app.core.auth import db, extract_identity, is_admin_identity
from app.core.transforms import event_to_strawberry, work_history_to_strawberry


@strawberry.field
def viewMembers(name: str | None = None) -> list[Member]:
    if name and name.strip():
        members = list(db["members"].find({"name": name.strip()}))
    else:
        members = list(db["members"].find({}))

    result = []
    for member in members:
        member.pop("_id", None)
        member.pop("id", None)
        member["workHistory"] = [
            work_history_to_strawberry(wh) for wh in member.get("workHistory", [])
        ]

        try:
            result.append(Member(**member))
        except Exception:
            continue
    return result


@strawberry.field
def viewMember(identifier: str) -> Member | None:
    lookup = (identifier or "").strip()
    if not lookup:
        return None

    member = db["members"].find_one(
        {
            "$or": [
                {"email": lookup},
                {"rollNumber": lookup},
                {
                    "email": {
                        "$regex": f"^{re.escape(lookup.lower())}@",
                        "$options": "i",
                    }
                },
            ]
        }
    )
    if not member:
        return None

    member.pop("_id", None)
    member.pop("id", None)
    member["workHistory"] = [
        work_history_to_strawberry(wh) for wh in member.get("workHistory", [])
    ]

    try:
        return Member(**member)
    except Exception:
        return None


@strawberry.field
def viewEvents() -> list[Event]:
    events = list(db["events"].find({}))
    for event in events:
        event.pop("_id", None)

    result: list[Event] = []
    for event in events:
        try:
            result.append(event_to_strawberry(event))
        except Exception:
            continue
    return result


@strawberry.field
def viewEvent(event_name: str) -> Event | None:
    lookup = (event_name or "").strip()
    if not lookup:
        return None

    event = db["events"].find_one(
        {
            "$or": [
                {"event_name": lookup},
                {"event_name": {"$regex": f"^{re.escape(lookup)}$", "$options": "i"}},
            ]
        }
    )
    if not event:
        return None

    event.pop("_id", None)
    try:
        return event_to_strawberry(event)
    except Exception:
        return None


@strawberry.field
def isCurrentUserAdmin(info: Info) -> bool:
    identity = extract_identity(info)
    return is_admin_identity(identity["identities"])


@strawberry.field
def viewTestimonials() -> list[Testimonial]:
    testimonials = list(db["testimonials"].find({}))
    result: list[Testimonial] = []
    for testimonial in testimonials:
        try:
            testimonial.pop("_id", None)
            if not testimonial.get("id"):
                testimonial["id"] = str(uuid4())
                db["testimonials"].update_one(
                    {"name": testimonial.get("name")},
                    {"$set": {"id": testimonial["id"]}},
                )
            pydantic_model = TestimonialModel(**testimonial)
            result.append(Testimonial(**pydantic_model.model_dump()))
        except Exception:
            continue
    return result


@strawberry.field
def viewTestimonial(testimonial_id: str) -> Testimonial | None:
    testimonial = db["testimonials"].find_one({"id": testimonial_id})
    if not testimonial:
        return None
    testimonial.pop("_id", None)
    return Testimonial(**testimonial)


queries = [
    viewMembers,
    viewMember,
    viewEvents,
    viewEvent,
    isCurrentUserAdmin,
    viewTestimonials,
    viewTestimonial,
]
