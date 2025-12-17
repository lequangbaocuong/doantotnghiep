import React from "react";
import { useNavigate } from "react-router-dom";
import WantedSection from "../components/WantedSection";

function TrangChu() {

  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    const token = localStorage.getItem("token");
    if (!token && (path === '/report' || path === '/cases')) {
        alert("Bạn cần đăng nhập để sử dụng chức năng này!");
        navigate('/login');
    } else {
        navigate(path);
    }
  };

  return (
    <div className="App">
      {/* Nội dung chính */}
      <main className="flex-grow bg-gray-50 text-gray-800">
        <section className="container mx-auto px-4 py-10">
          {/* Tiêu đề giới thiệu */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-blue-800">
              HỆ THỐNG HỖ TRỢ ĐIỀU TRA TỘI PHẠM PHƯỜNG SƠN TRÀ
            </h1>
            <p className="text-gray-600 mt-3">
              Cung cấp công cụ tiếp nhận tố giác, quản lý hồ sơ vụ án, và theo dõi tình hình an ninh địa phương.
            </p>
          </div>

          {/* Khu vực chức năng chính */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Gửi tố giác */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Gửi tố giác / phản ánh
              </h2>
              <p className="text-gray-600 mb-4">
                Người dân có thể gửi thông tin, hình ảnh, hoặc bằng chứng về các hành vi phạm tội, vi phạm pháp luật.
              </p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                type="button" onClick={() => handleNavigate('/report')}
              >
                Gửi tố giác ngay
              </button>
            </div>
            {/* Tra cứu vụ án */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Tra cứu và gửi chứng cứ vụ án 
              </h2>
              <p className="text-gray-600 mb-4">
                Cán bộ và người dân có thể xem thông tin về các vụ án đang điều tra, và gửi chứng cứ cần thiết để phục vụ mục đích điều tra
              </p>
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                type="button" onClick={() => handleNavigate('/cases')}
              >
                Xem danh sách vụ án
              </button>
            </div>
            {/* Thống kê an ninh */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Thống kê & tình hình an ninh
              </h2>
              <p className="text-gray-600 mb-4">
                Cập nhật nhanh chóng tình hình tội phạm, số vụ án, tỷ lệ phá án, và mức độ an ninh tại địa phương.
              </p>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              type="button" onClick={() => window.location.href='/statistics'}
              >
                Xem thống kê
              </button>
            </div>
          </div>

          <WantedSection />
          
        </section>
      </main>
    </div>
  );
}

export default TrangChu;
