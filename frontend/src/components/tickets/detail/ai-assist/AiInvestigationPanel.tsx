import React from 'react';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { Ticket } from '../../../../types/ticket';
import { useTickets } from '../../../../context/TicketContext';
import { AiSummaryCard } from './AiSummaryCard';
import { SuggestedActions } from './SuggestedActions';
import { InvestigationLogs } from './InvestigationLogs';
import { KnowledgeMatches } from './KnowledgeMatches';

interface AiInvestigationPanelProps {
  ticket: Ticket;
}

export const AiInvestigationPanel: React.FC<AiInvestigationPanelProps> = ({ ticket }) => {
  const { isAiAnalyzing, reanalyzeTicket, aiError, clearAiError } = useTickets();
  const investigation = ticket.aiInvestigation;

  return (
    <div className="h-full flex flex-col bg-slate-50/70 border-l border-slate-200">
      {/* Top AI Co-Pilot Header */}
      <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-brand-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                AI Investigation Co-Pilot
              </h3>
              <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.2 rounded-full border border-purple-200">
                Live Telemetry
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Scanned 6 internal services • Updated {investigation.analyzedAt}
            </p>
          </div>
        </div>

        <button
          onClick={() => reanalyzeTicket(ticket.id)}
          disabled={isAiAnalyzing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors disabled:opacity-60"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isAiAnalyzing ? 'animate-spin text-purple-600' : ''}`}
          />
          <span>{isAiAnalyzing ? 'Re-analyzing...' : 'Rescan Telemetry'}</span>
        </button>
      </div>

      {/* Main Investigation Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Loading Indicator */}
        {isAiAnalyzing && (
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center gap-2.5 animate-pulse shadow-2xs">
            <Sparkles className="w-4 h-4 text-purple-600 animate-spin shrink-0" />
            <div>
              <p className="font-semibold text-purple-900">AI Co-Pilot is analyzing ticket with OpenRouter...</p>
              <p className="text-[11px] text-purple-600 mt-0.5">Diagnosing root cause, drafting reply & preparing suggested remediation actions.</p>
            </div>
          </div>
        )}

        {/* AI Error Banner */}
        {aiError && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{aiError}</span>
            </div>
            <button
              onClick={clearAiError}
              className="text-amber-800 hover:text-amber-950 font-bold px-2 py-0.5 rounded text-xs ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. Root Cause & Sentiment Synopsis */}
        <AiSummaryCard investigation={investigation} />

        {/* 2. Suggested Actions (Top Priority for Quick Remediation) */}
        <SuggestedActions
          ticketId={ticket.id}
          actions={investigation.suggestedActions}
        />

        {/* 3. Company Telemetry & System Logs Probed */}
        <InvestigationLogs logs={investigation.investigationLogs} />

        {/* 4. Matched Internal Runbooks & Solutions */}
        <KnowledgeMatches matches={investigation.matchedKnowledge} />
      </div>
    </div>
  );
};
