from bson import ObjectId

from app.db.mongodb import get_database


async def list_packages():
    db = await get_database()
    cursor = db.travelpackage.find()

    packages = await cursor.to_list(length=None)
    if packages is None:
        return []
    return packages


async def get_package(package_id: str):
    db = await get_database()
    print(package_id)
    package = await db.travelpackage.find_one({"_id": ObjectId(package_id)})
    if package is None:
        return None
    return package