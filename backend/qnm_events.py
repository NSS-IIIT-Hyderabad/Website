from typing import Optional

import strawberry

from database import get_database
from model_events import Event, EventModel, EventInput
from auth import require_admin

db = get_database()

_EVENT_FIELDS = set(EventModel.model_fields.keys())


def _to_event(raw: dict) -> Event:
    return Event(**{key: value for key, value in raw.items() if key in _EVENT_FIELDS})


@strawberry.mutation
def addEvent(event: EventInput, info: strawberry.types.Info) -> bool:
    require_admin(info.context["request"])
    event_data = event.to_pydantic().model_dump()

    db["events"].insert_one(event_data)
    return True


@strawberry.mutation
def changeEvent(event: EventInput, info: strawberry.types.Info) -> bool:
    require_admin(info.context["request"])
    event_data = event.to_pydantic().model_dump()

    result = db["events"].update_one(
        {"event_name": event.event_name},
        {"$set": event_data}
    )
    return result.modified_count > 0


@strawberry.mutation
def removeEvent(event_name: str, info: strawberry.types.Info) -> bool:
    require_admin(info.context["request"])
    result = db["events"].delete_one({"event_name": event_name})
    return result.deleted_count > 0


@strawberry.field
def viewEvents(
    name: Optional[str] = None,
    startTime: Optional[str] = None,
    endTime: Optional[str] = None,
) -> list[Event]:
    if name:
        events = db["events"].find({"event_name": name})
    elif startTime and endTime:
        events = db["events"].find({"start_time": {"$gte": startTime}, "end_time": {"$lte": endTime}})
    else:
        events = db["events"].find({})
    events = list(events)
    if not events:
        return []
    return [_to_event(event) for event in events]


queries = [viewEvents]
mutations = [addEvent, changeEvent, removeEvent]
