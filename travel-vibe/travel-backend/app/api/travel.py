from typing import List

from fastapi import HTTPException, APIRouter

from app.models.travel import TravelPackage
from ..services.travel_service import list_packages, get_package

router = APIRouter()


@router.get("/", response_model=List[TravelPackage])
async def list_travel_packages():
    packages = await list_packages()
    return packages


@router.get("/{package_id}", response_model=TravelPackage)
async def get_travel_package(package_id: str):
    package = await get_package(package_id)
    if package is None:
        raise HTTPException(status_code=404, detail="Package not found")
    return package
