import Navbar from "../nav/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../api/client";
import { useState } from "react";

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
  password: yup.string().min(6).max(255).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const Register = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      setMessage(res.data.message || "Registration successful!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-200 via-white to-cyan-100 p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h1 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
            Create an Account
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Join ExpensePro and take control of your finances today!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register("first_name")}
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
                />
                {errors.first_name && <span className="text-sm text-red-600">{errors.first_name.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  {...register("last_name")}
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
                />
                {errors.last_name && <span className="text-sm text-red-600">{errors.last_name.message}</span>}
              </div>
            </div>

            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}

            <input
              type="text"
              {...register("phone_number")}
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
            />
            {errors.phone_number && <span className="text-sm text-red-600">{errors.phone_number.message}</span>}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
                />
                {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
              </div>
              <div>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
                />
                {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:opacity-90 transition-all shadow-md"
            >
              Register
            </button>

            {message && (
              <p className="text-center text-sky-700 font-medium mt-3">{message}</p>
            )}
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-sky-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
