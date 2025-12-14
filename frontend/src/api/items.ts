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
  return api.get<Item>(`/item/${id}/`);
};
