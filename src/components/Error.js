import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router";
const Error = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Page not found" }), _jsx("p", { children: " Sorry, we could not find the page you are looking for." }), _jsx(Link, { to: "/", children: "Go back Home" })] }));
};
export default Error;
