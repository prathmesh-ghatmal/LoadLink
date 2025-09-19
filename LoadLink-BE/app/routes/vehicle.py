from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models import Vehicle, User
from app.dependencies import get_current_user, get_db
from app.schemas.vehicle import VehicleCreate, VehicleOut

vehicle_router = APIRouter(
    prefix="/vehicles",
    tags=["vehicles"]
)

# ---------------------------
# Create Vehicle
# ---------------------------
@vehicle_router.post("/", response_model=VehicleOut)
def create_vehicle(
    vehicle_in: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "carrier":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only carriers can create vehicles")
    
    # Check if license plate already exists
    if db.query(Vehicle).filter(Vehicle.license_plate == vehicle_in.license_plate).first():
        raise HTTPException(status_code=400, detail="License plate already exists")
    
    # Check if RC number already exists
    if db.query(Vehicle).filter(Vehicle.rc_number == vehicle_in.rc_number).first():
        raise HTTPException(status_code=400, detail="RC number already exists")
    
    vehicle = Vehicle(
        carrier_id=current_user.id,
        type=vehicle_in.type,
        capacity=vehicle_in.capacity,
        license_plate=vehicle_in.license_plate,
        rc_number=vehicle_in.rc_number,
        is_active=vehicle_in.is_active
    )
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle


# ---------------------------
# Get All Vehicles of Current Carrier
# ---------------------------
@vehicle_router.get("/", response_model=list[VehicleOut])
def get_vehicles(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "carrier":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only carriers can view their vehicles")
    
    vehicles = db.query(Vehicle).filter(Vehicle.carrier_id == current_user.id).all()
    return vehicles

# ---------------------------
# Get Vehicle by ID
# ---------------------------
@vehicle_router.get("/{vehicle_id}", response_model=VehicleOut)
def get_vehicle(vehicle_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.carrier_id == current_user.id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

# ---------------------------
# Update Vehicle
# ---------------------------
@vehicle_router.put("/{vehicle_id}", response_model=VehicleOut)
def update_vehicle(
    vehicle_id: UUID,
    vehicle_in: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    # Ownership check
    if vehicle.carrier_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this vehicle")
    
    # Duplicate checks
    if db.query(Vehicle).filter(Vehicle.license_plate == vehicle_in.license_plate, Vehicle.id != vehicle_id).first():
        raise HTTPException(status_code=400, detail="License plate already exists")
    
    if db.query(Vehicle).filter(Vehicle.rc_number == vehicle_in.rc_number, Vehicle.id != vehicle_id).first():
        raise HTTPException(status_code=400, detail="RC number already exists")
    
    # Update
    vehicle.type = vehicle_in.type
    vehicle.capacity = vehicle_in.capacity
    vehicle.license_plate = vehicle_in.license_plate
    vehicle.rc_number = vehicle_in.rc_number
    vehicle.is_active = vehicle_in.is_active

    db.commit()
    db.refresh(vehicle)
    return vehicle


# ---------------------------
# Delete Vehicle
# ---------------------------
@vehicle_router.delete("/{vehicle_id}", status_code=204)
def delete_vehicle(vehicle_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.carrier_id == current_user.id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    db.delete(vehicle)
    db.commit()
    return
