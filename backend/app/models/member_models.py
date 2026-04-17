import re
from enum import Enum

import strawberry
from pydantic import BaseModel, EmailStr, Field, field_validator


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


class WorkHistoryModel(BaseModel):
    role: str = Field(...)
    team: str = Field(...)
    start: str = Field(...)
    end: str | None = Field(default=None)


@strawberry.type
class WorkHistory:
    role: str
    team: str
    start: str
    end: str | None


@strawberry.input
class WorkHistoryInput:
    role: str
    team: str
    start: str
    end: str | None = None


class MemberModel(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr = Field(...)
    rollNumber: str = Field(..., min_length=1)
    photoUrl: str = Field(default="-")
    phone: str = Field(default="-")
    batch: str = Field(default="")
    year: str = Field(default="")
    department: str = Field(default="")
    linkedin: str = Field(default="")
    github: str = Field(default="")
    bio: str = Field(default="", max_length=500)
    achievements: list[str] = Field(default_factory=list)
    interests: list[str] = Field(default_factory=list)
    workHistory: list[dict] = Field(default_factory=list)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(email_pattern, value):
            raise ValueError("Invalid email format")
        return value

    @field_validator("rollNumber")
    @classmethod
    def validate_roll_number(cls, value: str) -> str:
        if not re.match(r"^\d{10}$", value):
            raise ValueError("Roll number must be a 10-digit number")
        return value


@strawberry.type
class Member:
    name: str
    email: str
    rollNumber: str
    photoUrl: str = "/favicon.ico"
    phone: str = "-"
    batch: str = ""
    year: str = ""
    department: str = ""
    linkedin: str = ""
    github: str = ""
    bio: str = ""
    achievements: list[str]
    interests: list[str]
    workHistory: list[WorkHistory]


@strawberry.input
class MemberInput:
    name: str
    email: str
    rollNumber: str
    photoUrl: str = "-"
    phone: str = "-"
    batch: str = ""
    year: str = ""
    department: str = ""
    linkedin: str = ""
    github: str = ""
    bio: str = ""
    achievements: list[str] | None = None
    interests: list[str] | None = None
    workHistory: list[WorkHistoryInput] | None = None
