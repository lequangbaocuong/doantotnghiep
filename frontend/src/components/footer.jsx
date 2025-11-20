import React from "react";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1a26] text-gray-300 pt-10 pb-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-[#ff5252] w-6 h-6" />
            <h2 className="text-lg font-bold text-white">
              CỔNG THÔNG TIN ĐIỀU TRA TỘI PHẠM
            </h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hệ thống quản lý và truy vết tội phạm trực tuyến, phục vụ công tác
            điều tra, thống kê và chia sẻ thông tin giữa các đơn vị thuộc Bộ Công An.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            LIÊN KẾT NHANH
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#ff5252] transition cursor-pointer">
              Trang chủ
            </li>
            <li className="hover:text-[#ff5252] transition cursor-pointer">
              Hồ sơ tội phạm
            </li>  
            <li className="hover:text-[#ff5252] transition cursor-pointer">
              Vụ án
            </li>
            <li className="hover:text-[#ff5252] transition cursor-pointer">
              Báo cáo & thống kê
            </li>
            <li className="hover:text-[#ff5252] transition cursor-pointer">
              Liên hệ
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            THÔNG TIN LIÊN HỆ
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="text-[#ff5252] w-5 h-5 mt-0.5" />
              <span>
                 37 Đ. Trần Hưng Đạo, Nại Hiên Đông, Sơn Trà, Đà Nẵng<br />
                (Trụ sở Công an phường Sơn Trà)
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-[#ff5252] w-5 h-5" />
              <span>Hotline: 0236 3831 139</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
