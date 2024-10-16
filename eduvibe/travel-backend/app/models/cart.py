from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field

from app.models.travel import TravelPackage


class CartItem(BaseModel):
    package_id: str
    quantity: int = 1
    added_at: datetime = Field(default_factory=datetime.utcnow)
    package_details: Optional[TravelPackage] = Field(default=None, alias='package_details')

class Cart(BaseModel):
    username: str
    items: List[CartItem] = []
    total: float = 0.0