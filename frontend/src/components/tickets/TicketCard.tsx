import React from 'react';
import {
  Clock,
  Sparkles,
  Mail,
  Globe,
  MessageCircle,
  Webhook,
  AlertCircle,
} from 'lucide-react';
import { Ticket } from '../../types/ticket';
import { useTickets } from '../../context/TicketContext';
import {
  getStatusBadgeConfig,
  getPriorityBadgeConfig,
  formatSla,
} from '../../utils/formatters';
import { Avatar } from '../common/Avatar';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { selectedTicketId, setSelectedTicketId } = useTickets();
  const isSelected = ticket.id === selectedTicketId;

  const statusConfig = getStatusBadgeConfig(ticket.status);
  const priorityConfig = getPriorityBadgeConfig(ticket.priority);
  const slaInfo = formatSla(ticket.slaMinutesRemaining);

  const getChannelIcon = () => {
    switch (ticket.channel) {
      case 'email':
        return (
          <span title="Email Ticket">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
          </span>
        );
      case 'portal':
        return (
          <span title="Web Portal">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
          </span>
        );
      case 'live_chat':
        return (
          <span title="Live Chat">
            <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
          </span>
        );
      case 'api_webhook':
        return (
          <span title="Webhook / API Alert">
            <Webhook className="w-3.5 h-3.5 text-slate-400" />
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => setSelectedTicketId(ticket.id)}
      className={`p-3.5 border-b cursor-pointer transition-all relative text-left group ${
        isSelected
          ? 'bg-brand-50/70 border-brand-200 shadow-xs'
          : 'bg-white hover:bg-slate-50 border-slate-200'
      }`}
    >
      {/* Selected Indicator Bar on Left */}
      {isSelected && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600 rounded-r" />
      )}

      {/* Row 1: Company, Ticket # and Channel */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar
            name={ticket.customer.name}
            src={ticket.customer.avatar}
            size="sm"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-900 truncate">
                {ticket.customer.company}
              </span>
              {ticket.customer.tier === 'enterprise' && (
                <span className="text-[9px] font-bold px-1 rounded bg-indigo-100 text-indigo-700 tracking-wider">
                  ENT
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 truncate block">
              {ticket.customer.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {getChannelIcon()}
          <span className="text-[11px] font-mono font-medium text-slate-400">
            {ticket.ticketNumber}
          </span>
        </div>
      </div>

      {/* Row 2: Subject */}
      <h3
        className={`text-xs font-medium line-clamp-2 leading-relaxed mb-2 ${
          isSelected ? 'text-brand-950 font-semibold' : 'text-slate-800'
        }`}
      >
        {ticket.subject}
      </h3>

      {/* Row 3: AI Snapshot summary snippet */}
      <div className="mb-2.5 p-1.5 rounded bg-slate-100/70 text-[11px] text-slate-600 flex items-start gap-1.5">
        <Sparkles className="w-3 h-3 text-purple-600 shrink-0 mt-0.5" />
        <span className="line-clamp-1 italic text-slate-600">
          {ticket.aiInvestigation.issueSummary}
        </span>
      </div>

      {/* Row 4: Priority, Status and SLA countdown */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-1.5">
          {/* Priority */}
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}
          >
            {priorityConfig.label}
          </span>

          {/* Status */}
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-medium border flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
            {statusConfig.label}
          </span>
        </div>

        {/* SLA Timer */}
        <div
          className={`flex items-center gap-1 text-[11px] font-medium ${
            slaInfo.isWarning
              ? 'text-rose-600 font-semibold animate-pulse'
              : 'text-slate-500'
          }`}
          title="Time to SLA Target"
        >
          {slaInfo.isWarning ? (
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>{slaInfo.text}</span>
        </div>
      </div>
    </div>
  );
};
