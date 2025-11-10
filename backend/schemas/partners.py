from typing import Optional

from pydantic import BaseModel


class PartnerBase(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    # picture

    class Config:
        orm_mode = True
