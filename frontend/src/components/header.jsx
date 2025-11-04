import React from "react";
import { Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div
        className="w-full bg-cover bg-center text-white text-center py-8 relative"
        style={{
          backgroundImage: "url('../public/banner2.png')", // Đặt banner có tông xanh đậm hoặc đen xám, trong /public
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="../public/logo-1.png" // logo Công an hoặc biểu tượng khiên an ninh
            alt="Logo Bộ Công An"
            className="h-20 mb-3"
          />
          <p className="text-sm tracking-wide font-semibold text-gray-200">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1 text-white">
            CỔNG THÔNG TIN ĐIỀU TRA TỘI PHẠM
          </h1>
          <p className="text-base text-gray-300 mt-2">
            Bộ Công An - Hệ thống quản lý & truy vết tội phạm quốc gia
          </p>
        </div>
      </div>

      <nav className="bg-[#0f1a26] text-gray-100 flex items-center justify-between px-8 py-3 shadow-md">
        <div className="flex items-center gap-8">
          <Menu className="text-[#d32f2f] w-6 h-6 cursor-pointer" />
          <ul className="flex items-center gap-6 font-medium">
            <li className="hover:text-[#ff5252] cursor-pointer transition">
              TRANG CHỦ
            </li>
            <li className="hover:text-[#ff5252] cursor-pointer transition">
              HỒ SƠ TỘI PHẠM
            </li>
            <li className="hover:text-[#ff5252] cursor-pointer transition">
              VỤ ÁN
            </li>
            <li className="hover:text-[#ff5252] cursor-pointer transition">
              THỐNG KÊ
            </li>
            <li className="hover:text-[#ff5252] cursor-pointer transition">
              LIÊN HỆ
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <input
            className="border border-gray-600 bg-[#1b2838] text-white rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            placeholder="Tìm kiếm hồ sơ, vụ án..."
          />
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff5252] hover:bg-[#e04848] transition">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
}
