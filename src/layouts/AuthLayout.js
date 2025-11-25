import { jsx as _jsx } from "react/jsx-runtime";
const AuthLayout = ({ children }) => {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-transparent", children: _jsx("div", { className: "w-full max-w-md", children: children }) }));
};
export default AuthLayout;
