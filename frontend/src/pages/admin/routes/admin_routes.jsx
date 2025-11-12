import { Routes, Route } from "react-router-dom";
import AdminLogin from "../AdminLogin";
import AdminLayout from "../Layout";
import Dashboard from "../Dashboard";
import ManageUsers from "../ManageUser";

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
