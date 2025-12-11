// src/routes/AdminProtected.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function AdminProtected({ children }: { children: ReactNode }) {
  // Read directly from localStorage — no hooks, no race conditions, instant
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  // In my case if everything is good → render the admin dashboard
  return <>{children}</>;
}