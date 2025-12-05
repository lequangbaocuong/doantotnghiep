import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import AppRoutes from "./routes/AppRoutes"; // Route của dân
import Congan_Routes from "./routes/congan_routes";

function AppContent() {
  const location = useLocation();
  
  const isInternalApp = 
      location.pathname.startsWith("/congan") || 
      location.pathname.startsWith("/thutruong") ||
      location.pathname.startsWith("/admin"); 

  if (isInternalApp) {
    return <Congan_Routes />;
  }
  
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