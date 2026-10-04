import http from 'http';

export class HealthController {
  static getHealth(_req: http.IncomingMessage, res: http.ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'support-ai-management-agent-backend',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      })
    );
  }
}
