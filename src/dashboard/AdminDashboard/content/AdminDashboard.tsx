// src/dashboard/AdminDashboard/content/AdminDashboard.tsx
import React, { useState } from "react";
import {
  useGetAdminUsersQuery,
  useGetAdminExpensesQuery,
} from "../../../features/admin/adminAPI";

const AdminDashboard = () => {
  const { data: users = [], isLoading: usersLoading } = useGetAdminUsersQuery(undefined);
  const { data: expenses = [], isLoading: expensesLoading } = useGetAdminExpensesQuery(undefined);

  const totalSpent = expenses.reduce((sum: number, e: any) => sum + Number(e.amount || 0), 0);

  const [resetUser, setResetUser] = useState<{ id: number; email: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSendResetLink = async () => {
    if (!resetUser) return;

    setStatus("sending");
    setMessage("");

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("expensepro_token");

      const res = await fetch("http://localhost:8081/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: resetUser.email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(`Reset link sent to ${resetUser.email} successfully!`);
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed to send");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to send link. Check console.");
      console.error("Password reset error:", err);
    }
  };

  const handleCancel = () => {
    setResetUser(null);
    setStatus("idle");
    setMessage("");
  };

  if (usersLoading || expensesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <div className="p-8 text-center">
        <h1 className="text-5xl font-bold mb-2">ADMIN CENTER</h1>
        <p className="text-xl opacity-90">
          Managing {users.length} users • KES {totalSpent.toLocaleString()} total spent
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        {/* Users Card */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            All Users ({users.length})
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {users.map((u: any) => (
              <div
                key={u.id}
                className="bg-white/10 rounded-lg p-4 backdrop-blur hover:bg-white/20 transition"
              >
                <div className="font-semibold">{u.name}</div>
                <div className="text-sm opacity-80">{u.email}</div>
                <div className="text-xs mt-1">
                  Status:{" "}
                  <span className={u.is_suspended ? "text-red-400" : "text-green-400"}>
                    {u.is_suspended ? "SUSPENDED" : "ACTIVE"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setResetUser({ id: u.id, email: u.email });
                    setStatus("idle");
                    setMessage("");
                  }}
                  className="mt-4 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium transition"
                >
                  Reset Password
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses Card — UNTOUCHED */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">Recent Expenses</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {expenses.slice(0, 15).map((e: any) => (
              <div key={e.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition">
                <div className="flex justify-between">
                  <span className="font-medium">{e.note || "No note"}</span>
                  <span className="font-bold text-lg">KES {Number(e.amount).toLocaleString()}</span>
                </div>
                <div className="text-sm opacity-80 mt-1">
                  User ID: {e.user_id} • {new Date(e.expense_date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Password Modal — FIXED & BEAUTIFUL */}
      {resetUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Reset User Password</h3>
            <p className="mb-6 text-lg">
              Send password reset link to:
              <br />
              <strong className="text-orange-400 text-xl">{resetUser.email}</strong>
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleSendResetLink}
                disabled={status === "sending"}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg font-bold transition"
              >
                {status === "sending" ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition"
              >
                Cancel
              </button>
            </div>

            {status === "success" && (
              <p className="mt-6 text-center text-green-400 text-lg font-bold">{message}</p>
            )}
            {status === "error" && (
              <p className="mt-6 text-center text-red-400 text-lg">{message}</p>
            )}
          </div>
        </div>
      )}

      <div className="text-center mt-12 text-sm opacity-70">
        ExpenseTracker Pro • {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default AdminDashboard;