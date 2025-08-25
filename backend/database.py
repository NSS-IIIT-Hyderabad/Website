import strawberry
from pymongo import MongoClient
from os import getenv

MONGO_URL = getenv("MONGO_URL", default="mongodb://localhost:27017/")
MONGO_DB = getenv("MONGO_DB", default="default")

# instantiate mongo client
client = MongoClient(MONGO_URL)
# get database
nss_db = client[MONGO_DB]
membersdb = nss_db["members"]
eventsdb = nss_db["events"]

