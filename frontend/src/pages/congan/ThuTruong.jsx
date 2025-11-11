import React from "react";
import {
  BarChart3,
  PieChart,
  ClipboardCheck,
  CheckCircle,
  FileSearch,
  Shield,
} from "lucide-react";

export default function ThuTruongDonVi() {
  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ff5252] uppercase">
        Trang quản lý - Thủ trưởng đơn vị
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Thống kê an ninh */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <BarChart3 className="text-[#45B7D1] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Thống kê tình hình an ninh</h2>
          <p className="text-gray-400 text-sm mb-3">
            Xem tổng hợp dữ liệu an ninh tại các phường.
          </p>
          <button className="px-4 py-2 bg-[#45B7D1] rounded-md hover:bg-[#2f9fc1]">
            Xem thống kê
          </button>
        </div>

        {/* Thống kê tội phạm */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <PieChart className="text-[#FFA502] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Thống kê phạm vi tội phạm</h2>
          <p className="text-gray-400 text-sm mb-3">
            Biểu đồ và dữ liệu phân tích theo loại tội phạm.
          </p>
          <button className="px-4 py-2 bg-[#FFA502] rounded-md hover:bg-[#e69e00]">
            Xem biểu đồ
          </button>
        </div>

        {/* Phân tích vụ án */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <FileSearch className="text-[#4ECDC4] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Phân tích vụ án</h2>
          <p className="text-gray-400 text-sm mb-3">
            Phân tích chi tiết và xu hướng của các vụ án.
          </p>
          <button className="px-4 py-2 bg-[#4ECDC4] rounded-md hover:bg-[#38b2a3]">
            Phân tích ngay
          </button>
        </div>

        {/* Phân công điều tra */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <ClipboardCheck className="text-[#A29BFE] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Phân công điều tra</h2>
          <p className="text-gray-400 text-sm mb-3">
            Giao nhiệm vụ cho cán bộ điều tra và theo dõi tiến độ.
          </p>
          <button className="px-4 py-2 bg-[#A29BFE] rounded-md hover:bg-[#8e83fa]">
            Phân công
          </button>
        </div>

        {/* Duyệt truy nã */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <CheckCircle className="text-[#FF6B6B] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Duyệt thông tin truy nã</h2>
          <p className="text-gray-400 text-sm mb-3">
            Kiểm duyệt thông tin truy nã do công an phường gửi lên.
          </p>
          <button className="px-4 py-2 bg-[#FF6B6B] rounded-md hover:bg-[#e05252]">
            Duyệt ngay
          </button>
        </div>

        {/* Giám sát điều tra */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <Shield className="text-[#4ECDC4] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Giám sát điều tra</h2>
          <p className="text-gray-400 text-sm mb-3">
            Theo dõi và đánh giá tiến độ của các vụ án đang được xử lý.
          </p>
          <button className="px-4 py-2 bg-[#4ECDC4] rounded-md hover:bg-[#38b2a3]">
            Giám sát
          </button>
        </div>
      </div>
    </div>
  );
}
