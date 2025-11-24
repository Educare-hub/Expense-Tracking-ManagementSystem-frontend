// src/pages/expenses/ExpenseList.tsx
import React from "react";
import { useGetExpensesQuery, useDeleteExpenseMutation } from "../../features/expenses/expensesAPI";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ExpenseList = () => {
  // FIX: Access array directly
  const { data: expenses = [], isLoading } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();

  if (isLoading) return <div className="p-8 text-white">Loading Empire...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-amber-400">All Expenses</h2>
        <Link to="/expenses/create" className="btn-premium px-6 py-2 rounded-full text-black font-bold">New +</Link>
      </div>
      <table className="w-full mt-4 text-left">
        <thead className="text-amber-400 border-b border-amber-800">
          <tr><th className="p-4">Note</th><th className="p-4">Amount</th><th className="p-4">Date</th><th className="p-4">Action</th></tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4">{e.note}</td>
              <td className="p-4">KES {e.amount}</td>
              <td className="p-4">{format(new Date(e.expense_date), "yyyy-MM-dd")}</td>
              <td className="p-4 gap-4 flex">
                <Link to={`/expenses/edit/${e.id}`} className="text-blue-400">Edit</Link>
                <button onClick={()=>deleteExpense(e.id)} className="text-red-400">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExpenseList;