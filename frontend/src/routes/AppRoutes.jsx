import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/HomePage";
import Login from "../pages/Login";

export default function AppRoutes() {
    return (  
        <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}