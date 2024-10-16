from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.models.cart import Cart, CartItem
from app.services.cart_service import add_to_cart, list_cart

router = APIRouter()

@router.post("/add")
async def api_add_to_cart(cartItem: CartItem, current_user: dict = Depends(get_current_user)):
    result = await add_to_cart(current_user.username, cartItem.package_id, cartItem.quantity)
    return result

@router.get("/", response_model=Cart)
async def api_list_cart(current_user: dict = Depends(get_current_user)):
    cart = await list_cart(current_user.username)
    return cart