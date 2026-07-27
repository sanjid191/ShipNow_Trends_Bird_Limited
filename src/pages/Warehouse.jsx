import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  warehouseStats, 
  warehouseInventory, 
  capacityUsageDonut, 
  warehouseStorage, 
  packageStatusList, 
  warehouseActivityLog, 
  warehouseFloorsData 
} from '../data/warehouseData';
import { 
  ChevronRight, 
  Filter, 
  ArrowUpDown, 
  Package, 
  Clock, 
  PlusCircle, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// UI
import Card from '../components/ui/Card';
import StatusChip from '../components/ui/StatusChip';

export default function Warehouse() {
  const navigate = useNavigate();

  // Mode state
  const [freightMode, setFreightMode] = useState('Road Freight');
  
  // Floor Map view state
  const [activeFloor, setActiveFloor] = useState(1);

  // Package Status filter state
  const [statusFilter, setStatusFilter] = useState('All');

  // Bins Data for active floor
  const floorData = useMemo(() => {
    return warehouseFloorsData[activeFloor] || warehouseFloorsData[1];
  }, [activeFloor]);

  // Package status listing selector
  const filteredPackages = useMemo(() => {
    if (statusFilter === 'All') return packageStatusList;
    return packageStatusList.filter(pkg => pkg.status === statusFilter);
  }, [statusFilter]);

  // Striped visual backgrounds helper mapping
  const getInventoryBarStyle = (category) => {
    switch (category) {
      case 'Electronics':
        return { backgroundColor: '#6366f1' }; // Solid purple
      case 'Apparel':
        return { 
          backgroundImage: 'repeating-linear-gradient(45deg, #818cf8, #818cf8 6px, #6366f1 6px, #6366f1 12px)' 
        }; // Striped purple
      case 'Home & Kitchen':
        return { backgroundColor: '#1e293b' }; // Solid dark charcoal
      case 'Beauty & Health':
        return { 
          backgroundImage: 'repeating-linear-gradient(45deg, #475569, #475569 6px, #1e293b 6px, #1e293b 12px)' 
        }; // Striped dark charcoal
      case 'Automotive Parts':
        return { backgroundColor: '#94a3b8' }; // Solid gray
      case 'Sports Equipment':
        return { 
          backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 6px, #94a3b8 6px, #94a3b8 12px)' 
        }; // Striped gray
      default:
        return { backgroundColor: '#6366f1' };
    }
  };

  // Donut split calculation
  const donutData = [
    { name: 'Loaded', value: capacityUsageDonut.percentage, color: '#818cf8' },
    { name: 'Empty', value: 100 - capacityUsageDonut.percentage, color: '#ffffff' }
  ];

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight select-none">Warehouse</h1>
          
          {/* Breadcrumbs below the title */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold mt-1 select-none">
            <span className="text-[#6366F1] hover:underline cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-400 font-semibold">Warehouse</span>
          </div>
        </div>

        {/* Mode Toggle segment row */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 self-start md:self-center shrink-0 overflow-x-auto max-w-full scrollbar-none whitespace-nowrap">
          {['Road Freight', 'Rail Freight', 'Ocean Freight', 'Air Freight'].map((mode) => {
            const isActive = freightMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setFreightMode(mode)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive 
                    ? 'bg-[#1E293B] text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left side (2/3) and Right side (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Cards + Inventory stacked row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column Stack: 3 Mini metrics cards */}
            <div className="flex flex-col gap-4 md:col-span-1">
              {/* Card 1: SKU */}
              <div className="bg-white border border-slate-200 p-4.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 h-[84px] select-none">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total SKU</span>
                  <p className="text-2xl font-black font-heading text-slate-900 leading-tight mt-0.5">{warehouseStats.totalSku.val}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  {warehouseStats.totalSku.change}
                </span>
              </div>

              {/* Card 2: Qty */}
              <div className="bg-white border border-slate-200 p-4.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 h-[84px] select-none">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Quantity on Hand</span>
                  <p className="text-2xl font-black font-heading text-slate-900 leading-tight mt-0.5">
                    {warehouseStats.quantityOnHand.val} <span className="text-xs font-semibold text-slate-400 font-sans">units</span>
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  {warehouseStats.quantityOnHand.change}
                </span>
              </div>

              {/* Card 3: Capacity Usage */}
              <div className="bg-white border border-slate-200 p-4.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 h-[84px] select-none">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Capacity Usage</span>
                  <p className="text-2xl font-black font-heading text-slate-900 leading-tight mt-0.5">{warehouseStats.capacityUsage.val} <span className="text-xs font-semibold text-slate-400 font-sans">Full</span></p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  {warehouseStats.capacityUsage.change}
                </span>
              </div>
            </div>

            {/* Warehouse Inventory chart card (takes remaining 2 cols) */}
            <div className="md:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between select-none">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950 font-heading">Warehouse Inventory</h3>
                  <button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>
                </div>
                <p className="text-2xl font-black font-heading text-slate-900 mt-1">10,000 <span className="text-xs font-semibold text-slate-400 font-sans">packages</span></p>
              </div>

              {/* Vertical Bars container */}
              <div className="grid grid-cols-6 gap-3.5 mt-6 items-end h-36">
                {warehouseInventory.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    
                    {/* Vertical Bar track */}
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-lg h-24 relative overflow-hidden flex flex-col justify-end">
                      {/* Bar Fill absolute style */}
                      <div 
                        className="w-full rounded-b-md transition-all duration-700"
                        style={{ 
                          height: `${item.percentage}%`,
                          ...getInventoryBarStyle(item.category)
                        }}
                      />
                    </div>

                    {/* Suffix Label */}
                    <div className="text-center w-full min-w-0 select-none">
                      <p className="text-[9px] font-black text-slate-900 leading-tight">{item.percentage}%</p>
                      <p className="text-[8px] font-semibold text-slate-400 truncate mt-0.5" title={item.category}>{item.category.split(' ')[0]}</p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Warehouse Storage Location list table */}
          <Card 
            title="Warehouse Storage" 
            actions={
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
                  <Filter className="h-3 w-3" />
                  <span>Filter</span>
                </button>
                <button className="px-3 py-1.5 text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
                  <ArrowUpDown className="h-3 w-3" />
                  <span>Sort by: Section</span>
                </button>
              </div>
            }
          >
            <div className="overflow-x-auto select-none">
              <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-2">Floor</th>
                    <th className="py-2.5 px-2">Section</th>
                    <th className="py-2.5 px-2">Category</th>
                    <th className="py-2.5 px-2">Storage Used</th>
                    <th className="py-2.5 px-2">Percentage</th>
                    <th className="py-2.5 px-2 text-right">Available Space</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {warehouseStorage.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all font-semibold">
                      <td className="py-3 px-2 text-slate-900 font-bold">{row.floor}</td>
                      <td className="py-3 px-2">{row.section}</td>
                      <td className="py-3 px-2 text-slate-600 font-medium">{row.category}</td>
                      <td className="py-3 px-2 align-middle">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: `${row.percentage}%` }} />
                        </div>
                      </td>
                      <td className="py-3 px-2">{row.percentage}%</td>
                      <td className="py-3 px-2 text-right text-slate-400 font-bold">{row.available}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Interactive Warehouse Floor Map grid */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col">
            {/* Header: Title + Floor Selectors */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-955 font-heading">Warehouse Map</h3>
              
              <div className="bg-slate-100 p-1 rounded-full flex items-center shadow-xs">
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFloor(f)}
                    className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      activeFloor === f 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Floor {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Inner light grey background container */}
            <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4">
              
              {/* Category Grid: 4 columns, Apparel spans 3 columns on lg, 2 columns on sm, Beauty & Health spans 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
                {Object.entries(floorData).map(([catName, details]) => {
                  const colSpanClass = catName === "Apparel" ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-1";
                  
                  return (
                    <div 
                      key={catName} 
                      className={`${colSpanClass} bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col justify-between gap-3`}
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 tracking-tight">{catName}</h4>
                        
                        {/* Shelf bin items */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {details.bins.map((bin) => {
                            const isAvailable = !bin.filled;
                            return (
                              <div
                                key={bin.id}
                                className={`h-8 w-10 text-[10px] font-bold rounded-lg flex items-center justify-center border transition-all select-none cursor-default ${
                                  isAvailable
                                    ? 'bg-[#EEF2FF] border-[#C7D2FE] text-[#312E81]'
                                    : 'bg-[#F1F5F9] border-[#E2E8F0] text-slate-400 font-bold'
                                }`}
                                title={`Bin ${bin.id} - ${isAvailable ? 'Available' : 'Full'}`}
                              >
                                {bin.id}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Available Space Count */}
                      <div className="text-[10px] text-slate-400 font-bold mt-1.5">
                        Available Space <span className="text-slate-900 font-extrabold text-[11px] ml-0.5">{details.space}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Legend Indicators */}
              <div className="flex items-center gap-5 text-[10px] font-bold text-slate-400 select-none mt-4 pt-3.5 border-t border-slate-200/50">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-3.5 rounded bg-[#EEF2FF] border border-[#C7D2FE] inline-block shadow-xs shrink-0" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-3.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] inline-block shadow-xs shrink-0" />
                  <span>Full</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Columns (1/3 width) */}
        <div className="space-y-6">
          
          {/* Capacity Usage Circular Progress */}
          <div className="bg-[#222222] border border-[#2d2d2d] p-6 rounded-2xl shadow-sm flex flex-col justify-between select-none">
            {/* Header: Title + Options */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-heading">Capacity Usage</h3>
              <button className="text-slate-400 hover:text-slate-200 text-sm">•••</button>
            </div>

            <div className="flex flex-col items-center justify-center mt-5">
              
              {/* Circular Progress Container using Recharts donut */}
              <div className="relative h-44 w-44 flex items-center justify-center select-none">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      innerRadius={55}
                      outerRadius={75}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Text centered inside the donut */}
                <div className="absolute text-center flex flex-col items-center justify-center pointer-events-none select-none">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Usage</span>
                  <span className="text-3xl font-black font-heading text-white leading-tight">
                    {capacityUsageDonut.percentage}%
                  </span>
                </div>
              </div>

              {/* Loaded vs Empty shelves counting row */}
              <div className="flex items-center justify-between w-full mt-6 text-xs font-semibold select-none border-t border-[#333333] pt-4">
                <div>
                  <p className="text-slate-400">Loaded</p>
                  <p className="text-base font-black text-white mt-0.5">{capacityUsageDonut.loadedShelves} shelves</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Empty</p>
                  <p className="text-base font-black text-white mt-0.5">{capacityUsageDonut.emptyShelves} shelves</p>
                </div>
              </div>

            </div>
          </div>

          {/* Package Status card list */}
          <Card 
            title="Package Status"
            actions={<button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>}
          >
            <div className="space-y-4 select-none">
              {/* Filter Tabs segments */}
              <div className="grid grid-cols-4 bg-slate-100 p-0.5 rounded-lg text-center font-bold text-[10px] text-slate-500">
                {['All', 'Expected', 'Received', 'Sent'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`py-1 rounded transition-colors cursor-pointer ${
                      statusFilter === tab 
                        ? 'bg-slate-900 text-white shadow-xs' 
                        : 'hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-0.5">
                {filteredPackages.map((pkg, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/50 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-indigo-50 text-[#6366F1] rounded-lg">
                        <Package className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{pkg.id}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{pkg.date.split(' - ')[0]}</p>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      pkg.status === 'Sent' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      pkg.status === 'Received' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {pkg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Activity Log Feed */}
          <Card 
            title="Warehouse Activity Log" 
            actions={<button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>}
          >
            <div className="relative border-l border-slate-100 ml-3 pl-4.5 space-y-5 select-none">
              {warehouseActivityLog.map((log, index) => (
                <div key={index} className="relative text-xs">
                  {/* Circular action icon indicator */}
                  <span className="absolute -left-[27px] top-0.5 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-xs border border-slate-150 z-10 shrink-0">
                    <Clock className="h-3 w-3 text-slate-400" />
                  </span>
                  
                  <div className="space-y-0.5 pl-1">
                    <p className="text-slate-800 leading-relaxed font-semibold">
                      <span className="text-[#6366F1] font-bold cursor-pointer hover:underline mr-1">{log.user}</span>
                      {log.action}
                    </p>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wide">
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

    </div>
  );
}
