import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
const AdminLayout = () => (_jsx("div", { className: "min-h-screen flex flex-col", children: _jsxs("main", { className: "flex-1 p-4", children: [_jsx(Outlet, {}), " "] }) }));
export default AdminLayout;
