import json
from pathlib import Path

from database import get_database


def load_json(filename: str):
    with (Path(__file__).parent / filename).open(encoding="utf-8") as file:
        return json.load(file)


def seed_database() -> None:
    database = get_database()

    database["members"].drop()
    members = load_json("sample_members_mongodb.json")
    for member in members:
        # MemberModel.id is a distinct app-level identifier (not Mongo's own
        # _id), so it isn't optional - derive it from rollNumber when the
        # seed data doesn't specify one.
        member.setdefault("id", member.get("rollNumber", ""))
    if members:
        database["members"].insert_many(members)

    database["events"].drop()
    events = load_json("sample_events_mongodb.json")
    for event in events:
        if isinstance(event.get("_id"), dict) and "$oid" in event["_id"]:
            from bson import ObjectId

            event["_id"] = ObjectId(event["_id"]["$oid"])
    if events:
        database["events"].insert_many(events)

    database["users"].update_one(
        {"uid": "nss"},
        {
            "$set": {"email": "nss@iiith.ac.in", "role": "admin"},
            "$setOnInsert": {"uid": "nss"},
        },
        upsert=True,
    )
    print(f"Seeded {len(members)} members, {len(events)} events, and the admin user")


if __name__ == "__main__":
    seed_database()