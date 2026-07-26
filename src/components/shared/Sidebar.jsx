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
  LogOut 
} from 'lucide-react';
import logoPurple from '../../assets/logo-purple.png';
import logoWhite from '../../assets/logo-white.png';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, isImplemented: true },
  { name: 'Shipments', path: '/shipments', icon: Package, isImplemented: true },
  { name: 'Invoices & Billing', path: '/invoices', icon: Receipt, isImplemented: true },
  { name: 'Warehouse', path: '/warehouse', icon: Warehouse, isImplemented: true },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, isImplemented: false },
  { name: 'Calendar', path: '/calendar', icon: Calendar, isImplemented: false },
  { name: 'Tracking', path: '/tracking', icon: Map, isImplemented: false },
  { name: 'Fleets', path: '/fleets', icon: Car, isImplemented: false },
  { name: 'Drivers', path: '/drivers', icon: Users, isImplemented: false },
];

export default function Sidebar({ isMobileOpen, onClose }) {
  const activeClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-white bg-primary-600 shadow-sm font-medium transition-all duration-200";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-medium transition-all duration-200";

  const activeRailClass = "flex flex-col items-center justify-center p-3 rounded-lg text-white bg-primary-600 shadow-sm transition-all duration-200";
  const inactiveRailClass = "flex flex-col items-center justify-center p-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200";

  // Sidebar contents
  const sidebarContent = (isTablet = false) => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo Area */}
      <div className={`flex items-center ${isTablet ? 'justify-center py-6' : 'px-6 py-5'} border-b border-slate-100`}>
        {isTablet ? (
          <img src={logoPurple} alt="Logo" className="h-8 w-8 object-contain" />
        ) : (
          <div className="flex items-center gap-2">
            <img src={logoPurple} alt="ShipNow Logo" className="h-8 object-contain" />
            <span className="text-xl font-bold font-heading text-slate-900">Ship<span className="text-primary-600">Now</span></span>
          </div>
        )}
      </div>

      {/* Nav List */}
      <nav className={`flex-1 overflow-y-auto py-6 ${isTablet ? 'px-2 space-y-4' : 'px-4 space-y-1'} no-scrollbar`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return isTablet ? (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => isActive ? activeRailClass : inactiveRailClass}
              title={item.name}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-1 font-medium scale-90 origin-center text-center leading-none">{item.name.split(' ')[0]}</span>
            </NavLink>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
              onClick={() => isMobileOpen && onClose && onClose()}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User / Profile Footer Area */}
      <div className={`p-4 border-t border-slate-100 bg-slate-50/50 ${isTablet ? 'flex justify-center' : ''}`}>
        {isTablet ? (
          <NavLink 
            to="/login"
            className="p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </NavLink>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary-100 text-primary-600 font-bold font-heading rounded-full flex items-center justify-center">
                JD
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-slate-800 leading-tight">John Doe</p>
                <p className="text-xs text-slate-500 truncate">john.doe@shipnow.com</p>
              </div>
            </div>
            <NavLink 
              to="/login" 
              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 select-none">
        {sidebarContent(false)}
      </aside>

      {/* Tablet Rail Sidebar Layout */}
      <aside className="hidden md:block lg:hidden w-20 h-screen sticky top-0 shrink-0 select-none">
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
          <aside className="relative flex flex-col w-64 max-w-xs h-full bg-white shadow-xl animate-slide-in-left select-none z-10">
            {sidebarContent(false)}
          </aside>
        </div>
      )}
    </>
  );
}
