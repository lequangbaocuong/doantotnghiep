import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, MapPin, FileText, AlertOctagon, Edit, FileWarning, Camera } from "lucide-react";
import axios from "axios";

export default function ChiTietNghiPham() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (path) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) {
            return path;
        }
        return `http://localhost:5000${path}`;
    };

    const handleCreateWanted = () => {
        if (!data) return;
        navigate('/congan/dangtaitruyna', { 
            state: { 
                prefillData: {
                    hoten: data.hoten,
                    gioitinh: data.gioitinh,
                    ngaysinh: data.ngaysinh,
                    diachi: data.diachi,
                    anh: data.anh,
                    mota: `Nghi phạm thuộc vụ án: ${data.hosovuan ? data.hosovuan.tenvuan : 'Chưa rõ'}`
                }
            } 
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/suspects/${id}`)
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#0f1a26] text-white p-10 flex justify-center">Đang tải dữ liệu...</div>;
    if (!data) return <div className="min-h-screen bg-[#0f1a26] text-white p-10 text-center">Không tìm thấy thông tin nghi phạm</div>;

    return (
        <div className="min-h-screen bg-[#0f1a26] text-white p-8">
            <div className="max-w-5xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
                >
                    <ArrowLeft size={20} /> Quay lại vụ án
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="bg-[#1b2838] p-6 rounded-2xl border border-gray-700 h-fit text-center sticky top-8">
                        
                        <div className="w-full max-w-[250px] mx-auto aspect-[3/4] bg-[#0f1a26] rounded-xl overflow-hidden border border-gray-600 shadow-lg mb-6 relative group">
                            {data.anh ? (
                                <img 
                                    src={getImageUrl(data.anh)}
                                    alt={data.hoten} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://via.placeholder.com/250x330?text=No+Image";
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-[#162436]">
                                    <User size={80} strokeWidth={1} />
                                    <span className="text-sm mt-2 font-medium">Chưa có ảnh chân dung</span>
                                </div>
                            )}
                            
                             <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-xs py-1 text-gray-300 backdrop-blur-sm flex items-center justify-center gap-1">
                                <Camera size={12}/> Ảnh nghi phạm
                             </div>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">{data.hoten}</h1>
                        <p className="text-gray-400 text-sm mb-4 font-mono">ID: {data.id_nghipham}</p>

                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border ${
                            data.tinhtrangbatgiu === 'đang bắt giữ' 
                            ? 'bg-red-900/30 text-red-400 border-red-500/50' 
                            : 'bg-green-900/30 text-green-400 border-green-500/50'
                        }`}>
                            <AlertOctagon size={16} />
                            <span className="capitalize">{data.tinhtrangbatgiu}</span>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-600">
                            <button 
                                onClick={handleCreateWanted}
                                className="w-full flex items-center justify-center gap-2 bg-[#ff5252] hover:bg-red-600 text-white py-2 rounded-lg font-bold transition shadow-lg shadow-red-900/40"
                            >
                                <FileWarning size={20} />
                                Phát lệnh truy nã
                            </button>
                        </div>
                    </div>


                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#1b2838] p-8 rounded-2xl border border-gray-700 relative">
                            <button 
                                className="absolute top-6 right-6 text-gray-400 hover:text-[#ff5252] transition" 
                                title="Chỉnh sửa thông tin"
                                onClick={() => navigate(`/congan/suanghipham/${id}`)}>
                                <Edit size={20} />
                            </button>
                            
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#4ECDC4] border-b border-gray-700 pb-2">
                                <User /> Thông tin nghi phạm
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 text-sm">
                                <div>
                                    <p className="text-gray-500 mb-1">Họ và tên</p>
                                    <p className="text-lg font-medium text-white">{data.hoten}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1">Giới tính</p>
                                    <p className="text-lg font-medium text-white capitalize">{data.gioitinh}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1">Ngày sinh / Năm sinh</p>
                                    <p className="text-lg font-medium text-white flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400"/>
                                        {data.ngaysinh 
                                            ? (isNaN(new Date(data.ngaysinh)) ? data.ngaysinh : new Date(data.ngaysinh).toLocaleDateString('vi-VN'))
                                            : "Chưa rõ"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1">Số CCCD/CMND</p>
                                    <p className="text-lg font-medium text-white font-mono tracking-wide">{data.cccd || "---"}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-gray-500 mb-1">Địa chỉ thường trú</p>
                                    <p className="text-lg font-medium text-white flex items-center gap-2">
                                        <MapPin size={16} className="text-[#ff5252]"/>
                                        {data.diachi || "Chưa cập nhật"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1b2838] p-8 rounded-2xl border border-gray-700">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#FFA502] border-b border-gray-700 pb-2">
                                <FileText /> Hồ sơ vụ án liên quan
                            </h2>
                            
                            {data.hosovuan ? (
                                <div className="bg-[#0f1a26] p-4 rounded-lg border border-gray-600 flex justify-between items-center hover:border-[#FFA502] transition cursor-pointer"
                                    onClick={() => navigate(`/congan/chitietvuan/${data.hosovuan.id_vuan}`)}
                                >
                                    <div>
                                        <p className="text-[#FFA502] font-bold text-lg mb-1">{data.hosovuan.tenvuan}</p>
                                        <p className="text-gray-400 text-sm">Mã vụ án: {data.hosovuan.id_vuan}</p>
                                    </div>
                                    <span className="text-gray-500 text-sm">Bấm để xem &rarr;</span>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Không tìm thấy thông tin vụ án liên quan.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}