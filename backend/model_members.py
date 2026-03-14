import strawberry
from pydantic import BaseModel, Field, field_validator, EmailStr
from enum import Enum
import re


# ==================== ENUMS ====================

@strawberry.enum
class TeamTypeEnum(str, Enum):
    NSS_CORE = "NSS Core"
    TECH = "Tech"
    DESIGN = "Design"
    SOCIAL = "Social"
    LOGISTICS = "Logistics"
    CONTENT = "Content"


@strawberry.enum
class MemberStatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


@strawberry.enum
class RoleEnum(str, Enum):
    COORDINATOR = "Coordinator"
    TECH_TEAM_HEAD = "Tech Team Head"
    TECH_TEAM_MEMBER = "Tech Team Member"
    DESIGN_TEAM_HEAD = "Design Team Head"
    DESIGN_TEAM_MEMBER = "Design Team Member"
    SOCIAL_MEDIA_TEAM_HEAD = "Social Media Team Head"
    SOCIAL_MEDIA_TEAM_MEMBER = "Social Media Team Member"
    LOGISTICS_TEAM_HEAD = "Logistics Team Head"
    LOGISTICS_TEAM_MEMBER = "Logistics Team Member"
    CONTENT_TEAM_HEAD = "Content Team Head"
    CONTENT_TEAM_MEMBER = "Content Team Member"


# ==================== WORK HISTORY ====================

class WorkHistoryModel(BaseModel):
    role: RoleEnum = Field(...)
    team: TeamTypeEnum = Field(...)
    status: MemberStatusEnum = Field(...)


@strawberry.experimental.pydantic.type(model=WorkHistoryModel, all_fields=True)
class WorkHistory:
    pass


@strawberry.experimental.pydantic.input(model=WorkHistoryModel, all_fields=True)
class WorkHistoryInput:
    pass


# ==================== MEMBER MODEL ====================

class MemberModel(BaseModel):
    id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr = Field(...)
    rollNumber: str = Field(..., min_length=1)
    photoUrl: str = Field(default="-")
    phone: str = Field(default="-")
    bio: str = Field(default="", max_length=500)
    workHistory: list[WorkHistoryModel] = Field(default_factory=list)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        return v

    @field_validator('rollNumber')
    @classmethod
    def validate_roll_number(cls, v: str) -> str:
        if not re.match(r'^\d{10}$', v):
            raise ValueError('Roll number must be a 10-digit number')
        return v


@strawberry.experimental.pydantic.type(model=MemberModel, all_fields=True)
class Member:
    pass


@strawberry.experimental.pydantic.input(model=MemberModel, all_fields=True)
class MemberInput:
    pass
