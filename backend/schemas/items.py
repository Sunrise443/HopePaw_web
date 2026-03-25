from typing import List, Optional

from pydantic import BaseModel


class ItemBase(BaseModel):
    id: int
    name: str
    price: float
    vendor_id: int
    description: str

    class Config:
        from_attributes = True


class ItemCardRead(ItemBase):
    description: str


class ItemCreate(BaseModel):
    name: str
    price: float
    vendor_id: int
    description: str
    pet_type_id: int
    category_id: int


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
