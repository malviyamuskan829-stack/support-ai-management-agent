import React from 'react';
import {
  Search,
  Bell,
  Sparkles,
  HelpCircle,
  Columns,
  MessageSquare,
} from 'lucide-react';
import { useTickets } from '../../context/TicketContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterTab,
    isAiAnalyzing,
    activeDetailView,
    setActiveDetailView,
  } = useTickets();

  const getFilterLabel = () => {
    switch (filterTab) {
      case 'all':
        return 'All Active Tickets';
      case 'assigned_to_me':
        return 'Assigned to Me';
      case 'urgent':
        return 'Urgent Priority Queue';
      case 'escalated':
        return 'Escalated Issues';
      case 'sla_risk':
        return 'High SLA Risk (<30m)';
      case 'resolved':
        return 'Resolved Archive';
      default:
        return 'Support Management';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none z-10">
      {/* Left Title / Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-semibold text-slate-900 tracking-tight">
            {getFilterLabel()}
          </h1>
          <p className="text-xs text-slate-500">
            Real-time ticket investigation & automated intelligence
          </p>
        </div>

        {/* AI Engine Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-medium">
          <Sparkles className={`w-3.5 h-3.5 text-purple-600 ${isAiAnalyzing ? 'animate-spin' : ''}`} />
          <span>
            {isAiAnalyzing ? 'AI Telemetry Scan in Progress...' : 'AI Co-Pilot: Active'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by customer, issue, error code, or tags..."
            className="w-full pl-9 pr-12 py-1.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-200/80 text-slate-500 px-1.5 py-0.5 rounded border border-slate-300 font-mono">
            /
          </kbd>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2">
        {/* Layout Mode Switcher */}
        <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-slate-600">
          <button
            title="Balanced Split View"
            onClick={() => setActiveDetailView('split')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeDetailView === 'split'
                ? 'bg-white text-slate-900 shadow-xs font-medium'
                : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden xl:inline">Split View</span>
          </button>
          <button
            title="Focus on AI Investigation & Data"
            onClick={() => setActiveDetailView('investigation_focus')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeDetailView === 'investigation_focus'
                ? 'bg-white text-purple-700 shadow-xs font-medium'
                : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[11px] hidden xl:inline">AI Focus</span>
          </button>
          <button
            title="Focus on Customer Conversation"
            onClick={() => setActiveDetailView('thread_focus')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeDetailView === 'thread_focus'
                ? 'bg-white text-slate-900 shadow-xs font-medium'
                : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden xl:inline">Thread</span>
          </button>
        </div>

        {/* Notification Bell */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Telemetry alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Documentation / Help */}
        <button
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Runbook & Docs"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
