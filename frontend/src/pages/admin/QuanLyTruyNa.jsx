import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Eye, Search, AlertCircle, CheckCircle } from "lucide-react";

export default function QuanLyTruyNa() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wanted/all");
      setList(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Bạn có chắc muốn xóa bài đăng này không?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/wanted/${id}`);
      alert("Đã xóa!");
      fetchData();
    } catch (e) { alert("Lỗi khi xóa!"); }
  };

  // Filter tìm kiếm
  const filtered = list.filter(item => 
    item.hoten.toLowerCase().includes(search.toLowerCase()) || 
    item.id_truyna.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      <h1 className="text-2xl font-bold mb-6 uppercase text-[#4ECDC4] flex items-center gap-2">
        <Search /> Quản lý danh sách truy nã
      </h1>

      <div className="bg-[#1b2838] p-4 rounded-t-xl border-b border-gray-700">
          <input 
            className="w-full bg-[#0f1a26] border border-gray-600 rounded p-2 text-white outline-none focus:border-[#4ECDC4]"
            placeholder="Tìm kiếm theo tên hoặc mã truy nã..." 
            value={search} onChange={e => setSearch(e.target.value)}
          />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-[#1b2838] text-left border border-gray-700 rounded-b-xl">
            <thead className="bg-[#162436] text-gray-400 uppercase text-xs">
                <tr>
                    <th className="p-4">Hình ảnh</th>
                    <th className="p-4">Đối tượng</th>
                    <th className="p-4">Tội danh</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-sm">
                {filtered.map(item => (
                    <tr key={item.id_truyna} className="hover:bg-[#20304a]">
                        <td className="p-4">
                            <img src={`http://localhost:5000${item.anh}`} alt="tội phạm" className="w-12 h-12 object-cover rounded bg-gray-600"/>
                        </td>
                        <td className="p-4 font-bold">
                            {item.hoten}
                            <p className="text-xs text-gray-500 font-mono">{item.id_truyna}</p>
                        </td>
                        <td className="p-4 text-gray-300">{item.toidanh}</td>
                        <td className="p-4">
                            {item.trangthai === 'đã duyệt' ? (
                                <span className="flex items-center gap-1 text-green-400 bg-green-900/30 px-2 py-1 rounded w-fit">
                                    <CheckCircle size={14}/> Đã công khai
                                </span>
                            ) : item.trangthai === 'chờ duyệt' ? (
                                <span className="flex items-center gap-1 text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded w-fit">
                                    <AlertCircle size={14}/> Chờ duyệt
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-red-400 bg-red-900/30 px-2 py-1 rounded w-fit">
                                    <AlertCircle size={14}/> {item.trangthai}
                                </span>
                            )}
                        </td>
                        <td className="p-4 text-center">
                            <button onClick={() => handleDelete(item.id_truyna)} className="text-gray-500 hover:text-red-500 transition">
                                <Trash2 size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}