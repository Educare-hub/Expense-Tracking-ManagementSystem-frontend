import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/auth/Login.tsx
import { useForm } from "react-hook-form";
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
const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
});
const Login = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch(); // ← ADDED
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
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
                }
                else {
                    navigate("/user/dashboard");
                }
            }
        }
        catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Invalid email or password";
            toast.error(errorMsg);
            setMessage(errorMsg);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900", children: [_jsx(Navbar, {}), _jsx(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, className: "flex justify-center items-center min-h-[calc(100vh-80px)] p-6", children: _jsxs("div", { className: "glass-gold p-10 w-full max-w-md rounded-3xl", children: [_jsx("h1", { className: "text-4xl font-bold text-center text-gold mb-6 font-['Cinzel']", children: "Enter Your Dashboard" }), _jsx("p", { className: "text-center text-white/80 mb-8", children: "Access your private financial dashboard" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsx("input", { type: "email", ...register("email"), placeholder: "Email address", className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400" }), errors.email && _jsx("span", { className: "text-red-400 text-sm", children: errors.email.message }), _jsx("input", { type: "password", ...register("password"), placeholder: "Password", className: "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400" }), errors.password && _jsx("span", { className: "text-red-400 text-sm", children: errors.password.message }), _jsx("button", { type: "submit", className: "btn-premium w-full py-4 text-lg font-semibold rounded-xl", children: "Secure Login" }), _jsx("p", { className: "text-center text-white/70 mt-4", children: _jsx("a", { href: "/auth/forgot-password", className: "text-amber-400 hover:underline font-medium", children: "Forgot Password?" }) }), message && _jsx("p", { className: "text-center text-red-400 font-medium mt-4", children: message })] }), _jsxs("p", { className: "text-center text-white/80 mt-6", children: ["New to ExpensePro? ", _jsx("a", { href: "/auth/register", className: "text-amber-400 font-semibold hover:underline", children: "Create Account" })] })] }) })] }));
};
export default Login;
