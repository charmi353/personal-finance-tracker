import { Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Logs from "./pages/Logs";
import AdminDashboard from "./pages/AdminDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import SupportTickets from "./pages/SupportTickets";
import FraudReports from "./pages/FraudReports";
import ManageUsers from "./pages/ManageUsers";
import ManageCategories from "./pages/ManageCategories";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import UserSupportTicket from "./pages/UserSupportTicket";
function App() {
    
    return (
        <>
        <Notification />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={ <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>} />
        
             <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/add-transaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
            <Route path="/edit-transaction/:id" element={<ProtectedRoute><EditTransaction /></ProtectedRoute>} />
            <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route
    path="/support-ticket"
    element={
        <ProtectedRoute>
            <UserSupportTicket />
        </ProtectedRoute>
    }
/>
            <Route
    path="/logs"
    element={
        <ProtectedRoute>
            <Logs />
        </ProtectedRoute>
    }
/>
               
<Route
    path="/admin"
    element={
        <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/users"
    element={
        <RoleProtectedRoute allowedRoles={["admin"]}>
            <ManageUsers />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/categories"
    element={
        <RoleProtectedRoute allowedRoles={["admin"]}>
            <ManageCategories />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/moderator"
    element={
        <RoleProtectedRoute allowedRoles={["moderator"]}>
            <ModeratorDashboard />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/support"
    element={
        <RoleProtectedRoute allowedRoles={["moderator"]}>
            <SupportTickets />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/fraud"
    element={
        <RoleProtectedRoute allowedRoles={["moderator"]}>
            <FraudReports />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/admin/users"
    element={
        <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminUsers />
        </RoleProtectedRoute>
    }
/>
<Route
    path="/admin/analytics"
    element={
        <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminAnalytics />
        </RoleProtectedRoute>
    }
/>



        </Routes>
        </>
    );
}

export default App;