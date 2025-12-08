import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, BarChart, Activity } from "lucide-react";

export default function PhanTichVuAn() {
  const [stats, setStats] = useState({
    total: 0,
    nghiemtrong: 0,
    itnghiemtrong: 0,
    dangxuly: 0,
    daketthuc: 0
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/cases").then(res => {
        const data = res.data;
        if(Array.isArray(data)) {
            const nghiemtrong = data.filter(c => c.mucdo === 'nghiêm trọng' || c.mucdo === 'rất nghiêm trọng').length;
            const itnghiemtrong = data.filter(c => c.mucdo === 'ít nghiêm trọng').length;
            const dangxuly = data.filter(c => c.trangthai?.toLowerCase().includes('đang')).length;
            const daketthuc = data.filter(c => c.trangthai?.toLowerCase().includes('kết thúc')).length;
            
            setStats({
                total: data.length,
                nghiemtrong, itnghiemtrong, dangxuly, daketthuc
            });
        }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#4ECDC4] uppercase">
        Phân tích tình hình tội phạm
      </h1>
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#1b2838] p-6 rounded-xl border-l-4 border-[#ff5252] shadow-lg">
              <p className="text-gray-400 mb-1">Tổng số vụ án</p>
              <p className="text-4xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[#1b2838] p-6 rounded-xl border-l-4 border-[#FFA502] shadow-lg">
              <p className="text-gray-400 mb-1">Nghiêm trọng & Rất NT</p>
              <p className="text-4xl font-bold text-[#FFA502]">{stats.nghiemtrong}</p>
          </div>
          <div className="bg-[#1b2838] p-6 rounded-xl border-l-4 border-[#4ECDC4] shadow-lg">
              <p className="text-gray-400 mb-1">Đang điều tra</p>
              <p className="text-4xl font-bold text-[#4ECDC4]">{stats.dangxuly}</p>
          </div>
          <div className="bg-[#1b2838] p-6 rounded-xl border-l-4 border-green-500 shadow-lg">
              <p className="text-gray-400 mb-1">Tỷ lệ phá án</p>
              <p className="text-4xl font-bold text-green-500">
                  {stats.total > 0 ? ((stats.daketthuc / stats.total) * 100).toFixed(1) : 0}%
              </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1b2838] p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <PieChart /> Tỷ lệ mức độ nghiêm trọng
              </h3>
              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between mb-1 text-sm">
                          <span>Nghiêm trọng / Rất nghiêm trọng</span>
                          <span>{stats.nghiemtrong}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-[#ff5252] h-2.5 rounded-full" style={{ width: `${(stats.nghiemtrong/stats.total)*100}%` }}></div>
                      </div>
                  </div>
                  <div>
                      <div className="flex justify-between mb-1 text-sm">
                          <span>Ít nghiêm trọng</span>
                          <span>{stats.itnghiemtrong}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-[#FFA502] h-2.5 rounded-full" style={{ width: `${(stats.itnghiemtrong/stats.total)*100}%` }}></div>
                      </div>
                  </div>
              </div>
          </div>

       
          <div className="bg-[#1b2838] p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity /> Tiến độ xử lý
            </h3>
              
            <div className="flex items-end justify-around h-40 gap-4">
              <div className="w-16 bg-blue-500/20 border border-blue-500 rounded-t-lg relative group h-full flex items-end justify-center">
                <div className="w-full bg-blue-500 hover:bg-blue-400 transition-all rounded-t-lg" style={{ height: `${(stats.dangxuly/stats.total)*100}%` }}></div>
                <span className="absolute -bottom-8 text-xs text-gray-400">Đang xử lý</span>
                <span className="absolute top-2 text-white font-bold">{stats.dangxuly}</span>
            </div>
            <div className="w-16 bg-green-500/20 border border-green-500 rounded-t-lg relative group h-full flex items-end justify-center">
              <div className="w-full bg-green-500 hover:bg-green-400 transition-all rounded-t-lg" style={{ height: `${(stats.daketthuc/stats.total)*100}%` }}></div>
              <span className="absolute -bottom-8 text-xs text-gray-400">Hoàn tất</span>
              <span className="absolute top-2 text-white font-bold">{stats.daketthuc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}