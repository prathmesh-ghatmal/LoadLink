from pydantic import BaseModel, constr
from uuid import UUID
from typing import Optional
from enum import Enum

class VehicleType(str, Enum):
    truck = "truck"
    van = "van"
    trailer = "trailer"
    container = "container"

# Input for creating/updating a vehicle
class VehicleCreate(BaseModel):
    type: VehicleType
    capacity: int
    license_plate: constr(max_length=20)
    rc_number: constr(max_length=50)
    is_active: Optional[bool] = True

# Response model
class VehicleOut(BaseModel):
    id: UUID
    carrier_id: UUID
    type: VehicleType
    capacity: int
    license_plate: str
    rc_number: str
    is_active: bool

    class Config:
        orm_mode = True
