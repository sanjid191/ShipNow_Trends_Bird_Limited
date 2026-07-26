import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import logoPurple from '../../assets/logo-purple.png';

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 flex lg:hidden items-center justify-between w-full h-16 px-4 bg-white border-b border-slate-200 shadow-sm md:shadow-none">
      {/* Left side: Hamburger on mobile, Search bar on desktop */}
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 md:hidden focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile Logo */}
        <div className="flex items-center gap-1 md:hidden">
          <img src={logoPurple} alt="ShipNow Logo" className="h-6 object-contain" />
          <span className="text-lg font-bold text-slate-900 leading-none">ShipNow</span>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center relative w-64 lg:w-80">
          <Search className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search shipments, invoices, warehouse..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right side: Notifications & User profile */}
      <div className="flex items-center gap-3">
        {/* Notification Icon */}
        <button 
          className="relative p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

        {/* User Profile dropdown info - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 select-none cursor-pointer">
          <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-600">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-slate-700">John Doe</span>
        </div>
      </div>
    </header>
  );
}
