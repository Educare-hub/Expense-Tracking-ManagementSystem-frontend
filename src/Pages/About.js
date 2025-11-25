import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Navbar from "../components/nav/Navbar";
import Intro from "../components/about/Intro";
import Testimonials from "../components/about/Testimonials";
const About = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: "bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen", children: [_jsxs("div", { className: "container mx-auto px-6 py-16 text-center", children: [_jsx("h1", { className: "text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent", children: "About ExpensePro" }), _jsx("p", { className: "text-xl text-gray-200 max-w-3xl mx-auto mb-12", children: "Learn more about our mission to help you take control of your financial future." })] }), _jsx("div", { className: "container mx-auto px-6 py-12", children: _jsx(Intro, {}) }), _jsx(Testimonials, {})] })] }));
};
export default About;
