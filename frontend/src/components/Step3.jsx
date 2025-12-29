import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReportStep3({ data, prevStep }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      const token = localStorage.getItem("token");

      // --- 1. DỮ LIỆU NGƯỜI BÁO TIN (Lấy từ form hoặc token) ---
      formData.append("hoten", data.fullname);
      formData.append("email", data.email);
      formData.append("sodienthoai", data.phone);
      formData.append("cccd", data.cccd);
      formData.append("diachi", data.address);
      formData.append("gioitinh", data.gender || "khác"); 

      // --- 2. DỮ LIỆU ĐƠN TỐ GIÁC ---
      formData.append("loaitoipham", data.crimeType); 
      formData.append("vaitronguoidan", data.relation);
      const tieudeTuDong = `Tố giác: ${data.crimeType} tại ${data.location}`;
      formData.append("tieude", tieudeTuDong);
      formData.append("noidung", data.description);
      formData.append("diachivuviec", data.location);
      formData.append("ngayxayra", data.ngayxayra); 
      formData.append("andanh", data.anonymous ? 1 : 0);

      // --- 3. DỮ LIỆU NẠN NHÂN (TIẾNG VIỆT) ---
      if (data.relation === 'đại diện') {
          formData.append("guiHo", "true"); // Đánh dấu là gửi hộ
          formData.append("tenNanNhan", data.tenNanNhan || "");
          formData.append("sdtNanNhan", data.sdtNanNhan || "");
          formData.append("diachiNanNhan", data.diachiNanNhan || "");
          formData.append("gioitinhNanNhan", data.gioitinhNanNhan || "khác");
          formData.append("tinhtrangNanNhan", data.tinhtrangNanNhan || "còn sống");
      } else {
          // Nếu tự báo, vẫn gửi tình trạng sức khỏe
          formData.append("tinhtrangNanNhan", data.tinhtrangNanNhan || "còn sống");
      }

      // --- 4. CHỨNG CỨ ---
      formData.append("loaichungcu", data.evidenceType);
      if (data.evidence && data.evidence.length > 0) {
        for (let i = 0; i < data.evidence.length; i++) {
          formData.append("files", data.evidence[i]);
        }
      }

      const res = await axios.post(
        "http://localhost:5000/api/report/submit-report",
        formData,
        {
          headers: { 
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
          }
        }
      );

      alert("✅ Gửi thành công! Mã tố giác của bạn là: " + res.data.id_togiac);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi gửi tố giác:", error);
      alert("❌ Lỗi: " + (error.response?.data?.message || "Không thể gửi tố giác"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p onClick={prevStep} className="text-red-600 hover:text-red-700 font-medium cursor-pointer mb-6 inline-block text-left">
        ← Quay lại bước trước
      </p>

      <h2 className="text-xl font-bold mb-6 text-gray-700">XÁC NHẬN GỬI TỐ GIÁC</h2>

      <div className="text-left bg-gray-50 p-6 rounded border border-gray-200 mb-6 text-sm text-gray-800 shadow-sm">
          <div className="mb-2 border-b pb-2">
            <strong>Người báo tin:</strong> {data.anonymous ? "Ẩn danh" : data.fullname}
          </div>
          
          <div className="mb-2"><strong>Vai trò:</strong> <span className="capitalize text-blue-600 font-bold">{data.relation}</span></div>
          
          {/* HIỂN THỊ THÔNG TIN NẠN NHÂN (GỬI HỘ) */}
          {data.relation === 'đại diện' && (
             <div className="mb-2 ml-2 pl-2 border-l-2 border-yellow-400 bg-yellow-50 py-1">
                 <div><strong>Nạn nhân:</strong> {data.tenNanNhan}</div>
                 <div><strong>Tình trạng:</strong> {data.tinhtrangNanNhan}</div>
             </div>
          )}

          <div className="mb-2 mt-2"><strong>Loại sự việc:</strong> {data.crimeType}</div>
          <div className="mb-2"><strong>Thời gian:</strong> {data.ngayxayra}</div>
          <div className="mb-2"><strong>Địa điểm:</strong> {data.location}</div>
          <div className="italic text-gray-500 mt-2 bg-white p-2 rounded border">"{data.description}"</div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-8 py-2 rounded text-white transition font-bold shadow-lg ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {loading ? "Đang gửi hồ sơ..." : "Xác nhận & Gửi"}
      </button>
    </div>
  );
}