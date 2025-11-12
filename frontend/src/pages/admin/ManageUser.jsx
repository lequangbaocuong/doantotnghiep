import React from "react";

export default function ManageUsers() {
  const users = [
    { id: 1, name: "Nguyễn Văn A", role: "Công an phường", status: "Hoạt động" },
    { id: 2, name: "Trần Thị B", role: "Người dân", status: "Đã khóa" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <table className="w-full bg-[#1b2838] text-left border border-gray-700 rounded-md">
        <thead>
          <tr className="bg-[#162436]">
            <th className="p-3 border-b border-gray-700">Họ tên</th>
            <th className="p-3 border-b border-gray-700">Chức vụ</th>
            <th className="p-3 border-b border-gray-700">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-[#20304a]">
              <td className="p-3 border-b border-gray-700">{u.name}</td>
              <td className="p-3 border-b border-gray-700">{u.role}</td>
              <td className="p-3 border-b border-gray-700">{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
