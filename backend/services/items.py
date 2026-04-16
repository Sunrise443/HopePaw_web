from typing import Optional

from fastapi import UploadFile
from models.item import Item
from models.user import User
from services.minio import FileService
from sqlalchemy.orm import Session


async def create_item_service(
    db: Session,
    current_user: User,
    name: str,
    price: float,
    vendor_id: int,
    description: str,
    pet_type_id: int,
    category_id: int,
    photo: Optional[UploadFile],
):
    file_id = None

    if photo and photo.filename:
        file_service = FileService(db)
        uploaded_file = await file_service.upload_file(photo, current_user)
        file_id = uploaded_file.id

    db_item = Item(
        name=name,
        description=description,
        price=price,
        vendor_id=vendor_id,
        pet_type_id=pet_type_id,
        category_id=category_id,
        file_id=file_id,
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
