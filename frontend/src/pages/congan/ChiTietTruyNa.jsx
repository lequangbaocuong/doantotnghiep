import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, MapPin, AlertTriangle, FileText, User } from "lucide-react";
import axios from "axios";

export default function ChiTietTruyNa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300x400?text=No+Image";
    if (path.startsWith("http")) return path;
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/wanted/detail/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert("Không tìm thấy dữ liệu!");
        navigate("/congan/duyettruyna");
      });
  }, [id, navigate]);

  const handleAction = async (status) => {
    if (!window.confirm(`Bạn chắc chắn muốn ${status === 'đã duyệt' ? 'DUYỆT' : 'TỪ CHỐI'} lệnh này?`)) return;

    try {
      await axios.put(`http://localhost:5000/api/wanted/update-status/${id}`, { trangthai: status });
      alert("✅ Đã xử lý thành công!");
      navigate("/thutruong/duyet-truy-na"); 
    } catch (error) {
      alert("❌ Lỗi khi xử lý!");
    }
  };

  if (loading) return <div className="p-10 text-white text-center">Đang tải hồ sơ...</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-xl overflow-hidden border-2 border-[#ff5252] shadow-lg shadow-red-900/20 relative">
            <img 
              src={getImageUrl(data.anh)} 
              alt={data.hoten} 
              className="w-full h-auto object-cover aspect-[3/4]"
            />
            <div className="absolute top-0 right-0 bg-[#ff5252] text-white px-3 py-1 text-sm font-bold">
               {data.mucdo}
            </div>
          </div>
          
          <div className="bg-[#1b2838] p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2"><User size={16}/> Người đăng tải</h3>
            <p className="font-mono text-[#4ECDC4]">{data.id_canbo}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-[#ff5252] uppercase mb-2">{data.hoten}</h1>
            <div className="flex flex-wrap gap-4 text-gray-300">
               <span className="bg-gray-800 px-3 py-1 rounded">Tuổi: <b className="text-white">{data.tuoi}</b></span>
               <span className="bg-gray-800 px-3 py-1 rounded">Giới tính: <b className="text-white capitalize">{data.gioitinh}</b></span>
               <span className="bg-gray-800 px-3 py-1 rounded">Trạng thái: <b className="text-yellow-400 capitalize">{data.trangthai}</b></span>
            </div>
          </div>

          <div className="bg-[#1b2838] p-6 rounded-xl border border-gray-700 space-y-4">
            <div>
                <h3 className="text-[#ff5252] font-semibold mb-1 flex items-center gap-2"><AlertTriangle size={18}/> Tội danh</h3>
                <p className="text-xl text-white font-bold uppercase">{data.toidanh}</p>
            </div>
            
            <div className="h-px bg-gray-700 my-2"></div>

            <div>
                <h3 className="text-[#4ECDC4] font-semibold mb-1 flex items-center gap-2"><MapPin size={18}/> Nơi ở / Lẩn trốn</h3>
                <p className="text-gray-300">{data.diachi || "Chưa xác định"}</p>
            </div>

            <div className="h-px bg-gray-700 my-2"></div>

            <div>
                <h3 className="text-[#4ECDC4] font-semibold mb-1 flex items-center gap-2"><FileText size={18}/> Đặc điểm nhận dạng & Mô tả</h3>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                    {data.mota}
                </p>
            </div>
          </div>

          <div className="bg-[#1b2838] p-6 rounded-xl border border-t-4 border-t-[#ff5252] flex flex-col md:flex-row items-center justify-between gap-4">
             <div>
                <h3 className="font-bold text-lg">Quyết định phê duyệt</h3>
                <p className="text-sm text-gray-400">Vui lòng kiểm tra kỹ thông tin trước khi duyệt đăng tải công khai.</p>
             </div>
             <div className="flex gap-3">
                <button 
                   onClick={() => handleAction("từ chối")}
                   className="flex items-center gap-2 px-6 py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-bold"
                >
                   <XCircle size={20}/> Từ chối
                </button>
                <button 
                   onClick={() => handleAction("đã duyệt")}
                   className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-bold shadow-lg shadow-green-900/50"
                >
                   <CheckCircle size={20}/> DUYỆT ĐĂNG TẢI
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}