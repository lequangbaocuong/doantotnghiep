import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/HomePage";
import Login from "../pages/Login";
import ReportPage from "../pages/reports/MainReportPage";
import CaseLists from "../pages/listofcases/CaseLists";
import SubmitEvidences from "../pages/listofcases/SubmitEvidences";
import ThongKePage from "../pages/thongke/StatisticsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import ResetPassword from "../pages/ResetPassword";

export default function AppRoutes() {
    return (  
        <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/login" element={<Login />} />
            
            /* Các trang người dân cần đăng nhập mới xem được */
            <Route element={<ProtectedRoute />}>
                <Route path="/report" element={<ReportPage />} />
                <Route path="/cases" element={<CaseLists />} /> 
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/evidence/:id" element={<SubmitEvidences />} />
            <Route path="/statistics" element={<ThongKePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
}