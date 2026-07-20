import strawberry

from database import get_database
from model_members import Member, MemberInput
from qnm_events import mutations, queries


@strawberry.mutation
async def addMember(member: MemberInput) -> bool:
    db = get_database()
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.model_dump()
    await db["members"].insert_one(member_data)
    return True


@strawberry.mutation
async def changeMember(member: MemberInput) -> bool:
    db = get_database()
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.model_dump()
    result = await db["members"].update_one(
        {"rollNumber": member.rollNumber},
        {"$set": member_data}
    )
    # Return False when no document matched/modified, not silently True
    return result.modified_count > 0


@strawberry.field
async def viewMembers(name: str | None = None) -> list[Member]:
    db = get_database()

    query = {"name": name.strip()} if name and name.strip() else {}
    members = await db["members"].find(query).to_list(length=None)

    for member in members:
        member.pop("_id", None)

    return [Member(**member) for member in members]


queries += [viewMembers]
mutations += [addMember, changeMember]
