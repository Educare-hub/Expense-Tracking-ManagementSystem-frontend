//src/components/auth/Register.tsx

import Navbar from "../nav/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../api/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type RegisterInputs = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  first_name: yup.string().max(50).required("First name is required"),
  last_name: yup.string().max(50).required("Last name is required"),
  email: yup.string().email("Invalid email").max(100).required("Email is required"),
  phone_number: yup.string().max(20).required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").max(255).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
  resolver: yupResolver(schema) as any,
});

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setIsLoading(true);
    
    try {
      // Store email in localStorage BEFORE making the API call
      const emailToStore = data.email.toLowerCase().trim();
      localStorage.setItem("pending_verification_email", emailToStore);
      console.log("Stored email in localStorage:", emailToStore);
      console.log("Verify storage:", localStorage.getItem("pending_verification_email"));
      
      const res = await api.post("/auth/register", data);
      
      // Log the ENTIRE response
      console.log("Registration SUCCESS - Full response:", {
        status: res.status,
        data: res.data,
        headers: res.headers
      });
      
      // Show success message
      toast.success("Registration successful! Check your email for the verification code.");
      
      // Double-check localStorage before navigation
      const storedEmail = localStorage.getItem("pending_verification_email");
      console.log("Email in storage before navigation:", storedEmail);
      
      // Navigate to verification page IMMEDIATELY (no setTimeout)
      const verifyURL = `/auth/verify?email=${encodeURIComponent(emailToStore)}`;
      console.log("Navigating to:", verifyURL);
      navigate(verifyURL);

    } catch (err: any) {
      // DEBUG: Log the ENTIRE error
      console.error("Registration FAILED - Full error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      
      console.error("Registration error:", err.response?.data);
      
      const backendMessage = err.response?.data?.error || err.response?.data?.message;

      // Handle specific error cases
      if (backendMessage?.toLowerCase().includes("already exists") || 
          backendMessage?.toLowerCase().includes("duplicate") || 
          backendMessage?.toLowerCase().includes("unique")) {
        toast.error("This email is already registered. Please log in instead.");
      } else if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6"
      >
        <div className="glass-gold w-full max-w-2xl p-10 rounded-3xl">
          <h1 className="text-4xl font-bold text-center text-gold mb-4 font-['Cinzel']">
            Join the ExpensePro Community
          </h1>
          <p className="text-center text-white/80 mb-8">
            Create your ExpensePro account and master your finances
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register("first_name")}
                  placeholder="First Name"
                  disabled={isLoading}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.first_name && (
                  <span className="text-red-400 text-sm block mt-1">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("last_name")}
                  placeholder="Last Name"
                  disabled={isLoading}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.last_name && (
                  <span className="text-red-400 text-sm block mt-1">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email Address"
                disabled={isLoading}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.email && (
                <span className="text-red-400 text-sm block mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <input
                type="text"
                {...register("phone_number")}
                placeholder="Phone Number"
                disabled={isLoading}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.phone_number && (
                <span className="text-red-400 text-sm block mt-1">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password (min 6 chars)"
                  disabled={isLoading}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.password && (
                  <span className="text-red-400 text-sm block mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  disabled={isLoading}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.confirmPassword && (
                  <span className="text-red-400 text-sm block mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-premium w-full py-4 text-lg font-semibold rounded-xl ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Your Dashboard...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-white/80 mt-6">
            Already have an account?{" "}
            <a 
              href="/auth/login" 
              className="text-amber-400 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;