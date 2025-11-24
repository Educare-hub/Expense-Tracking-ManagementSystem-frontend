//src/dashboard/AdminDashboard/content/AdminDashboard.tsx
import { Users, DollarSign } from "lucide-react";
import { useGetUsersQuery } from "../../../features/auth/usersAPI";
import { useGetExpensesQuery } from "../../../features/expenses/expensesAPI";

const AdminDashboard = () => {
  const { data: usersData = [], isLoading: usersLoading } = useGetUsersQuery();
  const { data: expensesData = [], isLoading: expensesLoading } = useGetExpensesQuery(undefined);


  const usersArray = Array.isArray((usersData as any)?.data)
    ? (usersData as any).data
    : Array.isArray(usersData)
    ? usersData
    : [];

  const expensesArray = Array.isArray((expensesData as any)?.data)
    ? (expensesData as any).data
    : Array.isArray(expensesData)
    ? expensesData
    : [];

  const totalUsers = usersArray.length;

  const totalRevenue = expensesArray.reduce(
    (sum: number, e: { amount?: number | string }) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <h1 className="text-7xl font-black text-center mb-16">ADMIN CENTER</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur p-8 rounded-3xl text-center">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <p className="text-5xl font-bold">
            {usersLoading ? "..." : totalUsers}
          </p>
          <p>Total Users</p>
        </div>

        <div className="bg-white/10 backdrop-blur p-8 rounded-3xl text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-4" />
          <p className="text-4xl font-bold">
            {expensesLoading ? "..." : `KES ${totalRevenue.toLocaleString()}`}
          </p>
          <p>Total Spent</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
