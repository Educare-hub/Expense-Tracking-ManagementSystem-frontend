// src/components/auth/ForgotPassword.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", data);
      toast.success("Reset code sent!");
      // NOW GOES TO VERIFY PAGE (same as login/register)
      navigate("/auth/verify", { state: { email: res.data.email || data.email } });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-gold p-10 w-full max-w-md rounded-3xl">
        <h1 className="text-4xl font-bold text-center text-amber-400 mb-6 font-['Cinzel']">Reset Password</h1>
        <p className="text-center text-white/80 mb-8">We’ll send a 6-digit code to your email</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            type="email"
            {...register("email")}
            placeholder="Your email"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

          <button type="submit" disabled={loading} className="btn-premium w-full py-4 text-xl font-bold">
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>

        <p className="text-center text-white/70 mt-6">
          <a href="/auth/login" className="text-amber-400 hover:underline">Back to Login</a>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;