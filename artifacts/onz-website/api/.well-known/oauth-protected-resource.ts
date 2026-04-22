import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://digitalpersona.ai';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    resource: 'https://digitalpersona.ai',
    authorization_servers: [`${BASE_URL}/.well-known/openid-configuration`],
    scopes_supported: ['read', 'write'],
    resource_signing_alg_values_supported: ['RS256'],
  });
}