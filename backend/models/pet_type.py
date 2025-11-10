from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class PetType(Base):
    __tablename__ = "pet_types"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
