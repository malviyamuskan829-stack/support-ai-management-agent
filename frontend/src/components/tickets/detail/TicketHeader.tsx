import React from 'react';
import {
  Clock,
  Building,
  DollarSign,
  MapPin,
  HeartHandshake,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { Ticket, TicketStatus, TicketPriority } from '../../../types/ticket';
import { useTickets } from '../../../context/TicketContext';
import {
  getStatusBadgeConfig,
  getPriorityBadgeConfig,
  formatSla,
} from '../../../utils/formatters';
import { Avatar } from '../../common/Avatar';

interface TicketHeaderProps {
  ticket: Ticket;
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({ ticket }) => {
  const { updateTicketStatus, updateTicketPriority } = useTickets();

  const statusConfig = getStatusBadgeConfig(ticket.status);
  const priorityConfig = getPriorityBadgeConfig(ticket.priority);
  const slaInfo = formatSla(ticket.slaMinutesRemaining);

  const statuses: { id: TicketStatus; label: string }[] = [
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'waiting_on_customer', label: 'Waiting on Customer' },
    { id: 'escalated', label: 'Escalated' },
    { id: 'resolved', label: 'Resolved' },
  ];

  const priorities: { id: TicketPriority; label: string }[] = [
    { id: 'urgent', label: 'Urgent' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 p-5 shrink-0">
      {/* Upper bar: Ticket Number, Badges, Dropdowns */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
            {ticket.ticketNumber}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500 font-medium">
            {ticket.category}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-400">
            Channel: <strong className="text-slate-600 capitalize">{ticket.channel.replace('_', ' ')}</strong>
          </span>
        </div>

        {/* Status, Priority & SLA */}
        <div className="flex items-center gap-2">
          {/* Priority Selector */}
          <select
            value={ticket.priority}
            onChange={(e) => updateTicketPriority(ticket.id, e.target.value as TicketPriority)}
            aria-label="Ticket Priority"
            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border} focus:outline-none cursor-pointer`}
          >
            {priorities.map((p) => (
              <option key={p.id} value={p.id}>
                Priority: {p.label}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={ticket.status}
            onChange={(e) => updateTicketStatus(ticket.id, e.target.value as TicketStatus)}
            aria-label="Ticket Status"
            className={`text-xs font-medium px-2.5 py-1 rounded-md border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} focus:outline-none cursor-pointer`}
          >
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                Status: {s.label}
              </option>
            ))}
          </select>

          {/* SLA Timer Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              slaInfo.isWarning
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
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

      {/* Ticket Subject */}
      <h2 className="text-lg font-bold text-slate-900 leading-snug mb-3.5">
        {ticket.subject}
      </h2>

      {/* Customer Intelligence Ribbon */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        {/* Customer Identity */}
        <div className="flex items-center gap-3">
          <Avatar
            name={ticket.customer.name}
            src={ticket.customer.avatar}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {ticket.customer.name}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                &lt;{ticket.customer.email}&gt;
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-800">
                {ticket.customer.company}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 uppercase">
                {ticket.customer.tier} Tier
              </span>
            </div>
          </div>
        </div>

        {/* Customer Metrics */}
        <div className="flex items-center gap-4 text-xs text-slate-600 divide-x divide-slate-200">
          <div className="flex items-center gap-1.5 pl-2">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">ARR</div>
              <div className="font-semibold text-slate-800">{ticket.customer.arr}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Region</div>
              <div className="font-medium text-slate-700">{ticket.customer.region}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-4">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-600" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Health</div>
              <div className="font-semibold text-slate-800">{ticket.customer.healthScore}/100</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Tag className="w-3 h-3 text-slate-400" />
          {ticket.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
