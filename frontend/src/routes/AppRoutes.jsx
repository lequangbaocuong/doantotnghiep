import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/HomePage";
import Login from "../pages/Login";
import ReportPage from "../pages/reports/MainReportPage";
import CaseLists from "../pages/listofcases/CaseLists";
import SubmitEvidences from "../pages/listofcases/SubmitEvidences";
import ThongKePage from "../pages/thongke/StatisticsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import CongAnPhuong from "../pages/congan/CongAnPhuong";
import ThuTruongDonVi from "../pages/congan/ThuTruong";
import CongAn_CaseLists from "../pages/congan/CongAn_CaseLists";
import DangTaiTruyNa from "../pages/congan/DangTaiTruyNa";
import TaoHoSoVuAn from "../pages/congan/TaoHoSoVuAn";
import PhanTichVuAn from "../pages/congan/PhanTichVuAn";
import PhanCongDieuTra from "../pages/congan/PhanCongDieuTra";
import DuyetTruyNa from "../pages/congan/DuyetTruyNa";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import LoginSuccess from "../components/LoginSuccess";
export default function AppRoutes() {
    return (  
        <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/cases" element={<CaseLists />} />
            <Route path="/evidence/:id" element={<SubmitEvidences />} />
            <Route path="/statistics" element={<ThongKePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/congan" element={<CongAnPhuong />} />
            <Route path="/congan/caselists" element={<CongAn_CaseLists />} />
            <Route path="/congan/dangtaitruyna" element={<DangTaiTruyNa />} />
            <Route path="/congan/taohosovuan" element={<TaoHoSoVuAn />} />
            <Route path="/thutruong" element={<ThuTruongDonVi />} />
            <Route path="/thutruong/phan-tich-vu-an" element={<PhanTichVuAn />} />
            <Route path="/thutruong/phan-cong-dieu-tra" element={<PhanCongDieuTra />} />
            <Route path="/thutruong/duyet-truy-na" element={<DuyetTruyNa />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/login-success" element={<LoginSuccess />} />  
        </Routes>
    );
}