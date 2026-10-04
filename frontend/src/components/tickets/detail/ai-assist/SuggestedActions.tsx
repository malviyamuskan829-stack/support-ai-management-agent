import React from 'react';
import {
  Zap,
  Check,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { SuggestedAction } from '../../../../types/ticket';
import { useTickets } from '../../../../context/TicketContext';
import { Button } from '../../../common/Button';

interface SuggestedActionsProps {
  ticketId: string;
  actions: SuggestedAction[];
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({
  ticketId,
  actions,
}) => {
  const { executeAction, setDraftInComposer, selectedTicket } = useTickets();

  const getImpactBadge = (impact: SuggestedAction['impact']) => {
    switch (impact) {
      case 'low':
        return (
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
            Safe (Automated)
          </span>
        );
      case 'moderate':
        return (
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
            Moderate Impact
          </span>
        );
      case 'high':
        return (
          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">
            Requires Lead Approval
          </span>
        );
    }
  };

  const handleActionClick = (action: SuggestedAction) => {
    if (action.executed) return;

    if (action.type === 'reply' && selectedTicket?.aiInvestigation?.draftReply) {
      const draft = `${selectedTicket.aiInvestigation.draftReply.greeting}\n\n${selectedTicket.aiInvestigation.draftReply.body}\n\nBest regards,\nAlex Rivera\nSupport Escalations`;
      setDraftInComposer(draft);
    }

    executeAction(ticketId, action.id);
  };

  return (
    <div className="bg-white rounded-xl border border-purple-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
          <h4 className="text-xs font-bold text-slate-900">
            AI-Prepared Next Actions & Remedies
          </h4>
        </div>
        <span className="text-[10px] font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
          One-Click Execution
        </span>
      </div>

      {/* Action Cards */}
      <div className="p-3 space-y-2.5">
        {actions.length > 0 ? (
          actions.map((act) => (
            <div
              key={act.id}
              className={`p-3.5 rounded-xl border transition-all ${
                act.executed
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-500'
                  : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5
                      className={`text-xs font-bold ${
                        act.executed ? 'text-emerald-900 line-through' : 'text-slate-900'
                      }`}
                    >
                      {act.title}
                    </h5>
                    {getImpactBadge(act.impact)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                {/* Execution Button */}
                <div className="shrink-0">
                  {act.executed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1.5 rounded-lg border border-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                      <span>Executed</span>
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant={act.impact === 'high' ? 'outline' : 'ai'}
                      onClick={() => handleActionClick(act)}
                      icon={
                        act.impact === 'high' ? (
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )
                      }
                    >
                      Execute Action
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-xs text-slate-400">
            No further actions required. Ticket is fully resolved.
          </div>
        )}
      </div>
    </div>
  );
};
