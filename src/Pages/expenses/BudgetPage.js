import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/expenses/BudgetPage.tsx
import { useState } from "react";
import { useGetExpensesQuery, useUpdateExpenseMutation, useDeleteExpenseMutation } from "../../features/expenses/expensesAPI";
import ReactApexChart from "react-apexcharts";
import { Crown, Edit2, Trash2, Save, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
const BudgetPage = () => {
    // FIX: Access array directly
    const { data: expenses = [], isLoading } = useGetExpensesQuery();
    const [updateExpense] = useUpdateExpenseMutation();
    const [deleteExpense] = useDeleteExpenseMutation();
    const [editingId, setEditingId] = useState(null);
    // FIX: Using 'note' in state
    const [editForm, setEditForm] = useState({ note: "", amount: "" });
    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    // Stats Calculation
    const byCategory = expenses.reduce((acc, e) => {
        const cat = e.category_id ? `Category ${e.category_id}` : "General";
        acc[cat] = (acc[cat] || 0) + Number(e.amount);
        return acc;
    }, {});
    const chartData = {
        series: Object.values(byCategory),
        options: {
            chart: { type: "pie" },
            labels: Object.keys(byCategory),
            colors: ["#f59e0b", "#d97706", "#b45309"],
            theme: { mode: "dark" }
        }
    };
    const startEdit = (exp) => {
        setEditingId(exp.id);
        setEditForm({ note: exp.note, amount: String(exp.amount) });
    };
    const saveEdit = async () => {
        if (!editingId)
            return;
        await updateExpense({ id: editingId, body: { note: editForm.note, amount: Number(editForm.amount) } });
        setEditingId(null);
        toast.success("Updated");
    };
    if (isLoading)
        return _jsx("div", { className: "text-amber-500 text-center text-2xl mt-20", children: "Loading Empire..." });
    return (_jsxs("div", { className: "min-h-screen bg-black text-white p-8 pb-32", children: [_jsx(Toaster, {}), _jsx("h1", { className: "text-8xl font-black text-center text-amber-500 mb-12", children: "BUDGET PAGE" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20", children: [_jsxs("div", { className: "bg-amber-900/20 border border-amber-600 rounded-3xl p-8 text-center", children: [_jsx(Crown, { className: "w-16 h-16 mx-auto text-yellow-400 mb-4" }), _jsxs("p", { className: "text-6xl font-black", children: ["KES ", total.toLocaleString()] })] }), _jsx("div", { children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: "pie", height: 300 }) })] }), _jsx("div", { className: "max-w-4xl mx-auto space-y-4", children: expenses.map((exp) => (_jsx("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center", children: editingId === exp.id ? (_jsxs("div", { className: "flex gap-4 w-full", children: [_jsx("input", { value: editForm.note, onChange: (e) => setEditForm({ ...editForm, note: e.target.value }), className: "bg-black border border-amber-500 p-2 text-white flex-1" }), _jsx("input", { value: editForm.amount, onChange: (e) => setEditForm({ ...editForm, amount: e.target.value }), className: "bg-black border border-amber-500 p-2 text-white w-32" }), _jsx("button", { onClick: saveEdit, children: _jsx(Save, { className: "text-green-500" }) }), _jsx("button", { onClick: () => setEditingId(null), children: _jsx(X, { className: "text-gray-500" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: exp.note }), _jsx("p", { className: "text-gray-400", children: format(new Date(exp.expense_date), "dd MMM yyyy") })] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("p", { className: "text-2xl text-amber-400 font-bold", children: ["KES ", exp.amount] }), _jsx("button", { onClick: () => startEdit(exp), children: _jsx(Edit2, { className: "text-gray-400" }) }), _jsx("button", { onClick: () => deleteExpense(exp.id), children: _jsx(Trash2, { className: "text-red-500" }) })] })] })) }, exp.id))) })] }));
};
export default BudgetPage;
