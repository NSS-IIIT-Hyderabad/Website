import strawberry

from database import get_database
from model_members import Member, MemberModel, MemberInput, WorkHistory
from qnm_events import mutations, queries
from auth import require_admin

db = get_database()

_MEMBER_FIELDS = set(MemberModel.model_fields.keys())


def _to_work_history(raw: dict) -> WorkHistory:
    return WorkHistory(
        role=raw.get("role"),
        team=raw.get("team"),
        start=raw.get("start", ""),
        end=raw.get("end"),
        status=raw.get("status"),
    )


def _to_member(raw: dict) -> Member:
    filtered = {key: value for key, value in raw.items() if key in _MEMBER_FIELDS}
    filtered["workHistory"] = [_to_work_history(w) for w in filtered.get("workHistory") or []]
    return Member(**filtered)


@strawberry.mutation
def addMember(member: MemberInput, info: strawberry.types.Info) -> bool:
    require_admin(info.context["request"])
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.model_dump()
    db["members"].insert_one(member_data)
    return True


@strawberry.mutation
def changeMember(member: MemberInput, info: strawberry.types.Info) -> bool:
    require_admin(info.context["request"])
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.model_dump()
    result = db["members"].update_one(
        {"rollNumber": member.rollNumber},
        {"$set": member_data}
    )
    return result.matched_count > 0


@strawberry.mutation
def removeMember(rollNumber: str, info: strawberry.types.Info) -> bool:
    require_admin(info.context["request"])
    result = db["members"].delete_one({"rollNumber": rollNumber})
    return result.deleted_count > 0


@strawberry.field
def viewMembers(name: str | None = None) -> list[Member]:
    members = []
    if name and name != "":
        members = list(db["members"].find({"name": name.strip()}))
    else:
        members = list(db["members"].find({}))
    return [_to_member(member) for member in members]


queries += [viewMembers]
mutations += [addMember, changeMember, removeMember]
