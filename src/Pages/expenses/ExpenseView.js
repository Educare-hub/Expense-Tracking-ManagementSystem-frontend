import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import { useGetExpensesQuery } from "../../features/expenses/expensesAPI";
const ExpenseView = () => {
    const { id } = useParams();
    // FIXED: Renamed 'data' to 'expenses' for clarity
    const { data: expenses, isLoading } = useGetExpensesQuery();
    if (isLoading)
        return _jsx("div", { className: "text-white text-center mt-20", children: "Loading..." });
    // FIXED: Remove .data access - expenses is already an array
    // FIXED: Use 'id' instead of 'expense_id' to match SQL schema
    const expense = expenses?.find((e) => String(e.id) === id);
    if (!expense)
        return _jsx("div", { className: "text-red-500 text-center mt-20", children: "Expense not found" });
    return (_jsx("div", { className: "min-h-screen bg-black flex items-center justify-center p-6", children: _jsxs("div", { className: "glass-gold p-10 w-full max-w-2xl rounded-3xl border border-amber-600/30", children: [_jsx("h2", { className: "text-3xl font-bold text-amber-400 mb-6", children: "Expense Details" }), _jsxs("div", { className: "space-y-4 text-white", children: [_jsxs("div", { className: "p-4 bg-white/10 rounded-xl", children: [_jsx("strong", { className: "text-amber-300", children: "Amount:" }), _jsxs("span", { className: "ml-2", children: [expense.currency, " ", expense.amount] })] }), _jsxs("div", { className: "p-4 bg-white/10 rounded-xl", children: [_jsx("strong", { className: "text-amber-300", children: "Category ID:" }), _jsx("span", { className: "ml-2", children: expense.category_id || "General" })] }), _jsxs("div", { className: "p-4 bg-white/10 rounded-xl", children: [_jsx("strong", { className: "text-amber-300", children: "Date:" }), _jsx("span", { className: "ml-2", children: new Date(expense.expense_date).toLocaleDateString() })] }), _jsxs("div", { className: "p-4 bg-white/10 rounded-xl", children: [_jsx("strong", { className: "text-amber-300", children: "Note:" }), _jsx("div", { className: "mt-2", children: expense.note || "-" })] }), expense.receipt_url && (_jsxs("div", { className: "p-4 bg-white/10 rounded-xl", children: [_jsx("strong", { className: "text-amber-300", children: "Receipt:" }), _jsx("a", { href: expense.receipt_url, target: "_blank", rel: "noopener noreferrer", className: "ml-2 text-blue-400 underline", children: "View Receipt" })] }))] }), _jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx(Link, { to: `/expenses/${id}/edit`, className: "btn-premium flex-1 py-3 text-center", children: "Edit" }), _jsx(Link, { to: "/expenses/budget", className: "btn-secondary flex-1 py-3 text-center", children: "Back" })] })] }) }));
};
export default ExpenseView;
