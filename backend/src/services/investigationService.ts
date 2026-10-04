import { Ticket, AiInvestigationReport } from '../models/types';
import { callOpenRouter } from '../ai/openrouter';
import { validateAiResult } from '../utils/validation';

export class InvestigationService {
  /**
   * Performs an autonomous AI investigation on a customer ticket via OpenRouter,
   * validates the response schema, and builds a comprehensive report.
   */
  static async investigateTicket(ticket: Ticket): Promise<{ aiInvestigation: AiInvestigationReport; rawAiResult: any }> {
    console.log(`🤖 [InvestigationService] Investigating ticket: ${ticket.ticketNumber || ticket.id} - "${ticket.subject}"`);

    // 1. Call OpenRouter LLM
    const aiResult = await callOpenRouter(ticket);

    // 2. Validate response with Ajv JSON Schema
    validateAiResult(aiResult);

    console.log(`✓ [InvestigationService] Verified valid AI response for: ${ticket.ticketNumber || ticket.id}`);

    // 3. Assemble structured report matching frontend expectations
    const aiInvestigation: AiInvestigationReport = {
      status: 'ready',
      analyzedAt: 'Just now (Live OpenRouter AI)',
      confidenceScore: aiResult.confidenceScore || 95,
      rootCauseAnalysis: aiResult.rootCauseAnalysis || aiResult.issueUnderstanding || 'Root cause analyzed by AI model.',
      issueSummary: aiResult.issueSummary || ticket.subject,
      sentiment: aiResult.sentiment || {
        level: 'urgent',
        score: 85,
        summary: 'Customer issue analyzed by AI Co-Pilot.',
        drivers: ['Customer transaction or order inquiry']
      },
      extractedEntities: Array.isArray(aiResult.extractedEntities) ? aiResult.extractedEntities : [],
      investigationLogs: Array.isArray(aiResult.investigationLogs) && aiResult.investigationLogs.length > 0
        ? aiResult.investigationLogs
        : (ticket.aiInvestigation?.investigationLogs || []),
      matchedKnowledge: Array.isArray(aiResult.matchedKnowledge) && aiResult.matchedKnowledge.length > 0
        ? aiResult.matchedKnowledge
        : (ticket.aiInvestigation?.matchedKnowledge || []),
      suggestedActions: Array.isArray(aiResult.suggestedActions) && aiResult.suggestedActions.length > 0
        ? aiResult.suggestedActions
        : (ticket.aiInvestigation?.suggestedActions || []),
      draftReply: {
        greeting: aiResult.draftCustomerReply?.greeting || `Hi ${ticket.customer?.name ? ticket.customer.name.split(' ')[0] : 'there'},`,
        tone: aiResult.draftCustomerReply?.tone || 'Empathetic & Technical',
        body: aiResult.draftCustomerReply?.body || '',
        keyPointsCovered: Array.isArray(aiResult.draftCustomerReply?.keyPointsCovered)
          ? aiResult.draftCustomerReply.keyPointsCovered
          : ['Root cause investigated', 'Remediation steps provided']
      }
    };

    return {
      aiInvestigation,
      rawAiResult: aiResult,
    };
  }
}
