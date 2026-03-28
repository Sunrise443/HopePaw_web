from database import get_db
from deps import get_current_user
from fastapi import APIRouter, Depends, File, UploadFile
from schemas.files import FileDeleteResponse, FileDownloadResponse, FileUploadResponse
from services.minio import FileService
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/upload", response_model=FileUploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = FileService(db)
    db_file = await service.upload_file(file, current_user)
    return {"file_id": db_file.id, "filename": db_file.filename, "size": db_file.size}


@router.get("/{file_id}/download", response_model=FileDownloadResponse)
def download_file(
    file_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = FileService(db)
    url = service.get_presigned_url(file_id, current_user)
    return {"url": url, "expires_in": 300}


@router.delete("/{file_id}", response_model=FileDeleteResponse)
def delete_file(
    file_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = FileService(db)
    service.delete_file(file_id, current_user)
    return {"detail": "File deleted"}
