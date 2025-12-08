import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, User, Upload } from "lucide-react";
import axios from "axios";

export default function ThemNghiPham() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { id_vuan, tenvuan } = location.state || {};

  const [formData, setFormData] = useState({
    hoten: "",
    gioitinh: "nam",
    ngaysinh: "",
    cccd: "",
    tinhtrangbatgiu: "đang bắt giữ",
    diachi: "",
    anh: null
  });

  useEffect(() => {
    if (!id_vuan) {
      alert("Chưa chọn vụ án! Vui lòng quay lại danh sách.");
      navigate("/congan/caselists");
    }
  }, [id_vuan, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("id_vuan", id_vuan); 
      data.append("hoten", formData.hoten);
      data.append("gioitinh", formData.gioitinh);
      data.append("ngaysinh", formData.ngaysinh);
      data.append("cccd", formData.cccd);
      data.append("tinhtrangbatgiu", formData.tinhtrangbatgiu);
      data.append("diachi", formData.diachi);
      if (formData.anh) data.append("anh", formData.anh);

      const res = await axios.post("http://localhost:5000/api/suspects/add", data, {
         headers: { "Content-Type": "multipart/form-data" }
      });

      alert(" " + res.data.message);
      navigate("navigate(`/congan/chitietvuan/${id_vuan}`);"); 
    } catch (error) {
      console.error(error);
      alert("Lỗi: " + (error.response?.data?.message || "Không thể thêm nghi phạm"));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-2 text-center text-[#ff5252] uppercase">
        Thêm nghi phạm vào hồ sơ
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Vụ án: <span className="text-white font-semibold">{tenvuan}</span> (Mã: {id_vuan})
      </p>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1b2838] p-8 rounded-2xl shadow-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Cột Trái: Thông tin cá nhân */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#4ECDC4] flex items-center gap-2">
                <User /> Thông tin cá nhân
            </h3>
            
            <div>
              <label className="block text-gray-400 mb-1">Họ và tên *</label>
              <input name="hoten" required onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white" placeholder="Nhập họ tên nghi phạm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-400 mb-1">Giới tính</label>
                    <select name="gioitinh" onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white">
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Ngày sinh</label>
                    <input type="date" name="ngaysinh" onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white" />
                </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Số CCCD/CMND</label>
              <input name="cccd" onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white" placeholder="Nhập số CCCD" />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Địa chỉ thường trú</label>
              <input name="diachi" onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white" placeholder="Địa chỉ..." />
            </div>
          </div>

          {/* Cột Phải: Tình trạng & Ảnh */}
          <div className="space-y-4">
             <h3 className="text-lg font-semibold text-[#FF6B6B] flex items-center gap-2">
                <Upload /> Hồ sơ pháp lý
            </h3>

             <div>
                <label className="block text-gray-400 mb-1">Tình trạng hiện tại</label>
                <select name="tinhtrangbatgiu" onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white">
                    <option value="đang bắt giữ">Đang bắt giữ</option>
                    <option value="đã bắt giữ">Đã bắt giữ (Đã có lệnh)</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-400 mb-2">Ảnh nghi phạm</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 bg-[#0f1a26] h-40 rounded-lg cursor-pointer hover:border-[#ff5252]">
                    <span className="text-gray-500 text-sm">Chọn ảnh chân dung...</span>
                    <input type="file" name="anh" onChange={handleChange} className="hidden" accept="image/*" />
                </label>
                {formData.anh && <p className="text-xs text-green-400 mt-2">Đã chọn: {formData.anh.name}</p>}
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
            <button type="submit" className="bg-[#ff5252] hover:bg-red-600 text-white px-6 py-2 rounded font-bold flex items-center gap-2">
                <Save size={18} /> Lưu hồ sơ nghi phạm
            </button>
        </div>
      </form>
    </div>
  );
}