import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, FileText } from "lucide-react";

export default function DuyetKetLuan() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/results/pending").then(res => setList(res.data));
  }, []);

  const handleDecision = async (id, status) => {
      if(!window.confirm("Xác nhận quyết định này?")) return;
      try {
          await axios.put(`http://localhost:5000/api/results/approve/${id}`, { trangthai: status });
          alert("Đã cập nhật!");
          setList(list.filter(i => i.id_ketqua !== id));
      } catch (e) { alert("Lỗi"); }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      <h1 className="text-3xl font-bold text-center text-[#ff5252] mb-8 uppercase">Phê duyệt kết luận điều tra</h1>
      <div className="grid gap-6">
          {list.map(item => (
              <div key={item.id_ketqua} className="bg-[#1b2838] p-6 rounded-xl border border-gray-700 shadow-lg">
                  <h2 className="text-xl font-bold text-[#4ECDC4] mb-2">{item.vuan?.tenvuan}</h2>
                  <p className="text-sm text-gray-400 mb-4">Người báo cáo: <span className="text-white">{item.nguoibaocao}</span> | Ngày: {new Date(item.thoigianbaocao).toLocaleDateString('vi-VN')}</p>
                  
                  <div className="bg-[#0f1a26] p-4 rounded mb-4">
                      <p className="font-bold text-gray-300 mb-1">Tóm tắt:</p>
                      <p className="text-gray-400 text-sm whitespace-pre-line mb-3">{item.tomtat}</p>
                      <p className="font-bold text-gray-300 mb-1">Động cơ:</p>
                      <p className="text-gray-400 text-sm whitespace-pre-line">{item.dongco}</p>
                  </div>

                  <div className="flex justify-end gap-3">
                      <button onClick={() => handleDecision(item.id_ketqua, "từ chối")} className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white">
                          <XCircle size={18}/> Yêu cầu điều tra lại
                      </button>
                      <button onClick={() => handleDecision(item.id_ketqua, "đã duyệt")} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-lg shadow-green-900/50 font-bold">
                          <CheckCircle size={18}/> Duyệt & Kết thúc vụ án
                      </button>
                  </div>
              </div>
          ))}
          {list.length === 0 && <p className="text-center text-gray-500">Không có hồ sơ nào chờ duyệt.</p>}
      </div>
    </div>
  );
}