//src/routes/UserProtected.tsx

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../features/auth/useAuth";

export default function UserProtected({ children }: { children: ReactNode }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  if (role !== "user") return <Navigate to="/admin/dashboard" />;
  return children;
}

