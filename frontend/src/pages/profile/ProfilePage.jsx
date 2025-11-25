import React, { useState, useEffect } from "react";
import axios from "axios"; 

export default function ProfilePage() {
  const [user, setUser] = useState(null); 
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        const apiUser = response.data;
        setUser({
          name: apiUser.hoten || "Đang cập nhật",
          email: apiUser.email || "Đang cập nhật",
          phone: apiUser.sodienthoai || "Đang cập nhật",
          cccd: apiUser.cccd || "Đang cập nhật",
          address: apiUser.diachi || "Chưa có dữ liệu địa chỉ trong DB",  
          ngaysinh: apiUser.ngaysinh ? new Date(apiUser.ngaysinh).toISOString().split('T')[0] : "",
          gioitinh: apiUser.gioitinh || "khác",
          role: "Người dân", 
          joinedDate: "11/11/2025", 
          avatar: "/public/avatar-default.png",
        });
        setLoading(false);

      } catch (err) {
        console.error("Lỗi khi tải thông tin cá nhân:", err);
        setError("Không thể tải thông tin cá nhân.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  if (loading) {
    return <div className="min-h-screen bg-[#0f1a26] text-white flex justify-center items-center">Đang tải...</div>;
  }

  if (error || !user) {
    return <div className="min-h-screen bg-[#0f1a26] text-red-400 flex justify-center items-center">{error || "Không có dữ liệu người dùng."}</div>;
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Lỗi: Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
    }
    try {
        const payload = {
            sodienthoai: user.phone, 
            email: user.email,
            gioitinh: user.gioitinh.toLowerCase(), 
            diachi: user.address,
        };
        const response = await axios.put("http://localhost:5000/api/auth/profile", payload, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        alert(response.data.message || "Cập nhật thành công!");
        setEditMode(false); 
    } catch (err) {
        console.error("Lỗi khi cập nhật thông tin:", err.response?.data);
        alert(`Cập nhật thất bại: ${err.response?.data?.message || "Lỗi server"}`);
    }
  };

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
              onClick={() => {
                if (editMode) {
                    handleSave(); 
                } else {
                    setEditMode(true);
                }
              }}
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
              disabled={true}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
            {editMode && (
              <p className="text-yellow-400 text-xs mt-1">
                Thông tin này không thể thay đổi!
              </p>
            )}
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
              disabled={true}
              onChange={(e) => setUser({ ...user, ngaysinh: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
            {editMode && (
              <p className="text-yellow-400 text-xs mt-1">
                Thông tin này không thể thay đổi!
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Giới tính</label>
            <select
              value={user.gioitinh}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, gioitinh: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            >
              <option value="nam">Nam</option>
              <option value="nữ">Nữ</option>
              <option value="khác">Khác</option>
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
              disabled={true} 
              onChange={(e) => setUser({ ...user, cccd: e.target.value })}
              className="w-full bg-[#162436] rounded-md px-4 py-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff5252]"
            />
            {editMode && (
              <p className="text-yellow-400 text-xs mt-1">
                Thông tin này không thể thay đổi!
              </p>
            )}
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
          {/* Lịch sử tố giác hiện tại đang là dữ liệu mock, cần một API khác để lấy dữ liệu thực tế */}
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