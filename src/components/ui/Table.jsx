import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Table({
  columns = [],
  data = [],
  // Sorting
  sortKey = '',
  sortDirection = 'desc',
  onSort,
  // Row Selection
  selectedRowIds = new Set(),
  onRowSelect,
  onSelectAll,
  // Pagination
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  totalRecords = 0,
  className = ""
}) {
  
  const handleHeaderClick = (column) => {
    if (column.sortable && onSort) {
      const isCurrentKey = sortKey === column.key;
      const nextDir = isCurrentKey && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(column.key, nextDir);
    }
  };

  const isAllSelected = data.length > 0 && data.every(row => selectedRowIds.has(row.id));

  return (
    <div className={`w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      
      {/* Table responsive container */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider select-none">
            <tr>
              {/* Row selection check-all checkbox header */}
              {onSelectAll && (
                <th className="p-4 w-12 text-center align-middle">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                </th>
              )}
              {/* Custom headers */}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleHeaderClick(col)}
                  className={`p-4 font-semibold text-slate-500 cursor-pointer ${
                    col.sortable ? 'hover:bg-slate-100 hover:text-slate-900 transition-colors' : ''
                  } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  <div className={`flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : ''}`}>
                    <span>{col.title}</span>
                    {col.sortable && (
                      <div className="flex flex-col text-slate-400 shrink-0">
                        <ChevronUp className={`h-3 w-3 -mb-1 ${sortKey === col.key && sortDirection === 'asc' ? 'text-primary-600' : ''}`} />
                        <ChevronDown className={`h-3 w-3 ${sortKey === col.key && sortDirection === 'desc' ? 'text-primary-600' : ''}`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onSelectAll ? 1 : 0)} className="p-8 text-center text-slate-400">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const isSelected = selectedRowIds.has(row.id);
                return (
                  <tr 
                    key={row.id} 
                    className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-primary-50/10' : ''}`}
                  >
                    {/* Row selection check checkbox */}
                    {onRowSelect && (
                      <td className="p-4 w-12 text-center align-middle">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => onRowSelect(row.id, e.target.checked)}
                          className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                        />
                      </td>
                    )}
                    {/* Custom cells */}
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className={`p-4 align-middle text-slate-800 ${
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        }`}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {onPageChange && totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 bg-white text-xs select-none">
          {/* Left: Page Size Selector */}
          {onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Show</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="text-slate-500">of {totalRecords} results</span>
            </div>
          )}

          {/* Right: Page Navigation buttons */}
          <div className="flex items-center gap-1.5">
            {/* Prev button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page indices */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-primary-600 text-white shadow-sm' 
                      : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
