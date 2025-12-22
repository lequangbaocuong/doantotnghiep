import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Key } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const menu = [
    { name: "Tổng quan", path: "/admin/dashboard", icon: <LayoutDashboard /> },
    { name: "Quản lý tài khoản cán bộ", path: "/admin/users", icon: <Users /> },
    { name: "Quản lý bài đăng", path: "/admin/posts", icon: <FileText /> },
    { name: "Cấp tài khoản", path: "/admin/accounts", icon: <Key /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f1a26] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1b2838] p-6 flex flex-col">
        <h2 className="text-xl font-bold text-[#ff5252] mb-6 text-center">Admin Panel</h2>
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#162436] transition ${
                location.pathname === item.path ? "bg-[#ff5252] text-white" : "text-gray-300"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-[#0f1a26] p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
