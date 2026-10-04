import http from 'http';
import { URL } from 'url';
import { HealthController } from '../controllers/healthController';
import { InvestigationController } from '../controllers/investigationController';
import { OrderController } from '../controllers/orderController';
import { KnowledgeController } from '../controllers/knowledgeController';

export async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const method = req.method?.toUpperCase() || '';

  // 1. Health check
  if (method === 'GET' && url.pathname === '/health') {
    HealthController.getHealth(req, res);
    return;
  }

  // 2. AI Investigation
  if (method === 'POST' && url.pathname === '/api/ai/investigate') {
    await InvestigationController.investigate(req, res);
    return;
  }

  // 3. Knowledge base search
  if (method === 'POST' && url.pathname === '/api/kb/search') {
    await KnowledgeController.search(req, res);
    return;
  }

  // 4. Orders lookup
  const orderMatch = url.pathname.match(/^\/api\/orders\/(\w+)$/);
  if (method === 'GET' && orderMatch) {
    OrderController.getOrder(orderMatch[1], res);
    return;
  }

  // 5. Payments lookup
  const paymentMatch = url.pathname.match(/^\/api\/payments\/(\w+)$/);
  if (method === 'GET' && paymentMatch) {
    OrderController.getPayment(paymentMatch[1], res);
    return;
  }

  // Fallback 404 Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: `Route ${method} ${url.pathname} not found` }));
}
