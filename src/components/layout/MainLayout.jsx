
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdPopup from "@/components/AdPopup";
import AdPlaceholder from "@/components/AdPlaceholder";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <AdPlaceholder />
      <main className="flex-grow container py-6 sm:py-8 max-w-screen-lg">
        <Outlet />
      </main>
      <Footer />
      <AdPopup />
    </div>
  );
};

export default MainLayout;
