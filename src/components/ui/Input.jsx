import React from 'react';

// FormField Container wraps Label + Input + Error
export function FormField({ 
  label, 
  error, 
  required = false, 
  children, 
  className = "" 
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-700 select-none">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="text-xs font-medium text-red-500 animate-fade-in mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}

// Text Input Wrapper
export const Input = React.forwardRef(({ 
  type = 'text', 
  error, 
  icon: Icon,
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="relative flex items-center">
      {Icon && (
        <Icon className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
      )}
      <input
        type={type}
        ref={ref}
        className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-100 focus:border-primary-500'
        } rounded-lg placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
          Icon ? 'pl-10' : ''
        } ${className}`}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

// Select Dropdown Wrapper
export const Select = React.forwardRef(({ 
  error, 
  options = [], 
  placeholder,
  className = '', 
  children,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
        error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-100 focus:border-primary-500'
      } rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {children ? children : options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});
Select.displayName = 'Select';

// Textarea Wrapper
export const Textarea = React.forwardRef(({ 
  error, 
  rows = 3, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
        error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-100 focus:border-primary-500'
      } rounded-lg placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 ${className}`}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';
