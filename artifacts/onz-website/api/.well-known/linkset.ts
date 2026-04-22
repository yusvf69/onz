import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://digitalpersona.ai';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/linkset+json');
  res.json({
    linkset: [
      {
        anchor: `${BASE_URL}`,
        links: [
          { rel: 'service-desc', href: `${BASE_URL}/openapi.yaml` },
          { rel: 'service-doc', href: `${BASE_URL}/docs` },
          { rel: 'linkset', href: `${BASE_URL}/.well-known/api-catalog` },
          { rel: 'https://agentskills.io/skill', href: `${BASE_URL}/.well-known/agent-skills/index.json` },
          { rel: 'http://modelcontext.org/protocol/mcp-server', href: `${BASE_URL}/.well-known/mcp/server-card.json` },
        ],
      },
    ],
  });
}