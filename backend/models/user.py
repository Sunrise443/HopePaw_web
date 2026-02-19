from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .associations import user_cart_items, user_items
from .base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    login: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=False)

    email: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=True)
    money_sent: Mapped[int] = mapped_column(Integer, default=0)

    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)
    role: Mapped["Role"] = relationship(back_populates="users")  # noqa: F821

    bought_items: Mapped[list["Item"]] = relationship(  # noqa: F821
        secondary=user_items,
        back_populates="buyers",
    )

    cart: Mapped[list["Item"]] = relationship(  # noqa: F821
        secondary=user_cart_items,
        back_populates="in_carts",
    )
