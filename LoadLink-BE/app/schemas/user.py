from pydantic import BaseModel, EmailStr, constr
from datetime import date
from enum import Enum
from uuid import UUID
from typing import Optional

class UserRole(str, Enum):
    shipper = "shipper"
    carrier = "carrier"

# -----------------
# Requests
# -----------------
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: constr(min_length=8, max_length=64)
    role: UserRole  # shipper or carrier
    phone: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# -----------------
# Responses
# -----------------
class UserOut(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    role: str
    phone: str
    rating: Optional[float]
    review_count: int
    joined_date: date
    avatar: Optional[str]

    class Config:
        orm_mode = True

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
