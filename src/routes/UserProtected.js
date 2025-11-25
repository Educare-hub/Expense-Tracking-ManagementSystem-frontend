import { jsx as _jsx } from "react/jsx-runtime";
//src/routes/UserProtected.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
export default function UserProtected({ children }) {
    const { isAuthenticated, role } = useAuth();
    if (!isAuthenticated)
        return _jsx(Navigate, { to: "/auth/login" });
    if (role !== "user")
        return _jsx(Navigate, { to: "/admin/dashboard" });
    return children;
}
