from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, user, vehicle, trip, booking,payment, review

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Logistics API")

# ------------------------
# CORS middleware
# ------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

# ------------------------
# Include routers
# ------------------------
app.include_router(auth.auth_router)
app.include_router(user.user_router)
app.include_router(vehicle.vehicle_router)
app.include_router(trip.trip_router)
app.include_router(booking.router)
app.include_router(payment.router)
app.include_router(review.router)