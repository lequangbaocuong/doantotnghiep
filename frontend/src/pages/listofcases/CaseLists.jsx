import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CaseLists() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/cases")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("đang")) return "bg-green-100 text-green-700 border border-green-400";
    if (s.includes("chờ")) return "bg-yellow-100 text-yellow-700 border border-yellow-400";
    return "bg-gray-100 text-gray-700";
  };

  const handleSendEvidence = (id) => {
      const token = localStorage.getItem("token");
      navigate(`/evidence/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
        DANH SÁCH VỤ ÁN ĐANG ĐIỀU TRA
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Mã vụ án</th>
              <th className="px-6 py-3">Tên vụ án</th>
              <th className="px-6 py-3">Mức độ</th>
              <th className="px-6 py-3">Ngày khởi tố</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
                <tr><td colSpan="6" className="text-center py-4">Đang tải dữ liệu...</td></tr>
            ) : cases.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4">Chưa có vụ án nào được công bố.</td></tr>
            ) : (
                cases.map((item) => (
                <tr key={item.id_vuan} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono font-semibold text-blue-600">{item.id_vuan}</td>
                    <td className="px-6 py-4 font-medium">{item.tenvuan}</td>
                    <td className="px-6 py-4">
                        <span className={`capitalize ${item.mucdo.includes('nghiêm trọng') ? 'text-red-600 font-bold' : ''}`}>
                            {item.mucdo}
                        </span>
                    </td>
                    <td className="px-6 py-4">{new Date(item.ngaytao).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.trangthai)}`}>
                        {item.trangthai}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => handleSendEvidence(item.id_vuan)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold transition shadow"
                    >
                        Gửi chứng cứ
                    </button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}