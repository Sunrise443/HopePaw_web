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

  const userRoles = user?.roles?.map((role) => role.name) ?? [];
  const hasAccess =
    !requiredRoles || requiredRoles.some((requiredRole) => userRoles.includes(requiredRole));

  if (!hasAccess) {
    return <Navigate to="/error-403" replace />;
  }

  return <>{children}</>;
};
