

"""MongoDB import script for NSS Website data.

This script converts the frontend JSON data to MongoDB collections.
"""

import json
import os

from pymongo import MongoClient

# MongoDB connection string - replace with your MongoDB URL
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "nss_website"
MEMBERS_COLLECTION = "members"
EVENTS_COLLECTION = "events"


def import_data():
    """Import sample member and event data into MongoDB."""
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]

    # Clear existing collections
    db[MEMBERS_COLLECTION].drop()
    db[EVENTS_COLLECTION].drop()

    # Import members
    members_file = os.path.join(os.path.dirname(__file__), "sample_members_mongodb.json")
    with open(members_file, "r", encoding="utf-8") as f:
        members_data = json.load(f)

    # Insert members
    if members_data:
        db[MEMBERS_COLLECTION].insert_many(members_data)
        print(f"Imported {len(members_data)} members")

    # Import events
    events_file = os.path.join(os.path.dirname(__file__), "sample_events_mongodb.json")
    with open(events_file, "r", encoding="utf-8") as f:
        events_data = json.load(f)

    # Convert ObjectId strings to proper MongoDB ObjectId
    for event in events_data:
        if "_id" in event and "$oid" in event["_id"]:
            from bson.objectid import ObjectId

            event["_id"] = ObjectId(event["_id"]["$oid"])

    # Insert events
    if events_data:
        db[EVENTS_COLLECTION].insert_many(events_data)
        print(f"Imported {len(events_data)} events")

    print("Data import completed successfully")


if __name__ == "__main__":
    import_data()
