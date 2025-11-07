function TrangChu() {
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
              type="button" onClick={() => window.location.href='/report'}
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
              type="button" onClick={() => window.location.href='/cases'}
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
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                Xem thống kê
              </button>
            </div>
          </div>

          {/* Tin tức & cảnh báo */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Tin tức & Cảnh báo truy nã
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition"
                >
                  <img
                    src={`https://picsum.photos/seed/${item}/400/200`}
                    alt="tin tuc"
                    className="rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Tiêu đề bản tin {item}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mô tả ngắn về vụ án hoặc cảnh báo truy nã... (có thể cập nhật từ cơ sở dữ liệu sau này)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrangChu;
