import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/auth_layout";

export default function ForgotPassword() {
  const [cccd, setCccd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cccd) return alert("Vui lòng nhập CCCD!");
    alert(`Yêu cầu đặt lại mật khẩu cho CCCD ${cccd} đã được gửi.`);
  };

  return (
    <AuthLayout title="QUÊN MẬT KHẨU">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nhập CCCD của bạn"
          value={cccd}
          onChange={(e) => setCccd(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#ff5252] hover:bg-[#e04848] rounded font-semibold transition"
        >
          Gửi yêu cầu
        </button>
        <div className="text-center mt-3">
          <Link to="/login" className="text-[#ff5252] hover:underline">
            Quay lại đăng nhập
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
