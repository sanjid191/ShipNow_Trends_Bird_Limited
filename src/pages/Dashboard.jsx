import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  Activity, 
  DollarSign, 
  Truck, 
  Navigation,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Data
import { 
  dashboardStats, 
  shipmentStatistics, 
  profitSummary, 
  shipmentTypeDistribution, 
  productCategoriesDistribution, 
  liveTrackingData, 
  dashboardAlerts, 
  recentActivity,
  recentShipments
} from '../data/dashboardData';

// UI
import Card from '../components/ui/Card';
import StatusChip from '../components/ui/StatusChip';
import mapBg from '../assets/map-placeholder.png';

export default function Dashboard() {
  const navigate = useNavigate();
  const [trackingIdSearch, setTrackingIdSearch] = useState('');

  // Stats Mapping
  const statCards = [
    { 
      title: "Active Shipments", 
      value: dashboardStats.activeShipments.val, 
      change: dashboardStats.activeShipments.change, 
      note: dashboardStats.activeShipments.note,
      isPositive: true,
      icon: Truck,
      iconBg: "bg-indigo-100 text-[#6366F1]"
    },
    { 
      title: "Delivery Performance", 
      value: dashboardStats.deliveryPerformance.val, 
      change: dashboardStats.deliveryPerformance.change, 
      note: dashboardStats.deliveryPerformance.note,
      isPositive: false,
      icon: Activity,
      iconBg: "bg-purple-100 text-purple-600"
    },
    { 
      title: "Revenue", 
      value: dashboardStats.revenue.val, 
      change: dashboardStats.revenue.change, 
      note: dashboardStats.revenue.note,
      isPositive: true,
      icon: DollarSign,
      iconBg: "bg-slate-100 text-slate-800"
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* Top Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hello John!</span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-0.5">Good Morning</h1>
        </div>
        <button
          onClick={() => navigate('/shipments/create')}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all rounded-xl shadow-md cursor-pointer shrink-0"
        >
          <span>+ Add New Shipping</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                <p className="text-3xl font-extrabold text-slate-900 font-heading leading-none">{card.value}</p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    card.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {card.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {card.change}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{card.note}</span>
                </div>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Volume & Profit Summaries (2 Columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Shipment Volume Bar Chart */}
          <Card 
            title="Shipment Statistic" 
            subtitle="4,352 Total Shipments (+8.7% growth)"
            actions={
              <select className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer">
                <option>Last Year</option>
                <option>Last Month</option>
              </select>
            }
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shipmentStatistics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }} />
                  <Bar dataKey="shipments" radius={[4, 4, 0, 0]}>
                    {shipmentStatistics.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.month === 'May' ? '#6366F1' : '#E2E8F0'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Profit Summary Grouped Bar Chart */}
          <Card 
            title="Profit Summary" 
            subtitle="$624,550 Total Cumulative Revenue"
            actions={
              <select className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer">
                <option>Last 8 Months</option>
                <option>Last Quarter</option>
              </select>
            }
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitSummary} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" fill="#0F172A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Side: Shipment Type Donut (1 Column) */}
        <Card 
          title="Shipment Type" 
          subtitle="Breakdown of shipping transports"
        >
          <div className="flex flex-col items-center justify-center h-full">
            {/* Chart Hole Overlay wrapper */}
            <div className="relative h-44 w-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipmentTypeDistribution}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {shipmentTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Inner Hole text label */}
              <div className="absolute text-center flex flex-col items-center justify-center select-none pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Shipment</span>
                <span className="text-2xl font-black font-heading text-slate-800 leading-tight">2,500</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
              {shipmentTypeDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md shrink-0" style={{ backgroundColor: entry.color }} />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{entry.percentage}%</p>
                    <p className="text-[10px] font-medium text-slate-400 truncate">{entry.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Mid Widgets Section: Product Categories, Map, and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Product Categories (Column 1) */}
        <Card 
          title="Product Categories" 
          subtitle="Total Products: 1,000"
        >
          <div className="space-y-4">
            {productCategoriesDistribution.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-slate-400">{cat.count} products ({cat.percentage}%)</span>
                </div>
                {/* Custom Progress Bar container */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Tracking Map Panel (Column 2) */}
        <Card 
          title="Live Shipment Tracking" 
          subtitle="Real-time transit updates"
          bodyClassName="p-0 relative flex flex-col h-[350px]"
        >
          {/* Map area */}
          <div className="relative flex-1 bg-slate-900 overflow-hidden w-full h-full">
            <img 
              src={mapBg} 
              alt="Logistics Map Placeholder" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 select-none pointer-events-none"
            />
            
            {/* SVG Overlaid Route path */}
            <svg className="absolute inset-0 w-full h-full select-none pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Route Line */}
              <path 
                d="M 25 55 Q 50 40, 75 35" 
                fill="none" 
                stroke="#6366F1" 
                strokeWidth="1.2" 
                strokeDasharray="4 2" 
              />
            </svg>

            {/* Pins on Map absolute */}
            {/* Origin Pin (San Francisco) */}
            <div className="absolute top-[52%] left-[23%] z-20 flex flex-col items-center">
              <MapPin className="h-4 w-4 text-emerald-500 fill-emerald-50" />
            </div>

            {/* Current Position Pin (Transit Vehicle Icon) */}
            <div className="absolute top-[37%] left-[55%] z-30 flex items-center justify-center h-8 w-8 bg-[#6366F1] text-white rounded-full shadow-lg border border-white animate-pulse">
              <Navigation className="h-3.5 w-3.5 rotate-90" />
            </div>

            {/* Destination Pin (New York) */}
            <div className="absolute top-[31%] left-[73%] z-20 flex flex-col items-center">
              <MapPin className="h-4 w-4 text-indigo-500 fill-indigo-50" />
            </div>

            {/* Floating details overlay card */}
            <div className="absolute bottom-3 left-3 right-3 z-30 bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-xl flex flex-col gap-2.5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#6366F1] tracking-widest uppercase">ID: {liveTrackingData.id}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    <span className="text-xs font-bold">{liveTrackingData.status}</span>
                    <span className="text-[10px] text-slate-400">({liveTrackingData.schedule})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">Courier</span>
                  <p className="text-xs font-semibold">{liveTrackingData.courier}</p>
                </div>
              </div>

              {/* Transit Timeline Indicator */}
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-medium gap-3 border-t border-slate-800 pt-2">
                <div className="truncate">
                  <p className="font-semibold text-slate-400 uppercase tracking-wide">Origin</p>
                  <p className="truncate font-bold mt-0.5">{liveTrackingData.origin.split(',')[0]}</p>
                  <p className="text-slate-500 truncate">{liveTrackingData.originTime.split(' - ')[0]}</p>
                </div>
                <div className="h-[2px] flex-1 bg-slate-800 relative rounded-full">
                  <div className="absolute top-1/2 left-[65%] -translate-y-1/2 h-1.5 w-1.5 bg-[#6366F1] rounded-full" />
                </div>
                <div className="text-right truncate">
                  <p className="font-semibold text-slate-400 uppercase tracking-wide">Destination</p>
                  <p className="truncate font-bold mt-0.5">{liveTrackingData.destination.split(',')[0]}</p>
                  <p className="text-slate-500 truncate">{liveTrackingData.destinationTime.split(' - ')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Shipment Alerts (Column 3) */}
        <Card 
          title="Shipment Alerts" 
          subtitle={`${dashboardAlerts.totalDelays} active operational warnings`}
        >
          <div className="space-y-5">
            {/* Category Split Counters */}
            <div className="grid grid-cols-3 gap-2.5">
              {dashboardAlerts.summary.map((alertBox, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center ${alertBox.color}`}>
                  <span className="text-xl font-black font-heading leading-tight">{alertBox.count}</span>
                  <span className="text-[9px] font-bold mt-1 tracking-wide leading-tight leading-none uppercase max-w-[65px] truncate">{alertBox.label.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            {/* Warnings list feed */}
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
              {dashboardAlerts.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/50 rounded-xl flex items-center justify-between gap-3 text-xs cursor-pointer group">
                  <div className="space-y-0.5 truncate">
                    <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                      <span className="font-semibold text-primary-600 mr-1.5">{item.id}</span>
                      {item.mode}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-slate-400 group-hover:text-slate-900 transition-colors">
                    <span className="text-[10px] font-semibold">{item.date}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>

      {/* Bottom Grid: Recent Shipments & Activity logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Shipments List (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 leading-tight">Recent Shipments</h3>
              <p className="text-xs text-slate-500 mt-1">Status of recent logistics orders</p>
            </div>
            <button 
              onClick={() => navigate('/shipments')}
              className="text-xs font-bold text-[#6366F1] hover:text-indigo-700 flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Simple Recent Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-2">Shipping ID</th>
                  <th className="py-3 px-2">Company</th>
                  <th className="py-3 px-2">Carrier</th>
                  <th className="py-3 px-2">Route</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentShipments.map((ship, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-all font-medium text-slate-800">
                    <td className="py-3 px-2 font-bold text-primary-600">{ship.id}</td>
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-semibold text-slate-800">{ship.company}</p>
                        <p className="text-[10px] text-slate-400">{ship.companyCategory}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-slate-500 font-semibold">{ship.carrier}</td>
                    <td className="py-3 px-2 text-slate-600 font-semibold">{ship.route}</td>
                    <td className="py-3 px-2 text-slate-400 font-semibold">{ship.date}</td>
                    <td className="py-3 px-2 text-right align-middle">
                      <StatusChip status={ship.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Timeline (1 Column) */}
        <Card 
          title="Recent Activity" 
          subtitle="Updates from logistics crew members"
        >
          <div className="relative border-l border-slate-100 ml-2.5 pl-5 space-y-5">
            {recentActivity.map((log, index) => (
              <div key={index} className="relative text-xs">
                {/* Custom timeline bullet dot */}
                <span className="absolute -left-[27px] top-1 h-3.5 w-3.5 bg-white border-2 border-primary-500 rounded-full flex items-center justify-center z-10 shrink-0">
                  <span className="h-1.5 w-1.5 bg-primary-500 rounded-full" />
                </span>
                
                <div className="space-y-0.5">
                  <p className="text-slate-800 leading-relaxed font-semibold">
                    <span className="text-[#6366F1] font-bold cursor-pointer hover:underline mr-1">{log.user}</span>
                    {log.action}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                    <Clock className="h-3 w-3" />
                    <span>{log.time}</span>
                    <span>•</span>
                    <span>{log.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}
