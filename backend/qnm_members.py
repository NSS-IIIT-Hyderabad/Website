from backend.model_members import *
from database import nss_db
import strawberry
import datetime
import pytz
from qnm_events import queries, mutations

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)

@strawberry.mutation
def addMember(member: MemberInput) -> bool:
    member_data = member.model_dump()
    member_data["createdAt"] = member_data["updatedAt"] = time.strftime("%Y-%m-%d %H:%M:%S")
    nss_db.insert_one(member_data)
    return True

@strawberry.mutation
def changeMember(member: MemberInput) -> bool:
    member_data = member.model_dump()
    member_data["updatedAt"] = time.strftime("%Y-%m-%d %H:%M:%S")
    nss_db.update_one(
        {"rollNumber": member.rollNumber},
        {"$set": member_data}
    )
    return True

@strawberry.field
def viewMembers(name: str = "", team: list[MemberTypeEnum] = None) -> list[Member]:
    if name:
        members = list(nss_db.find({"name": name}))
    elif team:
        members = list(nss_db.find({"team": {"$in": team}}))
    else:
        members = list(nss_db.find({}))
    return members or []

queries+=[viewMembers]
mutations+=[addMember, changeMember]