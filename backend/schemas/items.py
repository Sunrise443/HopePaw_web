from typing import List, Optional

from fastapi import Form
from pydantic import BaseModel


class ItemBase(BaseModel):
    id: int
    name: str
    price: float
    vendor_id: int
    description: str
    file_id: Optional[str] = None
    photo_url: Optional[str] = None

    class Config:
        from_attributes = True


class ItemCardRead(ItemBase):
    description: str


class ItemCreate(BaseModel):
    name: str = Form(...)
    price: float = Form(...)
    vendor_id: int = Form(...)
    description: str = Form(...)
    pet_type_id: int = Form(...)
    category_id: int = Form(...)

    class Config:
        extra = "ignore"


class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None


class PaginatedItemsResponse(BaseModel):
    items: List[ItemBase]
    total: int
    page: int
    per_page: int
    total_pages: int
