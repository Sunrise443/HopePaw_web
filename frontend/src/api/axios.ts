// api/axios.ts
import axios from "axios";

export let accessToken: string | null = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // чтобы refresh cookie работала
});

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
