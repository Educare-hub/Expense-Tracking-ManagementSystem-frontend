// src/App.tsx - Fixed imports
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import from pages folder - USE CORRECT NAMES
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";  // Changed from ServicesPage

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

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        {/* AUTH ROUTES */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify" element={<Verification />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/register" element={<Navigate to="/auth/register" replace />} />

        {/* DASHBOARD ROUTES */}
        <Route path="/admin/dashboard" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
        <Route path="/user/dashboard" element={<UserProtected><UserDashboard /></UserProtected>} />
        <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />
        
        {/* EXPENSE ROUTES */}
        <Route path="/expenses" element={<UserProtected><BudgetPage /></UserProtected>} />
        <Route path="/expenses/budget" element={<UserProtected><BudgetPage /></UserProtected>} />
        <Route path="/expenses/create" element={<UserProtected><ExpenseCreate /></UserProtected>} />
        <Route path="/expenses/:id/edit" element={<UserProtected><ExpenseEdit /></UserProtected>} />
        <Route path="/expenses/:id" element={<UserProtected><ExpenseView /></UserProtected>} />
        <Route path="/expenses/recurring" element={<UserProtected><RecurringPayments /></UserProtected>} />
        <Route path="/expenses/reports" element={<UserProtected><ReportsPage /></UserProtected>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;