from typing import List, Optional

from pydantic import BaseModel

from .items import ItemCardRead


class UserBase(BaseModel):
    login: str

    class Config:
        orm_mode = True


class UserRead(UserBase):
    id: int
    money_sent: int
    bought_items: List[ItemCardRead] = []
    email: str
    city: Optional[str] = None


class UserCreate(UserBase):
    password: str
    email: str
    city: Optional[str] = None


class UserUpdate(UserBase):
    email: Optional[str] = None
    city: Optional[str] = None
