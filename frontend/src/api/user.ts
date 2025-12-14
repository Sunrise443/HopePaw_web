import api from "./axios";
import type { Item } from "../types/item";
import type { UserProfile } from "../types/user";

export const getProfile = () => {
  return api.get<UserProfile>("users/user/");
};

export const updateProfile = (userId: number, data: Partial<UserProfile>) => {
  console.log(data);
  return api.put<UserProfile>(`/users/user/${userId}`, data);
};

export const getMyPurchases = () => {
  return api.get<Item[]>("/users/user/purchases");
};
