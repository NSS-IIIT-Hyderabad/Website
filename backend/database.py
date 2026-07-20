# database.py
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os

MONGO_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
MONGO_DB: str = os.getenv("MONGODB_DB_NAME", "nss_db")

_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    """Return the shared Motor client, creating it on first call.

    Motor clients are thread-safe and event-loop-aware.  A single client
    instance should be reused for the lifetime of the process.
    """
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(
            MONGO_URL,
            # Use a bounded connection pool appropriate for a single-process
            # async service.  Motor manages its own pool internally.
            maxPoolSize=50,
            minPoolSize=5,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
            socketTimeoutMS=10000,
        )
    return _client


def get_database() -> AsyncIOMotorDatabase:
    """Return the application database handle."""
    return get_client()[MONGO_DB]


async def ping_database() -> bool:
    """Verify the MongoDB connection is healthy.

    Called during application startup so the process refuses to accept
    traffic before the database is reachable.  Raises on failure so the
    caller can surface a meaningful error.
    """
    await get_client().admin.command("ping")
    return True


async def close_connection() -> None:
    """Gracefully close the Motor client on application shutdown."""
    global _client
    if _client is not None:
        _client.close()
        _client = None
