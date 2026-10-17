// @ts-nocheck
/* Generated from the design handoff (design_handoff_v5/reference) by dc2jsx.
   Markup and styles are verbatim from the reference; logic is the reference's
   own renderVals/state code. Since 17 Oct 2026 this file also carries design
   changes made here after the handoff (git log shows each), so regenerating
   from the reference would drop them: diff before rerunning build-v5.sh. */
import React from 'react';
import { s } from '../../lib/s';
import './ForLeaders.dc.css';


const LV = [
  { kind: 'Organisation', name: 'Northwind', vals: [62, 59, 64, 60, 58], cmp: null },
  { kind: 'Department', name: 'Field Services', vals: [47, 42, 48, 45, 38], cmp: 0 },
  { kind: 'Team', name: 'Night crew', vals: [33, 29, 35, 31, 22], cmp: 0 }
];
const PILLARS = ['Health & Fitness', 'Internal Work', 'Love & Relationships', 'Social Connection', 'Work & Life Flow'];
const PC = ['#9FD6AB', '#B9B2E8', '#EBAFA6', '#EFD19A', '#9CCFDD'];
const band = v => v >= 70 ? '#D9EA6E' : v >= 55 ? '#F4F2E6' : v >= 46 ? '#E6C77E' : '#F0A58C';
const pts = v => v.map((x, i) => { const a = (-90 + 72 * i) * Math.PI / 180, r = 80 * x / 100; return [100 + r * Math.cos(a), 100 + r * Math.sin(a)]; });
const soft = (p, t = .16) => { const n = p.length, L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], f = q => q[0].toFixed(1) + ' ' + q[1].toFixed(1); let d = ''; for (let i = 0; i < n; i++) { const P = p[i], A = L(P, p[(i + n - 1) % n]), B = L(P, p[(i + 1) % n]); d += (i ? ' L' : 'M') + f(A) + ' Q' + f(P) + ' ' + f(B); } return d + ' Z'; };
class ForLeaders extends React.Component {
  state = { narrow: false, menu: false, lv: 0, pv: LV[0].vals.slice(), pc: LV[0].vals.slice(), pd: LV[0].vals.slice() };
  rootRef = React.createRef(); tourRef = React.createRef(); tourImg = React.createRef(); levelsRef = React.createRef(); swarmRef = React.createRef();
  componentDidMount() {
    this.motion = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.onResize = () => { const n = window.innerWidth < 760; if (Math.abs((this.state.vw || 0) - window.innerWidth) > 1) this.setState({ vw: window.innerWidth }); if (n !== this.state.narrow) this.setState({ narrow: n, menu: n ? this.state.menu : false }); this.tour(); };
    window.addEventListener('resize', this.onResize); this.onResize();
    this.onScroll = () => { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = 0; this.tour(); }); };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.io = new IntersectionObserver(es => (this.ioFired = true, es).forEach(en => { if (en.isIntersecting) { this.show(en.target); this.io.unobserve(en.target); } }), { rootMargin: '0px 0px -12% 0px' });
    this.armReveals();
    this.lio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !this.cycle && !this.picked) this.cycle = setInterval(() => this.setLevel((this.state.lv + 1) % 3), 3800); else if (!en.isIntersecting && this.cycle) { clearInterval(this.cycle); this.cycle = 0; } }), { threshold: .35 });
    if (this.levelsRef.current) this.lio.observe(this.levelsRef.current);
    this.safety = setTimeout(() => { const r = this.rootRef.current; if (r && !this.ioFired) r.querySelectorAll('[data-reveal]').forEach(el => { if (el.style.opacity === '0' || el.style.strokeDashoffset === '1') this.show(el); }); }, 4000);
  }
  componentDidUpdate() { this.armReveals(); this.tour(); }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); window.removeEventListener('scroll', this.onScroll); cancelAnimationFrame(this.raf); clearTimeout(this.safety); clearInterval(this.cycle); cancelAnimationFrame(this.lraf); if (this.lio) this.lio.disconnect(); if (this.io) this.io.disconnect(); }
  // Elements below the fold start hidden and settle in once, when they scroll into view.
  armReveals() {
    const root = this.rootRef.current; if (!root || !this.io) return;
    root.querySelectorAll('[data-reveal]').forEach(el => {
      if (el.__armed) return; el.__armed = true;
      if (!this.motion || el.getBoundingClientRect().top < window.innerHeight * .9) return;
      const t = el.dataset.reveal; el.style.transition = 'none';
      if (t === 'draw') el.style.strokeDashoffset = '1';
      else { el.style.opacity = '0'; el.style.transform = t === 'pop' ? 'scale(.6)' : 'translateY(28px)'; }
      this.io.observe(el);
    });
  }
  show(el) {
    const d = (el.dataset.delay || 0) + 's', t = el.dataset.reveal, e = 'cubic-bezier(.22,.61,.36,1)';
    el.style.transition = t === 'draw' ? 'stroke-dashoffset 1.6s ' + e + ' ' + d : 'opacity .9s ease ' + d + ', transform 1.1s ' + e + ' ' + d;
    if (t === 'draw') el.style.strokeDashoffset = '0'; else { el.style.opacity = '1'; el.style.transform = 'none'; }
  }
  // The dashboard scrolls inside its window while the section is pinned.
  swarm() {
    const box = this.swarmRef.current; if (!box) return;
    if (!this.swarmEls) this.swarmEls = Array.from(box.children).filter(el => el.dataset.sx).map(el => ({ el, x: +el.dataset.sx, y: +el.dataset.sy }));
    const r = box.getBoundingClientRect(), vh = window.innerHeight, w = r.width;
    const p = this.motion ? Math.min(1, Math.max(0, (vh - r.top) / (vh * .75))) : 1, k = 1 - p * p * (3 - 2 * p);
    this.swarmEls.forEach(s => { const d = 1 - s.y; s.el.style.transform = 'translate(-50%,-50%) translate(' + ((s.x - .5) * w * .22 * d * k).toFixed(1) + 'px,' + (-w * .09 * (.4 + d) * k).toFixed(1) + 'px)'; });
  }
  tour() {
    this.swarm();
    const box = this.tourRef.current, im = this.tourImg.current; if (!box || !im) return;
    const r = box.getBoundingClientRect(), view = im.parentElement.clientHeight, range = Math.max(0, im.offsetHeight - view);
    const span = Math.max(1, r.height - window.innerHeight * .8), p = Math.min(1, Math.max(0, -r.top / span));
    im.style.transform = 'translateY(' + (-range * p).toFixed(1) + 'px)';
  }
  pick(i) { this.picked = true; clearInterval(this.cycle); this.cycle = 0; this.setLevel(i); }
  // Tween the pentagon between levels so the shape visibly changes with the score.
  setLevel(i) {
    const L = LV[i], fromV = this.state.pv.slice(), fromC = this.state.pc.slice(), fromD = this.state.pd.slice(), toD = i === 2 ? LV[1].vals : L.vals;
    const toV = L.vals, toC = L.cmp == null ? L.vals : LV[L.cmp].vals, t0 = performance.now(), dur = this.motion ? 720 : 0;
    cancelAnimationFrame(this.lraf); this.setState({ lv: i });
    const tick = now => {
      const k = dur ? Math.min(1, (now - t0) / dur) : 1, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      this.setState({ pv: fromV.map((v, j) => v + (toV[j] - v) * e), pc: fromC.map((v, j) => v + (toC[j] - v) * e), pd: fromD.map((v, j) => v + (toD[j] - v) * e) });
      if (k < 1) this.lraf = requestAnimationFrame(tick);
    };
    this.lraf = requestAnimationFrame(tick);
  }
  renderVals() {
    const { narrow, menu, lv, pv, pc, pd } = this.state, L = LV[lv];
    const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
    const SHP = ['30px 20px 32px 22px / 22px 32px 20px 30px', '20px 32px 22px 30px / 32px 22px 30px 20px', '32px 22px 30px 20px / 20px 30px 22px 32px'];
    const levels = LV.map((l, i) => { const sel = i === lv, sc = Math.round(mean(l.vals)); return { kind: l.kind, name: l.name, score: sc, col: band(sc), sel, pick: () => this.pick(i), indent: i * 28 + 'px', shape: SHP[i], bg: sel ? 'rgba(217,234,110,.12)' : 'rgba(228,240,214,.05)', ring: sel ? 'inset 0 0 0 1px rgba(217,234,110,.5)' : 'inset 0 0 0 1px rgba(228,240,214,0)', eyeCol: sel ? '#DCEC85' : 'rgba(201,212,194,.72)' }; });
    const score = Math.round(mean(pv));
    const extra = { levelsRef: this.levelsRef, levels, penD: soft(pts(pv)), cmpD: soft(pts(pc)), cmpOp: L.cmp == null ? 0 : 1, deptD: soft(pts(pd)), deptOp: lv === 2 ? 1 : 0,
      dots: pts(pv).map((p, i) => ({ left: (p[0] / 2).toFixed(2) + '%', top: (p[1] / 2).toFixed(2) + '%', c: PC[i] })),
      lvlScore: score, lvlCol: band(score), lvlName: L.name, cmpLabel: L.cmp == null ? '' : LV[L.cmp].name,
      rows: PILLARS.map((n, i) => ({ name: n, c: PC[i], v: Math.round(pv[i]), col: band(pv[i]), cmp: L.cmp == null ? '' : Math.round(pc[i]) })) };
    return { ...extra, swarmRef: this.swarmRef, rootRef: this.rootRef, tourRef: this.tourRef, tourImg: this.tourImg, wide: !narrow, narrow, menuOpen: narrow && menu, toggleMenu: () => this.setState(s => ({ menu: !s.menu })) };
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
                  <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">Your people</a>
                  <a href="/for-leaders/" style={s(`color:#14231A;padding:4px 0 2px;border-bottom:2px solid #D3E45F`)} className="fl-ho789e87">For leaders</a>
                  <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">ROI</a>
                  <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">Help</a>
                </nav>
              </>
            ) : null}
            <div style={s(`display:flex;align-items:center;gap:10px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:44px;padding:0 16px;white-space:nowrap;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px rgba(217,234,110,.22)`)} className="fl-ac3e8255">Book a demo</a>
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
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(104px,12vw,160px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,5vw,64px)`)}>
          <div style={s(`flex:1 1 340px;min-width:0;max-width:480px`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>For leaders · the dashboard</span>
            <h1 style={s(`margin:16px 0 0;font:400 clamp(44px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance;padding-bottom:.14em;margin-bottom:-.14em`)}>See how your people are really doing.</h1>
            <p style={s(`margin:28px 0 0;max-width:27em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
              nørma brings Fulfilment and Culture together in one dashboard. You see where to look, what to do about it, and whether it worked.
            </p>
            <div style={s(`display:flex;flex-wrap:wrap;gap:12px;margin-top:36px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 24px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="fl-ac3e8255">Book a demo</a>
              <a href="#together" style={s(`display:inline-flex;align-items:center;height:54px;box-sizing:border-box;padding:0 24px;border-radius:999px;border:1px solid rgba(20,35,26,.2);color:#14231A;font:600 15.5px 'DM Sans',sans-serif`)} className="fl-ho2976a3">How it comes together</a>
            </div>
          </div>
          <div style={s(`flex:1.5 1 460px;min-width:0;position:relative`)}>
            <div aria-hidden="true" style={s(`position:absolute;left:10%;right:-4%;top:-10%;bottom:-14%;border-radius:999px 999px 30px 24px / 480px 480px 30px 24px;background:radial-gradient(64% 36% at 50% 10%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 60%)`)}></div>
            {(V.wide) ? (
              <>
                <div style={s(`position:relative;padding-bottom:12%`)}>
                  <div style={s(`position:relative;aspect-ratio:16/10;border-radius:22px 16px 24px 14px / 16px 24px 14px 22px;overflow:hidden;background:#0A140D;box-shadow:0 46px 90px -34px rgba(20,35,26,.6),0 0 0 1px rgba(20,35,26,.12)`)}>
                    <div style={s(`height:26px;display:flex;align-items:center;gap:6px;padding:0 12px;background:#111D15;border-bottom:1px solid rgba(228,240,214,.06)`)}>
                      <span style={s(`width:8px;height:8px;border-radius:50%;background:rgba(228,240,214,.18)`)}></span>
                      <span style={s(`width:8px;height:8px;border-radius:50%;background:rgba(228,240,214,.18)`)}></span>
                      <span style={s(`width:8px;height:8px;border-radius:50%;background:rgba(228,240,214,.18)`)}></span>
                    </div>
                    <img src="/assets/v5/web/dash/01-home.jpg" alt="The nørma leader dashboard for Northwind: nørma Score, Fulfilment 61, Culture 61 with Needs attention, a focus area and the start of every department" style={s(`display:block;width:100%;height:auto`)} />
                  </div>
                  <div data-reveal="up" data-delay=".5" style={s(`position:absolute;right:-5%;bottom:0;width:36%;box-sizing:border-box;padding:16px 16px 18px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;background:linear-gradient(170deg,#18291D,#0F1C13 80%);box-shadow:0 40px 70px -24px rgba(20,35,26,.75),0 0 0 1px rgba(228,240,214,.12)`)}>
                    <span style={s(`display:block;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>Fulfilment</span>
                    {' '}
                    <span style={s(`display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:6px;font:500 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>
                      <span style={s(`display:inline-flex;align-items:center;gap:6px`)}>
                        <span style={s(`width:12px;height:2px;border-radius:2px;background:#D9EA6E`)}></span>
                        Field Services
                      </span>
                      <span style={s(`display:inline-flex;align-items:center;gap:6px`)}>
                        <span style={s(`width:12px;height:0;border-top:2px dashed rgba(244,242,230,.55)`)}></span>
                        Northwind
                      </span>
                    </span>
                    <div style={s(`position:relative;width:100%;aspect-ratio:1;margin-top:6px`)}>
                      <svg viewBox="0 0 200 200" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;overflow:visible`)}>
                        <path d="M84.8 31.1 Q100.0 20.0 115.2 31.1 L160.9 64.2 Q176.1 75.3 170.3 93.2 L152.8 146.8 Q147.0 164.7 128.2 164.7 L71.8 164.7 Q53.0 164.7 47.2 146.8 L29.7 93.2 Q23.9 75.3 39.1 64.2 Z" fill="none" stroke="rgba(217,234,110,.2)" strokeWidth="1.2"></path>
                        <path d="M92.4 65.5 Q100.0 60.0 107.6 65.5 L130.4 82.1 Q138.0 87.6 135.1 96.6 L126.4 123.4 Q123.5 132.4 114.1 132.4 L85.9 132.4 Q76.5 132.4 73.6 123.4 L64.9 96.6 Q62.0 87.6 69.6 82.1 Z" fill="none" stroke="rgba(228,240,214,.07)" strokeWidth="1"></path>
                        <path d="M92.9 56.0 Q100.0 50.4 107.2 56.0 L137.7 79.8 Q144.9 85.4 142.5 94.4 L132.5 132.5 Q130.1 141.4 120.8 141.0 L81.1 139.2 Q71.8 138.8 69.2 130.3 L58.4 94.2 Q55.9 85.7 62.9 80.0 Z" fill="none" stroke="rgba(244,242,230,.5)" strokeWidth="1.4" strokeDasharray="4 4"></path>
                        <path d="M95.4 66.9 Q100.0 62.4 105.1 66.8 L126.8 85.3 Q132.0 89.6 130.5 96.2 L124.1 124.4 Q122.6 131.1 115.6 130.8 L85.8 129.4 Q78.8 129.1 77.6 123.0 L72.3 96.8 Q71.1 90.6 75.7 86.1 Z" fill="rgba(217,234,110,.14)" stroke="#D9EA6E" strokeWidth="2.2" strokeLinejoin="round"></path>
                      </svg>
                      {' '}
                      <span style={s(`position:absolute;left:50.00%;top:31.20%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#9FD6AB`)}></span>
                      <span style={s(`position:absolute;left:65.98%;top:44.81%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#B9B2E8`)}></span>
                      <span style={s(`position:absolute;left:61.29%;top:65.53%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#EBAFA6`)}></span>
                      <span style={s(`position:absolute;left:39.42%;top:64.56%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#EFD19A`)}></span>
                      <span style={s(`position:absolute;left:35.54%;top:45.30%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#9CCFDD`)}></span>
                      {' '}
                      <span style={s(`position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);font:400 clamp(22px,2.4vw,32px)/1 'DM Serif Display',serif;color:#F0A58C`)}>44</span>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {(V.narrow) ? (
              <>
                <div style={s(`position:relative;max-width:360px;margin:0 auto;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;overflow:hidden;background:#0F2015;box-shadow:0 46px 90px -34px rgba(20,35,26,.6)`)}>
                  <img src="/assets/v5/web/dash/m-score-dial.jpg" alt="The nørma Score dial" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <section id="together" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;left:15%;right:15%;bottom:0;height:70%;background:radial-gradient(50% 60% at 50% 70%,rgba(217,234,110,.09),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`text-align:center`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>How it comes together</span>
            <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance;margin-left:auto;margin-right:auto`)}>Your people use the app. You see the whole picture.</h2>
            <p style={s(`margin:20px auto 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty;`)}>
              Once a month, each person checks in on their life and their work. In between, the app is their companion: reflecting, building habits, resetting when they need to. All of it comes together in your dashboard as one picture of your organisation.
            </p>
          </div>
          <div ref={V.swarmRef} aria-hidden="true" style={s(`position:relative;margin:clamp(48px,6vw,80px) auto 0;max-width:1100px;aspect-ratio:1100/340;-webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 42%);mask-image:linear-gradient(180deg,transparent 0%,#000 42%)`)}>
            <span data-sx="0.447" data-sy="0.041" style={s(`position:absolute;left:44.74%;top:4.05%;will-change:transform;width:1.55%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.25`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-83deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="82 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.025" data-sy="0.043" style={s(`position:absolute;left:2.54%;top:4.31%;will-change:transform;width:1.41%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.25`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-99deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="72 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.386" data-sy="0.067" style={s(`position:absolute;left:38.60%;top:6.69%;will-change:transform;width:1.94%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.27`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-109deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="69 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.501" data-sy="0.072" style={s(`position:absolute;left:50.10%;top:7.22%;will-change:transform;width:1.68%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.27`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-100deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="84 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.713" data-sy="0.075" style={s(`position:absolute;left:71.35%;top:7.49%;will-change:transform;width:1.92%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.27`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-79deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="75 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.561" data-sy="0.087" style={s(`position:absolute;left:56.06%;top:8.70%;will-change:transform;width:1.99%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.28`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-78deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="75 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.851" data-sy="0.111" style={s(`position:absolute;left:85.08%;top:11.05%;will-change:transform;width:1.80%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.30`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-99deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="58 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.064" data-sy="0.114" style={s(`position:absolute;left:6.44%;top:11.39%;will-change:transform;width:2.03%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.30`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-84deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="81 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.025" data-sy="0.143" style={s(`position:absolute;left:2.47%;top:14.32%;will-change:transform;width:1.72%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.32`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-98deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="43 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.466" data-sy="0.157" style={s(`position:absolute;left:46.64%;top:15.66%;will-change:transform;width:2.22%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.33`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-108deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="80 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.708" data-sy="0.169" style={s(`position:absolute;left:70.81%;top:16.94%;will-change:transform;width:2.20%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.34`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-75deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="60 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.149" data-sy="0.177" style={s(`position:absolute;left:14.95%;top:17.71%;will-change:transform;width:1.82%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.34`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-73deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="76 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.357" data-sy="0.182" style={s(`position:absolute;left:35.75%;top:18.25%;will-change:transform;width:2.07%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.35`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-101deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="68 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.801" data-sy="0.184" style={s(`position:absolute;left:80.14%;top:18.37%;will-change:transform;width:2.15%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.35`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-107deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="76 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.181" data-sy="0.196" style={s(`position:absolute;left:18.06%;top:19.57%;will-change:transform;width:1.82%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.36`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-82deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="59 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.387" data-sy="0.215" style={s(`position:absolute;left:38.66%;top:21.49%;will-change:transform;width:2.18%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.37`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-71deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="73 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.935" data-sy="0.233" style={s(`position:absolute;left:93.50%;top:23.33%;will-change:transform;width:2.29%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.38`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-95deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="53 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.571" data-sy="0.265" style={s(`position:absolute;left:57.10%;top:26.54%;will-change:transform;width:2.39%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.41`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-74deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="51 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.718" data-sy="0.288" style={s(`position:absolute;left:71.83%;top:28.79%;will-change:transform;width:2.38%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.42`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-78deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="51 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.131" data-sy="0.300" style={s(`position:absolute;left:13.05%;top:30.03%;will-change:transform;width:2.53%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.43`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-107deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="82 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.194" data-sy="0.316" style={s(`position:absolute;left:19.44%;top:31.57%;will-change:transform;width:2.33%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.44`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-106deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="84 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.606" data-sy="0.322" style={s(`position:absolute;left:60.62%;top:32.16%;will-change:transform;width:2.16%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.45`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-94deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="65 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.497" data-sy="0.330" style={s(`position:absolute;left:49.74%;top:33.03%;will-change:transform;width:2.51%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.45`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-104deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="45 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.243" data-sy="0.345" style={s(`position:absolute;left:24.30%;top:34.48%;will-change:transform;width:2.60%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.46`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-89deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="73 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.398" data-sy="0.354" style={s(`position:absolute;left:39.83%;top:35.36%;will-change:transform;width:2.67%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.47`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-86deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="59 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.769" data-sy="0.367" style={s(`position:absolute;left:76.86%;top:36.73%;will-change:transform;width:2.28%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.48`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-79deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="75 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.466" data-sy="0.393" style={s(`position:absolute;left:46.62%;top:39.32%;will-change:transform;width:2.86%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.50`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-99deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="83 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.825" data-sy="0.395" style={s(`position:absolute;left:82.54%;top:39.46%;will-change:transform;width:2.59%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.50`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-100deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="65 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.361" data-sy="0.426" style={s(`position:absolute;left:36.15%;top:42.60%;will-change:transform;width:2.71%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.52`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-74deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="72 100"></circle>
              </svg>
              <img src="/assets/v5/people/e28.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.210" data-sy="0.427" style={s(`position:absolute;left:21.02%;top:42.66%;will-change:transform;width:2.75%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.52`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-103deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="47 100"></circle>
              </svg>
              <img src="/assets/v5/people/e24.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.116" data-sy="0.437" style={s(`position:absolute;left:11.64%;top:43.73%;will-change:transform;width:2.65%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.53`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="56 100"></circle>
              </svg>
              <img src="/assets/v5/people/e20.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.876" data-sy="0.447" style={s(`position:absolute;left:87.62%;top:44.68%;will-change:transform;width:2.68%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.53`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-76deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="68 100"></circle>
              </svg>
              <img src="/assets/v5/people/e16.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.512" data-sy="0.461" style={s(`position:absolute;left:51.18%;top:46.15%;will-change:transform;width:2.77%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.54`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-93deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="41 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.327" data-sy="0.491" style={s(`position:absolute;left:32.68%;top:49.06%;will-change:transform;width:2.88%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.56`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-95deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="47 100"></circle>
              </svg>
              <img src="/assets/v5/people/e12.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.673" data-sy="0.499" style={s(`position:absolute;left:67.30%;top:49.86%;will-change:transform;width:3.04%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.57`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-91deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="46 100"></circle>
              </svg>
              <img src="/assets/v5/people/mei.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.433" data-sy="0.502" style={s(`position:absolute;left:43.31%;top:50.21%;will-change:transform;width:2.80%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.57`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-96deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="58 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.932" data-sy="0.504" style={s(`position:absolute;left:93.25%;top:50.35%;will-change:transform;width:3.06%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.57`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-75deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="43 100"></circle>
              </svg>
              <img src="/assets/v5/people/e31.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.599" data-sy="0.512" style={s(`position:absolute;left:59.93%;top:51.18%;will-change:transform;width:2.67%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.58`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-95deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="71 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.722" data-sy="0.517" style={s(`position:absolute;left:72.20%;top:51.70%;will-change:transform;width:2.78%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.58`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-73deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="62 100"></circle>
              </svg>
              <img src="/assets/v5/people/e27.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.070" data-sy="0.528" style={s(`position:absolute;left:7.00%;top:52.78%;will-change:transform;width:2.99%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.59`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-76deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="72 100"></circle>
              </svg>
              <img src="/assets/v5/people/e23.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.804" data-sy="0.530" style={s(`position:absolute;left:80.38%;top:52.97%;will-change:transform;width:2.95%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.59`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-72deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="70 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.472" data-sy="0.536" style={s(`position:absolute;left:47.21%;top:53.59%;will-change:transform;width:2.99%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.60`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-95deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="71 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.154" data-sy="0.539" style={s(`position:absolute;left:15.43%;top:53.94%;will-change:transform;width:3.08%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.60`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-74deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="84 100"></circle>
              </svg>
              <img src="/assets/v5/people/e19.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.292" data-sy="0.548" style={s(`position:absolute;left:29.19%;top:54.77%;will-change:transform;width:3.29%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.60`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-98deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="53 100"></circle>
              </svg>
              <img src="/assets/v5/people/e15.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.862" data-sy="0.561" style={s(`position:absolute;left:86.17%;top:56.12%;will-change:transform;width:2.86%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.61`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-107deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="41 100"></circle>
              </svg>
              <img src="/assets/v5/people/e11.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.389" data-sy="0.572" style={s(`position:absolute;left:38.94%;top:57.21%;will-change:transform;width:3.30%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.62`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-80deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="67 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.502" data-sy="0.632" style={s(`position:absolute;left:50.19%;top:63.22%;will-change:transform;width:3.16%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.66`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-105deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="65 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.099" data-sy="0.637" style={s(`position:absolute;left:9.86%;top:63.75%;will-change:transform;width:3.52%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.67`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-82deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="56 100"></circle>
              </svg>
              <img src="/assets/v5/people/mateo.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.201" data-sy="0.642" style={s(`position:absolute;left:20.09%;top:64.16%;will-change:transform;width:3.32%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.67`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-93deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="80 100"></circle>
              </svg>
              <img src="/assets/v5/people/e30.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.790" data-sy="0.689" style={s(`position:absolute;left:79.05%;top:68.89%;will-change:transform;width:3.42%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.70`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-80deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="52 100"></circle>
              </svg>
              <img src="/assets/v5/people/e26.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.559" data-sy="0.695" style={s(`position:absolute;left:55.94%;top:69.51%;will-change:transform;width:3.59%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.71`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="61 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.855" data-sy="0.742" style={s(`position:absolute;left:85.46%;top:74.23%;will-change:transform;width:3.70%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.74`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="58 100"></circle>
              </svg>
              <img src="/assets/v5/people/e22.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.408" data-sy="0.761" style={s(`position:absolute;left:40.79%;top:76.14%;will-change:transform;width:3.40%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.75`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-89deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="58 100"></circle>
              </svg>
              <img src="/assets/v5/people/e18.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.164" data-sy="0.765" style={s(`position:absolute;left:16.45%;top:76.55%;will-change:transform;width:3.68%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.76`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-103deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="48 100"></circle>
              </svg>
              <img src="/assets/v5/people/e14.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.677" data-sy="0.766" style={s(`position:absolute;left:67.71%;top:76.63%;will-change:transform;width:3.49%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.76`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-91deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="44 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.317" data-sy="0.794" style={s(`position:absolute;left:31.65%;top:79.37%;will-change:transform;width:3.85%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.78`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-77deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="48 100"></circle>
              </svg>
              <img src="/assets/v5/people/e10.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.115" data-sy="0.794" style={s(`position:absolute;left:11.48%;top:79.44%;will-change:transform;width:3.80%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.78`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-89deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="74 100"></circle>
              </svg>
              <img src="/assets/v5/people/leila.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.487" data-sy="0.798" style={s(`position:absolute;left:48.71%;top:79.76%;will-change:transform;width:3.73%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.78`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-92deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="57 100"></circle>
              </svg>
              <img src="/assets/v5/people/e29.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.537" data-sy="0.847" style={s(`position:absolute;left:53.74%;top:84.70%;will-change:transform;width:3.95%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.81`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-108deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="77 100"></circle>
              </svg>
              <img src="/assets/v5/people/e25.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.787" data-sy="0.849" style={s(`position:absolute;left:78.75%;top:84.88%;will-change:transform;width:3.79%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.81`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-72deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="64 100"></circle>
              </svg>
              <img src="/assets/v5/people/e21.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.365" data-sy="0.852" style={s(`position:absolute;left:36.55%;top:85.23%;will-change:transform;width:4.09%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.82`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-76deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="67 100"></circle>
              </svg>
              <img src="/assets/v5/people/e17.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.585" data-sy="0.854" style={s(`position:absolute;left:58.52%;top:85.39%;will-change:transform;width:3.67%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.82`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-81deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="62 100"></circle>
              </svg>
              <img src="/assets/v5/people/e13.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
            <span data-sx="0.640" data-sy="0.873" style={s(`position:absolute;left:64.03%;top:87.35%;will-change:transform;width:4.17%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.83`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-104deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="74 100"></circle>
              </svg>
              <span style={s(`position:absolute;left:24%;top:24%;width:52%;height:52%;border-radius:50%;background:rgba(228,240,214,.1)`)}></span>
            </span>
            <span data-sx="0.722" data-sy="0.880" style={s(`position:absolute;left:72.15%;top:87.99%;will-change:transform;width:3.91%;aspect-ratio:1;transform:translate(-50%,-50%);opacity:0.84`)}>
              <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-103deg)`)}>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2.4"></circle>
                <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2.4" strokeLinecap="round" pathlength="100" strokeDasharray="81 100"></circle>
              </svg>
              <img src="/assets/v5/people/e09.jpg" alt="" loading="lazy" style={s(`position:absolute;left:12%;top:12%;width:76%;height:76%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
            </span>
          </div>
          <div style={s(`margin:clamp(16px,2vw,24px) auto 0;max-width:720px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px`)}>
            <div data-reveal="up" data-delay="0.00" style={s(`display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0`)}>
              <span style={s(`position:relative;width:clamp(52px,6.4vw,76px);aspect-ratio:1`)}>
                <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2"></circle>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" pathlength="100" strokeDasharray="76 100"></circle>
                </svg>
                {' '}
                <img src="/assets/v5/people/kenji.jpg" alt="Kenji" style={s(`position:absolute;left:10%;top:10%;width:80%;height:80%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
              </span>
              <span style={s(`display:flex;flex-direction:column;align-items:center;gap:3px`)}>
                <span style={s(`font:400 clamp(20px,2vw,24px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>76</span>
                <span style={s(`font:500 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Kenji</span>
              </span>
            </div>
            <div data-reveal="up" data-delay="0.09" style={s(`display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0`)}>
              <span style={s(`position:relative;width:clamp(52px,6.4vw,76px);aspect-ratio:1`)}>
                <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2"></circle>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" pathlength="100" strokeDasharray="49 100"></circle>
                </svg>
                {' '}
                <img src="/assets/v5/people/amara.jpg" alt="Amara" style={s(`position:absolute;left:10%;top:10%;width:80%;height:80%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
              </span>
              <span style={s(`display:flex;flex-direction:column;align-items:center;gap:3px`)}>
                <span style={s(`font:400 clamp(20px,2vw,24px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>49</span>
                <span style={s(`font:500 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Amara</span>
              </span>
            </div>
            <div data-reveal="up" data-delay="0.18" style={s(`display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0`)}>
              <span style={s(`position:relative;width:clamp(52px,6.4vw,76px);aspect-ratio:1`)}>
                <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2"></circle>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" pathlength="100" strokeDasharray="59 100"></circle>
                </svg>
                {' '}
                <img src="/assets/v5/people/laura.jpg" alt="Laura" style={s(`position:absolute;left:10%;top:10%;width:80%;height:80%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
              </span>
              <span style={s(`display:flex;flex-direction:column;align-items:center;gap:3px`)}>
                <span style={s(`font:400 clamp(20px,2vw,24px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>59</span>
                <span style={s(`font:500 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Laura</span>
              </span>
            </div>
            <div data-reveal="up" data-delay="0.27" style={s(`display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0`)}>
              <span style={s(`position:relative;width:clamp(52px,6.4vw,76px);aspect-ratio:1`)}>
                <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2"></circle>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" pathlength="100" strokeDasharray="81 100"></circle>
                </svg>
                {' '}
                <img src="/assets/v5/people/tom.jpg" alt="Tom" style={s(`position:absolute;left:10%;top:10%;width:80%;height:80%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
              </span>
              <span style={s(`display:flex;flex-direction:column;align-items:center;gap:3px`)}>
                <span style={s(`font:400 clamp(20px,2vw,24px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>81</span>
                <span style={s(`font:500 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Tom</span>
              </span>
            </div>
            <div data-reveal="up" data-delay="0.36" style={s(`display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0`)}>
              <span style={s(`position:relative;width:clamp(52px,6.4vw,76px);aspect-ratio:1`)}>
                <svg viewBox="0 0 52 52" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)`)}>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="2"></circle>
                  <circle cx="26" cy="26" r="24.5" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" pathlength="100" strokeDasharray="66 100"></circle>
                </svg>
                {' '}
                <img src="/assets/v5/people/priya.jpg" alt="Priya" style={s(`position:absolute;left:10%;top:10%;width:80%;height:80%;border-radius:50%;object-fit:cover;object-position:50% 22%;display:block`)} />
              </span>
              <span style={s(`display:flex;flex-direction:column;align-items:center;gap:3px`)}>
                <span style={s(`font:400 clamp(20px,2vw,24px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>66</span>
                <span style={s(`font:500 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Priya</span>
              </span>
            </div>
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={s(`display:block;width:min(720px,100%);height:clamp(70px,9vw,120px);margin:18px auto 0;overflow:visible`)}>
            <g fill="none" stroke="#D9EA6E" strokeOpacity=".45" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={s(`vector-effect:non-scaling-stroke`)}>
              <path data-reveal="draw" data-delay="0.45" d="M10 0 C10 55 50 45 50 100" pathlength="1" strokeDasharray="1" strokeDashoffset="0"></path>
              <path data-reveal="draw" data-delay="0.51" d="M30 0 C30 55 50 45 50 100" pathlength="1" strokeDasharray="1" strokeDashoffset="0"></path>
              <path data-reveal="draw" data-delay="0.57" d="M50 0 C50 55 50 45 50 100" pathlength="1" strokeDasharray="1" strokeDashoffset="0"></path>
              <path data-reveal="draw" data-delay="0.63" d="M70 0 C70 55 50 45 50 100" pathlength="1" strokeDasharray="1" strokeDashoffset="0"></path>
              <path data-reveal="draw" data-delay="0.69" d="M90 0 C90 55 50 45 50 100" pathlength="1" strokeDasharray="1" strokeDashoffset="0"></path>
            </g>
          </svg>
          <div style={s(`margin-top:8px`)}>
            {(V.wide) ? (
              <>
                <div data-reveal="up" style={s(`position:relative;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                  <img src="/assets/v5/web/dash/e-score-cards.jpg" alt="nørma Score 6.1, Fulfilment 61 steady, Culture 61 down 10 with Needs attention" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
            {(V.narrow) ? (
              <>
                <div style={s(`position:relative;max-width:400px;margin:0 auto;border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                  <img src="/assets/v5/web/dash/m-culture-card.jpg" alt="Culture 61, down 10 since September" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
          </div>
          <div style={s(`margin-top:clamp(40px,5vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(24px,3vw,40px)`)}>
            <div style={s(`padding-top:18px;border-top:1px solid rgba(228,240,214,.12)`)}>
              <span style={s(`font:400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>Fulfilment</span>
              <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>How life is going across the five pillars. The app helps each person lift it.</p>
            </div>
            <div style={s(`padding-top:18px;border-top:1px solid rgba(228,240,214,.12)`)}>
              <span style={s(`font:400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>Culture</span>
              <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>Whether people feel heard, valued and safe to speak. This is where leaders act.</p>
            </div>
            <div style={s(`padding-top:18px;border-top:1px solid rgba(228,240,214,.12)`)}>
              <span style={s(`font:400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>nørma Score</span>
              <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>Both together, from 0 to 10: one number for wellbeing across the organisation.</p>
            </div>
          </div>
          <div style={s(`margin-top:clamp(80px,10vw,136px);text-align:center`)}>
            <p style={s(`margin:0;display:flex;flex-direction:column;align-items:center;gap:4px;font:400 clamp(36px,4.8vw,60px)/1.08 'DM Serif Display',serif;letter-spacing:-.8px;color:#F6F4E9`)}>
              <span data-reveal="up">Shared awareness.</span>
              <span data-reveal="up" data-delay=".15">Shared language.</span>
              <span data-reveal="up" data-delay=".3" style={s(`background:linear-gradient(105deg,#F6F4E9 8%,#EAF79B 48%,#C4D94A 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent`)}>Shared accountability.</span>
            </p>
            <p style={s(`margin:28px auto 0;max-width:30em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
              Leaders and their people see the same picture: the five pillars of life and the culture they share at work, in the same words. Every conversation starts from the same place.
            </p>
          </div>
        </div>
      </section>
      <section id="dashboard" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#0A140D;color:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(20px,4vw,64px);align-items:end`)}>
            <div>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>The dashboard</span>
              <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance;`)}>Bring light into the dark.</h2>
            </div>
            <p style={s(`margin:0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty;`)}>
              What needs attention comes to the top. Start with the big picture, then open any score for the layer underneath: a department, a pillar, a single question. As much detail as you want, in the order you need it.
            </p>
          </div>
        </div>
        {(V.wide) ? (
          <>
            <div ref={V.tourRef} style={s(`position:relative;height:210vh;margin-top:clamp(40px,5vw,64px)`)}>
              <div style={s(`position:sticky;top:88px;height:calc(100vh - 120px);max-height:820px;box-sizing:border-box;padding:0 clamp(20px,5vw,48px)`)}>
                <div style={s(`max-width:1160px;height:100%;margin:0 auto;display:flex;flex-direction:column;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;overflow:hidden;background:#0A140D;box-shadow:0 60px 120px -40px rgba(0,0,0,.9),0 0 0 1px rgba(228,240,214,.1)`)}>
                  <div style={s(`flex:none;height:30px;display:flex;align-items:center;gap:7px;padding:0 14px;background:#111D15;border-bottom:1px solid rgba(228,240,214,.06)`)}>
                    <span style={s(`width:9px;height:9px;border-radius:50%;background:rgba(228,240,214,.18)`)}></span>
                    <span style={s(`width:9px;height:9px;border-radius:50%;background:rgba(228,240,214,.18)`)}></span>
                    <span style={s(`width:9px;height:9px;border-radius:50%;background:rgba(228,240,214,.18)`)}></span>
                    <span style={s(`margin-left:14px;font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>app.joinnorma.com · Northwind</span>
                  </div>
                  <div style={s(`position:relative;flex:1;min-height:0;overflow:hidden`)}>
                    <img ref={V.tourImg} src="/assets/v5/web/dash/01-home.jpg" alt="The full nørma dashboard home for Northwind" style={s(`display:block;width:100%;height:auto;will-change:transform`)} />
                  </div>
                </div>
              </div>
            </div>
            <div style={s(`height:clamp(112px,13vw,176px)`)}></div>
          </>
        ) : null}
        {(V.narrow) ? (
          <>
            <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:40px;padding-bottom:clamp(112px,13vw,176px);display:flex;flex-direction:column;gap:20px`)}>
              <div style={s(`position:relative;max-width:400px;margin:0 auto;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                <img src="/assets/v5/web/dash/m-culture-card.jpg" alt="Culture 61, down 10 since September" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
              </div>
              <div style={s(`position:relative;max-width:400px;margin:0 auto;border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                <img src="/assets/v5/web/dash/m-culture-by-month.jpg" alt="Culture by month, with the October dip" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
              </div>
            </div>
          </>
        ) : null}
      </section>
      <section id="where-to-look" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6;color:#14231A`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(20px,4vw,64px);align-items:end`)}>
            <div>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#4A6B3A`)}>Where to look</span>
              <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance;`)}>nørma points you to what needs attention.</h2>
            </div>
            <p style={s(`margin:0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty;`)}>
              No digging through reports. Departments that need a look stand out, and the focus area tells you where to start and why. This month it’s Field Services: Fulfilment and Culture both fell again, and feeling safe is the lowest answer in the company.
            </p>
          </div>
          <div style={s(`margin-top:clamp(40px,5vw,64px);position:relative`)}>
            {(V.wide) ? (
              <>
                <div data-reveal="up" style={s(`position:relative;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                  <img src="/assets/v5/web/dash/e-department-cards.jpg" alt="Three department cards: Field Services in red, one amber, one green, each with a score, a Fulfilment shape and Culture" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
            {(V.narrow) ? (
              <>
                <div style={s(`position:relative;max-width:400px;margin:0 auto;border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                  <img src="/assets/v5/web/dash/m-department-card.jpg" alt="Field Services card" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
            {(V.wide) ? (
              <>
                <div data-reveal="up" data-delay=".35" style={s(`position:relative;width:min(560px,58%);margin:-6% 0 0 auto;margin-right:-2%;border-radius:32px 22px 30px 20px / 20px 30px 22px 32px;overflow:hidden;background:#0F2015;box-shadow:0 40px 70px -24px rgba(20,35,26,.7),0 0 0 1px rgba(228,240,214,.12)`)}>
                  <img src="/assets/v5/web/dash/e-focus-area.jpg" alt="Focus area: Field Services, Fulfilment 44 and culture 43, both down again. Feeling safe is the lowest answer in the company." loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <section id="levels" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;left:-14%;top:10%;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.07),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div ref={V.levelsRef} style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:clamp(40px,5vw,72px);align-items:center`)}>
            <div style={s(`min-width:0`)}>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>Every level</span>
              <h2 style={s(`margin:14px 0 0;max-width:13em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Set it up the way your organisation works.</h2>
              <p style={s(`margin:20px 0 0;max-width:30em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                Keep it as one organisation, or split it into departments and teams. Every level gets its own scores, so you can start at the top and open any part of it.
              </p>
              <div role="tablist" aria-label="Levels" style={s(`margin-top:32px;display:flex;flex-direction:column;gap:8px;max-width:440px`)}>
                {(V.levels || []).map((l, $index) => (
                  <React.Fragment key={$index}>
                    <button type="button" role="tab" aria-selected={l.sel} onClick={l.pick} style={s(`margin-left:${l.indent ?? ''};display:flex;align-items:center;gap:14px;padding:14px 20px;border:0;border-radius:${l.shape ?? ''};background:${l.bg ?? ''};box-shadow:${l.ring ?? ''};cursor:pointer;text-align:left;font:inherit;color:inherit;transition:background .24s ease,box-shadow .24s ease`)} className="fl-ac3e8255">
                      <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:4px`)}>
                        <span style={s(`font:600 10.5px 'DM Sans',sans-serif;letter-spacing:2px;text-transform:uppercase;color:${l.eyeCol ?? ''}`)}>{l.kind}</span>
                        <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#F6F4E9`)}>{l.name}</span>
                      </span>
                      <span style={s(`font:400 26px/1 'DM Serif Display',serif;color:${l.col ?? ''}`)}>{l.score}</span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div style={s(`min-width:0;box-sizing:border-box;padding:clamp(22px,2.6vw,32px);border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;background:linear-gradient(170deg,#18291D,#0F1C13 80%);box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
              <div style={s(`display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap`)}>
                <span style={s(`font:400 24px 'DM Serif Display',serif;color:#F6F4E9`)}>Fulfilment</span>
                <span style={s(`display:flex;flex-wrap:wrap;gap:4px 16px;font:500 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.82)`)}>
                  <span style={s(`display:inline-flex;align-items:center;gap:7px`)}>
                    <span style={s(`width:14px;height:2px;border-radius:2px;background:#D9EA6E`)}></span>
                    {V.lvlName}
                  </span>
                  <span style={s(`display:inline-flex;align-items:center;gap:7px;opacity:${V.cmpOp ?? ''};transition:opacity .4s ease`)}>
                    <span style={s(`width:14px;height:0;border-top:2px dashed rgba(244,242,230,.55)`)}></span>
                    {V.cmpLabel}
                  </span>
                  <span style={s(`display:inline-flex;align-items:center;gap:7px;opacity:${V.deptOp ?? ''};transition:opacity .4s ease`)}>
                    <span style={s(`width:14px;height:0;border-top:2px dotted #B8C9A4`)}></span>
                    Field Services
                  </span>
                </span>
              </div>
              <div style={s(`position:relative;width:min(100%,320px);aspect-ratio:1;margin:18px auto 0`)}>
                <svg viewBox="0 0 200 200" aria-hidden="true" style={s(`position:absolute;inset:0;width:100%;height:100%;overflow:visible`)}>
                  <path d="M84.8 31.1 Q100.0 20.0 115.2 31.1 L160.9 64.2 Q176.1 75.3 170.3 93.2 L152.8 146.8 Q147.0 164.7 128.2 164.7 L71.8 164.7 Q53.0 164.7 47.2 146.8 L29.7 93.2 Q23.9 75.3 39.1 64.2 Z" fill="none" stroke="rgba(217,234,110,.2)" strokeWidth="1.2"></path>
                  <path d="M92.4 65.5 Q100.0 60.0 107.6 65.5 L130.4 82.1 Q138.0 87.6 135.1 96.6 L126.4 123.4 Q123.5 132.4 114.1 132.4 L85.9 132.4 Q76.5 132.4 73.6 123.4 L64.9 96.6 Q62.0 87.6 69.6 82.1 Z" fill="none" stroke="rgba(228,240,214,.07)" strokeWidth="1"></path>
                  <path d={V.deptD} fill="none" stroke="#B8C9A4" strokeWidth="1.3" strokeDasharray="1.5 3.5" strokeLinecap="round" style={s(`opacity:${V.deptOp ?? ''};transition:opacity .4s ease`)}></path>
                  <path d={V.cmpD} fill="none" stroke="rgba(244,242,230,.5)" strokeWidth="1.3" strokeDasharray="4 4" style={s(`opacity:${V.cmpOp ?? ''};transition:opacity .4s ease`)}></path>
                  <path d={V.penD} fill="rgba(217,234,110,.14)" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round"></path>
                </svg>
                {(V.dots || []).map((d, $index) => (
                  <React.Fragment key={$index}>
                    <span style={s(`position:absolute;left:${d.left ?? ''};top:${d.top ?? ''};width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;background:${d.c ?? ''}`)}></span>
                  </React.Fragment>
                ))}
                <span style={s(`position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);font:400 clamp(36px,4vw,48px)/1 'DM Serif Display',serif;color:${V.lvlCol ?? ''}`)}>{V.lvlScore}</span>
              </div>
              <div style={s(`margin-top:18px;display:flex;flex-direction:column`)}>
                {(V.rows || []).map((r, $index) => (
                  <React.Fragment key={$index}>
                    <div style={s(`display:grid;grid-template-columns:minmax(0,1fr) 48px 48px;align-items:center;gap:12px;padding:10px 0;border-top:1px solid rgba(228,240,214,.08)`)}>
                      <span style={s(`display:flex;align-items:center;gap:10px;min-width:0;font:500 14.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.92)`)}>
                        <span style={s(`flex:none;width:8px;height:8px;border-radius:50%;background:${r.c ?? ''}`)}></span>
                        {r.name}
                      </span>
                      <span style={s(`text-align:right;font:400 20px/1 'DM Serif Display',serif;color:${r.col ?? ''}`)}>{r.v}</span>
                      <span style={s(`text-align:right;font:500 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>{r.cmp}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div style={s(`margin-top:clamp(72px,9vw,128px)`)}>
            <div style={s(`min-width:0;max-width:36em`)}>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>Down to the question</span>
              <div style={s(`margin-top:14px`)}>
                <h3 style={s(`margin:0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>Find the real problem, not just the number.</h3>
              </div>
              <p style={s(`margin:16px 0 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty;`)}>
                Work & Life Flow fell 8 points in Field Services. Open it to see which questions moved and how people answered, so you know exactly what to work on before you decide what to do.
              </p>
            </div>
            <div style={s(`min-width:0;margin-top:clamp(32px,4vw,48px)`)}>
              {(V.wide) ? (
                <>
                  <div data-reveal="up" style={s(`position:relative;border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                    <img src="/assets/v5/web/dash/e-questions-answered.jpg" alt="Work and Life Flow: four questions with how people answered each, the score and the change since September" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                  </div>
                </>
              ) : null}
              {(V.narrow) ? (
                <>
                  <div style={s(`position:relative;max-width:400px;margin:0 auto;border-radius:32px 22px 30px 20px / 20px 30px 22px 32px;overflow:hidden;background:#0F2015;box-shadow:0 40px 80px -40px rgba(0,0,0,.6),0 0 0 1px rgba(228,240,214,.1)`)}>
                    <img src="/assets/v5/web/dash/m-question.jpg" alt="One check-in question with its answer bar, score and change" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section id="act" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6;color:#14231A`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(20px,4vw,64px);align-items:end`)}>
            <div>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#4A6B3A`)}>Act on it</span>
              <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance`)}>From knowing to doing.</h2>
            </div>
            <p style={s(`margin:0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>
              nørma suggests what to do next. Start a playbook from the growth library and it’s stamped on the timeline, so every check-in after shows whether it’s working.
            </p>
          </div>
          <div style={s(`margin-top:clamp(40px,5vw,64px);box-sizing:border-box;padding:clamp(24px,3vw,40px);border-radius:24px 34px 26px 32px / 34px 26px 32px 24px;background:linear-gradient(170deg,#17301F,#0F2015 75%);box-shadow:0 50px 100px -50px rgba(20,35,26,.6);color:#F4F2E6`)}>
            <div style={s(`display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap`)}>
              <span style={s(`font:400 24px 'DM Serif Display',serif;color:#F6F4E9`)}>Culture · Customer Success</span>
              <span style={s(`font:500 10.5px 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.7)`)}>SAMPLE</span>
            </div>
            <div style={s(`position:relative;margin-top:24px`)}>
              <svg data-m="act-chart" viewBox="0 0 1000 320" aria-hidden="true" style={s(`display:block;width:100%;height:auto;overflow:visible`)}>
                <defs>
                  <linearGradient id="actFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#D9EA6E" stopOpacity=".2"></stop>
                    <stop offset="1" stopColor="#D9EA6E" stopOpacity="0"></stop>
                  </linearGradient>
                  <clipPath id="actAfter"><rect x="625.7" y="0" width="374.3" height="320"></rect></clipPath>
                </defs>
                <rect x="625.7" y="16" width="344.3" height="246" rx="14" fill="rgba(217,234,110,.05)"></rect>
                <line x1="40" x2="960" y1="214.9" y2="214.9" stroke="rgba(228,240,214,.07)" strokeWidth="1"></line>
                <line x1="40" x2="960" y1="144.2" y2="144.2" stroke="rgba(228,240,214,.07)" strokeWidth="1"></line>
                <line x1="40" x2="960" y1="73.6" y2="73.6" stroke="rgba(228,240,214,.07)" strokeWidth="1"></line>
                <path d="M60.0 108.9 C122.9 108.9 122.9 120.7 185.7 120.7 C248.6 120.7 248.6 132.4 311.4 132.4 C374.3 132.4 374.3 156.0 437.1 156.0 C500.0 156.0 500.0 191.3 562.9 191.3 C625.7 191.3 625.7 167.8 688.6 167.8 C751.4 167.8 751.4 132.4 814.3 132.4 C877.1 132.4 877.1 97.1 940.0 97.1 L940.0 262 L60.0 262 Z" fill="url(#actFill)" clipPath="url(#actAfter)"></path>
                <path d="M60.0 108.9 C122.9 108.9 122.9 120.7 185.7 120.7 C248.6 120.7 248.6 132.4 311.4 132.4 C374.3 132.4 374.3 156.0 437.1 156.0 C500.0 156.0 500.0 191.3 562.9 191.3 C625.7 191.3 625.7 167.8 688.6 167.8 C751.4 167.8 751.4 132.4 814.3 132.4 C877.1 132.4 877.1 97.1 940.0 97.1" fill="none" stroke="rgba(244,242,230,.38)" strokeWidth="2.5" strokeLinecap="round"></path>
                <line x1="625.7" x2="625.7" y1="16" y2="262" stroke="#D9EA6E" strokeWidth="1.5" strokeDasharray="4 5" opacity=".75"></line>
                <g clipPath="url(#actAfter)">
                  <path data-reveal="draw" data-delay=".5" d="M60.0 108.9 C122.9 108.9 122.9 120.7 185.7 120.7 C248.6 120.7 248.6 132.4 311.4 132.4 C374.3 132.4 374.3 156.0 437.1 156.0 C500.0 156.0 500.0 191.3 562.9 191.3 C625.7 191.3 625.7 167.8 688.6 167.8 C751.4 167.8 751.4 132.4 814.3 132.4 C877.1 132.4 877.1 97.1 940.0 97.1" fill="none" stroke="#D9EA6E" strokeWidth="3.5" strokeLinecap="round" pathlength="1" strokeDasharray="1" strokeDashoffset="0"></path>
                </g>
                <circle cx="60.0" cy="108.9" r="3.5" fill="rgba(244,242,230,.55)"></circle>
                <circle cx="185.7" cy="120.7" r="3.5" fill="rgba(244,242,230,.55)"></circle>
                <circle cx="311.4" cy="132.4" r="3.5" fill="rgba(244,242,230,.55)"></circle>
                <circle cx="437.1" cy="156.0" r="3.5" fill="rgba(244,242,230,.55)"></circle>
                <circle cx="688.6" cy="167.8" r="3.5" fill="#D9EA6E"></circle>
                <circle cx="814.3" cy="132.4" r="3.5" fill="#D9EA6E"></circle>
                <text x="60.0" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">JUN</text>
                <text x="185.7" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">JUL</text>
                <text x="311.4" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">AUG</text>
                <text x="437.1" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">SEP</text>
                <text x="562.9" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">OCT</text>
                <text x="688.6" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">NOV</text>
                <text x="814.3" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">DEC</text>
                <text x="940.0" y="300" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill="rgba(201,212,194,.7)">JAN</text>
                <text x="60.0" y="92.9" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(201,212,194,.75)">71</text>
                <text x="185.7" y="104.7" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(201,212,194,.75)">70</text>
                <text x="311.4" y="116.4" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(201,212,194,.75)">69</text>
                <text x="437.1" y="140.0" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(201,212,194,.75)">67</text>
                <text x="562.9" y="175.3" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(201,212,194,.75)"></text>
                <text x="688.6" y="151.8" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="#DCEC85">66</text>
                <text x="814.3" y="116.4" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="#DCEC85">69</text>
                <text x="940.0" y="81.1" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="#DCEC85"></text>
              </svg>
              {' '}
              <span data-m="act-label" style={s(`position:absolute;left:64.17%;top:10.63%;font:600 11px 'DM Sans',sans-serif;letter-spacing:1.6px;text-transform:uppercase;color:#DCEC85`)}>Stop for Wellness running</span>
              {' '}
              <span data-reveal="pop" data-delay=".2" style={s(`position:absolute;left:56.29%;top:59.79%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:#E6C77E;color:#2A2410;display:flex;align-items:center;justify-content:center;font:600 12px 'DM Sans',sans-serif;box-shadow:0 0 0 5px #10201A`)}>1</span>
              {' '}
              <span data-reveal="pop" data-delay=".45" style={s(`position:absolute;left:62.57%;top:5.00%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:#D9EA6E;color:#152213;display:flex;align-items:center;justify-content:center;font:600 12px 'DM Sans',sans-serif;box-shadow:0 0 0 5px #10201A`)}>2</span>
              {' '}
              <span data-reveal="pop" data-delay="1.6" style={s(`position:absolute;left:94.00%;top:30.35%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:#D9EA6E;color:#152213;display:flex;align-items:center;justify-content:center;font:600 12px 'DM Sans',sans-serif;box-shadow:0 0 0 5px #10201A`)}>3</span>
            </div>
            <div style={s(`margin-top:clamp(28px,3.5vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,3vw,40px)`)}>
              <div style={s(`min-width:0;padding-top:18px;border-top:1px solid rgba(228,240,214,.12)`)}>
                <span style={s(`display:flex;align-items:center;gap:10px`)}>
                  <span style={s(`font:600 11px 'DM Mono',monospace;color:#EBD08F`)}>01</span>
                  <span style={s(`font:400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>Spotted</span>
                </span>
                <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>The October check-in shows Culture in Customer Success at 64, its fourth drop in a row.</p>
              </div>
              <div style={s(`min-width:0;padding-top:18px;border-top:1px solid rgba(228,240,214,.12)`)}>
                <span style={s(`display:flex;align-items:center;gap:10px`)}>
                  <span style={s(`font:600 11px 'DM Mono',monospace;color:#DCEC85`)}>02</span>
                  <span style={s(`font:400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>Acted</span>
                </span>
                <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>On 16 October the team starts Stop for Wellness, a playbook from the growth library.</p>
              </div>
              <div style={s(`min-width:0;padding-top:18px;border-top:1px solid rgba(228,240,214,.12)`)}>
                <span style={s(`display:flex;align-items:center;gap:10px`)}>
                  <span style={s(`font:600 11px 'DM Mono',monospace;color:#DCEC85`)}>03</span>
                  <span style={s(`font:400 22px 'DM Serif Display',serif;color:#F6F4E9`)}>Moving</span>
                </span>
                <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>Culture rises at every check-in after, back to 72 by January.</p>
              </div>
            </div>
          </div>
          <div style={s(`margin-top:clamp(28px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:12px`)}>
            <div style={s(`display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;border:1px solid rgba(20,35,26,.14);background:rgba(255,255,255,.35)`)}>
              <span style={s(`flex:none;width:38px;height:38px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#14231A;display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4.5h10.5a3 3 0 0 1 3 3V19.5H8a3 3 0 0 1-3-3z"></path>
                  <path d="M5 16.5a3 3 0 0 1 3-3h10.5"></path>
                </svg>
              </span>
              <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                <span style={s(`font:600 15.5px 'DM Sans',sans-serif;color:#14231A`)}>Playbooks from the growth library</span>
                <span style={s(`font:400 14px/1.4 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>Suggested for what your scores show</span>
              </span>
            </div>
            <div style={s(`display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:32px 22px 30px 20px / 20px 30px 22px 32px;border:1px solid rgba(20,35,26,.14);background:rgba(255,255,255,.35)`)}>
              <span style={s(`flex:none;width:38px;height:38px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;border:1px dashed rgba(20,35,26,.35);box-sizing:border-box;display:flex;align-items:center;justify-content:center;color:#14231A`)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>
              </span>
              <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                <span style={s(`font:600 15.5px 'DM Sans',sans-serif;color:#14231A`)}>Your own initiatives</span>
                <span style={s(`font:400 14px/1.4 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>Log what you ran, when, and for which team</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="psychosocial-safety" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:clamp(40px,5vw,72px);align-items:center`)}>
            <div style={s(`min-width:0;order:2`)}>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>Psychosocial safety</span>
              <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>Show what you knew, and what you did about it.</h2>
              <p style={s(`margin:20px 0 0;max-width:30em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
                Work health and safety laws increasingly cover psychosocial hazards, and they come down to four questions. nørma answers all four as you go.
              </p>
            </div>
            <div style={s(`min-width:0;order:1`)}>
              <div style={s(`padding:clamp(22px,2.6vw,32px);border-radius:22px 30px 20px 32px / 30px 20px 32px 22px;background:rgba(228,240,214,.05)`)}>
                <span style={s(`font:600 10.5px 'DM Sans',sans-serif;letter-spacing:2.2px;text-transform:uppercase;color:rgba(201,212,194,.78)`)}>The 4 psychosocial duty questions · answered with nørma</span>
                <ol style={s(`list-style:none;margin:6px 0 0;padding:0`)}>
                  <li data-reveal="up" data-delay="0.00" style={s(`display:grid;grid-template-columns:52px minmax(0,1fr);column-gap:12px;row-gap:12px;padding:20px 0;border-bottom:1px solid rgba(228,240,214,.08)`)}>
                    <span style={s(`grid-row:span 2;display:flex;flex-direction:column;gap:4px;padding-top:6px`)}><span style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.58)`)}>3 OCT</span></span>
                    <span style={s(`font:400 clamp(22px,2.1vw,25px)/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>1. What did you identify?</span>
                    <span style={s(`display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:16px 12px 18px 12px / 12px 18px 12px 16px;background:rgba(231,142,113,.12)`)}>
                      <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:5px`)}>
                        <span style={s(`font:600 10.5px 'DM Sans',sans-serif;letter-spacing:1.8px;text-transform:uppercase;white-space:nowrap;color:#F5B9A4`)}>Monthly check-in</span>
                        <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>Feeling safe to speak</span>
                      </span>
                      <span style={s(`display:flex;flex-direction:column;align-items:flex-end;gap:4px`)}>
                        <span style={s(`font:400 34px/1 'DM Serif Display',serif;color:#F0A58C`)}>38</span>
                        <span style={s(`font:600 10.5px 'DM Sans',sans-serif;color:#F5B9A4`)}>Needs attention</span>
                      </span>
                    </span>
                  </li>
                  <li data-reveal="up" data-delay="0.12" style={s(`display:grid;grid-template-columns:52px minmax(0,1fr);column-gap:12px;row-gap:12px;padding:20px 0;border-bottom:1px solid rgba(228,240,214,.08)`)}>
                    <span style={s(`grid-row:span 2;display:flex;flex-direction:column;gap:4px;padding-top:6px`)}><span style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.58)`)}>16 OCT</span></span>
                    <span style={s(`font:400 clamp(22px,2.1vw,25px)/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>2. What did you do?</span>
                    <span style={s(`display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px 18px 12px 16px / 18px 12px 16px 12px;background:rgba(217,234,110,.08)`)}>
                      <span style={s(`flex:none;width:36px;height:36px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#D9EA6E;display:flex;align-items:center;justify-content:center;color:#152213`)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 21V4"></path>
                          <path d="M6 4h11l-2 4 2 4H6"></path>
                        </svg>
                      </span>
                      <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:5px`)}>
                        <span style={s(`font:600 10.5px 'DM Sans',sans-serif;letter-spacing:1.8px;text-transform:uppercase;white-space:nowrap;color:#DCEC85`)}>Initiative started</span>
                        <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>Stop for Wellness</span>
                        <span style={s(`font:400 13.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>A playbook from the growth library</span>
                      </span>
                    </span>
                  </li>
                  <li data-reveal="up" data-delay="0.24" style={s(`display:grid;grid-template-columns:52px minmax(0,1fr);column-gap:12px;row-gap:12px;padding:20px 0;border-bottom:1px solid rgba(228,240,214,.08)`)}>
                    <span style={s(`grid-row:span 2;display:flex;flex-direction:column;gap:4px;padding-top:6px`)}><span style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.58)`)}>1 NOV</span></span>
                    <span style={s(`font:400 clamp(22px,2.1vw,25px)/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>3. Did it work?</span>
                    <span style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:12px 14px;padding:14px 16px;border-radius:18px 12px 16px 12px / 12px 16px 12px 18px;background:rgba(217,234,110,.08)`)}>
                      <span style={s(`flex:1 1 180px;min-width:0;display:flex;flex-direction:column;gap:5px`)}>
                        <span style={s(`font:600 10.5px 'DM Sans',sans-serif;letter-spacing:1.8px;text-transform:uppercase;white-space:nowrap;color:#DCEC85`)}>Next check-in</span>
                        <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>Feeling safe to speak already improved</span>
                      </span>
                      <span style={s(`display:flex;align-items:center;gap:10px`)}>
                        <span style={s(`font:400 20px/1 'DM Serif Display',serif;color:rgba(240,165,140,.7);text-decoration:line-through;text-decoration-thickness:1px`)}>38</span>
                        <span aria-hidden="true" style={s(`color:rgba(201,212,194,.6)`)}>→</span>
                        <span style={s(`font:400 34px/1 'DM Serif Display',serif;color:#E6C77E`)}>46</span>
                        <span style={s(`display:inline-flex;align-items:center;gap:3px;padding:4px 8px;border-radius:999px;background:rgba(217,234,110,.16);font:600 12px 'DM Sans',sans-serif;color:#EAF79B`)}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 19V5"></path>
                            <path d="M6 11l6-6 6 6"></path>
                          </svg>
                          8
                        </span>
                      </span>
                    </span>
                  </li>
                  <li data-reveal="up" data-delay="0.36" style={s(`display:grid;grid-template-columns:52px minmax(0,1fr);column-gap:12px;row-gap:12px;padding:20px 0;`)}>
                    <span style={s(`grid-row:span 2;display:flex;flex-direction:column;gap:4px;padding-top:6px`)}></span>
                    <span style={s(`font:400 clamp(22px,2.1vw,25px)/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>4. Can you prove it?</span>
                    <span style={s(`display:flex;flex-direction:column;gap:16px;padding:16px 18px 18px;border-radius:12px 16px 12px 18px / 16px 12px 18px 12px;background:linear-gradient(160deg,rgba(217,234,110,.16),rgba(217,234,110,.06))`)}>
                      <span style={s(`display:flex;align-items:center;gap:14px`)}>
                        <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#D9EA6E;display:flex;align-items:center;justify-content:center;color:#152213`)}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"></path>
                            <path d="M8.8 12.2l2.2 2.2 4.4-4.6"></path>
                          </svg>
                        </span>
                        <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:4px`)}>
                          <span style={s(`font:600 10.5px 'DM Sans',sans-serif;letter-spacing:1.8px;text-transform:uppercase;white-space:nowrap;color:#DCEC85`)}>Dated record</span>
                          <span style={s(`font:400 clamp(19px,1.8vw,21px)/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>Proof you took accountability.</span>
                        </span>
                      </span>
                      <span style={s(`position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px`)}>
                        <span aria-hidden="true" style={s(`position:absolute;left:16.6%;right:16.6%;top:5px;height:2px;border-radius:2px;background:linear-gradient(90deg,#E78E71,#D9EA6E 50%,#E6C77E)`)}></span>
                        <span style={s(`display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0`)}>
                          <span style={s(`width:12px;height:12px;border-radius:50%;background:#E78E71;box-shadow:0 0 0 4px #1A2E20`)}></span>
                          <span style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.75)`)}>3 OCT</span>
                          <span style={s(`font:500 12px 'DM Sans',sans-serif;color:rgba(244,242,230,.9);text-align:center`)}>Identified</span>
                        </span>
                        <span style={s(`display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0`)}>
                          <span style={s(`width:12px;height:12px;border-radius:50%;background:#D9EA6E;box-shadow:0 0 0 4px #1A2E20`)}></span>
                          <span style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.75)`)}>16 OCT</span>
                          <span style={s(`font:500 12px 'DM Sans',sans-serif;color:rgba(244,242,230,.9);text-align:center`)}>Acted</span>
                        </span>
                        <span style={s(`display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0`)}>
                          <span style={s(`width:12px;height:12px;border-radius:50%;background:#E6C77E;box-shadow:0 0 0 4px #1A2E20`)}></span>
                          <span style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.75)`)}>1 NOV</span>
                          <span style={s(`font:500 12px 'DM Sans',sans-serif;color:rgba(244,242,230,.9);text-align:center`)}>Improved</span>
                        </span>
                      </span>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="day-to-day" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6;color:#14231A`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#4A6B3A`)}>Day to day</span>
          <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;text-wrap:balance;`)}>See your people putting in the work.</h2>
          <p style={s(`margin:20px 0 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty;`)}>
            The check-in shows where things stand. Day to day shows what happens next: how many people used the app this month, and how often they kept a habit, reflected, reset or opened a growth journey.
          </p>
          <p style={s(`margin:18px 0 0;font:500 16px/1.5 'DM Sans',sans-serif`)}>
            <a href="/your-people/#features" style={s(`color:#14231A;border-bottom:1px solid rgba(20,35,26,.3)`)} className="fl-hodb1b46">Explore everything in the app ›</a>
          </p>
          <div style={s(`margin-top:clamp(40px,5vw,64px)`)}>
            {(V.wide) ? (
              <>
                <div data-reveal="up" style={s(`position:relative;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))`)}>
                  <img src="/assets/v5/web/dash/e-putting-in-the-work-card.webp" alt="Putting in the work: 86% used the app, with habits, reflections, emotions, gratitude, growth work, resets and chapters" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
            {(V.narrow) ? (
              <>
                <div style={s(`position:relative;max-width:400px;margin:0 auto;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))`)}>
                  <img src="/assets/v5/web/dash/m-putting-in-the-work-card.webp" alt="Putting in the work: four tiles of app use" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                </div>
              </>
            ) : null}
          </div>
          <div style={s(`margin-top:clamp(72px,9vw,128px)`)}>
            <div style={s(`min-width:0;max-width:36em`)}>
              <h3 style={s(`margin:0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#14231A;text-wrap:balance`)}>How people feel, across the workforce.</h3>
              <p style={s(`margin:16px 0 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty;`)}>
                The app has a feature called Name the emotion. When something’s on their mind, people pick one of seven core emotions, then narrow it down to the exact word. nørma adds those up across the organisation into one map, so you can see how people feel this month and what changed since the last.
              </p>
            </div>
            <div style={s(`min-width:0;margin-top:clamp(32px,4vw,48px)`)}>
              {(V.wide) ? (
                <>
                  <div data-reveal="up" style={s(`position:relative;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))`)}>
                    <img src="/assets/v5/web/dash/e-how-people-feel-card.webp" alt="The emotion compass: 612 emotions named by 121 people across seven core emotions, September dashed" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                  </div>
                </>
              ) : null}
              {(V.narrow) ? (
                <>
                  <div style={s(`position:relative;max-width:400px;margin:0 auto;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))`)}>
                    <img src="/assets/v5/web/dash/m-emotion-compass-card.webp" alt="The emotion compass" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section id="privacy" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:clamp(40px,5vw,72px);align-items:center`)}>
            <div style={s(`min-width:0`)}>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>Built on trust</span>
              <h2 style={s(`margin:14px 0 0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance;`)}>Honest answers, because they stay private.</h2>
              <p style={s(`margin:20px 0 0;max-width:34em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty;`)}>
                Leaders see group figures for groups of five or more, and nothing a person wrote, said or answered. That’s why people tell nørma how things really are, and why the figures are worth acting on.
              </p>
            </div>
            <div style={s(`min-width:0`)}>
              <div data-reveal="up" style={s(`position:relative;max-width:520px;margin:0 auto;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))`)}>
                <img src="/assets/v5/web/dash/m-fewer-than-five-card.webp" alt="Two departments with their culture figures, and People and Finance hatched: fewer than five people, so nothing is shown" loading="lazy" style={s(`display:block;width:100%;height:auto`)} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6;color:#14231A`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(88px,11vw,152px);padding-bottom:clamp(72px,9vw,120px)`)}>
          <div style={s(`position:relative;max-width:620px;margin:0 auto;box-sizing:border-box;padding:clamp(72px,9vw,120px) clamp(24px,5vw,64px) clamp(52px,6vw,80px);text-align:center`)}>
            <div aria-hidden="true" style={s(`position:absolute;inset:0;border-radius:310px 310px 32px 26px / 310px 310px 32px 26px;background:radial-gradient(62% 40% at 50% 16%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 50%,#ECE8D7 100%)`)}></div>
            <div style={s(`position:relative`)}>
              <img src="/assets/v5/norma-happy.png" alt="" width="92" height="124" style={s(`display:block;margin:0 auto;filter:drop-shadow(0 0 1px rgba(20,35,26,.7)) drop-shadow(0 14px 20px rgba(20,35,26,.16))`)} />
              <h2 style={s(`margin:26px auto 0;max-width:11em;font:400 clamp(40px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;text-wrap:balance`)}>Wellbeing you can see, and act on.</h2>
              <p style={s(`margin:20px auto 0;max-width:24em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>We’ll walk you through the dashboard and the app your people use alongside it.</p>
              <div style={s(`display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:34px`)}>
                <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 24px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24);padding:0 28px`)} className="fl-ac3e8255">Book a demo</a>
                <a href="/roi/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 24px;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif`)} className="fl-ho3cfe08 fl-ac3e8255">
                  Work out your ROI
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
              <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">Your people</a>
              <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">For leaders</a>
              <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">ROI</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">Help</a>
              <a href="/book-a-demo/" style={s(`color:rgba(20,35,26,.72)`)} className="fl-ho789e87">Book a demo</a>
            </nav>
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(20,35,26,.08);font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>
            <span>© 2026 The Artistry of Humanity Pty Ltd</span>
            <span style={s(`display:flex;flex-wrap:wrap;gap:20px`)}>
              <a href="/privacy/" style={s(`color:rgba(20,35,26,.66)`)} className="fl-ho789e87">Privacy policy</a>
              <a href="/terms/" style={s(`color:rgba(20,35,26,.66)`)} className="fl-ho789e87">Terms of use</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.66)`)} className="fl-ho789e87">Help centre</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
      </>
    );
  }
}

export default ForLeaders;
