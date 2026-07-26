import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Clock, 
  Navigation,
  ChevronRight,
  Plus,
  SlidersHorizontal,
  FileText,
  Tag,
  RefreshCw,
  CheckCircle2,
  DollarSign,
  Truck,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
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
import StatusChip from '../components/ui/StatusChip';
import mapBg from '../assets/map-placeholder.png';

export default function Dashboard() {
  const navigate = useNavigate();
  const [trackingIdSearch, setTrackingIdSearch] = useState('');
  const [shipmentSearch, setShipmentSearch] = useState('');

  // 1. Stats row configuration
  const statCards = [
    { 
      title: "Active Shipments", 
      value: "1,284", 
      suffix: "shipments",
      change: "+8.7%", 
      note: "from last week",
      isPositive: true,
      icon: Truck,
      iconBg: "bg-indigo-100 text-[#6366F1]"
    },
    { 
      title: "Delivery Performance", 
      value: "94.3%", 
      suffix: "on-time",
      change: "-1.2%", 
      note: "from last week",
      isPositive: false,
      icon: Activity,
      iconBg: "bg-indigo-100 text-[#6366F1]"
    },
    { 
      title: "Revenue", 
      value: "$82,450", 
      suffix: "",
      change: "+12.4%", 
      note: "from last month",
      isPositive: true,
      icon: DollarSign,
      iconBg: "bg-indigo-100 text-[#6366F1]"
    }
  ];

  return (
    <div className="space-y-6 pb-6 font-sans select-none max-w-[1440px] mx-auto text-slate-800">
      
      {/* Top Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hello John!</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-0.5">Good Morning</h1>
        </div>
        
        {/* Search anything input + Add New button */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search anything"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
          <button
            onClick={() => navigate('/shipments/create')}
            className="inline-flex items-center gap-1.5 px-4.5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all rounded-xl shadow-md cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Shipping</span>
          </button>
        </div>
      </div>

      {/* Row 1 & Row 2 Combined (Desktop col-span-3 left panel, col-span-1 right panel stretching height) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Left Column (col-span-3) holding Row 1 metrics and Row 2 charts */}
        <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
          
          {/* Row 1 Metrics: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex justify-between items-start gap-4 relative overflow-hidden">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <p className="text-2xl font-black text-slate-900 font-heading leading-none">{card.value}</p>
                      {card.suffix && <span className="text-xs font-bold text-slate-400">{card.suffix}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 pt-2">
                      <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        card.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                      }`}>
                        {card.isPositive ? '▲' : '▼'} {card.change}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{card.note}</span>
                    </div>
                  </div>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2 Charts: 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            
            {/* Shipment Statistic (Bar Chart) */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-[350px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950 font-heading">Shipment Statistic</h3>
                  <select className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none cursor-pointer">
                    <option>Last Year</option>
                    <option>Last Month</option>
                  </select>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-2xl font-black font-heading text-slate-900 leading-none">4,352</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    ▲ +8.7%
                  </span>
                </div>
              </div>

              {/* Chart container */}
              <div className="relative h-48 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shipmentStatistics} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip cursor={false} content={() => null} />
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

                {/* Hardcoded May Peak Overlay Tooltip */}
                <div className="absolute top-[8%] left-[45%] -translate-x-1/2 bg-slate-900 text-white px-2.5 py-1.5 rounded-xl shadow-lg flex flex-col items-center gap-0.5 select-none pointer-events-none text-[10px] z-20">
                  <span className="text-slate-400 font-bold text-[8px] uppercase">May 2030</span>
                  <span className="font-bold text-white text-xs">3,124</span>
                  {/* Arrow */}
                  <div className="w-2 h-2 bg-slate-900 rotate-45 transform translate-y-1" />
                </div>
              </div>
            </div>

            {/* Profit Summary (Grouped Bar Chart) */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-[350px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950 font-heading">Profit Summary</h3>
                  <select className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none cursor-pointer">
                    <option>Last 8 Months</option>
                    <option>Last Quarter</option>
                  </select>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-heading text-slate-900 leading-none">$624,550</span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      ▲ +5.62%
                    </span>
                  </div>
                  {/* Custom Legends */}
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#6366F1]" />
                      <span>Revenue</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#0F172A]" />
                      <span>Cost</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart container */}
              <div className="relative h-48 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitSummary} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip cursor={false} content={() => null} />
                    <Bar dataKey="revenue">
                      {profitSummary.map((entry, index) => (
                        <Cell 
                          key={`cell-rev-${index}`} 
                          fill={entry.month === 'May' ? '#6366F1' : '#E2E8F0'} 
                        />
                      ))}
                    </Bar>
                    <Bar dataKey="cost">
                      {profitSummary.map((entry, index) => (
                        <Cell 
                          key={`cell-cost-${index}`} 
                          fill={entry.month === 'May' ? '#0F172A' : '#CBD5E1'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                {/* Hardcoded May Peak Overlay Tooltip */}
                <div className="absolute top-[8%] left-[58%] -translate-x-1/2 bg-white border border-slate-200 text-slate-800 p-2 rounded-xl shadow-lg flex flex-col gap-1 select-none pointer-events-none text-[9px] z-20 font-semibold min-w-[110px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" /> Revenue
                    </span>
                    <span className="font-extrabold text-slate-900">$87,524</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" /> Cost
                    </span>
                    <span className="font-extrabold text-slate-900">$45,680</span>
                  </div>
                  {/* Arrow */}
                  <div className="w-1.5 h-1.5 bg-white border-b border-r border-slate-200 rotate-45 absolute bottom-0 left-[35%] -translate-y-[2px] transform" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Panel (col-span-1) holding Donut chart (Shipment Type) */}
        <div className="lg:col-span-1 h-full">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between h-full min-h-[480px]">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-950 font-heading">Shipment Type</h3>
                <button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>
              </div>
            </div>

            {/* Donut progress map wrapper */}
            <div className="flex justify-center items-center h-44 relative my-auto select-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipmentTypeDistribution}
                    innerRadius={55}
                    outerRadius={73}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {shipmentTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Inner Ring Labels */}
              <div className="absolute text-center flex flex-col items-center justify-center pointer-events-none select-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total Shipment</span>
                <span className="text-2xl font-black font-heading text-slate-900 mt-1.5">2,500</span>
              </div>
            </div>

            {/* Legend 2x2 cards layout matching exactly */}
            <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100 shrink-0">
              {shipmentTypeDistribution.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {/* Colored percentage box */}
                  <div 
                    className="h-8 w-10 text-[10px] font-bold text-white flex items-center justify-center rounded-lg shrink-0" 
                    style={{ backgroundColor: entry.color }}
                  >
                    {entry.percentage}%
                  </div>
                  <div className="truncate leading-tight select-none">
                    <p className="text-[10px] font-black text-slate-900">{entry.name.split(' ')[0]} Freight</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{entry.value} shipments</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Widgets (Categories col-span-3, Map col-span-6, Warnings col-span-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Product Categories (Column 1 - col-span-3) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-950 font-heading">Product Categories</h3>
              <button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>
            </div>
            
            <div className="flex items-baseline justify-between mt-3 select-none">
              <span className="text-xs font-bold text-slate-400">Total Products</span>
              <span className="text-2xl font-black font-heading text-slate-950">1,000</span>
            </div>
          </div>

          {/* Segmented Horizontal Block representation */}
          <div className="w-full h-8 flex rounded-xl overflow-hidden my-4 shadow-inner select-none shrink-0">
            <div className="h-full bg-[#6366F1]" style={{ width: '25%' }} title="Electronics 25%" />
            <div className="h-full bg-[#E0E7FF]" style={{ width: '20%' }} title="Home & Kitchen 20%" />
            <div className="h-full bg-[#0F172A]" style={{ width: '18%' }} title="Apparel 18%" />
            <div className="h-full bg-[#475569]" style={{ width: '14%' }} title="Beauty & Health 14%" />
            <div className="h-full bg-[#CBD5E1]" style={{ width: '12%' }} title="Sports & Outdoors 12%" />
            <div className="h-full bg-[#E2E8F0]" style={{ width: '12%' }} title="Automotive 12%" />
          </div>

          {/* Category listings detail row list */}
          <div className="space-y-2.5 overflow-y-auto pr-1">
            {[
              { name: "Electronics", val: "240 products", percent: "24%", dot: "bg-[#6366F1]" },
              { name: "Home & Kitchen", val: "200 products", percent: "20%", dot: "bg-[#E0E7FF] border border-indigo-200" },
              { name: "Apparel", val: "180 products", percent: "18%", dot: "bg-[#0F172A]" },
              { name: "Beauty & Health", val: "140 products", percent: "14%", dot: "bg-[#475569]" },
              { name: "Sports & Outdoors", val: "120 products", percent: "12%", dot: "bg-[#CBD5E1]" },
              { name: "Automotive", val: "120 products", percent: "12%", dot: "bg-[#E2E8F0] border border-slate-200" }
            ].map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${cat.dot}`} />
                  <span className="font-bold text-slate-700">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 font-bold">
                  <span>{cat.val}</span>
                  <span className="text-slate-800">{cat.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Shipment Tracking Map (Column 2 - col-span-6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[420px] relative">
          {/* Map Image container */}
          <div className="absolute inset-0 bg-[#0F172A]">
            <img 
              src={mapBg} 
              alt="Map Background" 
              className="w-full h-full object-cover opacity-25"
            />
          </div>

          {/* Search bar absolute at top */}
          <div className="absolute top-4 left-4 right-4 z-20 select-none">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Shipping ID..."
                className="w-full px-4 py-2.5 text-xs bg-white text-slate-700 placeholder-slate-400 border border-slate-150 rounded-xl focus:outline-none shadow-lg pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Zoom Buttons absolute on top right */}
          <div className="absolute top-18 right-4 z-20 flex flex-col gap-1.5 select-none">
            <button className="h-8 w-8 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold rounded-lg flex items-center justify-center shadow-md cursor-pointer">+</button>
            <button className="h-8 w-8 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold rounded-lg flex items-center justify-center shadow-md cursor-pointer">-</button>
          </div>

          {/* Curved route overlay map line */}
          <svg className="absolute inset-0 w-full h-full select-none pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M 23 55 Q 50 40, 73 31" 
              fill="none" 
              stroke="#6366F1" 
              strokeWidth="1.5" 
              strokeDasharray="4 2" 
            />
          </svg>

          {/* Vehicle and Pins */}
          <div className="absolute top-[52%] left-[21%] z-15 flex flex-col items-center">
            <MapPin className="h-4.5 w-4.5 text-emerald-500 fill-emerald-50" />
          </div>

          <div className="absolute top-[37%] left-[53%] z-20 flex items-center justify-center h-8 w-8 bg-[#6366F1] text-white rounded-full shadow-lg border-2 border-white animate-pulse">
            <Navigation className="h-3.5 w-3.5 rotate-90" />
          </div>

          <div className="absolute top-[28%] left-[71%] z-15 flex flex-col items-center">
            <MapPin className="h-4.5 w-4.5 text-indigo-500 fill-indigo-50" />
          </div>

          {/* Bottom Floating Details Card */}
          <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#0F172A]/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-2xl flex flex-col gap-2.5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6366F1] tracking-widest uppercase">ID: {liveTrackingData.id}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
                  <span className="text-xs font-bold">{liveTrackingData.status}</span>
                  <span className="text-[9px] text-[#A5B4FC] font-semibold">({liveTrackingData.schedule})</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Courier</span>
                <p className="text-xs font-black">{liveTrackingData.courier}</p>
                <p className="text-[8px] text-slate-500 font-bold">{liveTrackingData.agency}</p>
              </div>
            </div>

            {/* Transit Timeline Indicator */}
            <div className="flex items-center justify-between text-[9px] text-slate-300 font-semibold gap-3 border-t border-slate-800/80 pt-2.5">
              <div className="truncate">
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Origin</p>
                <p className="truncate font-black text-slate-200 mt-0.5">{liveTrackingData.origin.split(',')[0]}</p>
                <p className="text-slate-500 text-[8px] mt-0.5">{liveTrackingData.originTime.split(' - ')[0]}</p>
              </div>
              <div className="h-[2px] flex-1 bg-slate-800 relative rounded-full">
                <div className="absolute top-1/2 left-[65%] -translate-y-1/2 h-1.5 w-1.5 bg-[#6366F1] rounded-full" />
              </div>
              <div className="text-right truncate">
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Destination</p>
                <p className="truncate font-black text-slate-200 mt-0.5">{liveTrackingData.destination.split(',')[0]}</p>
                <p className="text-slate-500 text-[8px] mt-0.5">{liveTrackingData.destinationTime.split(' - ')[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Alerts (Column 3 - col-span-3) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-950 font-heading">Shipment Alerts</h3>
              <button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>
            </div>
            
            <div className="flex items-baseline gap-1 mt-3 select-none">
              <span className="text-2xl font-black font-heading text-slate-950">{dashboardAlerts.totalDelays}</span>
              <span className="text-xs font-bold text-slate-400">Delays Detected</span>
            </div>
          </div>

          {/* 3 Categories delay indicator cards */}
          <div className="grid grid-cols-3 gap-2 py-1 select-none">
            {dashboardAlerts.summary.map((alertBox, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl border border-slate-100/50 flex flex-col items-center justify-center text-center ${alertBox.color}`}>
                <span className="text-lg font-black font-heading leading-tight">{alertBox.count}</span>
                <span className="text-[8px] font-bold mt-1 tracking-wide leading-tight uppercase leading-none break-words max-w-[65px]">
                  {alertBox.label.replace(' Delay', '').replace(' Hold', '').replace(' Provided', '')}
                </span>
              </div>
            ))}
          </div>

          {/* Scrollable Alerts index feed */}
          <div className="space-y-2 max-h-[175px] overflow-y-auto pr-0.5">
            {dashboardAlerts.items.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/50 rounded-xl flex items-center justify-between gap-3 text-xs cursor-pointer group">
                <div className="space-y-0.5 truncate">
                  <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                    <span className="font-bold text-primary-600 mr-1.5">{item.id}</span>
                    {item.mode}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover:text-slate-900 transition-colors select-none">
                  <span className="text-[10px] font-bold">{item.date}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 4: Recent Shipments table (col-span-9) & Recent Activity timeline (col-span-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Recent Shipments List (col-span-9) */}
        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-950 leading-tight">Recent Shipments</h3>
            </div>
            
            {/* Search + filter table tools */}
            <div className="flex items-center gap-2 select-none">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={shipmentSearch}
                  onChange={(e) => setShipmentSearch(e.target.value)}
                  placeholder="Search shipment"
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                />
              </div>
              <button className="p-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg cursor-pointer">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button 
                onClick={() => navigate('/shipments')}
                className="text-xs font-bold text-[#6366F1] hover:text-indigo-700 flex items-center gap-0.5 cursor-pointer ml-1"
              >
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Clean table layout */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Shipping ID</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Carrier</th>
                  <th className="py-2.5 px-3">Route</th>
                  <th className="py-2.5 px-3">Shipping Date</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                {recentShipments.map((ship, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                    <td className="py-3 px-3 font-bold text-primary-600 cursor-pointer hover:underline">{ship.id}</td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-slate-800">{ship.company}</p>
                        <p className="text-[9px] text-slate-400 font-semibold">{ship.companyCategory}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{ship.carrier}</td>
                    <td className="py-3 px-3 text-slate-600">{ship.route}</td>
                    <td className="py-3 px-3 text-slate-400">{ship.date}</td>
                    <td className="py-3 px-3 text-right align-middle">
                      <StatusChip status={ship.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Log (col-span-3) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-950 font-heading">Recent Activity</h3>
              <button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>
            </div>
          </div>

          {/* Activity items list timeline */}
          <div className="relative border-l border-slate-100 ml-3 pl-4.5 space-y-4.5 my-auto select-none">
            {[
              {
                user: "@TechGuru99",
                action: "submitted a bulk shipment request",
                time: "12:00 PM",
                icon: FileText,
                iconBg: "bg-indigo-50 text-[#6366F1]"
              },
              {
                user: "Customer Support",
                action: "added a priority tag to Order ID 77889JKL",
                highlight: "@SupportKen",
                time: "11:30 AM",
                icon: Tag,
                iconBg: "bg-slate-100 text-slate-600"
              },
              {
                user: "User",
                action: "initiated a return process for Order ID 44556GHI",
                highlight: "@SallyMae88",
                time: "11:00 AM",
                icon: RefreshCw,
                iconBg: "bg-purple-50 text-purple-600"
              },
              {
                user: "Administrator",
                action: "resolved a delivery issue for Order ID 12345XYZ",
                highlight: "@AdminLisa",
                time: "10:15 AM",
                icon: CheckCircle2,
                iconBg: "bg-emerald-50 text-[#6366F1]"
              }
            ].map((log, index) => {
              const LogIcon = log.icon;
              return (
                <div key={index} className="relative text-xs">
                  {/* Timeline action icon box */}
                  <span className={`absolute -left-[28px] top-0.5 h-[20px] w-[20px] rounded-full flex items-center justify-center shadow-xs border border-white z-10 shrink-0 ${log.iconBg}`}>
                    <LogIcon className="h-3 w-3" />
                  </span>
                  
                  <div className="space-y-0.5 pl-1.5 leading-normal">
                    <p className="text-slate-800 leading-relaxed font-semibold">
                      {log.user === "User" || log.user === "Customer Support" || log.user === "Administrator" ? (
                        <>
                          {log.user}{' '}
                          <span className="text-[#6366F1] font-bold cursor-pointer hover:underline">
                            {log.highlight}
                          </span>{' '}
                          {log.action.replace('added a ', '').replace('initiated a ', '').replace('resolved a ', '')}
                        </>
                      ) : (
                        <>
                          User{' '}
                          <span className="text-[#6366F1] font-bold cursor-pointer hover:underline">
                            {log.user}
                          </span>{' '}
                          {log.action}
                        </>
                      )}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                      {log.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
