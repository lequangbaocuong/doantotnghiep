import React, { useState } from "react";
import axios from "axios";

export default function LoginCanBo() {
  const [form, setForm] = useState({ email: "", matkhau: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/canbo/login", form);

      localStorage.setItem("token_canbo", res.data.token);
      localStorage.setItem("user_canbo", JSON.stringify(res.data.user)); 
      alert("Đăng nhập thành công!");

     
      const user = res.data.user;
      
      
      if (user.id_vaitro === 'VT002') { 
          window.location.href = "/thutruong";
      } else {
          window.location.href = "/congan";
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-start items-center"
      style={{
        backgroundImage: "url('/public/bg-danang.png')"
      }}
    >
      {/* Logo + Header */}
      <div className="w-full bg-[#003c71] bg-opacity-90 py-4 shadow text-white flex items-center justify-center gap-4">
        <img src="/public/logo-1.png" className="h-14" alt="logo" />
        <div className="text-left">
          <p className="font-semibold text-sm">HỆ THỐNG THÔNG TIN CHÍNH QUYỀN ĐIỆN TỬ</p>
          <h1 className="text-lg font-bold">CỔNG ĐĂNG NHẬP CÁN BỘ CÔNG AN</h1>
        </div>
      </div>

      {/* Form */}
      <div className="mt-10 bg-white w-[380px] rounded-lg shadow-xl p-6">
        <h2 className="text-center text-lg font-bold text-gray-700 mb-4">
          NHẬP THÔNG TIN CỦA BẠN
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex items-center border rounded px-3 py-2 gap-2 bg-gray-50">
            <span className="text-gray-500">📄</span>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded px-3 py-2 gap-2 bg-gray-50">
            <span className="text-gray-500">🔒</span>
            <input
              type="password"
              name="matkhau"
              placeholder="Mật khẩu"
              value={form.matkhau}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            <p>Ghi nhớ tài khoản</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white font-semibold py-2 rounded transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a> |
          <a href="#" className="text-blue-500 hover:underline ml-1">Hỗ trợ</a>
        </div>
      </div>
    </div>
  );
}
