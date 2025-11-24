import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, DollarSign, Crown, TrendingUp, Calendar, 
  PieChart, BarChart3, ArrowUpRight, ArrowDownRight,
  ChevronLeft, ChevronRight, Sparkles, AlertCircle, Edit2, Check, X
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const COLORS = ["#F59E0B", "#FB923C", "#FBBF24", "#FCD34D", "#FDE047", "#EF4444", "#F97316"];

interface Expense {
  id: number;
  note: string;
  amount: number;
  expense_date: string;
  currency: string;
}

interface Notification {
  message: string;
  type: string;
}

// sample input for demonstration
const DEMO_EXPENSES: Expense[] = [
  { id: 1, note: "Groceries", amount: 1500, expense_date: "2024-11-20", currency: "KES" },
  
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getMonthYear(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatMonthDay(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// Floating money animations
const FloatingMoney = () => {
  const coins = Array.from({ length: 15 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {coins.map((i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -50,
            rotate: 0,
            scale: 0
          }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: 360,
            scale: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeInOut"
          }}
          className="absolute"
        >
          <DollarSign 
            size={40 + Math.random() * 30} 
            className="text-yellow-400 opacity-70"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function UserDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(DEMO_EXPENSES);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [fly, setFly] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notification, setNotification] = useState<Notification | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const userName = "TheQADevOps";
  const total = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const showNotification = (message: string, type: string = "success") => {
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
    const byCategory: Record<string, number> = expenses.reduce((acc, exp) => {
      acc[exp.note] = (acc[exp.note] || 0) + Number(exp.amount);
      return acc;
    }, {} as Record<string, number>);

    // vile unatumia pesa kila siku
    const dailySpending: Record<string, number> = expenses.reduce((acc, exp) => {
      const date = formatMonthDay(exp.expense_date);
      acc[date] = (acc[date] || 0) + Number(exp.amount);
      return acc;
    }, {} as Record<string, number>);

    const monthlyData: Record<string, number> = expenses.reduce((acc, exp) => {
      const month = getMonthYear(exp.expense_date);
      acc[month] = (acc[month] || 0) + Number(exp.amount);
      return acc;
    }, {} as Record<string, number>);

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
      if (!acc[date]) acc[date] = [];
      acc[date].push(exp);
      return acc;
    }, {} as Record<string, Expense[]>);
  }, [expenses]);

  const add = () => {
    if (!note.trim() || !amount) {
      showNotification("Please enter all details to proceed", "error");
      return;
    }

    const newExpense: Expense = {
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

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
    showNotification("Expense Removed");
  };

  const startEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditNote(expense.note);
    setEditAmount(String(expense.amount));
  };

  const saveEdit = (id: number) => {
    if (!editNote.trim() || !editAmount) {
      showNotification("Please enter all details to Proceed", "error");
      return;
    }

    setExpenses(expenses.map(e => 
      e.id === id 
        ? { ...e, note: editNote.trim(), amount: Number(editAmount) }
        : e
    ));
    setEditingId(null);
    showNotification("Expense Updated!");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNote("");
    setEditAmount("");
  };

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(year, month + delta, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{y:-100, opacity:0}} 
            animate={{y:0, opacity:1}} 
            exit={{y:-100, opacity:0}}
            className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl font-bold flex items-center gap-3 ${
              notification.type === "error" 
                ? "bg-red-900 border-2 border-red-500 text-white" 
                : "bg-green-900 border-2 border-green-500 text-white"
            }`}
          >
            <AlertCircle size={24} />
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {fly && (
        <>
          <FloatingMoney />
          <motion.div initial={{y:100, opacity:1}} animate={{y:-500, opacity:0}} transition={{duration:1.8}} className="fixed bottom-32 left-1/2 z-50 pointer-events-none">
            <Sparkles size={180} className="text-yellow-400 drop-shadow-2xl animate-pulse" />
          </motion.div>
        </>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 md:p-8">
        {/* Header */}
        <motion.div initial={{y:-50, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}}>
          <h1 className="text-5xl md:text-8xl font-black text-center bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-2">
            User Dashboard 
          </h1>
          <p className="text-2xl md:text-4xl text-center text-amber-300 flex items-center justify-center gap-3">
            <Crown size={30} className="text-yellow-400" />
            Mwangi {userName}
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto my-8">
          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2}} className="relative bg-gradient-to-br from-amber-900/40 to-black p-6 rounded-2xl border-2 border-amber-600/50 backdrop-blur">
            <p className="text-amber-400 text-sm font-semibold mb-2">TOTAL EMPIRE VALUE</p>
            <p className="text-4xl md:text-5xl font-black">KES {total.toLocaleString()}</p>
            <DollarSign className="absolute top-4 right-4 text-amber-600/30" size={48} />
          </motion.div>

          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3}} className="relative bg-gradient-to-br from-orange-900/40 to-black p-6 rounded-2xl border-2 border-orange-600/50 backdrop-blur">
            <p className="text-orange-400 text-sm font-semibold mb-2">THIS MONTH</p>
            <p className="text-4xl md:text-5xl font-black">KES {analytics.thisMonthTotal.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-2">
              {Number(analytics.percentChange) > 0 ? 
                <ArrowUpRight className="text-red-400" size={24} /> : 
                <ArrowDownRight className="text-green-400" size={24} />
              }
              <span className={Number(analytics.percentChange) > 0 ? "text-red-400" : "text-green-400"}>
                {Math.abs(Number(analytics.percentChange))}%
              </span>
            </div>
          </motion.div>

          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4}} className="relative bg-gradient-to-br from-yellow-900/40 to-black p-6 rounded-2xl border-2 border-yellow-600/50 backdrop-blur">
            <p className="text-yellow-400 text-sm font-semibold mb-2">AVG PER EXPENSE</p>
            <p className="text-4xl md:text-5xl font-black">KES {analytics.avgPerDay}</p>
            <TrendingUp className="absolute top-4 right-4 text-yellow-600/30" size={48} />
          </motion.div>

          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5}} className="relative bg-gradient-to-br from-red-900/40 to-black p-6 rounded-2xl border-2 border-red-600/50 backdrop-blur">
            <p className="text-red-400 text-sm font-semibold mb-2">TOTAL TRANSACTIONS</p>
            <p className="text-4xl md:text-5xl font-black">{expenses.length}</p>
            <BarChart3 className="absolute top-4 right-4 text-red-600/30" size={48} />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={() => setShowCharts(!showCharts)} className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg">
            <PieChart size={28} />
            {showCharts ? "HIDE" : "SHOW"} ANALYTICS
          </motion.button>
          
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={() => setShowCalendar(!showCalendar)} className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg">
            <Calendar size={28} />
            {showCalendar ? "HIDE" : "SHOW"} CALENDAR
          </motion.button>
        </div>

        {/* Charts Section */}
        <AnimatePresence>
          {showCharts && (
            <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:"auto"}} exit={{opacity:0, height:0}} className="max-w-7xl mx-auto mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Spending Trend */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Daily Spending Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.trendData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip contentStyle={{backgroundColor:"#1F2937", border:"1px solid #F59E0B"}} />
                      <Area type="monotone" dataKey="amount" stroke="#F59E0B" fillOpacity={1} fill="url(#colorAmount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Breakdown */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Spending by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie data={analytics.categoryData} cx="50%" cy="50%" labelLine={false} label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                        {analytics.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{backgroundColor:"#1F2937", border:"1px solid #F59E0B"}} />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>

                {/* Monthly Comparison */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50 lg:col-span-2">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Monthly Spending History</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip contentStyle={{backgroundColor:"#1F2937", border:"1px solid #F59E0B"}} />
                      <Bar dataKey="total" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calendar Section */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:"auto"}} exit={{opacity:0, height:0}} className="max-w-6xl mx-auto mb-8 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-amber-700/50">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-amber-600/20 rounded-lg transition">
                  <ChevronLeft size={32} className="text-amber-400" />
                </button>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-400">{monthNames[month]} {year}</h3>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-amber-600/20 rounded-lg transition">
                  <ChevronRight size={32} className="text-amber-400" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-amber-400 font-bold py-2 text-sm md:text-base">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayExpenses = expensesByDate[dateStr] || [];
                  const dayTotal = dayExpenses.reduce((s, e) => s + Number(e.amount), 0);
                  
                  return (
                    <div key={day} className={`min-h-16 md:min-h-20 p-2 rounded-lg border ${dayExpenses.length ? "border-amber-600 bg-amber-900/30" : "border-gray-700 bg-gray-900/30"}`}>
                      <div className="text-xs md:text-sm font-bold">{day}</div>
                      {dayExpenses.length > 0 && (
                        <div className="text-xs text-amber-400 mt-1 font-semibold">
                          KES {dayTotal.toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Expense Form */}
        <motion.div initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.6}} className="max-w-3xl mx-auto bg-gradient-to-r from-amber-900/40 to-black p-6 md:p-12 rounded-3xl border-4 border-amber-600 shadow-2xl mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-amber-400 mb-6 text-center">ADD NEW EXPENSE</h2>
          <input placeholder="What did you spend on?" value={note} onChange={(e) => setNote(e.target.value)} className="w-full p-4 md:p-6 text-xl md:text-3xl bg-black/70 rounded-xl mb-4 border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" />
          <input placeholder="Amount (KES)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-4 md:p-6 text-xl md:text-3xl bg-black/70 rounded-xl mb-6 border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" />
          <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={add} className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black text-3xl md:text-5xl py-6 md:py-8 rounded-xl shadow-2xl flex items-center justify-center gap-4">
            <Plus size={50} /> LOCK IN
          </motion.button>
        </motion.div>

        {/* Expenses List */}
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-4xl font-black text-amber-400 mb-6">RECENT TRANSACTIONS</h2>
          {expenses.slice().reverse().map((exp, idx) => (
            <motion.div 
              initial={{x:-100, opacity:0}} 
              animate={{x:0, opacity:1}} 
              transition={{delay:idx*0.05}} 
              key={exp.id} 
              className="bg-gradient-to-r from-gray-900 to-black p-4 md:p-8 rounded-2xl border-2 border-amber-700/50 hover:border-amber-500 transition"
            >
              {editingId === exp.id ? (
                <div className="space-y-4">
                  <input 
                    value={editNote} 
                    onChange={(e) => setEditNote(e.target.value)}
                    className="w-full p-3 text-xl bg-black/70 rounded-lg border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400"
                  />
                  <input 
                    type="number"
                    value={editAmount} 
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full p-3 text-xl bg-black/70 rounded-lg border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex gap-3">
                    <motion.button 
                      whileHover={{scale:1.05}} 
                      whileTap={{scale:0.95}}
                      onClick={() => saveEdit(exp.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Check size={24} /> Save
                    </motion.button>
                    <motion.button 
                      whileHover={{scale:1.05}} 
                      whileTap={{scale:0.95}}
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <X size={24} /> Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl md:text-4xl font-bold text-white">{exp.note}</p>
                    <p className="text-amber-400 text-lg md:text-3xl mt-1">KES {Number(exp.amount).toLocaleString()}</p>
                    <p className="text-gray-500 text-xs md:text-lg">{formatDate(exp.expense_date)}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button 
                      whileHover={{scale:1.1}} 
                      whileTap={{scale:0.9}} 
                      onClick={() => startEdit(exp)}
                      className="p-2 md:p-3 hover:bg-blue-900/30 rounded-xl transition"
                    >
                      <Edit2 size={28} className="text-blue-500" />
                    </motion.button>
                    <motion.button 
                      whileHover={{scale:1.1}} 
                      whileTap={{scale:0.9}} 
                      onClick={() => deleteExpense(exp.id)} 
                      className="p-2 md:p-3 hover:bg-red-900/30 rounded-xl transition"
                    >
                      <Trash2 size={28} className="text-red-500" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}