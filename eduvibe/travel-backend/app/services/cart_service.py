from bson import ObjectId

from app.db.mongodb import get_database
from app.models.cart import Cart, CartItem


async def add_to_cart(username: str, package_id: str, quantity: int = 1):
    db = await get_database()
    cart = await db.carts.find_one({"username": username})

    if not cart:
        new_cart = Cart(username=username, items=[CartItem(package_id=package_id, quantity=quantity)])
        await db.carts.insert_one(new_cart.dict())
    else:
        # Check if the package is already in the cart
        item_exists = False
        for item in cart['items']:
            if item['package_id'] == package_id:
                item['quantity'] += quantity
                item_exists = True
                break

        if not item_exists:
            cart['items'].append(CartItem(package_id=package_id, quantity=quantity).dict())

        await db.carts.update_one({"username": username}, {"$set": cart})

    return {"message": "Item added to cart successfully"}


async def list_cart(username: str):
    db = await get_database()
    cart = await db.carts.find_one({"username": username})

    if not cart:
        return {"username": username, "items": []}

    # Fetch package details for each item in the cart
    for item in cart['items']:
        package = await db.travelpackage.find_one({"_id": ObjectId(item['package_id'])})
        if package:
            item['package_details'] = package
            cart['total'] += item['quantity'] * package['cost']

    return cart

async def clear_cart(username: str):
    db = await get_database()
    await db.carts.delete_one({"username": username})