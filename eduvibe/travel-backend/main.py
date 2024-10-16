from fastapi import FastAPI
from app.api.routes import router
from app.db.mongodb import connect_to_mongo, close_mongo_connection
 # This loads the .env file
app = FastAPI()

app.add_event_handler("startup", connect_to_mongo)
app.add_event_handler("shutdown", close_mongo_connection)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Travel API"}