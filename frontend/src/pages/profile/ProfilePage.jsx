import React, { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Lê Quang Bảo Cường",
    email: "lequangbaocuong@gmail.com",
    phone: "0935089651",
    cccd: "048123456789",
    address: "K52/52 Lâm Hoành, Phường An Hải, Quận Sơn Trà, TP. Đà Nẵng",
    ngaysinh: "2003-09-06",
    gioitinh: "Nam",
    role: "Người dân",
    joinedDate: "11/11/2025",
    avatar: "/public/avatar-default.png",
  });

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <div className="max-w-4xl mx-auto bg-[#1b2838] rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252]">
          TRANG CÁ NHÂN NGƯỜI DÙNG
        </h1>

        {/* Ảnh đại diện */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-[#ff5252]"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-[#ff5252] p-2 rounded-full cursor-pointer hover:bg-[#e04848] transition">
                <input type="file" className="hidden" />
                📷
              </label>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">Vai trò: {user.role}</p>
            <p className="text-gray-400">
              Ngày tham gia: {user.joinedDate}
            </p>
            <button
              onClick={() => setEditMode(!editMode)}
              className="mt-3 px-5 py-2 rounded-md bg-[#ff5252] hover:bg-[#e04848] transition"
            >
              {editMode ? "Lưu thay đổi" : "Chỉnh sửa thông tin"}
            </button>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Thông tin cá nhân */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-1">Họ và tên</label>
            <input
              type="text"
              value={user.name}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">Ngày sinh</label>
            <input
              type="date"
              value={user.ngaysinh}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, ngaysinh: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Giới tính</label>
            <select
              value={user.gioitinh}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, gioitinh: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Số điện thoại</label>
            <input
              type="text"
              value={user.phone}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">CCCD</label>
            <input
              type="text"
              value={user.cccd}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, cccd: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-400 mb-1">Địa chỉ</label>
            <input
              type="text"
              value={user.address}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
          </div>
        </div>

        {/* Lịch sử tố giác */}
        <hr className="border-gray-700 my-8" />
        <h3 className="text-xl font-semibold mb-4 text-[#ff5252]">
          LỊCH SỬ TỐ GIÁC / PHẢN ÁNH
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-gray-300 text-sm">
            <thead className="bg-[#162436] text-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Tiêu đề</th>
                <th className="px-4 py-2 text-left">Ngày gửi</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700 hover:bg-[#1f3248] transition">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Phản ánh trộm xe tại đường Nguyễn Văn Thoại</td>
                <td className="px-4 py-2">12/08/2025</td>
                <td className="px-4 py-2 text-yellow-400">Đang xử lý</td>
              </tr>
              <tr className="border-t border-gray-700 hover:bg-[#1f3248] transition">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Tố giác hành vi buôn bán ma túy</td>
                <td className="px-4 py-2">03/05/2025</td>
                <td className="px-4 py-2 text-green-400">Đã giải quyết</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
