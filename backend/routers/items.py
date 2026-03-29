from typing import Optional

from core.permissions import PermissionEnum
from database import get_db
from deps import require_permission
from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from models.item import Item
from models.user import User
from schemas.items import (
    ItemBase,
    ItemCardRead,
    ItemCreate,
    ItemUpdate,
    PaginatedItemsResponse,
)
from services.crud import get_item_by_id
from services.minio import FileService
from sqlalchemy import func
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/item/", response_model=ItemBase)
async def create_item(
    item: ItemCreate = Depends(),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PRODUCT_CREATE)),
):
    file_id = None

    if photo and photo.filename:
        file_service = FileService(db)
        uploaded_file = await file_service.upload_file(photo, current_user)
        file_id = uploaded_file.id

    db_item = Item(
        **item.model_dump(),
        file_id=file_id,
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/items/", response_model=PaginatedItemsResponse)
def read_items(
    db: Session = Depends(get_db),
    max_price: Optional[int] = Query(None, description="Filter items by price"),
    category_id: Optional[int] = Query(None, description="Filter items by category"),
    pet_type_id: Optional[int] = Query(None, description="Filter items by pet_type"),
    sort_by_popularity: bool = Query(False, description="Sort by number of buyers"),
    sort_type: Optional[str] = Query(None, description="Sort by this sort type"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(12, ge=1, le=100, description="Items per page"),
):
    query = db.query(Item)

    if sort_by_popularity:
        query = (
            query.outerjoin(User.user_items)
            .group_by(Item.id)
            .order_by(func.count(User.user_items.c.user_id).desc())
        )

    if sort_type == "price_asc":
        query = query.order_by(Item.price.asc())
    elif sort_type == "price_desc":
        query = query.order_by(Item.price.desc())

    if max_price is not None:
        query = query.filter(Item.price <= max_price)
    if category_id is not None:
        query = query.filter(Item.category_id == category_id)
    if pet_type_id is not None:
        query = query.filter(Item.pet_type_id == pet_type_id)

    total = query.count()

    offset = (page - 1) * per_page
    items = query.offset(offset).limit(per_page).all()

    if not items and page > 1:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Page not found")

    file_service = FileService(db)

    for item in items:
        if item.file:
            item.photo_url = file_service.get_presigned_url_public(item.file.id)

    return PaginatedItemsResponse(
        items=items,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=(total + per_page - 1) // per_page,
    )


@router.get("/item/{item_id}/", response_model=ItemCardRead)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = get_item_by_id(db, item_id)
    if item is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Item not found")

    if item.file:
        file_service = FileService(db)
        item.photo_url = file_service.get_presigned_url_public(item.file.id)

    return item


@router.delete("/item/{item_id}/delete/", response_model=ItemCardRead)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PRODUCT_DELETE)),
):
    item_to_delete = get_item_by_id(db, item_id)

    if item_to_delete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )

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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item_to_update, field, value)

    db.commit()
    db.refresh(item_to_update)

    return item_to_update
