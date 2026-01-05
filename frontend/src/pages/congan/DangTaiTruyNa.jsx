import React, { useState, useEffect } from "react";
import { Upload, AlertCircle, Save, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function DangTaiTruyNa() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;  
  };

  const prefillData = location.state?.prefillData || {};

  const [formData, setFormData] = useState({
    hoten: "",
    tuoi: "",
    gioitinh: "",
    toidanh: "",
    mucdo: "ít nghiêm trọng", 
    diachi: "",
    mota: "",
    anh: null, 
  });

  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_canbo"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      alert("Vui lòng đăng nhập trước!");
      navigate("/congan/login");
    }

    if (prefillData.hoten) {
      let age = "";
      if (prefillData.ngaysinh) {
        const birthYear = new Date(prefillData.ngaysinh).getFullYear();
        const currentYear = new Date().getFullYear();
        age = currentYear - birthYear;
      }

      setFormData(prev => ({
        ...prev,
        hoten: prefillData.hoten || "",
        gioitinh: prefillData.gioitinh || "",
        tuoi: age,
        diachi: prefillData.diachi || "",
        mota: prefillData.mota || ""
      }));

      if (prefillData.anh) {
        setExistingImage(prefillData.anh);
      }
    }
  }, [prefillData, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id_canbo) return;

    try {
      const data = new FormData();
      data.append("hoten", formData.hoten);
      data.append("tuoi", formData.tuoi);
      data.append("gioitinh", formData.gioitinh);
      data.append("toidanh", formData.toidanh);
      data.append("mucdo", formData.mucdo);
      data.append("diachi", formData.diachi);
      data.append("mota", formData.mota);
      data.append("id_canbo", user.id_canbo);
      
      if (formData.anh) {
        data.append("anh", formData.anh);
      } 
   
      else if (existingImage) {
        data.append("anh_hien_co", existingImage); 
      }

      const res = await axios.post("http://localhost:5000/api/wanted/create", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(" " + res.data.message);
      navigate("/congan/");

    } catch (error) {
      console.error(error);
      alert(" Lỗi: " + (error.response?.data?.message || "Không thể đăng tải"));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252] uppercase">
        Đăng tải thông tin truy nã tội phạm
      </h1>

      <div className="max-w-3xl mx-auto bg-[#1b2838] p-8 rounded-2xl shadow-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1">Họ và tên nghi phạm *</label>
            <input
              type="text"
              name="hoten"
              value={formData.hoten}
              onChange={handleChange}
              required
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Tuổi</label>
              <input
                type="number"
                name="tuoi"
                value={formData.tuoi}
                onChange={handleChange}
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Giới tính</label>
              <select
                name="gioitinh"
                value={formData.gioitinh}
                onChange={handleChange}
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                <option value="khác">Khác</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Tội danh *</label>
            <input
              type="text"
              name="toidanh"
              value={formData.toidanh}
              onChange={handleChange}
              required
              placeholder="Ví dụ: Giết người, Cướp tài sản..."
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Mức độ nghiêm trọng *</label>
            <select
              name="mucdo"
              value={formData.mucdo}
              onChange={handleChange}
              required
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white"
            >
              <option value="ít nghiêm trọng">Ít nghiêm trọng</option>
              <option value="nghiêm trọng">Nghiêm trọng</option>
              <option value="rất nghiêm trọng">Rất nghiêm trọng</option>
              <option value="đặc biệt nghiêm trọng">Đặc biệt nghiêm trọng</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Địa chỉ thường trú / Nơi lẩn trốn</label>
            <input
              type="text"
              name="diachi"
              value={formData.diachi}
              onChange={handleChange}
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Đặc điểm nhận dạng *</label>
            <textarea
              name="mota"
              value={formData.mota}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Ảnh đối tượng</label>

            {existingImage && !formData.anh && (
                <div className="mb-3 flex items-center gap-4 bg-[#162436] p-3 rounded border border-gray-600">
                    <img src={getImageUrl(existingImage)} alt="old" className="w-16 h-16 object-cover rounded" />
                    <div>
                        <p className="text-sm text-green-400">Đang sử dụng ảnh từ hồ sơ nghi phạm</p>
                        <p className="text-xs text-gray-500">Tải lên ảnh mới bên dưới để thay thế</p>
                    </div>
                </div>
            )}

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 bg-[#162436] py-8 rounded-lg cursor-pointer hover:border-[#ff5252] transition">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-gray-400">Nhấn để tải lên ảnh mới (nếu có)</p>
              <input
                type="file"
                name="anh"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {formData.anh && (
              <p className="mt-2 text-sm text-[#4ECDC4]">✅ Đã chọn file mới: {formData.anh.name}</p>
            )}
          </div>

          <div className="flex items-start gap-2 bg-[#202f43] border border-[#ff5252]/50 p-4 rounded-lg">
            <AlertCircle className="text-[#ff5252] w-6 h-6 flex-shrink-0" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Thông tin sẽ được gửi đến <span className="text-[#ff5252]">Thủ trưởng đơn vị</span> phê duyệt.
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-700">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#ff5252] hover:bg-[#e04848] px-6 py-3 rounded-md font-semibold transition shadow-lg shadow-red-900/20"
            >
              <Save size={20} /> Đăng tải thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}