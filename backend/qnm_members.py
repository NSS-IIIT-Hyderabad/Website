from model_members import *
from database import get_database
import strawberry
import datetime
import pytz
from qnm_events import queries, mutations

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)
db = get_database()

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
    members=[]
    if name and name!="":
        members = list(db["members"].find({"name": name.strip()}))
    else:
        members = list(db["members"].find({}))
    for member in members:
        member.pop("_id", None)
    return [Member(**member) for member in members]

queries+=[viewMembers]
mutations+=[addMember, changeMember]