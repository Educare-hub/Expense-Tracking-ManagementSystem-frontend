// src/dashboard/UserDashboard/content/UserDashboard.tsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, DollarSign, Crown, TrendingUp, Calendar,
  PieChart as LucidePie, BarChart3, ArrowUpRight, ArrowDownRight,
  ChevronLeft, ChevronRight, Sparkles, AlertCircle, Edit2, Check, X, Home
} from "lucide-react";
import {
  BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";
const COLORS = ["#F59E0B", "#FB923C", "#FBBF24", "#FCD34D", "#FDE047", "#EF4444", "#F97316"];

export interface Expense {
  id: number;
  note: string;
  amount: number;
  expense_date: string;
  currency: string;
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("User");

  // form
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  // edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const [showCharts, setShowCharts] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const token = localStorage.getItem("token");

  // Get user's first name from localStorage or backend
  useEffect(() => {
    // Try to get from localStorage first
    const storedName = localStorage.getItem("userName") || localStorage.getItem("user_name");
    const storedUser = localStorage.getItem("user");
    
    if (storedName) {
      // Extract first name if full name is stored
      const firstName = storedName.split(" ")[0];
      setUserName(firstName);
    } else if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        const firstName = (userObj.name || userObj.first_name || userObj.username || "User").split(" ")[0];
        setUserName(firstName);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    } else if (token) {
      // Fetch from backend if not in localStorage
      fetchUserName();
    }
  }, [token]);

  const fetchUserName = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const userData = await res.json();
        const firstName = (userData.name || userData.first_name || userData.username || "User").split(" ")[0];
        setUserName(firstName);
        localStorage.setItem("userName", firstName);
      }
    } catch (err) {
      console.error("Error fetching user name", err);
    }
  };

  // load expenses
  const loadExpenses = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setExpenses([]);
        return;
      }
      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : data.expenses || []);
    } catch (err) {
      console.error("Load expenses error", err);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // add expense
  const addExpense = async () => {
    if (!note.trim() || !amount) return;
    if (!token) return;
    const payload = {
      note: note.trim(),
      amount: Number(amount),
      expense_date: new Date().toISOString(),
      currency: "KES",
    };
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        if (saved && saved.id) setExpenses((p) => [saved, ...p]);
        else await loadExpenses();
        setNote("");
        setAmount("");
      } else {
        console.error("Add failed", await res.text());
      }
    } catch (err) {
      console.error("Add network error", err);
    }
  };

  // delete
  const deleteExpense = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setExpenses((p) => p.filter((e) => e.id !== id));
      else console.error("Delete failed", await res.text());
    } catch (err) {
      console.error("Delete network error", err);
    }
  };

  // edit
  const startEdit = (e: Expense) => {
    setEditingId(e.id);
    setEditNote(e.note || "");
    setEditAmount(String(e.amount || ""));
  };

  const saveEdit = async () => {
    if (!editingId) return;
    if (!token) return;
    const payload = {
      note: editNote.trim(),
      amount: Number(editAmount),
      expense_date: new Date().toISOString(),
      currency: "KES",
    };
    try {
      const res = await fetch(`${API_URL}/api/expenses/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        if (updated && updated.id) setExpenses((p) => p.map((x) => (x.id === updated.id ? updated : x)));
        else await loadExpenses();
        setEditingId(null);
        setEditNote("");
        setEditAmount("");
      } else {
        console.error("Update failed", await res.text());
      }
    } catch (err) {
      console.error("Update network error", err);
    }
  };

  // analytics derived
  const analytics = useMemo(() => {
    const now = new Date();
    const thisMonth = expenses.filter((e) => {
      const d = new Date(e.expense_date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const lastMonth = expenses.filter((e) => {
      const d = new Date(e.expense_date);
      const lm = new Date(now.getFullYear(), now.getMonth() - 1);
      return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
    });
    const thisMonthTotal = thisMonth.reduce((s, e) => s + Number(e.amount || 0), 0);
    const lastMonthTotal = lastMonth.reduce((s, e) => s + Number(e.amount || 0), 0);
    const percentChange = lastMonthTotal ? (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1) : "0";
    const byCategory = Object.entries(
      expenses.reduce((acc: Record<string, number>, e) => {
        const k = e.note || "Other";
        acc[k] = (acc[k] || 0) + Number(e.amount || 0);
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));
    // daily trend (last 14)
    const daily: Record<string, number> = {};
    expenses.forEach((e) => {
      const d = new Date(e.expense_date);
      const key = d.toLocaleDateString();
      daily[key] = (daily[key] || 0) + Number(e.amount || 0);
    });
    const trendData = Object.entries(daily).slice(-14).map(([date, amount]) => ({ date, amount }));
    // monthly map
    const monthly: Record<string, number> = {};
    expenses.forEach((e) => {
      const d = new Date(e.expense_date);
      const key = d.toLocaleString("en-US", { month: "short", year: "numeric" });
      monthly[key] = (monthly[key] || 0) + Number(e.amount || 0);
    });
    return {
      thisMonthTotal,
      lastMonthTotal,
      percentChange,
      categoryData: byCategory.slice(0, 6),
      trendData,
      monthlyData: monthly,
      avgPerDay: thisMonth.length ? Math.round(thisMonthTotal / thisMonth.length) : 0,
    };
  }, [expenses]);

  const monthlyChartData = useMemo(
    () => Object.entries(analytics.monthlyData).slice(-6).map(([month, total]) => ({ month, total })),
    [analytics.monthlyData]
  );

  // calendar helpers
  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay();

  const expensesByDate = useMemo(() => {
    const map: Record<string, Expense[]> = {};
    expenses.forEach((e) => {
      if (!map[e.expense_date]) map[e.expense_date] = [];
      map[e.expense_date].push(e);
    });
    return map;
  }, [expenses]);

  const changeMonth = (delta: number) => setCurrentMonth(new Date(year, monthIndex + delta, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white p-4 md:p-8">
      {/* Back to Home Button - Fixed Position */}
      <motion.button
        initial={{x:-100, opacity:0}}
        animate={{x:0, opacity:1}}
        transition={{duration:0.5}}
        onClick={() => navigate('/home')}
        className="fixed top-4 left-4 z-50 bg-amber-600 hover:bg-amber-700 px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition"
      >
        <Home size={24} />
        Home
      </motion.button>

      {/* header */}
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{y:-50, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}}>
          <h1 className="text-5xl md:text-7xl font-black text-center bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-2">
            User Dashboard
          </h1>
          <p className="text-2xl text-center text-amber-300 flex items-center justify-center gap-3 mb-8">
            <Crown size={28} className="text-yellow-400" />
            Welcome {userName} — Your Expense Overview
          </p>
        </motion.div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2}} className="relative bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-amber-600/50">
            <p className="text-amber-400 text-sm font-semibold mb-2">TOTAL EXPENSES</p>
            <p className="text-4xl md:text-5xl font-black">KES {expenses.reduce((s, e) => s + Number(e.amount || 0), 0).toLocaleString()}</p>
            <DollarSign className="absolute top-4 right-4 text-amber-600/30" size={48} />
          </motion.div>

          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3}} className="relative bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-orange-600/50">
            <p className="text-orange-400 text-sm font-semibold mb-2">THIS MONTH</p>
            <p className="text-4xl md:text-5xl font-black">KES {analytics.thisMonthTotal.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-2">
              {Number(analytics.percentChange) > 0 ? 
                <ArrowUpRight className="text-red-400" size={24} /> : 
                <ArrowDownRight className="text-green-400" size={24} />
              }
              <span className={Number(analytics.percentChange) > 0 ? "text-red-400 font-bold" : "text-green-400 font-bold"}>
                {Math.abs(Number(analytics.percentChange))}% vs last month
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Last month: KES {analytics.lastMonthTotal.toLocaleString()}</p>
          </motion.div>

          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4}} className="relative bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-yellow-600/50">
            <p className="text-yellow-400 text-sm font-semibold mb-2">AVG PER EXPENSE</p>
            <p className="text-4xl md:text-5xl font-black">KES {analytics.avgPerDay}</p>
            <TrendingUp className="absolute top-4 right-4 text-yellow-600/30" size={48} />
          </motion.div>

          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5}} className="relative bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-red-600/50">
            <p className="text-red-400 text-sm font-semibold mb-2">TOTAL TRANSACTIONS</p>
            <p className="text-4xl md:text-5xl font-black">{expenses.length}</p>
            <BarChart3 className="absolute top-4 right-4 text-red-600/30" size={48} />
          </motion.div>
        </div>

        {/* action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button 
            whileHover={{scale:1.05}} 
            whileTap={{scale:0.95}} 
            onClick={() => setShowCharts(!showCharts)} 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg"
          >
            <LucidePie size={28} />
            {showCharts ? "HIDE" : "SHOW"} ANALYTICS
          </motion.button>
          
          <motion.button 
            whileHover={{scale:1.05}} 
            whileTap={{scale:0.95}} 
            onClick={() => setShowCalendar(!showCalendar)} 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg"
          >
            <Calendar size={28} />
            {showCalendar ? "HIDE" : "SHOW"} CALENDAR
          </motion.button>
        </div>

        {/* charts - NOW WITH ANIMATION */}
        <AnimatePresence>
          {showCharts && (
            <motion.div 
              initial={{opacity:0, height:0}} 
              animate={{opacity:1, height:"auto"}} 
              exit={{opacity:0, height:0}}
              transition={{duration:0.3}}
              className="mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-amber-700/50">
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

                <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-amber-700/50">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Spending by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie 
                        data={analytics.categoryData} 
                        cx="50%" 
                        cy="50%" 
                        labelLine={false} 
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                        outerRadius={100} 
                        dataKey="value"
                      >
                        {analytics.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{backgroundColor:"#1F2937", border:"1px solid #F59E0B"}} />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-amber-700/50 lg:col-span-2">
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

        {/* calendar - NOW WITH ANIMATION */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div 
              initial={{opacity:0, height:0}} 
              animate={{opacity:1, height:"auto"}} 
              exit={{opacity:0, height:0}}
              transition={{duration:0.3}}
              className="max-w-6xl mx-auto mb-8 bg-white/5 backdrop-blur p-6 rounded-2xl border-2 border-amber-700/50"
            >
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-amber-600/20 rounded-lg transition">
                  <ChevronLeft size={32} className="text-amber-400" />
                </button>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-400">{monthNames[monthIndex]} {year}</h3>
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
                  const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayExpenses = expensesByDate[dateStr] || [];
                  const dayTotal = dayExpenses.reduce((s, e) => s + Number(e.amount), 0);
                  
                  return (
                    <div key={day} className={`min-h-16 md:min-h-20 p-2 rounded-lg border ${dayExpenses.length ? "border-amber-600 bg-amber-900/30" : "border-gray-700 bg-gray-900/30"}`}>
                      <div className="text-xs md:text-sm font-bold">{day}</div>
                      {dayExpenses.length > 0 && (
                        <div className="text-xs text-amber-400 mt-1 font-semibold">KES {dayTotal.toLocaleString()}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* add expense */}
        <motion.div initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.6}} className="max-w-3xl mx-auto bg-white/5 backdrop-blur p-6 md:p-12 rounded-3xl border-4 border-amber-600 shadow-2xl mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-amber-400 mb-6 text-center">ADD NEW EXPENSE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What did you spend on?" className="p-4 text-xl bg-black/70 rounded-xl border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (KES)" type="number" className="p-4 text-xl bg-black/70 rounded-xl border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" />
            <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={addExpense} className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black text-xl py-4 rounded-xl shadow-2xl flex items-center justify-center gap-2">
              <Plus size={28} /> ADD
            </motion.button>
          </div>
        </motion.div>

        {/* list */}
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-4xl font-black text-amber-400 mb-6">RECENT TRANSACTIONS</h2>
          {loading ? (
            <div className="text-center py-8">
              <Sparkles size={60} className="text-yellow-400 animate-pulse mx-auto mb-4" />
              <p className="text-xl">Loading your expenses...</p>
            </div>
          ) : expenses.slice().reverse().map((exp, idx) => (
            <motion.div 
              initial={{x:-100, opacity:0}} 
              animate={{x:0, opacity:1}} 
              transition={{delay:idx*0.05}} 
              key={exp.id} 
              className="bg-white/5 backdrop-blur p-4 md:p-8 rounded-2xl border-2 border-amber-700/50 hover:border-amber-500 transition"
            >
              {editingId === exp.id ? (
                <div className="space-y-4">
                  <input value={editNote} onChange={(e) => setEditNote(e.target.value)} className="w-full p-3 text-xl bg-black/70 rounded-lg border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" />
                  <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} className="w-full p-3 text-xl bg-black/70 rounded-lg border-2 border-amber-600 text-white focus:outline-none focus:border-amber-400" />
                  <div className="flex gap-3">
                    <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={saveEdit} className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                      <Check size={24} /> Save
                    </motion.button>
                    <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={() => setEditingId(null)} className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                      <X size={24} /> Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl md:text-4xl font-bold text-white">{exp.note}</p>
                    <p className="text-amber-400 text-lg md:text-3xl mt-1">KES {Number(exp.amount).toLocaleString()}</p>
                    <p className="text-gray-500 text-xs md:text-lg">{new Date(exp.expense_date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={() => startEdit(exp)} className="p-2 md:p-3 hover:bg-blue-900/30 rounded-xl transition">
                      <Edit2 size={28} className="text-blue-500" />
                    </motion.button>
                    <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={() => deleteExpense(exp.id)} className="p-2 md:p-3 hover:bg-red-900/30 rounded-xl transition">
                      <Trash2 size={28} className="text-red-500" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}