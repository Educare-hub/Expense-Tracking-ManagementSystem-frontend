// src/pages/expenses/ExpenseCreate.tsx
import React, { useState } from "react";
import { useCreateExpenseMutation } from "../../features/expenses/expensesAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ExpenseCreate = () => {
  const [create, { isLoading }] = useCreateExpenseMutation();
  const navigate = useNavigate();
  
  // FIX: Form uses 'note'
  const [form, setForm] = useState({ 
    note: "", 
    amount: "", 
    expense_date: new Date().toISOString().split("T")[0] 
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create({ 
        note: form.note,
        amount: Number(form.amount),
        expense_date: form.expense_date,
        currency: "KES"
      }).unwrap();
      toast.success("Empire Expanded");
      navigate("/expenses/budget");
    } catch (err) {
      toast.error("Failed to record");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="glass-gold p-10 w-full max-w-2xl rounded-3xl border border-amber-600/30">
        <h1 className="text-4xl font-bold text-center text-amber-400 mb-8 font-['Cinzel']">New Conquest</h1>
        <form onSubmit={submit} className="space-y-6">
          <input required placeholder="Note / Description" value={form.note} onChange={(e)=>setForm({...form, note:e.target.value})} className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:border-amber-400" />
          <input required type="number" placeholder="Amount" value={form.amount} onChange={(e)=>setForm({...form, amount: e.target.value})} className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:border-amber-400" />
          <input type="date" value={form.expense_date} onChange={(e)=>setForm({...form, expense_date:e.target.value})} className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:border-amber-400" />
          <button disabled={isLoading} className="btn-premium w-full py-4 text-xl">{isLoading ? "Recording..." : "Add to Ledger"}</button>
        </form>
      </div>
    </div>
  );
};
export default ExpenseCreate;