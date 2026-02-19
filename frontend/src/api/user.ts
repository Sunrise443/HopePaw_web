import api from "./axios";
import type { Item } from "../types/item";
import type { RegisterData, UserProfile } from "../types/user";

export const registerUser = (data: RegisterData) => {
  return api.post<UserProfile>("/auth/register", data);
};

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

export const getAllUsers = () => {
  return api.get<UserProfile[]>("/users/users/");
};

export const updateUserRole = (userId: number, role: string) => {
  return api.put<UserProfile>(`/users/user/${userId}/role`, role);
};
