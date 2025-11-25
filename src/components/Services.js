import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//src/components/Services.tsx
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import serviceIMG from "../assets/images/services.jpg";
export const Services = () => {
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
    return (_jsx("section", { className: "bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-16 px-6 md:px-12", children: _jsxs("div", { className: "flex flex-col md:flex-row items-stretch justify-between gap-10", children: [_jsx("div", { className: "w-full md:w-1/2 flex justify-center items-stretch", children: _jsx("div", { className: "w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex", children: _jsx("img", { src: serviceIMG, alt: "Our services", className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500" }) }) }), _jsxs("div", { className: "w-full md:w-1/2 flex flex-col justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500", children: [_jsx("h2", { className: "text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent", children: "Our Services" }), _jsxs("p", { className: "mb-6 text-gray-200 text-lg leading-relaxed", children: ["Discover the range of services ", _jsx("span", { className: "font-semibold text-cyan-300", children: "ExpensePro" }), " offers to help you track and manage your expenses effectively. From expense logging to insightful reporting, we make financial management easy!"] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "table text-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-cyan-300 text-lg", children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Service" }), _jsx("th", { children: "Benefit" }), _jsx("th", { children: "Example" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { className: "hover:bg-white/10", children: [_jsx("th", { children: "1" }), _jsx("td", { children: "Expense Tracking" }), _jsx("td", { children: "Monitor your daily spending" }), _jsx("td", { children: "Groceries, transport, bills" })] }), _jsxs("tr", { className: "hover:bg-white/10", children: [_jsx("th", { children: "2" }), _jsx("td", { children: "Recurring Payments" }), _jsx("td", { children: "Automatically manage regular expenses" }), _jsx("td", { children: "Subscriptions, rent, utilities" })] }), _jsxs("tr", { className: "hover:bg-white/10", children: [_jsx("th", { children: "3" }), _jsx("td", { children: "Financial Reports" }), _jsx("td", { children: "Get insights and summaries of your expenses" }), _jsx("td", { children: "Monthly or yearly spending charts" })] })] })] }) }), _jsx("button", { onClick: handleGetStarted, className: "mt-6 px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300", children: token ? "Go to Dashboard" : "Get Started" })] })] }) }));
};
