import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
      <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold font-heading text-slate-800 mb-2">{title}</h1>
      <p className="text-slate-500 text-center max-w-md">
        This screen is part of the ShipNow application navigation shell but its custom design is not specified in the active prototype scope.
      </p>
    </div>
  );
}
