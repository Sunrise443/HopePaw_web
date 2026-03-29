export interface FileUploadResponse {
  file_id: string;
  filename: string;
  size: number;
}

export interface FileDownloadResponse {
  url: string;
  expires_in: number;
}

export interface FileDeleteResponse {
  detail: string;
}

export interface FileMetadata {
  id: string;
  filename: string;
  size: number;
  content_type: string;
  uploaded_at?: string;
}
