import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, MapPin } from "lucide-react";

export default function WantedSection() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/wanted/approved")
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  }, []);

  if (list.length === 0) return null; // Nếu không có thì ẩn luôn

  return (
    <section className="py-12 bg-[#0f1a26]">
      <div className="container mx-auto px-4">
        
        {/* Tiêu đề mục */}
        <div className="flex items-center justify-center gap-3 mb-10">
            <AlertTriangle className="text-[#ff5252] w-8 h-8 animate-pulse" />
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">
                Lệnh truy nã mới nhất
            </h2>
        </div>

        {/* Grid danh sách */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((item) => (
                <div key={item.id_truyna} className="bg-[#1b2838] border border-red-900/50 rounded-lg overflow-hidden shadow-lg hover:shadow-red-900/20 transition group">
                    {/* Ảnh */}
                    <div className="h-64 overflow-hidden relative">
                        <img 
                            src={`http://localhost:5000${item.anh}`} 
                            alt={item.hoten} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-0 right-0 bg-[#ff5252] text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                            {item.mucdo}
                        </div>
                    </div>

                    {/* Thông tin */}
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-[#ff5252] mb-1">{item.hoten}</h3>
                        <p className="text-white font-medium mb-3 uppercase text-sm tracking-wide">{item.toidanh}</p>
                        
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-4">
                            <MapPin size={14} />
                            <span className="truncate max-w-[200px]">{item.diachi}</span>
                        </div>

                        <button className="w-full py-2 border border-[#ff5252] text-[#ff5252] rounded hover:bg-[#ff5252] hover:text-white transition uppercase text-xs font-bold">
                            Xem chi tiết / Báo tin
                        </button>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}