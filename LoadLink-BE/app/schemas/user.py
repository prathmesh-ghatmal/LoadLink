from pydantic import BaseModel, EmailStr, Field, constr
from datetime import date
from enum import Enum
from uuid import UUID
from typing import Optional

from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import date


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

    model_config = {
        "from_attributes": True  # replaces orm_mode=True in Pydantic v2
    }


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
