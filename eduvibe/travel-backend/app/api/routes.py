from fastapi import APIRouter

from .auth import router as auth_router
from .cart import router as cart_router
from .order import router as order_router
from .travel import router as travel_router
from .ticket import router as ticket_router
router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(travel_router, prefix="/packages", tags=["packages"])
router.include_router(cart_router, prefix="/cart", tags=["cart"])
router.include_router(order_router, prefix="/order", tags=["order"])
router.include_router(ticket_router, prefix="/ticket", tags=["ticket"])