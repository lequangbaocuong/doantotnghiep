import React from "react";
import { FileText, Search, Upload, ClipboardList, Edit3, Send } from "lucide-react";

export default function CongAnPhuong() {
  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ff5252] uppercase">
        Trang quản lý - Công an phường Sơn Trà
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Xem danh sách tố giác */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <FileText className="text-[#ff5252] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Xem danh sách tố giác / phản ánh</h2>
          <p className="text-gray-400 text-sm mb-3">
            Tiếp nhận và xử lý thông tin tố giác từ người dân.
          </p>
          <button className="px-4 py-2 bg-[#ff5252] rounded-md hover:bg-[#e04848]">
            Xem danh sách
          </button>
        </div>

        {/* Tạo hồ sơ vụ án */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <ClipboardList className="text-[#4ECDC4] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Tạo hồ sơ vụ án</h2>
          <p className="text-gray-400 text-sm mb-3">
            Khởi tạo hồ sơ cho vụ án mới dựa trên thông tin tố giác.
          </p>
          <button className="px-4 py-2 bg-[#4ECDC4] rounded-md hover:bg-[#38b2a3]">
            Tạo hồ sơ
          </button>
        </div>

        {/* Xem hồ sơ vụ án*/}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <Search className="text-[#A29BFE] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Xem hồ sơ vụ án</h2>
          <p className="text-gray-400 text-sm mb-3">
            Tra cứu thông tin hồ sơ các vụ án đã khởi tạo.
          </p>
          <button className="px-4 py-2 bg-[#A29BFE] rounded-md hover:bg-[#8e83fa]">
            Tra cứu
          </button>
        </div>

         {/* Đăng tải truy nã */}
        <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <Upload className="text-[#FF6B6B] w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Đăng tải thông tin truy nã</h2>
          <p className="text-gray-400 text-sm mb-3">
            Đăng tải và cập nhật thông tin truy nã tội phạm.
          </p>
          <button className="px-4 py-2 bg-[#FF6B6B] rounded-md hover:bg-[#e05252]">
            Đăng tải
          </button>
        </div>
      </div>
    </div>
  );
}
