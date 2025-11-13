import React, { useState } from "react";
import { FileText, Plus, Save } from "lucide-react";

export default function TaoHoSoVuAn() {
  const [formData, setFormData] = useState({
    tenvuan: "",
    mota: "",
    ngaytao: "",
    trangthai: "Đang điều tra",
    mucdo: "Trung bình",
    id_toigiac: "",
    id_nghican: "",
    id_nannhan: "",
    id_canbo: "",
    kehoach: "",
    nhiemvu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu hồ sơ vụ án:", formData);
    alert("✅ Hồ sơ vụ án đã được tạo thành công!");
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252] uppercase">
        Tạo hồ sơ vụ án mới
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-[#1b2838] p-8 rounded-2xl shadow-lg space-y-10"
      >
        {/* PHẦN 1 - THÔNG TIN VỤ ÁN */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#4ECDC4]">
            <FileText className="w-5 h-5" /> Thông tin vụ án
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Tên vụ án *</label>
              <input
                type="text"
                name="tenvuan"
                value={formData.tenvuan}
                onChange={handleChange}
                required
                placeholder="Ví dụ: Trộm cắp xe máy tại An Hải Bắc"
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 focus:ring-1 focus:ring-[#ff5252] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Ngày tạo *</label>
              <input
                type="date"
                name="ngaytao"
                value={formData.ngaytao}
                onChange={handleChange}
                required
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 focus:ring-1 focus:ring-[#ff5252]"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Trạng thái</label>
              <select
                name="trangthai"
                value={formData.trangthai}
                onChange={handleChange}
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              >
                <option value="chưa xử lý">Chưa xử lý</option>
                <option value="đang xử lý">Đang xử lý</option>
                <option value="đã xử lý">Đã xử lý</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Mức độ vụ án</label>
              <select
                name="mucdo"
                value={formData.mucdo}
                onChange={handleChange}
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              >
                <option value="thấp">Thấp</option>
                <option value="trung bình">Trung bình</option>
                <option value="cao">Cao</option>
                <option value="nghiêm trọng">Nghiêm trọng</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 mb-1">Mô tả chi tiết *</label>
            <textarea
              name="mota"
              value={formData.mota}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Mô tả chi tiết diễn biến vụ án..."
              className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2 focus:ring-1 focus:ring-[#ff5252]"
            ></textarea>
          </div>
        </section>

        {/* PHẦN 2 - LIÊN QUAN TỐ GIÁC & ĐỐI TƯỢNG */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#FFA502]">
            <Plus className="w-5 h-5" /> Liên quan & Nhân sự
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Mã tố giác (ID)</label>
              <input
                type="text"
                name="id_toigiac"
                value={formData.id_toigiac}
                onChange={handleChange}
                placeholder="TG001"
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Mã nghi phạm (ID)</label>
              <input
                type="text"
                name="id_nghican"
                value={formData.id_nghican}
                onChange={handleChange}
                placeholder="NC001"
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Mã nạn nhân (ID)</label>
              <input
                type="text"
                name="id_nannhan"
                value={formData.id_nannhan}
                onChange={handleChange}
                placeholder="NN001"
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Cán bộ phụ trách (ID)</label>
              <input
                type="text"
                name="id_canbo"
                value={formData.id_canbo}
                onChange={handleChange}
                placeholder="CBP123"
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              />
            </div>
          </div>
        </section>

        {/* PHẦN 3 - KẾ HOẠCH & NHIỆM VỤ */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#A29BFE]">
            <FileText className="w-5 h-5" /> Kế hoạch & Nhiệm vụ điều tra
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Kế hoạch điều tra</label>
              <textarea
                name="kehoach"
                value={formData.kehoach}
                onChange={handleChange}
                rows="3"
                placeholder="Nhập nội dung kế hoạch điều tra..."
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Nhiệm vụ điều tra cụ thể</label>
              <textarea
                name="nhiemvu"
                value={formData.nhiemvu}
                onChange={handleChange}
                rows="3"
                placeholder="Liệt kê các nhiệm vụ cụ thể (ví dụ: thu thập chứng cứ, truy xét đối tượng...)"
                className="w-full bg-[#162436] border border-gray-600 rounded-md px-4 py-2"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Nút lưu */}
        <div className="flex justify-end pt-6 border-t border-gray-700">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#ff5252] hover:bg-[#e04848] px-6 py-3 rounded-md font-semibold transition"
          >
            <Save className="w-5 h-5" /> Lưu hồ sơ vụ án
          </button>
        </div>
      </form>
    </div>
  );
}
