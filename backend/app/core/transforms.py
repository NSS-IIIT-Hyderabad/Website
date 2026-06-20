import re

from app.models import Event, EventModel, MemberInput, WorkHistory
from app.core.uploads import extract_stored_upload_path


def dump_model(model, *, by_alias: bool = False) -> dict:
    if hasattr(model, "model_dump"):
        return model.model_dump(by_alias=by_alias)
    return model.dict(by_alias=by_alias)


def work_history_to_strawberry(wh_dict: dict) -> WorkHistory:
    return WorkHistory(
        role=wh_dict.get("role", ""),
        team=wh_dict.get("team", ""),
        start=wh_dict.get("start", ""),
        end=wh_dict.get("end"),
    )


def event_to_strawberry(event_dict: dict) -> Event:
    model = EventModel(**event_dict)
    return Event.from_pydantic(model)


def derive_member_name_from_email(email: str) -> str:
    local_part = (email or "").strip().lower().split("@")[0]
    if not local_part:
        return ""

    chunks = [part for part in re.split(r"[._-]+", local_part) if part]
    return " ".join(chunk[:1].upper() + chunk[1:] for chunk in chunks)


def member_input_to_dict(member: MemberInput) -> dict:
    normalized_email = (member.email or "").strip().lower()
    return {
        "name": derive_member_name_from_email(normalized_email),
        "email": normalized_email,
        "rollNumber": member.rollNumber,
        "photoUrl": extract_stored_upload_path(member.photoUrl, "members"),
        "phone": member.phone,
        "batch": member.batch,
        "year": member.year,
        "department": member.department,
        "linkedin": member.linkedin,
        "github": member.github,
        "bio": member.bio,
        "achievements": member.achievements or [],
        "interests": member.interests or [],
        "workHistory": [
            {
                "role": wh.role,
                "team": wh.team,
                "start": wh.start,
                "end": wh.end,
            }
            for wh in (member.workHistory or [])
        ],
    }
