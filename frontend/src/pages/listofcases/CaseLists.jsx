import React from "react";
import { Link } from "react-router-dom";

export default function CaseLists() {
     const cases = [
    { id: "#18933", type: "Tội phạm tài sản", level: "Ít nghiêm trọng", date: "22/05/2022", reporter: "CUONG", location: "Đà Nẵng", status: "Hồ sơ mới" },
    { id: "#20462", type: "Tội phạm bạo lực", level: "Rất nghiêm trọng", date: "13/05/2022", reporter: "CUONG", location: "Sơn Trà", status: "Hồ sơ mới" },
    { id: "#45169", type: "Tội phạm ma túy", level: "Rất nghiêm trọng", date: "15/06/2022", reporter: "CUONG", location: "Hải Châu", status: "Đang xử lý" },
    { id: "#17188", type: "Tội phạm ma túy", level: "Ít nghiêm trọng", date: "25/09/2022", reporter: "CUONG", location: "Liên Chiểu", status: "Chờ duyệt chứng cứ" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Hồ sơ mới":
        return "bg-yellow-100 text-yellow-700 border border-yellow-400";
      case "Đang xử lý":
        return "bg-green-100 text-green-700 border border-green-400";
      case "Chờ duyệt chứng cứ":
        return "bg-red-100 text-red-700 border border-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">DANH SÁCH VỤ ÁN</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Mã vụ án</th>
              <th className="px-6 py-3">Loại tội phạm</th>
              <th className="px-6 py-3">Mức độ</th>
              <th className="px-6 py-3">Ngày</th>
              <th className="px-6 py-3">Người báo cáo</th>
              <th className="px-6 py-3">Địa điểm</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{item.id}</td>
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">{item.level}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">{item.reporter}</td>
                <td className="px-6 py-4">{item.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/evidence/${item.id.replace("#", "")}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Gửi chứng cứ
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}