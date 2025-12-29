import React, { useState, useEffect } from "react";
import axios from "axios"; 

export default function ReportStep1({ nextStep, updateFormData, data, userProfile }) {
  const [form, setForm] = useState(data);

  const fillForm = (userData) => {
    setForm(prev => ({
      ...prev,
      fullname: userData.hoten || "",
      email: userData.email || "",
      phone: userData.sodienthoai || "",
      cccd: userData.cccd || "",
      address: userData.diachi || "",
      gender: userData.gioitinh || "khác"
    }));
  };

  useEffect(() => {
    if (userProfile) {
      fillForm(userProfile);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data) {
          fillForm(response.data);
        }
      } catch (error) {
        console.error("Không thể tự động lấy thông tin người dùng:", error);
      }
    };

    fetchUserProfile();
  }, [userProfile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.relation) return alert("Vui lòng chọn vai trò người báo tin!");
    
    if (form.relation === 'báo hộ' && !form.tenNanNhan) {
        return alert("Vui lòng nhập họ tên của người bị hại!");
    }
    
    updateFormData(form);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">THÔNG TIN NGƯỜI BÁO TIN</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-center gap-2 text-blue-700 mb-4 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Thông tin người gửi được tự động điền từ tài khoản của bạn.
          </div>
          
          <div className="grid grid-cols-2 gap-4 opacity-100">
            <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                </label>
                <input 
                    name="fullname" 
                    value={form.fullname || ''} 
                    disabled
                    className="border p-2 rounded w-full bg-white text-gray-800 font-bold border-gray-300 shadow-sm" 
                />
            </div>
            
            <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input 
                    name="phone" 
                    value={form.phone || ''} 
                    onChange={handleChange}
                    disabled
                    className="border p-2 rounded w-full bg-white text-gray-800 font-medium border-gray-300 shadow-sm" 
                />
            </div>

            <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                    CCCD/CMND <span className="text-red-500">*</span>
                </label>
                <input 
                    name="cccd" 
                    value={form.cccd || ''} 
                    onChange={handleChange}
                    disabled
                    className="border p-2 rounded w-full bg-white text-gray-800 font-medium border-gray-300 shadow-sm" 
                />
            </div>

             <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input 
                    name="email" 
                    value={form.email || ''} 
                    onChange={handleChange}
                    disabled
                    className="border p-2 rounded w-full bg-white text-gray-700 border-gray-300 shadow-sm" 
                />
            </div>

            <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                    Địa chỉ thường trú <span className="text-red-500">*</span>
                </label>
                <input 
                    name="address" 
                    value={form.address || ''} 
                    onChange={handleChange}
                    disabled
                    className="border p-2 rounded w-full bg-white text-gray-800 font-medium border-gray-300 shadow-sm" 
                />
            </div>
          </div>
      </div>

      <hr className="my-6 border-gray-300"/>

      <div className="mt-4">
        <label className="block font-bold text-lg mb-2 text-blue-800">
            Vai trò của bạn trong vụ việc? <span className="text-red-500">*</span>
        </label>
        <select 
            name="relation" 
            value={form.relation} 
            onChange={handleChange} 
            className="border-2 border-blue-500 p-2 rounded w-full font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">-- Vui lòng chọn --</option>
          <option value="nạn nhân">Tôi là nạn nhân (Người bị hại)</option>
          <option value="báo hộ">Tôi báo án giùm người khác (Gửi hộ)</option>
          <option value="nhân chứng">Tôi là nhân chứng</option>
        </select>
      </div>

      {form.relation === 'báo hộ' && (
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
                    <label className="block text-sm font-medium mb-1">Tình trạng hiện tại <span className="text-red-500">*</span></label>
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

      {form.relation === 'nạn nhân' && (
        <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-100 animate-fade-in">
            <label className="block font-medium mb-2 text-blue-800">Tình trạng hiện tại của bạn <span className="text-red-500">*</span></label>
            <select name="tinhtrangNanNhan" value={form.tinhtrangNanNhan || "còn sống"} onChange={handleChange} className="border p-2 rounded w-full focus:ring-blue-500 font-medium text-gray-700">
                <option value="còn sống">Tôi bình thường / Còn sống</option>
                <option value="bị thương">Tôi đang bị thương (Cần hỗ trợ y tế)</option>
            </select>
        </div>
      )}

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