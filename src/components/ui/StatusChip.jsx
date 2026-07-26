import React from 'react';

export default function StatusChip({ status }) {
  if (!status) return null;

  const normalized = status.toLowerCase().trim();

  // Color mapping based on ShipNow design system
  const statusStyles = {
    // In Transit / Delivery
    delivery: "bg-indigo-50 text-indigo-700 border-indigo-100",
    "in transit": "bg-indigo-50 text-indigo-700 border-indigo-100",
    transit: "bg-indigo-50 text-indigo-700 border-indigo-100",

    // Out for Delivery
    "out for delivery": "bg-purple-50 text-purple-700 border-purple-100",

    // Completed / Success
    completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    received: "bg-emerald-50 text-emerald-700 border-emerald-100",
    paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
    sent: "bg-indigo-50 text-indigo-700 border-indigo-100", // "Sent" is active/delivery-like in warehouse log

    // Pending / Processing
    pending: "bg-slate-100 text-slate-600 border-slate-200",
    processing: "bg-slate-100 text-slate-600 border-slate-200",
    expected: "bg-amber-50 text-amber-700 border-amber-100",
    unpaid: "bg-indigo-50/50 text-indigo-600 border-indigo-100/50",
    expected: "bg-amber-50 text-amber-700 border-amber-100",

    // Overdue / Failed / Cancelled
    overdue: "bg-rose-50 text-rose-700 border-rose-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
    error: "bg-rose-50 text-rose-700 border-rose-100"
  };

  const dots = {
    delivery: "bg-indigo-500",
    "in transit": "bg-indigo-500",
    transit: "bg-indigo-500",
    "out for delivery": "bg-purple-500",
    completed: "bg-emerald-500",
    delivered: "bg-emerald-500",
    received: "bg-emerald-500",
    paid: "bg-emerald-500",
    sent: "bg-indigo-500",
    pending: "bg-slate-400",
    processing: "bg-slate-400",
    expected: "bg-amber-500",
    unpaid: "bg-indigo-400",
    overdue: "bg-rose-500",
    cancelled: "bg-rose-500",
    error: "bg-rose-500"
  };

  const styleClass = statusStyles[normalized] || "bg-slate-100 text-slate-700 border-slate-200";
  const dotClass = dots[normalized] || "bg-slate-400";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styleClass} whitespace-nowrap`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {status}
    </span>
  );
}
