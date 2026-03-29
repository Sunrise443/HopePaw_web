import api from "./axios";
import type {
  FileUploadResponse,
  FileDownloadResponse,
  FileDeleteResponse,
} from "../types/file";

export const filesApi = {
  uploadFile: async (file: File): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post<FileUploadResponse>(
      "/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  },

  getDownloadUrl: async (fileId: string): Promise<FileDownloadResponse> => {
    const { data } = await api.get<FileDownloadResponse>(
      `/files/${fileId}/download`,
    );
    return data;
  },

  deleteFile: async (fileId: string): Promise<FileDeleteResponse> => {
    const { data } = await api.delete<FileDeleteResponse>(`/files/${fileId}`);
    return data;
  },
};
