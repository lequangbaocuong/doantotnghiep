import React, { useState } from "react";

export default function ReportStep1({ nextStep, updateFormData, data }) {
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
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">THÔNG TIN NGƯỜI GỬI</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="fullname" placeholder="Họ và tên" value={form.fullname} onChange={handleChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
        <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} className="border p-2 rounded" />
        <input name="address" placeholder="Địa chỉ" value={form.address} onChange={handleChange} className="border p-2 rounded" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <input name="cccd" placeholder="Số CCCD/CMND" value={form.cccd} onChange={handleChange} className="border p-2 rounded" />
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded">
          <option value="khác">Giới tính</option>
          <option value="nam">Nam</option>
          <option value="nữ">Nữ</option>
          <option value="khác">Khác</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-2">Mối quan hệ với vụ việc</label>
        <select name="relation" value={form.relation} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">-- Chọn --</option>
          <option value="nhân chứng">Nhân chứng</option>
          <option value="nạn nhân">Nạn nhân</option>
        </select>
      </div>

      {form.relation === 'nạn nhân' && (
        <div className="mt-4 bg-red-50 p-4 rounded border border-red-100 animate-fade-in">
            <label className="block font-medium mb-2 text-red-800">Tình trạng hiện tại của bạn</label>
            <select 
                name="victimCondition" 
                value={form.victimCondition || "còn sống"} 
                onChange={handleChange} 
                className="border p-2 rounded w-full border-red-300 focus:ring-red-500"
            >
                <option value="còn sống">Còn sống (Bình thường)</option>
                <option value="bị thương">Bị thương (Cần hỗ trợ y tế)</option>
            </select>
        </div>
      )}

      <div className="mt-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="anonymous"
            checked={form.anonymous}
            onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
            className="mr-2"
          />
          Gửi ẩn danh
        </label>
      </div>

      <div className="mt-6 text-right">
        <button onClick={handleNext} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}