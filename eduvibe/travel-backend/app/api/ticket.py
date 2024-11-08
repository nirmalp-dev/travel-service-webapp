from typing import List
from fastapi import APIRouter, Depends, HTTPException

from app.core.security import get_current_user
from app.models.ticket import TicketCreate, Ticket, TicketUpdate
from app.services.ticket_service import raise_ticket, list_tickets, check_ticket_status

router = APIRouter()

@router.post("/raise", response_model=Ticket)
async def raise_ticket_api(ticket_create: TicketCreate, current_user: dict = Depends(get_current_user)):
    try:
        ticket = await raise_ticket(current_user.username, ticket_create)
        return ticket
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/list", response_model=List[Ticket])
async def list_tickets_api(current_user: dict = Depends(get_current_user)):
    return await list_tickets(current_user.username)

@router.get("/status/{ticket_id}", response_model=Ticket)
async def check_ticket_status_api(ticket_id: str, current_user: dict = Depends(get_current_user)):
    try:
        ticket = await check_ticket_status(ticket_id, current_user.username)
        return ticket
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))