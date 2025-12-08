import React, { useEffect, useState } from "react";
import { Edit3, Send, AlertTriangle, UserPlus } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Nếu muốn link tới chi tiết

export default function CongAn_CaseLists() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cases");
      
      if (Array.isArray(res.data)) { 
        setCases(res.data);
      } else if (res.data.success && res.data.data) {
        setCases(res.data.data);
      }
      
    } catch (error) {
      console.error("Lỗi tải danh sách vụ án:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa rõ"; 
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; 
    return date.toLocaleDateString('vi-VN'); 
  };
  
  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("hoàn tất") || s.includes("đã xử lý")) return "text-green-400";
    if (s.includes("đang")) return "text-blue-400";
    if (s.includes("chờ")) return "text-yellow-400";
    return "text-gray-400";
  };
  
  const getLevelColor = (level) => {
      const l = level?.toLowerCase() || "";
      if(l.includes("đặc biệt")) return "text-red-600 font-bold";
      if(l.includes("rất nghiêm trọng")) return "text-orange-500 font-bold";
      if(l.includes("nghiêm trọng")) return "text-yellow-400";
      return "text-gray-300";
  }

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-6 py-10 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ff5252] uppercase">
        Danh sách hồ sơ vụ án - Công an phường Sơn Trà
      </h1>

      <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#ff5252]">
            Hồ sơ đang quản lý
            </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-300 text-sm">
            <thead className="bg-[#162436] text-gray-200 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Mã vụ án</th>
                <th className="px-4 py-3 text-left">Tên vụ án</th>
                <th className="px-4 py-3 text-left">Ngày tạo</th>
                <th className="px-4 py-3 text-left">Mức độ</th>
                <th className="px-4 py-3 text-left">Trạng thái</th>
                <th className="px-4 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                 <tr><td colSpan="6" className="text-center py-6">Đang tải dữ liệu...</td></tr>
              ) : cases.length === 0 ? (
                 <tr><td colSpan="6" className="text-center py-6 text-gray-500">Chưa có hồ sơ vụ án nào.</td></tr>
              ) : (
                cases.map((vuAn) => (
                  <tr
                    key={vuAn.id_vuan}
                    className="hover:bg-[#22344a] transition duration-150"
                  >
                    <td className="px-4 py-3 font-mono text-[#4ECDC4] font-medium">
                      {vuAn.id_vuan}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                        {vuAn.tenvuan}
                    </td>
                    <td className="px-4 py-3">
                        {formatDate(vuAn.ngaytao)}
                    </td>
                    <td className={`px-4 py-3 capitalize ${getLevelColor(vuAn.mucdo)}`}>
                        {vuAn.mucdo}
                    </td>
                    <td className={`px-4 py-3 font-medium ${getStatusColor(vuAn.trangthai)}`}>
                      {vuAn.trangthai}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-[#2e4a68] hover:bg-[#3d5e82] text-blue-300 p-2 rounded-md transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          className="bg-[#2e4a68] hover:bg-[#3d5e82] text-cyan-300 p-2 rounded-md transition"
                        >
                          <Send className="w-4 h-4" />
                        </button>

                        <button
                          title="Thêm nghi phạm"
                          onClick={() => {
                              navigate('/congan/themnghipham', { state: { id_vuan: vuAn.id_vuan, tenvuan: vuAn.tenvuan } });
                          }}
                          className="bg-[#2e4a68] hover:bg-[#3d5e82] text-red-400 p-2 rounded-md transition"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-medium text-white cursor-pointer hover:text-[#ff5252]"
                      onClick={() => navigate(`/congan/chitietvuan/${vuAn.id_vuan}`)}
                    >
                      Chi tiết
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && (
            <div className="mt-4 text-xs text-gray-500 text-right">
                Tổng số: {cases.length} hồ sơ
            </div>
        )}
      </div>
    </div>
  );
}