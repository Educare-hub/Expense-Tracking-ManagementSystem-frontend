import Navbar from "../nav/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/client";
import { useState } from "react";

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export const Login = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-200 via-white to-cyan-100 p-6">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
          <h1 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Log in to continue managing your finances
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email address"
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-sky-300"
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-sky-300"
              />
              {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:opacity-90 transition-all shadow-md"
            >
              Login
            </button>

            {message && (
              <p className="text-center text-sky-700 font-medium mt-3">
                {message}
              </p>
            )}
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-sky-600 font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
