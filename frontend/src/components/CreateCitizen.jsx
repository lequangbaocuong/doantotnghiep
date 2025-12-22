import React, { useState } from "react";
import axios from "axios";
import { Save, X, AlertCircle } from "lucide-react";

export default function CreateCitizen({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    hoten: "",
    cccd: "",
    email: "",
    sodienthoai: "",
    diachi: "",
    matkhau: "123456"
  });

  const handleCCCDChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setForm({ ...form, cccd: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.cccd.length !== 12) return alert("⚠️ Số CCCD phải có đúng 12 chữ số!");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/create-citizen", form);
      alert("✅ " + res.data.message);
      onSuccess(); 
      
      onClose();
    } catch (error) {
      alert("❌ Lỗi: " + (error.response?.data?.message || "Không thể tạo tài khoản"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-[#1b2838] w-full max-w-2xl rounded-xl border border-gray-600 shadow-2xl">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#4ECDC4] uppercase">Cấp tài khoản mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.hoten} onChange={e => setForm({...form, hoten: e.target.value})} placeholder="Nguyễn Văn A" />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">CCCD (12 số) <span className="text-red-500">*</span></label>
              <div className="relative">
                <input required className={`w-full bg-[#0f1a26] border rounded p-2 text-white outline-none focus:border-[#4ECDC4] 
                  ${form.cccd.length > 0 && form.cccd.length !== 12 ? 'border-red-500' : 'border-gray-600'}`}
                  value={form.cccd} onChange={handleCCCDChange} maxLength={12} placeholder="Nhập đủ 12 số" />
                <span className="absolute right-2 top-2 text-xs text-gray-500">{form.cccd.length}/12</span>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Email <span className="text-red-500">*</span></label>
              <input required type="email" className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Số điện thoại <span className="text-red-500">*</span></label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.sodienthoai} onChange={e => setForm({...form, sodienthoai: e.target.value})} />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm block mb-1">Địa chỉ</label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.diachi} onChange={e => setForm({...form, diachi: e.target.value})} />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-700 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition text-white">
              Hủy bỏ
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded bg-[#4ECDC4] text-black font-bold hover:bg-[#3dbdb4] transition flex items-center gap-2">
              {loading ? "Đang lưu..." : <><Save size={18}/> Lưu & Cấp</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}