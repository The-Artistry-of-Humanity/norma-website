// @ts-nocheck
/* Generated from the design handoff (design_handoff_v5/reference) by dc2jsx.
   Markup and styles are verbatim from the reference; logic is the reference's
   own renderVals/state code. Edit the reference and regenerate rather than
   hand-tuning values here. */
import React from 'react';
import { s } from '../../lib/s';
import './YourPeople.dc.css';


class YourPeople extends React.Component {
  state = { narrow: false, stack: false, cols: 5, ready: false, menu: false, pillar: null, feat: 0, filmPlaying: false };
  rootRef = React.createRef(); polyRef = React.createRef(); featRef = React.createRef();
  filmCanvasRef = React.createRef(); filmSeekRef = React.createRef(); filmTimeRef = React.createRef();
  P = [
    { name: 'Health & Fitness', line: 'Sleep, movement, nutrition and energy: the physical base every other pillar rests on.', themes: ['Exercise', 'Nutrition', 'Body', 'Energy'], score: 71, q: 'Do you exercise regularly each week?', laura: '“I’m out walking before work most mornings, and I’ve kept my Thursday yoga class going since spring. Some weeks it’s the only hour that’s properly mine.”' },
    { name: 'Internal Work', line: 'Reading, reflection, gratitude and forgiveness: the inner practice that decides how a person meets pressure.', themes: ['Reading', 'Reflection', 'Gratitude', 'Forgiveness'], score: 58, q: 'Do you practice gratitude?', laura: '“I used to write down a few good things before bed, and I’ve let that slide since August. I notice it most on the days that go sideways.”' },
    { name: 'Love & Relationships', line: 'The closest relationships and the attention they get, usually the first thing to run on leftovers when work expands.', themes: ['Partnership', 'Attention', 'Peace'], score: 66, q: 'Do you make time for meaningful connection in your personal life?', laura: '“Sam and I still keep Sunday mornings for the two of us, phones away. Weeknights are harder, and most of what we talk about is logistics.”' },
    { name: 'Social Connection', line: 'Friends, family, community and belonging: the pillar nobody schedules and the one that thins out first.', themes: ['Friends', 'Family', 'Community', 'Belonging'], score: 38, q: 'Do you spend quality time with a like-minded friend weekly?', laura: '“I can’t remember the last time I saw my friends when it wasn’t someone’s birthday. Work has crept into the evenings I used to keep for them.”' },
    { name: 'Work & Life Flow', line: 'Purpose, enough time to do the job well, the relationship with a manager and control over the next step.', themes: ['Purpose', 'Time', 'Manager', 'Next step'], score: 63, q: 'Do you feel in control of your next step?', laura: '“I know what I’m doing and I’m good at it. What I can’t see is where it goes from here, and nobody’s asked me.”' },
  ];
  COL = ['#4E9A63', '#7A70C4', '#C9705F', '#C99A3F', '#4C9CB3'];
  LAURA = [71, 58, 66, 38, 63];
  // Laura is placed in the centre column; the rest fill around her in this order.
  PEOPLE = [
    { name: 'Kenji', img: 'kenji', sc: [82, 74, 79, 70, 76] }, { name: 'Amara', img: 'amara', sc: [52, 44, 61, 49, 40] },
    { name: 'Tom', img: 'tom', sc: [88, 79, 84, 81, 73] }, { name: 'Priya', img: 'priya', sc: [68, 72, 55, 64, 71] },
    { name: 'Mei', img: 'mei', sc: [60, 49, 58, 62, 46] }, { name: 'Mateo', img: 'mateo', sc: [74, 66, 70, 58, 77] },
    { name: 'Nia', img: 'nia', sc: [45, 39, 52, 33, 41] }, { name: 'Julien', img: 'julien', sc: [63, 71, 48, 55, 68] },
    { name: 'Leila', img: 'leila', sc: [70, 64, 80, 67, 59] }];
  SHAPES = ['30px 20px 32px 22px / 22px 32px 20px 30px', '22px 32px 20px 30px / 30px 20px 32px 22px', '32px 22px 30px 20px / 20px 30px 22px 32px', '20px 30px 22px 32px / 32px 22px 30px 20px'];
  WEAK = 3; FILM_LEN = 36;
  band(s) {
    if (s >= 70) return { band: 'Thriving', col: '#2F8F5B', chipBg: 'rgba(78,154,99,.14)' };
    if (s >= 55) return { band: 'Steady', col: '#14231A', chipBg: 'rgba(20,35,26,.07)' };
    if (s >= 46) return { band: 'Needs care', col: '#9A6E1E', chipBg: 'rgba(201,154,63,.16)' };
    return { band: 'Needs attention', col: '#B14A33', chipBg: 'rgba(201,112,95,.16)' };
  }
  motionOn() { return (this.props.ambientMotion ?? true) && !this.reduced; }
  // Smooth pentagon through the five score points, so the dots sit on the line as in the app.
  pent(sc) {
    const pts = sc.map((s, i) => { const a = (-90 + 72 * i) * Math.PI / 180, r = 36 * (.15 + .85 * s / 100); return [50 + r * Math.cos(a), 52 + r * Math.sin(a)]; });
    const k = v => v.toFixed(2), t = .12;
    let d = 'M' + k(pts[0][0]) + ' ' + k(pts[0][1]);
    for (let i = 0; i < 5; i++) {
      const p0 = pts[(i + 4) % 5], p1 = pts[i], p2 = pts[(i + 1) % 5], p3 = pts[(i + 2) % 5];
      d += ' C' + k(p1[0] + (p2[0] - p0[0]) * t) + ' ' + k(p1[1] + (p2[1] - p0[1]) * t) + ' ' + k(p2[0] - (p3[0] - p1[0]) * t) + ' ' + k(p2[1] - (p3[1] - p1[1]) * t) + ' ' + k(p2[0]) + ' ' + k(p2[1]);
    }
    return { d: d + 'Z', pts };
  }

  componentDidMount() {
    this.reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.onResize = () => {
      const w = window.innerWidth, n = w < 760, s = w < 900, c = w >= 1000 ? 5 : w >= 700 ? 4 : 2;
      if (n !== this.state.narrow || s !== this.state.stack || c !== this.state.cols || !this.state.ready) this.setState({ narrow: n, stack: s, cols: c, ready: true, menu: n ? this.state.menu : false });
    };
    window.addEventListener('resize', this.onResize); this.onResize();
    this.ro = new ResizeObserver(es => es.forEach(e => this.fit(e.target)));
    const root = this.rootRef.current;
    if (root) root.querySelectorAll('[data-fit]').forEach(el => { this.ro.observe(el.parentElement); this.fit(el.parentElement); });
    this.initPoly(); this.initFeatures(); this.bootFilm();
  }
  componentDidUpdate() {
    const grid = this.rootRef.current && this.rootRef.current.querySelector('[data-ppl-grid]'); if (!grid) return;
    this.pplSet(this.pplPlayed, false, true);
    if (grid === this.pplGrid) return;
    this.pplGrid = grid; if (this.ioPpl) this.ioPpl.disconnect();
    this.ioPpl = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting && !this.pplPlayed) { this.pplPlayed = true; this.pplSet(true, true); }
      else if (!en.isIntersecting && en.boundingClientRect.top > 0 && this.pplPlayed) { this.pplPlayed = false; this.pplSet(false, false); }
    }), { threshold: .25 });
    this.ioPpl.observe(grid);
  }
  // Laura arrives in front of the grid and settles into her place; the others fade in around her.
  pplSet(played, animate, onlyNew) {
    const grid = this.pplGrid || (this.rootRef.current && this.rootRef.current.querySelector('[data-ppl-grid]')); if (!grid) return;
    const fin = played || !this.motionOn(), ease = 'cubic-bezier(.22,.61,.36,1)';
    grid.querySelectorAll('[data-role]').forEach(el => {
      if (onlyNew && el.__ppl === el.dataset.role) return; el.__ppl = el.dataset.role;
      const L = el.dataset.role === 'laura', dl = (.3 + (+el.dataset.dist || 0) * .14).toFixed(2) + 's';
      el.style.willChange = L ? 'translate, scale' : 'opacity, scale';
      el.style.transition = !animate ? 'none' : L ? 'translate 1.6s ' + ease + ', scale 1.6s ' + ease : 'opacity 1.1s ease ' + dl + ', scale 1.1s ' + ease + ' ' + dl;
      if (L) { el.style.zIndex = '2'; el.style.opacity = '1'; el.style.translate = fin ? '0 0' : '0 -90px'; el.style.scale = fin ? '1' : '1.18'; }
      else { el.style.zIndex = ''; el.style.translate = '0 0'; el.style.opacity = fin ? '1' : '.16'; el.style.scale = fin ? '1' : '.95'; }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize); window.removeEventListener('scroll', this.onFeatScroll); if (this.ioPpl) this.ioPpl.disconnect(); if (this.ro) this.ro.disconnect();
    [this.ioP, this.ioFilm].forEach(o => o && o.disconnect());
    cancelAnimationFrame(this.raf); cancelAnimationFrame(this.fRaf); clearTimeout(this.filmTimer);
  }
  fit(wrap) {
    const el = wrap.querySelector('[data-fit]'); if (!el || !wrap.clientWidth) return;
    const [w, h] = el.getAttribute('data-fit').split('x').map(Number), s = Math.min(1, wrap.clientWidth / w);
    el.style.transform = 'scale(' + s + ')'; el.style.left = Math.max(0, (wrap.clientWidth - w * s) / 2) + 'px'; wrap.style.height = (h * s) + 'px';
  }
  // Laura's shape grows out from the centre the first time it's seen.
  initPoly() {
    const g = this.polyRef.current; if (!g || !this.motionOn()) return;
    if (g.getBoundingClientRect().top < window.innerHeight * .9) return;
    const tr = g.style.transition; g.style.transition = 'none'; g.style.transform = 'scale(.15)'; g.style.opacity = '.2'; g.getBoundingClientRect(); g.style.transition = tr;
    this.ioP = new IntersectionObserver(es => { if (!es[0].isIntersecting) return; this.ioP.disconnect(); setTimeout(() => { g.style.transform = 'scale(1)'; g.style.opacity = '1'; }, 250); }, { rootMargin: '0px 0px -30% 0px' });
    this.ioP.observe(g.ownerSVGElement);
  }
  // The sticky phone shows whichever feature's text sits closest to the phone's centre.
  initFeatures() {
    const box = this.featRef.current; if (!box) return;
    const upd = () => {
      this.fRaf = 0; if (this.state.stack) return;
      const items = box.querySelectorAll('[data-feat] > div:first-child'), mid = window.innerHeight / 2 + 34;
      let best = 0, bd = Infinity;
      items.forEach((el, i) => { const r = el.getBoundingClientRect(), d = Math.abs((r.top + r.bottom) / 2 - mid); if (d < bd) { bd = d; best = i; } });
      if (best !== this.state.feat) this.setState({ feat: best });
    };
    this.onFeatScroll = () => { if (!this.fRaf) this.fRaf = requestAnimationFrame(upd); };
    window.addEventListener('scroll', this.onFeatScroll, { passive: true }); upd();
  }
  bootFilm() {
    this.t = this.t || 0; this.tries = this.tries || 0;
    if (!window.Ch00Film || !this.filmCanvasRef.current) { if (this.tries++ < 150) this.filmTimer = setTimeout(() => this.bootFilm(), 200); return; }
    this.film = window.Ch00Film; this.drawFilm();
    this.ioFilm = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { if ((this.props.filmAutoplay ?? true) && !this.reduced) this.playFilm(); } else this.pauseFilm(); }), { threshold: .3 });
    this.ioFilm.observe(this.filmCanvasRef.current);
  }
  fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  drawFilm() {
    const c = this.filmCanvasRef.current; if (!c || !this.film) return;
    const tt = Math.min(this.t, this.FILM_LEN);
    try { this.film.render(c, tt, { captions: true }); } catch (e) { }
    if (this.filmSeekRef.current) this.filmSeekRef.current.value = String(tt);
    if (this.filmTimeRef.current) this.filmTimeRef.current.textContent = this.fmt(tt) + ' / 0:36';
  }
  tick = now => { if (!this.playing) return; const dt = Math.min(.1, (now - this.prev) / 1000); this.prev = now; this.t += dt; if (this.t >= this.FILM_LEN + 1.2) this.t = 0; this.drawFilm(); this.raf = requestAnimationFrame(this.tick); };
  playFilm = () => { if (this.playing || !this.film) return; this.playing = true; this.prev = performance.now(); this.raf = requestAnimationFrame(this.tick); this.setState({ filmPlaying: true }); };
  pauseFilm = () => { if (!this.playing) return; this.playing = false; cancelAnimationFrame(this.raf); this.setState({ filmPlaying: false }); };

  renderVals() {
    const { narrow, stack, menu, feat, cols } = this.state;
    const start = (this.props.startPillar ?? 'Health') === 'Weakest' ? this.WEAK : 0;
    const sel = this.state.pillar ?? start;
    const p = this.P[sel];
    const cur = { n: '0' + (sel + 1), name: p.name, line: p.line, themes: p.themes, score: p.score, laura: p.laura, q: p.q, weak: sel === this.WEAK, notWeak: sel !== this.WEAK, ...this.band(p.score) };
    const count = cols * (cols === 2 ? 3 : 2), li = cols === 4 ? 1 : 2, lr = Math.floor(li / cols), lc = li % cols;
    const list = this.PEOPLE.slice(0, count - 1); list.splice(li, 0, { name: 'Laura', img: 'laura', sc: this.LAURA });
    const people = list.map((pp, i) => {
      const s = pp.sc, { d, pts } = this.pent(s), row = Math.floor(i / cols), col = i % cols;
      const o = { name: pp.name, src: '/assets/v5/people/' + pp.img + '.jpg', role: i === li ? 'laura' : 'peer', dist: Math.abs(row - lr) + Math.abs(col - lc), d, score: Math.round(s.reduce((a, b) => a + b, 0) / 5), shape: this.SHAPES[(i + row) % 4], dy: col % 2 ? (cols > 2 ? '56px' : '32px') : '0px' };
      pts.forEach((pt, j) => { o['x' + j] = pt[0].toFixed(2); o['y' + j] = pt[1].toFixed(2); });
      return o;
    });
    const v = { rootRef: this.rootRef, polyRef: this.polyRef, featRef: this.featRef, filmCanvasRef: this.filmCanvasRef, filmSeekRef: this.filmSeekRef, filmTimeRef: this.filmTimeRef,
      wide: !narrow, narrow, menuOpen: narrow && menu, toggleMenu: () => this.setState(s => ({ menu: !s.menu })),
      cur, stack, sideBySide: !stack, motion: this.motionOn(), featMin: stack ? 'auto' : '78vh',
      people, pplReady: this.state.ready, pplGrid: 'repeat(' + cols + ',minmax(0,1fr))',
      flowD: Array.from({ length: cols }, (_, c) => { const x = ((c + .5) / cols * 100).toFixed(2); return 'M' + x + ' 0 C' + x + ' 55 50 45 50 100'; }).join(' '),
      toggleFilm: () => (this.playing ? this.pauseFilm() : this.playFilm()),
      seekFilm: e => { this.t = Math.min(this.FILM_LEN, Math.max(0, +e.target.value)); this.drawFilm(); },
      filmPlaying: this.state.filmPlaying, filmPaused: !this.state.filmPlaying };
    this.P.forEach((_, i) => {
      const on = i === sel;
      v['pk' + i] = () => this.setState({ pillar: i });
      v['on' + i] = on;
      v['rg' + i] = on ? '0 0 0 2px ' + this.COL[i] : i === this.WEAK ? '0 0 0 2px rgba(201,112,95,.7)' : 'none';
    });
    for (let i = 0; i < 6; i++) {
      const on = i === feat;
      v['fo' + i] = on ? 1 : 0; v['fs' + i] = on ? 1 : 1.03; v['fh' + i] = !on;
      v['dh' + i] = on ? '26px' : '8px'; v['dc' + i] = on ? '#D9EA6E' : 'rgba(228,240,214,.22)';
    }
    return v;
  }

  render() {
    const V = { ...this.props, ...(this.renderVals ? this.renderVals() : {}) };
    return (
      <>
    <div ref={V.rootRef} style={s(`background:#F4F2E6;color:#14231A;font-family:'DM Sans',sans-serif;overflow-x:clip;-webkit-font-smoothing:antialiased`)}>
      <header style={s(`position:sticky;top:0;z-index:60;border-radius:0 0 26px 20px / 0 0 20px 26px;background:linear-gradient(180deg,rgba(250,248,240,.78),rgba(244,242,230,.6));backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -1px 0 rgba(255,255,255,.35),0 1px 0 rgba(20,35,26,.06),0 10px 30px -18px rgba(20,35,26,.25)`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;height:68px;display:flex;align-items:center;justify-content:space-between;gap:24px`)}>
          <a href="/" style={s(`display:flex;align-items:center;gap:10px;color:#14231A`)}>
            <img src="/assets/v5/norma-icon.png" alt="" width="30" height="30" style={s(`display:block;border-radius:9px`)} />
            <span style={s(`font:400 23px/1 'DM Serif Display',serif;letter-spacing:-.2px`)}>nørma</span>
          </a>
          <div style={s(`display:flex;align-items:center;gap:28px`)}>
            {(V.wide) ? (
              <>
                <nav style={s(`display:flex;align-items:center;gap:28px;font:500 14px 'DM Sans',sans-serif`)}>
                  <a href="/your-people/" style={s(`color:#14231A;padding:4px 0 2px;border-bottom:2px solid #D3E45F`)} className="yp-ho789e87">Your people</a>
                  <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">For leaders</a>
                  <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">ROI</a>
                  <a href="/our-story/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">Our story</a>
                </nav>
              </>
            ) : null}
            <div style={s(`display:flex;align-items:center;gap:10px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:44px;padding:0 16px;white-space:nowrap;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px rgba(217,234,110,.22)`)} className="yp-ac3e8255">Book a demo</a>
              {(V.narrow) ? (
                <>
                  <button type="button" onClick={V.toggleMenu} aria-label="Menu" style={s(`width:40px;height:40px;border-radius:999px;border:1px solid rgba(20,35,26,.16);background:transparent;display:flex;align-items:center;justify-content:center;color:#14231A;cursor:pointer;padding:0`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M4 8h16"></path>
                      <path d="M4 16h16"></path>
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {(V.menuOpen) ? (
          <>
            <nav style={s(`padding:8px clamp(20px,5vw,48px) 20px;display:flex;flex-direction:column;border-top:1px solid rgba(20,35,26,.07);font:400 22px 'DM Serif Display',serif`)}>
              <a href="/your-people/" style={s(`padding:12px 0;border-bottom:1px solid rgba(20,35,26,.08);color:#14231A`)}>Your people</a>
              <a href="/for-leaders/" style={s(`padding:12px 0;border-bottom:1px solid rgba(20,35,26,.08);color:#14231A`)}>For leaders</a>
              <a href="/roi/" style={s(`padding:12px 0;border-bottom:1px solid rgba(20,35,26,.08);color:#14231A`)}>ROI</a>
              <a href="/our-story/" style={s(`padding:12px 0;color:#14231A`)}>Our story</a>
            </nav>
          </>
        ) : null}
      </header>
      <section style={s(`position:relative`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(72px,9vw,120px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,5vw,64px)`)}>
          <div style={s(`flex:1 1 340px;min-width:0;max-width:540px`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>Your people · the app</span>
            <h1 style={s(`margin:16px 0 0;font:400 clamp(44px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance`)}>A private companion for <span className="nrm-mark">their whole life</span>.</h1>
            <p style={s(`margin:28px 0 0;max-width:28em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
              Once a month, your people check in across the five pillars of their life. In between, there’s always one small thing to do: say what’s on their mind, take a breath, keep a habit, open a chapter.
            </p>
            <div style={s(`display:flex;flex-wrap:wrap;gap:12px;margin-top:36px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 24px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="yp-ac3e8255">Book a demo</a>
              <a href="#pillars" style={s(`display:inline-flex;align-items:center;height:54px;box-sizing:border-box;padding:0 24px;border-radius:999px;border:1px solid rgba(20,35,26,.2);color:#14231A;font:600 15.5px 'DM Sans',sans-serif`)} className="yp-ho2976a3">See the five pillars</a>
            </div>
            <p style={s(`margin:28px 0 0;display:flex;align-items:center;gap:10px;font:500 14px 'DM Sans',sans-serif;color:rgba(20,35,26,.72)`)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"></path>
              </svg>
              Only they can read what they write, say or answer.
            </p>
          </div>
          <div style={s(`flex:1.4 1 420px;min-width:0;position:relative;height:620px`)}>
            <div data-fit="640x620" style={s(`position:absolute;left:0;top:0;width:640px;height:620px;transform-origin:0 0`)}>
              <div aria-hidden="true" style={s(`position:absolute;left:110px;top:0;width:420px;height:610px;border-radius:210px 210px 30px 24px / 210px 210px 30px 24px;background:radial-gradient(62% 40% at 50% 16%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 60%)`)}></div>
              <div style={s(`position:absolute;left:34px;top:118px;transform:rotate(-7deg);width:214px;aspect-ratio:390/844;box-sizing:border-box;padding:6px;border-radius:35px;background:#0B140E;box-shadow:0 44px 80px -34px rgba(20,35,26,.6),0 0 0 1px rgba(20,35,26,.14)`)}>
                <div style={s(`width:100%;height:100%;border-radius:30px;overflow:hidden;background:#0F2015`)}>
                  <img src="/assets/v5/light/app-reflect.webp" alt="Reflect: What’s on your mind? nørma listening" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                </div>
              </div>
              <div style={s(`position:absolute;left:392px;top:118px;transform:rotate(7deg);width:214px;aspect-ratio:390/844;box-sizing:border-box;padding:6px;border-radius:35px;background:#0B140E;box-shadow:0 44px 80px -34px rgba(20,35,26,.6),0 0 0 1px rgba(20,35,26,.14)`)}>
                <div style={s(`width:100%;height:100%;border-radius:30px;overflow:hidden;background:#0F2015`)}>
                  <img src="/assets/v5/light/app-film.webp" alt="Foundations, a growth journey: pick up the chapter where you left off" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                </div>
              </div>
              <div style={s(`position:absolute;left:189px;top:36px;width:262px;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:43px;background:#0B140E;box-shadow:0 44px 80px -34px rgba(20,35,26,.6),0 0 0 1px rgba(20,35,26,.14)`)}>
                <div style={s(`width:100%;height:100%;border-radius:37px;overflow:hidden;background:#0F2015`)}>
                  <img src="/assets/v5/light/app-home.webp" alt="nørma Home: Good evening, Fulfilment 67 with the five pillars" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="pillars" style={s(`position:relative;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;left:-12%;top:8%;width:72%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.08),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(80px,10vw,136px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>The five pillars</span>
          <h2 style={s(`margin:14px 0 0;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Five pillars. <span className="nrm-mark nrm-mark-dark">One life</span>.</h2>
          <p style={s(`margin:22px 0 0;max-width:36em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>
            nørma is built on our own framework: five pillars that together shape a person’s life. Work is only one of them. Health, inner life, close relationships and friendships all carry into the working day, and when one slips, the others feel it.
          </p>
          <div style={s(`margin-top:clamp(40px,5vw,64px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr));gap:clamp(40px,5vw,72px);align-items:center`)}>
            <div style={s(`box-sizing:border-box;width:100%;max-width:540px;margin:0 auto;padding:clamp(18px,2.6vw,28px);border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:linear-gradient(170deg,#FBFAF4,#F2F1E6 80%);box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(20,35,26,.06)`)}>
            <div style={s(`position:relative;width:100%;aspect-ratio:100/94;margin:0 auto`)}>
              <div aria-hidden="true" style={s(`position:absolute;left:20%;top:24%;width:60%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.4),rgba(217,234,110,0) 72%);pointer-events:none`)}></div>
              <div style={s(`position:absolute;left:0;top:0;z-index:1;display:flex;align-items:center;gap:12px`)}>
                <span style={s(`position:relative;flex:none;width:52px;height:52px`)}>
                  <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                    <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(20,35,26,.1)" strokeWidth="2"></circle>
                    <circle cx="26" cy="26" r="24.5" fill="none" stroke="#8FB03E" strokeWidth="2" strokeLinecap="round" pathlength="100" strokeDasharray="59 100"></circle>
                  </svg>
                  {' '}
                  <img src="/assets/v5/people/laura-avatar.jpg" alt="Laura" width="42" height="42" style={s(`position:absolute;left:5px;top:5px;display:block;width:42px;height:42px;border-radius:50%;object-fit:cover`)} />
                </span>
                <span style={s(`display:flex;flex-direction:column;gap:5px`)}>
                  <span style={s(`font:400 21px/1 'DM Serif Display',serif;color:#14231A`)}>Laura</span>
                  <span style={s(`font:500 10.5px 'DM Mono',monospace;letter-spacing:1.4px;color:rgba(20,35,26,.5)`)}>OCTOBER</span>
                </span>
              </div>
              <svg viewBox="0 0 100 94" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;overflow:visible`)}>
                <defs>
                  <radialGradient id="lauraFill" cx="50%" cy="50%" r="62%">
                    <stop offset="0" stopColor="#D9EA6E" stopOpacity=".7"></stop>
                    <stop offset="1" stopColor="#D9EA6E" stopOpacity=".32"></stop>
                  </radialGradient>
                </defs>
                <path d="M50.00 16.00 C56.85 16.00 82.12 34.36 84.24 40.88 C86.35 47.39 76.70 77.10 71.16 81.12 C65.62 85.15 34.38 85.15 28.84 81.12 C23.30 77.10 13.65 47.39 15.76 40.88 C17.88 34.36 43.15 16.00 50.00 16.00Z" fill="none" stroke="rgba(143,176,62,.3)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
                <g ref={V.polyRef} style={s(`transform-origin:50px 52px;transition:transform 1.6s cubic-bezier(.22,.61,.36,1),opacity 1s ease`)}>
                  <path d="M50.00 24.87 C55.46 24.93 70.21 39.11 72.02 44.85 C73.82 50.59 68.89 70.20 65.04 72.71 C61.20 75.22 44.61 69.18 39.99 65.78 C35.37 62.38 25.33 49.28 26.53 44.37 C27.73 39.47 44.54 24.82 50.00 24.87Z" fill="url(#lauraFill)" stroke="#8FB03E" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path>
                  <circle cx="50.00" cy="24.87" r="1.4" fill="#4E9A63"></circle>
                  <circle cx="72.02" cy="44.85" r="1.4" fill="#7A70C4"></circle>
                  <circle cx="65.04" cy="72.71" r="1.4" fill="#C9705F"></circle>
                  <circle cx="39.99" cy="65.78" r="1.4" fill="#C99A3F"></circle>
                  <circle cx="26.53" cy="44.37" r="1.4" fill="#4C9CB3"></circle>
                </g>
              </svg>
              <div style={s(`position:absolute;left:50%;top:55.3%;transform:translate(-50%,-50%);pointer-events:none`)}>
                <span style={s(`display:block;font:400 clamp(56px,9vw,100px)/.9 'DM Serif Display',serif;color:#14231A`)}>59</span>
              </div>
              {(V.motion) ? (
                <>
                  <svg viewBox="0 0 100 94" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none`)}>
                    <circle cx="28.84" cy="81.12" r="6.2" fill="none" stroke="#C9705F" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
                      <animate attributename="r" values="6.2;10.5" dur="3s" repeatcount="indefinite"></animate>
                      <animate attributename="opacity" values=".75;0" dur="3s" repeatcount="indefinite"></animate>
                    </circle>
                  </svg>
                </>
              ) : null}
              <button type="button" onClick={V.pk0} aria-pressed={V.on0} aria-label="Health & Fitness, 71" style={s(`position:absolute;left:50%;top:17.02%;width:12%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0;border:0;cursor:pointer;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(78,154,99,.14);color:#4E9A63;display:flex;align-items:center;justify-content:center;box-shadow:${V.rg0 ?? ''};transition:box-shadow .3s ease,background .3s ease`)} className="yp-hob310ea yp-ac44a72b">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                  <circle cx="14.5" cy="4.6" r="1.8"></circle>
                  <path d="M7.5 11.2l3.6-2.9 3.2 1.4 1.6 2.9 2.9.6"></path>
                  <path d="M11.1 8.3l-1.4 5.6 3.4 2.4-.9 4.9"></path>
                  <path d="M9.7 13.9l-2.6 5.4"></path>
                </svg>
              </button>
              {' '}
              <button type="button" onClick={V.pk1} aria-pressed={V.on1} aria-label="Internal Work, 58" style={s(`position:absolute;left:84.24%;top:43.49%;width:12%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0;border:0;cursor:pointer;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(122,112,196,.14);color:#7A70C4;display:flex;align-items:center;justify-content:center;box-shadow:${V.rg1 ?? ''};transition:box-shadow .3s ease,background .3s ease`)} className="yp-ho5a130b yp-ac44a72b">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                  <path d="M12 6.6C10.2 5.3 7.6 4.8 3.8 5v13.2c3.8-.2 6.4.3 8.2 1.6 1.8-1.3 4.4-1.8 8.2-1.6V5c-3.8-.2-6.4.3-8.2 1.6z"></path>
                  <path d="M12 6.6v13.2"></path>
                </svg>
              </button>
              {' '}
              <button type="button" onClick={V.pk2} aria-pressed={V.on2} aria-label="Love & Relationships, 66" style={s(`position:absolute;left:71.16%;top:86.3%;width:12%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0;border:0;cursor:pointer;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(201,112,95,.14);color:#C9705F;display:flex;align-items:center;justify-content:center;box-shadow:${V.rg2 ?? ''};transition:box-shadow .3s ease,background .3s ease`)} className="yp-hoec5a95 yp-ac44a72b">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                  <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                </svg>
              </button>
              {' '}
              <button type="button" onClick={V.pk3} aria-pressed={V.on3} aria-label="Social Connection, 38, her weakest pillar" style={s(`position:absolute;left:28.84%;top:86.3%;width:12%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0;border:0;cursor:pointer;border-radius:50% 46% 54% 50% / 52% 50% 48% 50%;background:rgba(201,154,63,.16);color:#C99A3F;display:flex;align-items:center;justify-content:center;box-shadow:${V.rg3 ?? ''};transition:box-shadow .3s ease,background .3s ease`)} className="yp-hoc3879c yp-ac44a72b">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                  <path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4"></path>
                  <path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4"></path>
                  <circle cx="9" cy="8.5" r="3.2"></circle>
                  <circle cx="16.8" cy="10.3" r="2.6"></circle>
                </svg>
              </button>
              {' '}
              <button type="button" onClick={V.pk4} aria-pressed={V.on4} aria-label="Work & Life Flow, 63" style={s(`position:absolute;left:15.76%;top:43.49%;width:12%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0;border:0;cursor:pointer;border-radius:54% 50% 46% 50% / 50% 48% 52% 50%;background:rgba(76,156,179,.14);color:#4C9CB3;display:flex;align-items:center;justify-content:center;box-shadow:${V.rg4 ?? ''};transition:box-shadow .3s ease,background .3s ease`)} className="yp-hoc7f31f yp-ac44a72b">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                  <path d="M3 7.5c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                  <path d="M3 12c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                  <path d="M3 16.5c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                </svg>
              </button>
            </div>
            </div>
            <div style={s(`box-sizing:border-box;padding:clamp(28px,3.4vw,40px);border-radius:30px 22px 32px 20px / 22px 32px 20px 30px;background:linear-gradient(165deg,#FBFAF4,#F2F1E6 70%);box-shadow:0 30px 70px -30px rgba(0,0,0,.6),0 0 0 1px rgba(20,35,26,.06);color:#14231A`)}>
              <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#4E7A2E`)}>{"PILLAR "}{V.cur.n}{" OF 05"}</span>
              <h3 style={s(`margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#14231A`)}>{V.cur.name}</h3>
              <p style={s(`margin:12px 0 0;font:400 16.5px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>{V.cur.line}</p>
              <div style={s(`display:flex;flex-wrap:wrap;gap:8px;margin-top:18px`)}>
                {(V.cur.themes || []).map((th, $index) => (
                  <React.Fragment key={$index}>
                    <span style={s(`padding:7px 13px;border-radius:14px 10px 13px 9px / 10px 13px 9px 14px;background:rgba(20,35,26,.06);font:500 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.78)`)}>{th}</span>
                  </React.Fragment>
                ))}
              </div>
              <div style={s(`margin-top:26px;padding:22px 22px 24px;border-radius:24px 16px 26px 14px / 16px 26px 14px 24px;background:#FFFFFF;box-shadow:0 0 0 1px rgba(20,35,26,.06)`)}>
                <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(20,35,26,.5)`)}>LAURA · THIS MONTH</span>
                <div style={s(`display:flex;align-items:center;gap:14px;margin-top:12px`)}>
                  <img src="/assets/v5/people/laura-avatar.jpg" alt="Laura" width="48" height="48" style={s(`display:block;flex:none;width:48px;height:48px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;object-fit:cover`)} />
                  <span style={s(`font:400 48px/1 'DM Serif Display',serif;color:${V.cur.col ?? ''}`)}>{V.cur.score}</span>
                  <span style={s(`padding:5px 11px;border-radius:999px;background:${V.cur.chipBg ?? ''};font:600 12px 'DM Sans',sans-serif;color:${V.cur.col ?? ''}`)}>{V.cur.band}</span>
                </div>
                <span style={s(`display:block;margin-top:16px;font:500 13px/1.45 'DM Sans',sans-serif;color:rgba(20,35,26,.55);text-wrap:pretty`)}>{"From the check-in: "}{V.cur.q}</span>
                <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.78);text-wrap:pretty`)}>{V.cur.laura}</p>
                {(V.cur.weak) ? (
                  <>
                    <div style={s(`margin-top:20px;display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border-radius:20px 14px 22px 12px / 14px 22px 12px 20px;background:rgba(231,142,113,.12);border:1px solid rgba(231,142,113,.45)`)}>
                      <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(201,112,95,.16);display:flex;align-items:center;justify-content:center;color:#B14A33`)}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4l7.6 5.5-2.9 9H7.3l-2.9-9z"></path></svg>
                      </span>
                      <span style={s(`display:flex;flex-direction:column;gap:4px`)}>
                        <span style={s(`font:600 15.5px/1.35 'DM Sans',sans-serif;color:#B14A33`)}>Her weakest pillar, so this is where she starts.</span>
                        <span style={s(`font:400 14.5px/1.5 'DM Sans',sans-serif;color:rgba(20,35,26,.72)`)}>nørma makes Social Connection her focus this month, with one habit to add and a short journey to begin.</span>
                      </span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <p style={s(`margin:clamp(56px,7vw,88px) auto 0;max-width:30em;text-align:center;font:400 clamp(21px,2vw,25px)/1.3 'DM Serif Display',serif;letter-spacing:-.2px;color:rgba(244,242,230,.92);text-wrap:balance`)}>A person who is sleeping badly, has stopped seeing friends and is carrying something at home brings all of it to work.</p>
        </div>
      </section>
      <section id="check-in" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(72px,8vw,112px)`)}>
          <div style={s(`text-align:center`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>The monthly check-in</span>
            <h2 style={s(`margin:14px auto 0;max-width:13em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance`)}>Once a month, <span className="nrm-mark">a few minutes</span>.</h2>
            <p style={s(`margin:20px auto 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
              The check-in is an awareness tool that works both ways. Each person gets their own picture first, a starting point for the month. Only then does it become the group signal leaders see.
            </p>
          </div>
          <ol data-m="ci-steps" style={s(`list-style:none;margin:clamp(48px,6vw,72px) 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(48px,5vw,56px) clamp(28px,3.4vw,48px)`)}>
            <li style={s(`display:grid;grid-template-rows:subgrid;grid-row:span 3;row-gap:20px;min-width:0`)}>
              <div style={s(`display:flex;align-items:baseline;gap:12px;padding:0 4px`)}>
                <span style={s(`font:500 12px 'DM Mono',monospace;color:rgba(20,35,26,.55)`)}>01</span>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A`)}>The monthly check-in</span>
              </div>
              <div style={s(`height:clamp(440px,40vw,520px);display:flex;align-items:center;justify-content:center`)}>
                <div style={s(`height:100%;max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:40px;background:#0B140E;box-shadow:0 40px 70px -34px rgba(20,35,26,.55),0 0 0 1px rgba(20,35,26,.12)`)}>
                  <div style={s(`width:100%;height:100%;border-radius:34px;overflow:hidden;background:#0F2015`)}>
                    <img src="/assets/v5/light/app-question.webp" alt="A check-in question: Do you exercise regularly each week? No, Not really, Mostly, Yes" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                  </div>
                </div>
              </div>
              <p style={s(`margin:0;padding:0 4px;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>
                Short questions on how life is going across all five pillars, then three about work: do they feel heard, valued and safe to speak their truth?
              </p>
            </li>
            <li style={s(`display:grid;grid-template-rows:subgrid;grid-row:span 3;row-gap:20px;min-width:0`)}>
              <div style={s(`display:flex;align-items:baseline;gap:12px;padding:0 4px`)}>
                <span style={s(`font:500 12px 'DM Mono',monospace;color:rgba(20,35,26,.55)`)}>02</span>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A`)}>Their fulfilment</span>
              </div>
              <div style={s(`height:clamp(440px,40vw,520px);display:flex;align-items:center;justify-content:center`)}>
                <div style={s(`height:100%;max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:40px;background:#0B140E;box-shadow:0 40px 70px -34px rgba(20,35,26,.55),0 0 0 1px rgba(20,35,26,.12)`)}>
                  <div style={s(`width:100%;height:100%;border-radius:34px;overflow:hidden;background:#0F2015`)}>
                    <img src="/assets/v5/light/app-where-you-stand.webp" alt="Check-in complete: Where you stand. Fulfilment 64, up 3 since the last check-in, and Social Connection has the most room to grow" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                  </div>
                </div>
              </div>
              <p style={s(`margin:0;padding:0 4px;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>
                Their five pillars, their Fulfilment and one focus for the month. A starting point that’s theirs, before anyone else sees anything.
              </p>
            </li>
            <li style={s(`display:grid;grid-template-rows:subgrid;grid-row:span 3;row-gap:20px;min-width:0`)}>
              <div style={s(`display:flex;align-items:baseline;gap:12px;padding:0 4px`)}>
                <span style={s(`font:500 12px 'DM Mono',monospace;color:rgba(20,35,26,.55)`)}>03</span>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A`)}>Their space to work on it</span>
              </div>
              <div style={s(`height:clamp(440px,40vw,520px);display:flex;align-items:center;justify-content:center`)}>
                <div style={s(`height:100%;max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:40px;background:#0B140E;box-shadow:0 40px 70px -34px rgba(20,35,26,.55),0 0 0 1px rgba(20,35,26,.12)`)}>
                  <div style={s(`width:100%;height:100%;border-radius:34px;overflow:hidden;background:#0F2015`)}>
                    <img src="/assets/v5/light/app-home.webp" alt="nørma Home: Good evening, Fulfilment 67 with the five pillars" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                  </div>
                </div>
              </div>
              <p style={s(`margin:0;padding:0 4px;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>
                Home brings it together: their score, their focus and one thing to do today. Between check-ins, this is where they put the work in.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section id="team-signal" style={s(`position:relative;background:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(56px,7vw,96px);padding-bottom:clamp(144px,16vw,216px)`)}>
          <div style={s(`text-align:center`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>From person to team</span>
            <h2 style={s(`margin:14px auto 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance`)}>Every life has its own score. Together, they land as one <span className="nrm-mark">team signal</span>.</h2>
            <p style={s(`margin:20px auto 0;max-width:32em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>Laura’s picture stays hers. What travels is her score, added in with everyone else’s.</p>
          </div>
          <div style={s(`position:relative;margin-top:clamp(48px,6vw,72px)`)}>
            <div aria-hidden="true" style={s(`position:absolute;left:-4%;right:-4%;top:6%;bottom:14%;filter:blur(clamp(28px,4vw,56px));pointer-events:none`)}>
              <div style={s(`width:100%;height:100%;clip-path:polygon(0 0,100% 0,100% 50%,63% 78%,63% 100%,37% 100%,37% 78%,0 50%);background:linear-gradient(180deg,rgba(217,234,110,.16) 0%,rgba(217,234,110,.5) 48%,rgba(205,226,86,.85) 100%)`)}></div>
            </div>
            {(V.pplReady) ? (
              <>
                <div data-ppl-grid="1" style={s(`position:relative;display:grid;grid-template-columns:${V.pplGrid ?? ''};gap:clamp(10px,1.4vw,18px)`)}>
                  {(V.people || []).map((t, $index) => (
                    <React.Fragment key={$index}>
                      <div data-role={t.role} data-dist={t.dist} style={s(`position:relative;aspect-ratio:3/4;border-radius:${t.shape ?? ''};overflow:hidden;background:linear-gradient(170deg,#24402D,#132419);transform:translateY(${t.dy ?? ''});box-shadow:0 30px 50px -30px rgba(20,35,26,.5)`)}>
                        <img src={t.src} alt={t.name} loading="lazy" style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;object-position:50% 30%`)} />
                        <div aria-hidden="true" style={s(`position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(15,32,21,0) 32%,rgba(15,32,21,.26) 56%,rgba(15,32,21,.7) 100%)`)}></div>
                        <div aria-hidden="true" style={s(`position:absolute;left:9%;right:9%;bottom:6%;aspect-ratio:100/94;pointer-events:none`)}>
                          <svg viewBox="0 0 100 94" style={s(`position:absolute;inset:0;width:100%;height:100%;overflow:visible`)}>
                            <path d="M50.00 16.00 C56.85 16.00 82.12 34.36 84.24 40.88 C86.35 47.39 76.70 77.10 71.16 81.12 C65.62 85.15 34.38 85.15 28.84 81.12 C23.30 77.10 13.65 47.39 15.76 40.88 C17.88 34.36 43.15 16.00 50.00 16.00Z" fill="rgba(15,32,21,.16)" stroke="rgba(246,244,233,.3)" strokeWidth="1" vectorEffect="non-scaling-stroke"></path>
                            <path d={t.d} fill="rgba(217,234,110,.26)" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path>
                            <circle cx={t.x0} cy={t.y0} r="1.7" fill="#A9DDB4"></circle>
                            <circle cx={t.x1} cy={t.y1} r="1.7" fill="#C4BEEE"></circle>
                            <circle cx={t.x2} cy={t.y2} r="1.7" fill="#F0BDB5"></circle>
                            <circle cx={t.x3} cy={t.y3} r="1.7" fill="#F2DAAC"></circle>
                            <circle cx={t.x4} cy={t.y4} r="1.7" fill="#AAD7E3"></circle>
                          </svg>
                          {' '}
                          <span style={s(`position:absolute;left:50%;top:17.02%;width:14%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(15,32,21,.6);color:#A9DDB4;display:flex;align-items:center;justify-content:center`)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                              <circle cx="14.5" cy="4.6" r="1.8"></circle>
                              <path d="M7.5 11.2l3.6-2.9 3.2 1.4 1.6 2.9 2.9.6"></path>
                              <path d="M11.1 8.3l-1.4 5.6 3.4 2.4-.9 4.9"></path>
                              <path d="M9.7 13.9l-2.6 5.4"></path>
                            </svg>
                          </span>
                          <span style={s(`position:absolute;left:84.24%;top:43.49%;width:14%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(15,32,21,.6);color:#C4BEEE;display:flex;align-items:center;justify-content:center`)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                              <path d="M12 6.6C10.2 5.3 7.6 4.8 3.8 5v13.2c3.8-.2 6.4.3 8.2 1.6 1.8-1.3 4.4-1.8 8.2-1.6V5c-3.8-.2-6.4.3-8.2 1.6z"></path>
                              <path d="M12 6.6v13.2"></path>
                            </svg>
                          </span>
                          <span style={s(`position:absolute;left:71.16%;top:86.3%;width:14%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(15,32,21,.6);color:#F0BDB5;display:flex;align-items:center;justify-content:center`)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                              <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                            </svg>
                          </span>
                          <span style={s(`position:absolute;left:28.84%;top:86.3%;width:14%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50% 46% 54% 50% / 52% 50% 48% 50%;background:rgba(15,32,21,.6);color:#F2DAAC;display:flex;align-items:center;justify-content:center`)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                              <path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4"></path>
                              <path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4"></path>
                              <circle cx="9" cy="8.5" r="3.2"></circle>
                              <circle cx="16.8" cy="10.3" r="2.6"></circle>
                            </svg>
                          </span>
                          <span style={s(`position:absolute;left:15.76%;top:43.49%;width:14%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:54% 50% 46% 50% / 50% 48% 52% 50%;background:rgba(15,32,21,.6);color:#AAD7E3;display:flex;align-items:center;justify-content:center`)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                              <path d="M3 7.5c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                              <path d="M3 12c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                              <path d="M3 16.5c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                            </svg>
                          </span>
                          {' '}
                          <span style={s(`position:absolute;left:50%;top:55.3%;transform:translate(-50%,-50%);font:400 clamp(28px,3.4vw,44px)/1 'DM Serif Display',serif;color:#F6F4E9;text-shadow:0 2px 18px rgba(15,32,21,.6)`)}>{t.score}</span>
                        </div>
                        <span style={s(`position:absolute;left:12px;top:12px;padding:5px 11px;border-radius:999px;background:rgba(15,32,21,.62);font:500 12.5px 'DM Sans',sans-serif;color:#F6F4E9`)}>{t.name}</span>
                        {' '}
                        <span title="Only visible to them" style={s(`position:absolute;right:10px;top:10px;width:28px;height:28px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(15,32,21,.6);display:flex;align-items:center;justify-content:center;color:rgba(246,244,233,.85);pointer-events:none`)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-label="Private">
                            <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"></path>
                          </svg>
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : null}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={s(`position:relative;display:block;width:100%;height:clamp(80px,10vw,140px);margin-top:clamp(32px,4vw,56px);overflow:visible`)}>
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#4A6B3A" stopOpacity=".12"></stop>
                  <stop offset="1" stopColor="#4A6B3A" stopOpacity=".75"></stop>
                </linearGradient>
              </defs>
              <path d={V.flowD} fill="none" stroke="url(#flowGrad)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path>
            </svg>
            <div style={s(`position:relative;max-width:880px;margin:0 auto;box-sizing:border-box;padding:clamp(28px,4vw,48px);border-radius:36px 24px 34px 22px / 24px 36px 22px 34px;background:radial-gradient(60% 70% at 30% 0%,rgba(217,234,110,.3),rgba(217,234,110,0) 70%),linear-gradient(170deg,#FBFAF4,#F2F1E6 80%);box-shadow:0 50px 100px -50px rgba(20,35,26,.45),0 0 0 1px rgba(20,35,26,.07);color:#14231A;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(28px,4vw,56px);align-items:center`)}>
              <div style={s(`position:relative;width:100%;max-width:300px;aspect-ratio:100/94;margin:0 auto`)}>
                <div aria-hidden="true" style={s(`position:absolute;left:18%;top:22%;width:64%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.16),rgba(217,234,110,0) 72%)`)}></div>
                <svg viewBox="0 0 100 94" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;overflow:visible`)}>
                  <defs>
                    <radialGradient id="teamFill" cx="50%" cy="50%" r="62%">
                      <stop offset="0" stopColor="#D9EA6E" stopOpacity=".7"></stop>
                      <stop offset="1" stopColor="#D9EA6E" stopOpacity=".32"></stop>
                    </radialGradient>
                  </defs>
                  <path d="M50.00 16.00 C56.85 16.00 82.12 34.36 84.24 40.88 C86.35 47.39 76.70 77.10 71.16 81.12 C65.62 85.15 34.38 85.15 28.84 81.12 C23.30 77.10 13.65 47.39 15.76 40.88 C17.88 34.36 43.15 16.00 50.00 16.00Z" fill="none" stroke="rgba(143,176,62,.3)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
                  <path d="M50.00 26.10 C55.53 26.09 71.40 38.91 73.18 44.47 C74.96 50.03 69.28 69.31 64.87 72.46 C60.45 75.61 40.92 74.07 36.39 70.73 C31.86 67.38 25.48 49.92 27.11 44.56 C28.74 39.21 44.47 26.11 50.00 26.10Z" fill="url(#teamFill)" stroke="#8FB03E" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path>
                  <circle cx="50.00" cy="26.10" r="1.5" fill="#4E9A63"></circle>
                  <circle cx="73.18" cy="44.47" r="1.5" fill="#7A70C4"></circle>
                  <circle cx="64.87" cy="72.46" r="1.5" fill="#C9705F"></circle>
                  <circle cx="36.39" cy="70.73" r="1.5" fill="#C99A3F"></circle>
                  <circle cx="27.11" cy="44.56" r="1.5" fill="#4C9CB3"></circle>
                </svg>
                {' '}
                <span aria-hidden="true" style={s(`position:absolute;left:50%;top:17.02%;width:13%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(78,154,99,.14);color:#4E9A63;display:flex;align-items:center;justify-content:center`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                    <circle cx="14.5" cy="4.6" r="1.8"></circle>
                    <path d="M7.5 11.2l3.6-2.9 3.2 1.4 1.6 2.9 2.9.6"></path>
                    <path d="M11.1 8.3l-1.4 5.6 3.4 2.4-.9 4.9"></path>
                    <path d="M9.7 13.9l-2.6 5.4"></path>
                  </svg>
                </span>
                <span aria-hidden="true" style={s(`position:absolute;left:84.24%;top:43.49%;width:13%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(122,112,196,.14);color:#7A70C4;display:flex;align-items:center;justify-content:center`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                    <path d="M12 6.6C10.2 5.3 7.6 4.8 3.8 5v13.2c3.8-.2 6.4.3 8.2 1.6 1.8-1.3 4.4-1.8 8.2-1.6V5c-3.8-.2-6.4.3-8.2 1.6z"></path>
                    <path d="M12 6.6v13.2"></path>
                  </svg>
                </span>
                <span aria-hidden="true" style={s(`position:absolute;left:71.16%;top:86.3%;width:13%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(201,112,95,.14);color:#C9705F;display:flex;align-items:center;justify-content:center`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                    <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                  </svg>
                </span>
                <span aria-hidden="true" style={s(`position:absolute;left:28.84%;top:86.3%;width:13%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50% 46% 54% 50% / 52% 50% 48% 50%;background:rgba(201,154,63,.16);color:#C99A3F;display:flex;align-items:center;justify-content:center`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                    <path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4"></path>
                    <path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4"></path>
                    <circle cx="9" cy="8.5" r="3.2"></circle>
                    <circle cx="16.8" cy="10.3" r="2.6"></circle>
                  </svg>
                </span>
                <span aria-hidden="true" style={s(`position:absolute;left:15.76%;top:43.49%;width:13%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:54% 50% 46% 50% / 50% 48% 52% 50%;background:rgba(76,156,179,.14);color:#4C9CB3;display:flex;align-items:center;justify-content:center`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`width:46%;height:46%`)}>
                    <path d="M3 7.5c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                    <path d="M3 12c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                    <path d="M3 16.5c3-2.4 6-2.4 9 0s6 2.4 9 0"></path>
                  </svg>
                </span>
                {' '}
                <span style={s(`position:absolute;left:50%;top:55.3%;transform:translate(-50%,-50%);font:400 clamp(44px,5.4vw,64px)/.9 'DM Serif Display',serif;color:#14231A`)}>63</span>
              </div>
              <div style={s(`min-width:0`)}>
                <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:#4E7A2E`)}>TEAM SIGNAL</span>
                <h3 style={s(`margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#14231A;text-wrap:balance`)}>One score for the whole team.</h3>
                <p style={s(`margin:14px 0 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
                  Each person’s answers are added into one figure for their team. Teams below five never appear, and no individual score reaches a dashboard. That’s all a leader sees, and it’s where their side begins.
                </p>
                <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:14px 20px;margin-top:24px`)}>
                  <a href="/for-leaders/#dashboard" style={s(`display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 20px;border-radius:999px;border:1px solid rgba(20,35,26,.2);color:#14231A;font:600 14.5px 'DM Sans',sans-serif`)} className="yp-ho95696c">
                    Explore the leadership dashboard
                    <span aria-hidden="true">›</span>
                  </a>
                  <span style={s(`display:flex;align-items:center;gap:8px;font:400 13.5px/1.45 'DM Sans',sans-serif;color:rgba(20,35,26,.6)`)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"></path>
                    </svg>
                    Teams of five or more. No names.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6`)}>
        <div aria-hidden="true" style={s(`position:absolute;right:-18%;top:0;width:70%;height:100%;background:radial-gradient(50% 40% at 50% 30%,rgba(217,234,110,.07),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>Between check-ins</span>
          <h2 style={s(`margin:14px 0 0;max-width:13em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Powerful features for <span className="nrm-mark nrm-mark-dark">personal growth</span>.</h2>
          <p style={s(`margin:22px 0 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>
            The check-in shows where they are. Between check-ins is where they move the needle: small, regular actions that lift their fulfilment and keep them away from the slow slide towards burnout.
          </p>
          <div style={s(`margin-top:clamp(24px,4vw,48px);display:flex;gap:clamp(40px,6vw,96px);align-items:flex-start`)}>
            <div ref={V.featRef} style={s(`flex:1 1 0;min-width:0`)}>
              <div data-feat="0" style={s(`min-height:${V.featMin ?? ''};display:flex;flex-direction:column;justify-content:center;gap:28px;padding:clamp(28px,4vw,40px) 0`)}>
                <div>
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>01 · REFLECT</span>
                  <h3 style={s(`margin:14px 0 0;font:400 clamp(28px,3.2vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>Say what’s on their mind.</h3>
                  <p style={s(`margin:16px 0 0;max-width:27em;font:400 17px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                    Speak or write for a minute whenever something is taking up space. One prompt, no blank page, and nørma listens. Getting it out of their head is often what makes it clearer.
                  </p>
                  <div style={s(`margin-top:28px;max-width:27em;box-sizing:border-box;display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:22px 14px 24px 12px / 14px 24px 12px 22px;background:rgba(4,11,7,.4)`)}>
                    <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.12);display:flex;align-items:center;justify-content:center;color:#DCEC85`)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
                        <path d="M8 15.5v-3"></path>
                        <path d="M12 15.5v-6"></path>
                        <path d="M16 15.5v-4"></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:5px;min-width:0`)}>
                      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.75)`)}>IN YOUR DASHBOARD</span>
                      <span style={s(`font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>How many reflections people made this month, as one number for the organisation.</span>
                    </span>
                  </div>
                </div>
                {(V.stack) ? (
                  <>
                    <div style={s(`display:flex;justify-content:center`)}>
                      <div style={s(`height:min(560px,128vw);max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                        <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                          <img src="/assets/v5/light/app-reflect.webp" alt="Reflect: What’s on your mind? nørma listening, the words appearing as they’re spoken" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div data-feat="1" style={s(`min-height:${V.featMin ?? ''};display:flex;flex-direction:column;justify-content:center;gap:28px;padding:clamp(28px,4vw,40px) 0`)}>
                <div>
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>02 · THE MIRROR</span>
                  <h3 style={s(`margin:14px 0 0;font:400 clamp(28px,3.2vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>nørma reads it back.</h3>
                  <p style={s(`margin:16px 0 0;max-width:27em;font:400 17px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                    nørma names what sits underneath, the themes it heard and one small step to try next. Every entry is kept in their own words, so over time it becomes a private journal: what weighed on them, what helped, and how far they’ve come.
                  </p>
                  <div style={s(`margin-top:28px;max-width:27em;box-sizing:border-box;display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:14px 24px 12px 22px / 22px 12px 24px 14px;background:rgba(4,11,7,.4)`)}>
                    <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.12);display:flex;align-items:center;justify-content:center;color:#DCEC85`)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
                        <path d="M8 15.5v-3"></path>
                        <path d="M12 15.5v-6"></path>
                        <path d="M16 15.5v-4"></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:5px;min-width:0`)}>
                      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.75)`)}>IN YOUR DASHBOARD</span>
                      <span style={s(`font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>The themes, grouped across the organisation and never quoted.</span>
                    </span>
                  </div>
                </div>
                {(V.stack) ? (
                  <>
                    <div style={s(`display:flex;justify-content:center`)}>
                      <div style={s(`height:min(560px,128vw);max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                        <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                          <img src="/assets/v5/light/app-entry.webp" alt="A reflection entry: Missing someone specific is sitting under the unsure, scattered feeling. Growth work: Reach out to a friend" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div data-feat="2" style={s(`min-height:${V.featMin ?? ''};display:flex;flex-direction:column;justify-content:center;gap:28px;padding:clamp(28px,4vw,40px) 0`)}>
                <div>
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>03 · NAME THE EMOTION</span>
                  <h3 style={s(`margin:14px 0 0;font:400 clamp(28px,3.2vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>When words are hard, start with a feeling.</h3>
                  <p style={s(`margin:16px 0 0;max-width:27em;font:400 17px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                    Sometimes it’s hard to say what’s on your mind, or to find a starting point. Naming the emotion first helps people understand what they actually feel: one of seven core emotions, then the shade, then the exact word. Angry, then disrespected, then dismissed. From there, nørma offers a Reset that fits the moment.
                  </p>
                  <div style={s(`margin-top:28px;max-width:27em;box-sizing:border-box;display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:24px 12px 22px 14px / 12px 22px 14px 24px;background:rgba(4,11,7,.4)`)}>
                    <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.12);display:flex;align-items:center;justify-content:center;color:#DCEC85`)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
                        <path d="M8 15.5v-3"></path>
                        <path d="M12 15.5v-6"></path>
                        <path d="M16 15.5v-4"></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:5px;min-width:0`)}>
                      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.75)`)}>IN YOUR DASHBOARD</span>
                      <span style={s(`font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>An anonymous monthly emotion map for each group.</span>
                    </span>
                  </div>
                </div>
                {(V.stack) ? (
                  <>
                    <div style={s(`display:flex;justify-content:center`)}>
                      <div style={s(`height:min(560px,128vw);max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                        <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                          <img src="/assets/v5/light/app-emotion.webp" alt="Name the emotion: How are you feeling? Seven core emotions as soft colour bubbles" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div data-feat="3" style={s(`min-height:${V.featMin ?? ''};display:flex;flex-direction:column;justify-content:center;gap:28px;padding:clamp(28px,4vw,40px) 0`)}>
                <div>
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>04 · RESET</span>
                  <h3 style={s(`margin:14px 0 0;font:400 clamp(28px,3.2vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>A way back to steady, in minutes.</h3>
                  <p style={s(`margin:16px 0 0;max-width:27em;font:400 17px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                    For the moments when it all gets too much and they need to settle. They pick how they feel, and nørma offers something short that fits: breathing, meditation or movement. A few minutes is often enough to shift out of that state.
                  </p>
                  <div style={s(`margin-top:28px;max-width:27em;box-sizing:border-box;display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:22px 14px 24px 12px / 14px 24px 12px 22px;background:rgba(4,11,7,.4)`)}>
                    <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.12);display:flex;align-items:center;justify-content:center;color:#DCEC85`)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
                        <path d="M8 15.5v-3"></path>
                        <path d="M12 15.5v-6"></path>
                        <path d="M16 15.5v-4"></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:5px;min-width:0`)}>
                      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.75)`)}>IN YOUR DASHBOARD</span>
                      <span style={s(`font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>Which exercises were used, and how often.</span>
                    </span>
                  </div>
                </div>
                {(V.stack) ? (
                  <>
                    <div style={s(`display:flex;justify-content:center`)}>
                      <div style={s(`height:min(560px,128vw);max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                        <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                          <img src="/assets/v5/light/app-breathing.webp" alt="Reset: a breathing exercise, nørma breathing along" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div data-feat="4" style={s(`min-height:${V.featMin ?? ''};display:flex;flex-direction:column;justify-content:center;gap:28px;padding:clamp(28px,4vw,40px) 0`)}>
                <div>
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>05 · HABITS</span>
                  <h3 style={s(`margin:14px 0 0;font:400 clamp(28px,3.2vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>A safety net around all five pillars.</h3>
                  <p style={s(`margin:16px 0 0;max-width:27em;font:400 17px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                    Small habits, suggested from the check-in and tied to a pillar. Our research and testing point the same way: with something small happening in each pillar, people are far more likely to hold their fulfilment or lift it. And when life throws a curveball, that net gives them something to hold on to.
                  </p>
                  <div style={s(`margin-top:28px;max-width:27em;box-sizing:border-box;display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:14px 24px 12px 22px / 22px 12px 24px 14px;background:rgba(4,11,7,.4)`)}>
                    <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.12);display:flex;align-items:center;justify-content:center;color:#DCEC85`)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
                        <path d="M8 15.5v-3"></path>
                        <path d="M12 15.5v-6"></path>
                        <path d="M16 15.5v-4"></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:5px;min-width:0`)}>
                      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.75)`)}>IN YOUR DASHBOARD</span>
                      <span style={s(`font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>Which habits are being kept and how often, never who keeps which.</span>
                    </span>
                  </div>
                </div>
                {(V.stack) ? (
                  <>
                    <div style={s(`display:flex;justify-content:center`)}>
                      <div style={s(`height:min(560px,128vw);max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                        <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                          <img src="/assets/v5/light/app-habits.webp" alt="Habits grouped by pillar" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div data-feat="5" style={s(`min-height:${V.featMin ?? ''};display:flex;flex-direction:column;justify-content:center;gap:28px;padding:clamp(28px,4vw,40px) 0`)}>
                <div>
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>06 · GRATITUDE</span>
                  <h3 style={s(`margin:14px 0 0;font:400 clamp(28px,3.2vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>A daily practice that moves mountains.</h3>
                  <p style={s(`margin:16px 0 0;max-width:27em;font:400 17px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                    Few habits change how a person feels as reliably as gratitude, and it takes seconds. Three good things from today, written from Home and kept in one place to come back to when a day feels heavy.
                  </p>
                  <div style={s(`margin-top:28px;max-width:27em;box-sizing:border-box;display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:24px 12px 22px 14px / 12px 22px 14px 24px;background:rgba(4,11,7,.4)`)}>
                    <span style={s(`flex:none;width:34px;height:34px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.12);display:flex;align-items:center;justify-content:center;color:#DCEC85`)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
                        <path d="M8 15.5v-3"></path>
                        <path d="M12 15.5v-6"></path>
                        <path d="M16 15.5v-4"></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:5px;min-width:0`)}>
                      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.75)`)}>IN YOUR DASHBOARD</span>
                      <span style={s(`font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>How often gratitude is practised across the organisation.</span>
                    </span>
                  </div>
                </div>
                {(V.stack) ? (
                  <>
                    <div style={s(`display:flex;justify-content:center`)}>
                      <div style={s(`height:min(560px,128vw);max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                        <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                          <img src="/assets/v5/light/app-gratitude-entry.webp" alt="Gratitude: three things written for today" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {(V.sideBySide) ? (
              <>
                <div style={s(`flex:none;width:clamp(300px,32vw,380px);position:sticky;top:calc(50vh - min(310px,calc(50vh - 60px)) + 34px);display:flex;align-items:center;justify-content:center;gap:22px;height:min(620px,calc(100vh - 120px))`)}>
                  <div style={s(`height:100%;max-width:100%;aspect-ratio:390/844;box-sizing:border-box;padding:7px;border-radius:42px;background:#060B07;box-shadow:0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(228,240,214,.14)`)}>
                    <div style={s(`position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#0F2015`)}>
                      <img src="/assets/v5/light/app-reflect.webp" alt="Reflect: What’s on your mind? nørma listening, the words appearing as they’re spoken" aria-hidden={V.fh0} style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:${V.fo0 ?? ''};transform:scale(${V.fs0 ?? ''});transition:opacity .9s cubic-bezier(.22,.61,.36,1),transform 1.2s cubic-bezier(.22,.61,.36,1)`)} />
                      <img src="/assets/v5/light/app-entry.webp" alt="A reflection entry: Missing someone specific is sitting under the unsure, scattered feeling. Growth work: Reach out to a friend" aria-hidden={V.fh1} style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:${V.fo1 ?? ''};transform:scale(${V.fs1 ?? ''});transition:opacity .9s cubic-bezier(.22,.61,.36,1),transform 1.2s cubic-bezier(.22,.61,.36,1)`)} />
                      <img src="/assets/v5/light/app-emotion.webp" alt="Name the emotion: How are you feeling? Seven core emotions as soft colour bubbles" aria-hidden={V.fh2} style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:${V.fo2 ?? ''};transform:scale(${V.fs2 ?? ''});transition:opacity .9s cubic-bezier(.22,.61,.36,1),transform 1.2s cubic-bezier(.22,.61,.36,1)`)} />
                      <img src="/assets/v5/light/app-breathing.webp" alt="Reset: a breathing exercise, nørma breathing along" aria-hidden={V.fh3} style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:${V.fo3 ?? ''};transform:scale(${V.fs3 ?? ''});transition:opacity .9s cubic-bezier(.22,.61,.36,1),transform 1.2s cubic-bezier(.22,.61,.36,1)`)} />
                      <img src="/assets/v5/light/app-habits.webp" alt="Habits grouped by pillar" aria-hidden={V.fh4} style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:${V.fo4 ?? ''};transform:scale(${V.fs4 ?? ''});transition:opacity .9s cubic-bezier(.22,.61,.36,1),transform 1.2s cubic-bezier(.22,.61,.36,1)`)} />
                      <img src="/assets/v5/light/app-gratitude-entry.webp" alt="Gratitude: three things written for today" aria-hidden={V.fh5} style={s(`position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:${V.fo5 ?? ''};transform:scale(${V.fs5 ?? ''});transition:opacity .9s cubic-bezier(.22,.61,.36,1),transform 1.2s cubic-bezier(.22,.61,.36,1)`)} />
                    </div>
                  </div>
                  <div aria-hidden="true" style={s(`display:flex;flex-direction:column;gap:8px`)}>
                    <span style={s(`width:8px;height:${V.dh0 ?? ''};border-radius:999px;background:${V.dc0 ?? ''};transition:all .4s cubic-bezier(.22,.61,.36,1)`)}></span>
                    <span style={s(`width:8px;height:${V.dh1 ?? ''};border-radius:999px;background:${V.dc1 ?? ''};transition:all .4s cubic-bezier(.22,.61,.36,1)`)}></span>
                    <span style={s(`width:8px;height:${V.dh2 ?? ''};border-radius:999px;background:${V.dc2 ?? ''};transition:all .4s cubic-bezier(.22,.61,.36,1)`)}></span>
                    <span style={s(`width:8px;height:${V.dh3 ?? ''};border-radius:999px;background:${V.dc3 ?? ''};transition:all .4s cubic-bezier(.22,.61,.36,1)`)}></span>
                    <span style={s(`width:8px;height:${V.dh4 ?? ''};border-radius:999px;background:${V.dc4 ?? ''};transition:all .4s cubic-bezier(.22,.61,.36,1)`)}></span>
                    <span style={s(`width:8px;height:${V.dh5 ?? ''};border-radius:999px;background:${V.dc5 ?? ''};transition:all .4s cubic-bezier(.22,.61,.36,1)`)}></span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <section id="journeys" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6;color:#14231A`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:clamp(48px,6vw,80px);align-items:center`)}>
            <div style={s(`min-width:0`)}>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#4A6B3A`)}>Growth journeys</span>
              <h2 style={s(`margin:14px 0 0;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance`)}>Not training. Short chapters people actually <span className="nrm-mark">want to open</span>.</h2>
              <p style={s(`margin:20px 0 0;max-width:32em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>
                Short, beautifully illustrated chapters that deepen their understanding of the five pillars: what really moves the needle in each one, and how they all connect. Every chapter ends with one thing to try.
              </p>
              <div style={s(`display:flex;flex-wrap:wrap;gap:10px;margin-top:26px;font:500 13px 'DM Sans',sans-serif;color:#14231A`)}>
                <span style={s(`padding:9px 14px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:rgba(20,35,26,.06);border:1px solid rgba(20,35,26,.14)`)}>Watch</span>
                <span style={s(`padding:9px 14px;border-radius:14px 22px 12px 20px / 20px 12px 22px 14px;background:rgba(20,35,26,.06);border:1px solid rgba(20,35,26,.14)`)}>Learn</span>
                <span style={s(`padding:9px 14px;border-radius:20px 12px 22px 14px / 12px 22px 14px 20px;background:rgba(20,35,26,.06);border:1px solid rgba(20,35,26,.14)`)}>Check</span>
                <span style={s(`padding:9px 14px;border-radius:12px 20px 14px 22px / 22px 14px 20px 12px;background:rgba(20,35,26,.06);border:1px solid rgba(20,35,26,.14)`)}>Try one thing</span>
              </div>
              <div style={s(`display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:36px`)}>
                <div style={s(`border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;overflow:hidden;background:#E4E9D6;box-shadow:0 18px 30px -22px rgba(20,35,26,.45)`)}>
                  <img src="/assets/v5/journey/ch-intro-health-b.jpg" alt="" loading="lazy" style={s(`display:block;width:100%;aspect-ratio:3/4;object-fit:cover;object-position:50% 18%`)} />
                  <div style={s(`padding:9px 10px 11px;font:500 9.5px 'DM Mono',monospace;letter-spacing:1px;color:#4A6B3A`)}>HEALTH</div>
                </div>
                <div style={s(`border-radius:14px 22px 12px 20px / 20px 12px 22px 14px;overflow:hidden;background:#E4E9D6;box-shadow:0 18px 30px -22px rgba(20,35,26,.45)`)}>
                  <img src="/assets/v5/journey/ch-05-b.jpg" alt="" loading="lazy" style={s(`display:block;width:100%;aspect-ratio:3/4;object-fit:cover;object-position:50% 18%`)} />
                  <div style={s(`padding:9px 10px 11px;font:500 9.5px 'DM Mono',monospace;letter-spacing:1px;color:#4A6B3A`)}>INTERNAL</div>
                </div>
                <div style={s(`border-radius:20px 12px 22px 14px / 12px 22px 14px 20px;overflow:hidden;background:#E4E9D6;box-shadow:0 18px 30px -22px rgba(20,35,26,.45)`)}>
                  <img src="/assets/v5/journey/ch-intro-love-b.jpg" alt="" loading="lazy" style={s(`display:block;width:100%;aspect-ratio:3/4;object-fit:cover;object-position:50% 18%`)} />
                  <div style={s(`padding:9px 10px 11px;font:500 9.5px 'DM Mono',monospace;letter-spacing:1px;color:#4A6B3A`)}>LOVE</div>
                </div>
                <div style={s(`border-radius:12px 20px 14px 22px / 22px 14px 20px 12px;overflow:hidden;background:#E4E9D6;box-shadow:0 18px 30px -22px rgba(20,35,26,.45)`)}>
                  <img src="/assets/v5/journey/ch-intro-social-b.jpg" alt="" loading="lazy" style={s(`display:block;width:100%;aspect-ratio:3/4;object-fit:cover;object-position:50% 18%`)} />
                  <div style={s(`padding:9px 10px 11px;font:500 9.5px 'DM Mono',monospace;letter-spacing:1px;color:#4A6B3A`)}>SOCIAL</div>
                </div>
              </div>
            </div>
            <div style={s(`display:flex;flex-direction:column;align-items:center;gap:16px`)}>
              <div style={s(`position:relative;width:min(320px,100%)`)}>
                <div aria-hidden="true" style={s(`position:absolute;left:-18%;right:-18%;top:6%;bottom:-4%;border-radius:200px 200px 34px 28px / 200px 200px 34px 28px;background:radial-gradient(70% 40% at 50% 12%,rgba(217,234,110,.42),rgba(217,234,110,0) 72%),#E4E0CC`)}></div>
                <div style={s(`position:relative;border-radius:42px;padding:8px;box-sizing:border-box;background:#14231A;box-shadow:0 40px 90px rgba(20,35,26,.35)`)}>
                  <canvas ref={V.filmCanvasRef} width="720" height="1280" style={s(`display:block;width:100%;height:auto;border-radius:34px;background:#DCE8CF`)} aria-label="Chapter film: Five pillars, one life"></canvas>
                  <span style={s(`position:absolute;left:22px;top:22px;padding:5px 10px;border-radius:999px;background:rgba(27,50,37,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:#F6F4E9`)}>FIVE PILLARS, ONE LIFE</span>
                </div>
              </div>
              <div style={s(`position:relative;z-index:1;display:flex;align-items:center;gap:12px;width:min(320px,100%);margin-top:24px`)}>
                <button type="button" onClick={V.toggleFilm} aria-label="Play or pause" style={s(`flex:none;width:44px;height:44px;border-radius:999px;border:0;cursor:pointer;background:#14231A;display:flex;align-items:center;justify-content:center`)} className="yp-hoed9d05 yp-ac3e8255">
                  {(V.filmPlaying) ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#D9EA6E">
                        <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                        <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                      </svg>
                    </>
                  ) : null}
                  {(V.filmPaused) ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#D9EA6E" style={s(`margin-left:2px`)}><path d="M7 4.5 L19 12 L7 19.5 Z"></path></svg>
                    </>
                  ) : null}
                </button>
                <input type="range" min="0" max="36" step="0.05" ref={V.filmSeekRef} onInput={V.seekFilm} onChange={V.seekFilm} style={s(`flex:1;min-width:0`)} aria-label="Scrub the film" />
                <span ref={V.filmTimeRef} style={s(`flex:none;font:500 11px 'DM Mono',monospace;color:rgba(20,35,26,.66)`)}>0:00 / 0:36</span>
              </div>
              <span style={s(`position:relative;z-index:1;font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>A real chapter, silent here. Drag to scrub.</span>
            </div>
          </div>
        </div>
      </section>
      <section id="privacy" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`margin:0 calc(-1 * clamp(0px,2.6vw,32px));padding:clamp(32px,5vw,64px);border-radius:36px 24px 34px 22px / 24px 36px 22px 34px;background:radial-gradient(60% 90% at 6% 0%,rgba(217,234,110,.17) 0%,rgba(217,234,110,.05) 45%,rgba(217,234,110,0) 72%),linear-gradient(165deg,#1C3826,#142A1C 72%);box-shadow:inset 0 1px 0 rgba(234,247,155,.12),0 18px 44px rgba(0,0,0,.28);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(40px,5vw,72px);align-items:center`)}>
            <div style={s(`min-width:0`)}>
              <h2 style={s(`margin:0;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Theirs. <span className="nrm-mark nrm-mark-dark">Only theirs</span>.</h2>
              <p style={s(`margin:18px 0 0;max-width:32em;font:400 17px/1.65 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                Nobody where someone works can read their check-in answers, reflections or recordings. Answers become a group figure before anything reaches a dashboard, and groups below five never appear.
              </p>
              <ul style={s(`list-style:none;margin:28px 0 0;padding:0`)}>
                <li style={s(`display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0;border-top:1px solid rgba(228,240,214,.1)`)}>
                  <span style={s(`display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                    <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#F6F4E9`)}>Their five pillar scores</span>
                    <span style={s(`font:400 14.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.82)`)}>Added to their team’s picture, with everyone else’s.</span>
                  </span>
                  <span style={s(`flex:none;padding:6px 12px;border-radius:999px;background:rgba(217,234,110,.16);font:600 12.5px 'DM Sans',sans-serif;color:#EAF79B`)}>Group signal</span>
                </li>
                <li style={s(`display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0;border-top:1px solid rgba(228,240,214,.1)`)}>
                  <span style={s(`display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                    <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#F6F4E9`)}>Themes from their reflections</span>
                    <span style={s(`font:400 14.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.82)`)}>Counted across the organisation, never quoted.</span>
                  </span>
                  <span style={s(`flex:none;padding:6px 12px;border-radius:999px;background:rgba(217,234,110,.16);font:600 12.5px 'DM Sans',sans-serif;color:#EAF79B`)}>Group signal</span>
                </li>
                <li style={s(`display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0;border-top:1px solid rgba(228,240,214,.1)`)}>
                  <span style={s(`display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                    <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#F6F4E9`)}>Their words, their voice, their habits</span>
                    <span style={s(`font:400 14.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.82)`)}>Stay on their device and in their account.</span>
                  </span>
                  <span style={s(`flex:none;padding:6px 12px;border-radius:999px;background:rgba(228,240,214,.08);font:600 12.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>Never</span>
                </li>
              </ul>
            </div>
            <div style={s(`display:flex;justify-content:center`)}>
              <div style={s(`position:relative;width:min(400px,100%);padding:clamp(8px,2vw,24px) 0`)}>
                <div aria-hidden="true" style={s(`position:absolute;left:4%;right:4%;top:4%;bottom:4%;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.14),rgba(217,234,110,0));pointer-events:none`)}></div>
                <div style={s(`position:relative;padding:24px 24px 30px;border-radius:30px 22px 32px 20px / 22px 32px 20px 30px;background:linear-gradient(170deg,#FBFAF4,#F2F1E6 85%);border:1px solid rgba(20,35,26,.06);box-shadow:0 30px 60px -30px rgba(0,0,0,.6)`)}>
                  <div style={s(`display:flex;align-items:center;gap:12px`)}>
                    <img src="/assets/v5/people/laura-avatar.jpg" alt="" width="38" height="38" style={s(`display:block;flex:none;width:38px;height:38px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;object-fit:cover`)} />
                    <span style={s(`display:flex;flex-direction:column;gap:4px;min-width:0`)}>
                      <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#14231A`)}>Laura’s reflection</span>
                      <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(20,35,26,.5)`)}>TUE · 14 OCT</span>
                    </span>
                  </div>
                  <div style={s(`position:relative;margin-top:22px`)}>
                    <p aria-hidden="true" style={s(`margin:0;font:400 22px/1.34 'DM Serif Display',serif;letter-spacing:-.2px;color:rgba(20,35,26,.72);filter:blur(6px);user-select:none`)}>
                      I keep saying yes to the late calls, and by the weekend I’m too tired to see anyone. I miss the Thursday dinners more than I let on.
                    </p>
                    <div style={s(`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px`)}>
                      <span style={s(`width:56px;height:56px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.55);box-shadow:0 0 32px rgba(217,234,110,.5);display:flex;align-items:center;justify-content:center;color:#2E4A1C`)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                          <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"></path>
                        </svg>
                      </span>
                      <span style={s(`padding:7px 14px;border-radius:999px;background:rgba(15,32,21,.72);font:600 13px 'DM Sans',sans-serif;color:#F6F4E9`)}>Only Laura can read this</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(88px,11vw,152px);padding-bottom:clamp(72px,9vw,120px)`)}>
          <div style={s(`position:relative;max-width:620px;margin:0 auto;box-sizing:border-box;padding:clamp(72px,9vw,120px) clamp(24px,5vw,64px) clamp(52px,6vw,80px);text-align:center`)}>
            <div aria-hidden="true" style={s(`position:absolute;inset:0;border-radius:310px 310px 32px 26px / 310px 310px 32px 26px;background:radial-gradient(62% 40% at 50% 16%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 50%,#ECE8D7 100%)`)}></div>
            <div style={s(`position:relative`)}>
              <img src="/assets/v5/norma-happy.png" alt="" width="92" height="124" style={s(`display:block;margin:0 auto;filter:drop-shadow(0 0 1px rgba(20,35,26,.7)) drop-shadow(0 14px 20px rgba(20,35,26,.16))`)} />
              <h2 style={s(`margin:26px auto 0;max-width:11em;font:400 clamp(40px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;text-wrap:balance`)}>Give your people a place that’s theirs.</h2>
              <p style={s(`margin:20px auto 0;max-width:24em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>nørma goes with them, following their growth and supporting them along the way.</p>
              <div style={s(`display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:34px`)}>
                <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 28px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="yp-ac3e8255">Book a demo</a>
                <a href="/for-leaders/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 24px;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif`)} className="yp-ho3cfe08 yp-ac3e8255">
                  See what leaders see
                  <span aria-hidden="true">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer style={s(`border-top:1px solid rgba(20,35,26,.1)`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:36px;padding-bottom:40px;display:flex;flex-direction:column;gap:28px`)}>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px`)}>
            <a href="/" style={s(`display:flex;align-items:center;gap:10px;color:#14231A`)}>
              <img src="/assets/v5/norma-icon.png" alt="" width="26" height="26" style={s(`display:block;border-radius:8px`)} />
              <span style={s(`font:400 20px/1 'DM Serif Display',serif`)}>nørma</span>
            </a>
            <nav style={s(`display:flex;flex-wrap:wrap;gap:12px 28px;font:500 14px 'DM Sans',sans-serif`)}>
              <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">Your people</a>
              <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">For leaders</a>
              <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">ROI</a>
              <a href="/our-story/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">Our story</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">Help</a>
              <a href="/book-a-demo/" style={s(`color:rgba(20,35,26,.72)`)} className="yp-ho789e87">Book a demo</a>
            </nav>
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(20,35,26,.08);font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>
            <span>© 2026 The Artistry of Humanity Pty Ltd</span>
            <span style={s(`display:flex;flex-wrap:wrap;gap:20px`)}>
              <a href="/privacy/" style={s(`color:rgba(20,35,26,.66)`)} className="yp-ho789e87">Privacy policy</a>
              <a href="/terms/" style={s(`color:rgba(20,35,26,.66)`)} className="yp-ho789e87">Terms of use</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.66)`)} className="yp-ho789e87">Help centre</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
      </>
    );
  }
}

export default YourPeople;
