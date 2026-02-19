import api from "./axios";
import type { Item } from "../types/item";

export const getItems = (params?: {
  max_price?: number;
  category_id?: number;
  pet_type_id?: number;
  sort_by_popularity?: boolean;
}) => {
  return api.get<Item[]>("/items/items/", { params });
};

export const getItemById = (id: number) => {
  return api.get<Item>(`/items/item/${id}/`);
};

export const createItem = (params: {
  name: string;
  description: string;
  price: number;
  vendor_id: number;
  pet_type_id: number;
  category_id: number;
}) => {
  return api.post<Item>("/items/item/", params);
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
