import React from "react";

export default function CongAnPhuong() {
  return (
    <div className="flex-grow bg-[#0f1a26] text-white px-10 py-10">

      {/* TIÊU ĐỀ */}
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff5252] uppercase">
        Trang quản lý - Công an phường Sơn Trà
      </h1>

      {/* PHẦN GIỚI THIỆU */}
      <div className="bg-[#1b2838] rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">

        <p className="text-gray-300 leading-relaxed text-lg text-justify">
          Chào mừng bạn đến với hệ thống quản lý vụ án, tố giác – phản ánh và truy nã của 
          <span className="text-[#ff5252] font-semibold"> Công an phường Sơn Trà</span>.
          <br /><br />
          Tại đây, cán bộ công an có thể dễ dàng thực hiện các tác vụ như:
        </p>

        <ul className="mt-4 space-y-3 text-gray-300 text-lg">
          <li>• Tiếp nhận & xử lý danh sách tố giác của người dân</li>
          <li>• Tạo và quản lý hồ sơ các vụ án</li>
          <li>• Theo dõi thông tin nghi phạm, vật chứng, kế hoạch điều tra</li>
          <li>• Đăng tải & cập nhật thông tin truy nã</li>
        </ul>

        <p className="text-gray-400 mt-6 italic text-sm">
          Lưu ý: Hãy sử dụng thanh menu Sidebar bên trái để truy cập các chức năng tương ứng.
        </p>
      </div>
    </div>
  );
}
