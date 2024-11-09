from bson import ObjectId

from app.db.mongodb import get_database
from app.models.ticket import Ticket, TicketCreate, TicketUpdate
from datetime import datetime
from pymongo import ASCENDING, DESCENDING  # Import sorting options if needed

async def raise_ticket(username: str, ticket_create: TicketCreate):
    db = await get_database()

    # Create ticket
    ticket = Ticket(
        username=username,
        subject=ticket_create.subject,
        description=ticket_create.description,
        priority=ticket_create.priority,
        updated_at = datetime.now(),
        status = ticket_create.status,
    )

    result = await db.tickets.insert_one(ticket.dict())
    ticket.id = str(result.inserted_id)

    return ticket


async def list_tickets(username: str):
    db = await get_database()
    cursor = db.tickets.find({"username": username}).sort("created_at", DESCENDING)
    tickets = await cursor.to_list(length=None)
    return [Ticket(**ticket) for ticket in tickets]


async def check_ticket_status(ticket_id: str, username: str):
    db = await get_database()
    ticket = await db.tickets.find_one({"_id": ObjectId(ticket_id), "username": username})
    if not ticket:
        raise ValueError(f"Ticket with ID {ticket_id} not found.")
    return Ticket(**ticket)


async def update_ticket(ticket_id: str, username: str, ticket_update: TicketUpdate):
    db = await get_database()

    update_data = {key: value for key, value in ticket_update.dict().items() if value is not None}
    update_data["updated_at"] = datetime.utcnow()

    result = await db.tickets.update_one(
        {"_id": ObjectId(ticket_id), "username": username},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise ValueError(f"Failed to update ticket with ID {ticket_id}.")

    # Return updated ticket
    return await get_ticket_by_id(ticket_id, username)