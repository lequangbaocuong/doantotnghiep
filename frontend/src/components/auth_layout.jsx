import React from "react";

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[#0f1a26] flex flex-col items-center justify-center text-gray-100 px-6">
      <div className="bg-[#1b2838] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo-police.png" alt="Logo" className="h-16 mb-2" />
          <h2 className="text-xl font-bold text-[#ff5252]">{title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            Cổng truy cập dành cho công dân
          </p>
        </div>
        {children}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} Bộ Công An Việt Nam
      </p>
    </div>
  );
}
