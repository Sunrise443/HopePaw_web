import api from "./axios";
import type { Item } from "../types/item";

export interface PaginatedResponse {
  items: Item[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export const getItems = (params?: {
  max_price?: number;
  category_id?: number;
  pet_type_id?: number;
  sort_by_popularity?: boolean;
  sort_type?: string;
  page?: number;
  per_page?: number;
}) => {
  return api.get<PaginatedResponse>("/items/items/", { params });
};

export const getItemById = (id: number) => {
  return api.get<Item>(`/items/item/${id}/`);
};

export const createItem = (data: {
  name: string;
  description: string;
  price: number;
  vendor_id: number;
  pet_type_id: number;
  category_id: number;
  photo?: File | null;
}) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("vendor_id", data.vendor_id.toString());
  formData.append("pet_type_id", data.pet_type_id.toString());
  formData.append("category_id", data.category_id.toString());

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  return api.post<Item>("/items/item/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateItem = (
  id: number,
  params: {
    name?: string;
    description?: string;
    price?: number;
  },
) => {
  return api.patch<Item>(`/items/item/${id}/edit/`, params);
};

export const deleteItem = (id: number) => {
  return api.delete<Item>(`/items/item/${id}/delete`);
};
