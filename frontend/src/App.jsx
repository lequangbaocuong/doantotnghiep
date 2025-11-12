import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./pages/admin/routes/admin_routes" // import routes riêng của admin

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Nếu đang ở /admin thì chỉ hiển thị layout admin
  if (isAdminRoute) {
    return <AdminRoutes />;
  }

  // Còn lại hiển thị layout của trang thường
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
