import React, { useState, useMemo } from 'react';
import { ArrowDownUp, AlertCircle, RefreshCw } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { TicketCard } from './TicketCard';
import { TicketFilters } from './TicketFilters';

export const TicketList: React.FC = () => {
  const { filteredTickets, isAiAnalyzing, reanalyzeTicket, selectedTicketId } = useTickets();
  const [sortBy, setSortBy] = useState<'sla' | 'priority' | 'newest'>('sla');

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
      if (sortBy === 'sla') {
        return a.slaMinutesRemaining - b.slaMinutesRemaining;
      }
      if (sortBy === 'priority') {
        const order = { urgent: 0, high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredTickets, sortBy]);

  return (
    <div className="w-80 lg:w-96 h-[calc(100vh-4rem)] border-r border-slate-200 bg-white flex flex-col shrink-0">
      {/* Filters Header */}
      <TicketFilters />

      {/* Sort Bar */}
      <div className="px-3 py-2 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <ArrowDownUp className="w-3.5 h-3.5" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'sla' | 'priority' | 'newest')}
            aria-label="Sort tickets by"
            className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="sla">SLA Urgency</option>
            <option value="priority">Priority Level</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <button
          onClick={() => selectedTicketId && reanalyzeTicket(selectedTicketId)}
          title="Refresh AI analysis on selected ticket"
          className="hover:text-purple-600 transition-colors p-1 rounded hover:bg-slate-100 flex items-center gap-1 text-[11px]"
        >
          <RefreshCw className={`w-3 h-3 ${isAiAnalyzing ? 'animate-spin text-purple-600' : ''}`} />
          <span className="hidden sm:inline">Rescan</span>
        </button>
      </div>

      {/* Scrollable Ticket Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium text-slate-600">No tickets found</p>
            <p className="text-[11px] text-slate-400">
              Try adjusting your search or active filter pills.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
