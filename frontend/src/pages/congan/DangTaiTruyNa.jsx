import React, { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";

export default function DangTaiTruyNa() {
  const [formData, setFormData] = useState({
    hoten: "",
    tuoi: "",
    gioitinh: "",
    tomtattoi: "",
    mucdognguyhiem: "",
    diachi: "",
    mota: "",
    anh: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin truy nã:", formData);
    alert("Đăng tải thông tin truy nã thành công!");
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252] uppercase">
        Đăng tải thông tin truy nã tội phạm
      </h1>

      <div className="max-w-3xl mx-auto bg-[#1b2838] p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Họ tên */}
          <div>
            <label className="block text-gray-300 mb-1">Họ và tên nghi phạm *</label>
            <input
              type="text"
              name="hoten"
              value={formData.hoten}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên..."
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          {/* Tuổi và giới tính */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Tuổi</label>
              <input
                type="number"
                name="tuoi"
                value={formData.tuoi}
                onChange={handleChange}
                placeholder="Ví dụ: 35"
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
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Tội danh */}
          <div>
            <label className="block text-gray-300 mb-1">Tội danh *</label>
            <input
              type="text"
              name="tomtattoi"
              value={formData.tomtattoi}
              onChange={handleChange}
              required
              placeholder="Ví dụ: Trộm cắp tài sản, Giết người..."
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          {/* Mức độ nguy hiểm */}
          <div>
            <label className="block text-gray-300 mb-1">Mức độ nguy hiểm *</label>
            <select
              name="mucdognguyhiem"
              value={formData.mucdognguyhiem}
              onChange={handleChange}
              required
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            >
              <option value="">-- Chọn mức độ --</option>
              <option value="Nguy hiểm">Nguy hiểm</option>
              <option value="Đặc biệt nguy hiểm">Đặc biệt nguy hiểm</option>
              <option value="Ít nguy hiểm">Ít nguy hiểm</option>
            </select>
          </div>

          {/* Địa chỉ nghi phạm */}
          <div>
            <label className="block text-gray-300 mb-1">Địa chỉ cư trú / Nơi thường lui tới</label>
            <input
              type="text"
              name="diachi"
              value={formData.diachi}
              onChange={handleChange}
              placeholder="Nhập địa chỉ..."
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-gray-300 mb-1">Đặc điểm nhận dạng / Mô tả thêm *</label>
            <textarea
              name="mota"
              value={formData.mota}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Ví dụ: Cao 1m75, tóc ngắn, có hình xăm ở tay phải..."
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            ></textarea>
          </div>

          {/* Ảnh nghi phạm */}
          <div>
            <label className="block text-gray-300 mb-2">Ảnh nghi phạm *</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 bg-[#162436] py-8 rounded-lg cursor-pointer hover:border-[#ff5252] transition">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-gray-400">Nhấn để chọn ảnh (JPG, PNG...)</p>
              <input
                type="file"
                name="anh"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
            {formData.anh && (
              <p className="mt-2 text-sm text-gray-400">
                📁 {formData.anh.name}
              </p>
            )}
          </div>

          {/* Cảnh báo */}
          <div className="flex items-start gap-2 bg-[#202f43] border border-[#ff5252]/50 p-4 rounded-lg">
            <AlertCircle className="text-[#ff5252] w-6 h-6" />
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>Lưu ý:</strong> Thông tin đăng tải sẽ được gửi đến hệ thống
              trung tâm và cần được <span className="text-[#ff5252]">Thủ trưởng đơn vị phê duyệt</span>{" "}
              trước khi công khai.
            </p>
          </div>

          {/* Nút gửi */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#ff5252] hover:bg-[#e04848] px-6 py-3 rounded-md font-semibold transition"
            >
              Đăng tải thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
