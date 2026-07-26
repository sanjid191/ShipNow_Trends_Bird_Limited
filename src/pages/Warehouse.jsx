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
    { name: 'Loaded', value: capacityUsageDonut.percentage, color: '#6366f1' },
    { name: 'Empty', value: 100 - capacityUsageDonut.percentage, color: '#e2e8f0' }
  ];

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="hover:text-slate-700 cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-700">Warehouse</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-1">Warehouse</h1>
        </div>

        {/* Mode Toggle segment row */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 self-start md:self-center shrink-0">
          {['Road Freight', 'Rail Freight', 'Ocean Freight', 'Air Freight'].map((mode) => {
            const isActive = freightMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setFreightMode(mode)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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
              <table className="w-full text-left text-xs border-collapse">
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
          <Card 
            title="Warehouse Map" 
            actions={
              <div className="bg-slate-100 p-0.5 rounded-lg flex items-center">
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFloor(f)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                      activeFloor === f 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Floor {f}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-6">
              
              {/* The grid list representing category groupings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(floorData).map(([catName, details]) => (
                  <div key={catName} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between gap-3 min-h-[120px]">
                    <div>
                      <h4 className="text-xs font-bold text-slate-850">{catName}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Available Space: {details.space}</p>
                    </div>

                    {/* Shelf bin pill items */}
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {details.bins.map((bin) => (
                        <div
                          key={bin.id}
                          className={`h-7 w-9 text-[10px] font-bold rounded-lg flex items-center justify-center border cursor-pointer transition-all ${
                            bin.filled 
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' 
                              : 'bg-white hover:bg-slate-50 text-slate-400 border-slate-200 font-semibold'
                          }`}
                          title={`Bin ${bin.id} - ${bin.filled ? 'Full' : 'Available'}`}
                        >
                          {bin.id}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Legend indicators */}
              <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-400 select-none pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 bg-white border border-slate-200 rounded-md shadow-sm" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 bg-indigo-600 rounded-md shadow-sm" />
                  <span>Full</span>
                </div>
              </div>

            </div>
          </Card>

        </div>

        {/* Right Columns (1/3 width) */}
        <div className="space-y-6">
          
          {/* Capacity Usage Circular Progress */}
          <Card 
            title="Capacity Usage" 
            actions={<button className="text-slate-400 hover:text-slate-700 text-sm">•••</button>}
          >
            <div className="flex flex-col items-center justify-center">
              
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
                  <span className="text-3xl font-black font-heading text-slate-800 leading-tight">
                    {capacityUsageDonut.percentage}%
                  </span>
                </div>
              </div>

              {/* Loaded vs Empty shelves counting row */}
              <div className="flex items-center justify-between w-full mt-6 text-xs font-semibold select-none border-t border-slate-100 pt-4">
                <div>
                  <p className="text-slate-400">Loaded</p>
                  <p className="text-base font-black text-slate-800 mt-0.5">{capacityUsageDonut.loadedShelves} shelves</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Empty</p>
                  <p className="text-base font-black text-slate-800 mt-0.5">{capacityUsageDonut.emptyShelves} shelves</p>
                </div>
              </div>

            </div>
          </Card>

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
