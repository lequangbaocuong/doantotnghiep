import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Nhớ import axios
import WantedSection from "../components/WantedSection";
import SessionExpired from "../components/SessionExpired"; // Import Modal vừa tạo

function TrangChu() {
  const navigate = useNavigate();
  
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);

  const handleProtectedAction = async (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
        setShowSessionModal(true);
        return;
    }

    try {
        setCheckingAuth(true); // Bật loading
        await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }
        });
        navigate(path);

    } catch (error) {
        console.error("Token hết hạn hoặc không hợp lệ:", error);
        localStorage.removeItem("token");
    } finally {
        setCheckingAuth(false); 
    }
  };

  const handleRedirectLogin = () => {
      setShowSessionModal(false);
      navigate('/login');
  };

  return (
    <div className="App relative">
      
      {showSessionModal && (
        <SessionExpired onConfirm={handleRedirectLogin} />
      )}

      {checkingAuth && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center cursor-wait">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                <span className="font-medium text-blue-800">Đang kiểm tra bảo mật...</span>
            </div>
        </div>
      )}

      <main className="flex-grow bg-gray-50 text-gray-800">
        <section className="container mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-blue-800">
              HỆ THỐNG HỖ TRỢ ĐIỀU TRA TỘI PHẠM PHƯỜNG SƠN TRÀ
            </h1>
            <p className="text-gray-600 mt-3">
              Cung cấp công cụ tiếp nhận tố giác, quản lý hồ sơ vụ án, và theo dõi tình hình an ninh địa phương.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Gửi tố giác / phản ánh
              </h2>
              <p className="text-gray-600 mb-4">
                Người dân có thể gửi thông tin, hình ảnh, hoặc bằng chứng về các hành vi phạm tội, vi phạm pháp luật.
              </p>
              <button 
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full md:w-auto"
                type="button" 
                onClick={() => handleProtectedAction('/report')}
              >
                Gửi tố giác ngay
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Tra cứu và gửi chứng cứ vụ án 
              </h2>
              <p className="text-gray-600 mb-4">
                Cán bộ và người dân có thể xem thông tin về các vụ án đang điều tra, và gửi chứng cứ cần thiết để phục vụ mục đích điều tra
              </p>
              <button 
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 w-full md:w-auto"
                type="button" 
                onClick={() => handleProtectedAction('/cases')}
              >
                Xem danh sách vụ án
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Thống kê & tình hình an ninh
              </h2>
              <p className="text-gray-600 mb-4">
                Cập nhật nhanh chóng tình hình tội phạm, số vụ án, tỷ lệ phá án, và mức độ an ninh tại địa phương.
              </p>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 w-full md:w-auto"
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