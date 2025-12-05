import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import AuthLayout from "../layouts/auth_layout";
import axios from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const cccd = location.state?.cccd || "";

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.newPassword.length < 6)
      return alert("Mật khẩu mới phải có ít nhất 6 ký tự!");

    if (form.newPassword !== form.confirmPassword)
      return alert("Xác nhận mật khẩu không khớp!");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
        return navigate("/login");
      } 
      const response = await axios.post(
        "http://localhost:5000/api/auth/change-password-first-time",
        { 
          matkhauMoi: form.newPassword 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Đổi mật khẩu thành công!");
      navigate("/login-success");
    } catch (error) {
      console.error("Lỗi:", error);
      const msg = error.response?.data?.message || "Lỗi kết nối đến máy chủ!";
      alert(msg);
    }
  };

  return (
    <AuthLayout title="ĐỔI MẬT KHẨU LẦN ĐẦU">
      <div className="text-center mb-6">
        <p className="text-gray-400">Bạn đang đổi mật khẩu cho</p>
        <p className="text-white font-semibold text-lg mt-1">{cccd}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Mật khẩu mới */}
        <div>
          <label className="text-gray-300 block mb-1">Mật khẩu mới *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="password"
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-10 py-2 rounded bg-[#0f1a26] border border-gray-600 
              focus:ring-1 focus:ring-[#ff5252] outline-none"
            />
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label className="text-gray-300 block mb-1">Xác nhận mật khẩu *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu mới"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-10 py-2 rounded bg-[#0f1a26] border border-gray-600 
              focus:ring-1 focus:ring-[#ff5252] outline-none"
            />
          </div>
        </div>

        {/* Gợi ý */}
        <p className="text-gray-500 text-sm mt-2">
          Mật khẩu nên chứa ít nhất một chữ hoa, số và ký tự đặc biệt để tăng bảo mật.
        </p>

        {/* Nút xác nhận */}
        <button
          type="submit"
          className="w-full py-2 bg-[#ff5252] hover:bg-[#e04848] rounded font-semibold transition"
        >
          Xác nhận thay đổi
        </button>
      </form>
    </AuthLayout>
  );
}
