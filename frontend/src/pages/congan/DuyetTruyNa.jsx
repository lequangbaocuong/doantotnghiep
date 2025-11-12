import React from "react";

export default function DuyetTruyNa() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0f1a26] mb-6">
        Duyệt thông tin truy nã
      </h2>
      <table className="w-full border border-gray-300 bg-white shadow">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Tên đối tượng</th>
            <th className="p-3 text-left">Tội danh</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t hover:bg-gray-50">
            <td className="p-3">TN001</td>
            <td className="p-3">Nguyễn Văn X</td>
            <td className="p-3">Cướp giật tài sản</td>
            <td className="p-3 text-yellow-600">Chờ duyệt</td>
            <td className="p-3 flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Duyệt
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Từ chối
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
