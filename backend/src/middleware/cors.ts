import http from 'http';

export function applyCorsHeaders(req: http.IncomingMessage, res: http.ServerResponse): boolean {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method?.toUpperCase() === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true; // Request handled
  }
  return false; // Proceed to route handler
}
