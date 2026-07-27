import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Truck,
  Ship,
  Train,
  Search,
  Filter,
  ChevronRight,
  Plus,
  ChevronDown,
  ChevronLeft,
  MapPin
} from 'lucide-react';

// Seeded high-fidelity data matching the 12 mockup cards exactly
const seededShipments = [
  {
    id: "#SH9283746",
    status: "In Transit",
    type: "Air",
    company: "TechGear Inc.",
    category: "Electronics",
    origin: "Los Angeles, CA",
    originTime: "Mar 20, 2035 – 10:00 AM",
    destination: "Chicago, IL",
    destinationTime: "Mar 23, 2025 – 03:00 PM", // Mockup typo says Mar 23, 2025
    progress: 60,
    carrier: "FedEx"
  },
  {
    id: "#SH9182635",
    status: "Out for Delivery",
    type: "Road",
    company: "StyleHub Co.",
    category: "Apparel",
    origin: "New York, NY",
    originTime: "Mar 19, 2035 – 11:30 AM",
    destination: "Atlanta, GA",
    destinationTime: "Mar 22, 2025 – 01:00 PM", // Mockup typo says Mar 22, 2025
    progress: 75,
    carrier: "DHL"
  },
  {
    id: "#SH9037821",
    status: "Delivered",
    type: "Ocean",
    company: "FreshNest",
    category: "Home & Kitchen",
    origin: "Dallas, TX",
    originTime: "Mar 18, 2035 – 09:00 AM",
    destination: "Miami, FL",
    destinationTime: "Mar 21, 2025 – 06:00 PM", // Mockup typo says Mar 21, 2025
    progress: 100,
    carrier: "UPS"
  },
  {
    id: "#SH9374652",
    status: "Processing",
    type: "Rail",
    company: "FitPlus Gear",
    category: "Sports & Outdoors",
    origin: "Seattle, WA",
    originTime: "Mar 21, 2035 – 08:45 AM",
    destination: "Denver, CO",
    destinationTime: "Mar 25, 2025 – 04:30 PM", // Mockup typo says Mar 25, 2025
    progress: 40,
    carrier: "USPS"
  },
  {
    id: "#SH8821349",
    status: "Out for Delivery",
    type: "Road",
    company: "EcoLights",
    category: "Electronics",
    origin: "Austin, TX",
    originTime: "Mar 19, 2035 – 12:00 PM",
    destination: "Phoenix, AZ",
    destinationTime: "Mar 21, 2025 – 06:00 PM",
    progress: 90,
    carrier: "FedEx"
  },
  {
    id: "#SH9457830",
    status: "Delivered",
    type: "Air",
    company: "AutoParts Pro",
    category: "Automotive",
    origin: "Detroit, MI",
    originTime: "Mar 20, 2035 – 07:15 AM",
    destination: "San Diego, CA",
    destinationTime: "Mar 26, 2025 – 02:00 PM",
    progress: 100,
    carrier: "Aramex"
  },
  {
    id: "#SH8967432",
    status: "In Transit",
    type: "Road",
    company: "GreenHaven",
    category: "Home & Garden",
    origin: "Portland, OR",
    originTime: "Mar 18, 2035 – 02:45 PM",
    destination: "Salt Lake City, UT",
    destinationTime: "Mar 22, 2025 – 11:00 AM",
    progress: 65,
    carrier: "USPS"
  },
  {
    id: "#SH8893247",
    status: "Out for Delivery",
    type: "Road",
    company: "ModaWear",
    category: "Apparel",
    origin: "Boston, MA",
    originTime: "Mar 20, 2035 – 01:00 PM",
    destination: "Charlotte, NC",
    destinationTime: "Mar 23, 2025 – 08:00 AM",
    progress: 80,
    carrier: "DHL"
  },
  {
    id: "#SH9018723",
    status: "Processing",
    type: "Rail",
    company: "SunCore Panels",
    category: "Electronics",
    origin: "San Diego, CA",
    originTime: "Mar 21, 2035 – 09:30 AM",
    destination: "Reno, NV",
    destinationTime: "Mar 24, 2025 – 01:30 PM",
    progress: 30,
    carrier: "UPS"
  },
  {
    id: "#SH9113471",
    status: "In Transit",
    type: "Road",
    company: "QuickParts",
    category: "Automotive",
    origin: "Tampa, FL",
    originTime: "Mar 20, 2035 – 04:00 PM",
    destination: "Houston, TX",
    destinationTime: "Mar 23, 2025 – 12:00 PM",
    progress: 90,
    carrier: "Aramex"
  },
  {
    id: "#SH8881190",
    status: "Out for Delivery",
    type: "Road",
    company: "VitaFresh",
    category: "Food & Beverage",
    origin: "Nashville, TN",
    originTime: "Mar 21, 2035 – 06:00 AM",
    destination: "Jacksonville, FL",
    destinationTime: "Mar 22, 2025 – 10:00 AM",
    progress: 85,
    carrier: "Local Courier"
  },
  {
    id: "#SH8776103",
    status: "In Transit",
    type: "Air",
    company: "StyleDepot",
    category: "Fashion",
    origin: "Minneapolis, MN",
    originTime: "Mar 19, 2035 – 10:15 AM",
    destination: "Kansas City, MO",
    destinationTime: "Mar 22, 2025 – 03:30 PM",
    progress: 60,
    carrier: "FedEx"
  }
];

// Custom vectors matching the specific brand mark designs of companies
const renderCompanyLogo = (companyName) => {
  switch (companyName) {
    case "TechGear Inc.":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <path d="M12 2l10 6.5v7L12 22 2 15.5v-7z" />
        </svg>
      );
    case "StyleHub Co.":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-[#6366F1]">
          <polygon points="12 2 2 22 22 22" />
        </svg>
      );
    case "FreshNest":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
        </svg>
      );
    case "FitPlus Gear":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-[#6366F1]">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    case "EcoLights":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <line x1="4" y1="20" x2="20" y2="4" />
          <line x1="4" y1="4" x2="20" y2="20" />
        </svg>
      );
    case "AutoParts Pro":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        </svg>
      );
    case "GreenHaven":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-[#6366F1]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "ModaWear":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12a9 9 0 0 0 18 0" />
        </svg>
      );
    case "SunCore Panels":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="20" cy="12" r="2" />
        </svg>
      );
    case "QuickParts":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-[#6366F1]">
          <line x1="6" y1="3" x2="10" y2="21" />
          <line x1="10" y1="3" x2="14" y2="21" />
          <line x1="14" y1="3" x2="18" y2="21" />
        </svg>
      );
    case "VitaFresh":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-slate-800">
          <path d="M12 2v20M2 12h22M12 2l8 8-8 8-8-8z" />
        </svg>
      );
    case "StyleDepot":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5 text-[#6366F1]">
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="M12 6a6 6 0 1 0 6 6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-slate-400">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function Shipments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState('All');

  // Filtered dataset
  const filteredShipments = useMemo(() => {
    return seededShipments.filter((ship) => {
      // 1. Status Filter tab matching
      if (activeFilterTab !== 'All' && ship.status !== activeFilterTab) {
        return false;
      }
      // 2. Search query matching
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesId = ship.id.toLowerCase().includes(query);
        const matchesCompany = ship.company.toLowerCase().includes(query);
        const matchesCarrier = ship.carrier.toLowerCase().includes(query);
        if (!matchesId && !matchesCompany && !matchesCarrier) return false;
      }
      return true;
    });
  }, [activeFilterTab, searchQuery]);

  // Status Badge visual configurations
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "In Transit":
        return "text-[#6366F1] bg-[#EEF2FF] border-[#E0E7FF]";
      case "Out for Delivery":
        return "text-[#475569] bg-[#F1F5F9] border-slate-200/50";
      case "Delivered":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "Processing":
        return "text-amber-700 bg-amber-50 border-amber-100";
      default:
        return "text-slate-500 bg-slate-50 border-slate-100";
    }
  };

  // Cargo Mode Icon render
  const renderCargoModeIcon = (mode) => {
    const iconClass = "h-4.5 w-4.5 text-slate-500";
    switch (mode) {
      case "Air":
        return <Plane className={iconClass} />;
      case "Road":
        return <Truck className={iconClass} />;
      case "Ocean":
        return <Ship className={iconClass} />;
      case "Rail":
        return <Train className={iconClass} />;
      default:
        return <Truck className={iconClass} />;
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none max-w-[1440px] mx-auto text-slate-800">

      {/* 1. Header Toolbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">Shipments</h1>
          {/* Breadcrumb path - Dashboard highlighted in purple below title */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold mt-1">
            <span className="text-[#6366F1] hover:underline cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-400 font-semibold">Shipments</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/shipments/create')}
          className="inline-flex items-center gap-1.5 px-4.5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all rounded-xl shadow-md cursor-pointer shrink-0 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>New Shipment</span>
        </button>
      </div>

      {/* 2. Advanced Filters Row (No outer wrapping box) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tab Pills - Segmented capsule container with white background shape */}
        <div className="bg-white border border-slate-200/60 rounded-full p-1 flex items-center shadow-xs select-none">
          {["All", "Delivered", "In Transit", "Processing", "Out for Delivery"].map((tab) => {
            const isActive = activeFilterTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilterTab(tab)}
                className={`px-5 py-2 text-[11px] font-bold rounded-full transition-all cursor-pointer ${isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search, Filter sliders, and Sort list dropdowns */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Shipment input */}
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Shipment"
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter button with down caret */}
          <button className="px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
            <Filter className="h-4 w-4 text-slate-400" />
            <span>Filter</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Sort Dropdown split layout */}
          <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
            <span className="text-slate-400 font-bold">Sort by:</span>
            <div className="px-3.5 py-2.5 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-50">
              <span>Newest</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4-Column Shipment Cards Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredShipments.map((ship) => (
          <div
            key={ship.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-sm hover:border-slate-350 transition-all flex flex-col justify-between min-h-[355px] relative overflow-hidden"
          >
            {/* Header: Tracking ID + Status + Rounded Square Icon container */}
            <div className="flex justify-between items-start gap-3 border-b border-slate-200/80 pb-2.5 mb-1.5">
              <div>
                <p className="font-extrabold text-sm text-slate-900 tracking-tight">{ship.id}</p>
                <div className={`mt-1.5 inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadgeStyle(ship.status)}`}>
                  {ship.status}
                </div>
              </div>

              {/* Transit icon rounded square container */}
              <div className="h-9 w-9 bg-[#E2E8F0]/40 border border-slate-200/40 rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                {renderCargoModeIcon(ship.type)}
              </div>
            </div>

            {/* Sender Company Details */}
            <div className="flex items-center gap-3 select-none mb-1">
              <div className="h-9 w-9 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-xs">
                {renderCompanyLogo(ship.company)}
              </div>
              <div className="leading-tight truncate">
                <p className="font-extrabold text-xs text-slate-800 truncate">{ship.company}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{ship.category}</p>
              </div>
            </div>

            {/* Route Timeline enclosed in a rounded gray block */}
            <div className="bg-[#F1F5F9]/50 border border-slate-100 rounded-xl p-3 my-2.5 flex justify-between items-stretch gap-4 select-none">

              {/* Left Column: Custom bullet circles & connecting line */}
              <div className="flex flex-col items-center justify-between py-0.5 shrink-0 w-6 relative">
                {/* Origin bullet */}
                <div className="h-6 w-6 rounded-full bg-indigo-50/80 flex items-center justify-center shrink-0">
                  <span className="h-2 w-2 rounded-full bg-[#6366F1]" />
                </div>
                {/* Solid connecting line */}
                <div className="w-[2px] flex-1 bg-indigo-100/80 my-1" />
                {/* Destination MapPin bullet */}
                <div className="h-6 w-6 rounded-full bg-indigo-50/80 flex items-center justify-center shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-[#6366F1] fill-[#E0E7FF]" />
                </div>
              </div>

              {/* Right Column: Route detail text */}
              <div className="flex-1 flex flex-col justify-between h-[66px] text-[10px] leading-tight font-semibold">

                {/* Origin */}
                <div className="flex justify-between items-start gap-2">
                  <span className="text-slate-450 font-bold tracking-wider">Origin</span>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-800 leading-none">{ship.origin}</p>
                    <p className="text-[9px] text-slate-400 font-medium mt-1">{ship.originTime}</p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex justify-between items-start gap-2">
                  <span className="text-slate-450 font-bold tracking-wider">Destination</span>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-800 leading-none">{ship.destination}</p>
                    <p className="text-[9px] text-slate-400 font-medium mt-1">{ship.destinationTime}</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Progress indicators and carriers footer block */}
            <div className="flex flex-col gap-2 pt-1 select-none">
              <div className="flex items-center justify-between text-[9px] font-bold">
                <span className="text-slate-400 font-bold">Progres <span className="text-slate-800 font-extrabold">{ship.progress}%</span></span>
                <span className="text-slate-400 font-bold">Carriers <span className="text-slate-900 font-extrabold">{ship.carrier}</span></span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-[#6366F1] rounded-full transition-all duration-300"
                  style={{ width: `${ship.progress}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 4. Paginated Bottom Footer bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 px-5 py-4 rounded-2xl shadow-xs mt-8 select-none">

        {/* Page Limit sizes */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Show</span>
          <div className="relative">
            <select className="appearance-none pr-8 pl-3.5 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer">
              <option>12</option>
              <option>24</option>
              <option>48</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
          <span>of 520 results</span>
        </div>

        {/* Page indexes */}
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 flex items-center justify-center cursor-pointer transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button className="h-8 w-8 rounded-xl bg-[#6366F1] text-white flex items-center justify-center cursor-pointer">1</button>
          <button className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer transition-colors">2</button>
          <button className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer transition-colors">3</button>
          <span className="px-1 text-slate-400">...</span>
          <button className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer transition-colors">16</button>

          <button className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 flex items-center justify-center cursor-pointer transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
