import { Outlet } from "react-router-dom";
import SidebarThuTruong from "../components/ThuTruong_Sidebar"; 

export default function ThuTruongLayout() {
  return (
    <div className="flex w-full min-h-screen bg-[#0f1a26]">
      <SidebarThuTruong />
      <main className="flex-grow overflow-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}