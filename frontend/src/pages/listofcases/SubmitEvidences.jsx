import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SubmitEvidences() {
const { id } = useParams();
  const [form, setForm] = useState({
    type: "",
    description: "",
    files: [],
  });

  const handleFileChange = (e) => {
    setForm({ ...form, files: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã gửi chứng cứ cho vụ án ${id} thành công!`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Link to="/cases" className="text-red-600 hover:text-red-700 mb-4 inline-block">
        ← Quay lại danh sách vụ án
      </Link>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          GỬI CHỨNG CỨ CHO VỤ ÁN {id}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Loại chứng cứ</label>
            <select
              className="w-full border rounded p-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <option value="">-- Chọn loại chứng cứ --</option>
              <option value="Hình ảnh">Hình ảnh</option>
              <option value="Video">Video</option>
              <option value="Tài liệu">Tài liệu</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả chứng cứ</label>
            <textarea
              className="w-full border rounded p-2 h-28"
              placeholder="Nhập mô tả chi tiết..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Tệp đính kèm</label>
            <input
              type="file"
              multiple
              className="w-full border p-2 rounded"
              onChange={handleFileChange}
            />
            {form.files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                {Array.from(form.files).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Gửi chứng cứ
          </button>
        </form>
      </div>
    </div>
  );
}