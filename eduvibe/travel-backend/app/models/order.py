# app/models/order.py
from datetime import datetime
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field

from app.models.travel import TravelPackage


class OrderItem(BaseModel):
    package_id: str
    quantity: int
    price: float
    package_details: Optional[TravelPackage] = Field(default=None)

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
    items_details: Optional[TravelPackage] = Field(default=None)
    total_amount: float
    status: str = "Pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)