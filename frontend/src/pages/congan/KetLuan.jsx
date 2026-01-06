import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FileText, Save, ArrowLeft } from "lucide-react";

export default function KetLuan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const id_vuan = state?.id_vuan;
  const tenvuan = state?.tenvuan;

  const [formData, setFormData] = useState({ tomtat: "", dongco: "" });

  const handleSubmit = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user_canbo"));
        await axios.post("http://localhost:5000/api/results/create", {
            ...formData,
            id_vuan,
            nguoibaocao: user?.hoten
        });
        alert("✅ Đã gửi báo cáo kết luận! Chờ thủ trưởng phê duyệt.");
        navigate("/congan/caselists");
    } catch (e) { alert("Lỗi gửi báo cáo: " + e.response?.data?.message); }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
       <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 mb-6"><ArrowLeft/> Quay lại</button>
       <h1 className="text-3xl font-bold text-[#4ECDC4] mb-6 text-center uppercase">Lập kết luận điều tra</h1>
       <p className="text-center text-gray-400 mb-8">Vụ án: <span className="text-white font-bold">{tenvuan}</span> ({id_vuan})</p>

       <div className="max-w-3xl mx-auto bg-[#1b2838] p-8 rounded-xl border border-gray-700 space-y-6">
          <div>
              <label className="block text-gray-300 mb-2 font-bold">1. Tóm tắt diễn biến vụ án</label>
              <textarea rows="6" className="w-full bg-[#0f1a26] border border-gray-600 rounded p-3 text-white"
                value={formData.tomtat} onChange={e => setFormData({...formData, tomtat: e.target.value})}
                placeholder="Mô tả lại toàn bộ quá trình phạm tội, thời gian, địa điểm, hậu quả..."
              ></textarea>
          </div>
          <div>
              <label className="block text-gray-300 mb-2 font-bold">2. Động cơ & Mục đích phạm tội</label>
              <textarea rows="4" className="w-full bg-[#0f1a26] border border-gray-600 rounded p-3 text-white"
                value={formData.dongco} onChange={e => setFormData({...formData, dongco: e.target.value})}
                placeholder="Nguyên nhân dẫn đến hành vi phạm tội..."
              ></textarea>
          </div>
          <button onClick={handleSubmit} className="w-full bg-[#4ECDC4] text-black font-bold py-3 rounded hover:bg-[#3dbdb4] flex justify-center gap-2">
              <Save/> Gửi báo cáo kết thúc
          </button>
       </div>
    </div>
  );
}