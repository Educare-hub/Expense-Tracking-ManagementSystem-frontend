//src/Pages/expenses/ExpenseView.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetExpensesQuery } from "../../features/expenses/expensesAPI";

const ExpenseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // FIXED: Renamed 'data' to 'expenses' for clarity
  const { data: expenses, isLoading } = useGetExpensesQuery();

  if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;

  // FIXED: Remove .data access - expenses is already an array
  // FIXED: Use 'id' instead of 'expense_id' to match SQL schema
  const expense = expenses?.find((e) => String(e.id) === id);

  if (!expense) return <div className="text-red-500 text-center mt-20">Expense not found</div>;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="glass-gold p-10 w-full max-w-2xl rounded-3xl border border-amber-600/30">
        <h2 className="text-3xl font-bold text-amber-400 mb-6">Expense Details</h2>
        <div className="space-y-4 text-white">
          <div className="p-4 bg-white/10 rounded-xl">
            <strong className="text-amber-300">Amount:</strong> 
            <span className="ml-2">{expense.currency} {expense.amount}</span>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <strong className="text-amber-300">Category ID:</strong> 
            <span className="ml-2">{expense.category_id || "General"}</span>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <strong className="text-amber-300">Date:</strong> 
            <span className="ml-2">{new Date(expense.expense_date).toLocaleDateString()}</span>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <strong className="text-amber-300">Note:</strong>
            <div className="mt-2">{expense.note || "-"}</div>
          </div>
          {expense.receipt_url && (
            <div className="p-4 bg-white/10 rounded-xl">
              <strong className="text-amber-300">Receipt:</strong> 
              <a href={expense.receipt_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 underline">
                View Receipt
              </a>
            </div>
          )}
        </div>
        <div className="mt-6 flex gap-3">
          <Link to={`/expenses/${id}/edit`} className="btn-premium flex-1 py-3 text-center">
            Edit
          </Link>
          <Link to="/expenses/budget" className="btn-secondary flex-1 py-3 text-center">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpenseView;