// Images for the email signatures at /signature/<name>/. Gmail needs every
// image at a public address, and they're served from artistry-of-humanity.com,
// the domain the emails come from, so they're written into the AOH website
// repo (cloned next to this one) and go live when that site deploys. Rendered
// at 3x their display size with transparent rounded corners, which every mail
// app shows correctly (Outlook ignores CSS border-radius), then saved as
// palette PNGs, about a third of the size. Rerun with:
//   node tools/signature/make-assets.mjs
// public/signature/ on this site keeps the first set: emails already sent
// still load them, so leave those files alone.
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.resolve(ROOT, '../aoh-website/public/signature');
const A = f => 'file://' + path.join(ROOT, 'public/assets/v5', f);
fs.mkdirSync(OUT, { recursive: true });

// A photo tile: the person cut out (transparent PNG) on the nørma app icon's
// green, with its lighter hill behind them. top/width frame head and shoulders.
const tile = (src, top, width) => [264, 264, `<div style="position:relative;width:264px;height:264px;border-radius:60px;overflow:hidden;background:linear-gradient(180deg,#2A4B36 0%,#203A28 70%,#1B2E1E 100%)">
      <div style="position:absolute;left:-40%;right:-40%;bottom:-30%;height:62%;border-radius:50%;background:linear-gradient(180deg,#4A6B45,#3D5B39 40%)"></div>
      <img src="${src}" style="position:absolute;left:50%;top:${top}px;width:${width}%;transform:translateX(-50%)">
    </div>`];
// Everyone else's photo comes from signature_sources/<slug>.png (gitignored):
// either a finished tile (Sophia's and Kevin's, made in Claude Design, square
// with transparent rounded corners), which is just resized, or a cut-out made
// with `swift tools/signature/cutout.swift <photo> signature_sources/<slug>.png`,
// which goes through tile() with FRAME[slug] = [top, width].
const SRC = path.join(ROOT, 'signature_sources');
const src = slug => fs.existsSync(path.join(SRC, slug + '.png')) ? 'file://' + path.join(SRC, slug + '.png') : null;
const FINISHED = new Set(['sophia', 'kevin']), FRAME = {};

const ASSETS = {
  'ian-williams.png': tile(A('story/ian-portrait.webp'), 18, 126),
  'linkedin.png': [66, 66, `<div style="width:66px;height:66px;border-radius:15px;background:#243D2C;display:flex;align-items:center;justify-content:center;font:700 34px/1 Arial,Helvetica,sans-serif;color:#fff;letter-spacing:-.5px">in</div>`],
  'norma-icon.png': [192, 192, `<img src="${A('norma-app-icon.png')}" style="display:block;width:192px;height:192px;border-radius:44px">`],
};
for (const [slug, file] of [['sophia', 'sophia-apostolou.png'], ['kevin', 'kevin-wilder.png']]) {
  if (!src(slug)) continue;
  ASSETS[file] = FINISHED.has(slug) ? [264, 264, `<img src="${src(slug)}" style="display:block;width:264px;height:264px">`] : tile(src(slug), ...FRAME[slug]);
}
// Pass file names to render only those, e.g. `node tools/signature/make-assets.mjs kevin-wilder.png`.
const ONLY = process.argv.slice(2);

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
for (const [name, [w, h, html]] of Object.entries(ASSETS).filter(([n]) => !ONLY.length || ONLY.includes(n))) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const file = path.join(OUT, `.${name}.html`);
  fs.writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}html,body{background:transparent}</style></head><body>${html}</body></html>`);
  await p.goto('file://' + file, { waitUntil: 'networkidle0' });
  const shot = await p.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } });
  await sharp(shot).png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 }).toFile(path.join(OUT, name));
  fs.unlinkSync(file);
  console.log('signature', name, Math.round(fs.statSync(path.join(OUT, name)).size / 1024) + ' KB');
  await p.close();
}
await b.close();
