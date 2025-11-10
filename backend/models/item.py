from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .associations import user_cart_items, user_items
from .base import Base


class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)

    vendor_id: Mapped[int] = mapped_column(ForeignKey("partners.id"))
    vendor: Mapped["Partner"] = relationship(back_populates="items")  # noqa: F821

    price: Mapped[float] = mapped_column(Float, nullable=False)
    pet_type_id: Mapped[str] = mapped_column(ForeignKey("pet_types.id"))
    category_id: Mapped[str] = mapped_column(ForeignKey("categories.id"))

    buyers: Mapped[list["User"]] = relationship(  # noqa: F821
        secondary=user_items,
        back_populates="bought_items",
    )

    in_carts: Mapped[list["User"]] = relationship(  # noqa: F821
        secondary=user_cart_items,
        back_populates="cart",
    )
