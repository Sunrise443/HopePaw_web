from sqlalchemy import Column, ForeignKey, Table

from .base import Base


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
