from database import Base
from sqlalchemy import Column, Float, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship


user_items = Table(
    "user_items",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("item_id", ForeignKey("items.id"), primary_key=True),
)

user_cart_items = Table(
    "user_cart_items",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("item_id", ForeignKey("items.id"), primary_key=True),
)


class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)

    vendor_id: Mapped[int] = mapped_column(ForeignKey("partners.id"))
    vendor: Mapped["Partner"] = relationship(back_populates="items")

    price: Mapped[float] = mapped_column(Float, nullable=False)
    pet_type_id: Mapped[str] = mapped_column(ForeignKey("pet_types.id"))
    category_id: Mapped[str] = mapped_column(ForeignKey("categories.id"))

    buyers: Mapped[list["User"]] = relationship(
        secondary=user_items,
        back_populates="bought_items",
    )

    in_carts: Mapped[list["User"]] = relationship(
        secondary=user_cart_items,
        back_populates="cart",
    )


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]


class PetType(Base):
    __tablename__ = "pet_types"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    login: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=True)
    money_sent: Mapped[int] = mapped_column(Integer, default=0)

    bought_items: Mapped[list[Item]] = relationship(
        secondary=user_items,
        back_populates="buyers",
    )

    cart: Mapped[list[Item]] = relationship(
        secondary=user_cart_items,
        back_populates="in_carts",
    )


class Partner(Base):
    __tablename__ = "partners"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)

    items: Mapped[list["Item"]] = relationship(back_populates="vendor")
