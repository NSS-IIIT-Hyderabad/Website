from model import MemberModel, MemberInput, Member, MemberTypeEnum, MemberStatusEnum
from database import db
import strawberry

@strawberry.mutation
def addMember(member: MemberInput)-> bool:
    return True

@strawberry.mutation
def changeMember(member: MemberInput)->bool:
    return True

@strawberry.field
def viewMembers(name: str)->list[Member]:
    pass

queries=[viewMembers]
mutations=[addMember, changeMember]