import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/HomePage";
import Login from "../pages/Login";
import ReportPage from "../pages/reports/MainReportPage";

export default function AppRoutes() {
    return (  
        <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<ReportPage />} />
        </Routes>
    );
}