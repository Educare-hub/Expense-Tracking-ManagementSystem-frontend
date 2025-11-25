// src/components/auth/Login.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // ← ADDED
import { setAuthSuccess } from "../../features/auth/authSlice"; // ← ADDED
import Navbar from "../nav/Navbar";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch(); // ← ADDED
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: yupResolver(schema) as any,  // ← ONLY CHANGE: Added "as any"
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      // Needs verification (first time)
      if (res.data.requiresVerification) {
        toast.success("Verification code sent to your email");
        navigate("/auth/verify", { state: { email: data.email } });
        return;
      }

      // Already verified → SUCCESS LOGIN
      if (res.data.token && res.data.user) {
        // Save to localStorage
        localStorage.setItem("expensepro_token", res.data.token);
        localStorage.setItem("role", res.data.user.role.toLowerCase());
        // After successful login — ADD THIS LINE
        localStorage.setItem("token", res.data.token);
        console.log("TOKEN SAVED:", res.data.token);


        // Update Redux state IMMEDIATELY
        dispatch(setAuthSuccess({
          token: res.data.token,
          user: res.data.user
        }));

        toast.success("Welcome back to your financial tracker!");

        // Instant redirect — no delay
        if (res.data.user.role.toLowerCase() === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Invalid email or password";
      toast.error(errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6"
      >
        <div className="glass-gold p-10 w-full max-w-md rounded-3xl">
          <h1 className="text-4xl font-bold text-center text-gold mb-6 font-['Cinzel']">
            Enter Your Dashboard
          </h1>
          <p className="text-center text-white/80 mb-8">
            Access your private financial dashboard
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="email"
              {...register("email")}
              placeholder="Email address"
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}

            <button
              type="submit"
              className="btn-premium w-full py-4 text-lg font-semibold rounded-xl"
            >
              Secure Login
            </button>

            <p className="text-center text-white/70 mt-4">
              <a href="/auth/forgot-password" className="text-amber-400 hover:underline font-medium">
                Forgot Password?
              </a>
            </p>

            {message && <p className="text-center text-red-400 font-medium mt-4">{message}</p>}
          </form>

          <p className="text-center text-white/80 mt-6">
            New to ExpensePro? <a href="/auth/register" className="text-amber-400 font-semibold hover:underline">Create Account</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;