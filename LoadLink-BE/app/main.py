from fastapi import FastAPI
from app.database import engine, Base
from app.routes import auth, user, vehicle, trip, booking

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Logistics API")

app.include_router(auth.auth_router)
app.include_router(user.user_router)
app.include_router(vehicle.vehicle_router)
app.include_router(trip.trip_router)
app.include_router(booking.router)
