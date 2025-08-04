import strawberry
from pydantic import BaseModel
from enum import Enum

@strawberry.enum
class MemberTypeEnum(str, Enum):
    ADMIN = "admin"
    TECH = "tech"
    DESIGN = "design"
    CONTENT = "content"
    LOGISTICS = "logistics"
    COORDINATOR = "coordinator"
    VOLUNTEER = "volunteer"

@strawberry.enum
class MemberStatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class MemberModel(BaseModel):
    name: str
    email: str
    rollNumber: str | None = None
    team: MemberTypeEnum
    isHead: bool = False
    status: MemberStatusEnum
    createdAt: str | None = None
    updatedAt: str | None = None


@strawberry.experimental.pydantic.type(model=MemberModel, all_fields=True)
class Member:
    pass

@strawberry.experimental.pydantic.input(model=MemberModel,fields=["name", "email", "rollNumber", "team","isHead", "status"])
class MemberInput:
    pass