from ..core.security import get_password_hash, verify_password
from ..db.mongodb import get_database
from ..models.user import UserInDB, UserCreate


async def create_user(user: UserCreate):
    db = await get_database()

    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        return None
    user_in_db = UserInDB(**user.dict(), hashed_password=get_password_hash(user.password))
    result = await db.users.insert_one(user_in_db.dict())
    return user_in_db

async def authenticate_user(username: str, password: str):
    db = await get_database()
    user = await db.users.find_one({"username": username})
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user