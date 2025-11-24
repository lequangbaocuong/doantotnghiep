import React, { useEffect, useState } from "react";
import { Search, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  
  const loadUserFromStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  useEffect(() => {
    loadUserFromStorage();
    window.addEventListener('storageChange', loadUserFromStorage);
    return () => {
      window.removeEventListener('storageChange', loadUserFromStorage);
    };
  }, []); 
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); 
    window.dispatchEvent(new Event('storageChange'));
  };
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
            HỆ THỐNG QUẢN LÝ VÀ TRA CỨU THÔNG TIN VỤ ÁN, HỒ SƠ TỘI PHẠM CÔNG AN PHƯỜNG SƠN TRÀ
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

          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-[#1b2838] border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] hover:border-[#ff5252] transition"
            >
              <span className="font-medium">Đăng nhập</span>
            </Link>
          ) : (
            <div className="relative group">
              {/* Nút hiển thị tên */}
              <button className="flex items-center gap-2 bg-[#1b2838] border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] hover:border-[#ff5252] transition cursor-pointer">
                <User className="w-5 h-5" />
                <span className="font-medium">{user?.hoten || "Người dùng"}</span>
              </button>

              {/* Dropdown — không biến mất khi di chuột */}
              <div
                className="
                 absolute right-0 top-full w-full bg-[#1b2838] border border-gray-700 
                  rounded-lg shadow-md hidden group-hover:block
                  z-50 p-1"
              >
                <button
                  onClick={() => window.location.href = '/profile'}
                  className="w-full text-left px-4 py-2 hover:bg-[#ff5252] rounded-lg transition"
                >
                  Trang cá nhân
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-[#ff5252] rounded-lg transition"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
