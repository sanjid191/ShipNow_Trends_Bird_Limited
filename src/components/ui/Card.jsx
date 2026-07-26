import React from 'react';

export default function Card({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className = '', 
  bodyClassName = '' 
}) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Card Header */}
      {(title || subtitle || actions) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 select-none">
          <div>
            {title && (
              <h3 className="text-base font-bold font-heading text-slate-900 leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      
      {/* Card Body */}
      <div className={`flex-1 p-6 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
