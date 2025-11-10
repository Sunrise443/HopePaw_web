from typing import List, Optional

from database import get_db
from fastapi import APIRouter, Depends, HTTPException, Query
from models.item import Item
from models.user import User
from schemas.items import ItemBase, ItemCardRead, ItemCreate
from sqlalchemy import func
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/item/", response_model=ItemBase)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/items/", response_model=List[ItemBase])
def read_items(
    db: Session = Depends(get_db),
    max_price: Optional[int] = Query(None, description="Filter items by price"),
    category_id: Optional[int] = Query(None, description="Filter items by category"),
    pet_type_id: Optional[int] = Query(None, description="Filter items by pet_type"),
    sort_by_popularity: bool = Query(False, description="Sort by number of buyers"),
):
    query = db.query(Item)

    if sort_by_popularity:
        query = (
            query.outerjoin(User.user_items)
            .group_by(Item.id)
            .order_by(func.count(User.user_items.c.user_id).desc())
        )

    if max_price is not None:
        query = query.filter(Item.price <= max_price)
    if category_id is not None:
        query = query.filter(Item.category_id == category_id)
    if pet_type_id is not None:
        query = query.filter(Item.pet_type_id == category_id)

    if query is None:
        raise HTTPException(status_code=404, detail="Items not found")

    items = query.all()

    return items


@router.get("/item/{item_id}/", response_model=ItemCardRead)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.delete("/item/{item_id}", response_model=ItemCardRead)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item_to_delete = db.query(Item).filter(Item.id == item_id).first()

    if item_to_delete is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item_to_delete)
    db.commit()

    return item_to_delete
