import strawberry
from pydantic import BaseModel

class MemberModel(BaseModel):
    name: str
    email: str

class EventModel(BaseModel):
    name: str
    startTime: str
    endTime: str
    location: str
    description: str | None = None
    eventHead: MemberModel | None = None

@strawberry.experimental.pydantic.type(model=MemberModel, all_fields=True)
class Member:
    pass

@strawberry.experimental.pydantic.input(model=MemberModel, all_fields=True)
class MemberInput:
    pass

@strawberry.experimental.pydantic.type(model=EventModel, all_fields=True)
class EventType:
    pass

@strawberry.experimental.pydantic.input(model=EventModel, fields=["name", "startTime", "endTime", "location", "description"])
class EventInput:
    pass