# app/models/ticket.py
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class TicketCreate(BaseModel):
    subject: str
    description: str
    priority: Optional[str] = Field(default="Medium")  # Priority levels: Low, Medium, High

class TicketUpdate(BaseModel):
    status: str
    resolution_notes: Optional[str] = None

class Ticket(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    username: str
    subject: str
    description: str
    priority: str = "Medium"
    status: str = "Open"  # Default to "Open"
    resolution_notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None