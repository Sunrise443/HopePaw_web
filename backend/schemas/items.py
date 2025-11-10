from pydantic import BaseModel


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
