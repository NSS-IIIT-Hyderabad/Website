import re

import strawberry
from strawberry.types import Info

from app.models import EventInput, MemberInput, TestimonialInput

from app.core.auth import (
    AdminAccount,
    admin_doc_from_member,
    db,
    find_member_by_identifier,
    now_iso,
    require_admin,
)
from app.core.transforms import dump_model, member_input_to_dict
from app.core.uploads import delete_uploaded_file, extract_upload_identity, extract_stored_upload_path


@strawberry.mutation
def addMember(member: MemberInput, info: Info) -> bool:
    require_admin(info)
    db["members"].insert_one(member_input_to_dict(member))
    return True


@strawberry.mutation
def changeMember(member: MemberInput, info: Info) -> bool:
    require_admin(info)
    existing = db["members"].find_one({"rollNumber": member.rollNumber})
    if not existing:
        return False

    member_data = member_input_to_dict(member)
    old_photo = existing.get("photoUrl")
    result = db["members"].update_one(
        {"rollNumber": member.rollNumber},
        {"$set": member_data},
    )

    new_photo = member_data.get("photoUrl")
    old_identity = extract_upload_identity(old_photo)
    new_identity = extract_upload_identity(new_photo)
    if old_identity and old_identity != new_identity:
        delete_uploaded_file(old_photo, "members")

    return result.matched_count > 0


@strawberry.mutation
def changeMemberByEmail(member_email: str, member: MemberInput, info: Info) -> bool:
    require_admin(info)
    lookup = (member_email or "").strip().lower()
    if not lookup:
        return False

    existing = db["members"].find_one({"email": lookup})
    if not existing:
        return False

    member_data = member_input_to_dict(member)
    old_photo = existing.get("photoUrl")
    result = db["members"].update_one(
        {"email": lookup},
        {"$set": member_data},
    )

    new_photo = member_data.get("photoUrl")
    old_identity = extract_upload_identity(old_photo)
    new_identity = extract_upload_identity(new_photo)
    if old_identity and old_identity != new_identity:
        delete_uploaded_file(old_photo, "members")

    return result.matched_count > 0


@strawberry.mutation
def deleteMember(member_email: str, info: Info) -> bool:
    require_admin(info)
    identifier = (member_email or "").strip().lower()
    if not identifier:
        return False

    existing = db["members"].find_one(
        {
            "$or": [
                {"rollNumber": identifier},
                {"email": identifier},
                {
                    "email": {
                        "$regex": f"^{re.escape(identifier)}@",
                        "$options": "i",
                    }
                },
            ]
        }
    )
    if not existing:
        return False

    old_photo = existing.get("photoUrl")
    result = db["members"].delete_one({"_id": existing["_id"]})
    if result.deleted_count > 0:
        delete_uploaded_file(old_photo, "members")
        return True
    return False


@strawberry.mutation
def addEvent(event: EventInput, info: Info) -> bool:
    require_admin(info)
    event_data = dump_model(event.to_pydantic(), by_alias=True)
    event_data["event_profile"] = extract_stored_upload_path(
        event_data.get("event_profile", ""),
        "events",
    )
    db["events"].insert_one(event_data)
    return True


@strawberry.mutation
def changeEvent(event_name: str, event: EventInput, info: Info) -> bool:
    require_admin(info)
    event_data = dump_model(event.to_pydantic(), by_alias=True)
    event_data["event_profile"] = extract_stored_upload_path(
        event_data.get("event_profile", ""),
        "events",
    )
    existing = db["events"].find_one(
        {
            "$or": [
                {"event_name": event_name},
                {"event_name": {"$regex": f"^{re.escape(event_name)}$", "$options": "i"}},
            ]
        }
    )
    if not existing:
        return False

    old_profile = existing.get("event_profile")
    result = db["events"].update_one({"_id": existing["_id"]}, {"$set": event_data})
    if result.modified_count > 0:
        old_identity = extract_upload_identity(old_profile)
        new_identity = extract_upload_identity(event_data.get("event_profile"))
        if old_identity and old_identity != new_identity:
            delete_uploaded_file(old_profile, "events")

    return result.modified_count > 0


@strawberry.mutation
def deleteEvent(event_name: str, info: Info) -> bool:
    require_admin(info)
    lookup = (event_name or "").strip()
    if not lookup:
        return False

    existing = db["events"].find_one(
        {
            "$or": [
                {"event_name": lookup},
                {"event_name": {"$regex": f"^{re.escape(lookup)}$", "$options": "i"}},
            ]
        }
    )
    if not existing:
        return False

    old_profile = existing.get("event_profile")
    result = db["events"].delete_one({"_id": existing["_id"]})
    if result.deleted_count > 0:
        delete_uploaded_file(old_profile, "events")
        return True

    return False


@strawberry.field
def viewAdmins(info: Info) -> list[AdminAccount]:
    require_admin(info)
    docs = list(db["admins"].find({"active": True}).sort("grantedAt", -1))
    result: list[AdminAccount] = []
    for doc in docs:
        result.append(
            AdminAccount(
                memberId=doc.get("memberId", ""),
                rollNumber=doc.get("rollNumber", ""),
                email=doc.get("email", ""),
                name=doc.get("name", ""),
                active=bool(doc.get("active", False)),
                source=doc.get("source", "manual"),
                grantedBy=doc.get("grantedBy"),
                grantedAt=doc.get("grantedAt", ""),
            )
        )
    return result


@strawberry.mutation
def grantAdmin(identifier: str, info: Info) -> bool:
    identity = require_admin(info)
    member = find_member_by_identifier(identifier)
    if not member:
        return False

    admin_doc = admin_doc_from_member(
        member,
        source="manual",
        granted_by=identity.get("uid") or identity.get("email") or "admin",
    )
    if not admin_doc["memberId"]:
        return False

    db["admins"].update_one(
        {"memberId": admin_doc["memberId"]},
        {
            "$set": {
                "rollNumber": admin_doc["rollNumber"],
                "email": admin_doc["email"],
                "emailUsername": admin_doc["emailUsername"],
                "name": admin_doc["name"],
                "active": True,
                "source": "manual",
                "grantedBy": admin_doc["grantedBy"],
                "updatedAt": now_iso(),
            },
            "$setOnInsert": {
                "grantedAt": now_iso(),
            },
        },
        upsert=True,
    )
    return True


@strawberry.mutation
def revokeAdmin(identifier: str, info: Info) -> bool:
    require_admin(info)
    member = find_member_by_identifier(identifier)
    if not member:
        return False

    member_id = (member.get("email") or "").strip().lower()
    if not member_id:
        return False

    target_admin = db["admins"].find_one({"memberId": member_id})
    if not target_admin:
        return False

    if bool(target_admin.get("active", False)):
        active_admins = db["admins"].count_documents({"active": True})
        if active_admins <= 1:
            return False

    result = db["admins"].update_one(
        {"memberId": member_id},
        {"$set": {"active": False, "updatedAt": now_iso()}},
    )
    return result.modified_count > 0


@strawberry.mutation
def addTestimonial(testimonial: TestimonialInput) -> bool:
    db["testimonials"].insert_one(dump_model(testimonial.to_pydantic()))
    return True


queries = [
    viewAdmins,
]

mutations = [
    addMember,
    changeMember,
    changeMemberByEmail,
    deleteMember,
    addEvent,
    changeEvent,
    deleteEvent,
    grantAdmin,
    revokeAdmin,
    addTestimonial,
]
