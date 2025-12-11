//src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

type Props = { requiredRole?: "admin" | "user" };

const ProtectedRoute: React.FC<Props> = ({ requiredRole }) => {
  const { token, user, loading } = useSelector((s: RootState) => s.auth);

  if (loading) return null; 
  if (!token || !user) return <Navigate to="/auth/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return user.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
