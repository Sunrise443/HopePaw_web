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

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Токен истёк — редирект на логин
//       localStorage.removeItem("access_token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
