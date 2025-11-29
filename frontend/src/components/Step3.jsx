import React, { useState } from "react";
import axios from "axios";

export default function ReportStep3({ data, prevStep }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();

      // --- 1. DỮ LIỆU NGƯỜI DÂN (Bảng nguoidan) ---
      formData.append("hoten", data.fullname);
      formData.append("email", data.email);
      formData.append("sodienthoai", data.phone);
      formData.append("cccd", data.cccd);
      formData.append("diachi", data.address);
      formData.append("gioitinh", data.gender || "khác"); 

      // --- 2. DỮ LIỆU TỐ GIÁC (Bảng dontogiac) ---
      // loaitoipham: Phải đúng giá trị ENUM ('trộm cắp tài sản', 'liên quan đến ma túy'...)
      formData.append("loaitoipham", data.crimeType); 
      
      // vaitronguoidan: ENUM ('nạn nhân', 'nhân chứng', 'nghi phạm')
      formData.append("vaitronguoidan", data.relation);

      // tieude: Tạo tự động vì form không có ô nhập tiêu đề riêng
      const tieudeTuDong = `Tố giác: ${data.crimeType} tại ${data.location}`;
      formData.append("tieude", tieudeTuDong);
      
      formData.append("noidung", data.description);
      formData.append("diachivuviec", data.location);
      formData.append("ngayxayra", data.ngayxayra); // Format YYYY-MM-DD
      formData.append("andanh", data.anonymous ? 1 : 0);

      // --- 3. DỮ LIỆU CHỨNG CỨ (Bảng chungcu) ---
      formData.append("loaichungcu", data.evidenceType);
      
      if (data.evidence && data.evidence.length > 0) {
        for (let i = 0; i < data.evidence.length; i++) {
          formData.append("files", data.evidence[i]);
        }
      }

      // Gửi xuống Backend
      const res = await axios.post(
        "http://localhost:5000/api/report/submit-report",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      alert("Gửi thành công! Mã tố giác của bạn là: " + res.data.id_togiac);

    } catch (error) {
      console.error("Lỗi khi gửi tố giác:", error);
      alert("Lỗi: " + (error.response?.data?.message || "Không thể gửi tố giác"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p
        onClick={prevStep}
        className="text-red-600 hover:text-red-700 font-medium cursor-pointer mb-6 inline-block text-left"
      >
        ← Quay lại bước trước
      </p>

      <h2 className="text-xl font-bold mb-6 text-gray-700">XÁC NHẬN GỬI TỐ GIÁC</h2>

      <div className="text-left bg-gray-50 p-6 rounded mb-6 text-sm text-gray-800 shadow-sm">
          <div className="mb-2"><strong>Người báo tin:</strong> {data.anonymous ? "Ẩn danh" : data.fullname}</div>
          <div className="mb-2"><strong>Vai trò:</strong> <span className="capitalize">{data.relation}</span></div>
          <div className="mb-2"><strong>Loại sự việc:</strong> {data.crimeType}</div>
          <div className="mb-2"><strong>Thời gian xảy ra:</strong> {data.ngayxayra}</div>
          <div className="mb-2"><strong>Địa điểm:</strong> {data.location}</div>
          <div className="italic text-gray-500 mt-2">"{data.description}"</div>
      </div>

      <p className="text-gray-600 mb-8 text-xs">
        *Vui lòng kiểm tra kỹ thông tin. Mọi hành vi báo tin giả sai sự thật sẽ chịu trách nhiệm trước pháp luật.
      </p>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-8 py-2 rounded text-white transition ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {loading ? "Đang xử lý..." : "Xác nhận & Gửi"}
      </button>
    </div>
  );
}