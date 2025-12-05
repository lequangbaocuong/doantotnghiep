import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteCanBo() {

  const token = localStorage.getItem("token_canbo"); 
  if (!token) {
    alert("Bạn cần phải đăng nhập để truy cập vào trang này!");
    return <Navigate to="/congan/login"/>;
  }
  return <Outlet />;
}
