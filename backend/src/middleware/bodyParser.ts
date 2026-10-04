import http from 'http';

export function collectBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      // Safeguard against oversized payloads (max 10MB)
      if (data.length > 10 * 1024 * 1024) {
        reject(new Error('Request entity too large'));
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', (err) => reject(err));
  });
}

export async function parseJsonBody<T = any>(req: http.IncomingMessage): Promise<T> {
  const bodyText = await collectBody(req);
  if (!bodyText.trim()) return {} as T;
  return JSON.parse(bodyText) as T;
}
