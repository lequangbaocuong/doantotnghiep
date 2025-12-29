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

      formData.append("hoten", data.fullname);
      formData.append("email", data.email);
      formData.append("sodienthoai", data.phone);
      formData.append("cccd", data.cccd);
      formData.append("diachi", data.address);
      formData.append("gioitinh", data.gender || "khác"); 

      formData.append("loaitoipham", data.crimeType); 
      formData.append("vaitronguoidan", data.relation); 
      const tieudeTuDong = `Tố giác: ${data.crimeType} tại ${data.location}`;
      formData.append("tieude", tieudeTuDong);
      formData.append("noidung", data.description);
      formData.append("diachivuviec", data.location);
      formData.append("ngayxayra", data.ngayxayra); 
      formData.append("andanh", data.anonymous ? 1 : 0);

      if (data.relation === 'báo hộ') {
          formData.append("tenNanNhan", data.tenNanNhan || "");
          formData.append("sdtNanNhan", data.sdtNanNhan || "");
          formData.append("diachiNanNhan", data.diachiNanNhan || "");
          formData.append("gioitinhNanNhan", data.gioitinhNanNhan || "khác");
          formData.append("tinhtrangNanNhan", data.tinhtrangNanNhan || "còn sống");
      } else {
          formData.append("tinhtrangNanNhan", data.tinhtrangNanNhan || "còn sống");
      }

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
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={prevStep} 
          className="text-gray-600 hover:text-red-600 font-semibold flex items-center transition"
        >
          ← Quay lại chỉnh sửa
        </button>
        <h2 className="text-2xl font-bold text-gray-800">XÁC NHẬN THÔNG TIN</h2>
        <div className="w-20"></div>
      </div>

      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2 border-b border-blue-100 pb-2">
            👤 THÔNG TIN NGƯỜI GỬI (BẠN)
            {data.anonymous && (
              <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full ml-auto">
                🔒 Chế độ ẩn danh
              </span>
            )}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-gray-500 font-medium">Họ và tên:</span>
              <span className="font-semibold text-gray-800 text-base">{data.fullname}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Số điện thoại:</span>
              <span className="font-semibold text-gray-800">{data.phone}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">CCCD/CMND:</span>
              <span className="text-gray-800">{data.cccd}</span>
            </div>
            
            {data.relation === 'nạn nhân' && (
                 <div>
                    <span className="block text-gray-500 font-medium">Tình trạng sức khỏe:</span>
                    <span className={`font-bold uppercase ${data.tinhtrangNanNhan === 'bị thương' ? 'text-red-600' : 'text-green-600'}`}>
                        {data.tinhtrangNanNhan}
                    </span>
                 </div>
            )}
            
            <div className="md:col-span-2">
              <span className="block text-gray-500 font-medium">Địa chỉ thường trú:</span>
              <span className="text-gray-800">{data.address}</span>
            </div>
            <div className="md:col-span-2 mt-2 p-2 bg-blue-50 rounded text-blue-800 font-medium border border-blue-100">
              👉 Vai trò trong vụ việc: <span className="uppercase font-bold">{data.relation}</span>
            </div>
          </div>
        </div>

        {data.relation === 'báo hộ' && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2 border-b border-yellow-200 pb-2">
              🚑 THÔNG TIN NẠN NHÂN (NGƯỜI ĐƯỢC BÁO HỘ)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-gray-500 font-medium">Họ tên nạn nhân:</span>
                <span className="font-bold text-gray-800 text-base">{data.tenNanNhan}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Tình trạng:</span>
                <span className="font-bold text-red-600 uppercase">{data.tinhtrangNanNhan}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Số điện thoại:</span>
                <span className="text-gray-800">{data.sdtNanNhan || "Không có"}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Giới tính:</span>
                <span className="capitalize text-gray-800">{data.gioitinhNanNhan}</span>
              </div>
              <div className="md:col-span-2">
                <span className="block text-gray-500 font-medium">Nơi ở hiện tại:</span>
                <span className="text-gray-800">{data.diachiNanNhan}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
            📝 CHI TIẾT SỰ VIỆC
          </h3>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-500 font-medium">Loại tội phạm:</span>
                <span className="font-bold text-red-600 text-base capitalize">{data.crimeType}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Ngày xảy ra:</span>
                <span className="font-semibold text-gray-800">{data.ngayxayra}</span>
              </div>
            </div>
            
            <div>
              <span className="block text-gray-500 font-medium">Địa điểm xảy ra:</span>
              <span className="text-gray-800 font-medium">{data.location}</span>
            </div>

            <div>
              <span className="block text-gray-500 font-medium mb-1">Nội dung trình báo:</span>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-700 italic whitespace-pre-line">
                "{data.description}"
              </div>
            </div>

            <div>
              <span className="block text-gray-500 font-medium">Bằng chứng đính kèm:</span>
              {data.evidence && data.evidence.length > 0 ? (
                <div className="flex items-center gap-2 mt-1 text-green-700 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  {data.evidence.length} tệp tin ({data.evidenceType})
                </div>
              ) : (
                <span className="text-gray-400 italic">Không có tệp đính kèm</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition transform hover:-translate-y-1 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
          }`}
        >
          {loading ? "⏳ Đang gửi hồ sơ..." : "XÁC NHẬN & GỬI TỐ GIÁC"}
        </button>
      </div>
    </div>
  );
}