import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../layouts/auth_layout";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Lấy token từ URL (ví dụ: ?token=eyJhbG...)
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) return alert("Mật khẩu phải từ 6 ký tự!");
    if (password !== confirmPassword) return alert("Mật khẩu xác nhận không khớp!");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token: token,
        newPassword: password
      });
      
      alert("✅ " + res.data.message);
      navigate("/login"); 

    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Lỗi đặt lại mật khẩu"));
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <div className="text-white text-center p-10">Đường dẫn không hợp lệ!</div>;

  return (
    <AuthLayout title="ĐẶT LẠI MẬT KHẨU">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="text-gray-400 text-sm mb-1 block">Mật khẩu mới</label>
            <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none text-white"
            />
        </div>

        <div>
            <label className="text-gray-400 text-sm mb-1 block">Xác nhận mật khẩu</label>
            <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none text-white"
            />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#ff5252] hover:bg-[#e04848] rounded font-semibold transition text-white"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
    </AuthLayout>
  );
}