import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ExpenseCharts = ({ stats }) => {
    if (!stats)
        return _jsx("div", { children: "No data for charts" });
    return (_jsxs("div", { className: "p-4 bg-gray-50 border rounded mt-4", children: [_jsx("h4", { className: "text-gray-600 font-bold mb-2", children: "Expense Summary Chart" }), _jsxs("div", { className: "flex gap-4 items-end h-32", children: [stats.byCategory?.map((item, idx) => (_jsx("div", { className: "bg-blue-500 w-16 text-white text-xs text-center flex flex-col justify-end", style: { height: '80%' }, children: _jsx("span", { className: "p-1", children: item.category }) }, idx))), (!stats.byCategory || stats.byCategory.length === 0) && (_jsx("div", { className: "text-gray-400 text-sm", children: "No categorical data to display" }))] })] }));
};
export default ExpenseCharts;
