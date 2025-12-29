import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubmitEvidences() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    loaichungcu: "hình ảnh",
    mota: "",
    files: [], 
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        setForm({ ...form, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.files.length === 0) return alert("Vui lòng chọn ít nhất một tệp đính kèm!");

    const formData = new FormData();
    formData.append("id_vuan", id);
    formData.append("loaichungcu", form.loaichungcu);
    formData.append("mota", form.mota);
    
    form.files.forEach((file) => {
        formData.append("files", file); 
    });
    
    if (user.id) {
        formData.append("id_nguoidan", user.id);
    }

    try {
        const res = await axios.post("http://localhost:5000/api/evidence/submit", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        
        alert("✅ " + res.data.message);
        navigate("/cases"); 

    } catch (error) {
        console.error(error);
        alert("❌ Lỗi: " + (error.response?.data?.message || "Gửi thất bại"));
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

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                  Tệp đính kèm (Chọn nhiều file)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition bg-gray-50 relative">
                  <input
                    type="file"
                    multiple
                    className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                    id="fileUpload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer block">
                      {form.files.length > 0 ? (
                          <div className="text-left">
                              <p className="text-green-600 font-bold mb-2">
                                  ✅ Đã chọn {form.files.length} tệp:
                              </p>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                  {form.files.map((file, index) => (
                                      <li key={index} className="truncate">{file.name}</li>
                                  ))}
                              </ul>
                          </div>
                      ) : (
                          <span className="text-gray-500">
                              Nhấn để chọn file (Giữ <strong>Ctrl</strong> để chọn nhiều ảnh/video)
                          </span>
                      )}
                  </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
            >
              Gửi tất cả chứng cứ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}