import React, { useEffect, useState } from "react";
import { Trash2, UserPlus, Search, ShieldAlert } from "lucide-react";
import axios from "axios";
import CreateAccount from "../../components/CreateAccount";
import EditAccount from "../../components/EditAccount"; 

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
 
  const [editingUser, setEditingUser] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      const onlyOfficers = res.data.filter(u => u.type === 'canbo' && u.id_vaitro !== 'VT001'); 
      setUsers(onlyOfficers);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (e, id, type) => {
    e.stopPropagation(); 
    if (!window.confirm("Bạn chắc chắn muốn xóa cán bộ này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${type}/${id}`);
      alert("Đã xóa!");
      fetchData(); 
    } catch (e) { alert("Lỗi khi xóa!"); }
  };

  const filtered = users.filter((u) =>
      u.hoten.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold uppercase text-[#4ECDC4] flex items-center gap-2">
          <ShieldAlert /> Quản lý Cán bộ & Chiến sĩ
        </h1>
        <button onClick={() => setShowCreateModal(true)}
          className="bg-[#4ECDC4] text-black hover:bg-[#3dbdb4] px-4 py-2 rounded flex items-center gap-2 font-bold transition shadow-lg">
          <UserPlus size={20} /> Cấp tài khoản cán bộ
        </button>
      </div>

      <div className="bg-[#1b2838] p-4 rounded-t-xl border-b border-gray-700 flex items-center gap-2">
        <Search className="text-gray-400" />
        <input className="bg-transparent outline-none flex-1 text-white placeholder-gray-500"
          placeholder="Tìm kiếm theo Tên, Email hoặc ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="w-full bg-[#1b2838] text-left border border-gray-700 rounded-b-xl overflow-hidden">
        <thead className="bg-[#162436] text-gray-400 uppercase text-sm">
          <tr>
            <th className="p-4">ID Cán bộ</th> 
            <th className="p-4">Họ tên</th>
            <th className="p-4">Email</th>
            <th className="p-4">Chức vụ</th>
            <th className="p-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? filtered.map((u) => (
            <tr 
                key={u.id} 
                onClick={() => setEditingUser(u)} // CLICK VÀO DÒNG ĐỂ MỞ MODAL SỬA
                className="hover:bg-[#20304a] border-t border-gray-700 transition-colors cursor-pointer group"
            >
              <td className="p-4 font-mono text-[#ff5252] font-bold group-hover:underline">{u.id}</td>
              <td className="p-4 font-medium">{u.hoten}</td>
              <td className="p-4 text-gray-400">{u.email}</td>
              <td className="p-4">
                <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900 text-blue-300 border border-blue-700">
                  {u.role}
                </span>
              </td>
              <td className="p-4 text-center">
                <button onClick={(e) => handleDelete(e, u.id, u.type)} 
                  className="text-gray-500 hover:text-red-500 p-2 transition hover:bg-red-500/10 rounded-full z-10 relative">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="p-8 text-center text-gray-500 italic">Chưa có dữ liệu cán bộ.</td></tr>
          )}
        </tbody>
      </table>

      {showCreateModal && (
        <CreateAccount onClose={() => setShowCreateModal(false)} onSuccess={fetchData} />
      )}

      {editingUser && (
        <EditAccount
            user={editingUser} 
            onClose={() => setEditingUser(null)} 
            onSuccess={fetchData} 
        />
      )}
    </div>
  );
}