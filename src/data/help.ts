// Help centre data, built from src/data/help-centre.json into the shapes the
// v3 reference's logic expects (DOCS / ALL / BY / TOP / PROBLEMS). The JSON is
// the source of truth for titles, summaries, keywords, bodies and problems.
import raw from './help-centre.json';

export type PathKey = 'app' | 'dash';
export interface HelpBody { how?: string[]; steps?: string[]; know?: string[] }
export interface HelpArticle {
  id: string; path: PathKey; group: string; groupSlug: string; title: string; summary: string;
  shot: string; pathLabel: string; keys: string; slug: string; url: string; body: HelpBody | null;
  callout: 'privacy' | 'crisis' | 'none'; updated: string; minutes: number;
}

const PATH_MAP: Record<string, PathKey> = { app: 'app', dashboard: 'dash' };
export const URL_SEGMENT: Record<PathKey, string> = { app: 'app', dash: 'dashboard' };
export const PATH_URL: Record<PathKey, string> = { app: '/help/app/', dash: '/help/dashboard/' };
export const slugify = (t: string) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const data: any = raw;

export const bodyText = (b: HelpBody | null) => (b ? [...(b.how || []), ...(b.steps || []), ...(b.know || [])].join(' ') : '');

export const DOCS: Record<PathKey, { label: string; groups: [string, [string, string, string, string][]][] }> = { app: { label: '', groups: [] }, dash: { label: '', groups: [] } };
export const ALL: HelpArticle[] = [];
for (const [jsonPath, p] of Object.entries<any>(data.paths)) {
  const path = PATH_MAP[jsonPath];
  DOCS[path] = { label: p.label, groups: p.groups.map((g: any) => [g.name, g.articles.map((a: any) => [a.id, a.title, a.summary, a.phoneScreen || ''])]) };
  for (const g of p.groups) for (const a of g.articles) {
    const words = (a.title + ' ' + a.summary + ' ' + bodyText(a.body)).split(/\s+/).length;
    ALL.push({
      id: a.id, path, group: g.name, groupSlug: slugify(g.name), title: a.title, summary: a.summary, shot: a.phoneScreen || '', pathLabel: p.label,
      keys: Array.isArray(a.keywords) ? a.keywords.join(' ') : (a.keywords || ''), slug: a.slug, url: `/help/${URL_SEGMENT[path]}/${a.slug}/`, body: a.body || null,
      callout: a.callout || 'privacy', updated: a.updated || '', minutes: Math.max(1, Math.round(words / 200)),
    });
  }
}
export const BY: Record<string, HelpArticle> = Object.fromEntries(ALL.map((a) => [a.id, a]));
export const TOP: Record<PathKey, string[]> = { app: data.topArticles.app, dash: data.topArticles.dashboard };
export const PROBLEMS: Record<PathKey, [string, string, string][]> = {
  app: data.problems.app.map((p: any) => [p.articleId, p.question, p.linkLabel]),
  dash: data.problems.dashboard.map((p: any) => [p.articleId, p.question, p.linkLabel]),
};

/* Search: every query word has to match somewhere in the article (title,
   keywords, summary, group or body). A word matches a token that starts with
   it, or, for words of five letters or more, one that is a single typo away.
   Title and keyword hits rank highest. No library, no network. */
const tokens = (t: string) => t.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/ø/g, 'o').split(/[^a-z0-9]+/).filter(Boolean);
const near = (a: string, b: string) => {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
};
const FIELDS: [keyof Pick<HelpArticle, 'title' | 'keys' | 'summary' | 'group'> | 'body', number][] = [['title', 6], ['keys', 5], ['summary', 3], ['group', 1], ['body', 1]];
const INDEX = ALL.map((a) => ({ a, f: FIELDS.map(([k, w]) => [new Set(tokens(k === 'body' ? bodyText(a.body) : (a as any)[k])), w] as [Set<string>, number]) }));
const STOP = new Set(['a', 'an', 'the', 'my', 'i', 'to', 'of', 'and', 'or', 'is', 'it', 'can', 'do', 'does', 'how', 'what', 'who', 'in', 'on', 'for', 'me', 'be', 'are', 'if', 'with']);
export function search(q: string): HelpArticle[] {
  const all = tokens(q); if (!all.length) return [];
  const words = all.filter((w) => !STOP.has(w)); const qs = words.length ? words : all;
  const out: [HelpArticle, number][] = [];
  for (const { a, f } of INDEX) {
    let score = 0, ok = true;
    for (const w of qs) {
      let best = 0;
      for (const [set, wt] of f) {
        for (const t of set) {
          const hit = t === w ? 1 : t.startsWith(w) ? 0.8 : (w.length >= 5 && near(w, t)) ? 0.5 : 0;
          if (hit * wt > best) best = hit * wt;
        }
      }
      if (!best) { ok = false; break; }
      score += best;
    }
    if (ok) out.push([a, score]);
  }
  return out.sort((x, y) => y[1] - x[1]).map(([a]) => a);
}
