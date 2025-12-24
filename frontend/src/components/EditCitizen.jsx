import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, X, UserCog } from "lucide-react";

export default function EditCitizen({ user, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    hoten: "",
    cccd: "",
    email: "",
    sodienthoai: "",
    diachi: "",
    gioitinh: "khác"
  });

  useEffect(() => {
    if (user) {
      setForm({
        hoten: user.hoten || "",
        cccd: user.cccd || "", 
        email: user.email || "",
        sodienthoai: user.sodienthoai || "",
        diachi: user.diachi || "", 
        gioitinh: user.gioitinh || "khác"
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        !form.hoten.trim() || 
        !form.cccd.trim() || 
        !form.diachi.trim()
    ) {
        alert("⚠️ Vui lòng điền đầy đủ các mục có dấu * màu đỏ!");
        return; 
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/admin/users/nguoidan/${user.id}`, form);
      alert("✅ Đã cập nhật thông tin!");
      onSuccess(); 
      onClose();   
    } catch (error) {
      alert("❌ Lỗi: " + (error.response?.data?.message || "Không thể cập nhật"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-[#1b2838] w-full max-w-2xl rounded-xl border border-gray-600 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#4ECDC4] uppercase flex items-center gap-2">
            <UserCog /> Chỉnh sửa thông tin
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="md:col-span-2">
                <label className="text-gray-500 text-xs uppercase font-bold block mb-1">Id người dân (Không thể sửa)</label>
                <input disabled value={user.id} className="w-full bg-[#162436] border border-gray-700 rounded p-2 text-gray-400 font-mono" />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Họ và tên  <span className="text-red-500">*</span> </label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.hoten} onChange={e => setForm({...form, hoten: e.target.value})} />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">CCCD  <span className="text-red-500">*</span> </label>
              <input required maxLength={12} className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.cccd} onChange={e => setForm({...form, cccd: e.target.value})} />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Email</label>
              <input required type="email" className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            
             <div>
              <label className="text-gray-400 text-sm block mb-1">Số điện thoại</label>
              <input className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.sodienthoai} onChange={e => setForm({...form, sodienthoai: e.target.value})} />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Giới tính</label>
              <select className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.gioitinh} onChange={e => setForm({...form, gioitinh: e.target.value})}>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                    <option value="khác">Khác</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm block mb-1">Địa chỉ  <span className="text-red-500">*</span> </label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.diachi} onChange={e => setForm({...form, diachi: e.target.value})} />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-700 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition text-white">
              Hủy bỏ
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded bg-[#4ECDC4] text-black font-bold hover:bg-[#3dbdb4] transition flex items-center gap-2">
              {loading ? "Đang lưu..." : <><Save size={18}/> Lưu thay đổi</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}