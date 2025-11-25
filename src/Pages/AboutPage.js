import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Intro from "../components/about/Intro";
import Testimonials from "../components/about/Testimonials";
import { Footer } from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
export const AboutPage = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Intro, {}), _jsx(Testimonials, {}), _jsx(Footer, {})] }));
};
