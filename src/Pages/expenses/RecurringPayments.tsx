//src/Pages/expenses/RecurringPayments.tsx
import React, { useState } from "react";
import { useGetExpensesQuery, useCreateExpenseMutation, useUpdateExpenseMutation } from "../../features/expenses/expensesAPI";
import toast from "react-hot-toast";

const RecurringPayments: React.FC = () => {
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

  const addRecurring = async (e: React.FormEvent) => {
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
    } catch (err) {
      toast.error("Failed to add recurring payment");
    }
  };

  const toggleRecurring = async (item: any) => {
    try {
      await updateExpense({ 
        id: item.id, 
        body: { is_recurring: !item.is_recurring }
      }).unwrap();
      toast.success("Updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="glass-gold p-10 max-w-4xl mx-auto rounded-3xl border border-amber-600/30">
        <h3 className="text-3xl font-bold text-amber-400 mb-6">Recurring Payments</h3>

        <form onSubmit={addRecurring} className="mb-8 space-y-4">
          <input 
            placeholder="Category ID" 
            type="number"
            value={form.category_id} 
            onChange={(e)=>setForm({...form, category_id: Number(e.target.value)})} 
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" 
          />
          <input 
            placeholder="Amount" 
            type="number" 
            value={form.amount} 
            onChange={(e)=>setForm({...form, amount: e.target.value})} 
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" 
          />
          <input 
            placeholder="Currency" 
            value={form.currency} 
            onChange={(e)=>setForm({...form, currency: e.target.value})} 
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white" 
          />
          <textarea 
            placeholder="Note" 
            value={form.note} 
            onChange={(e)=>setForm({...form, note: e.target.value})} 
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white h-32" 
          />
          <button className="btn-premium w-full py-3">Add Recurring Payment</button>
        </form>

        <div>
          <h4 className="text-2xl font-semibold text-amber-300 mb-4">Existing Recurring Payments</h4>
          {recurring.length ? (
            <ul className="space-y-3">
              {recurring.map((r) => (
                <li key={r.id} className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="text-white">
                    <div className="font-semibold text-lg">
                      Category {r.category_id} — {r.currency} {r.amount}
                    </div>
                    <div className="text-sm text-gray-300">{r.note}</div>
                  </div>
                  <div>
                    <button 
                      onClick={()=>toggleRecurring(r)} 
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
                    >
                      Toggle Off
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 text-center py-8">No recurring payments</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringPayments;