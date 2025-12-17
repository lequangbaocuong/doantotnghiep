import React, { useEffect, useState } from "react";
import { BarChart3, AlertTriangle, Users } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, wanted: 0, cases: 0 });

  useEffect(() => {
    Promise.all([
        axios.get("http://localhost:5000/api/admin/users"), 
        axios.get("http://localhost:5000/api/wanted/pending"), 
        axios.get("http://localhost:5000/api/cases") 
    ]).then(([resUser, resWanted, resCase]) => {
        setStats({
            users: resUser.data.length,
            wanted: resWanted.data.length, // Lấy length tạm
            cases: Array.isArray(resCase.data) ? resCase.data.length : 0
        });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white uppercase">Tổng quan hệ thống</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1b2838] p-6 rounded-xl flex items-center gap-4 shadow-lg border-l-4 border-[#4ECDC4]">
          <Users className="w-12 h-12 text-[#4ECDC4]" />
          <div>
            <p className="text-gray-400 mb-1">Tổng người dùng</p>
            <h2 className="text-3xl font-bold text-white">{stats.users}</h2>
          </div>
        </div>

        <div className="bg-[#1b2838] p-6 rounded-xl flex items-center gap-4 shadow-lg border-l-4 border-[#ff5252]">
          <AlertTriangle className="w-12 h-12 text-[#ff5252]" />
          <div>
            <p className="text-gray-400 mb-1">Truy nã chờ duyệt</p>
            <h2 className="text-3xl font-bold text-white">{stats.wanted}</h2>
          </div>
        </div>

        <div className="bg-[#1b2838] p-6 rounded-xl flex items-center gap-4 shadow-lg border-l-4 border-[#f9ca24]">
          <BarChart3 className="w-12 h-12 text-[#f9ca24]" />
          <div>
            <p className="text-gray-400 mb-1">Hồ sơ vụ án</p>
            <h2 className="text-3xl font-bold text-white">{stats.cases}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}