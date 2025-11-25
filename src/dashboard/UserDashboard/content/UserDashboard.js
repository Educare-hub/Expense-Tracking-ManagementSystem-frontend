import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, DollarSign, Crown, TrendingUp, Calendar, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, Sparkles, AlertCircle, Edit2, Check, X } from "lucide-react";
import { BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
const COLORS = ["#F59E0B", "#FB923C", "#FBBF24", "#FCD34D", "#FDE047", "#EF4444", "#F97316"];
// sample input for demonstration
const DEMO_EXPENSES = [
    { id: 1, note: "Groceries", amount: 1500, expense_date: "2024-11-20", currency: "KES" },
];
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
function getMonthYear(dateStr) {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
function formatMonthDay(dateStr) {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}`;
}
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}
// Floating money animations
const FloatingMoney = () => {
    const coins = Array.from({ length: 15 }, (_, i) => i);
    return (_jsx("div", { className: "fixed inset-0 pointer-events-none z-40 overflow-hidden", children: coins.map((i) => (_jsx(motion.div, { initial: {
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
                scale: 0
            }, animate: {
                y: window.innerHeight + 100,
                rotate: 360,
                scale: [0, 1, 1, 0]
            }, transition: {
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeInOut"
            }, className: "absolute", children: _jsx(DollarSign, { size: 40 + Math.random() * 30, className: "text-yellow-400 opacity-70" }) }, i))) }));
};
export default function UserDashboard() {
    const [expenses, setExpenses] = useState(DEMO_EXPENSES);
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState("");
    const [fly, setFly] = useState(false);
    const [showCharts, setShowCharts] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [notification, setNotification] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editNote, setEditNote] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const userName = "TheQADevOps";
    const total = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };
    // Analytics calculations
    const analytics = useMemo(() => {
        const today = new Date();
        const thisMonth = expenses.filter(e => {
            const expDate = new Date(e.expense_date);
            return expDate.getMonth() === today.getMonth() && expDate.getFullYear() === today.getFullYear();
        });
        const lastMonth = expenses.filter(e => {
            const expDate = new Date(e.expense_date);
            const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1);
            return expDate.getMonth() === lastMonthDate.getMonth() && expDate.getFullYear() === lastMonthDate.getFullYear();
        });
        const thisMonthTotal = thisMonth.reduce((s, e) => s + Number(e.amount), 0);
        const lastMonthTotal = lastMonth.reduce((s, e) => s + Number(e.amount), 0);
        const percentChange = lastMonthTotal ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1) : "0";
        // Omwami group by category - note
        const byCategory = expenses.reduce((acc, exp) => {
            acc[exp.note] = (acc[exp.note] || 0) + Number(exp.amount);
            return acc;
        }, {});
        // vile unatumia pesa kila siku
        const dailySpending = expenses.reduce((acc, exp) => {
            const date = formatMonthDay(exp.expense_date);
            acc[date] = (acc[date] || 0) + Number(exp.amount);
            return acc;
        }, {});
        const monthlyData = expenses.reduce((acc, exp) => {
            const month = getMonthYear(exp.expense_date);
            acc[month] = (acc[month] || 0) + Number(exp.amount);
            return acc;
        }, {});
        return {
            thisMonthTotal,
            lastMonthTotal,
            percentChange,
            avgPerDay: thisMonth.length ? (thisMonthTotal / thisMonth.length).toFixed(0) : "0",
            categoryData: Object.entries(byCategory).map(([name, value]) => ({ name, value })).slice(0, 6),
            trendData: Object.entries(dailySpending).slice(-14).map(([date, amount]) => ({ date, amount })),
            monthlyData,
        };
    }, [expenses]);
    const monthlyChartData = Object.entries(analytics.monthlyData).slice(-6).map(([month, total]) => ({ month, total }));
    // Calendar logic
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const expensesByDate = useMemo(() => {
        return expenses.reduce((acc, exp) => {
            const date = exp.expense_date;
            if (!acc[date])
                acc[date] = [];
            acc[date].push(exp);
            return acc;
        }, {});
    }, [expenses]);
    const add = () => {
        if (!note.trim() || !amount) {
            showNotification("Please enter all details to proceed", "error");
            return;
        }
        const newExpense = {
            id: Date.now(),
            note: note.trim(),
            amount: Number(amount),
            expense_date: new Date().toISOString().split("T")[0],
            currency: "KES"
        };
        setExpenses([...expenses, newExpense]);
        setNote("");
        setAmount("");
        setFly(true);
        showNotification("Expense Added!");
        setTimeout(() => setFly(false), 2000);
    };
    const deleteExpense = (id) => {
        setExpenses(expenses.filter(e => e.id !== id));
        showNotification("Expense Removed");
    };
    const startEdit = (expense) => {
        setEditingId(expense.id);
        setEditNote(expense.note);
        setEditAmount(String(expense.amount));
    };
    const saveEdit = (id) => {
        if (!editNote.trim() || !editAmount) {
            showNotification("Please enter all details to Proceed", "error");
            return;
        }
        setExpenses(expenses.map(e => e.id === id
            ? { ...e, note: editNote.trim(), amount: Number(editAmount) }
            : e));
        setEditingId(null);
        showNotification("Expense Updated!");
    };
    const cancelEdit = () => {
        setEditingId(null);
        setEditNote("");
        setEditAmount("");
    };
    const changeMonth = (delta) => {
        setCurrentMonth(new Date(year, month + delta, 1));
    };
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: notification && (_jsxs(motion.div, { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -100, opacity: 0 }, className: `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl font-bold flex items-center gap-3 ${notification.type === "error"
                        ? "bg-red-900 border-2 border-red-500 text-white"
                        : "bg-green-900 border-2 border-green-500 text-white"}`, children: [_jsx(AlertCircle, { size: 24 }), notification.message] })) }), fly && (_jsxs(_Fragment, { children: [_jsx(FloatingMoney, {}), _jsx(motion.div, { initial: { y: 100, opacity: 1 }, animate: { y: -500, opacity: 0 }, transition: { duration: 1.8 }, className: "fixed bottom-32 left-1/2 z-50 pointer-events-none", children: _jsx(Sparkles, { size: 180, className: "text-yellow-400 drop-shadow-2xl animate-pulse" }) })] })), _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 md:p-8", children: [_jsxs(motion.div, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8 }, children: [_jsx("h1", { className: "text-5xl md:text-8xl font-black text-center bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-2", children: "User Dashboard" }), _jsxs("p", { className: "text-2xl md:text-4xl text-center text-amber-300 flex items-center justify-center gap-3", children: [_jsx(Crown, { size: 30, className: "text-yellow-400" }), "Mwangi ", userName] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto my-8", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "relative bg-gradient-to-br from-amber-900/40 to-black p-6 rounded-2xl border-2 border-amber-600/50 backdrop-blur", children: [_jsx("p", { className: "text-amber-400 text-sm font-semibold mb-2", children: "TOTAL EMPIRE VALUE" }), _jsxs("p", { className: "text-4xl md:text-5xl font-black", children: ["KES ", total.toLocaleString()] }), _jsx(DollarSign, { className: "absolute top-4 right-4 text-amber-600/30", size: 48 })] }), _jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.3 }, className: "relative bg-gradient-to-br from-orange-900/40 to-black p-6 rounded-2xl border-2 border-orange-600/50 backdrop-blur", children: [_jsx("p", { className: "text-orange-400 text-sm font-semibold mb-2", children: "THIS MONTH" }), _jsxs("p", { className: "text-4xl md:text-5xl font-black", children: ["KES ", analytics.thisMonthTotal.toLocaleString()] }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [Number(analytics.percentChange) > 0 ?
                                                _jsx(ArrowUpRight, { className: "text-red-400", size: 24 }) :
                                                _jsx(ArrowDownRight, { className: "text-green-400", size: 24 }), _jsxs("span", { className: Number(analytics.percentChange) > 0 ? "text-red-400" : "text-green-400", children: [Math.abs(Number(analytics.percentChange)), "%"] })] })] }), _jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.4 }, className: "relative bg-gradient-to-br from-yellow-900/40 to-black p-6 rounded-2xl border-2 border-yellow-600/50 backdrop-blur", children: [_jsx("p", { className: "text-yellow-400 text-sm font-semibold mb-2", children: "AVG PER EXPENSE" }), _jsxs("p", { className: "text-4xl md:text-5xl font-black", children: ["KES ", analytics.avgPerDay] }), _jsx(TrendingUp, { className: "absolute top-4 right-4 text-yellow-600/30", size: 48 })] }), _jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.5 }, className: "relative bg-gradient-to-br from-red-900/40 to-black p-6 rounded-2xl border-2 border-red-600/50 backdrop-blur", children: [_jsx("p", { className: "text-red-400 text-sm font-semibold mb-2", children: "TOTAL TRANSACTIONS" }), _jsx("p", { className: "text-4xl md:text-5xl font-black", children: expenses.length }), _jsx(BarChart3, { className: "absolute top-4 right-4 text-red-600/30", size: 48 })] })] }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4 mb-8", children: [_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => setShowCharts(!showCharts), className: "bg-gradient-to-r from-purple-600 to-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg", children: [_jsx(PieChart, { size: 28 }), showCharts ? "HIDE" : "SHOW", " ANALYTICS"] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => setShowCalendar(!showCalendar), className: "bg-gradient-to-r from-blue-600 to-cyan-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg", children: [_jsx(Calendar, { size: 28 }), showCalendar ? "HIDE" : "SHOW", " CALENDAR"] })] }), _jsx(AnimatePresence, { children: showCharts && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "max-w-7xl mx-auto mb-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50", children: [_jsx("h3", { className: "text-2xl font-bold text-amber-400 mb-4", children: "Daily Spending Trend" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: analytics.trendData, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorAmount", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#F59E0B", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#F59E0B", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "date", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: { backgroundColor: "#1F2937", border: "1px solid #F59E0B" } }), _jsx(Area, { type: "monotone", dataKey: "amount", stroke: "#F59E0B", fillOpacity: 1, fill: "url(#colorAmount)" })] }) })] }), _jsxs("div", { className: "bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50", children: [_jsx("h3", { className: "text-2xl font-bold text-amber-400 mb-4", children: "Spending by Category" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(RechartsPie, { children: [_jsx(Pie, { data: analytics.categoryData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 100, fill: "#8884d8", dataKey: "value", children: analytics.categoryData.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: { backgroundColor: "#1F2937", border: "1px solid #F59E0B" } })] }) })] }), _jsxs("div", { className: "bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50 lg:col-span-2", children: [_jsx("h3", { className: "text-2xl font-bold text-amber-400 mb-4", children: "Monthly Spending History" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: monthlyChartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "month", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: { backgroundColor: "#1F2937", border: "1px solid #F59E0B" } }), _jsx(Bar, { dataKey: "total", fill: "#F59E0B", radius: [8, 8, 0, 0] })] }) })] })] }) })) }), _jsx(AnimatePresence, { children: showCalendar && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "max-w-6xl mx-auto mb-8 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("button", { onClick: () => changeMonth(-1), className: "p-2 hover:bg-amber-600/20 rounded-lg transition", children: _jsx(ChevronLeft, { size: 32, className: "text-amber-400" }) }), _jsxs("h3", { className: "text-2xl md:text-3xl font-bold text-amber-400", children: [monthNames[month], " ", year] }), _jsx("button", { onClick: () => changeMonth(1), className: "p-2 hover:bg-amber-600/20 rounded-lg transition", children: _jsx(ChevronRight, { size: 32, className: "text-amber-400" }) })] }), _jsx("div", { className: "grid grid-cols-7 gap-2 mb-2", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (_jsx("div", { className: "text-center text-amber-400 font-bold py-2 text-sm md:text-base", children: day }, day))) }), _jsxs("div", { className: "grid grid-cols-7 gap-2", children: [Array.from({ length: firstDay }).map((_, i) => _jsx("div", {}, `empty-${i}`)), Array.from({ length: daysInMonth }).map((_, i) => {
                                            const day = i + 1;
                                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                            const dayExpenses = expensesByDate[dateStr] || [];
                                            const dayTotal = dayExpenses.reduce((s, e) => s + Number(e.amount), 0);
                                            return (_jsxs("div", { className: `min-h-16 md:min-h-20 p-2 rounded-lg border ${dayExpenses.length ? "border-amber-600 bg-amber-900/30" : "border-gray-700 bg-gray-900/30"}`, children: [_jsx("div", { className: "text-xs md:text-sm font-bold", children: day }), dayExpenses.length > 0 && (_jsxs("div", { className: "text-xs text-amber-400 mt-1 font-semibold", children: ["KES ", dayTotal.toLocaleString()] }))] }, day));
                                        })] })] })) }), _jsxs(motion.div, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6 }, className: "max-w-3xl mx-auto bg-gradient-to-r from-amber-900/40 to-black p-6 md:p-12 rounded-3xl border-4 border-amber-600 shadow-2xl mb-8", children: [_jsx("h2", { className: "text-2xl md:text-4xl font-black text-amber-400 mb-6 text-center", children: "ADD NEW EXPENSE" }), _jsx("input", { placeholder: "What did you spend on?", value: note, onChange: (e) => setNote(e.target.value), className: "w-full p-4 md:p-6 text-xl md:text-3xl bg-black/70 rounded-xl mb-4 border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" }), _jsx("input", { placeholder: "Amount (KES)", type: "number", value: amount, onChange: (e) => setAmount(e.target.value), className: "w-full p-4 md:p-6 text-xl md:text-3xl bg-black/70 rounded-xl mb-6 border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" }), _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: add, className: "w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black text-3xl md:text-5xl py-6 md:py-8 rounded-xl shadow-2xl flex items-center justify-center gap-4", children: [_jsx(Plus, { size: 50 }), " LOCK IN"] })] }), _jsxs("div", { className: "max-w-6xl mx-auto space-y-4", children: [_jsx("h2", { className: "text-2xl md:text-4xl font-black text-amber-400 mb-6", children: "RECENT TRANSACTIONS" }), expenses.slice().reverse().map((exp, idx) => (_jsx(motion.div, { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: idx * 0.05 }, className: "bg-gradient-to-r from-gray-900 to-black p-4 md:p-8 rounded-2xl border-2 border-amber-700/50 hover:border-amber-500 transition", children: editingId === exp.id ? (_jsxs("div", { className: "space-y-4", children: [_jsx("input", { value: editNote, onChange: (e) => setEditNote(e.target.value), className: "w-full p-3 text-xl bg-black/70 rounded-lg border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" }), _jsx("input", { type: "number", value: editAmount, onChange: (e) => setEditAmount(e.target.value), className: "w-full p-3 text-xl bg-black/70 rounded-lg border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => saveEdit(exp.id), className: "flex-1 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2", children: [_jsx(Check, { size: 24 }), " Save"] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: cancelEdit, className: "flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2", children: [_jsx(X, { size: 24 }), " Cancel"] })] })] })) : (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xl md:text-4xl font-bold text-white", children: exp.note }), _jsxs("p", { className: "text-amber-400 text-lg md:text-3xl mt-1", children: ["KES ", Number(exp.amount).toLocaleString()] }), _jsx("p", { className: "text-gray-500 text-xs md:text-lg", children: formatDate(exp.expense_date) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: () => startEdit(exp), className: "p-2 md:p-3 hover:bg-blue-900/30 rounded-xl transition", children: _jsx(Edit2, { size: 28, className: "text-blue-500" }) }), _jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: () => deleteExpense(exp.id), className: "p-2 md:p-3 hover:bg-red-900/30 rounded-xl transition", children: _jsx(Trash2, { size: 28, className: "text-red-500" }) })] })] })) }, exp.id)))] })] })] }));
}
