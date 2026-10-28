// Social preview images (Open Graph, 1200 x 630) for each page, in the round 5
// look. Renders HTML with the site's fonts and assets in headless Chrome and
// writes public/og/<name>.jpg. Rerun after a design change:
//   node tools/og/make-og.mjs            (all pages)
//   node tools/og/make-og.mjs our-story  (just one)
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const A = f => 'file://' + path.join(ROOT, 'public/assets/v5', f);
const OUT = path.join(ROOT, 'public/og');
fs.mkdirSync(OUT, { recursive: true });

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">`;
const BASE = `
*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;overflow:hidden;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
.og{position:relative;width:1200px;height:630px;overflow:hidden;background:#F4F2E6}
.glow{position:absolute;border-radius:50%;pointer-events:none}
.left{position:absolute;z-index:2;left:72px;top:62px;bottom:62px;width:var(--lw,560px);display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:12px}
.logo img{width:44px;height:44px;border-radius:13px}
.logo span{font:400 34px/1 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A}
.eyebrow{margin-top:auto;font:600 14px 'DM Sans',sans-serif;letter-spacing:3px;text-transform:uppercase;color:#4A6B3A}
h1{margin-top:16px;font:400 var(--hs,70px)/1.04 'DM Serif Display',serif;letter-spacing:-1.2px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;padding-bottom:.1em;margin-bottom:-.1em;text-wrap:balance}
.sub{margin-top:18px;max-width:25em;font:400 21px/1.45 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty}
.foot{margin-top:28px;display:flex;align-items:center;gap:16px}
.pill{display:inline-flex;align-items:center;height:48px;padding:0 22px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:600 17px 'DM Sans',sans-serif;color:#152213;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 28px rgba(217,234,110,.35)}
.url{font:500 17px 'DM Sans',sans-serif;color:rgba(20,35,26,.55)}
.frame{position:absolute;overflow:hidden;background:#0F2015;box-shadow:0 44px 80px -34px rgba(20,35,26,.55),0 0 0 1px rgba(20,35,26,.08)}
.frame img{display:block;width:100%}
.phone{position:absolute;padding:7px;border-radius:40px;background:#0B140E;box-shadow:0 44px 70px -30px rgba(20,35,26,.6),0 0 0 1px rgba(20,35,26,.12)}
.phone div{width:100%;height:100%;border-radius:33px;overflow:hidden;background:#0F2015}
.phone img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
.dark .og{background:#0F2015}
.dark .logo span{color:#F6F4E9}
.dark .eyebrow{color:#DCEC85}
.dark h1{background:linear-gradient(105deg,#F6F4E9 8%,#EAF79B 52%,#C4D94A 92%);-webkit-background-clip:text;background-clip:text}
.dark .sub{color:rgba(201,212,194,.82)}
.dark .url{color:rgba(201,212,194,.6)}
`;
const glowCream = `<div class="glow" style="right:-180px;top:-260px;width:820px;height:820px;background:radial-gradient(closest-side,rgba(217,234,110,.55),rgba(217,234,110,0) 72%)"></div>
<div class="glow" style="left:-220px;bottom:-320px;width:700px;height:700px;background:radial-gradient(closest-side,rgba(74,107,58,.16),rgba(74,107,58,0) 72%)"></div>`;
const left = ({ eyebrow, h1, sub, hs, lw, cta = 'Book a demo' }) => `
<div class="left" style="--hs:${hs}px;${lw ? `--lw:${lw}px` : ''}">
  <div class="logo"><img src="${A('norma-icon.png')}"><span>nørma</span></div>
  <div class="eyebrow">${eyebrow}</div>
  <h1>${h1}</h1>
  ${sub ? `<p class="sub">${sub}</p>` : ''}
  <div class="foot">${cta ? `<span class="pill">${cta}</span>` : ''}<span class="url">joinnorma.com</span></div>
</div>`;
const phone = (img, x, y, w, rot = 0) => `<div class="phone" style="left:${x}px;top:${y}px;width:${w}px;height:${Math.round(w * 844 / 390)}px;transform:rotate(${rot}deg)"><div><img src="${A(img)}"></div></div>`;
const dash = (x, y, w) => `<div class="frame" style="left:${x}px;top:${y}px;width:${w}px;border-radius:24px 18px 26px 20px / 18px 26px 20px 24px"><img src="${A('dash-home.webp')}"></div>`;

const PAGES = {
  home: { h: left({ eyebrow: 'The well-being operating system', h1: 'Nobody leaves their life at the door.', sub: 'An app for your people and a dashboard for you.', hs: 70, lw: 540 })
      + dash(668, 96, 620) + phone('app-home.webp', 640, 168, 206) },
  'your-people': { h: left({ eyebrow: 'For your people', h1: 'A private companion for their whole life.', sub: 'A monthly check-in across five pillars, and their own picture first.', hs: 66, lw: 540 })
      + phone('app-reflect.webp', 900, 96, 216, 6) + phone('app-home.webp', 700, 70, 216, -5) },
  'for-leaders': { h: left({ eyebrow: 'For leaders · the dashboard', h1: 'See how your people are really doing.', sub: 'Where to look, what to do, and whether it worked.', hs: 68, lw: 520 })
      + dash(640, 118, 700) },
  roi: { h: left({ eyebrow: 'ROI · the case', h1: 'The human case and the business case are the same case.', sub: '', hs: 58, lw: 540 })
      + `<div class="frame" style="left:668px;top:118px;width:462px;height:394px;padding:40px 40px 36px;border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:linear-gradient(160deg,#173020,#0F2015 70%)">
          <div style="font:600 13px 'DM Sans';letter-spacing:2.6px;text-transform:uppercase;color:#DCEC85">For 1,000 people · a year</div>
          <div style="margin-top:18px;font:400 120px/1 'DM Serif Display';letter-spacing:-2px;color:#EAF79B">$22m</div>
          <div style="margin-top:12px;font:400 19px/1.45 'DM Sans';color:rgba(201,212,194,.86)">in absence, presenteeism and turnover.</div>
          <div style="display:flex;gap:6px;height:16px;margin-top:34px"><span style="flex:4.7;border-radius:8px 3px 3px 8px;background:#D9EA6E"></span><span style="flex:10.8;border-radius:3px;background:repeating-linear-gradient(135deg,rgba(217,234,110,.6) 0 3px,rgba(217,234,110,.15) 3px 9px);box-shadow:inset 0 0 0 1.5px rgba(217,234,110,.5)"></span><span style="flex:6.8;border-radius:3px 8px 8px 3px;background:rgba(217,234,110,.35)"></span></div>
          <div style="display:flex;justify-content:space-between;margin-top:14px;font:500 15px 'DM Sans';color:rgba(244,242,230,.82)"><span>$4.7m absence</span><span>$10.8m presenteeism</span><span>$6.8m turnover</span></div>
        </div>` },
  'book-a-demo': { h: left({ eyebrow: 'Book a demo', h1: 'Let’s turn the lights on.', sub: 'Thirty minutes with the team behind nørma.', hs: 80, lw: 560, cta: 'Pick a time' })
      + `<div class="glow" style="left:690px;top:70px;width:480px;height:480px;background:radial-gradient(closest-side,rgba(217,234,110,.75),rgba(217,234,110,.2) 55%,rgba(217,234,110,0) 74%)"></div>
         <img src="${A('norma-point.png')}" style="position:absolute;left:800px;top:150px;width:253px;filter:drop-shadow(0 0 1px rgba(20,35,26,.6)) drop-shadow(0 24px 30px rgba(20,35,26,.2))">` },
  'our-story': { h: left({ eyebrow: 'Our story', h1: 'From leaders, for leaders.', sub: 'Why nørma exists, and where the name comes from.', hs: 76, lw: 520, cta: '' })
      + `<div style="position:absolute;left:716px;top:64px;width:400px;height:502px;overflow:hidden;border-radius:200px 200px 30px 24px / 200px 200px 30px 24px;background:radial-gradient(64% 42% at 50% 22%,rgba(217,234,110,.6) 0%,rgba(217,234,110,.16) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 52%,#E4DFCA 100%)">
           <img src="${A('story/ian-portrait.webp')}" style="position:absolute;left:50%;bottom:0;width:128%;transform:translateX(-50%)"></div>` },
  help: { dark: true, h: left({ eyebrow: 'nørma help centre', h1: 'How can we help?', sub: 'Help for the nørma app and the leader dashboard.', hs: 82, lw: 560, cta: '' })
      + `<div class="glow" style="right:-160px;top:-240px;width:820px;height:820px;background:radial-gradient(closest-side,rgba(217,234,110,.2),rgba(217,234,110,0) 72%)"></div>
         <img src="${A('norma-happy.png')}" style="position:absolute;left:860px;top:118px;width:220px;filter:drop-shadow(0 24px 30px rgba(0,0,0,.45))">
         <div style="position:absolute;left:700px;top:438px;width:440px;height:68px;display:flex;align-items:center;gap:14px;padding:0 24px;border-radius:24px 18px 26px 20px / 18px 26px 20px 24px;background:rgba(228,240,214,.08);box-shadow:inset 0 0 0 1px rgba(228,240,214,.16);font:400 19px 'DM Sans';color:rgba(201,212,194,.75)">
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.8)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16 L20.5 20.5"></path></svg>
           Who sees my answers?</div>` },
};

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
// Pass page names to render only those, e.g. `node tools/og/make-og.mjs our-story`.
const ONLY = process.argv.slice(2);
for (const [name, cfg] of Object.entries(PAGES).filter(([n]) => !ONLY.length || ONLY.includes(n))) {
  const p = await b.newPage();
  await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const html = `<!doctype html><html class="${cfg.dark ? 'dark' : ''}"><head><meta charset="utf-8">${FONTS}<style>${BASE}</style></head><body><div class="og">${cfg.dark ? '' : glowCream}${cfg.h}</div></body></html>`;
  const file = path.join(OUT, `.${name}.html`);
  fs.writeFileSync(file, html);
  await p.goto('file://' + file, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(OUT, `${name}.jpg`), type: 'jpeg', quality: 88 });
  fs.unlinkSync(file);
  console.log('og', name, Math.round(fs.statSync(path.join(OUT, `${name}.jpg`)).size / 1024) + ' KB');
  await p.close();
}
await b.close();
