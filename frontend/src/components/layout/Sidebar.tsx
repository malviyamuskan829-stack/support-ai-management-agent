import React, { useState } from 'react';
import {
  Inbox,
  UserCheck,
  Flame,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Activity,
  BarChart3,
  Settings,
  ShieldAlert,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { TicketFilterTab } from '../../types/ticket';
import { Avatar } from '../common/Avatar';

export const Sidebar: React.FC = () => {
  const { filterTab, setFilterTab, tickets } = useTickets();
  const [agentStatus, setAgentStatus] = useState<'online' | 'busy' | 'away'>('online');
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Counts
  const allCount = tickets.filter((t) => t.status !== 'resolved').length;
  const assignedCount = tickets.filter(
    (t) => t.assignedAgent?.id === 'agent-1' && t.status !== 'resolved'
  ).length;
  const urgentCount = tickets.filter((t) => t.priority === 'urgent' && t.status !== 'resolved').length;
  const escalatedCount = tickets.filter((t) => t.status === 'escalated').length;
  const resolvedCount = tickets.filter((t) => t.status === 'resolved').length;

  const navItems: {
    id: TicketFilterTab;
    label: string;
    icon: React.ReactNode;
    count?: number;
    badgeVariant?: 'red' | 'default';
  }[] = [
    {
      id: 'all',
      label: 'All Active Tickets',
      icon: <Inbox className="w-4 h-4" />,
      count: allCount,
    },
    {
      id: 'assigned_to_me',
      label: 'Assigned to Me',
      icon: <UserCheck className="w-4 h-4" />,
      count: assignedCount,
    },
    {
      id: 'urgent',
      label: 'Urgent Priority',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      count: urgentCount,
      badgeVariant: 'red',
    },
    {
      id: 'escalated',
      label: 'Escalations',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      count: escalatedCount,
    },
    {
      id: 'resolved',
      label: 'Resolved Archive',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      count: resolvedCount,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col shrink-0 select-none border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-white tracking-tight text-sm">
              Support AI
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Agent
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Intelligent Operations</p>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Ticket Queues */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Ticket Queues
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = filterTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setFilterTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeVariant === 'red' && item.count > 0
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI & Company Data Tools */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>AI Knowledge & Data</span>
            <span className="text-[9px] px-1 bg-purple-900/60 text-purple-300 border border-purple-700/50 rounded">
              Active
            </span>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Internal Runbooks</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Telemetry Streams</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
              <span>Audit & Compliance</span>
            </button>
          </div>
        </div>

        {/* Analytics & System */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Insights
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>SLA Performance</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Agent Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Agent Profile Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 relative">
        <div
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Avatar
              name="Alex Rivera"
              size="sm"
              status={agentStatus}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            />
            <div className="text-left">
              <div className="text-xs font-medium text-white truncate max-w-[110px]">
                Alex Rivera
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 capitalize">
                <span>{agentStatus}</span>
                <span className="text-[9px] text-purple-400">• Co-Pilot ON</span>
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Status Dropdown */}
        {showStatusMenu && (
          <div className="absolute bottom-16 left-3 right-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1.5 z-50 space-y-1 text-xs">
            <button
              onClick={() => {
                setAgentStatus('online');
                setShowStatusMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-slate-700 text-left text-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available (Online)</span>
            </button>
            <button
              onClick={() => {
                setAgentStatus('busy');
                setShowStatusMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-slate-700 text-left text-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Busy / On Incident Call</span>
            </button>
            <button
              onClick={() => {
                setAgentStatus('away');
                setShowStatusMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-slate-700 text-left text-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Away / Break</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
