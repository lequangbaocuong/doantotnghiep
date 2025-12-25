import React from "react";
import { Routes, Route } from "react-router-dom";

import CongAnLayout from "../layouts/CongAn_mainLayout"; 
import ThuTruongLayout from "../layouts/ThuTruong_mainLayout";

import CongAnPhuong from "../pages/congan/CongAnPhuong";
import ThuTruongDonVi from "../pages/congan/ThuTruong";
import CongAn_CaseLists from "../pages/congan/CongAn_CaseLists";
import DangTaiTruyNa from "../pages/congan/DangTaiTruyNa";
import TaoHoSoVuAn from "../pages/congan/TaoHoSoVuAn";
import PhanTichVuAn from "../pages/congan/PhanTichVuAn";
import PhanCongDieuTra from "../pages/congan/PhanCongDieuTra";
import DuyetTruyNa from "../pages/congan/DuyetTruyNa";
import DanhSachToGiac from "../pages/congan/DanhSachToGiac";
import ChiTietToGiac from "../pages/congan/ChiTietToGiac";
import LoginCanBo from "../pages/congan/CongAn_DangNhap"; 
import ThemNghiPham from "../pages/congan/ThemNghiPham";
import ChiTietVuAn from "../pages/congan/ChiTietVuAn";
import ChiTietNghiPham from "../pages/congan/ChiTietNghiPham";
import AdminLayout from "../pages/admin/Layout";
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUser";
import CreateAccount from "../components/CreateAccount";
import QuanLyTruyNa from "../pages/admin/QuanLyTruyNa";
import ProtectedRouteCanBo from "../components/ProtectedRoute_Canbo";
import ManageCitizenAccounts from "../pages/admin/ManageCitizen";
import CapNhatNghiPham from "../pages/congan/CapNhatNghiPham";

export default function Congan_Routes() {
    return (  
        <Routes>
            <Route path="/congan/login" element={<LoginCanBo />} />
            
            <Route element={<ProtectedRouteCanBo />}>
                <Route element={<CongAnLayout />}>
                    <Route path="/congan" element={<CongAnPhuong />} /> 
                    <Route path="/congan/caselists" element={<CongAn_CaseLists />} />
                    <Route path="/congan/themnghipham" element={<ThemNghiPham />} />
                    <Route path="/congan/dangtaitruyna" element={<DangTaiTruyNa />} />
                    <Route path="/congan/taohosovuan" element={<TaoHoSoVuAn />} />
                    <Route path="/congan/danhsachtogiac" element={<DanhSachToGiac />} />
                    <Route path="/congan/danhsachtogiac/:id" element={<ChiTietToGiac />} />
                    <Route path="/congan/chitietvuan/:id" element={<ChiTietVuAn />} />
                    <Route path="/congan/nghipham/:id" element={<ChiTietNghiPham />} />
                    <Route path="/congan/suanghipham/:id" element={<CapNhatNghiPham />} />
                </Route>

                <Route element={<ThuTruongLayout />}>
                    <Route path="/thutruong" element={<ThuTruongDonVi />} />
                    <Route path="/thutruong/phan-tich-vu-an" element={<PhanTichVuAn />} />
                    <Route path="/thutruong/phan-cong-dieu-tra" element={<PhanCongDieuTra />} />
                    <Route path="/thutruong/duyet-truy-na" element={<DuyetTruyNa />} />
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/create-account" element={<CreateAccount />} />
                    <Route path="/admin/posts" element={<QuanLyTruyNa />} />
                    <Route path="/admin/accounts" element={<ManageCitizenAccounts />} />
                </Route>
            </Route>
        </Routes>
    );
}
