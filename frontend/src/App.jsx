import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
