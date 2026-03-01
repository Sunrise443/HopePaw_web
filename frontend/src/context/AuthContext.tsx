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

  const navigate = useNavigate();
  const isAuthenticated = !!accessToken;
  const isAdmin = user?.role?.name === "admin";

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setUser(null);
        return;
      }

      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
        if (error.response?.status === 401) {
          setAccessToken(null);
        }
      }
    };

    fetchUser();
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
    setUser(jwtDecode(response.data.access_token));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);

    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
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
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
