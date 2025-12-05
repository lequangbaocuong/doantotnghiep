import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/Layout";
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUser";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
}
