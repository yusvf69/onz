import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://digitalpersona.ai';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    $schema: 'https://agentskills.io/agent-skills/v0.2.0.json',
    skills: [
      {
        name: 'contact_dpa',
        type: 'prompt',
        description: 'Interactive guide to help users fill out contact form and select services',
        url: `${BASE_URL}/contact`,
      },
      {
        name: 'service_catalog',
        type: 'resource',
        description: 'List of available web development and AI services',
        url: `${BASE_URL}/services`,
      },
      {
        name: 'portfolio_browser',
        type: 'resource',
        description: 'Portfolio of completed projects and case studies',
        url: `${BASE_URL}/portfolio`,
      },
      {
        name: 'founder_connect',
        type: 'prompt',
        description: 'Connect with the founder for consultation',
        url: `${BASE_URL}/founder`,
      },
    ],
  });
}