# app/models/order.py
from datetime import datetime
from typing import List

from bson import ObjectId
from pydantic import BaseModel, Field


class OrderItem(BaseModel):
    package_id: str
    quantity: int
    price: float

class OrderCreate(BaseModel):
    name: str
    age: int
    passport_number: str
    credit_card_number: str
    address: str

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    username: str
    name: str
    address: str
    items: List[OrderItem]
    total_amount: float
    status: str = "Pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)