from core.permissions import PermissionEnum
from database import get_db
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from models.user import User
from services.auth import verify_token
from services.crud import get_user_by_id
from sqlalchemy.orm import Session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    try:
        payload = verify_token(token, expected_type="access")
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token1"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid toke2n"
        )

    user = get_user_by_id(db, int(user_id))
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid token3")

    return user


def require_self(user_id: int, current_user=Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Access to user forbidden"
        )

    return current_user


def require_permission(permission: PermissionEnum):
    def checker(current_user: User = Depends(get_current_user)):
        user_permissions = {perm.name for perm in current_user.role.permissions}

        if permission.value not in user_permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permissions to access this page",
            )

        return current_user

    return checker


def require_role(required_role: str):
    def checker(current_user: User = Depends(get_current_user)):
        if current_user.role.name != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{required_role}' required",
            )

        return current_user

    return checker
