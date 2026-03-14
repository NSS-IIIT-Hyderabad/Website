import strawberry
from pydantic import BaseModel, Field, field_validator, model_validator
from enum import Enum
from typing import Optional
import re
import datetime


# ==================== ENUMS ====================

@strawberry.enum
class AudienceTypeEnum(str, Enum):
    UG1 = "ug1"
    UG2 = "ug2"
    UG3 = "ug3"
    UG4 = "ug4"
    PG = "pg"
    STAFF = "staff"
    FACULTY = "faculty"
    INTERNAL = "internal"
    EXTERNAL = "external"


@strawberry.enum
class EventStatusEnum(str, Enum):
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


# ==================== EVENT MODEL ====================

class EventModel(BaseModel):
    event_name: str = Field(..., min_length=1, max_length=200, description="Name of the event")
    start_time: str = Field(..., description="Start date in YYYY/MM/DD format")
    end_time: str = Field(..., description="End date in YYYY/MM/DD format")
    venue: str = Field(..., min_length=1, description="Event venue")
    description: str = Field(default="", max_length=2000, description="Event description")
    event_profile: Optional[str] = Field(None, description="Path to event profile image")
    audience: list[str] = Field(default_factory=list, description="Target audience list")

    @field_validator('start_time', 'end_time')
    @classmethod
    def validate_date_format(cls, v: str) -> str:
        if not re.match(r'^\d{4}/\d{2}/\d{2}$', v):
            raise ValueError('Date must be in YYYY/MM/DD format')
        try:
            datetime.datetime.strptime(v, "%Y/%m/%d")
        except ValueError:
            raise ValueError('Date must be a valid calendar date in YYYY/MM/DD format')
        return v

    @model_validator(mode="after")
    def validate_date_order(self):
        try:
            start_dt = datetime.datetime.strptime(self.start_time, "%Y/%m/%d")
            end_dt = datetime.datetime.strptime(self.end_time, "%Y/%m/%d")
        except ValueError:
            raise ValueError('Date must be in YYYY/MM/DD format')
        if end_dt < start_dt:
            raise ValueError('End date must be on or after start date')
        return self

    @field_validator('audience')
    @classmethod
    def validate_audience(cls, v: list[str]) -> list[str]:
        valid_audiences = {'ug1', 'ug2', 'ug3', 'ug4', 'pg', 'staff', 'faculty', 'internal', 'external'}
        for audience in v:
            if audience.lower() not in valid_audiences:
                raise ValueError(f'Invalid audience type: {audience}')
        return v


@strawberry.experimental.pydantic.type(model=EventModel, all_fields=True)
class Event:
    pass


@strawberry.experimental.pydantic.input(model=EventModel, fields=[
    "event_name",
    "start_time",
    "end_time",
    "venue",
    "description",
    "event_profile",
    "audience"
])
class EventInput:
    pass
