export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_customer' | 'escalated' | 'resolved';

export type TicketPriority = 'urgent' | 'high' | 'medium' | 'low';

export type TicketChannel = 'email' | 'portal' | 'live_chat' | 'api_webhook';

export type CustomerTier = 'enterprise' | 'growth' | 'starter';

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  tier: CustomerTier;
  arr: string;
  region: string;
  timezone: string;
  tenure: string;
  healthScore: number; // 0 - 100
}

export interface TicketMessage {
  id: string;
  senderType: 'customer' | 'agent' | 'system';
  senderName: string;
  senderEmail?: string;
  senderAvatar?: string;
  timestamp: string;
  content: string;
  isInternalNote?: boolean;
  attachments?: { name: string; size: string }[];
}

export interface SentimentAnalysis {
  level: 'frustrated' | 'urgent' | 'neutral' | 'satisfied';
  score: number; // 0 - 100
  summary: string;
  drivers: string[];
}

export interface ExtractedEntity {
  label: string;
  value: string;
  type: 'error_code' | 'system' | 'endpoint' | 'billing' | 'account';
}

export interface InvestigationLog {
  id: string;
  source: 'Auth0 Audit Stream' | 'Stripe Telemetry' | 'APM & Datadog' | 'Database Cluster' | 'AWS CloudTrail' | 'Billing Ledger';
  status: 'error' | 'warning' | 'info' | 'success';
  timestamp: string;
  title: string;
  details: string;
  rawSnippet?: string;
}

export interface KnowledgeMatch {
  id: string;
  title: string;
  category: string;
  relevanceScore: number; // e.g. 98%
  snippet: string;
  source: 'Internal Runbook' | 'Public Docs' | 'SOP Guideline' | 'Past Resolved Ticket';
  url?: string;
}

export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  type: 'execute' | 'escalate' | 'reply' | 'refund' | 'config';
  impact: 'low' | 'moderate' | 'high';
  executed?: boolean;
  actionPayload?: string;
}

export interface AiDraftReply {
  greeting: string;
  body: string;
  tone: 'Empathetic & Technical' | 'Direct & Action-Oriented' | 'Executive Brief';
  keyPointsCovered: string[];
}

export interface AiInvestigationReport {
  status: 'ready' | 'analyzing' | 'needs_review';
  analyzedAt: string;
  confidenceScore: number; // e.g. 96
  rootCauseAnalysis: string;
  issueSummary: string;
  sentiment: SentimentAnalysis;
  extractedEntities: ExtractedEntity[];
  investigationLogs: InvestigationLog[];
  matchedKnowledge: KnowledgeMatch[];
  suggestedActions: SuggestedAction[];
  draftReply: AiDraftReply;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  customer: Customer;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  category: 'Authentication & SSO' | 'Billing & Checkout' | 'API & Webhooks' | 'Security & Compliance' | 'Data & Export';
  createdAt: string;
  updatedAt: string;
  slaMinutesRemaining: number; // positive = time left, negative = breached
  assignedAgent?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  messages: TicketMessage[];
  aiInvestigation: AiInvestigationReport;
  tags: string[];
}

export type TicketFilterTab = 'all' | 'assigned_to_me' | 'urgent' | 'escalated' | 'sla_risk' | 'resolved';
