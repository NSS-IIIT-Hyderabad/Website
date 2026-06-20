# db.py
from pymongo import MongoClient
import os
from urllib.parse import urlparse

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
MONGO_DB = os.getenv("MONGODB_DB_NAME", "nss_db")

# Try to extract database name from URL if not set in env
if MONGO_DB == "nss_db":  # default value
    try:
        parsed = urlparse(MONGO_URL)
        if parsed.path and parsed.path != "/":
            # Extract database name from path (e.g., "/nss_db?..." -> "nss_db")
            db_from_url = parsed.path.lstrip("/").split("?")[0]
            if db_from_url:
                MONGO_DB = db_from_url
    except:
        pass

client = None
db = None


def get_database():
    global client, db
    if client is None:
        client = MongoClient(MONGO_URL)
        db = client[MONGO_DB]
    return db


def close_connection():
    global client, db
    if client is not None:
        client.close()
        client = None
    db = None
