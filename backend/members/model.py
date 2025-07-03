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
    PENDING = "pending"


class MemberModel(BaseModel):
    name: str
    email: str
    phone: str | None = None
    member_type: MemberTypeEnum
    status: MemberStatusEnum


@strawberry.experimental.pydantic.type(model=MemberModel, all_fields=True)
class Member:
    pass


@strawberry.experimental.pydantic.input(model=MemberModel, all_fields=True)
class MemberInput:
    pass