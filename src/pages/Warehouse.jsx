import React from 'react';

export default function Warehouse() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-800">Warehouse Analytics</h1>
          <p className="text-sm text-slate-500">Monitor warehouse bins, occupancy status, and floor diagrams.</p>
        </div>
      </div>
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm h-64 flex items-center justify-center text-slate-400">
        Placeholder for Warehouse Layout map and metrics (Phase 9)
      </div>
    </div>
  );
}
