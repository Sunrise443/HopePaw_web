from datetime import timedelta

from core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User
from schemas.auth import LoginRequest, Token
from schemas.users import UserCreate, UserRead
from services.auth import create_access_token, hash_password, verify_password
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        login=user_in.login,
        hashed_password=hash_password(user_in.password),
        is_active=True,
        email=user_in.email,
        city=user_in.city,
        money_sent=0,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.login == data.login).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": token}
