import React from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import SidebarCongAn from "../components/CongAn_Sidebar"; // Đảm bảo đúng đường dẫn

export default function CongAnLayout() {
  return (
    <div className="flex w-full min-h-screen bg-[#0f1a26]">
      <SidebarCongAn />

      <main className="flex-grow overflow-auto h-screen">
        <Outlet /> 
      </main>
    </div>
  );
}