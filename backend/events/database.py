import strawberry
from pymongo import MongoClient
from os import getenv

MONGODB_URI = getenv("MONGO_URI", default="mongodb://localhost:27017/")
MONGO_DB = getenv("MONGO_DB", default="default")

# instantiate mongo client
client = MongoClient(MONGODB_URI)

# get database
db = client[MONGO_DB]
nss_db = db["events"]

