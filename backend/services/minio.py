import uuid
from datetime import timedelta
from io import BytesIO

from core.config import MINIO_BUCKET
from core.minio_init import minio_client
from fastapi import HTTPException, UploadFile
from models.file import FileModel
from models.user import User
from sqlalchemy.orm import Session


MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_TYPES = ["image/jpeg", "image/png"]


class FileService:
    def __init__(self, db: Session):
        self.db = db

    async def upload_file(self, file: UploadFile, owner: User) -> FileModel:
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=415, detail="This file type is unsupported")

        contents = await file.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail="File is too large")

        file_id = str(uuid.uuid4())
        key = f"{owner.id}/{file_id}_{file.filename}"

        try:
            minio_client.put_object(
                bucket_name=MINIO_BUCKET,
                object_name=key,
                data=BytesIO(contents),
                length=len(contents),
                content_type=file.content_type,
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"MinIO error: {str(e)}")

        db_file = FileModel(
            id=file_id,
            filename=file.filename,
            key=key,
            size=len(contents),
            content_type=file.content_type,
            owner=owner,
        )

        self.db.add(db_file)
        self.db.commit()
        self.db.refresh(db_file)
        return db_file

    def get_presigned_url(self, file_id: str, owner: User) -> str:
        db_file = (
            self.db.query(FileModel)
            .filter(FileModel.id == file_id, FileModel.owner_id == owner.id)
            .first()
        )

        if not db_file:
            raise HTTPException(status_code=404, detail="File not found")

        from datetime import timedelta

        url = minio_client.presigned_get_object(
            bucket_name=MINIO_BUCKET,
            object_name=db_file.key,
            expires=timedelta(minutes=5),
        )
        return url

    def get_presigned_url_public(self, file_id: str) -> str:
        db_file = self.db.query(FileModel).filter(FileModel.id == file_id).first()
        if not db_file:
            raise HTTPException(status_code=404, detail="File not found")

        from datetime import timedelta

        return minio_client.presigned_get_object(
            bucket_name=MINIO_BUCKET,
            object_name=db_file.key,
            expires=timedelta(minutes=15),
        )

    def get_presigned_urls(self, file_ids: list[str]) -> dict[str, str]:
        files = self.db.query(FileModel).filter(FileModel.id.in_(file_ids)).all()

        urls = {}
        for file in files:
            urls[file.id] = minio_client.presigned_get_object(
                bucket_name=MINIO_BUCKET,
                object_name=file.key,
                expires=timedelta(minutes=5),
            )
        return urls

    def delete_file(self, file_id: str, owner: User):
        db_file = (
            self.db.query(FileModel)
            .filter(FileModel.id == file_id, FileModel.owner_id == owner.id)
            .first()
        )

        if not db_file:
            raise HTTPException(status_code=404, detail="File not found")

        try:
            minio_client.remove_object(
                bucket_name=MINIO_BUCKET, object_name=db_file.key
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"MinIO delete error: {str(e)}")

        self.db.delete(db_file)
        self.db.commit()
        return True
