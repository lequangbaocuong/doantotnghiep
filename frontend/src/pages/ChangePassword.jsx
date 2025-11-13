import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth_layout.jsx";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6)
      return alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
    if (form.newPassword !== form.confirmPassword)
      return alert("Xác nhận mật khẩu không khớp!");
    alert("Đổi mật khẩu thành công!");
    navigate("/login-success");
  };

  return (
    <AuthLayout title="ĐỔI MẬT KHẨU MỚI">
      <p className="text-gray-400 mb-4 text-center">
        CCCD: <span className="text-white">{cccd}</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#ff5252] hover:bg-[#e04848] rounded font-semibold transition"
        >
          Xác nhận
        </button>
      </form>
    </AuthLayout>
  );
}
