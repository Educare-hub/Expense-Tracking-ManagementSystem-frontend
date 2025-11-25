import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Import from pages folder - USE CORRECT NAMES
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services"; // Changed from ServicesPage
// Auth Pages
import Register from "./components/auth/Register";
import Verification from "./components/auth/Verification";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Login from "./components/auth/Login";
// Dashboards
import UserDashboard from "./dashboard/UserDashboard/content/UserDashboard";
import AdminDashboard from "./dashboard/AdminDashboard/content/AdminDashboard";
// Expenses Pages
import BudgetPage from "./pages/expenses/BudgetPage";
import ExpenseCreate from "./pages/expenses/ExpenseCreate";
import ExpenseEdit from "./pages/expenses/ExpenseEdit";
import ExpenseView from "./pages/expenses/ExpenseView";
import RecurringPayments from "./pages/expenses/RecurringPayments";
import ReportsPage from "./pages/expenses/ReportsPage";
// Protected Routes
import UserProtected from "./routes/UserProtected";
import AdminProtected from "./routes/AdminProtected";
const App = () => {
    return (_jsxs(Router, { children: [_jsx(Toaster, { position: "top-center" }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/services", element: _jsx(Services, {}) }), _jsx(Route, { path: "/auth/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/auth/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/auth/verify", element: _jsx(Verification, {}) }), _jsx(Route, { path: "/auth/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/auth/reset-password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/login", element: _jsx(Navigate, { to: "/auth/login", replace: true }) }), _jsx(Route, { path: "/register", element: _jsx(Navigate, { to: "/auth/register", replace: true }) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(AdminProtected, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/user/dashboard", element: _jsx(UserProtected, { children: _jsx(UserDashboard, {}) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(Navigate, { to: "/user/dashboard", replace: true }) }), _jsx(Route, { path: "/expenses", element: _jsx(UserProtected, { children: _jsx(BudgetPage, {}) }) }), _jsx(Route, { path: "/expenses/budget", element: _jsx(UserProtected, { children: _jsx(BudgetPage, {}) }) }), _jsx(Route, { path: "/expenses/create", element: _jsx(UserProtected, { children: _jsx(ExpenseCreate, {}) }) }), _jsx(Route, { path: "/expenses/:id/edit", element: _jsx(UserProtected, { children: _jsx(ExpenseEdit, {}) }) }), _jsx(Route, { path: "/expenses/:id", element: _jsx(UserProtected, { children: _jsx(ExpenseView, {}) }) }), _jsx(Route, { path: "/expenses/recurring", element: _jsx(UserProtected, { children: _jsx(RecurringPayments, {}) }) }), _jsx(Route, { path: "/expenses/reports", element: _jsx(UserProtected, { children: _jsx(ReportsPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] })] }));
};
export default App;
