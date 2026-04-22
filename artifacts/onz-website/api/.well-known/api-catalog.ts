import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://digitalpersona.ai';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/linkset+json');
  res.setHeader('Link', `<${BASE_URL}/.well-known/api-catalog>; rel="self"`);
  res.json({
    linkset: [
      {
        anchor: `${BASE_URL}/api`,
        links: [
          {
            rel: 'service-desc',
            href: `${BASE_URL}/openapi.yaml`,
            type: 'application/yaml',
            title: 'OpenAPI 3.0 Specification',
          },
          {
            rel: 'service-doc',
            href: `${BASE_URL}/docs`,
            title: 'API Documentation',
          },
          {
            rel: 'status',
            href: `${BASE_URL}/api/health`,
            title: 'Health Check Endpoint',
          },
        ],
      },
    ],
  });
}