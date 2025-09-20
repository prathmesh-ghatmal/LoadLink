from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date

from app import models
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from app.dependencies import get_db, get_current_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])

# ------------------
# Create Review
# ------------------
@router.post("/", response_model=ReviewResponse)
def create_review(
    review_in: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Check if booking exists
    booking = db.query(models.Booking).filter_by(id=review_in.booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # Prevent user from reviewing themselves
    if review_in.to_user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot review yourself")

    review = models.Review(
        booking_id=review_in.booking_id,
        from_user_id=current_user.id,
        to_user_id=review_in.to_user_id,
        rating=review_in.rating,
        comment=review_in.comment,
        created_date=date.today()
    )

    db.add(review)

    # ------------------
    # Update booking review flags
    # ------------------
    if current_user.id == booking.shipper_id:
        booking.shipper_reviewed = True
    elif current_user.id == booking.trip.carrier_id:  # Assuming trip has carrier_id
        booking.carrier_reviewed = True

    db.commit()
    db.refresh(review)
    return review


# ------------------
# Get All Reviews
# ------------------
@router.get("/", response_model=list[ReviewResponse])
def get_reviews(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Review).all()

# ------------------
# Get Review by ID
# ------------------
@router.get("/{review_id}", response_model=ReviewResponse)
def get_review(
    review_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    review = db.query(models.Review).filter_by(id=review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

# ------------------
# Update Review
# ------------------
@router.put("/{review_id}", response_model=ReviewResponse)
def update_review(
    review_id: str,
    review_in: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    review = db.query(models.Review).filter_by(id=review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Only author can update
    if review.from_user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    for key, value in review_in.dict(exclude_unset=True).items():
        setattr(review, key, value)

    db.commit()
    db.refresh(review)
    return review

# ------------------
# Delete Review
# ------------------
@router.delete("/{review_id}", status_code=204)
def delete_review(
    review_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    review = db.query(models.Review).filter_by(id=review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Only author can delete
    if review.from_user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(review)
    db.commit()
    return
