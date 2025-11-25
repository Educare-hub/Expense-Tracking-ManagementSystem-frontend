import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
export default function AdminProtected({ children }) {
    const { isAuthenticated, role } = useAuth();
    if (!isAuthenticated)
        return _jsx(Navigate, { to: "/auth/login" });
    if (role !== "admin")
        return _jsx(Navigate, { to: "/user/dashboard" });
    return children;
}
