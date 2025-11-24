// src/pages/expenses/BudgetPage.tsx
import React, { useState } from "react";
import { useGetExpensesQuery, useUpdateExpenseMutation, useDeleteExpenseMutation } from "../../features/expenses/expensesAPI";
import ReactApexChart from "react-apexcharts";
import { Crown, Edit2, Trash2, Save, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";

const BudgetPage = () => {
  // FIX: Access array directly
  const { data: expenses = [], isLoading } = useGetExpensesQuery();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  // FIX: Using 'note' in state
  const [editForm, setEditForm] = useState({ note: "", amount: "" });

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  
  // Stats Calculation
  const byCategory = expenses.reduce((acc: any, e) => {
    const cat = e.category_id ? `Category ${e.category_id}` : "General";
    acc[cat] = (acc[cat] || 0) + Number(e.amount);
    return acc;
  }, {});

  const chartData = {
    series: Object.values(byCategory) as number[],
    options: {
      chart: { type: "pie" as const },
      labels: Object.keys(byCategory),
      colors: ["#f59e0b", "#d97706", "#b45309"],
      theme: { mode: "dark" as const }
    }
  };

  const startEdit = (exp: any) => {
    setEditingId(exp.id);
    setEditForm({ note: exp.note, amount: String(exp.amount) });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await updateExpense({ id: editingId, body: { note: editForm.note, amount: Number(editForm.amount) } });
    setEditingId(null);
    toast.success("Updated");
  };

  if (isLoading) return <div className="text-amber-500 text-center text-2xl mt-20">Loading Empire...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 pb-32">
      <Toaster />
      <h1 className="text-8xl font-black text-center text-amber-500 mb-12">BUDGET PAGE</h1>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
        <div className="bg-amber-900/20 border border-amber-600 rounded-3xl p-8 text-center">
          <Crown className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <p className="text-6xl font-black">KES {total.toLocaleString()}</p>
        </div>
        <div>
           <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height={300} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {expenses.map((exp) => (
          <div key={exp.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center">
            {editingId === exp.id ? (
              <div className="flex gap-4 w-full">
                <input value={editForm.note} onChange={(e)=>setEditForm({...editForm, note: e.target.value})} className="bg-black border border-amber-500 p-2 text-white flex-1" />
                <input value={editForm.amount} onChange={(e)=>setEditForm({...editForm, amount: e.target.value})} className="bg-black border border-amber-500 p-2 text-white w-32" />
                <button onClick={saveEdit}><Save className="text-green-500" /></button>
                <button onClick={()=>setEditingId(null)}><X className="text-gray-500" /></button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-2xl font-bold">{exp.note}</p>
                  <p className="text-gray-400">{format(new Date(exp.expense_date), "dd MMM yyyy")}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-2xl text-amber-400 font-bold">KES {exp.amount}</p>
                  <button onClick={() => startEdit(exp)}><Edit2 className="text-gray-400" /></button>
                  <button onClick={() => deleteExpense(exp.id)}><Trash2 className="text-red-500" /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default BudgetPage;