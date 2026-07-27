import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoicesData } from '../data/invoicesData';
import { 
  ChevronRight, 
  Search, 
  Download, 
  Printer, 
  Calendar,
  DollarSign,
  Briefcase,
  FileText,
  AlertCircle,
  SlidersHorizontal,
  ShieldCheck,
  FileX,
  CircleDot,
  Clock
} from 'lucide-react';

// UI
import Table from '../components/ui/Table';
import StatusChip from '../components/ui/StatusChip';
import Card from '../components/ui/Card';

// Custom vectors matching the specific brand mark designs of companies
const renderCompanyLogo = (companyName) => {
  switch (companyName) {
    case "TechGear Inc.":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-800">
          <path d="M12 2l10 6.5v7L12 22 2 15.5v-7z" />
        </svg>
      );
    case "StyleHub Co.":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#6366F1]">
          <polygon points="12 2 2 22 22 22" />
        </svg>
      );
    case "FreshNest":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-800">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
        </svg>
      );
    case "FitPlus Gear":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#6366F1]">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    case "EcoLights":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#6366F1]">
          <line x1="4" y1="20" x2="20" y2="4" />
          <line x1="4" y1="4" x2="20" y2="20" />
        </svg>
      );
    case "AutoParts Pro":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-800">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        </svg>
      );
    case "GreenHaven":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-800">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "ModaWear":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#6366F1]">
          <path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12a9 9 0 0 0 18 0" />
        </svg>
      );
    case "SunCore Panels":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-800">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="20" cy="12" r="2" />
        </svg>
      );
    case "QuickParts":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#6366F1]">
          <line x1="6" y1="3" x2="10" y2="21" />
          <line x1="10" y1="3" x2="14" y2="21" />
          <line x1="14" y1="3" x2="18" y2="21" />
        </svg>
      );
    case "VitaFresh":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#6366F1]">
          <path d="M12 2v20M2 12h22M12 2l8 8-8 8-8-8z" />
        </svg>
      );
    case "SmartAppliance":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-800">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5 text-slate-400">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const renderInvoiceStatusBadge = (status) => {
  switch (status) {
    case "Paid":
      return (
        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] border border-transparent select-none">
          Paid
        </span>
      );
    case "Unpaid":
      return (
        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#6366F1] border border-transparent select-none">
          Unpaid
        </span>
      );
    case "Overdue":
      return (
        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#F1F3F4] text-[#5F6368] border border-transparent select-none">
          Overdue
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 select-none">
          {status}
        </span>
      );
  }
};

export default function Invoices() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection State: Defaults to INV-1008 (ModaWear) to ensure no empty/unpopulated detail panel
  const [activeInvoiceId, setActiveInvoiceId] = useState('INV-1008');

  // Filtered List
  const filteredInvoices = useMemo(() => {
    return invoicesData.filter((inv) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesId = inv.id.toLowerCase().includes(query);
        const matchesCompany = inv.company.toLowerCase().includes(query);
        if (!matchesId && !matchesCompany) return false;
      }
      return true;
    });
  }, [searchQuery]);

  // Selected invoice object
  const activeInvoice = useMemo(() => {
    return invoicesData.find(inv => inv.id === activeInvoiceId) || invoicesData[0];
  }, [activeInvoiceId]);

  // Financial aggregates calculation
  const totals = useMemo(() => {
    return {
      paid: "$28,890",
      unpaid: "$16,700",
      pending: "$8,050",
      overdue: "$22,110"
    };
  }, []);

  // Inline dynamic calculation helper for details panel
  const invoiceCalculations = useMemo(() => {
    if (!activeInvoice) return { subtotal: 0, tax: 0, total: 0 };
    
    // Subtotal
    const subtotal = activeInvoice.lineItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    // Tax
    const tax = subtotal * (activeInvoice.taxRate || 0.08);
    // Total
    const total = subtotal + tax + (activeInvoice.fee || 0) - (activeInvoice.discount || 0);

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      fee: (activeInvoice.fee || 0).toFixed(2),
      discount: (activeInvoice.discount || 0).toFixed(2)
    };
  }, [activeInvoice]);

  // Print utility trigger
  const handlePrintInvoice = () => {
    window.print();
  };

  // Reusable Table Column definitions
  const columns = [
    {
      key: "id",
      title: "Invoice ID",
      sortable: true,
      render: (val) => <span className="font-bold text-slate-800">{val}</span>
    },
    {
      key: "company",
      title: "Bill To",
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-bold text-slate-800 leading-tight">{val}</p>
          <p className="text-[10px] text-slate-400 font-semibold">{row.shippingId}</p>
        </div>
      )
    },
    {
      key: "issueDate",
      title: "Date Issued",
      sortable: true,
      render: (val) => <span className="font-semibold text-slate-500">{val}</span>
    },
    {
      key: "dueDate",
      title: "Due Date",
      sortable: true,
      render: (val) => <span className="font-semibold text-slate-500">{val}</span>
    },
    {
      key: "amountSubtotal",
      title: "Amount",
      sortable: true,
      render: (_, row) => {
        // Render total dynamically
        const sub = row.lineItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
        const tax = sub * (row.taxRate || 0.08);
        const tot = sub + tax + (row.fee || 0) - (row.discount || 0);
        return <span className="font-bold text-slate-900">${tot.toFixed(2)}</span>;
      }
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
    <div className="space-y-6 pb-12 font-sans select-none print:p-0 print:bg-white print:space-y-0 text-slate-800">
      
      {/* Top Header Row: Hidden on print */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight select-none">Invoices & Billing</h1>
          
          {/* Breadcrumbs below the title */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold mt-1 select-none">
            <span className="text-[#6366F1] hover:underline cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <span className="text-slate-350 font-normal">/</span>
            <span className="text-slate-400 font-semibold">Invoices & Billing</span>
          </div>
        </div>

        {/* Global search on the right */}
        <div className="relative w-full md:w-72 bg-white border border-slate-200 rounded-xl px-3.5 py-2 select-none flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything"
            className="w-full text-xs font-semibold bg-transparent focus:outline-none text-slate-800 placeholder-slate-450"
          />
        </div>
      </div>

      {/* Aggregate Balance Cards: Hidden on print */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:hidden">
        {[
          { label: "Paid Invoices", val: totals.paid, icon: ShieldCheck, count: 350 },
          { label: "Unpaid Invoices", val: totals.unpaid, icon: FileX, count: 120 },
          { label: "Pending Invoices", val: totals.pending, icon: CircleDot, count: 80 },
          { label: "Overdue Invoices", val: totals.overdue, icon: Clock, count: 245 }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center justify-between gap-4 select-none">
            {/* Left Purple Icon Container */}
            <div className="h-12 w-12 bg-[#818CF8] text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
              <item.icon className="h-5 w-5 stroke-[2.5]" />
            </div>
            
            {/* Right Text details (right-aligned) */}
            <div className="text-right leading-tight">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">{item.label}</span>
              <p className="text-2xl font-black text-slate-800 tracking-tight leading-none my-1">{item.val}</p>
              <span className="text-[9px] text-slate-400 font-bold">
                from <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-extrabold text-[9px] mx-0.5">{item.count}</span> Invoices
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dual Column Layout: Left Invoice List, Right Invoice Detail sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Invoice List (8 columns on desktop) - Hidden on print */}
        <div className="lg:col-span-8 space-y-4 print:hidden">
          
          {/* Table Container Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            {/* Card Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4.5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Invoices</h3>
              
              <div className="flex items-center gap-2 select-none">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search invoices"
                    className="pl-8.5 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:bg-white transition-all w-44 sm:w-56"
                  />
                </div>
                
                {/* Filter icon button */}
                <button className="p-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-500 rounded-xl cursor-pointer">
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
                
                {/* New Invoice Button */}
                <button className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors whitespace-nowrap">
                  New Invoice
                </button>
              </div>
            </div>
            
            {/* Table Body */}
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-3 px-4 w-10">
                    {/* Empty header for Checkbox */}
                  </th>
                  <th className="py-3 px-4">Invoice ID <span className="text-[8px] text-slate-350 ml-0.5">↕</span></th>
                  <th className="py-3 px-4">Company <span className="text-[8px] text-slate-350 ml-0.5">↕</span></th>
                  <th className="py-3 px-4">Shipping ID <span className="text-[8px] text-slate-350 ml-0.5">↕</span></th>
                  <th className="py-3 px-4">Date <span className="text-[8px] text-slate-350 ml-0.5">↕</span></th>
                  <th className="py-3 px-4">Amount <span className="text-[8px] text-slate-350 ml-0.5">↕</span></th>
                  <th className="py-3 px-4 text-right">Status <span className="text-[8px] text-slate-350 ml-0.5">↕</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                {filteredInvoices.map((inv) => {
                  const sub = inv.lineItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
                  const tax = sub * (inv.taxRate || 0.08);
                  const tot = sub + tax + (inv.fee || 0) - (inv.discount || 0);
                  const isActive = inv.id === activeInvoiceId;

                  return (
                    <tr 
                      key={inv.id} 
                      onClick={() => setActiveInvoiceId(inv.id)}
                      className={`hover:bg-slate-50/50 transition-all cursor-pointer ${
                        isActive ? 'bg-[#6366F1]/5' : ''
                      }`}
                    >
                      {/* Checkbox column */}
                      <td className="py-3 px-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isActive}
                          onChange={() => setActiveInvoiceId(inv.id)}
                          className="h-3.5 w-3.5 text-[#6366F1] border-slate-300 rounded-sm focus:ring-[#6366F1] cursor-pointer"
                        />
                      </td>
                      
                      {/* Invoice ID */}
                      <td className="py-3 px-4 font-extrabold text-[#6366F1] hover:underline">
                        <div className="flex items-center gap-1.5">
                          <span>{inv.id}</span>
                          <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        </div>
                      </td>
                      
                      {/* Company with logo */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-200/60">
                            {renderCompanyLogo(inv.company)}
                          </div>
                          <span className="font-bold text-slate-800 truncate max-w-[120px]">{inv.company}</span>
                        </div>
                      </td>
                      
                      {/* Shipping ID */}
                      <td className="py-3 px-4 text-slate-400 font-semibold">{inv.shippingId}</td>
                      
                      {/* Date (Issued vs Due) */}
                      <td className="py-3 px-4">
                        <div className="leading-tight">
                          <p className="font-bold text-slate-800">{inv.issueDate} <span className="text-[8px] text-slate-400 font-semibold">(Issued)</span></p>
                          <p className="font-bold text-slate-800 mt-0.5">{inv.dueDate} <span className="text-[8px] text-slate-400 font-semibold">(Due)</span></p>
                        </div>
                      </td>
                      
                      {/* Amount */}
                      <td className="py-3 px-4 font-black text-slate-800">${tot.toFixed(2)}</td>
                      
                      {/* Status badge */}
                      <td className="py-3 px-4 text-right align-middle">
                        {renderInvoiceStatusBadge(inv.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Invoice Billing Detail Panel (4 columns on desktop) */}
        <div className="lg:col-span-4 print:col-span-12 print:w-full">
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col print:border-none print:shadow-none">
            
            {/* Header bar: Invoice Details + action buttons */}
            <div className="px-5 py-3.5 flex items-center justify-between gap-2 print:hidden select-none">
              <span className="text-sm font-bold text-slate-900">Invoice Details</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => alert("Edit Invoice modal opened.")}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-[11px] cursor-pointer transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => alert("Invoice placed on hold.")}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-[11px] cursor-pointer transition-colors"
                >
                  Hold
                </button>
                <button
                  onClick={handlePrintInvoice}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-[11px] cursor-pointer transition-colors"
                >
                  Send Invoice
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 pb-4 space-y-3">

              {/* Inner bordered card */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">

                {/* === Invoice # + Dates + Badge === */}
                <div className="px-4 pt-4 pb-3 border-b border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[13px] font-bold text-slate-900 leading-none">
                        Invoice <span className="text-[#6366F1]">#{activeInvoice.id}</span>
                      </p>
                      <div className="mt-1.5">
                        {renderInvoiceStatusBadge(activeInvoice.status)}
                      </div>
                    </div>
                    <div className="text-right text-[9.5px] text-slate-500 space-y-0.5 pt-0.5">
                      <p>Issue Date <span className="text-slate-800 font-semibold">{activeInvoice.issueDate}</span></p>
                      <p>Due Date <span className="text-slate-800 font-semibold">{activeInvoice.dueDate}</span></p>
                    </div>
                  </div>
                </div>

                {/* === Bill From / Bill To — plain white, no grey box === */}
                <div className="px-4 py-3.5 border-b border-slate-200">
                  <div className="flex justify-between">
                    {/* Bill From */}
                    <div className="text-[9.5px] leading-relaxed">
                      <p className="text-slate-400 font-medium mb-1.5">Bill From</p>
                      <p className="text-[13px] font-bold text-slate-900 leading-tight mb-0.5">{activeInvoice.billFrom.name}</p>
                      <p className="text-slate-500">{activeInvoice.billFrom.email}</p>
                      <p className="text-slate-500">{activeInvoice.billFrom.address}</p>
                      <p className="text-slate-500">{activeInvoice.billFrom.phone}</p>
                    </div>
                    {/* Bill To */}
                    <div className="text-right text-[9.5px] leading-relaxed">
                      <p className="text-slate-400 font-medium mb-1.5">Bill To</p>
                      <p className="text-[13px] font-bold text-slate-900 leading-tight mb-0.5">{activeInvoice.billTo.name}</p>
                      <p className="text-slate-500">{activeInvoice.billTo.email}</p>
                      <p className="text-slate-500">{activeInvoice.billTo.address}</p>
                      <p className="text-slate-500">{activeInvoice.billTo.phone}</p>
                    </div>
                  </div>
                </div>

                {/* === Package Summary === */}
                <div className="px-4 pt-3.5 pb-0">
                  <p className="text-[13px] font-bold text-slate-900 mb-2.5">Package Summary</p>
                </div>

                {/* === Items Table === */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-[9px] font-semibold text-slate-400 uppercase">
                      <th className="py-2 px-4 text-left">Description <span className="text-[7px] normal-case">↕</span></th>
                      <th className="py-2 px-2 text-left">Shipment Type <span className="text-[7px] normal-case">↕</span></th>
                      <th className="py-2 px-2 text-left">Price <span className="text-[7px] normal-case">↕</span></th>
                      <th className="py-2 px-2 text-center">Qty <span className="text-[7px] normal-case">↕</span></th>
                      <th className="py-2 px-4 text-right">Amount <span className="text-[7px] normal-case">↕</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeInvoice.lineItems.map((item, idx) => {
                      const parts = item.shipmentType.split(' ');
                      const mainType = parts.slice(0, -1).join(' ');
                      const subType = parts[parts.length - 1];
                      return (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="py-3 px-4 text-[10px] font-medium text-slate-800 align-top">{item.description}</td>
                          <td className="py-3 px-2 align-top">
                            <p className="text-[10px] font-medium text-slate-700 leading-snug">{mainType}</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">{subType}</p>
                          </td>
                          <td className="py-3 px-2 text-[10px] text-slate-700 align-top whitespace-nowrap">${item.price.toFixed(2)}</td>
                          <td className="py-3 px-2 text-center text-[10px] text-slate-700 align-top">{item.qty}</td>
                          <td className="py-3 px-4 text-right text-[10px] text-slate-800 font-medium align-top whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</td>
                        </tr>
                      );
                    })}

                    {/* Sub Total */}
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-4"></td>
                      <td colSpan="3" className="py-2 px-2 text-[10px] text-slate-500">Sub Total</td>
                      <td className="py-2 px-4 text-right text-[10px] text-slate-700 whitespace-nowrap">${invoiceCalculations.subtotal}</td>
                    </tr>

                    {/* Tax */}
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-4"></td>
                      <td colSpan="3" className="py-2 px-2 text-[10px] text-slate-500">Tax (8%)</td>
                      <td className="py-2 px-4 text-right text-[10px] text-slate-700 whitespace-nowrap">${invoiceCalculations.tax}</td>
                    </tr>

                    {/* Fee */}
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-4"></td>
                      <td colSpan="3" className="py-2 px-2 text-[10px] text-slate-500">Fee</td>
                      <td className="py-2 px-4 text-right text-[10px] text-slate-700 whitespace-nowrap">${invoiceCalculations.fee}</td>
                    </tr>

                    {/* Total — bold, larger */}
                    <tr>
                      <td className="py-3 px-4"></td>
                      <td colSpan="3" className="py-3 px-2 text-[12px] font-bold text-slate-900">Total</td>
                      <td className="py-3 px-4 text-right text-[13px] font-black text-slate-900 whitespace-nowrap">${invoiceCalculations.total}</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              {/* Note — outside the bordered card */}
              <div className="px-1 pt-1 select-none">
                <p className="text-[9.5px] font-semibold text-slate-400 mb-1">Note</p>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                  Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
