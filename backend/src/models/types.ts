export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  tier?: 'enterprise' | 'growth' | 'starter';
  arr?: string;
  region?: string;
  timezone?: string;
  tenure?: string;
  healthScore?: number;
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
}

export interface SentimentAnalysis {
  level: 'frustrated' | 'urgent' | 'neutral' | 'satisfied';
  score: number;
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
  relevanceScore: number;
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
  confidenceScore: number;
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
  status: 'open' | 'in_progress' | 'waiting_on_customer' | 'escalated' | 'resolved';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  channel: 'email' | 'portal' | 'live_chat' | 'api_webhook';
  category: 'Authentication & SSO' | 'Billing & Checkout' | 'API & Webhooks' | 'Security & Compliance' | 'Data & Export';
  createdAt: string;
  updatedAt: string;
  slaMinutesRemaining: number;
  messages: TicketMessage[];
  aiInvestigation?: AiInvestigationReport;
  tags?: string[];
}

export interface Order {
  orderId: string;
  status: string;
  expectedShipDate: string;
  trackingUrl: string;
  carrier: string;
}

export interface PaymentInfo {
  paid: boolean;
  refundEligible: boolean;
}
