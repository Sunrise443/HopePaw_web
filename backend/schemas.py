from typing import List, Optional

from pydantic import BaseModel


# ITEMS
class ItemBase(BaseModel):
    id: int
    name: str
    price: float
    vendor_id: int

    class Config:
        orm_mode = True


class ItemCardRead(ItemBase):
    description: str


class ItemCreate(ItemCardRead):
    pet_type_id: int
    category_id: int


# USER
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


# PARTNERS
class Partner(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    # picture

    class Config:
        orm_mode = True
