// Sitemap, generated at build so new, renamed or removed help articles are
// always reflected. Help articles carry their own last-updated date.
import { ALL, PATH_URL } from '../data/help';

const BASE = 'https://joinnorma.com';
export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const pages: [string, string][] = [
    ['/', today], ['/help/', today], [PATH_URL.app, today], [PATH_URL.dash, today], ['/privacy/', today], ['/terms/', today],
    ...ALL.map((a) => [a.url, a.updated || today] as [string, string]),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(([u, d]) => `  <url><loc>${BASE}${u}</loc><lastmod>${d}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
