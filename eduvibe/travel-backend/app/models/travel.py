from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class Day(BaseModel):
    day: int
    activities: str
    meals_included: str
    hotel: str

class ItineraryDetail(BaseModel):
    title: str
    content: List[str]

class TravelPackage(BaseModel):
    id: ObjectId = Field(None, alias="_id")
    itinerary_id: int
    destination: str
    arrival: str
    cost: float
    description: str
    rating: float
    tripdays: int
    numberOfSale: Optional[int] = 0
    filterParam: Optional[str] = ""
    image: str
    fullimage: Optional[str] = ""
    review: Optional[int] = 0
    days: List[Day]
    iternaryDetails: Optional[List[ItineraryDetail]] = []
    details: Optional[str] = ""

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}