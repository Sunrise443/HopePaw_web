from typing import List

from database import get_db
from deps import get_current_user, require_self
from fastapi import APIRouter, Depends, HTTPException
from models.user import User
from schemas.users import UserRead, UserUpdate
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("/user/", response_model=UserRead)
def get_user(current_user=Depends(get_current_user)):
    return current_user


@router.get("/users/", response_model=List[UserRead])
def get_all_users(
    db: Session = Depends(get_db),
):
    return db.query(User)


@router.put("/user/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_self),
):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in user.dict(exclude_unset=True).items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/user/{user_id}", response_model=UserRead)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_self),
):
    user_to_delete = db.query(User).filter(User.id == user_id).first()
    if user_to_delete is None:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user_to_delete)
    db.commit()
    return user_to_delete
