from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import UUID
from app.dependencies import get_current_user
from app.models import User
from app.schemas.user import  UserOut
from app.database import get_db
from sqlalchemy.orm import Session


user_router = APIRouter(prefix="/users", tags=["Users"])


@user_router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@user_router.get("/{user_id}", response_model=UserOut)
def get_user_by_id(user_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Convert string to UUID
    return current_user