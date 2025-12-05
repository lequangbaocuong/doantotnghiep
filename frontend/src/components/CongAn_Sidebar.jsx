import React from "react";
import { FileText, Search, Upload, LogOut, Home } from "lucide-react"; // Import thêm icon LogOut, Home
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function SidebarCongAn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Xóa thông tin đăng nhập của cán bộ
    localStorage.removeItem("token_canbo");
    localStorage.removeItem("user_canbo");
    
    // 2. Điều hướng về trang chủ (của người dân)
    navigate("/");
  };

  return (
    <aside className="w-64 bg-[#1b2838] text-white h-screen p-6 sticky left-0 top-0 shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-center text-[#ff5252]">
        Công An P. Sơn Trà
      </h2>

      <nav className="flex flex-col gap-4 flex-grow">
        <Link
          to="/congan/danhsachtogiac"
          className="flex items-center gap-3 p-3 bg-[#0f1a26] rounded-lg hover:bg-[#ff5252] transition"
        >
          <FileText className="w-6 h-6" />
          <span>Danh sách tố giác</span>
        </Link>

        <Link
          to="/congan/caselists"
          className="flex items-center gap-3 p-3 bg-[#0f1a26] rounded-lg hover:bg-[#A29BFE] transition"
        >
          <Search className="w-6 h-6" />
          <span>Xem hồ sơ vụ án</span>
        </Link>

        <Link
          to="/congan/dangtaitruyna"
          className="flex items-center gap-3 p-3 bg-[#0f1a26] rounded-lg hover:bg-[#FF6B6B] transition"
        >
          <Upload className="w-6 h-6" />
          <span>Đăng tải truy nã</span>
        </Link>
      </nav>

      {/* Phần Footer của Sidebar: Nút Đăng xuất */}
      <div className="mt-auto border-t border-gray-700 pt-4 space-y-3">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left bg-red-900/30 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition"
        >
          <LogOut className="w-6 h-6" />
          <span>Đăng xuất</span>
        </button>

        <div className="text-center text-xs text-gray-500">
          Hệ thống hỗ trợ điều tra tội phạm v1.0
        </div>
      </div>
    </aside>
  );
}