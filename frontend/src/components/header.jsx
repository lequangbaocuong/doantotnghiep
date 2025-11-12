import React from "react";
import { Search, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full">
      <div
        className="w-full bg-cover bg-center text-white text-center py-8 relative"
        style={{
          backgroundImage: "url('../public/banner2.png')", 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="../public/logo-1.png" 
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
            <li>
              <Link
              to="/"
              className="hover:text-[#ff5252] cursor-pointer transition"
              >
                  TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link
                to="/cases"
                className="hover:text-[#ff5252] cursor-pointer transition"
              >
                VỤ ÁN
              </Link>
            </li>
            <li>
              <Link
                to="/statistics"
                className="hover:text-[#ff5252] cursor-pointer transition"
              >
                THỐNG KÊ
              </Link>
            </li>
            <li>
              <Link
                to="/lienhe"
                className="hover:text-[#ff5252] cursor-pointer transition"
              >
                LIÊN HỆ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {/* Tìm kiếm */}
          <div className="flex items-center gap-2">
            <input
              className="border border-gray-600 bg-[#1b2838] text-white rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
              placeholder="Tìm kiếm hồ sơ, vụ án..."
            />
            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff5252] hover:bg-[#e04848] transition">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>

          <Link
            to="/login"
            className="flex items-center gap-2 bg-[#1b2838] border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] hover:border-[#ff5252] transition"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Đăng nhập</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
