import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//src/Pages/expenses/RecurringPayments.tsx
import { useState } from "react";
import { useGetExpensesQuery, useCreateExpenseMutation, useUpdateExpenseMutation } from "../../features/expenses/expensesAPI";
import toast from "react-hot-toast";
const RecurringPayments = () => {
    // FIXED: Renamed 'data' to 'expenses' for clarity
    const { data: expenses, isLoading } = useGetExpensesQuery();
    const [createExpense] = useCreateExpenseMutation();
    const [updateExpense] = useUpdateExpenseMutation();
    // FIXED: Remove .data access - expenses is already an array
    // FIXED: Use 'is_recurring' instead of 'recurring' to match SQL schema
    const recurring = expenses?.filter((e) => e.is_recurring) || [];
    const [form, setForm] = useState({
        category_id: 1,
        amount: "",
        note: "",
        currency: "USD"
    });
    const addRecurring = async (e) => {
        e.preventDefault();
        try {
            await createExpense({
                ...form,
                amount: Number(form.amount),
                is_recurring: true,
                expense_date: new Date().toISOString().split('T')[0],
                user_id: 1 // You may need to get this from auth state
            }).unwrap();
            setForm({ category_id: 1, amount: "", note: "", currency: "USD" });
            toast.success("Recurring payment added");
        }
        catch (err) {
            toast.error("Failed to add recurring payment");
        }
    };
    const toggleRecurring = async (item) => {
        try {
            await updateExpense({
                id: item.id,
                body: { is_recurring: !item.is_recurring }
            }).unwrap();
            toast.success("Updated successfully");
        }
        catch (err) {
            toast.error("Update failed");
        }
    };
    if (isLoading)
        return _jsx("div", { className: "text-white text-center mt-20", children: "Loading..." });
    return (_jsx("div", { className: "min-h-screen bg-black p-6", children: _jsxs("div", { className: "glass-gold p-10 max-w-4xl mx-auto rounded-3xl border border-amber-600/30", children: [_jsx("h3", { className: "text-3xl font-bold text-amber-400 mb-6", children: "Recurring Payments" }), _jsxs("form", { onSubmit: addRecurring, className: "mb-8 space-y-4", children: [_jsx("input", { placeholder: "Category ID", type: "number", value: form.category_id, onChange: (e) => setForm({ ...form, category_id: Number(e.target.value) }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" }), _jsx("input", { placeholder: "Amount", type: "number", value: form.amount, onChange: (e) => setForm({ ...form, amount: e.target.value }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" }), _jsx("input", { placeholder: "Currency", value: form.currency, onChange: (e) => setForm({ ...form, currency: e.target.value }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" }), _jsx("textarea", { placeholder: "Note", value: form.note, onChange: (e) => setForm({ ...form, note: e.target.value }), className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white h-32" }), _jsx("button", { className: "btn-premium w-full py-3", children: "Add Recurring Payment" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-2xl font-semibold text-amber-300 mb-4", children: "Existing Recurring Payments" }), recurring.length ? (_jsx("ul", { className: "space-y-3", children: recurring.map((r) => (_jsxs("li", { className: "flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20", children: [_jsxs("div", { className: "text-white", children: [_jsxs("div", { className: "font-semibold text-lg", children: ["Category ", r.category_id, " \u2014 ", r.currency, " ", r.amount] }), _jsx("div", { className: "text-sm text-gray-300", children: r.note })] }), _jsx("div", { children: _jsx("button", { onClick: () => toggleRecurring(r), className: "px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition", children: "Toggle Off" }) })] }, r.id))) })) : (_jsx("div", { className: "text-gray-400 text-center py-8", children: "No recurring payments" }))] })] }) }));
};
export default RecurringPayments;
