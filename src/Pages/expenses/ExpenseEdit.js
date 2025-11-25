import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/expenses/ExpenseEdit.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetExpensesQuery, useUpdateExpenseMutation } from "../../features/expenses/expensesAPI";
import toast from "react-hot-toast";
const ExpenseEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: expenses, isLoading } = useGetExpensesQuery();
    const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();
    // expenses is already an array from the API
    const expense = expenses?.find((e) => String(e.id) === id);
    const [form, setForm] = useState({
        category_id: 1,
        amount: "",
        note: "",
        expense_date: "",
    });
    useEffect(() => {
        if (expense) {
            setForm({
                category_id: expense.category_id || 1,
                amount: String(expense.amount || 0),
                note: expense.note || "",
                expense_date: expense.expense_date ? expense.expense_date.split('T')[0] : new Date().toISOString().split('T')[0],
            });
        }
    }, [expense]);
    if (isLoading)
        return _jsx("div", { className: "text-white text-center mt-20", children: "Loading..." });
    if (!expense)
        return _jsx("div", { className: "text-red-500 text-center mt-20", children: "Expense not found" });
    const submit = async (e) => {
        e.preventDefault();
        try {
            await updateExpense({
                id: Number(id),
                body: {
                    note: form.note,
                    amount: Number(form.amount),
                    category_id: form.category_id,
                    expense_date: form.expense_date
                }
            }).unwrap();
            toast.success("Correction Saved");
            navigate("/expenses/budget");
        }
        catch (err) {
            toast.error("Update failed");
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-black flex items-center justify-center p-6", children: _jsxs("div", { className: "glass-gold p-10 w-full max-w-2xl rounded-3xl border border-amber-600/30", children: [_jsx("h1", { className: "text-3xl font-bold text-amber-400 mb-6", children: "Edit Entry" }), _jsxs("form", { onSubmit: submit, className: "space-y-4", children: [_jsx("input", { type: "number", value: form.category_id, onChange: (e) => setForm({ ...form, category_id: Number(e.target.value) }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white", placeholder: "Category ID" }), _jsx("input", { type: "number", value: form.amount, onChange: (e) => setForm({ ...form, amount: e.target.value }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white", placeholder: "Amount" }), _jsx("input", { type: "date", value: form.expense_date, onChange: (e) => setForm({ ...form, expense_date: e.target.value }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" }), _jsx("textarea", { value: form.note, onChange: (e) => setForm({ ...form, note: e.target.value }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white h-32", placeholder: "Note" }), _jsx("button", { type: "submit", disabled: isUpdating, className: "btn-premium w-full py-3", children: isUpdating ? "Saving..." : "Save Changes" })] })] }) }));
};
export default ExpenseEdit;
