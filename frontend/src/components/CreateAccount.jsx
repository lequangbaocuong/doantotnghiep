import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function CreateAccount({ onClose, onRefresh }) {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ hoten: "", email: "", cccd: "", id_vaitro: "", matkhau: "" });

  useEffect(() => {
      axios.get("http://localhost:5000/api/admin/roles").then(res => setRoles(res.data));
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post("http://localhost:5000/api/admin/users/create", form);
          alert("Tạo tài khoản thành công!");
          onRefresh();
          onClose();
      } catch (e) { alert(e.response?.data?.message || "Lỗi tạo tk"); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1b2838] w-full max-w-md p-6 rounded-xl shadow-2xl relative border border-gray-600">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
        <h2 className="text-xl font-bold text-white mb-6 text-center uppercase">Cấp tài khoản cán bộ</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Họ và tên" className="w-full bg-[#0f1a26] border border-gray-600 p-2 rounded text-white"
                onChange={e => setForm({...form, hoten: e.target.value})} />
            
            <input required type="email" placeholder="Email" className="w-full bg-[#0f1a26] border border-gray-600 p-2 rounded text-white"
                onChange={e => setForm({...form, email: e.target.value})} />

            <input required placeholder="Số CCCD" className="w-full bg-[#0f1a26] border border-gray-600 p-2 rounded text-white"
                onChange={e => setForm({...form, cccd: e.target.value})} />

            <select required className="w-full bg-[#0f1a26] border border-gray-600 p-2 rounded text-white"
                onChange={e => setForm({...form, id_vaitro: e.target.value})} defaultValue=""
            >
                <option value="" disabled>-- Chọn Chức Vụ --</option>
                {roles.map(r => (
                    <option key={r.id_vaitro} value={r.id_vaitro}>{r.mota}</option>
                ))}
            </select>

            <input type="password" placeholder="Mật khẩu (Mặc định: 123456)" className="w-full bg-[#0f1a26] border border-gray-600 p-2 rounded text-white"
                onChange={e => setForm({...form, matkhau: e.target.value})} />

            <button type="submit" className="w-full bg-[#ff5252] hover:bg-red-600 text-white font-bold py-2 rounded mt-4">
                Xác nhận cấp
            </button>
        </form>
      </div>
    </div>
  );
}