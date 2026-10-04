import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TicketList } from '../tickets/TicketList';
import { TicketDetailView } from '../tickets/detail/TicketDetailView';
import { useTickets } from '../../context/TicketContext';
import { CheckCircle2, X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { toastNotification, clearToast } = useTickets();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans antialiased text-slate-800">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Dashboard 2-Pane Body */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          {/* Ticket List Pane */}
          <TicketList />

          {/* Ticket Detail + AI Investigation Pane */}
          <TicketDetailView />
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastNotification}</span>
          <button
            onClick={clearToast}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
