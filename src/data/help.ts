// Help centre data, built from src/data/help-centre.json into the shapes the
// v3 reference's logic expects (DOCS / ALL / BY / TOP / PROBLEMS). The JSON is
// the source of truth for titles, summaries, keywords, bodies and problems.
import raw from './help-centre.json';

export type PathKey = 'app' | 'dash';
export interface HelpBody { how?: string[]; steps?: string[]; know?: string[] }
export interface HelpArticle {
  id: string; path: PathKey; group: string; title: string; summary: string;
  shot: string; pathLabel: string; keys: string; slug: string; url: string; body: HelpBody | null;
}

const PATH_MAP: Record<string, PathKey> = { app: 'app', dashboard: 'dash' };
export const URL_SEGMENT: Record<PathKey, string> = { app: 'app', dash: 'dashboard' };
const data: any = raw;

export const DOCS: Record<PathKey, { label: string; groups: [string, [string, string, string, string][]][] }> = { app: { label: '', groups: [] }, dash: { label: '', groups: [] } };
export const ALL: HelpArticle[] = [];
for (const [jsonPath, p] of Object.entries<any>(data.paths)) {
  const path = PATH_MAP[jsonPath];
  DOCS[path] = { label: p.label, groups: p.groups.map((g: any) => [g.name, g.articles.map((a: any) => [a.id, a.title, a.summary, a.phoneScreen || ''])]) };
  for (const g of p.groups) for (const a of g.articles) {
    ALL.push({
      id: a.id, path, group: g.name, title: a.title, summary: a.summary, shot: a.phoneScreen || '', pathLabel: p.label,
      keys: Array.isArray(a.keywords) ? a.keywords.join(' ') : (a.keywords || ''), slug: a.slug, url: `/help/${URL_SEGMENT[path]}/${a.slug}`, body: a.body || null,
    });
  }
}
export const BY: Record<string, HelpArticle> = Object.fromEntries(ALL.map((a) => [a.id, a]));
export const TOP: Record<PathKey, string[]> = { app: data.topArticles.app, dash: data.topArticles.dashboard };
export const PROBLEMS: Record<PathKey, [string, string, string][]> = {
  app: data.problems.app.map((p: any) => [p.articleId, p.question, p.linkLabel]),
  dash: data.problems.dashboard.map((p: any) => [p.articleId, p.question, p.linkLabel]),
};
