// Main entrypoint for Support AI Ticket Management Agent Backend
import 'dotenv/config';
import http from 'http';
import { applyCorsHeaders } from './middleware/cors';
import { handleRequest } from './routes/router';

const PORT = Number(process.env.PORT) || 4000;

const server = http.createServer(async (req, res) => {
  // 1. Handle CORS & preflight OPTIONS
  const handled = applyCorsHeaders(req, res);
  if (handled) return;

  // 2. Route application requests
  await handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`🚀 Support AI Backend listening on http://localhost:${PORT}`);
});

export default server;
