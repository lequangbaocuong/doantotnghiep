import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/auth_layout";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Vui lòng nhập Email!");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("✅ " + res.data.message);
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Lỗi gửi yêu cầu"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="QUÊN MẬT KHẨU">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-400 text-sm text-center">
            Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
        </p>
        <input
          type="email"
          placeholder="Nhập Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#ff5252] hover:bg-[#e04848] rounded font-semibold transition text-white"
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu"}
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