import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function ThongKePage() {
  const [year, setYear] = useState("2025");

  // Dữ liệu mẫu (sau này có thể lấy từ API)
  const dataByCrimeType = [
    { type: "Trộm cắp", cases: 12 },
    { type: "Đánh nhau", cases: 8 },
    { type: "Lừa đảo", cases: 5 },
    { type: "Ma túy", cases: 10 },
    { type: "Khác", cases: 3 },
  ];

  const dataByArea = [
    { name: "Phường Phước Mỹ", value: 5 },
    { name: "Phường Mân Thái", value: 4 },
    { name: "Phường Thọ Quang", value: 3 },
  ];

  const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA502"];

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252]">
        THỐNG KÊ TỘI PHẠM & AN NINH PHƯỜNG SƠN TRÀ
      </h1>

      {/* Bộ lọc */}
      <div className="flex justify-end mb-6">
        <select
          className="bg-[#1b2838] text-white px-4 py-2 rounded border border-gray-600"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2025">Năm 2025</option>
          <option value="2024">Năm 2024</option>
          <option value="2023">Năm 2023</option>
        </select>
      </div>

      {/* Biểu đồ loại tội phạm */}
      <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Thống kê vụ án theo loại tội phạm ({year})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataByCrimeType} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3f57" />
            <XAxis dataKey="type" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="cases" fill="#ff5252" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ theo khu vực */}
      <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Tình hình an ninh theo khu vực
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataByArea}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                nameKey="name"
              >
                {dataByArea.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="text-gray-300 space-y-2">
            {dataByArea.map((item, index) => (
              <p key={index}>
                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {item.name}:{" "}
                <span className="font-semibold text-white">{item.value} vụ</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Kết luận tổng hợp */}
      <div className="bg-[#162436] p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-100 mb-3">
          Tổng quan nhận định:
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Trong năm {year}, các loại tội phạm phổ biến nhất là{" "}
          <span className="text-[#ff5252] font-semibold">Trộm cắp</span> và{" "}
          <span className="text-[#ff5252] font-semibold">Ma túy</span>.  
          Khu vực có tình hình an ninh đáng lo ngại là{" "}
          <span className="text-[#45B7D1] font-semibold">Phường An Hải Bắc</span>.  
          Cần tăng cường tuần tra, lắp camera an ninh, và phối hợp với người dân trong công tác phòng chống tội phạm.
        </p>
      </div>
    </div>
  );
}
