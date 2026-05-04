import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles) {
    const names = user?.roles?.map((r) => r.name) ?? [];
    const allowed = names.some((n) => requiredRoles.includes(n));
    if (!allowed) {
      return <Navigate to="/error-403" replace />;
    }
  }

  return <>{children}</>;
};
