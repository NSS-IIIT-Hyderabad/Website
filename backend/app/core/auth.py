from datetime import datetime, timezone
import re
from urllib.parse import unquote

import strawberry
from strawberry.types import Info

from app.core.database import get_database


db = get_database()


@strawberry.type
class AdminAccount:
    memberId: str
    rollNumber: str
    email: str
    name: str
    active: bool
    source: str
    grantedBy: str | None
    grantedAt: str


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def extract_identity(info: Info) -> dict:
    request = info.context.get("request") if info.context else None
    uid = ""
    email = ""
    if request is not None:
        uid = unquote((request.cookies.get("uid") or "")).strip().lower()
        email = unquote((request.cookies.get("email") or "")).strip().lower()

    identities = set()
    if uid:
        identities.add(uid)
    if email:
        identities.add(email)
        if "@" in email:
            identities.add(email.split("@")[0])

    return {
        "uid": uid,
        "email": email,
        "identities": list(identities),
    }


def find_member_by_identifier(identifier: str):
    key = (identifier or "").strip()
    if not key:
        return None

    normalized = key.lower()
    member = db["members"].find_one(
        {
            "$or": [
                {"email": key},
                {"rollNumber": key},
                {"email": normalized},
                {"rollNumber": normalized},
                {
                    "email": {
                        "$regex": f"^{re.escape(normalized)}@",
                        "$options": "i",
                    }
                },
            ]
        }
    )
    return member


def admin_doc_from_member(member: dict, source: str, granted_by: str | None) -> dict:
    email = (member.get("email") or "").strip().lower()
    email_username = email.split("@")[0] if email and "@" in email else ""

    return {
        "memberId": email,
        "rollNumber": (member.get("rollNumber") or "").strip(),
        "email": email,
        "emailUsername": email_username,
        "name": (member.get("name") or "").strip(),
        "active": True,
        "source": source,
        "grantedBy": granted_by,
        "grantedAt": now_iso(),
        "updatedAt": now_iso(),
    }


def is_admin_identity(identity_values: list[str]) -> bool:
    cleaned = [v.strip().lower() for v in identity_values if v and v.strip()]
    if not cleaned:
        return False

    admin = db["admins"].find_one(
        {
            "active": True,
            "$or": [
                {"memberId": {"$in": cleaned}},
                {"rollNumber": {"$in": cleaned}},
                {"email": {"$in": cleaned}},
                {"emailUsername": {"$in": cleaned}},
            ],
        }
    )
    return admin is not None


def require_admin(info: Info):
    identity = extract_identity(info)
    if not is_admin_identity(identity["identities"]):
        raise PermissionError("Admin access required")
    return identity
