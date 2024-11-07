# app/api/endpoints/order.py
from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.core.security import get_current_user
from app.models.order import OrderCreate, Order
from app.services.order_service import create_order, list_orders, update_order_status

router = APIRouter()

@router.post("/checkout", response_model=Order)
async def checkout(order_create: OrderCreate, current_user: dict = Depends(get_current_user)):
    try:
        order = await create_order(current_user.username, order_create)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/list", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    orders = await list_orders(current_user.username)
    return orders

@router.put("/update-status/{order_id}", response_model=Order)
async def update_order_status_endpoint(
    order_id: str, 
    status: str, 
):
    try:
        updated_order = await update_order_status(order_id, status)
        return updated_order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))