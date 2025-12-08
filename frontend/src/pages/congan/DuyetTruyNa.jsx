import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Eye, AlertTriangle } from "lucide-react";
import axios from "axios";

export default function DuyetTruyNa() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/wanted/pending")
      .then(res => {
          if(res.data.length === 0) {
             setList([
                { id_truyna: "TN001", hoten: "Nguyễn Văn A", toidanh: "Cướp giật", nguoitao: "CB002", trangthai: "chờ duyệt", anh: "" }
             ]);
          } else {
             setList(res.data);
          }
          setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApprove = async (id, status) => {
    try {
      if(!window.confirm(`Bạn chắc chắn muốn ${status === 'đã duyệt' ? 'DUYỆT' : 'TỪ CHỐI'} lệnh truy nã này?`)) return;

      await axios.put(`http://localhost:5000/api/wanted/update-status/${id}`, { trangthai: status });
      
      alert("Đã cập nhật thành công!");
  
      setList(prev => prev.filter(item => item.id_truyna !== id));
    } catch (error) {
      alert("Lỗi khi xử lý!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252] uppercase">
        Kiểm duyệt thông tin truy nã
      </h1>

      <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-[#162436] text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Mã TN</th>
              <th className="px-4 py-3">Đối tượng</th>
              <th className="px-4 py-3">Tội danh</th>
              <th className="px-4 py-3">Người đăng tải</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {list.map((item) => (
              <tr key={item.id_truyna} className="hover:bg-[#22344a]">
                <td className="px-4 py-3 font-mono text-[#ff5252]">{item.id_truyna}</td>
                <td className="px-4 py-3 font-bold">{item.hoten}</td>
                <td className="px-4 py-3">{item.toidanh}</td>
                <td className="px-4 py-3">{item.id_canbo || "Cán bộ"}</td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button 
                    onClick={() => handleApprove(item.id_truyna, "đã duyệt")}
                    className="flex items-center gap-1 bg-green-600/20 text-green-400 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition"
                  >
                    <CheckCircle size={16} /> Duyệt
                  </button>
                  <button 
                    onClick={() => handleApprove(item.id_truyna, "từ chối")}
                    className="flex items-center gap-1 bg-red-600/20 text-red-400 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
                  >
                    <XCircle size={16} /> Từ chối
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && !loading && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">Không có yêu cầu nào đang chờ duyệt.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}