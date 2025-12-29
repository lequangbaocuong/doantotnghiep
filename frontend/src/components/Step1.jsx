import React, { useState, useEffect } from "react";

export default function ReportStep1({ nextStep, updateFormData, data, userProfile }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    if (userProfile) {
      setForm(prev => ({
        ...prev,
        fullname: userProfile.hoten,
        email: userProfile.email,
        phone: userProfile.sodienthoai,
        cccd: userProfile.cccd,
        address: userProfile.diachi,
        gender: userProfile.gioitinh
      }));
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.relation) return alert("Vui lòng chọn vai trò người báo tin!");
    
    // Kiểm tra: Nếu chọn gửi hộ mà quên nhập tên nạn nhân
    if (form.relation === 'đại diện' && !form.tenNanNhan) {
        return alert("Vui lòng nhập họ tên của người bị hại!");
    }
    
    updateFormData(form);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">THÔNG TIN NGƯỜI BÁO TIN</h2>
      
      {/* --- FORM NGƯỜI GỬI (READ-ONLY) --- */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-xs text-blue-600 mb-3 font-semibold">
              ℹ️ Thông tin người gửi được lấy từ tài khoản đăng nhập.
          </p>
          <div className="grid grid-cols-2 gap-4 opacity-80">
            <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">Họ và tên</label>
                <input disabled name="fullname" value={form.fullname} className="border p-2 rounded w-full bg-white text-gray-700 cursor-not-allowed font-medium" />
            </div>
            <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">Số điện thoại</label>
                <input disabled name="phone" value={form.phone} className="border p-2 rounded w-full bg-white text-gray-700 cursor-not-allowed font-medium" />
            </div>
             {/* Các trường khác giữ nguyên disabled ... */}
             <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                <input disabled name="email" value={form.email} className="border p-2 rounded w-full bg-white text-gray-700 cursor-not-allowed" />
            </div>
            <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">CCCD</label>
                <input disabled name="cccd" value={form.cccd} className="border p-2 rounded w-full bg-white text-gray-700 cursor-not-allowed" />
            </div>
            <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Địa chỉ</label>
                <input disabled name="address" value={form.address} className="border p-2 rounded w-full bg-white text-gray-700 cursor-not-allowed" />
            </div>
          </div>
      </div>

      <hr className="my-6 border-gray-300"/>

      {/* --- CHỌN VAI TRÒ --- */}
      <div className="mt-4">
        <label className="block font-bold text-lg mb-2 text-blue-800">Vai trò của bạn trong vụ việc?</label>
        <select name="relation" value={form.relation} onChange={handleChange} className="border-2 border-blue-500 p-2 rounded w-full font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option value="">-- Vui lòng chọn --</option>
          <option value="nạn nhân">Tôi là nạn nhân (Người bị hại)</option>
          <option value="đại diện">Tôi báo án giùm người khác (Gửi hộ)</option>
          <option value="nhân chứng">Tôi là nhân chứng</option>
        </select>
      </div>

      {/* --- FORM NHẬP THÔNG TIN NẠN NHÂN (GỬI HỘ) --- */}
      {form.relation === 'đại diện' && (
        <div className="mt-6 bg-yellow-50 p-5 rounded border border-yellow-200 animate-fade-in shadow-sm">
            <h3 className="font-bold text-yellow-800 mb-4 border-b border-yellow-200 pb-2 flex items-center gap-2">
                🚑 THÔNG TIN NGƯỜI BỊ HẠI (Người được báo hộ)
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Họ tên nạn nhân <span className="text-red-500">*</span></label>
                    <input name="tenNanNhan" value={form.tenNanNhan || ""} onChange={handleChange} placeholder="Nhập tên người bị hại" className="border p-2 rounded w-full bg-white focus:border-yellow-500 outline-none"/>
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">SĐT nạn nhân</label>
                    <input name="sdtNanNhan" value={form.sdtNanNhan || ""} onChange={handleChange} placeholder="SĐT liên hệ (nếu có)" className="border p-2 rounded w-full bg-white focus:border-yellow-500 outline-none"/>
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Giới tính</label>
                     <select name="gioitinhNanNhan" value={form.gioitinhNanNhan || "khác"} onChange={handleChange} className="border p-2 rounded w-full bg-white focus:border-yellow-500 outline-none">
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                    </select>
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Tình trạng sức khỏe</label>
                     <select name="tinhtrangNanNhan" value={form.tinhtrangNanNhan || "còn sống"} onChange={handleChange} className="border p-2 rounded w-full bg-white border-red-200 text-red-700 font-medium">
                        <option value="còn sống">Bình thường / Còn sống</option>
                        <option value="bị thương">Bị thương (Cần y tế)</option>
                        <option value="mất tích">Mất tích</option>
                        <option value="đã chết">Đã chết</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Địa chỉ nạn nhân</label>
                    <input name="diachiNanNhan" value={form.diachiNanNhan || ""} onChange={handleChange} placeholder="Nơi ở hiện tại của nạn nhân" className="border p-2 rounded w-full bg-white focus:border-yellow-500 outline-none"/>
                </div>
            </div>
        </div>
      )}

      {/* --- TÌNH TRẠNG NẾU TỰ BÁO --- */}
      {form.relation === 'nạn nhân' && (
        <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-100 animate-fade-in">
            <label className="block font-medium mb-2 text-blue-800">Tình trạng hiện tại của bạn</label>
            <select name="tinhtrangNanNhan" value={form.tinhtrangNanNhan || "còn sống"} onChange={handleChange} className="border p-2 rounded w-full focus:ring-blue-500">
                <option value="còn sống">Bình thường</option>
                <option value="bị thương">Bị thương (Cần hỗ trợ y tế)</option>
            </select>
        </div>
      )}

      {/* Checkbox ẩn danh giữ nguyên */}
      <div className="mt-6">
        <label className="inline-flex items-center cursor-pointer select-none group">
          <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} className="mr-2 w-5 h-5 accent-gray-600" />
          <span className="font-medium group-hover:text-gray-800 transition">Gửi ẩn danh</span>
        </label>
      </div>

      <div className="mt-6 text-right">
        <button onClick={handleNext} className="bg-red-600 text-white px-8 py-2 rounded font-bold shadow-lg hover:bg-red-700 transition transform hover:scale-105">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}