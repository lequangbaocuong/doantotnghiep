import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, PieChart, FileSearch, CheckCircle } from "lucide-react";

export default function ThuTruongDonVi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ff5252] uppercase">
        Trang quản lý - Thủ trưởng đơn vị
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Thống kê tình hình an ninh */}
        <div
          onClick={() => navigate("/thu-truong/thong-ke-an-ninh")}
          className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <BarChart3 className="text-[#45B7D1] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Thống kê tình hình an ninh</h2>
          <p className="text-gray-400 text-sm mb-3">
            Xem dữ liệu tổng hợp tình hình an ninh khu vực.
          </p>
          <button className="px-4 py-2 bg-[#45B7D1] rounded-md hover:bg-[#2f9fc1]">
            Xem thống kê
          </button>
        </div>

        {/* Phân tích vụ án */}
        <div
          onClick={() => navigate("/thutruong/phan-tich-vu-an")}
          className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <FileSearch className="text-[#4ECDC4] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Phân tích vụ án</h2>
          <p className="text-gray-400 text-sm mb-3">
            Xem danh sách và phân tích chi tiết từng vụ án.
          </p>
          <button className="px-4 py-2 bg-[#4ECDC4] rounded-md hover:bg-[#38b2a3]">
            Xem danh sách
          </button>
        </div>

        {/* Phân công điều tra */}
        <div
          onClick={() => navigate("/thutruong/phan-cong-dieu-tra")}
          className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <PieChart className="text-[#FFA502] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Phân công điều tra</h2>
          <p className="text-gray-400 text-sm mb-3">
            Chọn cán bộ phụ trách và giao nhiệm vụ cho từng vụ án.
          </p>
          <button className="px-4 py-2 bg-[#FFA502] rounded-md hover:bg-[#e69e00]">
            Phân công ngay
          </button>
        </div>

        {/* Duyệt truy nã */}
        <div
          onClick={() => navigate("/thutruong/duyet-truy-na")}
          className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <CheckCircle className="text-[#FF6B6B] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Duyệt thông tin truy nã</h2>
          <p className="text-gray-400 text-sm mb-3">
            Kiểm duyệt thông tin truy nã do công an phường gửi lên.
          </p>
          <button className="px-4 py-2 bg-[#FF6B6B] rounded-md hover:bg-[#e05252]">
            Duyệt ngay
          </button>
        </div>
      </div>
    </div>
  );
}
