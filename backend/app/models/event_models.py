import strawberry
from pydantic import BaseModel, ConfigDict, Field


class EventModel(BaseModel):
    eventName: str = Field(..., min_length=1, alias="event_name")
    start: str = Field(...)
    end: str = Field(...)
    venue: str = Field(...)
    description: str = Field(default="")
    eventProfile: str = Field(default="", alias="event_profile")
    audience: list[str] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True)


@strawberry.experimental.pydantic.type(model=EventModel, all_fields=True)
class Event:
    pass


@strawberry.experimental.pydantic.input(model=EventModel, all_fields=True)
class EventInput:
    pass
