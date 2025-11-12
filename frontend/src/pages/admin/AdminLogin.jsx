import React, { useState } from "react";
import { Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "123456") {
      navigate("/admin/dashboard");
    } else {
      alert("Sai thông tin đăng nhập!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1a26] text-white">
      <div className="bg-[#1b2838] p-10 rounded-2xl w-[400px] shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-12 h-12 text-[#ff5252]" />
          <h1 className="text-2xl font-bold mt-2">Admin Control Panel</h1>
          <p className="text-sm text-gray-400">Hệ thống quản trị website điều tra</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-300">Tên đăng nhập</label>
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              required
              className="w-full bg-[#162436] px-4 py-2 rounded-md border border-gray-600 focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Mật khẩu</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full bg-[#162436] px-4 py-2 rounded-md border border-gray-600 focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff5252] hover:bg-[#e04848] transition font-semibold py-2 rounded-md"
          >
            <Lock className="inline w-4 h-4 mr-2" />
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
