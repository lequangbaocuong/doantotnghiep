import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth_layout.jsx";
// import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({ cccd: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const res = await axios.post("http://localhost:5000/user/login", user);
      alert("Đăng nhập thành công!");
      //localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <AuthLayout title="ĐĂNG NHẬP HỆ THỐNG">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="cccd"
          placeholder="CCCD"
          value={user.cccd}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={user.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#0f1a26] border border-gray-600 focus:ring-1 focus:ring-[#ff5252] outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#ff5252] hover:bg-[#e04848] rounded font-semibold transition"
        >
          Đăng nhập
        </button>
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-[#ff5252] hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
