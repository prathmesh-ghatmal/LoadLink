from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date
from uuid import UUID

from app.models import Booking, Payment, Trip
from app.database import get_db
from app.schemas.payment import PaymentCreate, PaymentOut
router = APIRouter()
@router.post("/payments/{booking_id}", response_model=PaymentOut)
def create_payment(booking_id: UUID, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking.status == "paid":
        raise HTTPException(status_code=400, detail="Booking already paid")

    trip = db.query(Trip).filter(Trip.id == booking.trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    carrier_id = trip.carrier_id  # make sure your Trip model has carrier_id

    today = date.today()
    payment = Payment(
        booking_id=booking.id,
        from_user_id=carrier_id,
        to_user_id=booking.shipper_id,
        amount=float(booking.total_price),
        status="completed",
        created_date=today,
        completed_date=today
    )
    db.add(payment)

    # Update Booking
    booking.status = "paid"
    booking.paid_date = today

    db.commit()
    db.refresh(payment)

    return payment
