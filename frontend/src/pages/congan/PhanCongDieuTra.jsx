import React from "react";

export default function PhanCongDieuTra() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0f1a26] mb-6">
        Phân công điều tra
      </h2>

      <form className="max-w-2xl bg-white shadow-lg p-8 rounded-lg">
        <label className="block mb-2 text-gray-700 font-medium">
          Mã vụ án:
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Nhập mã vụ án"
        />

        <label className="block mb-2 text-gray-700 font-medium">
          Cán bộ phụ trách:
        </label>
        <select className="w-full border px-3 py-2 rounded mb-4">
          <option>Chọn cán bộ...</option>
          <option>Nguyễn Văn A</option>
          <option>Trần Thị B</option>
        </select>

        <label className="block mb-2 text-gray-700 font-medium">
          Mô tả nhiệm vụ:
        </label>
        <textarea
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Nhập mô tả chi tiết..."
        />

        <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
          Giao nhiệm vụ
        </button>
      </form>
    </div>
  );
}
