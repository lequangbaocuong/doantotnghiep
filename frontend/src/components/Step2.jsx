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
        <select name="crimeType" value={form.crimeType} onChange={handleChange} className="border p-2 rounded">
          <option value="">Loại tội phạm</option>
          <option value="Trộm cắp">Trộm cắp</option>
          <option value="Bạo lực">Bạo lực</option>
          <option value="Ma túy">Ma túy</option>
        </select>
        <select name="severity" value={form.severity} onChange={handleChange} className="border p-2 rounded">
          <option value="">Mức độ nghiêm trọng</option>
          <option value="Nhẹ">Nhẹ</option>
          <option value="Vừa">Vừa</option>
          <option value="Nghiêm trọng">Nghiêm trọng</option>
        </select>
        <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} className="border p-2 rounded col-span-2" />
        <input name="location" placeholder="Địa điểm xảy ra vụ việc" value={form.location} onChange={handleChange} className="border p-2 rounded col-span-2" />
        <textarea name="description" placeholder="Mô tả chi tiết vụ việc" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-2 h-32" />
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => setForm({ ...form, evidence: e.target.files })}
        className="border p-2 rounded col-span-2"
      />
      <select
        name="evidenceType"
        value={form.evidenceType}
        onChange={handleChange}
        className="border p-2 rounded col-span-2"
      >
        <option value="">Loại chứng cứ</option>
        <option value="vật lý">Vật lý</option>
        <option value="phi vật lý">Phi vật lý</option>
      </select>

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
