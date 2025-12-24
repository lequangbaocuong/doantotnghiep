import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, X, Shield, KeyRound, RotateCcw } from "lucide-react";

export default function EditAccount({ user, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [resetMode, setResetMode] = useState(false);
  
  const [form, setForm] = useState({
    hoten: "",
    email: "",
    cccd: "",
    sodienthoai: "",
    diachi: "",
    gioitinh: "khác",
    ngaysinh: "",
    id_vaitro: "",
    matkhau: ""
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/roles");
        setRoles(res.data);
      } catch (e) { console.error("Lỗi lấy roles"); }
    };
    fetchRoles();

    if (user) {
      setForm({
        hoten: user.hoten || "",
        email: user.email || "",
        cccd: user.cccd || "",
        sodienthoai: user.sodienthoai || "",
        diachi: user.diachi || "",
        gioitinh: user.gioitinh || "khác",
        ngaysinh: user.ngaysinh ? user.ngaysinh.split('T')[0] : "", 
        id_vaitro: user.id_vaitro || "",
        matkhau: ""
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        !form.hoten.trim() || 
        !form.cccd.trim() || 
        !form.email.trim() || 
        !form.sodienthoai.trim() || 
        !form.id_vaitro 
    ) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return; 
    }
    setLoading(true);

    const dataToSend = { ...form };
    if (!resetMode || !form.matkhau) delete dataToSend.matkhau;

    try {
      await axios.put(`http://localhost:5000/api/admin/users/canbo/${user.id}`, dataToSend);
      alert("✅ Cập nhật thông tin cán bộ thành công!");
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
      <div className="bg-[#1b2838] w-full max-w-3xl rounded-xl border border-gray-600 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-[#162436]">
          <h2 className="text-xl font-bold text-[#4ECDC4] uppercase flex items-center gap-2">
            <Shield /> Hồ sơ chi tiết cán bộ
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="md:col-span-2">
                 <label className="text-gray-500 text-xs uppercase font-bold block mb-1">Mã cán bộ</label>
                 <input disabled value={user.id} className="w-full bg-[#162436] border border-gray-700 rounded p-2 text-gray-400 font-mono" />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.hoten} onChange={e => setForm({...form, hoten: e.target.value})} />
            </div>  

            <div>
              <label className="text-gray-400 text-sm block mb-1">CCCD / CMND <span className="text-red-500">*</span></label>
              <input required maxLength={12} className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.cccd} onChange={e => setForm({...form, cccd: e.target.value})} />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Email <span className="text-red-500">*</span></label>
              <input required type="email" className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Số điện thoại <span className="text-red-500">*</span></label>
              <input required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.sodienthoai} onChange={e => setForm({...form, sodienthoai: e.target.value})} />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Chức vụ / Vai trò <span className="text-red-500">*</span></label>
              <select required className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.id_vaitro} onChange={e => setForm({...form, id_vaitro: e.target.value})}>
                    <option value="">-- Chọn chức vụ --</option>
                    {roles.map(r => (
                        <option key={r.id_vaitro} value={r.id_vaitro}>{r.mota}</option>
                    ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Ngày sinh  <span className="text-red-500">*</span> </label>
              <input type="date" className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.ngaysinh} onChange={e => setForm({...form, ngaysinh: e.target.value})} />
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

            <div>
              <label className="text-gray-400 text-sm block mb-1">Địa chỉ</label>
              <input className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                value={form.diachi} onChange={e => setForm({...form, diachi: e.target.value})} />
            </div>

            <div className="md:col-span-2 border-t border-gray-700 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                    <input type="checkbox" id="resetPass" checked={resetMode} 
                        onChange={(e) => setResetMode(e.target.checked)} className="w-4 h-4 accent-[#4ECDC4]"/>
                    <label htmlFor="resetPass" className="text-[#4ECDC4] font-bold text-sm cursor-pointer select-none flex items-center gap-2">
                        <KeyRound size={16}/> Đặt lại mật khẩu đăng nhập?
                    </label>
                </div>
                {resetMode && (
                    <div className="animate-fade-in bg-[#243447] p-3 rounded border border-gray-600 flex gap-2">
                        <input type="text" className="flex-1 bg-[#0f1a26] border border-gray-500 rounded p-2 text-white focus:border-[#4ECDC4] outline-none"
                            placeholder="Nhập mật khẩu mới..." value={form.matkhau} onChange={e => setForm({...form, matkhau: e.target.value})} />
                        <button type="button" onClick={() => setForm({...form, matkhau: "123456"})}
                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded text-xs flex items-center gap-1">
                            <RotateCcw size={14}/> Mặc định
                        </button>
                    </div>
                )}
            </div>

          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-700">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition text-white">Hủy bỏ</button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded bg-[#4ECDC4] text-black font-bold hover:bg-[#3dbdb4] transition flex items-center gap-2">
              {loading ? "Đang lưu..." : <><Save size={18}/> Lưu thay đổi</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}