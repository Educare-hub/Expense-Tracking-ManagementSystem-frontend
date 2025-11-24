// src/components/auth/Verification.tsx
import React from "react";
import Navbar from "../nav/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthSuccess } from "../../features/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type VerifyInputs = { code: string };

const schema = yup.object({
  code: yup.string().matches(/^\d{6}$/, "Code must be exactly 6 digits").required("Required"),
});

const Verification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showManualEmail, setShowManualEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get email from URL params OR localStorage
  const [searchParams] = useSearchParams();
  const emailFromURL = searchParams.get("email");
  const emailFromStorage = localStorage.getItem("pending_verification_email");
  const [currentEmail, setCurrentEmail] = useState(emailFromURL || emailFromStorage || "");

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
  });

  // Log on mount
  React.useEffect(() => {
    console.log("Verification Component Mounted");
    console.log("Email from URL:", emailFromURL);
    console.log("Email from Storage:", emailFromStorage);
    console.log("Current email state:", currentEmail);
    console.log("Full URL:", window.location.href);
    
    if (!currentEmail) {
      console.error("NO EMAIL FOUND!");
      setShowManualEmail(true);
    } else {
      console.log("Email found:", currentEmail);
    }
  }, []);

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
    if (!currentEmail) {
      toast.error("Please enter your email first");
      setShowManualEmail(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const payload = { 
        code: data.code.trim() 
      };
      
      console.log("Verifying code:", payload.code);
      
      const res = await api.post("/auth/verify-code", payload);
      console.log("Verification response:", res.data);

      const token = res.data.token || res.data.data?.token;
      const user = res.data.user || res.data.data?.user;

      if (!token || !user) {
        console.error("Backend missing token/user:", res.data);
        toast.error("Verification succeeded but login failed. Please login manually.");
        navigate("/auth/login");
        return;
      }

      // Save authentication
      localStorage.setItem("expensepro_token", token);
      localStorage.setItem("role", user.role.toLowerCase());
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("pending_verification_email");

      console.log("Auth saved:", { token: token.substring(0, 20) + "...", role: user.role });

      dispatch(setAuthSuccess({ token, user }));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success("Welcome to your Dashboard!");
      
      const redirectPath = user.role.toLowerCase() === "admin" 
        ? "/admin/dashboard" 
        : "/user/dashboard";
      
      console.log("Redirecting to:", redirectPath);
      
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
        window.location.href = redirectPath;
      }, 500);

    } catch (err: any) {
      console.error("Verification error:", err.response?.data);
      
      const errorMsg = err.response?.data?.message || err.response?.data?.error;
      
      if (errorMsg?.toLowerCase().includes("expired")) {
        toast.error("Code expired. Click 'Resend Code' below.");
      } else if (errorMsg?.toLowerCase().includes("invalid")) {
        toast.error("Invalid code. Please check and try again.");
      } else {
        toast.error(errorMsg || "Verification failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!currentEmail) {
      toast.error("Please enter your email first");
      setShowManualEmail(true);
      return;
    }

    setIsResending(true);
    try {
      console.log("Resending code to:", currentEmail);
      await api.post("/auth/resend-code", { email: currentEmail });
      toast.success("New code sent! Check your email.");
    } catch (err: any) {
      console.error("Resend error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  const handleSaveManualEmail = () => {
    const trimmedEmail = manualEmail.trim().toLowerCase();
    
    if (!trimmedEmail) {
      toast.error("Please enter your email");
      return;
    }
    
    // Better email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    console.log("Saving manual email:", trimmedEmail);
    localStorage.setItem("pending_verification_email", trimmedEmail);
    setCurrentEmail(trimmedEmail);
    setShowManualEmail(false);
    toast.success("Email saved! Now enter your verification code.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4"
      >
        <div className="glass-gold p-10 w-full max-w-md rounded-3xl">
          <h2 className="text-4xl font-bold text-center text-gold mb-4 font-['Cinzel']">
            Verify Your Access
          </h2>
          
          {/* Email Display or Input */}
          {showManualEmail ? (
            <div className="mb-6">
              <p className="text-center text-white/80 mb-4">
                Enter your registered email address:
              </p>
              <input
                type="email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSaveManualEmail()}
                placeholder="your@email.com"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 mb-3"
                autoFocus
              />
              <button
                onClick={handleSaveManualEmail}
                className="btn-premium w-full py-3 rounded-xl"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              <p className="text-center text-white/80 mb-2">
                Enter the 6-digit code sent to:
              </p>
              <p className="text-center text-amber-400 font-semibold mb-6">
                {currentEmail}
                <button
                  onClick={() => setShowManualEmail(true)}
                  className="ml-2 text-xs text-white/60 hover:text-white/80 underline"
                >
                  (change)
                </button>
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  {...register("code")}
                  placeholder="000000"
                  className="w-full p-4 text-center text-2xl font-mono rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled={isLoading}
                  autoFocus
                />
                {errors.code && (
                  <span className="text-red-400 text-sm text-center block">
                    {errors.code.message}
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn-premium w-full py-4 text-lg font-semibold rounded-xl ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Verifying..." : "Confirm Access"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-white/80 text-sm mb-2">Didn't receive the code?</p>
                <button
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-amber-400 hover:underline font-semibold disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </button>
              </div>
            </>
          )}

          <p className="text-center text-white/60 mt-6 text-xs">
            Having trouble? <a href="/auth/login" className="text-amber-400 hover:underline">Login instead</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Verification;