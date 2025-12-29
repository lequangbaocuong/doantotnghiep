import React, { useState } from "react";

export default function ReportStep2({ nextStep, prevStep, updateFormData, data }) {
  const [form, setForm] = useState(data);
  
  // 1. Thêm state để lưu thông báo lỗi ngày tháng
  const [dateError, setDateError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Hàm xử lý riêng cho ô chọn ngày
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    
    // Kiểm tra ngay lập tức
    if (selectedDate > today) {
      setDateError("⚠️ Ngày xảy ra không được lớn hơn ngày hôm nay!");
    } else {
      setDateError(""); // Xóa lỗi nếu chọn đúng
    }

    // Vẫn cập nhật giá trị vào form để hiển thị
    setForm({ ...form, ngayxayra: selectedDate });
  };

  const handleNext = () => {
    // 3. Chặn không cho đi tiếp nếu đang có lỗi hoặc chưa chọn ngày
    if (dateError) {
      return alert("Vui lòng sửa lại ngày xảy ra vụ việc!");
    }
    
    // Validate thêm nếu cần (ví dụ bắt buộc nhập)
    if (!form.ngayxayra) {
        return alert("Vui lòng chọn ngày xảy ra vụ việc!");
    }

    updateFormData(form);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">THÔNG TIN VỤ VIỆC</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb- 1">Loại tội phạm <span className="text-red-500"> * </span></label>
          <select name="crimeType" value={form.crimeType} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">-- Chọn loại tội phạm --</option>
            <option value="trộm cắp tài sản">Trộm cắp tài sản</option>
            <option value="liên quan đến ma túy">Liên quan đến ma túy</option>
            <option value="ảnh hưởng trật tự nơi công cộng">Ảnh hưởng trật tự nơi công cộng</option>
            <option value="khác">Khác</option>
          </select>
        </div>

        {/* --- CẬP NHẬT Ô NGÀY XẢY RA --- */}
        <div className="col-span-1">
             <label className="block text-sm font-medium text-gray-700 mb-1">Ngày xảy ra  <span className="text-red-500"> * </span> </label>
            <input 
              type="date" 
              name="ngayxayra" 
              value={form.ngayxayra || ""} 
              onChange={handleDateChange} // Dùng hàm xử lý riêng
              max={today} 
              className={`border p-2 rounded w-full outline-none ${dateError ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
            />
            {/* Hiển thị lỗi ngay bên dưới */}
            {dateError && (
                <p className="text-red-500 text-xs mt-1 animate-pulse">{dateError}</p>
            )}
        </div>

        <div className="col-span-1">
             <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm <span className="text-red-500"> * </span> </label>
            <input name="location" placeholder="Số nhà, đường, phường..." value={form.location} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết <span className="text-red-500"> * </span> </label>
            <textarea name="description" placeholder="Mô tả chi tiết vụ việc..." value={form.description} onChange={handleChange} className="border p-2 rounded w-full h-32" />
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Chứng cứ đính kèm <span className="text-red-500"> * </span> </label>
        <input
            type="file"
            multiple
            onChange={(e) => setForm({ ...form, evidence: e.target.files })}
            className="border p-2 rounded w-full mb-2"
        />
        <select
            name="evidenceType"
            value={form.evidenceType}
            onChange={handleChange}
            className="border p-2 rounded w-full"
        >
            <option value="">-- Loại chứng cứ --</option>
            <option value="vật lý">Vật lý (Hình ảnh, video...)</option>
            <option value="phi vật lý">Phi vật lý (Lời khai, ghi âm...)</option>
        </select>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
          Quay lại
        </button>
        <button onClick={handleNext} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}