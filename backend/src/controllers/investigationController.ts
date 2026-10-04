import http from 'http';
import { parseJsonBody } from '../middleware/bodyParser';
import { InvestigationService } from '../services/investigationService';
import { OpenRouterError, ValidationError } from '../utils/errors';

export class InvestigationController {
  static async investigate(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const ticket = await parseJsonBody(req);

      if (!ticket || (!ticket.id && !ticket.subject)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid ticket payload: missing ticket information' }));
        return;
      }

      const { aiInvestigation, rawAiResult } = await InvestigationService.investigateTicket(ticket);

      const responsePayload = {
        ...rawAiResult,
        aiInvestigation,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responsePayload));
    } catch (err: any) {
      console.error('❌ [InvestigationController Error]:', err.message);
      const status = (err instanceof OpenRouterError || err instanceof ValidationError) && err.status ? err.status : 500;
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message || 'AI ticket investigation failed' }));
    }
  }
}
