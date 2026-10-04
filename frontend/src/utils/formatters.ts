import { TicketPriority, TicketStatus, CustomerTier, SentimentAnalysis } from '../types/ticket';

export function getStatusBadgeConfig(status: TicketStatus) {
  switch (status) {
    case 'open':
      return {
        label: 'Open',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
      };
    case 'in_progress':
      return {
        label: 'In Progress',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'waiting_on_customer':
      return {
        label: 'Waiting on Customer',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        dot: 'bg-purple-500',
      };
    case 'escalated':
      return {
        label: 'Escalated',
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
      };
    case 'resolved':
      return {
        label: 'Resolved',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
      };
    default:
      return {
        label: status,
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        dot: 'bg-slate-500',
      };
  }
}

export function getPriorityBadgeConfig(priority: TicketPriority) {
  switch (priority) {
    case 'urgent':
      return {
        label: 'Urgent',
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        iconColor: 'text-red-600',
      };
    case 'high':
      return {
        label: 'High',
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-300',
        iconColor: 'text-orange-600',
      };
    case 'medium':
      return {
        label: 'Medium',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-300',
        iconColor: 'text-yellow-600',
      };
    case 'low':
      return {
        label: 'Low',
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        border: 'border-slate-300',
        iconColor: 'text-slate-500',
      };
  }
}

export function getTierBadgeConfig(tier: CustomerTier) {
  switch (tier) {
    case 'enterprise':
      return {
        label: 'Enterprise Tier',
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
      };
    case 'growth':
      return {
        label: 'Growth Tier',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
      };
    case 'starter':
      return {
        label: 'Starter Tier',
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
      };
  }
}

export function getSentimentBadgeConfig(sentiment: SentimentAnalysis) {
  switch (sentiment.level) {
    case 'urgent':
      return {
        label: 'Urgent / Distressed',
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        barColor: 'bg-red-500',
      };
    case 'frustrated':
      return {
        label: 'Frustrated',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        barColor: 'bg-amber-500',
      };
    case 'satisfied':
      return {
        label: 'Satisfied / Calm',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        barColor: 'bg-emerald-500',
      };
    case 'neutral':
    default:
      return {
        label: 'Neutral',
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        border: 'border-slate-200',
        barColor: 'bg-slate-400',
      };
  }
}

export function formatSla(minutes: number): { text: string; isWarning: boolean; isBreached: boolean } {
  if (minutes <= 0) {
    return { text: 'SLA Breached', isWarning: true, isBreached: true };
  }
  if (minutes < 30) {
    return { text: `${minutes}m SLA remaining`, isWarning: true, isBreached: false };
  }
  if (minutes < 60) {
    return { text: `${minutes}m SLA remaining`, isWarning: false, isBreached: false };
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return {
    text: remainingMins > 0 ? `${hours}h ${remainingMins}m SLA` : `${hours}h SLA`,
    isWarning: false,
    isBreached: false,
  };
}
