import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
//src/components/nav/Navbar.tsx
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
const Navbar = () => {
    const dispatch = useDispatch();
    // Get state from Redux:
    const { user, token } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("expensepro_token");
        localStorage.removeItem("token");
    };
    // Determine dashboard link based on role
    const dashboardLink = user?.role === "admin"
        ? "/admin/dashboard"
        : user?.role === "user"
            ? "/user/dashboard"
            : "/login";
    return (_jsx("div", { className: "bg-gradient-to-tr from-cyan-400 via-teal-500 to-blue-600 text-white shadow-md", children: _jsxs("div", { className: "navbar container mx-auto", children: [_jsx("div", { className: "navbar-start", children: _jsxs("div", { className: "dropdown", children: [_jsx("div", { tabIndex: 0, role: "button", className: "btn btn-ghost btn-circle md:hidden text-white", children: _jsx(FaBars, {}) }), _jsxs("ul", { tabIndex: -1, className: "menu menu-sm dropdown-content bg-gradient-to-tr \r\n                        from-cyan-400 via-teal-500 to-blue-600 text-white \r\n                        rounded-box z-10 mt-3 w-52 p-2 shadow", children: [_jsx("li", { children: _jsx(NavLink, { to: "/", children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/about", children: "About" }) }), _jsx("li", { children: _jsx(NavLink, { to: dashboardLink, children: "Dashboard" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/services", children: "Services" }) }), !token && (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(NavLink, { to: "/auth/register", children: "Register" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/auth/login", children: "Login" }) })] })), token && (_jsx("li", { children: _jsx("button", { onClick: handleLogout, children: "Logout" }) }))] })] }) }), _jsx("div", { className: "navbar-center hidden md:flex", children: _jsxs("ul", { className: "menu menu-horizontal px-1 text-white font-medium", children: [_jsx("li", { children: _jsx(NavLink, { to: "/", children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/about", children: "About" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/services", children: "Services" }) }), _jsx("li", { children: _jsx(NavLink, { to: dashboardLink, children: "Dashboard" }) })] }) }), _jsx("div", { className: "navbar-end hidden md:flex", children: _jsxs("ul", { className: "menu menu-horizontal px-1 text-white font-medium", children: [!token && (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(NavLink, { to: "/auth/register", children: "Register" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/auth/login", children: "Login" }) })] })), token && (_jsx("li", { children: _jsx("button", { onClick: handleLogout, className: "btn btn-sm btn-ghost", children: "Logout" }) }))] }) })] }) }));
};
export default Navbar;
