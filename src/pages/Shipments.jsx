import React from 'react';

export default function Shipments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-800">Shipments</h1>
          <p className="text-sm text-slate-500">Manage and track your logistics deliveries.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/shipments/create'}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Create Shipment
        </button>
      </div>
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm h-64 flex items-center justify-center text-slate-400">
        Placeholder for Shipments table/grid views and controls (Phase 6)
      </div>
    </div>
  );
}
