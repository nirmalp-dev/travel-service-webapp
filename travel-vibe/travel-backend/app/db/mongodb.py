from motor.motor_asyncio import AsyncIOMotorClient

from ..core.config import settings


class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.db

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(settings.DATABASE_URL)
    db.db = db.client[settings.DATABASE_NAME]  # Get the default database

    # Verify the connection
    try:
        await db.client.server_info()
        print("Connected to MongoDB")
    except Exception as e:
        print(f"Unable to connect to MongoDB: {e}")
        raise

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("MongoDB connection closed")