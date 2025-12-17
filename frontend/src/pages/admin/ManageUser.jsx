import React, { useEffect, useState } from "react";
import { Trash2, UserPlus, Search } from "lucide-react";
import axios from "axios";
import CreateAccount from "../../components/CreateAccount";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xóa user
  const handleDelete = async (id, type) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa tài khoản này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${type}/${id}`);
      alert("Đã xóa!");
      fetchData(); 
    } catch (e) {
      alert("Lỗi khi xóa!");
    }
  };

 
  const filtered = users.filter(
    (u) =>
      (u.id && u.id.toLowerCase().includes(search.toLowerCase())) || 
      u.hoten.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold uppercase text-[#4ECDC4]">
          Quản lý người dùng
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#ff5252] hover:bg-red-600 px-4 py-2 rounded flex items-center gap-2 font-bold transition-colors"
        >
          <UserPlus size={20} /> Cấp tài khoản cán bộ
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#1b2838] p-4 rounded-t-xl border-b border-gray-700 flex items-center gap-2">
        <Search className="text-gray-400" />
        <input
          className="bg-transparent outline-none flex-1 text-white placeholder-gray-500"
          placeholder="Tìm kiếm theo ID, tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full bg-[#1b2838] text-left border border-gray-700 rounded-b-xl overflow-hidden">
        <thead className="bg-[#162436] text-gray-400 uppercase text-sm">
          <tr>
            {/* --- THÊM CỘT ID --- */}
            <th className="p-4">ID Cán bộ</th> 
            <th className="p-4">Họ tên</th>
            <th className="p-4">Email</th>
            <th className="p-4">Vai trò</th>
            <th className="p-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr
              key={u.id}
              className="hover:bg-[#20304a] border-t border-gray-700 transition-colors"
            >
              <td className="p-4 font-mono text-[#4ECDC4] font-bold">
                {u.type === 'canbo' ? u.id : <span className="text-gray-600 text-sm">{u.id}</span>}
              </td>
              
              <td className="p-4 font-medium">{u.hoten}</td>
              <td className="p-4 text-gray-400">{u.email}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    u.type === "canbo"
                      ? "bg-blue-900 text-blue-300 border border-blue-700"
                      : "bg-green-900 text-green-300 border border-green-700"
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleDelete(u.id, u.type)}
                  className="text-gray-500 hover:text-red-500 transition hover:bg-red-500/10 p-2 rounded-full"
                  title="Xóa tài khoản"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500 italic">
                Không tìm thấy dữ liệu nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <CreateAccount onClose={() => setShowModal(false)} onRefresh={fetchData} />
      )}
    </div>
  );
}