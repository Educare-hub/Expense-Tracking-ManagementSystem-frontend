// Placeholder to ensure ReportsPage does not crash if this file is missing
import React from "react";

const ExpenseCharts: React.FC<{ stats: any }> = ({ stats }) => {
  if (!stats) return <div>No data for charts</div>;
  return (
    <div className="p-4 bg-gray-50 border rounded mt-4">
      <h4 className="text-gray-600 font-bold mb-2">Expense Summary Chart</h4>
      <div className="flex gap-4 items-end h-32">
        {stats.byCategory?.map((item: any, idx: number) => (
          <div key={idx} className="bg-blue-500 w-16 text-white text-xs text-center flex flex-col justify-end" style={{ height: '80%' }}>
            <span className="p-1">{item.category}</span>
          </div>
        ))}
        {(!stats.byCategory || stats.byCategory.length === 0) && (
            <div className="text-gray-400 text-sm">No categorical data to display</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;