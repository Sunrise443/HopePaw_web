from pydantic import BaseModel


class FileUploadResponse(BaseModel):
    file_id: str
    filename: str
    size: int


class FileDownloadResponse(BaseModel):
    url: str
    expires_in: int  # seconds


class FileDeleteResponse(BaseModel):
    detail: str
