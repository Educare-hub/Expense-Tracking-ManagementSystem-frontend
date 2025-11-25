import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ requiredRole }) => {
    const { token, user, loading } = useSelector((s) => s.auth);
    if (loading)
        return null; // or a loader component
    if (!token || !user)
        return _jsx(Navigate, { to: "/auth/login", replace: true });
    if (requiredRole && user.role !== requiredRole) {
        return user.role === "admin"
            ? _jsx(Navigate, { to: "/admin/dashboard", replace: true })
            : _jsx(Navigate, { to: "/user/dashboard", replace: true });
    }
    return _jsx(Outlet, {});
};
export default ProtectedRoute;
