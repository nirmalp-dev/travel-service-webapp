from bson import ObjectId

from app.db.mongodb import get_database
from app.models.order import Order, OrderCreate, OrderItem
from app.models.travel import TravelPackage
from app.services.cart_service import list_cart, clear_cart
from app.services.travel_service import get_package


async def create_order(username: str, order_create: OrderCreate):
    db = await get_database()

    cart = await list_cart(username)
    if not cart['items']:
        raise ValueError("Cart is empty")

    total_amount = 0
    order_items = []
    for item in cart['items']:
        package = await db.travelpackage.find_one({"_id": ObjectId(item['package_id'])})
        if not package:
            raise ValueError(f"Package {item['package_id']} not found")
        item_total = package['cost'] * item['quantity']
        total_amount += item_total
        order_items.append(OrderItem(
            package_id=item['package_id'],
            quantity=item['quantity'],
            price=package['cost'],
            package_details = package
        ))

    # Create order
    order = Order(
        username=username,
        name=order_create.name,
        address=order_create.address,
        items=order_items,
        total_amount=total_amount
    )

    result = await db.orders.insert_one(order.dict())
    order.id = str(result.inserted_id)

    # Clear the cart
    await clear_cart(username)

    return order


async def list_orders(username: str):
    db = await get_database()
    cursor = db.orders.find({"username": username})
    orders = await cursor.to_list(length=None)
    return [Order(**order) for order in orders]
