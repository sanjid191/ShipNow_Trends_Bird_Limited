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
  AlertCircle
} from 'lucide-react';

// UI
import Table from '../components/ui/Table';
import StatusChip from '../components/ui/StatusChip';
import Card from '../components/ui/Card';

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
    <div className="space-y-6 pb-12 font-sans select-none print:p-0 print:bg-white print:space-y-0">
      
      {/* Top Header Row: Hidden on print */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 print:hidden">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="hover:text-slate-700 cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-700">Invoices & Billing</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-1">Invoices & Billing</h1>
        </div>
      </div>

      {/* Aggregate Balance Cards: Hidden on print */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 print:hidden">
        {[
          { label: "Paid", val: totals.paid, color: "text-emerald-600 bg-emerald-50/50", border: "border-emerald-100" },
          { label: "Unpaid", val: totals.unpaid, color: "text-[#6366F1] bg-indigo-50/50", border: "border-indigo-100" },
          { label: "Pending", val: totals.pending, color: "text-amber-600 bg-amber-50/50", border: "border-amber-100" },
          { label: "Overdue", val: totals.overdue, color: "text-rose-600 bg-rose-50/50", border: "border-rose-100" }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white border ${item.border} p-5 rounded-2xl shadow-sm flex flex-col justify-between h-24`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label} Balance</span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-2xl font-black font-heading ${item.color.split(' ')[0]}`}>{item.val}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.color}`}>
                Total
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dual Column Layout: Left Invoice List, Right Invoice Detail sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Invoice List (7 columns on desktop) - Hidden on print */}
        <div className="lg:col-span-7 space-y-4 print:hidden">
          
          {/* Toolbar search */}
          <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Invoice ID, company..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
            </div>
            <button className="px-3.5 py-2.5 text-xs font-bold bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>This Month</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Bill To</th>
                  <th className="py-3 px-4">Date Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredInvoices.map((inv) => {
                  const sub = inv.lineItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
                  const tax = sub * (inv.taxRate || 0.08);
                  const tot = sub + tax + (inv.fee || 0) - (inv.discount || 0);
                  const isActive = inv.id === activeInvoiceId;

                  return (
                    <tr 
                      key={inv.id} 
                      onClick={() => setActiveInvoiceId(inv.id)}
                      className={`hover:bg-slate-50/50 transition-all font-semibold cursor-pointer ${
                        isActive ? 'bg-primary-50/15' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">{inv.id}</td>
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{inv.company}</p>
                          <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{inv.shippingId}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{inv.issueDate}</td>
                      <td className="py-3.5 px-4 text-slate-500">{inv.dueDate}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">${tot.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-right align-middle">
                        <StatusChip status={inv.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Invoice Billing Detail Panel (5 columns on desktop) */}
        <div className="lg:col-span-5 print:col-span-12 print:w-full">
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col print:border-none print:shadow-none">
            
            {/* Sheet Actions Header: Hidden on print */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50 print:hidden select-none">
              <span className="text-xs font-bold text-slate-700">Invoice Details</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrintInvoice}
                  className="p-2 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors border border-slate-200 bg-white cursor-pointer"
                  title="Print Invoice"
                >
                  <Printer className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => alert("Invoice downloaded successfully as PDF.")}
                  className="p-2 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors border border-slate-200 bg-white cursor-pointer"
                  title="Download Invoice"
                >
                  <Download className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet content */}
            <div className="p-6 sm:p-8 space-y-6 bg-white text-slate-800">
              
              {/* Logo block */}
              <div className="flex justify-between items-start gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2 select-none">
                  <div className="flex items-end gap-1.5 h-6">
                    <div className="w-1.5 h-4.5 bg-slate-900 rounded-sm transform -skew-x-12" />
                    <div className="w-1.5 h-6 bg-[#6366F1] rounded-sm transform -skew-x-12" />
                  </div>
                  <span className="text-lg font-black tracking-wider italic leading-none text-slate-900">
                    SHIPNOW
                  </span>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-black font-heading tracking-tight text-slate-900 leading-none">INVOICE</h2>
                  <p className="text-[10px] font-bold text-[#6366F1] tracking-wider mt-1">{activeInvoice.id}</p>
                </div>
              </div>

              {/* Bill From vs Bill To */}
              <div className="grid grid-cols-2 gap-6 text-[10px] font-semibold leading-relaxed">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1 select-none">Bill From</span>
                  <p className="font-extrabold text-slate-800 text-xs">{activeInvoice.billFrom.name}</p>
                  <p className="text-slate-500 mt-0.5">{activeInvoice.billFrom.address}</p>
                  <p className="text-slate-500">{activeInvoice.billFrom.email}</p>
                  <p className="text-slate-500">{activeInvoice.billFrom.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1 select-none">Bill To</span>
                  <p className="font-extrabold text-slate-800 text-xs">{activeInvoice.billTo.name}</p>
                  <p className="text-slate-500 mt-0.5">{activeInvoice.billTo.address}</p>
                  <p className="text-slate-500">{activeInvoice.billTo.email}</p>
                  <p className="text-slate-500">{activeInvoice.billTo.phone}</p>
                </div>
              </div>

              {/* Date Issued & Status row */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-3 gap-3 text-[10px] font-semibold">
                <div>
                  <span className="text-slate-400 block select-none">Date Issued</span>
                  <p className="font-extrabold text-slate-800 mt-0.5">{activeInvoice.issueDate}</p>
                </div>
                <div>
                  <span className="text-slate-400 block select-none">Due Date</span>
                  <p className="font-extrabold text-slate-800 mt-0.5">{activeInvoice.dueDate}</p>
                </div>
                <div>
                  <span className="text-slate-400 block select-none">Payment Status</span>
                  <div className="mt-1 shrink-0 scale-90 -ml-2 select-none">
                    <StatusChip status={activeInvoice.status} />
                  </div>
                </div>
              </div>

              {/* Itemized Line Table */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Itemized Shipment Logs</span>
                <div className="overflow-hidden border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-[11px] border-collapse bg-white">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-wider select-none">
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3 text-right">Price</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {activeInvoice.lineItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-800">{item.description}</p>
                            <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{item.shipmentType}</p>
                          </td>
                          <td className="py-3 px-3 text-right text-slate-500">${item.price.toFixed(2)}</td>
                          <td className="py-3 px-3 text-center text-slate-500">{item.qty}</td>
                          <td className="py-3 px-3 text-right font-extrabold text-slate-900">${(item.price * item.qty).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Calculations Block */}
              <div className="flex flex-col items-end pt-3 border-t border-slate-100 gap-1.5 text-[11px] font-semibold text-slate-600">
                <div className="w-56 flex justify-between">
                  <span className="text-slate-400 select-none">Subtotal</span>
                  <span className="font-bold text-slate-800">${invoiceCalculations.subtotal}</span>
                </div>
                <div className="w-56 flex justify-between">
                  <span className="text-slate-400 select-none">Tax (8%)</span>
                  <span className="font-bold text-slate-800">${invoiceCalculations.tax}</span>
                </div>
                <div className="w-56 flex justify-between">
                  <span className="text-slate-400 select-none">Fee</span>
                  <span className="font-bold text-slate-800">${invoiceCalculations.fee}</span>
                </div>
                {activeInvoice.discount > 0 && (
                  <div className="w-56 flex justify-between text-emerald-600">
                    <span className="select-none">Discount</span>
                    <span className="font-bold">-${invoiceCalculations.discount}</span>
                  </div>
                )}
                <div className="w-56 flex justify-between text-xs font-black border-t border-slate-100 pt-2 text-slate-900 mt-1.5">
                  <span className="select-none">Total Amount</span>
                  <span className="text-sm font-black text-[#6366F1]">${invoiceCalculations.total}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
