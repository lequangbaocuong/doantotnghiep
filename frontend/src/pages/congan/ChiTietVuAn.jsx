import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, MapPin, Calendar, FileText, UserPlus, Paperclip, Download, Image, Video } from "lucide-react";
import axios from "axios";

export default function ChiTietVuAn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vuAn, setVuAn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cases/${id}`)
      .then(res => {
        setVuAn(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-white p-10">Đang tải dữ liệu...</div>;
  if (!vuAn) return <div className="text-white p-10">Không tìm thấy vụ án</div>;

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      {/* Header */}
      <button onClick={() => navigate("/congan/caselists")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#ff5252] uppercase">{vuAn.tenvuan}</h1>
          <p className="text-gray-400 mt-1">Mã vụ án: <span className="font-mono text-white">{vuAn.id_vuan}</span></p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/50 rounded-full text-sm capitalize">
                {vuAn.trangthai}
            </span>
            <span className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/50 rounded-full text-sm capitalize">
                {vuAn.mucdo}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: Thông tin chung */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Thẻ thông tin */}
            <div className="bg-[#1b2838] p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#4ECDC4]">
                    <FileText size={20}/> Nội dung vụ việc
                </h2>
                <p className="text-gray-300 whitespace-pre-line">{vuAn.mota}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-700">
                    <div>
                        <p className="text-gray-500 text-sm">Ngày khởi tố</p>
                        <p className="font-medium flex items-center gap-2">
                            <Calendar size={16} /> {new Date(vuAn.ngaytao).toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Cán bộ thụ lý</p>
                        <p className="font-medium">{vuAn.nguoitao || "Admin"}</p>
                    </div>
                </div>
            </div>

            {/* DANH SÁCH NGHI PHẠM */}
            <div className="bg-[#1b2838] p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-[#FF6B6B]">
                        <User size={20}/> Danh sách nghi phạm
                    </h2>
                    <button 
                        onClick={() => navigate('/congan/themnghipham', { state: { id_vuan: vuAn.id_vuan, tenvuan: vuAn.tenvuan } })}
                        className="flex items-center gap-2 bg-[#2e4a68] hover:bg-[#3d5e82] text-sm px-3 py-1.5 rounded transition"
                    >
                        <UserPlus size={16}/> Thêm nghi phạm
                    </button>
                </div>

                {vuAn.ds_nghipham && vuAn.ds_nghipham.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-[#162436] text-gray-400 uppercase text-xs">
                                <tr>
                                    {/* SỬA CỘT NÀY: Thay Hình ảnh thành Mã nghi phạm */}
                                    <th className="px-4 py-3">Mã nghi phạm</th>
                                    <th className="px-4 py-3">Họ tên</th>
                                    <th className="px-4 py-3">CCCD</th>
                                    <th className="px-4 py-3">Tình trạng</th>
                                    <th className="px-4 py-3">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {vuAn.ds_nghipham.map((np) => (
                                    <tr key={np.id_nghipham} className="hover:bg-[#22344a]">
                                        {/* SỬA DỮ LIỆU CỘT NÀY: Hiển thị ID text thay vì thẻ <img> */}
                                        <td className="px-4 py-3 font-mono text-[#4ECDC4]">
                                            {np.id_nghipham}
                                        </td>
                                        
                                        <td className="px-4 py-3 font-medium text-white">{np.hoten}</td>
                                        <td className="px-4 py-3">{np.cccd}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                np.tinhtrangbatgiu === 'đang bắt giữ' ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'
                                            }`}>
                                                {np.tinhtrangbatgiu}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-blue-400 cursor-pointer hover:underline"
                                            onClick={() => navigate(`/congan/nghipham/${np.id_nghipham}`)}
                                        >
                                            Xem
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 border border-dashed border-gray-600 rounded-lg">
                        Chưa xác định được nghi phạm nào.
                    </div>
                )}
            </div>
        </div>

        {/* CỘT PHẢI: Thông tin khác */}
        <div className="space-y-6">
            <div className="bg-[#1b2838] p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-bold mb-3 text-gray-300">Nguồn gốc vụ án</h3>
                {vuAn.dontogiac ? (
                    <div className="space-y-3 text-sm">
                        <p><span className="text-gray-500">Mã đơn:</span> {vuAn.dontogiac.id_togiac}</p>
                        <p><span className="text-gray-500">Tiêu đề:</span> {vuAn.dontogiac.tieude}</p>
                        <p><span className="text-gray-500">Địa điểm:</span> {vuAn.dontogiac.diachivuviec}</p>
                        <button 
                            onClick={() => navigate(`/congan/danhsachtogiac/${vuAn.dontogiac.id_togiac}`)}
                            className="text-[#ff5252] hover:underline text-xs"
                        >
                            Xem chi tiết đơn tố giác &rarr;
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm italic">Vụ án được khởi tố trực tiếp, không qua đơn tố giác.</p>
                )}
            </div>
        </div>

        <div className="bg-[#1b2838] p-6 rounded-xl border border-gray-700 mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#f9ca24]">
                <Paperclip size={20}/> Tài liệu & Chứng cứ thu thập
            </h2>

            {vuAn.ds_chungcu && vuAn.ds_chungcu.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vuAn.ds_chungcu.map((cc) => (
                        <div key={cc.id_chungcu} className="bg-[#0f1a26] p-3 rounded border border-gray-600 flex gap-3 hover:border-[#f9ca24] transition group">
                            {/* Icon loại file */}
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded text-gray-400 shrink-0">
                                {cc.loaichungcu === 'hình ảnh' ? <Image size={24}/> : 
                                cc.loaichungcu === 'video' ? <Video size={24}/> : <FileText size={24}/>}
                            </div>

                            <div className="overflow-hidden flex-1">
                                <p className="font-bold text-sm text-white truncate capitalize">{cc.loaichungcu}</p>
                                <p className="text-xs text-gray-400 line-clamp-1">{cc.mota}</p>
                                <p className="text-[10px] text-gray-500 mt-1">
                                    Ngày gửi: {new Date(cc.ngaygui).toLocaleDateString('vi-VN')}
                                </p>
                            </div>

                            {/* Nút tải/xem */}
                            <a 
                                href={`http://localhost:5000${cc.duongdantaptin}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f9ca24] text-black opacity-0 group-hover:opacity-100 transition"
                                title="Xem/Tải xuống"
                            >
                                <Download size={16}/>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6 text-gray-500 border border-dashed border-gray-600 rounded-lg text-sm">
                    Chưa có chứng cứ nào được ghi nhận.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}