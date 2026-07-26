import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  type = 'button',
  disabled = false,
  onClick,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm border border-transparent rounded-lg",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-transparent rounded-lg",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600 rounded-lg",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm border border-transparent rounded-lg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
