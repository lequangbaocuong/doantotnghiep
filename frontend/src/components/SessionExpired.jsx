import React from "react";
import { AlertTriangle, LogOut } from "lucide-react";

export default function SessionExpired({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border-t-4 border-red-500 transform transition-all scale-100">

            <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                    <AlertTriangle size={40} className="text-red-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Phiên đăng nhập hết hạn
                </h3>
            
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Phiên làm việc của bạn đã kết thúc. Vui lòng đăng nhập lại.
                </p>

                <button
                    onClick={onConfirm}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/30"
                >
                    <LogOut size={20} />
                    Đăng nhập lại ngay
                </button>
            </div>

        </div>
    </div>
  );
}