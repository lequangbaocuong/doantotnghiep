import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus, Trash2, Search, Edit } from "lucide-react"; 
import CreateCitizen from "../../components/CreateCitizen"; 
import EditCitizen from "../../components/EditCitizen"; 

export default function ManageCitizenAccounts() {
  const [citizens, setCitizens] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      const onlyCitizens = res.data.filter(u => u.type === 'nguoidan');
      setCitizens(onlyCitizens);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/nguoidan/${id}`);
      alert("Đã xóa thành công!");
      fetchData(); 
    } catch (e) { alert("Lỗi khi xóa!"); }
  };

  const filtered = citizens.filter(u => 
    u.hoten.toLowerCase().includes(search.toLowerCase()) || 
    (u.id && u.id.toLowerCase().includes(search.toLowerCase())) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold uppercase text-[#4ECDC4] flex items-center gap-2">
          <UserPlus /> Quản lý Tài khoản Công Dân
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#4ECDC4] text-black hover:bg-[#3dbdb4] px-4 py-2 rounded flex items-center gap-2 font-bold transition shadow-lg"
        >
          <UserPlus size={20} /> Cấp tài khoản mới
        </button>
      </div>

      <div className="bg-[#1b2838] p-4 rounded-t-xl border-b border-gray-700 flex items-center gap-2">
        <Search className="text-gray-400" />
        <input
          className="bg-transparent outline-none flex-1 text-white placeholder-gray-500"
          placeholder="Tìm theo Mã ND, CCCD, Tên hoặc Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-[#1b2838] text-left border border-gray-700 rounded-b-xl">
            <thead className="bg-[#162436] text-gray-400 uppercase text-sm">
            <tr>
                <th className="p-4">Mã ND</th>
                <th className="p-4">Họ tên</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-center">Trạng thái</th>
                <th className="p-4 text-center">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {filtered.length > 0 ? filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#20304a] border-t border-gray-700 transition">
                
                <td className="p-4 font-mono text-[#4ECDC4] font-bold cursor-pointer hover:underline"
                    onClick={() => setEditingUser(u)}>
                    {u.id}
                </td>
                
                <td className="p-4 font-medium">{u.hoten}</td>
                <td className="p-4 text-gray-400">{u.email}</td>
                <td className="p-4 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300 border border-green-700">
                    Hoạt động
                    </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-2">
                  
                    <button 
                        onClick={() => setEditingUser(u)} 
                        className="text-gray-500 hover:text-blue-400 p-2 transition hover:bg-blue-500/10 rounded-full"
                        title="Chỉnh sửa thông tin"
                    >
                        <Edit size={18} />
                    </button>

                    <button 
                        onClick={() => handleDelete(u.id)} 
                        className="text-gray-500 hover:text-red-500 p-2 transition hover:bg-red-500/10 rounded-full"
                        title="Xóa tài khoản"
                    >
                        <Trash2 size={18} />
                    </button>
                </td>
                </tr>
            )) : (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 italic">Chưa có dữ liệu người dân.</td>
                </tr>
            )}
            </tbody>
        </table>
      </div>

      {showCreateModal && (
        <CreateCitizen
            onClose={() => setShowCreateModal(false)}
            onSuccess={fetchData}               
        />
      )}

      {editingUser && (
        <EditCitizen
            user={editingUser}
            onClose={() => setEditingUser(null)} 
            onSuccess={fetchData} 
        />
      )}
    </div>
  );
}