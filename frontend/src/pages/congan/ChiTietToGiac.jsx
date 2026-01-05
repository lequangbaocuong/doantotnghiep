import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Clock, MapPin, FileText, Shield, AlertTriangle, CheckCircle, Smartphone, Mail, Home, XCircle } from "lucide-react";
import axios from "axios";

export default function ChiTietToGiac() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const handleReject = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn TỪ CHỐI đơn tố giác này không?")) return;
    try {
      await axios.put(`http://localhost:5000/api/report/update-status/${id}`, { 
        trangthai: "từ chối" 
      });
      alert("Đã từ chối đơn tố giác.");
      setData(prev => ({ ...prev, trangthai: "từ chối" }));
      
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/report/reports/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Không thể tải dữ liệu hoặc đơn tố giác không tồn tại.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1a26] text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5252]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1a26] text-white flex flex-col justify-center items-center gap-4">
        <AlertTriangle className="text-yellow-500 w-16 h-16" />
        <p className="text-xl">{error}</p>
        <button onClick={() => navigate(-1)} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Quay lại</button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "chưa xử lý": return "text-yellow-400 border-yellow-400 bg-yellow-400/10";
      case "đang xử lý": return "text-blue-400 border-blue-400 bg-blue-400/10";
      case "đã xử lý": return "text-green-400 border-green-400 bg-green-400/10";
      case "từ chối": return "text-red-400 border-red-400 bg-red-400/10";
      default: return "text-gray-400 border-gray-400";
    }
  };

  const handleCreateCase = () => {
    navigate('/congan/taohosovuan', { 
      state: { 
        prefillData: {
          id_togiac: data.id_togiac,
          tieude: data.tieude,
          noidung: data.noidung,
          mucdo: data.loaitoipham 
        }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <button
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} /> Quay lại danh sách
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#ff5252] uppercase tracking-wide">
              Chi tiết tố giác
            </h1>
            <p className="text-gray-400 text-sm mt-1">Mã hồ sơ: <span className="font-mono text-white">{data.id_togiac}</span></p>
          </div>
          
          <div className={`px-4 py-2 rounded-full border ${getStatusColor(data.trangthai)} font-semibold uppercase text-sm tracking-wider flex items-center gap-2`}>
            <CheckCircle size={16} />
            {data.trangthai}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#4ECDC4]">
                <FileText /> Nội dung vụ việc
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs uppercase font-bold">Tiêu đề</label>
                  <p className="text-lg font-medium">{data.tieude}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase font-bold">Loại tội phạm</label>
                    <p className="bg-gray-700/50 px-3 py-1 rounded inline-block mt-1 capitalize">{data.loaitoipham}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase font-bold">Vai trò người báo</label>
                    <p className="capitalize">{data.vaitronguoidan || "Chưa xác định"}</p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs uppercase font-bold">Nội dung chi tiết</label>
                    <div className="bg-[#0f1a26] p-4 rounded-lg mt-1 text-gray-300 leading-relaxed whitespace-pre-line border border-gray-700">
                      {data.noidung}
                    </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#FFD93D]">
                <Clock /> Thời gian & Địa điểm
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Thời gian gửi đơn</p>
                  <p className="font-medium text-white">{new Date(data.ngaygui).toLocaleString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Thời gian xảy ra sự việc</p>
                  <p className="font-medium text-white">
                    {data.ngayxayra ? new Date(data.ngayxayra).toLocaleDateString('vi-VN') : "Không rõ"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm mb-1">Địa điểm xảy ra</p>
                  <p className="font-medium text-white flex items-center gap-2">
                    <MapPin className="text-[#ff5252]" size={18}/> {data.diachivuviec}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
              <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700 h-full">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#A29BFE]">
                  <User /> Người báo tin
                </h2>

                {data.andanh ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center bg-[#0f1a26] rounded-lg border border-dashed border-gray-600">
                    <Shield size={48} className="text-gray-500 mb-3" />
                    <p className="text-gray-300 font-medium">Người gửi ẩn danh</p>
                    <p className="text-gray-500 text-sm px-4">Thông tin cá nhân đã được ẩn theo yêu cầu của người tố giác.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold">
                        {data.nguoidan?.hoten?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{data.nguoidan?.hoten}</p>
                        <p className="text-gray-400 text-sm">CCCD: {data.nguoidan?.cccd || "---"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Smartphone size={18} className="text-gray-500"/>
                        <span>{data.nguoidan?.sodienthoai || "Không có SĐT"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail size={18} className="text-gray-500"/>
                        <span>{data.nguoidan?.email || "Không có Email"}</span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-300">
                        <Home size={18} className="text-gray-500 mt-1"/>
                        <span>{data.nguoidan?.diachi || "Không có địa chỉ"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700">
                <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Tác vụ quản lý</h2>
                  <div className="flex flex-col gap-3">
                    {data.trangthai !== "từ chối" && data.trangthai !== "đã xử lý" && (
                        <button 
                            onClick={handleReject}
                            className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-500 py-2 rounded text-gray-200 font-medium transition flex items-center justify-center gap-2"
                        >
                            <XCircle size={18} /> Từ chối tiếp nhận
                        </button>
                    )}

                    <button
                      onClick={handleCreateCase} 
                      disabled={data.trangthai === "từ chối"}
                      className={`w-full py-2 rounded text-white font-medium transition flex items-center justify-center gap-2
                        ${data.trangthai === "từ chối" 
                            ? "bg-red-900/50 text-gray-500 cursor-not-allowed" 
                            : "bg-[#ff5252] hover:bg-red-700"}`}
                    >
                      <CheckCircle size={18} /> Tạo hồ sơ vụ án
                    </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}