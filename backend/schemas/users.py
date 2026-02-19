from typing import List, Optional

from pydantic import BaseModel
from schemas.roles import RoleRead

from .items import ItemCardRead


class UserBase(BaseModel):
    login: str

    class Config:
        from_attributes = True


class UserRead(UserBase):
    id: int
    money_sent: int
    bought_items: List[ItemCardRead] = []
    email: str
    city: Optional[str] = None
    role: RoleRead


class UserCreate(UserBase):
    password: str
    email: str
    city: Optional[str] = None


class UserUpdate(UserBase):
    email: Optional[str] = None
    city: Optional[str] = None
