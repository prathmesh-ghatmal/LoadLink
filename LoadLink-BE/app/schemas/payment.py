from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import Optional

class PaymentCreate(BaseModel):
    booking_id: UUID

class PaymentOut(BaseModel):
    id: UUID
    booking_id: UUID
    from_user_id: UUID
    to_user_id: UUID
    amount: float
    status: str
    created_date: date
    completed_date: Optional[date]

    class Config:
        orm_mode = True
