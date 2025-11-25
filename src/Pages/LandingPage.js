import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Footer } from "../components/footer/Footer";
import { Hero } from "../components/Hero";
import Navbar from "../components/nav/Navbar";
import { Services } from "../components/Services";
const LandingPage = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Hero, {}), _jsx(Services, {}), _jsx(Footer, {})] }));
};
export default LandingPage;
