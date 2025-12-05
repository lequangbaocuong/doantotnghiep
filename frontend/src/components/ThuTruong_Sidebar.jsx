import React from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  FileSearch, 
  PieChart, 
  CheckCircle 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarThuTruong() {
  const location = useLocation();

  // Hàm kiểm tra để active menu hiện tại
  const isActive = (path) => location.pathname === path 
    ? "bg-[#ff5252] text-white" 
    : "bg-[#0f1a26] text-gray-300 hover:bg-[#2f3b4c]";

  return (
    <aside className="w-64 bg-[#1b2838] h-screen p-6 sticky left-0 top-0 shadow-lg border-r border-gray-700 flex flex-col">
      <h2 className="text-xl font-bold mb-8 text-center text-[#ff5252] uppercase tracking-wider">
        Ban Lãnh Đạo
      </h2>

      <nav className="flex flex-col gap-3">
        {/* Dashboard Tổng quan */}
        <Link
          to="/thutruong"
          className={`flex items-center gap-3 p-3 rounded-lg transition font-medium ${isActive("/thutruong")}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Tổng quan</span>
        </Link>

        {/* Thống kê */}
        <Link
          to="/thutruong/thong-ke-an-ninh"
          className={`flex items-center gap-3 p-3 rounded-lg transition font-medium ${isActive("/thutruong/thong-ke-an-ninh")}`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Thống kê an ninh</span>
        </Link>

        {/* Phân tích vụ án */}
        <Link
          to="/thutruong/phan-tich-vu-an"
          className={`flex items-center gap-3 p-3 rounded-lg transition font-medium ${isActive("/thutruong/phan-tich-vu-an")}`}
        >
          <FileSearch className="w-5 h-5" />
          <span>Phân tích vụ án</span>
        </Link>

        {/* Phân công điều tra */}
        <Link
          to="/thutruong/phan-cong-dieu-tra"
          className={`flex items-center gap-3 p-3 rounded-lg transition font-medium ${isActive("/thutruong/phan-cong-dieu-tra")}`}
        >
          <PieChart className="w-5 h-5" />
          <span>Phân công điều tra</span>
        </Link>

        {/* Duyệt truy nã */}
        <Link
          to="/thutruong/duyet-truy-na"
          className={`flex items-center gap-3 p-3 rounded-lg transition font-medium ${isActive("/thutruong/duyet-truy-na")}`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>Duyệt truy nã</span>
        </Link>

      </nav>

      <div className="mt-auto border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        Website hỗ trợ điều tra tội phạm tại phường Sơn Trà
      </div>
    </aside>
  );
}