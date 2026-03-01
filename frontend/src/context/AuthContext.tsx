// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api, { accessToken, setAccessToken } from "../api/axios.ts";
import { getProfile } from "@/api/user.ts";
import type { UserProfile } from "@/types/user.ts";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const isAuthenticated = !!user; // теперь зависит от состояния user
  const isAdmin = user?.role?.name === "admin";

  // При монтировании пытаемся восстановить пользователя
  useEffect(() => {
    const initAuth = async () => {
      if (!accessToken) return;

      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        setUser(null);
        setAccessToken(null);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await api.post("/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    setAccessToken(response.data.access_token);

    // Декодируем JWT, чтобы получить данные пользователя
    setUser(jwtDecode(response.data.access_token));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
