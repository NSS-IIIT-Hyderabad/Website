from typing import Optional

import strawberry

from database import get_database
from model_events import Event, EventInput


@strawberry.mutation
async def addEvent(event: EventInput) -> bool:
    db = get_database()
    event_data = event.model_dump()
    await db["events"].insert_one(event_data)
    return True


@strawberry.mutation
async def changeEvent(event: EventInput) -> bool:
    db = get_database()
    event_data = event.model_dump()
    result = await db["events"].update_one(
        {"name": event.name},
        {"$set": event_data}
    )
    return result.modified_count > 0


@strawberry.field
async def viewEvents(
    name: Optional[str] = None,
    startTime: Optional[str] = None,
    endTime: Optional[str] = None,
) -> list[Event]:
    db = get_database()

    if name:
        query = {"name": name}
    elif startTime and endTime:
        query = {"startTime": {"$gte": startTime}, "endTime": {"$lte": endTime}}
    else:
        query = {}

    events = await db["events"].find(query).to_list(length=None)
    if not events:
        return []
    return [Event(**event) for event in events]


queries = [viewEvents]
mutations = [addEvent, changeEvent]
