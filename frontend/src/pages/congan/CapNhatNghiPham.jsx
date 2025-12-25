import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, User, Upload, RefreshCcw } from "lucide-react";
import axios from "axios";

export default function CapNhatNghiPham() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    hoten: "",
    gioitinh: "nam",
    ngaysinh: "",
    cccd: "",
    tinhtrangbatgiu: "",
    diachi: "",
    anh: null 
  });

  const [oldImage, setOldImage] = useState("");

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `http://localhost:5000${path}`;
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/suspects/${id}`)
      .then(res => {
        const data = res.data;
        setFormData({
            hoten: data.hoten || "",
            gioitinh: data.gioitinh || "nam",
            ngaysinh: data.ngaysinh ? (data.ngaysinh.length > 10 ? data.ngaysinh.split('T')[0] : data.ngaysinh) : "",
            cccd: data.cccd || "",
            tinhtrangbatgiu: data.tinhtrangbatgiu || "đang bắt giữ",
            diachi: data.diachi || "",
            anh: null
        });
        setOldImage(data.anh);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Không tìm thấy nghi phạm!");
        navigate(-1);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "anh" && files && files[0]) {
        setFormData({ ...formData, anh: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append("hoten", formData.hoten);
      submitData.append("gioitinh", formData.gioitinh);
      submitData.append("ngaysinh", formData.ngaysinh);
      submitData.append("cccd", formData.cccd);
      submitData.append("tinhtrangbatgiu", formData.tinhtrangbatgiu);
      submitData.append("diachi", formData.diachi);
      
      if (formData.anh) {
          submitData.append("anh", formData.anh);
      }

      const res = await axios.put(`http://localhost:5000/api/suspects/update/${id}`, submitData, {
         headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✅ " + res.data.message);
      navigate(`/congan/nghipham/${id}`);
    } catch (error) {
      console.error(error);
      alert("❌ Lỗi: " + (error.response?.data?.message || "Không thể cập nhật"));
    }
  };

  if (loading) return <div className="p-10 text-white">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Hủy bỏ & Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-[#4ECDC4] uppercase flex items-center justify-center gap-3">
        <RefreshCcw /> Cập nhật thông tin nghi phạm
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1b2838] p-8 rounded-2xl shadow-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#4ECDC4] flex items-center gap-2">
                <User /> Thông tin nghi phạm
            </h3>
            
            <div>
              <label className="block text-gray-400 mb-1">Họ và tên *</label>
              <input name="hoten" value={formData.hoten} required onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white focus:border-[#4ECDC4] outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-400 mb-1">Giới tính</label>
                    <select name="gioitinh" value={formData.gioitinh} onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white">
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Ngày sinh / Năm sinh</label>
                    <input 
                        type="text" 
                        name="ngaysinh" 
                        value={formData.ngaysinh}
                        onChange={handleChange} 
                        className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500" 
                        placeholder="VD: 1990" 
                    />
                </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Số CCCD/CMND</label>
              <input name="cccd" value={formData.cccd} onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white" />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Địa chỉ thường trú</label>
              <input name="diachi" value={formData.diachi} onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-lg font-semibold text-[#FF6B6B] flex items-center gap-2">
                <Upload /> Hồ sơ pháp lý & Ảnh
            </h3>

             <div>
                <label className="block text-gray-400 mb-1">Tình trạng hiện tại</label>
                <select name="tinhtrangbatgiu" value={formData.tinhtrangbatgiu} onChange={handleChange} className="w-full bg-[#162436] border border-gray-600 rounded px-3 py-2 text-white">
                    <option value="đang bắt giữ">Đang bắt giữ</option>
                    <option value="đã bắt giữ">Đã bắt giữ (Có lệnh)</option>
                    <option value="truy nã">Đang truy nã</option>
                    <option value="tại ngoại">Được tại ngoại</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-400 mb-2">Ảnh nghi phạm (Nhấn để thay đổi)</label>
                
                <div className="flex gap-4 items-start">
                    <div className="w-[120px] aspect-[3/4] bg-[#0f1a26] rounded-lg overflow-hidden border border-gray-600 relative">
                        {formData.anh ? (
                            <img src={URL.createObjectURL(formData.anh)} alt="New" className="w-full h-full object-cover" />
                        ) : (
                            <img 
                                src={oldImage ? getImageUrl(oldImage) : "https://via.placeholder.com/150?text=No+Img"} 
                                alt="Old" 
                                className="w-full h-full object-cover opacity-80" 
                            />
                        )}
                        {formData.anh && <div className="absolute top-0 right-0 bg-green-600 text-[10px] px-1 text-white">MỚI</div>}
                    </div>

                    <div className="flex-1">
                        <label className="cursor-pointer bg-[#2e4a68] hover:bg-[#3d5e82] text-white px-4 py-2 rounded text-sm inline-flex items-center gap-2 transition">
                            <Upload size={16} /> Chọn ảnh mới
                            <input type="file" name="anh" onChange={handleChange} className="hidden" accept="image/*" />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                            *Chỉ chọn nếu muốn thay đổi ảnh hiện tại.
                        </p>
                        {formData.anh && <p className="text-xs text-green-400 mt-1 truncate">Đã chọn: {formData.anh.name}</p>}
                    </div>
                </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
            <button type="submit" className="bg-[#4ECDC4] hover:bg-[#3dbdb4] text-black px-8 py-2 rounded font-bold flex items-center gap-2 transition transform hover:scale-105 shadow-lg shadow-teal-900/50">
                <Save size={18} /> Lưu thay đổi
            </button>
        </div>
      </form>
    </div>
  );
}