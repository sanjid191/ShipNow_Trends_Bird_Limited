import React from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome to your logistics dashboard.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
          <h3 className="text-slate-500 font-medium text-sm">Active Shipments</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">1,284</p>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
          <h3 className="text-slate-500 font-medium text-sm">In Warehouse</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">4,821</p>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
          <h3 className="text-slate-500 font-medium text-sm">Invoices Pending</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">$24,930</p>
        </div>
      </div>
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm h-64 flex items-center justify-center text-slate-400">
        Placeholder for charts, map, and timeline (Phase 5)
      </div>
    </div>
  );
}
