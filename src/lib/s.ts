import type { CSSProperties } from 'react';

/**
 * Parse an inline-style string (verbatim from the design reference) into a
 * React style object. Keeps every value untouched so the reference's px,
 * rgba() and clamp() values are copied character-for-character. Semicolons
 * inside parentheses or quotes (e.g. data URIs in url()) don't split.
 */
const cache = new Map<string, CSSProperties>();

function splitDecls(css: string): string[] {
  const out: string[] = [];
  let depth = 0, quote = '', cur = '';
  for (const ch of css) {
    if (quote) { cur += ch; if (ch === quote) quote = ''; continue; }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

export function s(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;
  const out: Record<string, string> = {};
  for (const decl of splitDecls(css)) {
    const i = decl.indexOf(':');
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()).replace(/^(webkit|moz|ms)/, (m) => m.charAt(0).toUpperCase() + m.slice(1));
    out[key] = value;
  }
  cache.set(css, out as CSSProperties);
  return out as CSSProperties;
}
