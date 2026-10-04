import http from 'http';
import { parseJsonBody } from '../middleware/bodyParser';
import { KnowledgeService } from '../services/knowledgeService';

export class KnowledgeController {
  static async search(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const body = await parseJsonBody(req);
      const { category, keywords } = body;
      const matches = KnowledgeService.search(category, keywords);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(matches));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON request payload' }));
    }
  }
}
