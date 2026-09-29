/* Shared by the preview, raster renderer, captions, and narration authoring. */
(function (root) {
  const story = {
    duration: 36,
    title: 'Five pillars, one life',
    cues: [
      { start: 0.6, end: 3.7, text: "Your life isn't five separate things." },
      { start: 3.9, end: 5.6, text: "It's one connected whole." },
      { start: 5.9, end: 7.25, text: 'Health & Fitness.' },
      { start: 7.35, end: 8.65, text: 'Internal Work.' },
      { start: 8.75, end: 10.35, text: 'Love & Relationships.' },
      { start: 10.45, end: 11.75, text: 'Social Connection.' },
      { start: 11.85, end: 13.35, text: 'Work & Life Flow.' },
      { start: 14, end: 17.3, text: 'When work gets heavy, it can follow you home.' },
      { start: 17.5, end: 20.1, text: 'Into your sleep. Your patience.' },
      { start: 20.3, end: 23, text: 'Your time with people you love.' },
      { start: 23.6, end: 26.9, text: "You don't have to fix everything at once." },
      { start: 27.3, end: 30.5, text: 'Once a month, pause. Look at all five.' },
      { start: 30.8, end: 33, text: 'Notice what needs a little care.' },
      { start: 33.4, end: 35.8, text: 'Start there.' },
    ],
    audio: {
      mix: { voice: 1.4, bed: 0.0035, chime: 0.025, music: 0.05, sfx: 0.045 },
      // Soundscape (2026-09-07): a gentle major progression that turns to its relative
      // minor while work is heavy, back to the tonic with the restoration. Effects mark
      // what is seen: each stone lighting, the ripple, the two walks, the touch, the return.
      soundscape: {
        music: {
          root: 196, mode: 'major', tempo: 72, arpeggio: true,
          progression: [[0, 0], [5.9, 3], [10.45, 4], [13.8, 5], [18, 1], [22, 5], [26.4, 3], [27.6, 0], [30.8, 4], [33.4, 0]],
          swell: [[0, 0.045], [5.9, 0.055], [13.8, 0.03], [23.6, 0.035], [27.6, 0.06], [33.4, 0.045]],
        },
        sfx: [
          { at: 5.9, kind: 'plink' }, { at: 7.35, kind: 'plink' }, { at: 8.75, kind: 'plink' }, { at: 10.45, kind: 'plink' }, { at: 11.85, kind: 'plink' },
          { at: 14.35, kind: 'whoosh' },
          { at: 24.0, kind: 'hop' }, { at: 25.4, kind: 'hop' },
          { at: 27.0, kind: 'click' }, { at: 27.6, kind: 'warm' },
          { at: 29.4, kind: 'plink' }, { at: 30.1, kind: 'plink' }, { at: 30.8, kind: 'plink' }, { at: 31.5, kind: 'plink' },
          { at: 32.5, kind: 'shimmer' },
        ],
      },
    },
    pillars: [
      { name: 'Health & Fitness', color: '#65dbc7', x: 153, y: 763, height: 137, at: 5.9, restore: 29.4 },
      { name: 'Internal Work', color: '#bba1f2', x: 210, y: 614, height: 142, at: 7.35, restore: 30.1 },
      { name: 'Love & Relationships', color: '#f894a1', x: 451, y: 598, height: 132, at: 8.75, restore: 30.8 },
      { name: 'Social Connection', color: '#f8c866', x: 579, y: 740, height: 146, at: 10.45, restore: 31.5 },
      { name: 'Work & Life Flow', color: '#78bff4', x: 403, y: 864, height: 156, at: 11.85, restore: 27.6 },
    ],
  };
  if (typeof module !== 'undefined') module.exports = story;
  else root.Ch00Story = story;
})(typeof window === 'undefined' ? globalThis : window);

/* The five pillar icons, as the app draws them — copied verbatim from
 * apps/mobile/src/components/PillarIcon.tsx (spec §8, 24×24 stroked line art).
 * tools/project.test.mjs fails if this drifts from the app. Load with
 * <script src="../shared/pillar-icons.js"> before scene.js; scenes call
 * window.PillarIcons.draw(ctx, key, x, y, size, strokeStyle, lineWidth). */
(function () {
  'use strict';
  const PATHS = {
    health: ['M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21'],
    internal: ['M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z'],
    love: ['M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z'],
    social: ['M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4', 'M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4'],
    flow: ['M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9', 'M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15'],
  };
  const SOCIAL_CIRCLES = [{ cx: 9, cy: 8.5, r: 3.2 }, { cx: 16.8, cy: 10.3, r: 2.6 }];
  const KEYS = ['health', 'internal', 'love', 'social', 'flow'];
  const cache = {};
  function paths(key) {
    if (!cache[key]) cache[key] = PATHS[key].map((d) => new Path2D(d));
    return cache[key];
  }
  // Draws the icon centred on (x, y), `size` px across, in the canvas's current transform.
  function draw(ctx, key, x, y, size, strokeStyle, lineWidth = 1.6) {
    const k = typeof key === 'number' ? KEYS[key] : key;
    if (!PATHS[k]) throw new Error('unknown pillar icon ' + key);
    const s = size / 24;
    ctx.save();
    ctx.translate(x - size / 2, y - size / 2); ctx.scale(s, s);
    ctx.strokeStyle = strokeStyle; ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const p of paths(k)) ctx.stroke(p);
    if (k === 'social') for (const c of SOCIAL_CIRCLES) { ctx.beginPath(); ctx.arc(c.cx, c.cy, c.r, 0, Math.PI * 2); ctx.stroke(); }
    ctx.restore();
  }
  window.PillarIcons = { PATHS, SOCIAL_CIRCLES, KEYS, draw };
})();

/* Original raster illustration. Every moving property is a function of time:
 * scrubbing, reduced motion, and offline rendering all draw the same film. */
(function () {
  'use strict';
  const { duration, cues, pillars } = window.Ch00Story;
  const TAU = Math.PI * 2;
  const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const ease = (a, b, t) => { const p = clamp((t - a) / (b - a)); return p * p * (3 - 2 * p); };
  const pulse = (t, at, length = 1) => Math.sin(clamp((t - at) / length) * Math.PI);
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const color = (a, b, t) => {
    const rgb = (hex) => hex.match(/\w\w/g).map((v) => parseInt(v, 16));
    const x = rgb(a.slice(1)), y = rgb(b.slice(1));
    return `rgb(${x.map((v, i) => Math.round(mix(v, y[i], t))).join(',')})`;
  };
  let ctx;
  function ellipse(x, y, rx, ry, fill, rotation = 0) {
    ctx.beginPath(); ctx.ellipse(x, y, Math.max(.01, rx), Math.max(.01, ry), rotation, 0, TAU);
    ctx.fillStyle = fill; ctx.fill();
  }
  function path(points, fill, stroke, width = 1) {
    ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
  }
  function line(points, stroke, width) {
    ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  }
  function gradient(x, y, xx, yy, stops) {
    const g = ctx.createLinearGradient(x, y, xx, yy);
    stops.forEach(([at, col]) => g.addColorStop(at, col)); return g;
  }
  function halo(x, y, size, rgb, strength = 1, ratio = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(1, ratio);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    g.addColorStop(0, `rgba(${rgb},${.5 * strength})`);
    g.addColorStop(.35, `rgba(${rgb},${.18 * strength})`); g.addColorStop(1, `rgba(${rgb},0)`);
    ellipse(0, 0, size, size, g); ctx.restore();
  }
  function curve(ax, ay, bx, by, cx, cy, stroke, width) {
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(bx, by, cx, cy);
    ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.stroke();
  }
  function label(text, x, y, size = 20, fill = '#20483f', family = 'Arial', weight = '') {
    ctx.fillStyle = fill; ctx.font = `${weight} ${size}px ${family}`; ctx.textAlign = 'center'; ctx.fillText(text, x, y);
  }
  function wrapped(text, x, y, maxWidth, size, fill, family = 'Arial', weight = '') {
    ctx.font = `${weight} ${size}px ${family}`;
    const lines = []; let current = '';
    for (const word of text.split(' ')) {
      const candidate = current ? `${current} ${word}` : word;
      if (current && ctx.measureText(candidate).width > maxWidth) { lines.push(current); current = word; }
      else current = candidate;
    }
    if (current) lines.push(current);
    lines.forEach((text, i) => label(text, x, y + i * size * 1.35, size, fill, family, weight));
    return lines.length;
  }

  // Low-contrast paper grain is generated once and never changes between frames.
  const grain = document.createElement('canvas'); grain.width = 180; grain.height = 320;
  const gc = grain.getContext('2d'); const pixels = gc.createImageData(180, 320);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const n = hash(i); pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = n > .5 ? 255 : 15;
    pixels.data[i + 3] = Math.floor(n * 10);
  }
  gc.putImageData(pixels, 0, 0);

  function cloud(x, y, scale, alpha, stops) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.scale(scale, scale);
    const g = gradient(0, -30, 0, 40, stops || [[0, '#fffff4'], [1, '#cee6da']]);
    ellipse(0, 0, 100, 24, g); ellipse(-45, -12, 43, 27, g);
    ellipse(4, -30, 47, 46, g); ellipse(52, -13, 36, 30, g);
    ctx.restore();
  }

  // One steady wind. Every cloud is a pure function of time and wraps seamlessly
  // once it leaves the frame; near layers run faster than far ones, so the sky
  // reads as depth instead of wallpaper.
  function drift(x0, speed, t, scale) {
    const margin = 135 * scale, span = 720 + margin * 2;
    return ((x0 + speed * t + margin) % span + span) % span - margin;
  }
  // Backlit while it covers the sun, so the veil is shaded rather than white;
  // it warms back to ordinary cloud once it has moved off the light.
  const veilStops = (part) => [[0, color('#d3ddda', '#fffff4', part)], [1, color('#8ea5ab', '#cee6da', part)]];
  // How much of the sun the veil is covering, 0-1. Arrives before the ripple at
  // 14.35s, parts as the stones relight from 27.6s.
  const veilCover = (t) => ease(12.4, 14.2, t) * (1 - ease(30.6, 33.2, t));
  function sunVeil(t) {
    const a = veilCover(t);
    if (a < .01) return;
    const cx = 470 + (t - 14) * 9, part = ease(27.6, 31.4, t), stops = veilStops(part);
    cloud(cx - 46 - part * 210, 297, .98, a * .93, stops);
    cloud(cx + 52 + part * 224, 283, .88, a * .88, stops);
  }

  function sky(t, trouble) {
    const shade = veilCover(t);
    const bloom = pulse(t, 28.6, 5.4);
    const cool = clamp(trouble * .78 + shade * .34);
    ctx.fillStyle = gradient(0, 0, 0, 1280, [
      [0, color('#347d83', '#47606f', cool)], [.38, color('#9cd5ca', '#a4b8b9', cool)],
      [.68, color('#e3edce', '#b9c7bd', cool)], [1, color('#edf0d8', '#dfe2d2', cool)],
    ]); ctx.fillRect(0, 0, 720, 1280);
    // The veil flattens the light; the bloom overshoots the opening, then settles.
    const warmth = clamp((1 - trouble * .8) * (1 - shade * .86) + bloom * .62, 0, 1.6);
    halo(551, 269, 245 + bloom * 74, '255,235,171', warmth);
    ellipse(551, 269, 37 + bloom * 4, 37 + bloom * 4, color('#fff4c1', '#c3cec6', cool));
    ctx.save(); ctx.translate(551, 269); ctx.rotate(.12 + t * .008);
    for (let i = 0; i < 12; i++) {
      ctx.rotate(TAU / 12); line([[0, -55 - bloom * 5], [0, -66 - bloom * 12]], `rgba(255,244,195,${.24 * clamp(warmth, 0, 1.2)})`, 2);
    }
    ctx.restore();
    sunVeil(t);
    cloud(drift(70, 7, t, .9), 328, .9, .35); cloud(drift(300, 5.5, t, .8), 397, .8, .35);
    cloud(drift(150, 4, t, .42), 423, .42, .5);
    // Distant folded terrain, rather than a horizon line through the character.
    path([[-40, 567], [100, 459], [196, 530], [334, 446], [438, 513], [580, 451], [760, 554], [760, 900], [-40, 900]], '#7aafa4');
    path([[334, 446], [367, 538], [438, 513]], '#96c1ad');
    path([[-40, 616], [67, 554], [192, 603], [375, 533], [487, 574], [608, 536], [760, 617], [760, 930], [-40, 930]], '#a4c7af');
    cloud(drift(-20, 12, t, 1.1), 553, 1.1, .82); cloud(drift(370, 13.5, t, 1.2), 530, 1.2, .8);
    halo(360, 1120, 430, '251,248,218', .8 * (1 - shade * .45) + bloom * .26, .6);
  }

  function islandOutline() {
    ctx.beginPath(); ctx.moveTo(39, 737);
    ctx.bezierCurveTo(40, 658, 143, 566, 313, 558);
    ctx.bezierCurveTo(474, 539, 632, 590, 675, 703);
    ctx.bezierCurveTo(730, 809, 620, 914, 417, 932);
    ctx.bezierCurveTo(223, 955, 32, 857, 39, 737); ctx.closePath();
  }
  function island(t, trouble) {
    halo(375, 1056, 265, '61,100,85', .18, .18);
    ctx.beginPath(); ctx.moveTo(43, 757); ctx.bezierCurveTo(91, 826, 630, 841, 676, 735);
    ctx.lineTo(641, 891); ctx.lineTo(580, 939); ctx.lineTo(562, 990); ctx.lineTo(467, 1007);
    ctx.lineTo(404, 1060); ctx.lineTo(319, 1030); ctx.lineTo(284, 983); ctx.lineTo(205, 970);
    ctx.lineTo(161, 914); ctx.lineTo(90, 897); ctx.closePath();
    ctx.fillStyle = gradient(40, 850, 650, 990, [[0, '#688471'], [.3, '#47746c'], [.72, '#285955'], [1, '#204d4d']]); ctx.fill();
    path([[95, 838], [209, 899], [205, 970], [161, 914], [90, 897]], '#648d78');
    path([[209, 899], [284, 925], [319, 1030], [284, 983], [205, 970]], '#537e6b');
    path([[390, 924], [473, 921], [467, 1007], [404, 1060], [374, 1007]], '#32635b');
    path([[560, 894], [641, 850], [641, 891], [580, 939], [562, 990], [531, 976]], '#346257');
    for (let i = 0; i < 70; i++) {
      const x = 100 + hash(i + 40) * 510, y = 893 + hash(i + 240) * 100;
      if (y < 1008 - Math.abs(x - 370) * .39) ellipse(x, y, 1 + hash(i + 120) * 5, 1 + hash(i + 140) * 2, '#bfd4a31c');
    }
    ctx.save(); islandOutline(); ctx.clip();
    ctx.fillStyle = gradient(200, 555, 510, 946, [[0, color('#bfd385', '#91a793', trouble)], [.55, color('#8fb87a', '#839d8b', trouble)], [1, color('#638f68', '#5d827b', trouble)]]);
    ctx.fillRect(0, 550, 720, 430);
    ellipse(317, 665, 292, 103, '#d7dfa021', -.15);
    // The path is part of the ground plane, with a narrow highlight on its upper edge.
    ctx.beginPath(); ctx.ellipse(361, 725, 244, 127, -.035, 0, TAU); ctx.strokeStyle = color('#d9ce9c', '#aab3a0', trouble); ctx.lineWidth = 26; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(361, 721, 244, 126, -.035, Math.PI, TAU); ctx.strokeStyle = '#faf0bd55'; ctx.lineWidth = 2; ctx.stroke();
    for (let i = 0; i < 370; i++) {
      const x = 36 + hash(i + 721) * 670, y = 559 + hash(i + 252) * 380;
      ellipse(x, y, 1 + hash(i + 643) * 3, .5 + hash(i + 998), i % 3 ? '#345f4020' : '#ecf0b340');
    }
    // Tufts of grass bend together slightly; the motion never competes with the acting.
    for (let i = 0; i < 46; i++) {
      const x = 60 + hash(i + 103) * 595, y = 572 + hash(i + 88) * 337;
      const h = 4 + hash(i + 34) * 8, sway = Math.sin(t * .8 + i) * 2;
      const ring = Math.pow((x - 361) / 244, 2) + Math.pow((y - 725) / 127, 2);
      if (Math.abs(ring - 1) < .2) continue;
      curve(x - 4, y, x - 7 + sway, y - h, x - 6 + sway, y - h, '#527a5355', 2);
      curve(x, y, x + sway, y - h * 1.3, x + sway + 2, y - h * 1.3, '#47754d66', 2);
    }
    ctx.restore();
    ctx.beginPath(); ctx.moveTo(46, 794); ctx.bezierCurveTo(126, 949, 535, 1004, 659, 804);
    ctx.strokeStyle = '#406f5255'; ctx.lineWidth = 6; ctx.stroke();
    for (const [x, y, size] of [[87, 805, 13], [258, 905, 10], [618, 838, 14], [514, 624, 8], [119, 689, 7], [516, 895, 7]]) {
      ellipse(x + 4, y + 3, size, size * .32, '#254c4930');
      path([[x - size, y], [x - size * .6, y - size * .8], [x + size * .2, y - size], [x + size, y - size * .2], [x + size * .6, y + 2]], '#729087');
      path([[x - size, y], [x - size * .6, y - size * .8], [x + size * .2, y - size], [x, y - 1]], '#9eafa0');
    }
  }

  function fern(x, y, scale, flip = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(scale * flip, scale);
    curve(0, 0, -6, -43, -33, -73, '#315f50', 3);
    for (let i = 0; i < 5; i++) {
      const yy = -9 - i * 11, xx = -i * i * 1.12;
      ellipse(xx + 10, yy - 3, 15 - i, 5, i % 2 ? '#709d72' : '#90ae78', -.45);
      ellipse(xx - 10, yy - 2, 14 - i, 5, '#477d61', .6);
    }
    ctx.restore();
  }

  function stone(s, i, t, trouble) {
    const introduced = ease(s.at - .3, s.at + .65, t);
    const dimAt = i === 4 ? 14 : 14.7 + i * .45;
    const dim = ease(dimAt, dimAt + 1.2, t);
    const restore = ease(s.restore, s.restore + .9, t);
    const light = mix(.36 + introduced * .64, .055, dim) * (1 - restore) + restore;
    const tilt = i === 4 ? ease(13.8, 15.5, t) * (1 - ease(26.8, 28.1, t)) * .16 : Math.sin(t * 12 + i) * pulse(t, 15 + i * .43, .8) * .025;
    const scale = .82 + (s.y - 590) / 1000;
    const active = (t >= s.at && t <= s.at + 1.35) || (t >= s.restore && t <= s.restore + 1.2);
    halo(s.x, s.y + 2, 74, '245,227,151', light * .7, .27);
    ellipse(s.x + 15, s.y + 6, 42 * scale, 11 * scale, '#234c4e33');
    if (light > .25) halo(s.x, s.y - s.height * .5, 110 * scale, s.color.slice(1).match(/../g).map((v) => parseInt(v, 16)).join(','), light * .85);
    ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(tilt); ctx.scale(scale, scale);
    const h = s.height, fill = color('#728582', s.color, light);
    const shape = [[-29, 0], [-38, -h * .21], [-31, -h * .84], [-10, -h], [17, -h * .94], [34, -h * .7], [39, -20], [23, 1]];
    path(shape, gradient(-30, -h, 40, 0, [[0, color('#acb6a9', '#fff2c8', light)], [.27, fill], [1, color('#4a6565', s.color, light * .56)]]), '#f5f3d528', 1);
    path([[-31, -h * .84], [-10, -h], [-3, -h * .83], [-12, -17], [-29, 0], [-38, -h * .21]], '#ffffff24');
    path([[17, -h * .94], [34, -h * .7], [39, -20], [23, 1], [9, -10], [17, -h * .69]], '#183e5724');
    path([[-10, -h], [17, -h * .94], [17, -h * .69], [-3, -h * .83]], '#ffffff38');
    path([[-12, -17], [-3, -h * .83], [17, -h * .69], [9, -10], [23, 1], [-29, 0]], '#ffffff0c');
    line([[-28, -h * .76], [-22, -h * .32]], `rgba(255,255,230,${.2 + light * .36})`, 2);
    for (let j = 0; j < 16; j++) ellipse(-24 + hash(j + i * 60) * 48, -h * .15 - hash(j + i * 43) * h * .65, .5 + hash(j) * 1.4, .7, '#fffad21f');
    if (i === 4) {
      const a = ease(14, 15.2, t) * (1 - ease(27.2, 28.4, t));
      ctx.globalAlpha = a;
      line([[7, -h * .84], [-5, -h * .58], [6, -h * .48], [-8, -h * .22]], '#354f5b', 2.4);
      ctx.globalAlpha = 1;
    }
    // An inset mark gives each stone identity beyond its colour.
    ctx.save(); ctx.translate(0, -h * .51); ctx.globalAlpha = .38 + light * .57;
    // The app's own pillar icon (shared/pillar-icons.js), so the five symbols match everywhere.
    window.PillarIcons.draw(ctx, i, 0, 0, 34, '#fffce6', 2.1);
    ctx.restore();
    if (active) {
      const at = t >= s.restore ? s.restore : s.at;
      const shine = pulse(t, at, 1.3);
      ctx.globalAlpha = shine;
      halo(-12, -h * .71, 27, '255,255,225', 1.5);
      line([[-12, -h * .71 - 10], [-12, -h * .71 + 10]], '#fffde4', 1.4);
      line([[-22, -h * .71], [-2, -h * .71]], '#fffde4', 1.4);
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  function connections(t) {
    const lit = ease(3.7, 5.5, t) * (1 - ease(14, 17, t)) + ease(28, 32.5, t);
    ctx.save(); ctx.lineCap = 'round';
    pillars.forEach((s, i) => {
      const next = pillars[(i + 1) % 5];
      line([[s.x, s.y - 2], [next.x, next.y - 2]], `rgba(250,234,158,${lit * .6})`, 2.5);
      if (lit > .1) {
        const p = (t * .19 + i * .2) % 1;
        halo(mix(s.x, next.x, p), mix(s.y, next.y, p) - 2, 10, '255,243,186', lit);
      }
    });
    // A single ripple propagates from Work & Life Flow, not from an arbitrary pillar.
    for (let i = 0; i < 2; i++) {
      const p = clamp((t - 14.35 - i * .45) / 3.4);
      if (p > 0 && p < 1) {
        ctx.beginPath(); ctx.ellipse(403, 851, p * 420, p * 220, 0, 0, TAU);
        ctx.strokeStyle = `rgba(93,122,139,${Math.sin(p * Math.PI) * .65})`; ctx.lineWidth = 9 * (1 - p) + 2; ctx.stroke();
      }
    }
    ctx.restore();
  }

  // Face continuity (2026-09-07): the walk envelope and the gaze filter below turn the
  // scene's step changes into short eased moves, so nothing about the head teleports.
  const WALK = [[23.3, 26.4], [30, 33.3]];
  function walkEnv(t) { return WALK.reduce((m, [a, b]) => Math.max(m, ease(a, a + .3, t) * (1 - ease(b - .3, b, t))), 0); }
  // Triangular filter over the last .5s. A constant target passes through unchanged; a
  // target that changes in a step becomes a smooth .5s move.
  function smooth(fn, t, span = .5, steps = 32) {
    let sum = 0, w = 0;
    for (let i = 0; i <= steps; i++) {
      const k = i / steps, wt = 1 - Math.abs(k * 2 - 1);
      if (wt <= 0) continue;
      sum += fn(t - span * (1 - k)) * wt; w += wt;
    }
    return sum / w;
  }
  // Which stone the eyes are on. It changes in a step, so `smooth` does the travelling.
  function gazeX(t) {
    const named = pillars.find((s) => t >= s.at && t < s.at + 1.35);
    return named ? clamp((named.x - characterPosition(t).x) / 45, -5, 5) : characterPosition(t).reach * 5;
  }
  function characterPosition(t) {
    // The first half holds for expression; the turn is one purposeful walk,
    // one touch, and a return to centre. No frantic five-stop lap.
    const outward = ease(23.3, 26.4, t), home = ease(30, 33.3, t);
    return { x: 326 - 28 * outward + 28 * home, y: 748 + 91 * outward - 91 * home,
      walk: (t > 23.3 && t < 26.4) || (t > 30 && t < 33.3), reach: ease(26.5, 27.25, t) * (1 - ease(28.4, 29.2, t)) };
  }
  function character(t, trouble) {
    const p = characterPosition(t), scale = 1 + (p.y - 748) / 900;
    const stride = Math.sin(t * 10) * walkEnv(t);
    const breath = Math.sin(t * 1.8) * 1.3;
    const nod = ease(23, 24, t) * (1 - ease(25, 26, t));
    const lean = trouble * .065 - p.reach * .14;
    const bodyY = -Math.abs(stride) * 5 + trouble * 7;
    ellipse(p.x + 10, p.y + 5, 49 * scale, 12 * scale, '#1c454237');
    halo(p.x, p.y - 55, 105, '255,229,153', ease(27, 29, t) * .24);
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(scale, scale); ctx.rotate(lean);
    // Little planted feet, with a heel-to-toe cycle on the two walking beats.
    curve(-19, -22, -22 + stride * 6, -7, -25 + stride * 9, -2 - Math.max(0, stride) * 9, '#e9eee0', 12);
    curve(18, -21, 19 - stride * 6, -7, 23 - stride * 9, -2 - Math.max(0, -stride) * 9, '#f7f7e9', 12);
    ellipse(-23 + stride * 9, -2 - Math.max(0, stride) * 9, 12, 5, '#f8f8eb');
    ellipse(25 - stride * 9, -2 - Math.max(0, -stride) * 9, 12, 5, '#faf9eb');
    ctx.translate(0, bodyY); ctx.scale(1 - breath * .0016, 1 + breath * .002);
    // Arms are behind the torso; the reaching hand meets the near stone's left facet.
    curve(-44, -80, -67 - trouble * 4, -65 + stride * 5, -57 - trouble * 8, -52 + stride * 9, '#e2e9dc', 11);
    curve(43, -84, 57 + p.reach * 2, -61 - p.reach * 46, 51 + p.reach * 16, -48 - p.reach * 58, '#fffced', 12);
    halo(51 + p.reach * 16, -48 - p.reach * 58, 26, '255,229,158', pulse(t, 27.1, 1.5) * p.reach);
    // Pear-shaped marshmallow, softly lit from above-left.
    ctx.beginPath(); ctx.moveTo(0, -164);
    ctx.bezierCurveTo(36, -166, 49, -129, 52, -90);
    ctx.bezierCurveTo(66, -44, 40, -20, 2, -20);
    ctx.bezierCurveTo(-39, -17, -62, -39, -52, -83);
    ctx.bezierCurveTo(-48, -126, -35, -161, 0, -164); ctx.closePath();
    ctx.fillStyle = gradient(-40, -140, 63, -40, [[0, '#fffff2'], [.55, '#f7f7e7'], [.85, color('#e2e9d4', '#d0ddda', trouble)], [1, '#c4d7c9']]); ctx.fill();
    ctx.save(); ctx.clip();
    ellipse(-26, -118, 25, 45, '#ffffff33', .2);
    halo(50, -84, 70, '254,218,139', p.reach * .65);
    ctx.restore();
    // Leaf is the emotional readout: upright, drooped, and gently lifted again.
    ctx.save(); ctx.translate(-3, -160); ctx.rotate(-.25 + trouble * .91 + Math.sin(t * 1.4) * .055 - nod * .2);
    curve(0, 0, 1, -22, -15, -31, '#70824f', 3.5);
    ctx.beginPath(); ctx.moveTo(-4, -20); ctx.bezierCurveTo(-37, -9, -48, -27, -49, -43);
    ctx.bezierCurveTo(-25, -48, -7, -44, -4, -20);
    ctx.fillStyle = gradient(-39, -46, -7, -17, [[0, '#bbd578'], [1, '#71984f']]); ctx.fill();
    curve(-44, -39, -25, -36, -5, -20, '#e4eaa66b', 1.5); ctx.restore();
    // Eyes track the named stone, then look down at the trouble and back to us.
    const lookX = smooth(gazeX, t);
    const lookY = trouble * 5 + nod * 3;
    const blink = [4.4, 10, 13.4, 20.9, 24.1, 29.8, 34.6].reduce((b, at) => Math.max(b, pulse(t, at, .17)), 0);
    const eyes = 1 - blink * .95;
    const calm = ease(32.5, 34, t);
    // Open and closed-calm eyes cross-fade; the catchlight fades with the lid rather than
    // popping at a threshold. Blink and calm are the same lid, so they never fight.
    const lid = clamp(eyes * (1 - calm)), a0 = ctx.globalAlpha;
    for (const xx of [-17, 17]) {
      ctx.globalAlpha = a0 * clamp(lid * 6);
      ellipse(xx + lookX, -110 + lookY, 4.8, 6.2 * lid, '#2d443d');
      ctx.globalAlpha = a0 * clamp((lid - .3) / .3);
      ellipse(xx + lookX - 1.2, -112 + lookY, 1.3, 1.6, '#ffffed');
      ctx.globalAlpha = a0 * calm;
      curve(xx - 5, -105, xx, -111, xx + 5, -105, '#30463d', 3.1);
    }
    ctx.globalAlpha = a0;
    ellipse(-28, -95, 8, 4, '#e1a29a48'); ellipse(29, -95, 8, 4, '#e1a29a48');
    curve(-8 + lookX, -91 + lookY, lookX, -81 + lookY - trouble * 17, 8 + lookX, -91 + lookY, '#536151', 2.4);
    ctx.globalAlpha = a0 * trouble;
    line([[-25, -122], [-13, -126]], '#718072', 2); line([[13, -126], [25, -122]], '#718072', 2);
    ctx.globalAlpha = a0;
    ctx.restore();
  }

  function floatingMotes(t, trouble) {
    ctx.save();
    for (let i = 0; i < 22; i++) {
      const x = 75 + hash(i + 70) * 585 + Math.sin(t * .4 + i) * 9;
      const y = 430 + hash(i + 88) * 425 - Math.sin(t * .5 + i * 2) * 13;
      const a = (.15 + Math.sin(t * 1.7 + i) ** 2 * .45) * (1 - trouble * .8);
      ellipse(x, y, 1 + hash(i) * 1.3, 1 + hash(i) * 1.3, `rgba(255,250,200,${a})`);
    }
    ctx.restore();
  }

  function render(canvas, seconds, options = {}) {
    ctx = canvas.getContext('2d');
    const t = clamp(Number.isFinite(seconds) ? seconds : 0, 0, duration);
    const trouble = ease(13.8, 17.8, t) * (1 - ease(27.2, 32, t));
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
    sky(t, trouble);
    // A modest camera push draws attention to the moment, not to a transition.
    const zoom = 1 + ease(13.6, 18, t) * .07 - ease(28.4, 33, t) * .07;
    ctx.save(); ctx.translate(360, 745); ctx.scale(zoom, zoom); ctx.translate(-360, -745);
    island(t, trouble); connections(t);
    const characterAt = characterPosition(t);
    const objects = pillars.map((s, i) => ({ y: s.y, draw: () => stone(s, i, t, trouble) }));
    objects.push({ y: characterAt.y, draw: () => character(t, trouble) });
    objects.sort((a, b) => a.y - b.y).forEach((o) => o.draw());
    fern(95, 835, .78); fern(592, 875, .9, -1); fern(165, 602, .46, -1);
    floatingMotes(t, trouble);
    ctx.restore();
    // Foreground clouds make the island genuinely read as suspended in space.
    cloud(drift(-77, 19, t, 1.3), 1024, 1.3, .72);
    cloud(drift(330, 16.5, t, 1.65), 996, 1.65, .83);
    const chapter = t < 13.8 ? 'ONE CONNECTED WHOLE' : t < 23.6 ? 'WHEN LIFE FEELS HEAVY' : t < 33.4 ? 'A LITTLE CARE' : 'A PLACE TO BEGIN';
    label(chapter, 360, 123, 13, '#eaf1d7', 'Arial', '500');
    const heading = t < 13.8 ? ['Five pillars.', 'One life.'] : t < 23.6 ? ['It rarely stays', 'in one place.'] : t < 33.4 ? ['Not everything.', 'Just a beginning.'] : ['Small steps.', 'Real life.'];
    label(heading[0], 360, 187, 49, '#fff5d9', 'Georgia');
    label(heading[1], 360, 241, 49, '#fff5d9', 'Georgia', 'italic');
    // Names are editorial labels above the scene, not tiny text on distant stones.
    // The pillar's name is spoken and captioned as each stone lights; it used to be
    // drawn a second time as an editorial label mid-frame. Once is enough (Brad, 2026-09-07).
    if (t >= 33.4) {
      ctx.save(); ctx.globalAlpha = ease(33.4, 34.1, t);
      label('THE FIVE PILLARS OF FULFILMENT', 360, 350, 12, '#466b57');
      pillars.forEach((s, i) => ellipse(320 + i * 20, 375, 4, 4, s.color));
      ctx.restore();
    }
    const cue = cues.find((c) => t >= c.start && t < c.end);
    if (options.captions !== false && cue) {
      wrapped(cue.text, 360, 1133, 565, 30, '#2c4a3e', 'Arial', '400');
    }
    // A subtle raster grain, not an animated noise layer or an SVG filter.
    ctx.drawImage(grain, 0, 0, 720, 1280);
    label('nørma', 360, 1240, 24, '#577560', 'Georgia');
  }
  window.Ch00Film = { duration, cues, pillars, render };
})();

