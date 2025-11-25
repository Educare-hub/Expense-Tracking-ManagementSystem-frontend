// src/components/auth/ResetPassword.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import api from "../../api/client";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type FormData = { code: string; password: string; confirmPassword: string };

const schema = yup.object({
  code: yup.string().length(6, "Code must be 6 digits").required("Code required"),
  password: yup.string().min(8, "Password too short").required("Required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match").required("Required"),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email || "";

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: yupResolver(schema) as any,
});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/reset-password", {
        email,
        code: data.code,
        password: data.password,
      });

      localStorage.setItem("expensepro_token", res.data.token);
      localStorage.setItem("role", res.data.user.role.toLowerCase());

      toast.success("Password reset successful! Welcome back.");
      navigate(res.data.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-gold p-10 w-full max-w-md rounded-3xl"
      >
        <h1 className="text-4xl font-bold text-center text-amber-400 mb-6 font-['Cinzel']">
          Set New Password
        </h1>
        <p className="text-center text-white/80 mb-8">
          Enter the 6-digit code sent to <span className="text-amber-400">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            type="text"
            {...register("code")}
            placeholder="000000"
            maxLength={6}
            className="w-full p-4 text-center text-2xl font-mono rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.code && <p className="text-red-400 text-sm text-center">{errors.code.message}</p>}

          <input
            type="password"
            {...register("password")}
            placeholder="New password"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`btn-premium w-full py-4 text-xl font-bold ${loading ? "opacity-50" : ""}`}
          >
            {loading ? "Resetting..." : "Reset & Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;