import React, { useState } from "react";

export default function PhanCongDieuTra() {
  const [task, setTask] = useState({
    id_vuan: "",
    id_canbo: "",
    tennhiemvu: "",
    noidung: "",
    ngaybatdau: "",
    ngayketthuc: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Đã giao nhiệm vụ điều tra!");
    console.log(task);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0f1a26] mb-6">Phân công điều tra</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white shadow-lg p-8 rounded-lg"
      >
        <label className="block mb-2 font-medium">Mã vụ án *</label>
        <input
          type="text"
          name="id_vuan"
          onChange={(e) => setTask({ ...task, id_vuan: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Cán bộ phụ trách *</label>
        <input
          type="text"
          name="id_canbo"
          onChange={(e) => setTask({ ...task, id_canbo: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="VD: CB001"
        />

        <label className="block mb-2 font-medium">Tên nhiệm vụ *</label>
        <input
          type="text"
          name="tennhiemvu"
          onChange={(e) => setTask({ ...task, tennhiemvu: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="VD: Thu thập chứng cứ"
        />

        <label className="block mb-2 font-medium">Nội dung nhiệm vụ</label>
        <textarea
          name="noidung"
          onChange={(e) => setTask({ ...task, noidung: e.target.value })}
          rows="3"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Ngày bắt đầu</label>
            <input
              type="date"
              name="ngaybatdau"
              onChange={(e) => setTask({ ...task, ngaybatdau: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Ngày kết thúc</label>
            <input
              type="date"
              name="ngayketthuc"
              onChange={(e) => setTask({ ...task, ngayketthuc: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button className="bg-green-600 text-white px-5 py-2 mt-6 rounded hover:bg-green-700">
          Giao nhiệm vụ
        </button>
      </form>
    </div>
  );
}
