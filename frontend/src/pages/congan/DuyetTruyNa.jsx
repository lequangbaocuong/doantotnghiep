import React, { useState } from "react";

export default function DuyetTruyNa() {
  const [list, setList] = useState([
    { id: "TN001", hoten: "Nguyễn Văn X", toidanh: "Cướp giật", trangthai: "chờ duyệt" },
    { id: "TN002", hoten: "Trần Văn Y", toidanh: "Giết người", trangthai: "chờ duyệt" },
  ]);

  const handleUpdate = (id, status) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, trangthai: status } : item
      )
    );
    alert(`✅ Đã cập nhật trạng thái ${status} cho ${id}`);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0f1a26] mb-6">Duyệt thông tin truy nã</h2>

      <table className="w-full border border-gray-300 bg-white shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Mã truy nã</th>
            <th className="p-3 text-left">Tên đối tượng</th>
            <th className="p-3 text-left">Tội danh</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t) => (
            <tr key={t.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{t.id}</td>
              <td className="p-3">{t.hoten}</td>
              <td className="p-3">{t.toidanh}</td>
              <td
                className={`p-3 ${
                  t.trangthai === "đã duyệt"
                    ? "text-green-600"
                    : t.trangthai === "từ chối"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {t.trangthai}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleUpdate(t.id, "đã duyệt")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Duyệt
                </button>
                <button
                  onClick={() => handleUpdate(t.id, "từ chối")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Từ chối
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
