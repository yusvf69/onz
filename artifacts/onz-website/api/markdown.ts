import { readFile } from 'fs/promises';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const accept = req.headers.accept || '';
  const isMarkdown = accept.includes('text/markdown') || accept.includes('application/markdown');

  if (!isMarkdown) {
    return res.redirect(302, '/');
  }

  try {
    const htmlPath = join(process.cwd(), 'dist/public/index.html');
    const html = await readFile(htmlPath, 'utf-8');

    const markdown = html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
      .replace(/<ul[^>]*>|<\/ul>/gi, '\n')
      .replace(/<ol[^>]*>|<\/ol>/gi, '\n')
      .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<hr\s*\/?>/gi, '\n---\n')
      .replace(/<[\s\S]*?>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('x-markdown-tokens', 'html-converted');
    return res.send(markdown);
  } catch {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.send(`# Digital Persona Core

Professional digital agency specializing in web development and AI solutions.

## Services
- Web Development
- Mobile Apps
- AI Solutions
- Consulting

## Contact
Visit https://digitalpersona.ai/contact`);
  }
}