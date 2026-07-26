import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 select-none">
      {children}
    </div>
  );
}
