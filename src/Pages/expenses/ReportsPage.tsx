// src/pages/expenses/ReportsPage.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useGetExpenseStatsQuery } from "../../features/expenses/expensesAPI";
import ExpenseCharts from "../../components/charts/ExpenseCharts";

const ReportsPage: React.FC = () => {
  const userId = useSelector((s: RootState) => s.auth.user?.userid);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const { data: stats, isLoading } = useGetExpenseStatsQuery({ userId, year }, { skip: !userId });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="glass-gold p-10 max-w-6xl mx-auto rounded-3xl border border-amber-600/30">
        <h3 className="text-3xl font-bold text-amber-400 mb-6">Expense Reports</h3>
        
        <div className="mb-6">
          <label className="text-white mr-3 text-lg">Year:</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e)=>setYear(Number(e.target.value))} 
            className="p-3 rounded-xl bg-white/10 border border-white/20 text-white w-32"
          />
        </div>

        {stats && <ExpenseCharts stats={stats} />}

        <div className="mt-8">
          <h4 className="text-2xl font-semibold text-amber-300 mb-4">Category Breakdown</h4>
          <div className="space-y-2">
            {stats?.byCategory && stats.byCategory.length > 0 ? (
              stats.byCategory.map((c: any) => (
                <div 
                  key={c.category} 
                  className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20"
                >
                  <div className="text-white font-medium">{c.category}</div>
                  <div className="text-amber-400 font-bold">${Number(c.total).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-8">No data available for this period</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;