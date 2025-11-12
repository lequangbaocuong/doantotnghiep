import React from "react";
import { BarChart3, AlertTriangle, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tổng quan hệ thống</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1b2838] p-6 rounded-xl flex items-center gap-4">
          <Users className="w-10 h-10 text-[#4ECDC4]" />
          <div>
            <p className="text-gray-400">Người dùng</p>
            <h2 className="text-2xl font-semibold">152</h2>
          </div>
        </div>

        <div className="bg-[#1b2838] p-6 rounded-xl flex items-center gap-4">
          <AlertTriangle className="w-10 h-10 text-[#ff5252]" />
          <div>
            <p className="text-gray-400">Bài đăng truy nã</p>
            <h2 className="text-2xl font-semibold">18</h2>
          </div>
        </div>

        <div className="bg-[#1b2838] p-6 rounded-xl flex items-center gap-4">
          <BarChart3 className="w-10 h-10 text-[#f9ca24]" />
          <div>
            <p className="text-gray-400">Vụ án đang xử lý</p>
            <h2 className="text-2xl font-semibold">35</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
