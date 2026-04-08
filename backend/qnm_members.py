import strawberry

from database import get_database
from model_members import Member, MemberInput, Event, EventInput, Testimonial, TestimonialInput, WorkHistory
from qnm_events import mutations, queries

db = get_database()


def convert_work_history_dict_to_strawberry(wh_dict: dict) -> WorkHistory:
    """Convert a workHistory dict from MongoDB to a Strawberry WorkHistory object."""
    return WorkHistory(
        role=wh_dict.get("role", ""),
        team=wh_dict.get("team", ""),
        start=wh_dict.get("start", ""),
        end=wh_dict.get("end")
    )


@strawberry.mutation
def addMember(member: MemberInput) -> bool:
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.dict()
    db["members"].insert_one(member_data)
    return True


@strawberry.mutation
def changeMember(member: MemberInput) -> bool:
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.dict()
    db["members"].update_one(
        {"rollNumber": member.rollNumber},
        {"$set": member_data}
    )
    return True


@strawberry.field
def viewMembers(name: str | None = None) -> list[Member]:
    members = []
    if name and name != "":
        members = list(db["members"].find({"name": name.strip()}))
    else:
        members = list(db["members"].find({}))
    
    result = []
    for member in members:
        member.pop("_id", None)
        
        # Convert workHistory dicts to Strawberry types
        if member.get("workHistory"):
            member["workHistory"] = [
                convert_work_history_dict_to_strawberry(wh)
                for wh in member["workHistory"]
            ]
        else:
            member["workHistory"] = []
        
        try:
            result.append(Member(**member))
        except Exception as e:
            print(f"Error converting member {member.get('id', 'unknown')}: {e}")
            continue
    return result


@strawberry.field
def viewMember(identifier: str) -> Member | None:
    lookup = (identifier or "").strip()
    if not lookup:
        return None

    member = db["members"].find_one({
        "$or": [
            {"id": lookup},
            {"email": lookup},
            {"rollNumber": lookup}
        ]
    })
    if not member:
        return None

    member.pop("_id", None)
    
    # Convert workHistory dicts to Strawberry types
    if member.get("workHistory"):
        member["workHistory"] = [
            convert_work_history_dict_to_strawberry(wh)
            for wh in member["workHistory"]
        ]
    else:
        member["workHistory"] = []
    
    try:
        return Member(**member)
    except Exception as e:
        print(f"Error converting member {member.get('id', 'unknown')}: {e}")
        return None


queries += [viewMembers, viewMember]
mutations += [addMember, changeMember]


# ==================== EVENT QUERIES ====================

@strawberry.field
def viewEvents() -> list[Event]:
    """Get all events from the database."""
    events = list(db["events"].find({}))
    for event in events:
        event.pop("_id", None)
    return [Event(**event) for event in events]


@strawberry.field
def viewEvent(event_id: str) -> Event | None:
    """Get a specific event by ID or name."""
    event = db["events"].find_one({
        "$or": [
            {"id": event_id},
            {"event_name": event_id}
        ]
    })
    if not event:
        return None
    event.pop("_id", None)
    return Event(**event)


@strawberry.mutation
def addEvent(event: EventInput) -> bool:
    """Add a new event."""
    pydantic_event = event.to_pydantic()
    event_data = pydantic_event.dict()
    db["events"].insert_one(event_data)
    return True


# ==================== TESTIMONIAL QUERIES ====================

@strawberry.field
def viewTestimonials() -> list[Testimonial]:
    """Get all testimonials from the database."""
    testimonials = list(db["testimonials"].find({}))
    for testimonial in testimonials:
        testimonial.pop("_id", None)
    return [Testimonial(**testimonial) for testimonial in testimonials]


@strawberry.field
def viewTestimonial(testimonial_id: str) -> Testimonial | None:
    """Get a specific testimonial by ID."""
    testimonial = db["testimonials"].find_one({"id": testimonial_id})
    if not testimonial:
        return None
    testimonial.pop("_id", None)
    return Testimonial(**testimonial)


@strawberry.mutation
def addTestimonial(testimonial: TestimonialInput) -> bool:
    """Add a new testimonial."""
    pydantic_testimonial = testimonial.to_pydantic()
    testimonial_data = pydantic_testimonial.dict()
    db["testimonials"].insert_one(testimonial_data)
    return True


queries += [viewEvents, viewEvent, viewTestimonials, viewTestimonial]
mutations += [addEvent, addTestimonial]
