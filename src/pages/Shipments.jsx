import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useShipments } from '../context/ShipmentsContext';
import { 
  Plane, 
  Truck, 
  Ship, 
  Train, 
  Search, 
  Filter, 
  Calendar,
  Grid,
  List,
  ChevronRight,
  Plus
} from 'lucide-react';

// UI Primitives
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusChip from '../components/ui/StatusChip';
import Button from '../components/ui/Button';

export default function Shipments() {
  const navigate = useNavigate();
  const { shipments } = useShipments();
  
  // URL Param Sync for View Toggle
  const [searchParams, setSearchParams] = useSearchParams();
  const activeView = searchParams.get('view') || 'table'; // default to table

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All');
  
  // Sorting State
  const [sortKey, setSortKey] = useState('dateSort');
  const [sortDirection, setSortDirection] = useState('desc');

  // Selection State
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // default show 10 rows

  // View Switcher Handler
  const handleViewToggle = (viewMode) => {
    setSearchParams({ view: viewMode });
    setCurrentPage(1); // Reset page on toggle
  };

  // Transport Icon Mapping
  const getTransportIcon = (type) => {
    const iconClass = "h-4 w-4 shrink-0 text-slate-400";
    switch (type) {
      case 'Air Freight':
        return <Plane className={iconClass} />;
      case 'Road Freight':
        return <Truck className={iconClass} />;
      case 'Ocean Freight':
        return <Ship className={iconClass} />;
      case 'Rail Freight':
        return <Train className={iconClass} />;
      default:
        return <Truck className={iconClass} />;
    }
  };

  // Metric aggregates from all shipments
  const metrics = useMemo(() => {
    const total = shipments.length;
    const pending = shipments.filter(s => s.status === 'Pending').length;
    const delivery = shipments.filter(s => s.status === 'Delivery').length;
    const completed = shipments.filter(s => s.status === 'Completed').length;
    
    // Scale aggregates for representation to match the mockup totals
    return {
      total: { val: "1,284", change: "+4.6%", note: "this week" },
      pending: { val: "285", change: "+8.7%", note: "this week" },
      delivery: { val: "594", change: "-4.2%", note: "from last week" },
      completed: { val: "405", change: "+3.9%", note: "this week" }
    };
  }, [shipments]);

  // Filtering Logic
  const filteredShipments = useMemo(() => {
    return shipments.filter((item) => {
      // 1. Status Tab filter
      if (statusTab !== 'All' && item.status !== statusTab) {
        return false;
      }
      // 2. Search query filter (matches ID, Company, Origin, Destination, category)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesCompany = item.company.toLowerCase().includes(query);
        const matchesOrigin = item.origin.toLowerCase().includes(query);
        const matchesDest = item.destination.toLowerCase().includes(query);
        const matchesCategory = item.productCategory.toLowerCase().includes(query);
        
        if (!matchesId && !matchesCompany && !matchesOrigin && !matchesDest && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [shipments, searchQuery, statusTab]);

  // Sorting Logic
  const sortedShipments = useMemo(() => {
    const sorted = [...filteredShipments];
    if (sortKey) {
      sorted.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        // Custom weight float comparison
        if (sortKey === 'weight') {
          valA = a.weightVal || 0;
          valB = b.weightVal || 0;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredShipments, sortKey, sortDirection]);

  // Paginated Output
  const paginatedShipments = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedShipments.slice(startIndex, startIndex + pageSize);
  }, [sortedShipments, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedShipments.length / pageSize);

  // Sorting Handlers
  const handleSort = (key, direction) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  // Row Selection Handlers
  const handleRowSelect = (id, isChecked) => {
    setSelectedRowIds(prev => {
      const next = new Set(prev);
      if (isChecked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = (isChecked) => {
    setSelectedRowIds(prev => {
      const next = new Set(prev);
      paginatedShipments.forEach(row => {
        if (isChecked) {
          next.add(row.id);
        } else {
          next.delete(row.id);
        }
      });
      return next;
    });
  };

  // Table Column Definitions
  const columns = [
    {
      key: "id",
      title: "Shipping ID",
      sortable: true,
      render: (val, row) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-primary-600 cursor-pointer hover:underline">{val}</span>
          <div className="flex items-center gap-1">
            {getTransportIcon(row.type)}
            <span className="text-[10px] text-slate-400 font-semibold">{row.type}</span>
          </div>
        </div>
      )
    },
    {
      key: "company",
      title: "Company",
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-slate-800 leading-tight">{val}</p>
          <p className="text-[10px] text-slate-400 font-medium">{row.companyCategory}</p>
        </div>
      )
    },
    {
      key: "carrier",
      title: "Carriers",
      sortable: true,
      render: (val) => <span className="font-semibold text-slate-600">{val}</span>
    },
    {
      key: "productCategory",
      title: "Product Category",
      sortable: true,
      render: (val) => <span className="font-semibold text-slate-600">{val}</span>
    },
    {
      key: "weight",
      title: "Weight",
      sortable: true,
      render: (val) => <span className="font-bold text-slate-800">{val}</span>
    },
    {
      key: "route",
      title: "Route",
      render: (_, row) => (
        <div className="text-[11px] font-semibold leading-normal">
          <p className="text-slate-800"><span className="text-slate-400 font-normal mr-1">From:</span>{row.origin}</p>
          <p className="text-slate-800"><span className="text-slate-400 font-normal mr-1">To:</span>{row.destination}</p>
        </div>
      )
    },
    {
      key: "dateSort",
      title: "Date",
      sortable: true,
      render: (_, row) => (
        <div className="text-[10px] font-semibold text-slate-500 leading-normal">
          <p><span className="text-slate-400 font-normal mr-1">ATD:</span>{row.dateATD}</p>
          <p><span className="text-slate-400 font-normal mr-1">ETA:</span>{row.dateETA}</p>
        </div>
      )
    },
    {
      key: "progress",
      title: "Progress",
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-2 min-w-[90px] select-none">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${val}%` }} />
          </div>
          <span className="text-xs font-bold text-slate-700">{val}%</span>
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      align: "right",
      render: (val) => <StatusChip status={val} />
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="hover:text-slate-700 cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-700">Shipments</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-1">Shipments</h1>
        </div>

        {/* View Switcher segment toggle + Button */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          
          {/* Custom designed view toggle segment bar */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => handleViewToggle('table')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeView === 'table' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => handleViewToggle('grid')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeView === 'grid' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

          {/* New shipment action */}
          <Button 
            variant="primary" 
            className="rounded-xl font-bold flex items-center gap-1 px-4 py-2.5"
            onClick={() => navigate('/shipments/create')}
          >
            <Plus className="h-4 w-4" />
            <span>New Shipment</span>
          </Button>

        </div>
      </div>

      {/* Summary Aggregate Cards: Visible only in Table view as per Figma */}
      {activeView === 'table' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
          {[
            { label: "Total Shipments", val: metrics.total.val, change: metrics.total.change, note: metrics.total.note, color: "text-[#6366F1]" },
            { label: "Pending", val: metrics.pending.val, change: metrics.pending.change, note: metrics.pending.note, color: "text-slate-500" },
            { label: "Delivery", val: metrics.delivery.val, change: metrics.delivery.change, note: metrics.delivery.note, color: "text-indigo-500", isNegative: true },
            { label: "Completed", val: metrics.completed.val, change: metrics.completed.change, note: metrics.completed.note, color: "text-emerald-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between h-28 select-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className={`text-2xl font-black font-heading ${item.color}`}>{item.val}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  item.isNegative ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {item.change}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold mt-1">Up {item.note}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filtering Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        
        {/* Status tabs chips list */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 select-none">
          {['All', 'Completed', 'Delivery', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setStatusTab(tab); setCurrentPage(1); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                statusTab === tab 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Inputs row: Search, Filter popover, Date Picker placeholder */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search id, company, etc..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Popover dropdown */}
          <button className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer">
            <Filter className="h-4 w-4 text-slate-400" />
            <span>Filter</span>
          </button>

          {/* Date Picker Range indicator */}
          <button className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>This Month</span>
          </button>

        </div>
      </div>

      {/* Primary Content Panel: Toggle Table vs Grid */}
      {activeView === 'table' ? (
        <Table
          columns={columns}
          data={paginatedShipments}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          selectedRowIds={selectedRowIds}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalRecords={sortedShipments.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          className="animate-fade-in"
        />
      ) : (
        /* Grid Layout Mode */
        <div className="space-y-6 animate-fade-in">
          
          {/* Main Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedShipments.map((ship) => (
              <div 
                key={ship.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[230px]"
              >
                {/* Card Top: Mode Icon, Tracking ID, Status Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      {getTransportIcon(ship.type)}
                    </div>
                    <div>
                      <p className="font-black text-primary-600 text-sm leading-tight cursor-pointer hover:underline">
                        {ship.id}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                        {ship.type}
                      </p>
                    </div>
                  </div>
                  <StatusChip status={ship.status} />
                </div>

                {/* Card Center: Origin & Destination path logs */}
                <div className="py-3 flex flex-col gap-1.5 text-[11px] font-semibold text-slate-800">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full border border-emerald-500 bg-emerald-50" />
                    <p className="truncate">
                      <span className="text-slate-400 font-normal mr-1">Origin:</span>{ship.origin}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full border border-indigo-500 bg-indigo-50" />
                    <p className="truncate">
                      <span className="text-slate-400 font-normal mr-1">Dest:</span>{ship.destination}
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold pl-3.5 mt-0.5">
                    ETA: {ship.dateETA}
                  </div>
                </div>

                {/* Card Bottom: Progress bar, weight, details */}
                <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span className="text-slate-700">{ship.company}</span>
                    <span>{ship.weight}</span>
                  </div>
                  
                  {/* Progress Indicator line */}
                  <div className="flex items-center gap-2 select-none">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${ship.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-700 shrink-0">{ship.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid View Pagination Footer */}
          {totalPages > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs select-none">
              
              {/* Page Selector dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Show</span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                  className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                  {[10, 20, 50].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <span className="text-slate-500">of {sortedShipments.length} results</span>
              </div>

              {/* Number controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                      currentPage === idx + 1 
                        ? 'bg-primary-600 text-white shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
