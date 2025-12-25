import React, { useState, useEffect } from "react";
import { FileText, Plus, Save, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TaoHoSoVuAn() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefillData = location.state?.prefillData || {}; 
  const storedUser = localStorage.getItem("user_canbo");

  const [formData, setFormData] = useState({
    tenvuan: "",
    mota: "",
    ngaytao: new Date().toISOString().split('T')[0], 
    trangthai: "Đang điều tra",
    mucdo: "ít nghiêm trọng", 
    id_togiac: "",
    id_canbo: "",
    nguoitao: storedUser ? JSON.parse(storedUser).hoten : "", 
  });

  useEffect(() => {
    if (prefillData.id_togiac) {
      setFormData(prev => ({
        ...prev,
        id_togiac: prefillData.id_togiac,
        tenvuan: `Vụ án: ${prefillData.tieude}`, 
        mota: prefillData.noidung
      }));
    }
  }, [prefillData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/cases/create", formData);
      
      alert("✅ " + res.data.message);
      navigate("/congan/caselists"); 
      
    } catch (error) {
      console.error("Lỗi:", error);
      alert("❌ Lỗi: " + (error.response?.data?.message || "Không thể tạo hồ sơ"));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252] uppercase">
        Tạo hồ sơ vụ án mới
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-[#1b2838] p-8 rounded-2xl shadow-lg space-y-10 border border-gray-700"
      >
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#4ECDC4]">
            <FileText className="w-5 h-5" /> Thông tin chính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-1">Tên vụ án <span className="text-red-500">*</span> </label>
              <input
                type="text"
                name="tenvuan"
                value={formData.tenvuan}
                onChange={handleChange}
                required
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 focus:ring-1 focus:ring-[#ff5252] outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Ngày tạo <span className="text-red-500">*</span> </label>
              <input
                type="date"
                name="ngaytao"
                value={formData.ngaytao}
                onChange={handleChange}
                required
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 focus:ring-1 focus:ring-[#ff5252] text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Mức độ nghiêm trọng <span className="text-red-500">*</span> </label>
                <select
                  name="mucdo"
                  value={formData.mucdo}
                  onChange={handleChange}
                  className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white"
                >
                  <option value="ít nghiêm trọng">Ít nghiêm trọng</option>
                  <option value="nghiêm trọng">Nghiêm trọng</option>
                  <option value="rất nghiêm trọng">Rất nghiêm trọng</option>
                  <option value="đặc biệt nghiêm trọng">Đặc biệt nghiêm trọng</option>
                </select>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Trạng thái điều tra</label>
              <input
                type="text"
                name="trangthai"
                value={formData.trangthai}
                readOnly
                onChange={handleChange}
                className="w-full bg-[#0f1a26] border border-gray-600 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed"
              />
            </div>
             
             <div>
              <label className="block text-gray-300 mb-1">Mã đơn tố giác gốc</label>
              <input
                type="text"
                name="id_togiac"
                value={formData.id_togiac}
                readOnly 
                className="w-full bg-[#0f1a26] border border-gray-700 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 mb-1">Mô tả vụ án <span className="text-red-500">*</span> </label>
            <textarea
              name="mota"
              value={formData.mota}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 focus:ring-1 focus:ring-[#ff5252] text-white"
            ></textarea>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-gray-300 mb-1">Người tạo hồ sơ</label>
              <input
                type="text"
                name="nguoitao"
                value={formData.nguoitao}
                onChange={handleChange}
                readOnly
                className="w-full bg-[#0f1a26] border border-gray-700 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-6 border-t border-gray-700">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#ff5252] hover:bg-[#e04848] px-6 py-3 rounded-md font-semibold transition text-white shadow-lg shadow-red-900/30"
          >
            <Save className="w-5 h-5" /> Xác nhận tạo hồ sơ
          </button>
        </div>
      </form>
    </div>
  );
}