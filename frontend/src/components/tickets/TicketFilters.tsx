import React from 'react';
import { Filter, X } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';

export const TicketFilters: React.FC = () => {
  const {
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    filteredTickets,
    tickets,
  } = useTickets();

  const priorities = [
    { id: 'all', label: 'All Priorities' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  const categories = [
    'All Categories',
    'Authentication & SSO',
    'Billing & Checkout',
    'API & Webhooks',
    'Security & Compliance',
  ];

  const hasActiveFilters = priorityFilter !== 'all' || categoryFilter !== 'all';

  const resetFilters = () => {
    setPriorityFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filters</span>
          <span className="text-[11px] text-slate-400">
            ({filteredTickets.length} of {tickets.length})
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] text-brand-600 hover:text-brand-800 flex items-center gap-0.5 font-medium"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Priority Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
        {priorities.map((p) => {
          const isSelected = priorityFilter === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setPriorityFilter(p.id)}
              className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Category Dropdown */}
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by Category"
          className="w-full text-xs py-1 px-2 bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
