import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//src/components/Hero.tsx
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import homeIMG from "../assets/images/home-image.jpg";
export const Hero = () => {
    const navigate = useNavigate();
    const token = useSelector((s) => s.auth.token);
    const handleGetStarted = () => {
        if (token) {
            // If logged in, go to dashboard
            navigate("/dashboard");
        }
        else {
            // If not logged in, go to register
            navigate("/auth/register");
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-stretch gap-10 min-h-[80vh] p-6 md:p-12 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white", children: [_jsxs("div", { className: "w-full md:w-1/2 flex flex-col justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent", children: "Welcome to ExpensePro!" }), _jsxs("p", { className: "mb-4 text-lg leading-relaxed text-gray-200", children: ["Take control of your finances with ", _jsx("span", { className: "font-semibold text-cyan-300", children: "ExpensePro" }), " \u2014 the ultimate expense tracking system for individuals and teams."] }), _jsx("p", { className: "mb-4 text-lg leading-relaxed text-gray-200", children: "Effortlessly log your daily expenses, monitor spending, and gain insightful reports. Whether managing personal finances or a team budget, ExpensePro simplifies tracking and budgeting." }), _jsx("p", { className: "mb-6 text-lg leading-relaxed text-gray-200", children: "Get started today and take the first step towards smarter financial management!" }), _jsx("button", { onClick: handleGetStarted, className: "self-start px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300", children: token ? "Go to Dashboard" : "Get Started" })] }), _jsx("div", { className: "w-full md:w-1/2 flex justify-center items-stretch", children: _jsx("div", { className: "w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex", children: _jsx("img", { src: homeIMG, alt: "ExpensePro Dashboard", className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500" }) }) })] }) }));
};
