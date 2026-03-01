import axios from "axios";
import { useNavigate } from "react-router-dom";

export let accessToken: string | null = null;

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigate = useNavigate();
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const { data } = await api.post("/auth/refresh");
        accessToken = data.access_token;

        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
