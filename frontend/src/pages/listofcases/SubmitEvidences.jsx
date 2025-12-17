import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubmitEvidences() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    loaichungcu: "hình ảnh",
    mota: "",
    file: null, 
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.file) return alert("Vui lòng chọn tệp đính kèm!");

    const formData = new FormData();
    formData.append("id_vuan", id);
    formData.append("loaichungcu", form.loaichungcu);
    formData.append("mota", form.mota);
    formData.append("file", form.file);
    
    if (user.id) {
        formData.append("id_nguoidan", user.id);
    }

    try {
        const res = await axios.post("http://localhost:5000/api/evidence/submit", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        
        alert(" " + res.data.message);
        navigate("/cases"); 

    } catch (error) {
        console.error(error);
        alert(" Lỗi: " + (error.response?.data?.message || "Gửi thất bại"));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <Link to="/cases" className="text-gray-500 hover:text-blue-600 mb-4 inline-flex items-center gap-2 transition">
          ← Quay lại danh sách vụ án
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center uppercase">
            Gửi chứng cứ hỗ trợ điều tra
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Mã vụ án: <span className="font-mono font-bold text-blue-600">{id}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Loại chứng cứ */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Loại chứng cứ</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.loaichungcu}
                onChange={(e) => setForm({ ...form, loaichungcu: e.target.value })}
                required
              >
                <option value="hình ảnh">Hình ảnh (Ảnh chụp hiện trường, đối tượng...)</option>
                <option value="video">Video (Camera hành trình, CCTV...)</option>
                <option value="tài liệu">Tài liệu (Văn bản, file ghi âm...)</option>
                <option value="khác">Khác</option>
              </select>
            </div>

            {/* Mô tả */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Mô tả chi tiết</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Mô tả nội dung chứng cứ, thời gian, địa điểm thu thập được..."
                value={form.mota}
                onChange={(e) => setForm({ ...form, mota: e.target.value })}
                required
              ></textarea>
            </div>

            {/* Upload File */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Tệp đính kèm</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition bg-gray-50">
                  <input
                    type="file"
                    className="w-full h-full opacity-0 absolute cursor-pointer" // Hack để click vào vùng div
                    id="fileUpload"
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer block">
                      {form.file ? (
                          <span className="text-green-600 font-medium">📄 Đã chọn: {form.file.name}</span>
                      ) : (
                          <span className="text-gray-500">Nhấn để chọn file (Ảnh, Video, Zip...)</span>
                      )}
                  </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
            >
              Gửi chứng cứ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}