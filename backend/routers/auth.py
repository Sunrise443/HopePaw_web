import datetime
from datetime import timedelta

import jwt
from core.config import ALGORITHM, REFRESH_TOKEN_EXPIRE_DAYS, SECRET_KEY
from crud import get_full_role_by_name, get_user_by_username
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError
from models.token import RefreshToken
from models.user import User
from schemas.auth import Token
from schemas.users import UserCreate, UserRead
from services.auth import (
    create_access_token,
    create_refresh_token,
    hash_password,
    hash_token,
    verify_password,
)
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    role = get_full_role_by_name(db, "user")

    user = User(
        login=user_in.login,
        hashed_password=hash_password(user_in.password),
        is_active=True,
        email=user_in.email,
        city=user_in.city,
        money_sent=0,
        role=role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    refresh_token_hash = hash_token(refresh_token)

    db_refresh_token = RefreshToken(
        user_id=user.id,
        token_hash=refresh_token_hash,
        expires_at=datetime.datetime.now()
        + datetime.timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
    )

    db.add(db_refresh_token)
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/refresh", response_model=Token)
def refresh(refresh_token: str, db: Session = Depends(get_db)):

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    token_hash = hash_token(refresh_token)

    db_token = (
        db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).first()
    )

    if not db_token:
        raise HTTPException(status_code=401, detail="Token revoked")

    if db_token.expires_at < datetime.datetime.now():
        db.delete(db_token)
        db.commit()
        raise HTTPException(status_code=401, detail="Token expired")

    db.delete(db_token)

    new_access = create_access_token({"sub": user_id})
    new_refresh = create_refresh_token({"sub": user_id})

    new_hash = hash_token(new_refresh)

    db.add(
        RefreshToken(
            user_id=user_id,
            token_hash=new_hash,
            expires_at=datetime.datetime.now()
            + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        )
    )

    db.commit()

    return {"access_token": new_access, "refresh_token": new_refresh}
