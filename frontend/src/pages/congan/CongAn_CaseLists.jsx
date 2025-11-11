import React from "react";
import { ClipboardList, Upload, Edit3, Send, FileText } from "lucide-react";

export default function CongAnPhuong() {
  const hoSo = [
    {
      id: "VA001",
      tenVuAn: "Trộm cắp xe máy tại An Hải Bắc",
      ngayTao: "12/08/2025",
      trangThai: "Đang điều tra",
      mucDo: "Trung bình",
    },
    {
      id: "VA002",
      tenVuAn: "Buôn bán ma túy khu Mân Thái",
      ngayTao: "05/07/2025",
      trangThai: "Hoàn tất điều tra",
      mucDo: "Nghiêm trọng",
    },
    {
      id: "VA003",
      tenVuAn: "Hành vi gây rối trật tự công cộng",
      ngayTao: "28/09/2025",
      trangThai: "Đang xử lý",
      mucDo: "Nhẹ",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ff5252] uppercase">
        Danh sách hồ sơ vụ án - Công an phường Sơn Trà
      </h1>


      {/* Danh sách hồ sơ vụ án */}
      <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#ff5252]">
          Danh sách hồ sơ vụ án
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-gray-300 text-sm">
            <thead className="bg-[#162436] text-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Mã vụ án</th>
                <th className="px-4 py-2 text-left">Tên vụ án</th>
                <th className="px-4 py-2 text-left">Ngày tạo</th>
                <th className="px-4 py-2 text-left">Mức độ</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {hoSo.map((vuAn, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-[#22344a] transition"
                >
                  <td className="px-4 py-3 font-semibold">{vuAn.id}</td>
                  <td className="px-4 py-3">{vuAn.tenVuAn}</td>
                  <td className="px-4 py-3">{vuAn.ngayTao}</td>
                  <td className="px-4 py-3 text-yellow-400">{vuAn.mucDo}</td>
                  <td
                    className={`px-4 py-3 ${
                      vuAn.trangThai.includes("Hoàn")
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  >
                    {vuAn.trangThai}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-3 justify-center">
                    
                      {/* Cập nhật tiến trình */}
                      <button
                        title="Cập nhật tiến trình"
                        className="bg-[#4ECDC4] hover:bg-[#38b2a3] px-3 py-2 rounded-md text-sm"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Lập báo cáo */}
                      <button
                        title="Lập báo cáo điều tra"
                        className="bg-[#45B7D1] hover:bg-[#2f9fc1] px-3 py-2 rounded-md text-sm"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
