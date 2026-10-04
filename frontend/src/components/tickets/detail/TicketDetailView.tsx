import React from 'react';
import { useTickets } from '../../../context/TicketContext';
import { TicketHeader } from './TicketHeader';
import { ConversationThread } from './ConversationThread';
import { MessageComposer } from './MessageComposer';
import { AiInvestigationPanel } from './ai-assist/AiInvestigationPanel';
import { Inbox, Sparkles, MessageSquare } from 'lucide-react';

export const TicketDetailView: React.FC = () => {
  const { selectedTicket, activeDetailView, setActiveDetailView } = useTickets();

  if (!selectedTicket) {
    return (
      <div className="flex-1 h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 text-slate-400">
        <div className="text-center space-y-3">
          <Inbox className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-700">No ticket selected</h3>
          <p className="text-xs text-slate-400">
            Select a ticket from the left panel to begin investigation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col bg-white overflow-hidden min-w-0">
      {/* 1. Header (Subject, SLA, Status, Customer Card) */}
      <TicketHeader ticket={selectedTicket} />

      {/* Mobile/Tablet tab switch if screen is narrow */}
      <div className="lg:hidden flex border-b border-slate-200 bg-slate-50 text-xs">
        <button
          onClick={() => setActiveDetailView('thread_focus')}
          className={`flex-1 py-2.5 font-medium flex items-center justify-center gap-1.5 ${
            activeDetailView !== 'investigation_focus'
              ? 'bg-white border-b-2 border-brand-600 text-brand-600 font-semibold'
              : 'text-slate-600'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Conversation Thread</span>
        </button>
        <button
          onClick={() => setActiveDetailView('investigation_focus')}
          className={`flex-1 py-2.5 font-medium flex items-center justify-center gap-1.5 ${
            activeDetailView === 'investigation_focus'
              ? 'bg-white border-b-2 border-purple-600 text-purple-700 font-semibold'
              : 'text-slate-600'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>AI Co-Pilot & Data</span>
        </button>
      </div>

      {/* 2. Main Workspace Body according to activeDetailView */}
      <div className="flex-1 flex overflow-hidden min-w-0">
        {/* Left Column: Conversation Thread & Composer */}
        {(activeDetailView === 'split' || activeDetailView === 'thread_focus') && (
          <div
            className={`flex flex-col h-full overflow-hidden ${
              activeDetailView === 'split' ? 'w-full lg:w-1/2 xl:w-7/12 border-r border-slate-200' : 'w-full'
            }`}
          >
            {/* Scrollable Conversation History */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
              <ConversationThread messages={selectedTicket.messages} />
            </div>

            {/* Reply Composer */}
            <MessageComposer ticketId={selectedTicket.id} />
          </div>
        )}

        {/* Right Column: AI Co-Pilot & Investigation */}
        {(activeDetailView === 'split' || activeDetailView === 'investigation_focus') && (
          <div
            className={`flex flex-col h-full overflow-hidden ${
              activeDetailView === 'split' ? 'hidden lg:flex lg:w-1/2 xl:w-5/12' : 'w-full'
            }`}
          >
            <AiInvestigationPanel ticket={selectedTicket} />
          </div>
        )}
      </div>
    </div>
  );
};
