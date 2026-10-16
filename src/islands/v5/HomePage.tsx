// @ts-nocheck
/* Generated from the design handoff (design_handoff_v5/reference) by dc2jsx.
   Markup and styles are verbatim from the reference; logic is the reference's
   own renderVals/state code. Edit the reference and regenerate rather than
   hand-tuning values here. */
import React from 'react';
import { s } from '../../lib/s';
import './HomePage.dc.css';
import Phone from './Phone';

class HomePage extends React.Component {
  state = { narrow: false, roomy: true, menu: false, screen: 'film', picked: false, srcOpen: false };
  rootRef = React.createRef(); viewRef = React.createRef(); trackRef = React.createRef();
  searchRef = React.createRef(); beamRef = React.createRef(); revealRef = React.createRef();
  lightsRef = React.createRef(); glowRef = React.createRef();
  peekRef = React.createRef(); stepsRef = React.createRef(); linkRef = React.createRef(); needleRef = React.createRef();
  phoneColRef = React.createRef();

  MOMENTS = [
    { kind: 'isText', cost: 'Absenteeism', title: 'The 7 am text.', line: 'One unplanned day costs about $520.' },
    { kind: 'isChat', cost: 'Presenteeism', title: 'The “all good” that isn’t.', line: 'At work, not really there.' },
    { kind: 'isMail', cost: 'Turnover', title: 'The resignation nobody saw coming.', line: 'Replacing one person: about half a year’s salary.' },
    { kind: 'isCal', cost: 'Absenteeism', title: 'The third Monday this month.', line: 'Nine days a person a year, on average.' },
    { kind: 'isMeet', cost: 'Presenteeism', title: 'The meeting where nobody says what they think.', line: 'The idea nobody raises.' },
    { kind: 'isExit', cost: 'Turnover', title: 'The exit interview.', line: 'You only hear it on the way out.' },
  ];
  TILES = [
    { n: 'Chris', i: 'C', c: '#9FD6AB', mute: false, ring: '0 0 0 2px #8AB4F8' },
    { n: 'Priya', i: 'P', c: '#B9B2E8', mute: true, ring: 'none' },
    { n: 'Tom', i: 'T', c: '#F0BDB5', mute: true, ring: 'none' },
    { n: 'Sam', i: 'S', c: '#F2DAAC', mute: true, ring: 'none' },
    { n: 'Jordan', i: 'J', c: '#AAD7E3', mute: true, ring: 'none' },
    { n: 'Ana', i: 'A', c: '#DCEC85', mute: true, ring: 'none' },
  ];
  SHAPES = ['28px 18px 30px 16px / 18px 30px 16px 28px', '18px 30px 16px 28px / 30px 18px 28px 16px', '24px 16px 20px 30px / 16px 26px 30px 20px', '30px 22px 18px 24px / 22px 18px 26px 30px'];
  CHIPS = ['18px 12px 16px 10px / 12px 16px 10px 18px', '12px 18px 10px 16px / 18px 10px 16px 12px', '16px 10px 18px 12px / 10px 18px 12px 16px', '10px 16px 12px 18px / 16px 12px 18px 10px'];
  ORDER = [{ k: 'film', label: 'Growth journey' }, { k: 'home', label: 'Home' }, { k: 'reflect', label: 'Reflect' }, { k: 'reset', label: 'Reset' }, { k: 'gratitude', label: 'Gratitude' }];

  motionOn() { return (this.props.ambientMotion ?? true) && !this.reduced; }

  componentDidMount() {
    this.reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.onResize = () => { const n = window.innerWidth < 760, r = window.innerWidth >= 1100; if (n !== this.state.narrow || r !== this.state.roomy) this.setState({ narrow: n, roomy: r, menu: n ? this.state.menu : false }); };
    window.addEventListener('resize', this.onResize); this.onResize();
    this.vis = new Map();
    this.io = new IntersectionObserver(es => es.forEach(e => this.vis.set(e.target, e.isIntersecting)), { threshold: 0.12 });
    this.fitted = new WeakSet();
    this.ro = new ResizeObserver(es => es.forEach(e => this.fit(e.target)));
    this.observeFits();
    this.initCarousel(); this.initBeam(); this.initLights(); this.initPeek(); this.initLink(); this.initNeedle();
    if (this.phoneColRef.current) this.io.observe(this.phoneColRef.current);
    this.cycle = setInterval(() => this.autoNext(), 4200);
  }
  componentDidUpdate() { this.observeFits(); }
  componentWillUnmount() { if (this.needleRaf) cancelAnimationFrame(this.needleRaf); if (this.onNeedle) { document.removeEventListener('scroll', this.onNeedle, true); window.removeEventListener('resize', this.onNeedle); } if (this.roL) this.roL.disconnect(); if (this.ioL) this.ioL.disconnect(); if (this.placeLink) window.removeEventListener('resize', this.placeLink);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('scroll', this.onScroll, true);
    window.removeEventListener('pointermove', this.onPM); window.removeEventListener('pointerup', this.onPU); window.removeEventListener('pointercancel', this.onPU);
    cancelAnimationFrame(this.rafC); cancelAnimationFrame(this.rafB); clearInterval(this.cycle);
    this.io && this.io.disconnect(); this.ro && this.ro.disconnect(); this.ioN && this.ioN.disconnect();
  }

  // Fixed-size product compositions scale to their column; the hero switches to a phone-first layout when narrow.
  observeFits() {
    const root = this.rootRef.current; if (!root || !this.ro) return;
    root.querySelectorAll('[data-fit]').forEach(el => { const w = el.parentElement; if (!this.fitted.has(w)) { this.fitted.add(w); this.ro.observe(w); } this.fit(w); });
  }
  fit(wrap) {
    const el = wrap.querySelector('[data-fit]'); if (!el) return;
    const W = wrap.clientWidth; if (!W) return;
    const hero = el.hasAttribute('data-compact'); const compact = hero && W < 560;
    let [w, h] = el.getAttribute('data-fit').split('x').map(Number);
    if (compact) { w = 400; h = 520; }
    if (hero) this.layoutHero(el, compact);
    const swipe = !hero && W < 720;
    const s = swipe ? 0.6 : Math.min(1, W / w);
    wrap.style.overflowX = swipe ? 'auto' : ''; wrap.style.overflowY = swipe ? 'hidden' : '';
    wrap.style.webkitOverflowScrolling = 'touch'; wrap.style.overscrollBehaviorX = 'contain';
    el.style.width = w + 'px'; el.style.height = h + 'px';
    el.style.transform = 'scale(' + s + ')';
    el.style.left = Math.max(0, (W - w * s) / 2) + 'px';
    wrap.style.height = (h * s) + 'px';
  }
  layoutHero(el, compact) {
    const d = el.querySelector('[data-hero-dash]'), p = el.querySelector('[data-hero-phone]'), a = el.querySelector('[data-hero-arch]');
    const set = (n, o) => { if (n) Object.assign(n.style, o); };
    if (compact) {
      set(a, { left: '40px', top: '0px', width: '320px', height: '520px', borderRadius: '160px 160px 26px 22px / 160px 160px 26px 22px' });
      set(d, { left: '0px', top: '34px', transform: 'scale(.64)' });
      set(p, { left: '204px', top: '120px', transform: 'scale(.62)' });
    } else {
      set(a, { left: '120px', top: '0px', width: '480px', height: '560px', borderRadius: '240px 240px 30px 24px / 240px 240px 30px 24px' });
      set(d, { left: '0px', top: '70px', transform: 'none' });
      set(p, { left: '520px', top: '140px', transform: 'scale(.655)' });
    }
  }

  // Moments: one set rendered twice; the offset wraps by one set width, so it only ever rolls forward.
  initCarousel() {
    const view = this.viewRef.current, track = this.trackRef.current; if (!view || !track) return;
    const c = this.car = { off: 0, anim: null, drag: null, hover: false, focus: false, last: performance.now(), resumeAt: 0 };
    this.io.observe(view);
    const n = this.MOMENTS.length;
    this.carStep = () => { const s = track.querySelectorAll('[data-slide]'); if (s.length < 2) return 0; return s[1].getBoundingClientRect().left - s[0].getBoundingClientRect().left; };
    view.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') c.hover = true; });
    view.addEventListener('pointerleave', () => { c.hover = false; });
    view.addEventListener('focusin', () => { c.focus = true; });
    view.addEventListener('focusout', () => { c.focus = false; });
    view.addEventListener('keydown', e => { if (e.key === 'ArrowRight') this.nudge(1); if (e.key === 'ArrowLeft') this.nudge(-1); });
    view.addEventListener('pointerdown', e => { if (e.button !== 0) return; c.drag = { x: e.clientX, off: c.off, moved: false, id: e.pointerId }; c.anim = null; });
    this.onPM = e => { const d = c.drag; if (!d || e.pointerId !== d.id) return; const dx = e.clientX - d.x; if (!d.moved && Math.abs(dx) > 6) { d.moved = true; view.style.cursor = 'grabbing'; } if (d.moved) c.off = d.off - dx; };
    this.onPU = () => { if (c.drag) { c.drag = null; view.style.cursor = 'grab'; c.resumeAt = performance.now() + 2500; } };
    window.addEventListener('pointermove', this.onPM); window.addEventListener('pointerup', this.onPU); window.addEventListener('pointercancel', this.onPU);
    const tick = now => {
      const dt = Math.min(50, now - c.last); c.last = now;
      const st = this.carStep(), W = st * n;
      if (W > 0) {
        if (c.anim) { const p = Math.min(1, (now - c.anim.t0) / 900), e = 1 - Math.pow(1 - p, 3); c.off = c.anim.from + (c.anim.to - c.anim.from) * e; if (p >= 1) c.anim = null; }
        else if (!c.drag && !c.hover && !c.focus && this.vis.get(view) && this.motionOn() && now > c.resumeAt) c.off += dt * 0.034;
        if (c.off >= W) { c.off -= W; if (c.anim) { c.anim.from -= W; c.anim.to -= W; } if (c.drag) c.drag.off -= W; }
        if (c.off < 0) { c.off += W; if (c.anim) { c.anim.from += W; c.anim.to += W; } if (c.drag) c.drag.off += W; }
        track.style.transform = 'translate3d(' + (-c.off).toFixed(2) + 'px,0,0)';
      }
      this.rafC = requestAnimationFrame(tick);
    };
    this.rafC = requestAnimationFrame(tick);
  }
  nudge(dir) {
    const c = this.car; if (!c) return; const st = this.carStep(); if (!st) return;
    const now = performance.now(), base = c.anim ? c.anim.to : c.off;
    const to = dir > 0 ? (Math.floor(base / st + 0.001) + 1) * st : (Math.ceil(base / st - 0.001) - 1) * st;
    c.anim = { from: c.off, to, t0: now }; c.resumeAt = now + 5000;
  }

  // Flashlight: drifts on its own, follows the pointer on a desktop, and reveals what was always there.
  initBeam() {
    const sec = this.searchRef.current, beam = this.beamRef.current, rev = this.revealRef.current; if (!sec || !beam) return;
    const b = { x: null, y: null, px: 0, py: 0, pt: -1e9, t0: performance.now() };
    this.io.observe(sec);
    sec.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const r = sec.getBoundingClientRect(); b.px = e.clientX - r.left; b.py = e.clientY - r.top; b.pt = performance.now(); });
    const tick = now => {
      if (this.vis.get(sec) !== false) {
        const w = sec.clientWidth, h = sec.clientHeight, t = (now - b.t0) / 1000;
        let tx, ty;
        if (now - b.pt < 2200 && !this.reduced) { tx = b.px; ty = b.py; }
        else if (this.motionOn()) { tx = w * (0.5 + 0.36 * Math.sin(t * 0.21)); ty = h * (0.5 + 0.32 * Math.sin(t * 0.34 + 1.1)); }
        else { tx = w * 0.3; ty = h * 0.45; }
        if (b.x === null) { b.x = tx; b.y = ty; }
        const k = this.motionOn() ? 0.05 : 1;
        b.x += (tx - b.x) * k; b.y += (ty - b.y) * k;
        beam.style.transform = 'translate3d(' + b.x.toFixed(1) + 'px,' + b.y.toFixed(1) + 'px,0) translate(-50%,-50%)';
        if (rev) { rev.style.setProperty('--x', b.x.toFixed(1) + 'px'); rev.style.setProperty('--y', b.y.toFixed(1) + 'px'); }
      }
      this.rafB = requestAnimationFrame(tick);
    };
    this.rafB = requestAnimationFrame(tick);
  }

  // Lights on: arriving from the dark section, this one switches from dark to cream. Starts lit if you never scroll to it.
  initLights() {
    const s = this.lightsRef.current, g = this.glowRef.current; if (!s) return;
    this.lit = true; this.armed = false;
    const setLit = on => {
      this.lit = on;
      s.style.backgroundColor = on ? '#F4F2E6' : '#0D1B12'; s.style.color = on ? '#14231A' : '#F4F2E6';
      if (g) { g.style.opacity = on ? '1' : '0'; g.style.transform = on ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(.5)'; }
    };
    this.onScroll = () => {
      const r = s.getBoundingClientRect(), vh = window.innerHeight;
      if (!this.armed) {
        if ((this.props.lightsSwitch ?? true) && !this.reduced && r.top > vh * 0.9) { this.armed = true; s.style.transition = 'none'; if (g) g.style.transition = 'none'; setLit(false); s.offsetHeight; s.style.transition = ''; if (g) g.style.transition = ''; }
        else { document.removeEventListener('scroll', this.onScroll, true); return; }
      }
      if (!this.lit && r.top < vh * 0.6) { setLit(true); document.removeEventListener('scroll', this.onScroll, true); }
    };
    document.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
  }

  // A lime line runs behind the three steps, left to right (top to bottom when stacked).
  initLink() {
    const ol = this.stepsRef.current, svg = this.linkRef.current; if (!ol || !svg) return;
    const P = k => svg.querySelector('[data-l="' + k + '"]');
    this.placeLink = () => {
      const cards = [...ol.children].filter(n => n.tagName === 'LI').map(li => li.children[1]); if (cards.length < 3) return;
      const stacked = ol.parentElement.clientWidth < 720;
      ol.style.gridTemplateColumns = stacked ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))';
      ol.style.paddingLeft = stacked ? '30px' : '0px';
      const o = ol.getBoundingClientRect(), r = cards.map(c => c.getBoundingClientRect());
      let x, y, w, h, d;
      if (!stacked) {
        x = -o.left; w = document.documentElement.clientWidth; h = 140; y = r[0].top - o.top + r[0].height * 0.5 - h / 2;
        const c = r.map(q => q.left + q.width / 2 - o.left - x), m = h / 2;
        d = 'M0 ' + (m + 34) + ' C' + (c[0] * 0.5) + ' ' + (m + 34) + ' ' + (c[0] - 90) + ' ' + (m + 8) + ' ' + c[0] + ' ' + m
          + ' S' + (c[1] - 90) + ' ' + (m - 26) + ' ' + c[1] + ' ' + m
          + ' S' + (c[2] - 90) + ' ' + (m + 26) + ' ' + c[2] + ' ' + m
          + ' S' + (w - 60) + ' ' + (m - 40) + ' ' + w + ' ' + (m - 44);
      } else {
        x = 0; w = 30; y = r[0].top - o.top + Math.min(40, r[0].height * 0.2); h = r[2].top - o.top + r[2].height * 0.5 - y;
        d = 'M9 0 C9 ' + (h * 0.2) + ' 15 ' + (h * 0.3) + ' 9 ' + (h * 0.5) + ' S3 ' + (h * 0.8) + ' 9 ' + h;
      }
      Object.assign(svg.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      ['track', 'draw', 'pulse'].forEach(k => P(k).setAttribute('d', d));
    };
    this.placeLink();
    this.roL = new ResizeObserver(() => this.placeLink()); this.roL.observe(ol);
    window.addEventListener('resize', this.placeLink);
    if (!this.motionOn()) return;
    const draw = P('draw'), pulse = P('pulse');
    if (ol.getBoundingClientRect().top < window.innerHeight * 0.8) { this.startPulse(pulse); return; }
    draw.style.transition = 'none'; draw.setAttribute('stroke-dashoffset', '100');
    this.ioL = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return; this.ioL.disconnect();
      setTimeout(() => { draw.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.22,.61,.36,1)'; draw.setAttribute('stroke-dashoffset', '0'); setTimeout(() => this.startPulse(pulse), 2200); }, 500);
    }, { rootMargin: '0px 0px -25% 0px' });
    this.ioL.observe(ol);
  }
  // The Score needle swings as you scroll in and settles where it lands.
  initNeedle() {
    const g = this.needleRef.current; if (!g || !this.motionOn()) return;
    const svg = g.ownerSVGElement; let cur = null;
    const goal = () => { const r = svg.getBoundingClientRect(), vh = window.innerHeight; const q = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.65))); return -84 * Math.pow(1 - q, 1.15) * Math.cos(q * Math.PI * 3.5); };
    const tick = () => { const t = goal(); cur = cur == null ? t : cur + (t - cur) * 0.12; g.setAttribute('transform', 'rotate(' + cur.toFixed(2) + ' 320 320)'); this.needleRaf = Math.abs(t - cur) > 0.05 ? requestAnimationFrame(tick) : 0; };
    this.onNeedle = () => { if (!this.needleRaf) this.needleRaf = requestAnimationFrame(tick); };
    document.addEventListener('scroll', this.onNeedle, { passive: true, capture: true }); window.addEventListener('resize', this.onNeedle);
    tick();
  }
  startPulse(p) { p.setAttribute('stroke-dasharray', '7 93'); p.style.animation = 'nrmFlow 5.5s cubic-bezier(.45,0,.55,1) infinite'; }

  // nørma peeks over the card once, the first time it comes into view.
  initPeek() {
    const el = this.peekRef.current; if (!el || !this.motionOn()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const shown = el.style.transform, tr = el.style.transition;
    el.style.transition = 'none'; el.style.transform = 'translateY(56px) rotate(0deg)'; el.offsetHeight; el.style.transition = tr;
    this.ioN = new IntersectionObserver(es => { if (!es[0].isIntersecting) return; setTimeout(() => { el.style.transform = shown; }, 450); this.ioN.disconnect(); }, { rootMargin: '0px 0px -30% 0px' });
    this.ioN.observe(el.parentElement);
  }

  autoNext() {
    if (this.state.picked || !this.motionOn() || !this.vis.get(this.phoneColRef.current)) return;
    const i = this.ORDER.findIndex(o => o.k === this.state.screen);
    this.setState({ screen: this.ORDER[(i + 1) % this.ORDER.length].k });
  }

  renderVals() {
    const { narrow, menu, screen } = this.state;
    const moments = [...this.MOMENTS, ...this.MOMENTS].map((m, i) => ({
      ...m, hidden: i >= this.MOMENTS.length ? 'true' : 'false', r: this.SHAPES[i % 4],
      isText: m.kind === 'isText', isChat: m.kind === 'isChat', isMail: m.kind === 'isMail', isCal: m.kind === 'isCal', isMeet: m.kind === 'isMeet', isExit: m.kind === 'isExit',
      abs: m.cost === 'Absenteeism', pres: m.cost === 'Presenteeism', turn: m.cost === 'Turnover',
    }));
    const screens = this.ORDER.map((o, i) => ({ label: o.label, on: o.k === screen, off: o.k !== screen, r: this.CHIPS[i % 4], pick: () => this.setState({ screen: o.k, picked: true }) }));
    return {
      srcOpen: this.state.srcOpen, srcShow: () => this.setState({ srcOpen: true }), srcHide: () => this.setState({ srcOpen: false }), srcToggle: () => this.setState(s => ({ srcOpen: !s.srcOpen })),
      rootRef: this.rootRef, viewRef: this.viewRef, trackRef: this.trackRef, searchRef: this.searchRef, beamRef: this.beamRef, revealRef: this.revealRef,
      lightsRef: this.lightsRef, glowRef: this.glowRef, peekRef: this.peekRef, needleRef: this.needleRef, stepsRef: this.stepsRef, linkRef: this.linkRef, phoneColRef: this.phoneColRef,
      wide: !narrow, narrow, roomy: this.state.roomy, menuOpen: narrow && menu,
      toggleMenu: () => this.setState(s => ({ menu: !s.menu })),
      doorway: (this.props.heroStage ?? 'Doorway') === 'Doorway',
      moments, tiles: this.TILES,
      prevMoment: () => this.nudge(-1), nextMoment: () => this.nudge(1),
      screens, phoneScreen: screen,
    };
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
                  <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">Your people</a>
                  <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">For leaders</a>
                  <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">ROI</a>
                  <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">Help</a>
                </nav>
              </>
            ) : null}
            <div style={s(`display:flex;align-items:center;gap:10px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:44px;padding:0 16px;white-space:nowrap;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px rgba(217,234,110,.22)`)} className="hm-ac3e8255">Book a demo</a>
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
              <a href="/help/" style={s(`padding:12px 0;color:#14231A`)}>Help</a>
            </nav>
          </>
        ) : null}
      </header>
      <section style={s(`position:relative`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(72px,9vw,128px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,5vw,64px)`)}>
          <div style={s(`flex:1 1 340px;min-width:0;max-width:540px`)}>
            <h1 style={s(`margin:0;font:400 clamp(44px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance`)}>Nobody leaves their life at the door.</h1>
            <p style={s(`margin:28px 0 0;max-width:27em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
              nørma is an app for your people and a dashboard for you. They see where their life is at. You see where your culture is at, and what to do about it.
            </p>
            <div style={s(`display:flex;flex-wrap:wrap;gap:12px;margin-top:36px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 24px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="hm-ac3e8255">Book a demo</a>
              <a href="#dark" style={s(`display:inline-flex;align-items:center;height:54px;box-sizing:border-box;padding:0 24px;border-radius:999px;border:1px solid rgba(20,35,26,.2);color:#14231A;font:600 15.5px 'DM Sans',sans-serif`)} className="hm-ho2976a3">See why it matters</a>
            </div>
          </div>
          <div style={s(`flex:1.6 1 420px;min-width:0;position:relative;height:560px`)}>
            <div data-fit="710x560" data-compact="" style={s(`position:absolute;left:0;top:0;width:710px;height:560px;transform-origin:0 0`)}>
              {(V.doorway) ? (
                <>
                  <div data-hero-arch="" aria-hidden="true" style={s(`position:absolute;left:120px;top:0;width:480px;height:560px;border-radius:240px 240px 30px 24px / 240px 240px 30px 24px;background:radial-gradient(64% 40% at 50% 14%,rgba(217,234,110,.55) 0%,rgba(217,234,110,.16) 52%,rgba(217,234,110,0) 80%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 46%,rgba(236,232,215,.6) 78%,rgba(236,232,215,0) 100%)`)}></div>
                </>
              ) : null}
              <div data-hero-dash="" style={s(`position:absolute;left:0;top:70px;width:560px;height:408px;transform-origin:0 0;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;overflow:hidden;background:#0A140D;box-shadow:0 46px 90px -34px rgba(20,35,26,.6),0 0 0 1px rgba(20,35,26,.12)`)}>
                <img src="/assets/v5/dash-home.webp" alt="The nørma leader dashboard for Northwind: nørma Score 6.5, Fulfilment 61, Culture 68, a focus area and every department" width="560" height="408" style={s(`display:block;width:100%;height:100%;object-fit:cover;object-position:0 0`)} />
              </div>
              <div data-hero-phone="" style={s(`position:absolute;left:520px;top:140px;width:290px;height:628px;transform:scale(.655);transform-origin:0 0`)}><Phone screen="home" onLight={true} /></div>
            </div>
          </div>
        </div>
      </section>
      <section id="dark" style={s(`position:relative;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;left:-10%;top:-30%;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.06),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(72px,9vw,128px)`)}>
          <h2 style={s(`margin:0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Somewhere in your organisation, this is happening today.</h2>
        </div>
        <div ref={V.viewRef} tabIndex="0" aria-label="Moments, drag or use the arrows" style={s(`position:relative;margin-top:clamp(52px,7vw,88px);overflow:hidden;touch-action:pan-y;user-select:none;-webkit-user-select:none;cursor:grab;outline:none;-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,0) 0,#000 6%,#000 94%,rgba(0,0,0,0) 100%);mask-image:linear-gradient(90deg,rgba(0,0,0,0) 0,#000 6%,#000 94%,rgba(0,0,0,0) 100%)`)}>
          <div ref={V.trackRef} style={s(`display:flex;gap:clamp(20px,2.4vw,32px);width:max-content;padding-left:clamp(20px,5vw,48px);will-change:transform`)}>
            {(V.moments || []).map((m, $index) => (
              <React.Fragment key={$index}>
                <figure data-slide="" aria-hidden={m.hidden} style={s(`flex:none;width:clamp(286px,31vw,420px);margin:0;display:flex;flex-direction:column;gap:22px`)}>
                  <div style={s(`position:relative;height:clamp(300px,26vw,340px);border-radius:${m.r ?? ''};overflow:hidden;box-sizing:border-box;background:linear-gradient(180deg,#F4F2E6 0%,#E8E4D1 100%);box-shadow:0 40px 70px -40px rgba(0,0,0,.75);color:#14231A`)}>
                    <span style={s(`position:absolute;z-index:3;left:16px;top:16px;display:inline-flex;align-items:center;gap:9px;font:600 12.5px 'DM Sans',sans-serif;color:#14231A`)}>
                      <span style={s(`width:30px;height:30px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#14231A;display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                        {(m.abs) ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M4 6.5h16v13H4z"></path>
                              <path d="M8 4v5M16 4v5M4 10.5h16"></path>
                              <path d="M10 13.5l4 4M14 13.5l-4 4"></path>
                            </svg>
                          </>
                        ) : null}
                        {(m.pres) ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 8h12.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 5 8z"></path>
                              <path d="M21 11v2"></path>
                              <path d="M6.5 10.5v3"></path>
                            </svg>
                          </>
                        ) : null}
                        {(m.turn) ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M13 4H6v16h7"></path>
                              <path d="M10 12h10"></path>
                              <path d="M17 9l3 3-3 3"></path>
                            </svg>
                          </>
                        ) : null}
                      </span>
                      {m.cost}
                    </span>
                    {(m.isText) ? (
                      <>
                        <div style={s(`position:absolute;left:50%;top:60px;width:252px;height:440px;margin-left:-126px;box-sizing:border-box;padding:6px;border-radius:46px;background:#1B1D1C;box-shadow:0 0 0 1.5px #3A3D3B,0 30px 60px -24px rgba(20,35,26,.55)`)}>
                          <div style={s(`position:relative;height:100%;border-radius:40px;overflow:hidden;background:radial-gradient(90% 55% at 25% 8%,rgba(160,190,140,.55) 0%,rgba(160,190,140,0) 70%),linear-gradient(170deg,#2B4634 0%,#55745A 48%,#C8C5A4 100%);color:#FBFAF5`)}>
                            <span style={s(`position:absolute;left:50%;top:10px;width:84px;height:24px;margin-left:-42px;border-radius:999px;background:#0B0C0C`)}></span>
                            <div style={s(`position:absolute;left:0;right:0;top:48px;text-align:center`)}>
                              <div style={s(`font:600 14px/1.2 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;opacity:.92`)}>Tuesday 14 October</div>
                              <div style={s(`margin-top:2px;font:600 66px/1 -apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Helvetica,sans-serif;letter-spacing:-1.5px;font-variant-numeric:tabular-nums`)}>7:12</div>
                            </div>
                            <div style={s(`position:absolute;left:9px;right:9px;top:146px;display:flex;gap:10px;align-items:flex-start;padding:10px 12px 11px 10px;border-radius:20px;background:rgba(246,245,240,.74);backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);color:#1C1C1E`)}>
                              <span style={s(`flex:none;width:34px;height:34px;border-radius:9px;background:linear-gradient(180deg,#6CE57E,#2DBE47);display:flex;align-items:center;justify-content:center`)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M12 4C7 4 3 7.2 3 11.2c0 2.3 1.3 4.3 3.4 5.6-.2 1.2-.8 2.3-1.7 3.1 1.8-.1 3.5-.8 4.7-1.9.8.2 1.7.3 2.6.3 5 0 9-3.2 9-7.1S17 4 12 4z" fill="#FBFAF5"></path>
                                </svg>
                              </span>
                              <span style={s(`flex:1;min-width:0`)}>
                                <span style={s(`display:flex;justify-content:space-between;gap:8px`)}>
                                  <span style={s(`font:600 14px/1.25 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif`)}>Sam</span>
                                  <span style={s(`font:400 12.5px/1.25 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:rgba(60,60,67,.62)`)}>now</span>
                                </span>
                                {' '}
                                <span style={s(`display:block;margin-top:1px;font:400 14px/1.3 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>Morning. Not feeling great, won’t make it in today. Sorry 🤒</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {(m.isChat) ? (
                      <>
                        <div style={s(`position:absolute;left:20px;right:20px;top:60px;bottom:-1px;max-width:320px;margin:0 auto;box-sizing:border-box;overflow:hidden;box-shadow:0 0 0 1px rgba(20,35,26,.08),0 24px 50px -24px rgba(20,35,26,.45);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;display:flex;flex-direction:column;border-radius:20px 20px 0 0;background:#EFEAE2`)}>
                          <div style={s(`flex:none;display:flex;align-items:center;gap:9px;padding:9px 12px;background:#F7F6F2;border-bottom:1px solid rgba(20,35,26,.08)`)}>
                            <span style={s(`font:400 24px/1 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E;margin-top:-3px`)}>‹</span>
                            <span style={s(`width:32px;height:32px;border-radius:50%;background:#AAD7E3;display:flex;align-items:center;justify-content:center;font:600 13px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#14231A`)}>C</span>
                            <span style={s(`display:flex;flex-direction:column;gap:1px`)}>
                              <span style={s(`font:600 14.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#111B21`)}>Chris</span>
                              <span style={s(`font:400 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#667781`)}>online</span>
                            </span>
                          </div>
                          <div style={s(`flex:1;display:flex;flex-direction:column;gap:6px;padding:12px`)}>
                            <span style={s(`align-self:center;padding:3px 9px;border-radius:7px;background:#FCFBF6;font:500 11px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#54656F;box-shadow:0 1px .5px rgba(11,20,26,.13)`)}>Today</span>
                            <span style={s(`align-self:flex-start;max-width:82%;padding:6px 8px 6px 9px;border-radius:2px 10px 10px 10px;background:#FCFBF6;box-shadow:0 1px .5px rgba(11,20,26,.13);font:400 14.5px/1.3 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#111B21`)}>
                              You good? You seemed a bit off today
                              <span style={s(`margin-left:6px;font:400 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#667781;vertical-align:-3px;white-space:nowrap`)}>10:41</span>
                            </span>
                            <span style={s(`align-self:flex-end;display:inline-flex;align-items:center;gap:5px;padding:6px 8px 6px 9px;border-radius:10px 2px 10px 10px;background:#D9FDD3;box-shadow:0 1px .5px rgba(11,20,26,.13);font:italic 400 13.5px/1.3 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#667781`)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="8.5"></circle>
                                <path d="M6 18L18 6"></path>
                              </svg>
                              You deleted this message
                              <span style={s(`margin-left:6px;font:400 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#667781;vertical-align:-3px;white-space:nowrap`)}>10:44</span>
                            </span>
                            <span style={s(`align-self:flex-end;padding:6px 8px 6px 9px;border-radius:10px 2px 10px 10px;background:#D9FDD3;box-shadow:0 1px .5px rgba(11,20,26,.13);font:400 14.5px/1.3 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#111B21`)}>
                              All good 👍
                              <span style={s(`margin-left:6px;font:400 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#667781;vertical-align:-3px;white-space:nowrap`)}>
                                10:44
                                <svg width="15" height="10" viewBox="0 0 16 11" style={s(`margin-left:3px;vertical-align:-1px`)} aria-hidden="true">
                                  <path d="M1 6l3 3 6-7.5M6.5 9l.8.7 6.2-8.2" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                              </span>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {(m.isMail) ? (
                      <>
                        <div style={s(`position:absolute;left:20px;right:20px;top:60px;bottom:-1px;max-width:320px;margin:0 auto;box-sizing:border-box;overflow:hidden;box-shadow:0 0 0 1px rgba(20,35,26,.08),0 24px 50px -24px rgba(20,35,26,.45);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;border-radius:16px 16px 0 0;background:#FCFBF6;color:#1C1C1E`)}>
                          <div style={s(`display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(60,60,67,.12);font:400 14px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#0A7AFF`)}>
                            <span>‹ Inbox</span>
                            <span style={s(`display:flex;gap:16px`)}>
                              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 7h15M9.5 7V5h5v2M6.5 7l1 12.5h9l1-12.5"></path></svg>
                              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M10 8L5 12.5l5 4.5"></path>
                                <path d="M5.5 12.5H14a5 5 0 0 1 5 5V19"></path>
                              </svg>
                            </span>
                          </div>
                          <div style={s(`display:flex;gap:10px;align-items:flex-start;padding:12px 14px 10px`)}>
                            <span style={s(`flex:none;width:36px;height:36px;border-radius:50%;background:linear-gradient(180deg,#A9AEB5,#858A91);display:flex;align-items:center;justify-content:center;font:600 13px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#FCFBF6`)}>JL</span>
                            <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:2px`)}>
                              <span style={s(`display:flex;justify-content:space-between;gap:8px`)}>
                                <span style={s(`font:600 14.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif`)}>Jordan Lee</span>
                                <span style={s(`font:400 12.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>9:04 am</span>
                              </span>
                              <span style={s(`font:400 12.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>To: Chris Walsh</span>
                            </span>
                          </div>
                          <div style={s(`padding:2px 14px 0;font:700 18px/1.25 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>Resignation</div>
                          <div style={s(`padding:10px 14px 0;display:flex;flex-direction:column;gap:9px;font:400 13.5px/1.45 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#3A3A3C`)}>
                            <span>Hi Chris,</span>
                            <span>Please accept this email as formal notice of my resignation. My last day will be Friday 7 November.</span>
                            <span>Thank you for the opportunities over the</span>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {(m.isCal) ? (
                      <>
                        <div style={s(`position:absolute;left:20px;right:20px;top:60px;bottom:-1px;max-width:320px;margin:0 auto;box-sizing:border-box;overflow:hidden;box-shadow:0 0 0 1px rgba(20,35,26,.08),0 24px 50px -24px rgba(20,35,26,.45);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;padding:12px 12px 0;border-radius:16px 16px 0 0;background:#FCFBF6;color:#1C1C1E`)}>
                          <div style={s(`display:flex;align-items:baseline;justify-content:space-between;padding:0 2px`)}>
                            <span style={s(`font:700 20px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif`)}>October</span>
                            <span style={s(`font:400 13px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#E5483B`)}>Today</span>
                          </div>
                          <div style={s(`margin-top:8px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr))`)}>
                            <span style={s(`padding:0 0 5px 2px;font:600 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>M</span>
                            <span style={s(`padding:0 0 5px 2px;font:600 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>T</span>
                            <span style={s(`padding:0 0 5px 2px;font:600 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>W</span>
                            <span style={s(`padding:0 0 5px 2px;font:600 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>T</span>
                            <span style={s(`padding:0 0 5px 2px;font:600 10.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#8A8A8E`)}>F</span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>5</span>
                              <span style={s(`padding:2px 4px;border-radius:4px;background:rgba(255,149,0,.2);font:600 9.5px/1.2 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#A04F05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>Sam sick</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>6</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>7</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>8</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>9</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>12</span>
                              <span style={s(`padding:2px 4px;border-radius:4px;background:rgba(255,149,0,.2);font:600 9.5px/1.2 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#A04F05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>Sam sick</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>13</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>14</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>15</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>16</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`width:20px;height:20px;border-radius:50%;background:#E5483B;color:#FCFBF6;display:flex;align-items:center;justify-content:center;font:600 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif`)}>19</span>
                              <span style={s(`padding:2px 4px;border-radius:4px;background:rgba(255,149,0,.2);font:600 9.5px/1.2 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#A04F05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>Sam sick</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>20</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>21</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>22</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>23</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>26</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>27</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>28</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>29</span>
                            </span>
                            <span style={s(`height:48px;box-sizing:border-box;padding:3px 2px 0;border-top:1px solid rgba(60,60,67,.1);display:flex;flex-direction:column;gap:3px;min-width:0`)}>
                              <span style={s(`height:20px;display:flex;align-items:center;padding-left:2px;font:500 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#1C1C1E`)}>30</span>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {(m.isMeet) ? (
                      <>
                        <div style={s(`position:absolute;left:20px;right:20px;top:60px;bottom:-1px;max-width:320px;margin:0 auto;box-sizing:border-box;overflow:hidden;box-shadow:0 0 0 1px rgba(20,35,26,.08),0 24px 50px -24px rgba(20,35,26,.45);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;padding:8px 8px 0;display:flex;flex-direction:column;gap:7px;border-radius:16px 16px 0 0;background:#202124;color:#E8EAED;max-width:330px`)}>
                          <div style={s(`display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px`)}>
                            {(V.tiles || []).map((t, $index) => (
                              <React.Fragment key={$index}>
                                <span style={s(`position:relative;aspect-ratio:4/3;border-radius:8px;background:#3C4043;display:flex;align-items:center;justify-content:center;box-shadow:${t.ring ?? ''}`)}>
                                  <span style={s(`width:36%;aspect-ratio:1;border-radius:50%;background:${t.c ?? ''};display:flex;align-items:center;justify-content:center;font:500 13px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#14231A`)}>{t.i}</span>
                                  <span style={s(`position:absolute;left:6px;bottom:4px;font:500 9.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#E8EAED`)}>{t.n}</span>
                                  {(t.mute) ? (
                                    <>
                                      <span style={s(`position:absolute;right:4px;top:4px;width:17px;height:17px;border-radius:50%;background:rgba(32,33,36,.75);display:flex;align-items:center;justify-content:center;color:#E8EAED`)}>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                          <path d="M9 9v2a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.7"></path>
                                          <path d="M19 11a7 7 0 0 1-1.2 3.9M5 11a7 7 0 0 0 11.3 5.5"></path>
                                          <path d="M12 18v3"></path>
                                          <path d="M3 3l18 18"></path>
                                        </svg>
                                      </span>
                                    </>
                                  ) : null}
                                </span>
                              </React.Fragment>
                            ))}
                          </div>
                          <div style={s(`padding:7px 10px;border-radius:8px;background:rgba(0,0,0,.4);font:400 12.5px/1.35 -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#E8EAED`)}>
                            <span style={s(`font-weight:600`)}>Chris:</span>
                            {' '}So… any thoughts?
                          </div>
                          <div style={s(`display:flex;align-items:center;justify-content:center;gap:8px;padding:1px 0 10px`)}>
                            <span style={s(`width:30px;height:30px;border-radius:50%;background:#EA4335;display:flex;align-items:center;justify-content:center;color:#F1F3F4`)}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 9v2a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.7"></path>
                                <path d="M19 11a7 7 0 0 1-1.2 3.9M5 11a7 7 0 0 0 11.3 5.5"></path>
                                <path d="M12 18v3"></path>
                                <path d="M3 3l18 18"></path>
                              </svg>
                            </span>
                            <span style={s(`width:30px;height:30px;border-radius:50%;background:#EA4335;display:flex;align-items:center;justify-content:center;color:#F1F3F4`)}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 3l18 18"></path>
                                <path d="M15 10.5l5-3v9l-1.5-.9M15 15v1.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 5 6h1.5M10.5 6h3a1.5 1.5 0 0 1 1.5 1.5v3"></path>
                              </svg>
                            </span>
                            <span style={s(`width:30px;height:30px;border-radius:50%;background:#3C4043;display:flex;align-items:center;justify-content:center;color:#F1F3F4`)}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11M11 10V5a1.5 1.5 0 0 1 3 0v5M14 10V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.5a5.5 5.5 0 0 1-4.6-2.5L4 14.2a1.5 1.5 0 0 1 2.4-1.8L8 14"></path>
                              </svg>
                            </span>
                            <span style={s(`width:44px;height:30px;border-radius:999px;background:#EA4335;display:flex;align-items:center;justify-content:center;color:#F1F3F4`)}>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13.8c5-4.4 13-4.4 18 0l-1.9 2.6-3.6-1.4v-2.6c-2.3-.8-4.7-.8-7 0V15l-3.6 1.4z" fill="currentColor"></path></svg>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {(m.isExit) ? (
                      <>
                        <div style={s(`position:absolute;left:28px;right:28px;top:64px;bottom:-1px;max-width:300px;margin:0 auto;padding:18px 20px 0;box-sizing:border-box;border-radius:3px 3px 0 0;background:#FCFBF6;box-shadow:0 0 0 1px rgba(20,35,26,.08),0 24px 50px -24px rgba(20,35,26,.45);transform:rotate(-1.4deg);color:#1C1C1E`)}>
                          <div style={s(`display:flex;justify-content:space-between;align-items:baseline;padding-bottom:9px;border-bottom:1.5px solid #1C1C1E`)}>
                            <span style={s(`font:700 13px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif`)}>Exit interview</span>
                            <span style={s(`font:600 9px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;letter-spacing:1.2px;color:#8A8A8E`)}>CONFIDENTIAL</span>
                          </div>
                          <div style={s(`display:grid;grid-template-columns:auto minmax(0,1fr);gap:5px 14px;padding:9px 0;border-bottom:1px solid rgba(60,60,67,.14);font:400 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif`)}>
                            <span style={s(`color:#8A8A8E`)}>Name</span>
                            <span>Jordan Lee</span>
                            <span style={s(`color:#8A8A8E`)}>Tenure</span>
                            <span>2 years, 11 months</span>
                          </div>
                          <div style={s(`padding-top:10px;font:600 11.5px -apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Helvetica,sans-serif;color:#3A3A3C`)}>What made you decide to leave?</div>
                          <div style={s(`margin-top:6px;font:400 21px/1.27 'DM Serif Display',serif;letter-spacing:-.2px;color:#14231A;text-wrap:balance`)}>“It wasn’t one thing. It just built up.”</div>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <figcaption style={s(`display:flex;flex-direction:column;gap:6px;padding-right:8px`)}>
                    <span style={s(`font:400 22px/1.25 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9;text-wrap:pretty`)}>{m.title}</span>
                    <span style={s(`font:400 15px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.82);text-wrap:pretty`)}>{m.line}</span>
                  </figcaption>
                </figure>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-bottom:clamp(80px,10vw,136px)`)}>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 28px;margin-top:clamp(36px,4.5vw,56px)`)}>
            <div style={s(`display:flex;align-items:center;gap:10px`)}>
              <button type="button" onClick={V.prevMoment} aria-label="Previous moment" style={s(`width:44px;height:44px;border-radius:999px;border:1px solid rgba(228,240,214,.18);background:transparent;color:#F4F2E6;font:400 18px/1 'DM Sans',sans-serif;cursor:pointer;padding:0`)} className="hm-hob7451d hm-ac3e8255">‹</button>
              <button type="button" onClick={V.nextMoment} aria-label="Next moment" style={s(`width:44px;height:44px;border-radius:999px;border:1px solid rgba(228,240,214,.18);background:transparent;color:#F4F2E6;font:400 18px/1 'DM Sans',sans-serif;cursor:pointer;padding:0`)} className="hm-hob7451d hm-ac3e8255">›</button>
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;gap:12px 28px`)}>
              <span style={s(`display:inline-flex;align-items:center;gap:10px;font:500 14px 'DM Sans',sans-serif;color:rgba(244,242,230,.86)`)}>
                <span style={s(`width:32px;height:32px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.14);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6.5h16v13H4z"></path>
                    <path d="M8 4v5M16 4v5M4 10.5h16"></path>
                    <path d="M10 13.5l4 4M14 13.5l-4 4"></path>
                  </svg>
                </span>
                Absenteeism
              </span>
              <span style={s(`display:inline-flex;align-items:center;gap:10px;font:500 14px 'DM Sans',sans-serif;color:rgba(244,242,230,.86)`)}>
                <span style={s(`width:32px;height:32px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(217,234,110,.14);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 8h12.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 5 8z"></path>
                    <path d="M21 11v2"></path>
                    <path d="M6.5 10.5v3"></path>
                  </svg>
                </span>
                Presenteeism
              </span>
              <span style={s(`display:inline-flex;align-items:center;gap:10px;font:500 14px 'DM Sans',sans-serif;color:rgba(244,242,230,.86)`)}>
                <span style={s(`width:32px;height:32px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(217,234,110,.14);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13 4H6v16h7"></path>
                    <path d="M10 12h10"></path>
                    <path d="M17 9l3 3-3 3"></path>
                  </svg>
                </span>
                Turnover
              </span>
            </div>
          </div>
          <h3 style={s(`position:relative;margin:clamp(72px,9vw,120px) 0 0;max-width:19em;font:400 clamp(28px,3.2vw,40px)/1.12 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>
            For an organisation of 1,000 people, that adds up to about{' '}
            <span style={s(`color:#EAF79B`)}>$22 million a year.</span>
            <button type="button" aria-label="Sources" aria-describedby="cost-sources" onMouseEnter={V.srcShow} onMouseLeave={V.srcHide} onFocus={V.srcShow} onBlur={V.srcHide} onClick={V.srcShow} style={s(`display:inline-flex;align-items:center;justify-content:center;vertical-align:super;width:22px;height:22px;margin-left:6px;padding:0;border:0;border-radius:999px;background:transparent;color:rgba(201,212,194,.6);cursor:pointer`)} className="hm-ho18295a">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5"></circle>
                <path d="M12 11v5"></path>
                <path d="M12 7.8v.1"></path>
              </svg>
            </button>
            {(V.srcOpen) ? (
              <>
                <span role="tooltip" id="cost-sources" style={s(`position:absolute;left:0;top:calc(100% + 10px);z-index:5;width:min(320px,80vw);box-sizing:border-box;padding:12px 14px;border-radius:16px 12px 16px 10px / 12px 16px 10px 16px;background:#F4F2E6;color:#14231A;font:400 13px/1.5 'DM Sans',sans-serif;letter-spacing:0;box-shadow:0 18px 44px rgba(0,0,0,.28)`)}>All-industry benchmarks for 1,000 people on an average $100,000 salary: AHRI Work Outlook 2025–26, ABS, APSC.</span>
              </>
            ) : null}
          </h3>
          <div aria-hidden="true" style={s(`display:flex;gap:6px;margin-top:44px;height:56px`)}>
            <span style={s(`flex:4.7 1 0;min-width:0;display:flex;align-items:center;padding:0 10px;box-sizing:border-box;overflow:hidden;border-radius:16px 6px 6px 16px / 14px 6px 6px 14px;background:#D9EA6E`)}>
              <span style={s(`flex:none;width:36px;height:36px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#0F2015;display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6.5h16v13H4z"></path>
                  <path d="M8 4v5M16 4v5M4 10.5h16"></path>
                  <path d="M10 13.5l4 4M14 13.5l-4 4"></path>
                </svg>
              </span>
            </span>
            <span style={s(`flex:10.8 1 0;min-width:0;display:flex;align-items:center;padding:0 10px;box-sizing:border-box;overflow:hidden;border-radius:6px;background:repeating-linear-gradient(135deg,rgba(217,234,110,.5) 0 3px,rgba(217,234,110,.12) 3px 10px);box-shadow:inset 0 0 0 1.5px rgba(217,234,110,.7)`)}>
              <span style={s(`flex:none;width:36px;height:36px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:#0F2015;display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 8h12.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 5 8z"></path>
                  <path d="M21 11v2"></path>
                  <path d="M6.5 10.5v3"></path>
                </svg>
              </span>
            </span>
            <span style={s(`flex:6.8 1 0;min-width:0;display:flex;align-items:center;padding:0 10px;box-sizing:border-box;overflow:hidden;border-radius:6px 16px 16px 6px / 6px 14px 14px 6px;background:rgba(217,234,110,.3)`)}>
              <span style={s(`flex:none;width:36px;height:36px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:#0F2015;display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 4H6v16h7"></path>
                  <path d="M10 12h10"></path>
                  <path d="M17 9l3 3-3 3"></path>
                </svg>
              </span>
            </span>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));column-gap:clamp(24px,3vw,48px);row-gap:0;margin-top:-8px`)}>
            <div style={s(`display:grid;grid-template-rows:subgrid;grid-row:span 4;row-gap:0;min-width:0`)}>
              <div style={s(`margin-top:36px;display:flex;align-items:center;gap:12px`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.14);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6.5h16v13H4z"></path>
                    <path d="M8 4v5M16 4v5M4 10.5h16"></path>
                    <path d="M10 13.5l4 4M14 13.5l-4 4"></path>
                  </svg>
                </span>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Absenteeism</span>
              </div>
              <div style={s(`margin-top:18px;font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:#EAF79B`)}>$4.7 million</div>
              <p style={s(`margin:12px 0 0;max-width:24em;font:400 15px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.86);text-wrap:pretty`)}>9,000 unplanned days off.</p>
              <p style={s(`margin:14px 0 0;font:500 10.5px/1.6 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.62)`)}>THE 7 AM TEXT · THE THIRD MONDAY</p>
            </div>
            <div style={s(`display:grid;grid-template-rows:subgrid;grid-row:span 4;row-gap:0;min-width:0`)}>
              <div style={s(`margin-top:36px;display:flex;align-items:center;gap:12px`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(217,234,110,.14);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 8h12.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 5 8z"></path>
                    <path d="M21 11v2"></path>
                    <path d="M6.5 10.5v3"></path>
                  </svg>
                </span>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Presenteeism</span>
              </div>
              <div style={s(`margin-top:18px;font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:#EAF79B`)}>$10.8 million</div>
              <p style={s(`margin:12px 0 0;max-width:24em;font:400 15px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.86);text-wrap:pretty`)}>At work, not really there. The biggest cost, and the one you can’t see.</p>
              <p style={s(`margin:14px 0 0;font:500 10.5px/1.6 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.62)`)}>THE “ALL GOOD” · THE SILENT MEETING</p>
            </div>
            <div style={s(`display:grid;grid-template-rows:subgrid;grid-row:span 4;row-gap:0;min-width:0`)}>
              <div style={s(`margin-top:36px;display:flex;align-items:center;gap:12px`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(217,234,110,.14);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13 4H6v16h7"></path>
                    <path d="M10 12h10"></path>
                    <path d="M17 9l3 3-3 3"></path>
                  </svg>
                </span>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Turnover</span>
              </div>
              <div style={s(`margin-top:18px;font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:#EAF79B`)}>$6.8 million</div>
              <p style={s(`margin:12px 0 0;max-width:24em;font:400 15px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.86);text-wrap:pretty`)}>135 people leave, each costing about half a year’s salary to replace.</p>
              <p style={s(`margin:14px 0 0;font:500 10.5px/1.6 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.62)`)}>THE RESIGNATION · THE EXIT INTERVIEW</p>
            </div>
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px;margin-top:48px`)}>
            <a href="/roi/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 24px;border-radius:999px;background:#F4F2E6;color:#14231A;font:600 15.5px 'DM Sans',sans-serif`)} className="hm-hof85d92 hm-ac3e8255">
              Calculate yours
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </section>
      <section ref={V.searchRef} id="search" style={s(`position: relative; overflow: hidden; color: #F4F2E6; background-color: var(--bg-base)`)}>
        <div ref={V.beamRef} aria-hidden="true" style={s(`position:absolute;left:0;top:0;width:min(760px,130vw);aspect-ratio:1;border-radius:50%;transform:translate(30vw,320px) translate(-50%,-50%);background:radial-gradient(closest-side,rgba(217,234,110,.19),rgba(217,234,110,.07) 42%,rgba(217,234,110,0) 72%);pointer-events:none;will-change:transform`)}></div>
        <div ref={V.revealRef} aria-hidden="true" style={s(`position: absolute; inset: 0; pointer-events: none; -webkit-mask-image: radial-gradient(circle 260px at var(--x,30%) var(--y,45%),#000 0%,rgba(0,0,0,.55) 42%,rgba(0,0,0,0) 74%); mask-image: radial-gradient(circle 260px at var(--x,30%) var(--y,45%),#000 0%,rgba(0,0,0,.55) 42%,rgba(0,0,0,0) 74%)`)}>
          <span style={s(`position:absolute;left:7%;top:12%;display:flex;flex-direction:column;gap:4px;max-width:230px`)}>
            <span style={s(`font:500 10.5px 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(244,242,230,.55)`)}>7:12 AM · SAM</span>
            <span style={s(`font:400 15px/1.4 'DM Sans',sans-serif;color:rgba(244,242,230,.8)`)}>Not feeling great, won’t make it in today.</span>
          </span>
          {' '}
          <span style={s(`position:absolute;left:40%;top:7%;font:400 14px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>“Any thoughts?” · no replies</span>
          {' '}
          <span style={s(`position:absolute;left:61%;top:15%;display:flex;align-items:center;gap:10px;padding:9px 16px 9px 12px;border-radius:999px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.14);white-space:nowrap;color:rgba(244,242,230,.6)`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5"></circle>
              <path d="M16 16l4.5 4.5"></path>
            </svg>
            <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(244,242,230,.88)`)}>how to tell my manager I’m not ok</span>
          </span>
          {' '}
          <span style={s(`position:absolute;left:78%;top:44%;display:flex;align-items:center;gap:14px;padding:10px 12px 10px 16px;border-radius:14px 10px 14px 10px;background:rgba(228,240,214,.05);white-space:nowrap`)}>
            <span style={s(`display:flex;flex-direction:column;gap:2px`)}>
              <span style={s(`font:500 14.5px 'DM Sans',sans-serif;color:#F6F4E9`)}>Open to work</span>
              <span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(244,242,230,.55)`)}>Visible to recruiters</span>
            </span>
            <span style={s(`position:relative;width:38px;height:22px;border-radius:999px;background:#D9EA6E`)}>
              <span style={s(`position:absolute;right:2px;top:2px;width:18px;height:18px;border-radius:50%;background:#F6F4E9`)}></span>
            </span>
          </span>
          {' '}
          <span style={s(`position:absolute;left:60%;top:72%;padding:10px 14px;border-radius:18px 18px 6px 18px;background:rgba(217,234,110,.16);font:400 15px 'DM Sans',sans-serif;color:#EAF79B;white-space:nowrap`)}>All good 👍</span>
          {' '}
          <span style={s(`position:absolute;left:8%;top:78%;display:flex;flex-direction:column;gap:3px`)}>
            <span style={s(`font:600 14px 'DM Sans',sans-serif;color:#F6F4E9`)}>Resignation</span>
            <span style={s(`font:400 12.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.6)`)}>Jordan Lee · 9:04 am</span>
          </span>
          {' '}
          <span style={s(`position:absolute;left:33%;top:87%;display:flex;align-items:center;gap:10px;white-space:nowrap;color:rgba(244,242,230,.7)`)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z"></path>
              <path d="M14 3.5V8h4"></path>
              <path d="M9 12.5h6M9 16h6"></path>
            </svg>
            <span style={s(`font:500 14.5px 'DM Sans',sans-serif;color:#F6F4E9`)}>CV_2026_final.docx</span>
            <span style={s(`font:500 10.5px 'DM Mono',monospace;letter-spacing:1px;color:rgba(244,242,230,.5)`)}>EDITED 11:48 PM</span>
          </span>
          {' '}
          <span style={s(`position:absolute;left:78%;top:84%;font:400 19px 'DM Serif Display',serif;color:rgba(246,244,233,.85)`)}>“It just built up.”</span>
        </div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;min-height:clamp(520px,82vh,760px);display:flex;flex-direction:column;justify-content:center;padding-top:112px;padding-bottom:112px`)}>
          <h2 style={s(`margin:0;max-width:10.5em;font:400 clamp(40px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#F6F4E9;text-wrap:balance`)}>Right now, you’re running in the dark. 🔦</h2>
          <p style={s(`margin:26px 0 0;max-width:31em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.86);text-wrap:pretty`)}>
            An annual survey is a photograph of a year ago. An EAP is used by one in twenty. In between, nothing tells you which team is sliding, so you find out at the resignation.
          </p>
        </div>
      </section>
      <section ref={V.lightsRef} style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;overflow:hidden;background-color:#F4F2E6;color:#14231A;transition:background-color 1.1s cubic-bezier(.2,.7,.2,1),color 1.1s cubic-bezier(.2,.7,.2,1)`)}>
        <div ref={V.glowRef} aria-hidden="true" style={s(`position:absolute;left:50%;top:-520px;width:min(1500px,190vw);height:1040px;transform:translateX(-50%) scale(1);border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.5),rgba(217,234,110,.16) 48%,rgba(217,234,110,0) 76%);pointer-events:none;opacity:1;transition:opacity 1.6s ease,transform 1.8s cubic-bezier(.2,.7,.2,1)`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(88px,11vw,152px);padding-bottom:clamp(72px,9vw,120px)`)}>
          <div style={s(`text-align:center`)}>
            <h2 style={s(`margin:0 auto;max-width:11em;font:400 clamp(40px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:inherit;text-wrap:balance`)}>nørma turns the lights on.</h2>
            <p style={s(`margin:20px auto 0;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:inherit;opacity:.7`)}>Every month, for every team.</p>
          </div>
          <ol ref={V.stepsRef} style={s(`position:relative;list-style:none;margin:clamp(48px,6vw,72px) 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(40px,4vw,48px) clamp(28px,3.4vw,48px)`)}>
            <svg ref={V.linkRef} aria-hidden="true" style={s(`position:absolute;z-index:0;left:0;top:0;width:0;height:0;overflow:visible;pointer-events:none`)}>
              <path data-l="track" fill="none" stroke="rgba(176,196,56,.32)" strokeWidth="2" strokeLinecap="round" pathlength="100"></path>
              <path data-l="draw" fill="none" stroke="#D3E45F" strokeWidth="3" strokeLinecap="round" pathlength="100" strokeDasharray="100" strokeDashoffset="0" style={s(`filter:drop-shadow(0 0 6px rgba(217,234,110,.7))`)}></path>
              <path data-l="pulse" fill="none" stroke="#EAF79B" strokeWidth="5" strokeLinecap="round" pathlength="100" strokeDasharray="0 100" style={s(`filter:drop-shadow(0 0 10px rgba(217,234,110,.95))`)}></path>
            </svg>
            <li style={s(`position:relative;z-index:1;display:flex;flex-direction:column;gap:20px`)}>
              <div style={s(`padding:0 4px`)}>
                <div style={s(`display:flex;align-items:baseline;gap:12px`)}>
                  <span style={s(`font:500 12px 'DM Mono',monospace;opacity:.55`)}>01</span>
                  <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px`)}>See what’s going on</span>
                </div>
              </div>
              <div style={s(`aspect-ratio:1200/978;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;overflow:hidden;background:#13261A;box-shadow:0 34px 64px -34px rgba(20,35,26,.55)`)}>
                <img src="/assets/v5/step-01.webp" alt="By department: Sales 44 Fulfilment and 47 Culture, both falling, then Support, Product and Design" width="1200" height="978" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
              </div>
              <p style={s(`margin:0;padding:0 4px;font:400 16px/1.55 'DM Sans',sans-serif;opacity:.72;text-wrap:pretty`)}>Every team, as group figures. Never a person’s answers.</p>
            </li>
            <li style={s(`position:relative;z-index:1;display:flex;flex-direction:column;gap:20px`)}>
              <div style={s(`padding:0 4px`)}>
                <div style={s(`display:flex;align-items:baseline;gap:12px`)}>
                  <span style={s(`font:500 12px 'DM Mono',monospace;opacity:.55`)}>02</span>
                  <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px`)}>Act on it</span>
                </div>
              </div>
              <div style={s(`aspect-ratio:1200/978;border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;overflow:hidden;background:#13261A;box-shadow:0 34px 64px -34px rgba(20,35,26,.55)`)}>
                <img src="/assets/v5/step-02.webp" alt="Focus area Sales: feeling heard is 41, the lowest answer in Northwind. A session to run: Everyone gets heard, 45 min, whole team" width="1200" height="978" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
              </div>
              <p style={s(`margin:0;padding:0 4px;font:400 16px/1.55 'DM Sans',sans-serif;opacity:.72;text-wrap:pretty`)}>The one place to look first, with a session to run.</p>
            </li>
            <li style={s(`position:relative;z-index:1;display:flex;flex-direction:column;gap:20px`)}>
              <div style={s(`padding:0 4px`)}>
                <div style={s(`display:flex;align-items:baseline;gap:12px`)}>
                  <span style={s(`font:500 12px 'DM Mono',monospace;opacity:.55`)}>03</span>
                  <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px`)}>See if it moved</span>
                </div>
              </div>
              <div style={s(`aspect-ratio:1200/978;border-radius:26px 22px 30px 34px / 22px 30px 34px 26px;overflow:hidden;background:#13261A;box-shadow:0 34px 64px -34px rgba(20,35,26,.55)`)}>
                <img src="/assets/v5/step-03.webp" alt="Field Services culture 47, up 4 since October, after the session" width="1200" height="978" style={s(`display:block;width:100%;height:100%;object-fit:cover`)} />
              </div>
              <p style={s(`margin:0;padding:0 4px;font:400 16px/1.55 'DM Sans',sans-serif;opacity:.72;text-wrap:pretty`)}>Next month tells you whether it worked. Up four, still work to do.</p>
            </li>
          </ol>
        </div>
      </section>
      <section style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(56px,7vw,96px);padding-bottom:clamp(88px,11vw,152px)`)}>
          <h2 style={s(`margin:0 auto;max-width:13em;text-align:center;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance`)}>The problem has two sides. So does nørma.</h2>
          <div style={s(`position:relative;max-width:1040px;margin:clamp(40px,5vw,64px) auto 0`)}>
            <svg viewBox="0 0 640 338" aria-hidden="true" style={s(`position:relative;z-index:2;display:block;width:min(640px,100%);height:auto;margin:0 auto -20px;overflow:visible`)}>
              <path d="M14.0 320.0L0.0 320.0M29.0 225.4L21.4 223.0M72.4 140.1L66.0 135.4M140.1 72.4L135.4 66.0M225.4 29.0L223.0 21.4M320.0 14.0L320.0 0.0M414.6 29.0L417.0 21.4M499.9 72.4L504.6 66.0M567.6 140.1L574.0 135.4M611.0 225.4L618.6 223.0M626.0 320.0L640.0 320.0" stroke="rgba(20,35,26,.28)" strokeWidth="1.5" fill="none"></path>
              <path d="M34.0 320.0 A286 286 0 0 1 269.9 38.4" fill="none" stroke="#E78E71" strokeWidth="26"></path>
              <path d="M280.6 36.7 A286 286 0 0 1 359.4 36.7" fill="none" stroke="#E6C77E" strokeWidth="26"></path>
              <path d="M370.1 38.4 A286 286 0 0 1 483.7 85.5" fill="none" stroke="rgba(20,35,26,.12)" strokeWidth="26"></path>
              <path d="M492.4 91.8 A286 286 0 0 1 606.0 320.0" fill="none" stroke="#D3E45F" strokeWidth="26"></path>
              <text x="320" y="132" textAnchor="middle" fill="#14231A" style={s(`font:400 38px 'DM Serif Display',serif;letter-spacing:-.4px`)}>nørma Score</text>
              <g ref={V.needleRef}><polygon points="394.8,167.3 325.4,322.6 312.1,336.2 314.6,317.4" fill="#14231A"></polygon></g>
              <circle cx="320" cy="320" r="14" fill="#14231A"></circle>
              <circle cx="320" cy="320" r="5" fill="#D9EA6E"></circle>
            </svg>
            <div style={s(`position:relative;z-index:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:16px`)}>
              <img ref={V.peekRef} src="/assets/v5/norma-point.png" alt="" width="76" height="102" style={s(`position:absolute;left:clamp(30px,5vw,64px);top:-60px;z-index:-1;display:block;transform:rotate(-7deg);transform-origin:50% 100%;transition:transform 1.6s cubic-bezier(.2,.7,.2,1);filter:drop-shadow(0 0 .7px rgba(20,35,26,.5));pointer-events:none`)} />
              <a href="#people" style={s(`display:flex;flex-direction:column;gap:16px;min-height:250px;box-sizing:border-box;padding:clamp(26px,3vw,38px);border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:#ECE8D7;border:1px solid rgba(20,35,26,.06);color:#14231A;transition:transform .3s cubic-bezier(.2,.7,.2,1)`)} className="hm-hof4597a">
                <span style={s(`display:flex;gap:6px`)}>
                  <span style={s(`width:36px;height:36px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#A9DDB4`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21"></path></svg>
                  </span>
                  <span style={s(`width:36px;height:36px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#C4BEEE`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z"></path>
                    </svg>
                  </span>
                  <span style={s(`width:36px;height:36px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#F0BDB5`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                    </svg>
                  </span>
                  <span style={s(`width:36px;height:36px;border-radius:50% 46% 54% 50% / 52% 50% 48% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#F2DAAC`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4"></path>
                      <path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4"></path>
                      <circle cx="9" cy="8.5" r="3.2"></circle>
                      <circle cx="16.8" cy="10.3" r="2.6"></circle>
                    </svg>
                  </span>
                  <span style={s(`width:36px;height:36px;border-radius:54% 50% 46% 50% / 50% 48% 52% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#AAD7E3`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9"></path>
                      <path d="M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15"></path>
                    </svg>
                  </span>
                </span>
                <span style={s(`margin-top:auto;font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.62)`)}>Your people</span>
                <span style={s(`margin-top:-8px;font:400 clamp(26px,2.6vw,32px)/1.12 'DM Serif Display',serif;letter-spacing:-.4px`)}>Personal fulfilment</span>
                <span style={s(`max-width:24em;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.7)`)}>The five pillars of a whole life. This becomes their Fulfilment.</span>
                <span style={s(`display:flex;align-items:center;gap:8px;font:600 15px 'DM Sans',sans-serif`)}>
                  <span aria-hidden="true">↓</span>
                  Their side
                </span>
              </a>
              <a href="#leaders" style={s(`display:flex;flex-direction:column;gap:16px;min-height:250px;box-sizing:border-box;padding:clamp(26px,3vw,38px);border-radius:22px 32px 20px 30px / 32px 22px 30px 20px;background:linear-gradient(165deg,#17301F,#0F2015 70%);color:#F4F2E6;transition:transform .3s cubic-bezier(.2,.7,.2,1)`)} className="hm-hof4597a">
                <span style={s(`display:flex;gap:6px`)}>
                  <span style={s(`width:36px;height:36px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.9)`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 9.2a5.4 5.4 0 0 1 10.8 0c0 3.1-2.3 4.2-3.1 6.2-.6 1.6-.9 4.1-3.5 4.1-1.4 0-2.4-.8-2.9-2"></path>
                      <path d="M10.4 9.6a2.2 2.2 0 0 1 4.4 0c0 1.4-1 1.9-1.6 2.9"></path>
                    </svg>
                  </span>
                  <span style={s(`width:36px;height:36px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.9)`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8z"></path></svg>
                  </span>
                  <span style={s(`width:36px;height:36px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.9)`)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3.5l7 3v5.5c0 4.5-3 7.6-7 8.5-4-.9-7-4-7-8.5V6.5z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                  </span>
                </span>
                <span style={s(`margin-top:auto;font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(201,212,194,.75)`)}>Leaders</span>
                <span style={s(`margin-top:-8px;font:400 clamp(26px,2.6vw,32px)/1.12 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9`)}>Workplace culture</span>
                <span style={s(`max-width:24em;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.86)`)}>Heard, valued, safe to speak. This becomes your Culture.</span>
                <span style={s(`display:flex;align-items:center;gap:8px;font:600 15px 'DM Sans',sans-serif;color:#EAF79B`)}>
                  <span aria-hidden="true">↓</span>
                  Your side
                </span>
              </a>
            </div>
          </div>
          <p style={s(`margin:36px 0 0;text-align:center;font:400 clamp(21px,2vw,25px)/1.25 'DM Serif Display',serif;letter-spacing:-.2px;color:#14231A`)}>Together, they make the nørma Score.</p>
        </div>
      </section>
      <section id="people" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#ECE8D7`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(80px,10vw,136px);padding-bottom:clamp(80px,10vw,136px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:clamp(56px,7vw,96px)`)}>
          <div style={s(`flex:1 1 400px;min-width:0;max-width:600px`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>Their side · your people</span>
            <h2 style={s(`margin:14px 0 0;max-width:12em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance`)}>Their life comes to work with them.</h2>
            <p style={s(`margin:22px 0 0;max-width:31em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
              Work is one pillar of five. Once a month, a short check-in shows each person where they are across all five and where the gaps are, and nørma helps them work on them. It’s theirs. Nobody at work can read it. Together, those check-ins become the anonymous signal leaders see.
            </p>
            <ul style={s(`list-style:none;margin:34px 0 0;padding:0;display:flex;flex-direction:column`)}>
              <li style={s(`display:flex;align-items:center;gap:16px;padding:13px 0;border-top:1px solid rgba(20,35,26,.1)`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#A9DDB4`)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21"></path></svg>
                </span>
                <span style={s(`display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px`)}>
                  <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#14231A`)}>Health & Fitness</span>
                  <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>How they care for their body and energy.</span>
                </span>
              </li>
              <li style={s(`display:flex;align-items:center;gap:16px;padding:13px 0;border-top:1px solid rgba(20,35,26,.1)`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#C4BEEE`)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z"></path>
                  </svg>
                </span>
                <span style={s(`display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px`)}>
                  <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#14231A`)}>Internal Work</span>
                  <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>Their inner life: mind, attention and self.</span>
                </span>
              </li>
              <li style={s(`display:flex;align-items:center;gap:16px;padding:13px 0;border-top:1px solid rgba(20,35,26,.1)`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#F0BDB5`)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                  </svg>
                </span>
                <span style={s(`display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px`)}>
                  <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#14231A`)}>Love & Relationships</span>
                  <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>Closeness, romance and feeling at peace.</span>
                </span>
              </li>
              <li style={s(`display:flex;align-items:center;gap:16px;padding:13px 0;border-top:1px solid rgba(20,35,26,.1)`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:50% 46% 54% 50% / 52% 50% 48% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#F2DAAC`)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4"></path>
                    <path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4"></path>
                    <circle cx="9" cy="8.5" r="3.2"></circle>
                    <circle cx="16.8" cy="10.3" r="2.6"></circle>
                  </svg>
                </span>
                <span style={s(`display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px`)}>
                  <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#14231A`)}>Social Connection</span>
                  <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>Friends, community and belonging.</span>
                </span>
              </li>
              <li style={s(`display:flex;align-items:center;gap:16px;padding:13px 0;border-top:1px solid rgba(20,35,26,.1);border-bottom:1px solid rgba(20,35,26,.1)`)}>
                <span style={s(`flex:none;width:40px;height:40px;border-radius:54% 50% 46% 50% / 50% 48% 52% 50%;background:#16261B;display:flex;align-items:center;justify-content:center;color:#AAD7E3`)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9"></path>
                    <path d="M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15"></path>
                  </svg>
                </span>
                <span style={s(`display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px`)}>
                  <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#14231A`)}>Work & Life Flow</span>
                  <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>How work sits within the rest of their life.</span>
                </span>
              </li>
            </ul>
            <div style={s(`display:flex;align-items:center;gap:22px;margin-top:32px;padding:22px 26px 22px 22px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;background:#F4F2E6`)}>
              <img src="/assets/v5/norma-happy.png" alt="nørma, the little character in the app" width="66" height="89" style={s(`flex:none;display:block;filter:drop-shadow(0 0 .7px rgba(20,35,26,.55)) drop-shadow(0 10px 14px rgba(20,35,26,.14))`)} />
              <p style={s(`margin:0;font:400 16px/1.55 'DM Sans',sans-serif;color:#14231A;text-wrap:pretty`)}>
                <strong style={s(`font-weight:600`)}>nørma goes with them.</strong>
                {' '}She’s their companion, following their growth and supporting them along the way.
              </p>
            </div>
            <a href="/your-people/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;margin-top:32px;padding:0 24px;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif`)} className="hm-ho3cfe08 hm-ac3e8255">
              See the whole app
              <span aria-hidden="true">›</span>
            </a>
          </div>
          <div ref={V.phoneColRef} style={s(`flex:0 1 360px;min-width:0;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:26px`)}>
            <div style={s(`position:relative;width:290px;height:628px`)}>
              <div aria-hidden="true" style={s(`position:absolute;left:-46px;right:-46px;top:40px;bottom:-24px;border-radius:190px 190px 34px 28px / 190px 190px 34px 28px;background:radial-gradient(70% 40% at 50% 12%,rgba(217,234,110,.42),rgba(217,234,110,0) 72%),#E4E0CC`)}></div>
              <div style={s(`position:relative`)}><Phone screen={V.phoneScreen} onLight={true} /></div>
            </div>
          </div>
        </div>
      </section>
      <section id="leaders" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;right:-20%;top:-40%;width:80%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.07),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(80px,10vw,136px);padding-bottom:clamp(80px,10vw,136px)`)}>
          <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(201,212,194,.75)`)}>Your side · leaders</span>
          <h2 style={s(`margin:14px 0 0;max-width:13em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>The culture they walk into is yours to shape.</h2>
          <p style={s(`margin:22px 0 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>
            You see both sides as group figures: how fulfilled your people are, and the culture they work in. They meet in one number for each group, the nørma Score, so you know where to look first and what to do.
          </p>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px;margin-top:28px`)}>
            <span style={s(`display:inline-flex;align-items:center;gap:10px;padding:9px 16px 9px 10px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:rgba(228,240,214,.07);border:1px solid rgba(228,240,214,.1);font:400 14.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>
              <span style={s(`width:26px;height:26px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.88)`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 9.2a5.4 5.4 0 0 1 10.8 0c0 3.1-2.3 4.2-3.1 6.2-.6 1.6-.9 4.1-3.5 4.1-1.4 0-2.4-.8-2.9-2"></path>
                  <path d="M10.4 9.6a2.2 2.2 0 0 1 4.4 0c0 1.4-1 1.9-1.6 2.9"></path>
                </svg>
              </span>
              Do you feel heard?
            </span>
            <span style={s(`display:inline-flex;align-items:center;gap:10px;padding:9px 16px 9px 10px;border-radius:14px 22px 12px 20px / 20px 12px 22px 14px;background:rgba(228,240,214,.07);border:1px solid rgba(228,240,214,.1);font:400 14.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>
              <span style={s(`width:26px;height:26px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.88)`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8z"></path></svg>
              </span>
              Do you feel valued?
            </span>
            <span style={s(`display:inline-flex;align-items:center;gap:10px;padding:9px 16px 9px 10px;border-radius:20px 12px 22px 14px / 12px 22px 14px 20px;background:rgba(228,240,214,.07);border:1px solid rgba(228,240,214,.1);font:400 14.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>
              <span style={s(`width:26px;height:26px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.88)`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5l7 3v5.5c0 4.5-3 7.6-7 8.5-4-.9-7-4-7-8.5V6.5z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </span>
              Do you feel safe to speak your truth?
            </span>
          </div>
          <div style={s(`position:relative;margin-top:clamp(40px,5vw,56px);height:940px`)}>
            <div data-fit="1280x940" style={s(`position:absolute;left:0;top:0;width:1280px;height:940px;transform-origin:0 0;border-radius:22px;overflow:hidden;background:radial-gradient(60% 70% at 80% -22%,rgba(217,234,110,.05) 0%,rgba(0,0,0,0) 62%),linear-gradient(168deg,#0A140D 0%,#081009 55%,#070D09 100%);border:1px solid rgba(228,240,214,.12);display:flex;color:#F4F2E6;-webkit-mask-image:linear-gradient(180deg,#000 80%,rgba(0,0,0,0) 100%);mask-image:linear-gradient(180deg,#000 80%,rgba(0,0,0,0) 100%)`)}>
              <aside style={s(`flex:none;width:224px;padding:28px 16px 20px;display:flex;flex-direction:column;box-sizing:border-box;border-right:1px solid rgba(228,240,214,.07);background:linear-gradient(180deg,rgba(6,11,7,.62),rgba(6,11,7,.45))`)}>
                <div style={s(`display:flex;align-items:center;gap:9px;padding:0 10px`)}>
                  <span style={s(`width:12px;height:12px;background:#D9EA6E;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)`)}></span>
                  <span style={s(`font:italic 400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>nørma</span>
                </div>
                <div style={s(`margin-top:36px;padding:0 12px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.5)`)}>SIGNAL</div>
                <div style={s(`margin-top:8px;display:flex;flex-direction:column;gap:2px`)}>
                  <div style={s(`padding:9px 12px;border-radius:12px;background:rgba(217,234,110,.1);font:500 13.5px 'DM Sans',sans-serif;color:#EAF79B`)}>Dashboard</div>
                  <div style={s(`padding:9px 12px;border-radius:12px;font:400 13.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Departments</div>
                  <div style={s(`padding:9px 12px;border-radius:12px;font:400 13.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Check-ins</div>
                  <div style={s(`padding:9px 12px;border-radius:12px;font:400 13.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Themes</div>
                </div>
                <div style={s(`margin-top:28px;padding:0 12px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.5)`)}>ACT</div>
                <div style={s(`margin-top:8px;display:flex;flex-direction:column;gap:2px`)}>
                  <div style={s(`padding:9px 12px;border-radius:12px;font:400 13.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Growth work</div>
                  <div style={s(`padding:9px 12px;border-radius:12px;font:400 13.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Playbooks</div>
                </div>
                <div style={s(`margin-top:auto;display:flex;flex-direction:column;gap:2px`)}>
                  <div style={s(`padding:0 12px 6px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.5)`)}>ORGANISATION</div>
                  <div style={s(`padding:8px 12px;border-radius:12px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.62)`)}>People & structure</div>
                  <div style={s(`padding:8px 12px;border-radius:12px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.62)`)}>Content</div>
                  <div style={s(`padding:8px 12px;border-radius:12px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.62)`)}>Settings</div>
                  <div style={s(`margin:14px 12px 0;height:1px;background:rgba(228,240,214,.08)`)}></div>
                  <div style={s(`display:flex;align-items:center;gap:10px;padding:12px 12px 0`)}>
                    <span style={s(`width:30px;height:30px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;font:500 11px 'DM Sans',sans-serif;color:#F4F2E6`)}>HV</span>
                    <span style={s(`display:flex;flex-direction:column;gap:1px`)}>
                      <span style={s(`font:500 13px 'DM Sans',sans-serif;color:#F4F2E6`)}>Sam</span>
                      <span style={s(`font:400 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>Org admin</span>
                    </span>
                  </div>
                </div>
              </aside>
              <main style={s(`flex:1;min-width:0;padding:30px 44px 40px;box-sizing:border-box;display:flex;flex-direction:column;gap:28px`)}>
                <div style={s(`display:flex;align-items:center;justify-content:space-between;gap:24px`)}>
                  <div style={s(`display:flex;align-items:baseline;gap:10px`)}>
                    <span style={s(`font:400 30px/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Northwind</span>
                    <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>▾</span>
                  </div>
                  <div style={s(`position:relative;display:flex;align-items:center;font:400 12.5px 'DM Sans',sans-serif`)}>
                    <span style={s(`display:inline-flex;align-items:center;gap:7px;color:rgba(201,212,194,.72)`)}>
                      <span style={s(`width:7px;height:7px;border-radius:999px;background:rgba(217,234,110,.5)`)}></span>
                      Check-in closed
                      <span style={s(`font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>3 OCT</span>
                    </span>
                    <span style={s(`width:28px;height:1px;background:rgba(228,240,214,.16);margin:0 10px`)}></span>
                    <span style={s(`display:inline-flex;align-items:center;gap:7px;color:#EAF79B`)}>
                      <span style={s(`width:7px;height:7px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 0 3px rgba(217,234,110,.2)`)}></span>
                      October signal
                      <span style={s(`font:400 11px 'DM Sans',sans-serif;color:rgba(234,247,155,.7)`)}>▾</span>
                    </span>
                    <span style={s(`width:28px;height:1px;background:rgba(228,240,214,.16);margin:0 10px`)}></span>
                    <span style={s(`display:inline-flex;align-items:center;gap:7px;color:rgba(201,212,194,.72)`)}>
                      <span style={s(`width:7px;height:7px;border-radius:999px;border:1px solid rgba(228,240,214,.3);box-sizing:border-box`)}></span>
                      Next check-in
                      <span style={s(`font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>1 NOV</span>
                    </span>
                  </div>
                </div>
                <div style={s(`display:grid;grid-template-columns:240px 1fr 1fr;gap:20px;align-items:stretch`)}>
                  <div style={s(`position:relative;aspect-ratio:1 / 1;padding:18px 20px 16px;border-radius:26px 32px 24px 30px / 32px 24px 30px 26px;background:linear-gradient(158deg,rgba(228,240,214,.105) 0%,rgba(228,240,214,.055) 52%,rgba(228,240,214,.028) 100%);box-shadow:inset 0 1px 0 rgba(228,240,214,.09);display:flex;flex-direction:column;gap:6px;box-sizing:border-box;cursor:pointer`)} className="hm-ho1f9dda">
                    <div style={s(`position:relative;display:flex;align-items:center;gap:8px`)}>
                      <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F4F2E6`)}>nørma Score</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.72)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M12 11v5"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span style={s(`margin-left:auto;font:400 20px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>›</span>
                    </div>
                    <div style={s(`flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0px; padding-top: 10px; min-height: 0`)}>
                      <div style={s(`position:relative`)}>
                        <svg viewBox="0 0 240 132" width="196" height="108" style={s(`display:block;overflow:visible`)}>
                          <defs>
                            <radialGradient id="idxWell" cx="50%" cy="14%" r="86%">
                              <stop offset="0%" stopColor="#D9EA6E" stopOpacity=".16"></stop>
                              <stop offset="55%" stopColor="#D9EA6E" stopOpacity=".05"></stop>
                              <stop offset="100%" stopColor="#D9EA6E" stopOpacity="0"></stop>
                            </radialGradient>
                            <filter id="idxGlow" x="-60%" y="-60%" width="220%" height="220%">
                              <feGaussianBlur stdDeviation="3.2" result="b"></feGaussianBlur>
                              <feMerge>
                                <feMergeNode in="b"></feMergeNode>
                                <feMergeNode in="SourceGraphic"></feMergeNode>
                              </feMerge>
                            </filter>
                            <filter id="idxNeedleShadow" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity=".55"></feDropShadow></filter>
                          </defs>
                          <circle cx="120" cy="112" r="92" fill="url(#idxWell)"></circle>
                          <path d="M17.0,112.0 A103,103 0 0 1 223.0,112.0" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="1"></path>
                          <path d="M22.2,96.5 L18.3,95.9 M25.8,81.4 L22.0,80.2 M31.8,67.1 L28.2,65.2 M50.0,42.0 L47.2,39.2 M61.8,31.9 L59.5,28.7 M75.1,23.8 L73.2,20.2 M104.5,14.2 L103.9,10.3 M120.0,13.0 L120.0,9.0 M135.5,14.2 L136.1,10.3 M164.9,23.8 L166.8,20.2 M178.2,31.9 L180.5,28.7 M190.0,42.0 L192.8,39.2 M208.2,67.1 L211.8,65.2 M214.2,81.4 L218.0,80.2 M217.8,96.5 L221.7,95.9" fill="none" stroke="rgba(228,240,214,.2)" strokeWidth="1"></path>
                          <path d="M25.0,112.0 L17.0,112.0 M43.1,56.2 L36.7,51.5 M90.6,21.6 L88.2,14.0 M149.4,21.6 L151.8,14.0 M196.9,56.2 L203.3,51.5 M215.0,112.0 L223.0,112.0" fill="none" stroke="rgba(228,240,214,.42)" strokeWidth="1.8"></path>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.8)" strokeWidth="9"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.8)" strokeWidth="9"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.14)" strokeWidth="9"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.8)" strokeWidth="9"></path>
                          <path d="M44.0,112.0 A76,76 0 0 1 154.5,44.3" fill="none" stroke="#F6F4E9" strokeWidth="3" strokeLinecap="round" opacity=".85" filter="url(#idxGlow)"></path>
                          <line x1="120" y1="112" x2="150.0" y2="53.2" stroke="rgba(228,240,214,.3)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"></line>
                          <polygon points="156.3,40.7 127.1,115.6 110.9,129.8 112.9,108.4" fill="#F6F4E9" filter="url(#idxNeedleShadow)"></polygon>
                          <circle cx="120" cy="112" r="11" fill="#0A140D" stroke="rgba(228,240,214,.5)" strokeWidth="1.2"></circle>
                          <circle cx="120" cy="112" r="4" fill="#D9EA6E"></circle>
                        </svg>
                        {' '}
                        <span style={s(`position:absolute;left:-6px;bottom:-4px;font:500 9.5px 'DM Mono',monospace;color:rgba(201,212,194,.45)`)}>0</span>
                        {' '}
                        <span style={s(`position:absolute;right:-10px;bottom:-4px;font:500 9.5px 'DM Mono',monospace;color:rgba(201,212,194,.45)`)}>10</span>
                      </div>
                      <div style={s(`display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr); align-items: end; gap: 12px; width: 100%`)}>
                        <img src="/assets/v5/norma-happy.png" alt="" style={s(`justify-self:end;width:44px;height:59px;margin-bottom:-6px;object-fit:contain;filter:drop-shadow(0 12px 20px rgba(0,0,0,.55))`)} />
                        <span style={s(`font:400 40px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>6.5</span>
                        <span style={s(`justify-self:start;margin-bottom:7px;padding:4px 10px;border-radius:18px 12px 16px 10px / 12px 18px 10px 16px;background:rgba(235,245,255,.07);font:500 11px 'DM Sans',sans-serif;color:rgba(244,242,230,.9)`)}>Steady</span>
                      </div>
                    </div>
                  </div>
                  <div style={s(`padding:22px 26px 24px;border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:linear-gradient(158deg,rgba(228,240,214,.105) 0%,rgba(228,240,214,.055) 52%,rgba(228,240,214,.028) 100%);box-shadow:inset 0 1px 0 rgba(228,240,214,.09);display:flex;flex-direction:column;gap:14px;cursor:pointer`)} className="hm-ho1f9dda">
                    <div style={s(`display:flex;align-items:center;gap:8px`)}>
                      <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F4F2E6`)}>Fulfilment</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.72)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M12 11v5"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span style={s(`margin-left:auto;font:400 20px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>›</span>
                    </div>
                    <div style={s(`display:flex;align-items:baseline;gap:16px`)}>
                      <span style={s(`font:400 62px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>61</span>
                      <span style={s(`font:500 13px 'DM Mono',monospace;color:#10B981`)}>↑ 2 since Sep</span>
                      <span style={s(`margin-left:auto;padding:5px 12px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:500 12px 'DM Sans',sans-serif`)}>Steady</span>
                    </div>
                    <svg viewBox="0 0 400 56" width="100%" height="56" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                      <defs>
                        <linearGradient id="idxSparkF" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D9EA6E" stopOpacity=".34"></stop>
                          <stop offset="55%" stopColor="#D9EA6E" stopOpacity=".12"></stop>
                          <stop offset="100%" stopColor="#D9EA6E" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <polyline fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" points="0,56 400,56"></polyline>
                      <polygon fill="url(#idxSparkF)" points="0,56 0,36.8 80,35.2 160,32.0 240,33.6 320,33.6 400,30.4 400,56"></polygon>
                      <polyline fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points="0,36.8 80,35.2 160,32.0 240,33.6 320,33.6 400,30.4"></polyline>
                      <circle r="3.5" fill="#EAF79B" cx="400" cy="30.4"></circle>
                    </svg>
                    <div style={s(`display:flex;justify-content:space-between;font:500 10px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>
                      <span>MAY</span>
                      <span>JUN</span>
                      <span>JUL</span>
                      <span>AUG</span>
                      <span>SEP</span>
                      <span>OCT</span>
                    </div>
                  </div>
                  <div style={s(`padding:22px 26px 24px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;background:linear-gradient(158deg,rgba(228,240,214,.105) 0%,rgba(228,240,214,.055) 52%,rgba(228,240,214,.028) 100%);box-shadow:inset 0 1px 0 rgba(228,240,214,.09);display:flex;flex-direction:column;gap:14px;cursor:pointer`)} className="hm-ho1f9dda">
                    <div style={s(`display:flex;align-items:center;gap:8px`)}>
                      <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F4F2E6`)}>Culture</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.72)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M12 11v5"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span style={s(`margin-left:auto;font:400 20px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>›</span>
                    </div>
                    <div style={s(`display:flex;align-items:baseline;gap:16px`)}>
                      <span style={s(`font:400 62px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>68</span>
                      <span style={s(`font:500 13px 'DM Mono',monospace;color:#EF4444`)}>↓ 3 since Sep</span>
                      <span style={s(`margin-left:auto;padding:5px 12px;border-radius:12px 22px 14px 20px / 20px 12px 22px 14px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:500 12px 'DM Sans',sans-serif`)}>Steady</span>
                    </div>
                    <svg viewBox="0 0 400 56" width="100%" height="56" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                      <defs>
                        <linearGradient id="idxSparkC" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D9EA6E" stopOpacity=".34"></stop>
                          <stop offset="55%" stopColor="#D9EA6E" stopOpacity=".12"></stop>
                          <stop offset="100%" stopColor="#D9EA6E" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <polyline fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" points="0,56 400,56"></polyline>
                      <polygon fill="url(#idxSparkC)" points="0,56 0,16.0 80,14.4 160,12.8 240,14.4 320,14.4 400,19.2 400,56"></polygon>
                      <polyline fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points="0,16.0 80,14.4 160,12.8 240,14.4 320,14.4 400,19.2"></polyline>
                      <circle r="3.5" fill="#EAF79B" cx="400" cy="19.2"></circle>
                    </svg>
                    <div style={s(`display:flex;justify-content:space-between;font:500 10px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>
                      <span>MAY</span>
                      <span>JUN</span>
                      <span>JUL</span>
                      <span>AUG</span>
                      <span>SEP</span>
                      <span>OCT</span>
                    </div>
                  </div>
                </div>
                <div style={s(`display:grid;grid-template-columns:1fr 1fr;gap:16px;display: grid`)}>
                  <div style={s(`display:flex;flex-direction:column;gap:10px;padding:16px 20px 10px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;border:1px solid rgba(228,240,214,.1)`)}>
                    <div style={s(`display:flex;align-items:center;gap:16px`)}>
                      <div style={s(`position:relative;display:flex;flex-direction:column;gap:6px;min-width:0`)}>
                        <span style={s(`display:flex;align-items:center;gap:8px;font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>
                          <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444`)}></span>
                          FOCUS AREA
                        </span>
                        <span style={s(`font:400 13.5px/1.45 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>
                          <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9;margin-right:6px`)}>Field Services</span>
                          Fulfilment 44 and culture 43, both down again. Feeling safe is the lowest answer in the company.
                        </span>
                      </div>
                      <span style={s(`margin-left:auto;flex:none;display:inline-flex;align-items:center;padding:9px 16px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:500 13px 'DM Sans',sans-serif;color:#14231A`)}>Open Field Services ›</span>
                    </div>
                    <div style={s(`display:flex;justify-content:center;align-items:center;gap:6px`)}>
                      <span style={s(`padding:0 8px;font:400 15px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.45);cursor:pointer`)}>‹</span>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:rgba(244,242,230,.85)`)}></span>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:rgba(244,242,230,.25)`)}></span>
                      <span style={s(`padding:0 8px;font:400 15px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.45);cursor:pointer`)}>›</span>
                    </div>
                  </div>
                  <div style={s(`display:flex;flex-direction:column;gap:10px;padding:16px 20px 10px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;border:1px solid rgba(228,240,214,.1)`)}>
                    <div style={s(`display:flex;align-items:center;gap:16px`)}>
                      <div style={s(`display:flex;flex-direction:column;gap:6px;min-width:0`)}>
                        <span style={s(`display:flex;align-items:center;gap:8px;font:600 10px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>
                          <span style={s(`width:8px;height:8px;border-radius:999px;background:#D9EA6E`)}></span>
                          RUNNING
                        </span>
                        <span style={s(`font:400 13.5px/1.45 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>
                          <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9;margin-right:6px`)}>Stop for Wellness</span>
                          Customer Success · session 2 of 4 · Thu 16 Oct
                        </span>
                      </div>
                      <span style={s(`margin-left:auto;flex:none;font:500 13px 'DM Sans',sans-serif;color:#EAF79B`)}>Open ›</span>
                    </div>
                    <div style={s(`display:flex;justify-content:center;align-items:center;gap:6px`)}>
                      <span style={s(`padding:0 8px;font:400 15px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.45);cursor:pointer`)}>‹</span>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:rgba(244,242,230,.85)`)}></span>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:rgba(244,242,230,.25)`)}></span>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:rgba(244,242,230,.25)`)}></span>
                      <span style={s(`padding:0 8px;font:400 15px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.45);cursor:pointer`)}>›</span>
                    </div>
                  </div>
                </div>
                <div style={s(`position:relative;margin-top:8px;display:flex;align-items:center;justify-content:space-between;gap:20px`)}>
                  <span style={s(`font:400 22px 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>By department</span>
                  <span style={s(`display:flex;align-items:center;gap:20px`)}>
                    <span style={s(`display:inline-flex;align-items:center;gap:10px;flex:none;white-space:nowrap;font:400 12.5px 'DM Sans',sans-serif`)}>
                      <span style={s(`color:rgba(201,212,194,.55)`)}>Sort</span>
                      <span style={s(`display:inline-flex;flex:none;white-space:nowrap;border:1px solid rgba(228,240,214,.12);border-radius:999px;overflow:hidden;font:500 12.5px 'DM Sans',sans-serif`)}>
                        <span style={s(`padding:6px 13px;white-space:nowrap;background:rgba(217,234,110,.12);color:#EAF79B`)}>Lowest first</span>
                        <span style={s(`padding:6px 13px;white-space:nowrap;color:rgba(244,242,230,.6)`)}>A–Z</span>
                      </span>
                    </span>
                    <span style={s(`display:inline-flex;border:1px solid rgba(228,240,214,.12);border-radius:999px;overflow:hidden;font:500 12.5px 'DM Sans',sans-serif`)}>
                      <span style={s(`padding:6px 14px;color:rgba(244,242,230,.6)`)}>Overview</span>
                      <span style={s(`padding:6px 14px;background:rgba(217,234,110,.12);color:#EAF79B`)}>Detail</span>
                      <span style={s(`padding:6px 14px;color:rgba(244,242,230,.6)`)}>Trend</span>
                    </span>
                  </span>
                </div>
                <div style={s(`margin-top:-12px;padding:20px 24px 18px;border-radius:30px 20px 32px 22px / 20px 30px 22px 32px;background:linear-gradient(162deg,rgba(228,240,214,.085) 0%,rgba(228,240,214,.04) 55%,rgba(228,240,214,.02) 100%);box-shadow:inset 0 1px 0 rgba(228,240,214,.07);display:flex;flex-direction:column;gap:14px`)}>
                  <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:end;padding:0 6px`)}>
                    <span></span>
                    <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>SCORE</span>
                    <span></span>
                    <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>FULFILMENT</span>
                    <span></span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 52% 48% 50% 50% / 50% 54% 46% 50%;background: rgba(159,214,171,.14);display:flex;align-items:center;justify-content:center;color: #A9DDB4`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21"></path>
                          <path d=""></path>
                          <circle cx="9" cy="8.5" r="0"></circle>
                          <circle cx="16.8" cy="10.3" r="0"></circle>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Health</span>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 48% 52% 50% 50% / 54% 50% 50% 46%;background: rgba(185,178,232,.14);display:flex;align-items:center;justify-content:center;color: #C4BEEE`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z"></path>
                          <path d=""></path>
                          <circle cx="9" cy="8.5" r="0"></circle>
                          <circle cx="16.8" cy="10.3" r="0"></circle>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Internal</span>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 50% 50% 48% 52% / 46% 50% 54% 50%;background: rgba(235,175,166,.14);display:flex;align-items:center;justify-content:center;color: #F0BDB5`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                          <path d=""></path>
                          <circle cx="9" cy="8.5" r="0"></circle>
                          <circle cx="16.8" cy="10.3" r="0"></circle>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Love</span>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 50% 46% 54% 50% / 52% 50% 48% 50%;background: rgba(239,209,154,.14);display:flex;align-items:center;justify-content:center;color: #F2DAAC`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4"></path>
                          <path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4"></path>
                          <circle cx="9" cy="8.5" r="3.2"></circle>
                          <circle cx="16.8" cy="10.3" r="2.6"></circle>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Social</span>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 54% 50% 46% 50% / 50% 48% 52% 50%;background: rgba(156,207,221,.14);display:flex;align-items:center;justify-content:center;color: #AAD7E3`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9"></path>
                          <path d="M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15"></path>
                          <circle cx="9" cy="8.5" r="0"></circle>
                          <circle cx="16.8" cy="10.3" r="0"></circle>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Flow</span>
                    </span>
                    <span></span>
                    <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>CULTURE</span>
                    <span></span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.85)`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 9.2a5.4 5.4 0 0 1 10.8 0c0 3.1-2.3 4.2-3.1 6.2-.6 1.6-.9 4.1-3.5 4.1-1.4 0-2.4-.8-2.9-2"></path>
                          <path d="M10.4 9.6a2.2 2.2 0 0 1 4.4 0c0 1.4-1 1.9-1.6 2.9"></path>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Heard</span>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.85)`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8z"></path>
                          <path d=""></path>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Valued</span>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                      <span style={s(`width:24px;height:24px;border-radius: 50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.85)`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3.5l7 3v5.5c0 4.5-3 7.6-7 8.5-4-.9-7-4-7-8.5V6.5z"></path>
                          <path d="M9 12l2 2 4-4"></path>
                        </svg>
                      </span>
                      <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Safe</span>
                    </span>
                  </div>
                  <div style={s(`display:flex;flex-direction:column;gap:2px`)}>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: inline-block`)}></span>
                        Field Services
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="103.8,33.7 127.8,110.4 124.1,131.6 112.2,113.6" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(239,68,68,.15);color: #F87171;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>44</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>47</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>42</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>48</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>45</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>38</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(239,68,68,.15);color: #F87171;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>43</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>46</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>45</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>38</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Logistics
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="127.5,32.4 128.0,112.8 118.1,131.9 112.0,111.2" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>61</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}></span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>64</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>59</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>63</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>60</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>59</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(239,68,68,.15);color: #F87171;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>45</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>49</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>44</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>42</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Sales
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="133.8,33.2 127.9,113.4 116.6,131.7 112.1,110.6" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(245,158,11,.14);color: #FBBF24;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>52</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>55</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>49</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>58</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>54</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #F87171`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(239,68,68,.15)`)}>44</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>59</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>62</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>64</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>51</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Customer Success
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="144.7,35.9 127.6,114.5 113.8,131.0 112.4,109.5" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>56</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>58</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>54</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>60</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>57</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #FBBF24`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(245,158,11,.14)`)}>51</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>64</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>66</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>65</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>61</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Engineering
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="151.8,38.6 127.3,115.2 112.1,130.4 112.7,108.8" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>60</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}></span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>62</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>58</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>63</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>55</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>61</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>66</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>68</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>66</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>63</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Operations
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="159.6,42.5 126.9,116.0 110.1,129.4 113.1,108.0" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>63</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}></span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>66</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>61</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>65</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>60</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>62</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(16,185,129,.14);color: #34D399;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>70</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↑</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>72</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>70</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>68</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Marketing
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="161.8,43.8 126.8,116.2 109.6,129.1 113.2,107.8" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>64</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}></span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>67</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>60</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>66</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>62</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>65</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(16,185,129,.14);color: #34D399;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>71</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↑</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>73</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>72</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>68</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Product
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="168.0,48.0 126.4,116.8 108.0,128.0 113.6,107.2" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>67</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↑</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>70</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>65</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>69</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>64</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>67</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(16,185,129,.14);color: #34D399;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>74</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}></span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>76</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>74</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>72</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Design
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="172.9,52.0 126.0,117.3 106.8,127.0 114.0,106.7" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(235,245,255,.07);color: rgba(244,242,230,.9);font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>69</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↑</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>72</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>66</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>71</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>68</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>68</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(16,185,129,.14);color: #34D399;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>77</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↑</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>79</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>78</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>74</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 58px 16px 92px 6px repeat(5,56px) 24px 92px 6px repeat(3,56px);gap:4px;align-items:center;padding:4px 6px;border-radius:12px;cursor:pointer`)} className="hm-hob7451d">
                      <span style={s(`display:flex;align-items:center;gap:10px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#EF4444;display: none`)}></span>
                        Leadership
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px`)}>
                        <svg viewBox="0 0 240 128" width="64" height="34" style={s(`display:block`)}>
                          <path d="M32.0,112.0 A88,88 0 0 1 109.0,24.7" fill="none" stroke="rgba(239,68,68,.85)" strokeWidth="15"></path>
                          <path d="M109.0,24.7 A88,88 0 0 1 133.8,25.1" fill="none" stroke="rgba(245,158,11,.85)" strokeWidth="15"></path>
                          <path d="M133.8,25.1 A88,88 0 0 1 171.7,40.8" fill="none" stroke="rgba(235,245,255,.16)" strokeWidth="15"></path>
                          <path d="M171.7,40.8 A88,88 0 0 1 208.0,112.0" fill="none" stroke="rgba(16,185,129,.85)" strokeWidth="15"></path>
                          <polygon points="178.3,57.2 125.5,117.8 105.4,125.7 114.5,106.2" fill="#F6F4E9"></polygon>
                          <circle cx="120" cy="112" r="12" fill="#0A140D" stroke="#F6F4E9" strokeWidth="4"></circle>
                        </svg>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(16,185,129,.14);color: #34D399;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>72</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>↑</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>74</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>70</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>75</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: rgba(244,242,230,.62)`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: transparent`)}>68</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>73</span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:46px;border-radius:12px;background: rgba(16,185,129,.14);color: #34D399;font:400 21px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                        <span>80</span>
                        <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}></span>
                      </span>
                      <span></span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>82</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>81</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;font:400 14px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color: #34D399`)}>
                        <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background: rgba(16,185,129,.14)`)}>77</span>
                      </span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:148px 1fr;gap:4px;align-items:center;padding:4px 6px`)}>
                      <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>People & Finance</span>
                      <span style={s(`display:flex;align-items:center;height:46px;padding:0 16px;border-radius:12px;background:repeating-linear-gradient(135deg,rgba(228,240,214,.05) 0 5px,rgba(0,0,0,0) 5px 13px);font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Fewer than five people</span>
                    </div>
                  </div>
                  <div style={s(`display:flex;justify-content:space-between;align-items:center;padding:8px 6px 0;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>
                    <span style={s(`display:flex;gap:18px`)}>
                      <span style={s(`display:inline-flex;align-items:center;gap:7px`)}>
                        <span style={s(`width:12px;height:12px;border-radius:4px;background: rgba(16,185,129,.3)`)}></span>
                        70 and over
                      </span>
                      <span style={s(`display:inline-flex;align-items:center;gap:7px`)}>
                        <span style={s(`width:12px;height:12px;border-radius:4px;background: rgba(235,245,255,.1)`)}></span>
                        55–69 steady
                      </span>
                      <span style={s(`display:inline-flex;align-items:center;gap:7px`)}>
                        <span style={s(`width:12px;height:12px;border-radius:4px;background: rgba(245,158,11,.3)`)}></span>
                        46–54 needs care
                      </span>
                      <span style={s(`display:inline-flex;align-items:center;gap:7px`)}>
                        <span style={s(`width:12px;height:12px;border-radius:4px;background: rgba(239,68,68,.32)`)}></span>
                        45 and under
                      </span>
                    </span>
                    <span>The dial is the nørma Score, 0 to 10. Open a department for the figure.</span>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <a href="/for-leaders/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;margin-top:32px;padding:0 24px;border-radius:999px;background:#F4F2E6;color:#14231A;font:600 15.5px 'DM Sans',sans-serif`)} className="hm-hof85d92 hm-ac3e8255">
            See the dashboard
            <span aria-hidden="true">›</span>
          </a>
          <div style={s(`margin:clamp(88px,11vw,144px) calc(-1 * clamp(0px,2.6vw,32px)) 0;padding:clamp(32px,5vw,64px);border-radius:36px 24px 34px 22px / 24px 36px 22px 34px;background:radial-gradient(60% 90% at 6% 0%,rgba(217,234,110,.17) 0%,rgba(217,234,110,.05) 45%,rgba(217,234,110,0) 72%),linear-gradient(165deg,#1C3826,#142A1C 72%);box-shadow:inset 0 1px 0 rgba(234,247,155,.12),0 18px 44px rgba(0,0,0,.28);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:28px clamp(40px,6vw,96px);align-items:start`)}>
            <div>
              <span style={s(`width:52px;height:52px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.2);box-shadow:0 0 30px rgba(217,234,110,.3);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                  <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"></path>
                </svg>
              </span>
              <h3 style={s(`margin:24px 0 0;max-width:10em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Leaders see patterns, never people.</h3>
            </div>
            <div style={s(`padding-top:clamp(0px,1vw,76px)`)}>
              <p style={s(`margin:0;max-width:34em;font:400 17px/1.65 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                Nobody where someone works can read their check-in answers, reflections or recordings. Answers become a group figure before anything reaches a dashboard, and groups below five never appear. A design decision, not a setting.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(88px,11vw,152px);padding-bottom:clamp(72px,9vw,120px)`)}>
          <div style={s(`position:relative;max-width:620px;margin:0 auto;box-sizing:border-box;padding:clamp(72px,9vw,120px) clamp(24px,5vw,64px) clamp(52px,6vw,80px);text-align:center`)}>
            {(V.doorway) ? (
              <>
                <div aria-hidden="true" style={s(`position:absolute;inset:0;border-radius:310px 310px 32px 26px / 310px 310px 32px 26px;background:radial-gradient(62% 40% at 50% 16%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 50%,#ECE8D7 100%)`)}></div>
              </>
            ) : null}
            <div style={s(`position:relative`)}>
              <img src="/assets/v5/norma-happy.png" alt="" width="92" height="124" style={s(`display:block;margin:0 auto;filter:drop-shadow(0 0 1px rgba(20,35,26,.7)) drop-shadow(0 14px 20px rgba(20,35,26,.16))`)} />
              <h2 style={s(`margin:26px auto 0;max-width:11em;font:400 clamp(40px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;text-wrap:balance`)}>Fulfilled people. Honest culture.</h2>
              <p style={s(`margin:20px auto 0;max-width:24em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>One system, both sides. Challenging the nørm of employee wellbeing.</p>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;margin-top:34px;padding:0 28px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="hm-ac3e8255">Book a demo</a>
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
              <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">Your people</a>
              <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">For leaders</a>
              <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">ROI</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">Help</a>
              <a href="/book-a-demo/" style={s(`color:rgba(20,35,26,.72)`)} className="hm-ho789e87">Book a demo</a>
            </nav>
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(20,35,26,.08);font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>
            <span>© 2026 The Artistry of Humanity Pty Ltd</span>
            <span style={s(`display:flex;flex-wrap:wrap;gap:20px`)}>
              <a href="/privacy/" style={s(`color:rgba(20,35,26,.66)`)} className="hm-ho789e87">Privacy policy</a>
              <a href="/terms/" style={s(`color:rgba(20,35,26,.66)`)} className="hm-ho789e87">Terms of use</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.66)`)} className="hm-ho789e87">Help centre</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
      </>
    );
  }
}

export default HomePage;
