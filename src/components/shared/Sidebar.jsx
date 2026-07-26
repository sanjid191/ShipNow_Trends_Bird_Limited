import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  Warehouse, 
  BarChart3, 
  Calendar, 
  Map, 
  Car, 
  Users, 
  LogOut,
  MessageSquare,
  Bell,
  Settings,
  ChevronDown
} from 'lucide-react';
import logoPurple from '../../assets/logo-purple.png';
import avatarImg from '../../assets/avatar.png';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, isImplemented: true },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, isImplemented: false },
  { name: 'Calendar', path: '/calendar', icon: Calendar, isImplemented: false },
  { name: 'Shipments', path: '/shipments', icon: Package, isImplemented: true },
  { name: 'Tracking', path: '/tracking', icon: Map, isImplemented: false },
  { name: 'Warehouse', path: '/warehouse', icon: Warehouse, isImplemented: true },
  { name: 'Fleets', path: '/fleets', icon: Car, isImplemented: false },
  { name: 'Drivers', path: '/drivers', icon: Users, isImplemented: false },
  { name: 'Invoices & Billing', path: '/invoices', icon: Receipt, isImplemented: true },
];

export default function Sidebar({ isMobileOpen, onClose }) {
  // 100% accurate colors matching mockup
  const activeClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#6366F1] bg-[#EEF2FF] font-bold text-xs transition-all duration-200";
  const inactiveClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-semibold text-xs transition-all duration-200";

  const activeRailClass = "flex flex-col items-center justify-center p-3 rounded-lg text-[#6366F1] bg-[#EEF2FF] transition-all duration-200";
  const inactiveRailClass = "flex flex-col items-center justify-center p-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200";

  // Sidebar contents
  const sidebarContent = (isTablet = false) => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 text-xs">
      
      {/* 1. Logo Area */}
      <div className={`flex items-center ${isTablet ? 'justify-center py-6' : 'px-6 py-5'} border-b border-slate-100`}>
        {isTablet ? (
          <img src={logoPurple} alt="Logo" className="h-7 w-7 object-contain" />
        ) : (
          <div className="flex items-center gap-2 select-none">
            <img src={logoPurple} alt="ShipNow Logo" className="h-6 object-contain" />
            <span className="text-lg font-black tracking-wider italic leading-none text-slate-900">
              SHIPNOW
            </span>
          </div>
        )}
      </div>

      {/* 2. User Info Widget - Card Shape */}
      {!isTablet && (
        <div className="px-4 pt-4 select-none">
          <div className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-xl transition-all cursor-pointer">
            <div className="flex items-center gap-2.5">
              <img 
                src={avatarImg} 
                alt="John Doe Profile" 
                className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <p className="font-bold text-slate-800 leading-tight">John Doe</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Admin</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
          </div>
        </div>
      )}

      {/* 3. Navigation List */}
      <nav className={`flex-1 overflow-y-auto py-4 ${isTablet ? 'px-2 space-y-4' : 'px-4 space-y-0.5'} no-scrollbar`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return isTablet ? (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => isActive ? activeRailClass : inactiveRailClass}
              title={item.name}
            >
              <Icon className="h-4.5 w-4.5" />
              <span className="text-[9px] mt-1 font-medium scale-90 origin-center text-center leading-none truncate max-w-[60px]">{item.name.split(' ')[0]}</span>
            </NavLink>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
              onClick={() => isMobileOpen && onClose && onClose()}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}

        {/* Thin divider */}
        {!isTablet && <div className="h-[1px] bg-slate-100 my-4" />}

        {/* 4. Sub links with Badges (Message, Notifications, Settings) */}
        {!isTablet && (
          <div className="space-y-0.5">
            <NavLink
              to="/messages"
              className={inactiveClass}
              onClick={() => isMobileOpen && onClose && onClose()}
            >
              <MessageSquare className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1">Message</span>
              <span className="bg-[#6366F1] text-white text-[9px] font-bold h-4.5 w-7 rounded-full flex items-center justify-center shrink-0">19</span>
            </NavLink>
            <NavLink
              to="/notifications"
              className={inactiveClass}
              onClick={() => isMobileOpen && onClose && onClose()}
            >
              <Bell className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1">Notification</span>
              <span className="bg-[#6366F1] text-white text-[9px] font-bold h-4.5 w-7 rounded-full flex items-center justify-center shrink-0">5</span>
            </NavLink>
            <NavLink
              to="/settings"
              className={inactiveClass}
              onClick={() => isMobileOpen && onClose && onClose()}
            >
              <Settings className="h-4.5 w-4.5 shrink-0" />
              <span>Settings</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* 5. Go Pro Footer Promo card */}
      {!isTablet && (
        <div className="p-4 border-t border-slate-100 select-none">
          <div className="relative bg-slate-900 text-white p-4.5 rounded-2xl overflow-hidden shadow-md flex flex-col gap-1">
            {/* Diagonal overlay background graphics */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#6366F1]/10 transform translate-x-4 -translate-y-4 rotate-45 pointer-events-none" />
            <div className="absolute top-2 right-2 flex items-end gap-0.5 opacity-20 pointer-events-none">
              <div className="w-1 h-3 bg-white rounded-xs transform -skew-x-12" />
              <div className="w-1 h-4 bg-white rounded-xs transform -skew-x-12" />
            </div>

            <h4 className="font-extrabold text-sm leading-tight text-white">
              Loving<br />ShipNow<br />Free?
            </h4>
            <p className="text-[9px] leading-relaxed text-slate-400 font-medium mt-1">
              Go Pro to access priority support, real-time tracking, and full analytics.
            </p>
            <button className="w-full bg-white text-slate-950 font-bold py-2 rounded-xl text-[10px] hover:bg-slate-50 transition-colors shadow-sm mt-3 cursor-pointer">
              Go Pro Today
            </button>
          </div>
        </div>
      )}

      {/* Simple log out button for tablet rail */}
      {isTablet && (
        <div className="p-4 border-t border-slate-100 flex justify-center">
          <NavLink 
            to="/login"
            className="p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Log Out"
          >
            <LogOut className="h-4.5 w-4.5" />
          </NavLink>
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 select-none z-30">
        {sidebarContent(false)}
      </aside>

      {/* Tablet Rail Sidebar Layout */}
      <aside className="hidden md:block lg:hidden w-20 h-screen sticky top-0 shrink-0 select-none z-30">
        {sidebarContent(true)}
      </aside>

      {/* Mobile Drawer Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
          />
          {/* Drawer Panel */}
          <aside className="relative flex flex-col w-64 max-w-xs h-full bg-white shadow-xl animate-slide-in-left select-none z-50">
            {sidebarContent(false)}
          </aside>
        </div>
      )}
    </>
  );
}
