import React from "react";

export default function PhanTichVuAn() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0f1a26] mb-6">
        Phân tích vụ án
      </h2>
      <p className="text-gray-700 mb-6">
        Dưới đây là danh sách vụ án đang chờ phân tích và đánh giá sơ bộ.
      </p>

      <table className="w-full border border-gray-300 bg-white shadow">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="p-3 text-left">Mã vụ án</th>
            <th className="p-3 text-left">Tên vụ án</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t hover:bg-gray-50">
            <td className="p-3">VU001</td>
            <td className="p-3">Trộm cắp tài sản</td>
            <td className="p-3 text-yellow-600">Đang chờ phân tích</td>
            <td className="p-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Xem chi tiết
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
