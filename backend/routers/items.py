from typing import List, Optional

from core.permissions import PermissionEnum
from crud import get_item_by_id
from database import get_db
from deps import require_permission
from fastapi import APIRouter, Depends, HTTPException, Query
from models.item import Item
from models.user import User
from schemas.items import ItemBase, ItemCardRead, ItemCreate, ItemUpdate
from sqlalchemy import func
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/item/", response_model=ItemBase)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PRODUCT_CREATE)),
):
    db_item = Item(**item.model_dump())

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
        query = query.filter(Item.pet_type_id == pet_type_id)

    if query is None:
        raise HTTPException(status_code=404, detail="Items not found")

    items = query.all()

    return items


@router.get("/item/{item_id}/", response_model=ItemCardRead)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = get_item_by_id(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.delete("/item/{item_id}/delete/", response_model=ItemCardRead)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PRODUCT_DELETE)),
):
    item_to_delete = get_item_by_id(db, item_id)

    if item_to_delete is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item_to_delete)
    db.commit()

    return item_to_delete


@router.patch("/item/{item_id}/edit/", response_model=ItemCardRead)
def edit_item(
    item_id: int,
    data: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PRODUCT_UPDATE)),
):
    item_to_update = get_item_by_id(db, item_id)

    if item_to_update is None:
        raise HTTPException(status_code=404, detail="Item not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item_to_update, field, value)

    db.commit()
    db.refresh(item_to_update)

    return item_to_update
