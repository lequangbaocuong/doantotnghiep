import React, { useState } from "react";

export default function PhanTichVuAn() {
  const [vuAn, setVuAn] = useState([
    { id: "VA001", tenvuan: "Trộm cắp xe máy", trangthai: "Đang điều tra" },
    { id: "VA002", tenvuan: "Buôn bán ma túy", trangthai: "Chưa xử lý" },
  ]);

  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState({
    tomtat: "",
    dongco: "",
    ghichu: "",
    trangthai: "đang điều tra",
  });

  const handleSave = () => {
    alert("✅ Báo cáo phân tích đã được lưu!");
    setSelected(null);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0f1a26] mb-6">Phân tích vụ án</h2>

      {!selected ? (
        <table className="w-full border border-gray-300 bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Mã vụ án</th>
              <th className="p-3 text-left">Tên vụ án</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {vuAn.map((v) => (
              <tr key={v.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{v.id}</td>
                <td className="p-3">{v.tenvuan}</td>
                <td className="p-3 text-yellow-600">{v.trangthai}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelected(v)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Phân tích
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-white p-8 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Phân tích vụ án: {selected.tenvuan}
          </h3>
          <textarea
            className="w-full border p-3 mb-4 rounded"
            rows="3"
            placeholder="Tóm tắt diễn biến vụ án..."
            value={analysis.tomtat}
            onChange={(e) => setAnalysis({ ...analysis, tomtat: e.target.value })}
          />
          <textarea
            className="w-full border p-3 mb-4 rounded"
            rows="3"
            placeholder="Phân tích động cơ..."
            value={analysis.dongco}
            onChange={(e) => setAnalysis({ ...analysis, dongco: e.target.value })}
          />
          <textarea
            className="w-full border p-3 mb-4 rounded"
            rows="2"
            placeholder="Ghi chú thêm..."
            value={analysis.ghichu}
            onChange={(e) => setAnalysis({ ...analysis, ghichu: e.target.value })}
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Lưu phân tích
          </button>
        </div>
      )}
    </div>
  );
}
