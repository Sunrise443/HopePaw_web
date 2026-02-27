import hashlib
from datetime import datetime, timedelta
from http.client import HTTPException

from core.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ALGORITHM,
    REFRESH_TOKEN_EXPIRE_DAYS,
    SECRET_KEY,
)
from jose import jwt
from passlib.context import CryptContext


pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


def create_token(data: dict, expires_delta: timedelta, token_type: str):
    to_encode = data.copy()
    now = datetime.now()

    to_encode.update({"exp": now + expires_delta, "iat": now, "type": token_type})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(data: dict):
    return create_token(
        data, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES), token_type="access"
    )


def create_refresh_token(data: dict):
    return create_token(
        data, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS), token_type="refresh"
    )


def verify_token(token: str, expected_type: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    if payload.get("type") != expected_type:
        raise HTTPException(status_code=401, detail="Invalid token type")

    return payload


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()
