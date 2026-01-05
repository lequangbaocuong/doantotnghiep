import React, { useEffect, useState } from "react";
import { Search, Eye, Filter, Ban } from "lucide-react"; // Thêm icon Ban (biển cấm) cho đẹp
import axios from "axios";
import { Link } from "react-router-dom";

export default function DanhSachToGiac() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Gọi API lấy danh sách mới nhất để đảm bảo trạng thái được cập nhật
    axios.get("http://localhost:5000/api/report/reports") 
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "chưa xử lý":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      case "đang xử lý":
        return "bg-blue-500/20 text-blue-500 border-blue-500/50";
      case "đã xử lý":
        return "bg-green-500/20 text-green-500 border-green-500/50";
      case "từ chối":
        return "bg-red-500/20 text-red-500 border-red-500/50";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const filtered = reports.filter(r => {
    const matchesSearch = 
      r.tieude?.toLowerCase().includes(search.toLowerCase()) ||
      r.id_togiac?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || r.trangthai === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#ff5252] mb-2 uppercase">
          Quản lý tin báo tố giác tội phạm
        </h1>
        <p className="text-gray-400 text-center mb-8">Danh sách các tin báo gửi từ cổng thông tin người dân</p>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-[#1b2838] p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center gap-3 flex-1 bg-[#0f1a26] px-4 py-2 rounded-lg border border-gray-600 w-full">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm theo mã hồ sơ hoặc tiêu đề..."
              className="bg-transparent w-full outline-none text-white placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-[#ff5252]" size={20} />
            <select 
              className="bg-[#0f1a26] text-white border border-gray-600 rounded-lg px-4 py-2 outline-none focus:border-[#ff5252]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="chưa xử lý">Chưa xử lý</option>
              <option value="đang xử lý">Đang xử lý</option>
              <option value="đã xử lý">Đã xử lý</option>
              <option value="từ chối">Từ chối</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg border border-gray-700">
          <table className="w-full text-left bg-[#1b2838]">
            <thead>
              <tr className="bg-[#162029] text-gray-400 text-sm uppercase tracking-wider border-b border-gray-700">
                <th className="px-6 py-4">Mã tố giác</th>
                <th className="px-6 py-4">Tiêu đề & Loại tội phạm</th>
                <th className="px-6 py-4">Thời gian gửi</th>
                <th className="px-6 py-4">Ẩn danh</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                 <tr><td colSpan={6} className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500 italic" colSpan={6}>
                    Không tìm thấy dữ liệu phù hợp
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id_togiac}
                    className="hover:bg-[#243447] transition duration-150 ease-in-out group"
                  >
                    <td className="px-6 py-4 font-mono text-[#ff5252] font-semibold">
                      {item.id_togiac}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white mb-1 line-clamp-1" title={item.tieude}>
                        {item.tieude}
                      </div>
                      <div className="text-xs text-gray-400 bg-gray-700/50 inline-block px-2 py-0.5 rounded capitalize">
                        {item.loaitoipham}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(item.ngaygui).toLocaleDateString("vi-VN")}<br/>
                      <span className="text-xs text-gray-500">{new Date(item.ngaygui).toLocaleTimeString("vi-VN")}</span>
                    </td>
                    <td className="px-6 py-4">
                        {item.andanh ? (
                            <span className="text-gray-400 text-xs italic">Có (Ẩn danh)</span>
                        ) : (
                            <span className="text-green-400 text-xs">Không</span>
                        )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.trangthai)} capitalize`}>
                        {item.trangthai}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {item.trangthai === "từ chối" ? (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 bg-gray-700 text-gray-500 px-3 py-1.5 rounded-md text-sm border border-gray-600 cursor-not-allowed opacity-70"
                          title="Đơn này đã bị từ chối tiếp nhận"
                        >
                          <Ban size={16} /> Đã hủy
                        </button>
                      ) : (
                        <Link
                          to={`/congan/danhsachtogiac/${item.id_togiac}`}
                          className="inline-flex items-center gap-2 bg-[#ff5252] hover:bg-[#ff3b3b] text-white px-3 py-1.5 rounded-md text-sm transition shadow-lg shadow-red-900/20"
                        >
                          <Eye size={16} /> Chi tiết
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right text-gray-500 text-xs">
            Tổng số: {filtered.length} tin báo
        </div>
      </div>
    </div>
  );
}