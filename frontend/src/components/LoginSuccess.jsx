import React from "react";
import { Link } from "react-router-dom";

export default function LoginSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1a26] text-white">
      <div className="bg-[#1b2838] p-8 rounded-xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-[#4caf50] mb-4">
          Đăng nhập thành công!
        </h1>
        <p className="text-gray-300 mb-6">
          Chào mừng bạn đã truy cập vào hệ thống quản lý thông tin tội phạm công an phường Sơn Trà.
        </p>
        <Link
          to="/"
          className="bg-[#ff5252] px-6 py-2 rounded-lg hover:bg-[#e04848] transition"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
