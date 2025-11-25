import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//src/dashboard/AdminDashboard/content/AdminDashboard.tsx
import { Users, DollarSign } from "lucide-react";
import { useGetUsersQuery } from "../../../features/auth/usersAPI";
import { useGetExpensesQuery } from "../../../features/expenses/expensesAPI";
const AdminDashboard = () => {
    const { data: usersData = [], isLoading: usersLoading } = useGetUsersQuery();
    const { data: expensesData = [], isLoading: expensesLoading } = useGetExpensesQuery(undefined);
    const usersArray = Array.isArray(usersData?.data)
        ? usersData.data
        : Array.isArray(usersData)
            ? usersData
            : [];
    const expensesArray = Array.isArray(expensesData?.data)
        ? expensesData.data
        : Array.isArray(expensesData)
            ? expensesData
            : [];
    const totalUsers = usersArray.length;
    const totalRevenue = expensesArray.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    return (_jsxs("div", { className: "min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white", children: [_jsx("h1", { className: "text-7xl font-black text-center mb-16", children: "ADMIN CENTER" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur p-8 rounded-3xl text-center", children: [_jsx(Users, { className: "w-16 h-16 mx-auto mb-4" }), _jsx("p", { className: "text-5xl font-bold", children: usersLoading ? "..." : totalUsers }), _jsx("p", { children: "Total Users" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur p-8 rounded-3xl text-center", children: [_jsx(DollarSign, { className: "w-16 h-16 mx-auto mb-4" }), _jsx("p", { className: "text-4xl font-bold", children: expensesLoading ? "..." : `KES ${totalRevenue.toLocaleString()}` }), _jsx("p", { children: "Total Spent" })] })] })] }));
};
export default AdminDashboard;
