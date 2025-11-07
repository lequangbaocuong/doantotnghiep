import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/HomePage";
import Login from "../pages/Login";
import ReportPage from "../pages/reports/MainReportPage";
import CaseLists from "../pages/listofcases/CaseLists";
import SubmitEvidences from "../pages/listofcases/SubmitEvidences";

export default function AppRoutes() {
    return (  
        <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/cases" element={<CaseLists />} />
            <Route path="/evidence/:id" element={<SubmitEvidences />} />
        </Routes>
    );
}