import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetExpensesQuery, useDeleteExpenseMutation } from "../../features/expenses/expensesAPI";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const ExpenseList = () => {
    // FIX: Access array directly
    const { data: expenses = [], isLoading } = useGetExpensesQuery();
    const [deleteExpense] = useDeleteExpenseMutation();
    if (isLoading)
        return _jsx("div", { className: "p-8 text-white", children: "Loading Empire..." });
    return (_jsxs("div", { className: "min-h-screen bg-black text-white p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h2", { className: "text-4xl font-bold text-amber-400", children: "All Expenses" }), _jsx(Link, { to: "/expenses/create", className: "btn-premium px-6 py-2 rounded-full text-black font-bold", children: "New +" })] }), _jsxs("table", { className: "w-full mt-4 text-left", children: [_jsx("thead", { className: "text-amber-400 border-b border-amber-800", children: _jsxs("tr", { children: [_jsx("th", { className: "p-4", children: "Note" }), _jsx("th", { className: "p-4", children: "Amount" }), _jsx("th", { className: "p-4", children: "Date" }), _jsx("th", { className: "p-4", children: "Action" })] }) }), _jsx("tbody", { children: expenses.map((e) => (_jsxs("tr", { className: "border-b border-white/10 hover:bg-white/5", children: [_jsx("td", { className: "p-4", children: e.note }), _jsxs("td", { className: "p-4", children: ["KES ", e.amount] }), _jsx("td", { className: "p-4", children: format(new Date(e.expense_date), "yyyy-MM-dd") }), _jsxs("td", { className: "p-4 gap-4 flex", children: [_jsx(Link, { to: `/expenses/edit/${e.id}`, className: "text-blue-400", children: "Edit" }), _jsx("button", { onClick: () => deleteExpense(e.id), className: "text-red-400", children: "Delete" })] })] }, e.id))) })] })] }));
};
export default ExpenseList;
