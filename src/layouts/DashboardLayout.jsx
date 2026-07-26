import React, { useState } from 'react';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-slate-50">
      {/* Sidebar navigation */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Main viewport area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header bar */}
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Dynamic page content container */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
