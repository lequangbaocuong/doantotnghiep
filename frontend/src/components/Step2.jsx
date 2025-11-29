import React, { useState } from "react";

export default function ReportStep2({ nextStep, prevStep, updateFormData, data }) {
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    updateFormData(form);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">THÔNG TIN VỤ VIỆC</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại tội phạm</label>
          <select name="crimeType" value={form.crimeType} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">-- Chọn loại tội phạm --</option>
            <option value="trộm cắp tài sản">Trộm cắp tài sản</option>
            <option value="liên quan đến ma túy">Liên quan đến ma túy</option>
            <option value="ảnh hưởng trật tự nơi công cộng">Ảnh hưởng trật tự nơi công cộng</option>
            <option value="khác">Khác</option>
          </select>
        </div>

        {/* Cột ngayxayra là DATE -> dùng type="date" */}
        <div className="col-span-1">
             <label className="block text-sm font-medium text-gray-700 mb-1">Ngày xảy ra</label>
            <input 
              type="date" 
              name="ngayxayra" 
              value={form.ngayxayra || ""} 
              onChange={handleChange} 
              className="border p-2 rounded w-full" 
            />
        </div>

        <div className="col-span-1">
             <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
            <input name="location" placeholder="Số nhà, đường, phường..." value={form.location} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
            <textarea name="description" placeholder="Mô tả chi tiết vụ việc..." value={form.description} onChange={handleChange} className="border p-2 rounded w-full h-32" />
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Chứng cứ đính kèm</label>
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