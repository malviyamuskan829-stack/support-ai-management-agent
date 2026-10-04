import { KnowledgeMatch } from '../models/types';

const mockKnowledgeBase: KnowledgeMatch[] = [
  {
    id: 'kb-001',
    title: 'SOP: Instant Refunds for Double Debits & Failed Orders',
    category: 'Billing Policy',
    relevanceScore: 98,
    snippet: 'When customer confirms double payment for one order, verify gateway capture logs. If secondary charge is unlinked, trigger automated refund immediately to original payment source (2-4 business days for netbanking/UPI).',
    source: 'Internal Runbook',
    url: 'https://support.store.internal/sop/refunds',
  },
  {
    id: 'kb-002',
    title: 'SOP: Reconciling UPI Deducted but Order Failed Scenarios',
    category: 'Payment SOP',
    relevanceScore: 96,
    snippet: 'When UPI status is Captured but cart was dropped due to callback delay, convert payment into confirmed order or disburse full automated refund to VPA.',
    source: 'Internal Runbook',
    url: 'https://support.store.internal/sop/upi-failed-reconciliation',
  },
  {
    id: 'kb-003',
    title: 'SOP: Expediting Delayed Returns with Warehouse Intake Bottlenecks',
    category: 'Return & Refund Policy',
    relevanceScore: 95,
    snippet: 'If a return package has reached the fulfillment center but QC has taken longer than 48 hours, support agents are authorized to force-approve the refund of up to ₹5,000 immediately.',
    source: 'Internal Runbook',
    url: 'https://support.store.internal/sop/delayed-refund-release',
  },
  {
    id: 'kb-004',
    title: 'SOP: Doorstep Hand-to-Hand Exchange for Mispicked Items',
    category: 'Fulfillment SOP',
    relevanceScore: 97,
    snippet: 'For wrong-item deliveries, create a Hand-to-Hand Exchange order. The courier delivers the correct item and collects the wrong item simultaneously at zero extra cost to customer.',
    source: 'SOP Guideline',
    url: 'https://support.store.internal/sop/doorstep-exchange',
  },
];

export class KnowledgeService {
  static search(category?: string, keywords?: string): KnowledgeMatch[] {
    const term = (keywords || '').toLowerCase();
    const cat = (category || '').toLowerCase();

    return mockKnowledgeBase.filter((item) => {
      const matchCat = !category || item.category.toLowerCase().includes(cat) || cat.includes(item.category.toLowerCase());
      const matchTerm = !keywords || item.title.toLowerCase().includes(term) || item.snippet.toLowerCase().includes(term);
      return matchCat || matchTerm;
    });
  }
}
