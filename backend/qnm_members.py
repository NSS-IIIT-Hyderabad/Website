from model_members import *
from database import db
import strawberry
import datetime
import pytz
from qnm_events import queries, mutations

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)

@strawberry.mutation
def addMember(member: MemberInput) -> bool:
    member_data = member.model_dump()
    db["members"].insert_one(member_data)
    return True

@strawberry.mutation
def changeMember(member: MemberInput) -> bool:
    member_data = member.model_dump()
    db["members"].update_one(
        {"rollNumber": member.rollNumber},
        {"$set": member_data}
    )
    return True

@strawberry.field
def viewMembers(name: str = None, team: list[MemberTypeEnum] = None) -> list[Member]:
    members=[]
    if name:
        members = list(db["members"].find({"name": name}))
    elif team:
        members = list(db["members"].find({"team": {"$in": team}}))
    else:
        members = list(db["members"].find({}))
    return members

queries+=[viewMembers]
mutations+=[addMember, changeMember]