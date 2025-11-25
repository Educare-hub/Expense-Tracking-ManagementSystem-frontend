import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/expenses/ReportsPage.tsx
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetExpenseStatsQuery } from "../../features/expenses/expensesAPI";
import ExpenseCharts from "../../components/charts/ExpenseCharts";
const ReportsPage = () => {
    const userId = useSelector((s) => s.auth.user?.userid);
    const [year, setYear] = useState(new Date().getFullYear());
    const { data: stats, isLoading } = useGetExpenseStatsQuery({ userId, year }, { skip: !userId });
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-black flex items-center justify-center", children: _jsx("div", { className: "text-white text-xl", children: "Loading reports..." }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-black p-6", children: _jsxs("div", { className: "glass-gold p-10 max-w-6xl mx-auto rounded-3xl border border-amber-600/30", children: [_jsx("h3", { className: "text-3xl font-bold text-amber-400 mb-6", children: "Expense Reports" }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "text-white mr-3 text-lg", children: "Year:" }), _jsx("input", { type: "number", value: year, onChange: (e) => setYear(Number(e.target.value)), className: "p-3 rounded-xl bg-white/10 border border-white/20 text-white w-32" })] }), stats && _jsx(ExpenseCharts, { stats: stats }), _jsxs("div", { className: "mt-8", children: [_jsx("h4", { className: "text-2xl font-semibold text-amber-300 mb-4", children: "Category Breakdown" }), _jsx("div", { className: "space-y-2", children: stats?.byCategory && stats.byCategory.length > 0 ? (stats.byCategory.map((c) => (_jsxs("div", { className: "flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20", children: [_jsx("div", { className: "text-white font-medium", children: c.category }), _jsxs("div", { className: "text-amber-400 font-bold", children: ["$", Number(c.total).toFixed(2)] })] }, c.category)))) : (_jsx("div", { className: "text-gray-400 text-center py-8", children: "No data available for this period" })) })] })] }) }));
};
export default ReportsPage;
