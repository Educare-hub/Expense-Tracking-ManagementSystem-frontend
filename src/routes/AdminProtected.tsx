import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../features/auth/useAuth";

export default function AdminProtected({ children }: { children: ReactNode }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  if (role !== "admin") return <Navigate to="/user/dashboard" />;
  return children;
}
