// @ts-nocheck
/* Generated from the design handoff (design_handoff_v5/reference) by dc2jsx.
   Markup and styles are verbatim from the reference; logic is the reference's
   own renderVals/state code. Since 17 Oct 2026 this file also carries design
   changes made here after the handoff (git log shows each), so regenerating
   from the reference would drop them: diff before rerunning build-v5.sh. */
import React from 'react';
import { s } from '../../lib/s';
import './RoiPage.dc.css';


// Benchmarks per industry: turnover %, unplanned days per person, average salary, then the four human-cost shares (%).
const IND = [
  { id: 'all', name: 'All industries', turn: 13.5, abs: 9, sal: 100000, h: [47, 17, 8.6, 0.6] },
  { id: 'health', name: 'Healthcare & aged care', turn: 15, abs: 12, sal: 95000, h: [44, 22, 11, 0.8] },
  { id: 'retail', name: 'Retail & hospitality', turn: 22, abs: 8, sal: 65000, h: [52, 18, 8, 0.6] },
  { id: 'prof', name: 'Professional services', turn: 14, abs: 6.5, sal: 120000, h: [45, 19, 9, 0.5] },
  { id: 'finance', name: 'Financial services', turn: 12, abs: 7, sal: 125000, h: [46, 18, 9, 0.5] },
  { id: 'tech', name: 'Technology', turn: 15, abs: 6, sal: 130000, h: [48, 20, 9.5, 0.5] },
  { id: 'construct', name: 'Construction & trades', turn: 16, abs: 9, sal: 95000, h: [50, 16, 8, 0.9] },
  { id: 'manu', name: 'Manufacturing & logistics', turn: 14, abs: 10, sal: 80000, h: [51, 15, 7.5, 0.6] },
  { id: 'edu', name: 'Education', turn: 11, abs: 10, sal: 90000, h: [42, 21, 10, 0.6] },
  { id: 'gov', name: 'Government & public sector', turn: 9, abs: 11, sal: 100000, h: [49, 16, 8, 0.5] }
];
// Scale: in larger organisations strain spreads further (shares edge up), and so do improvements (the lift edges up).
// Benchmarks describe a ~1,000-person organisation. Below that, strain compounds less (power curve); above it, it keeps climbing more slowly.
const sizeF = N => N <= 1000 ? Math.pow(N / 1000, .218) : 1 + .25 * Math.log10(N / 1000);
const liftFor = N => 11 * Math.sqrt(sizeF(N));
// Each state has a dot colour, a lighter highlight for the dot's sheen, a number colour and a card tint.
const K = {
  well: { c: 'rgba(217,234,110,.5)', hi: 'rgba(234,247,155,.75)' },
  h1: { c: 'rgba(244,242,230,.58)', hi: 'rgba(246,244,233,.9)', num: '#F6F4E9', card: 'linear-gradient(180deg,rgba(228,240,214,.1),rgba(228,240,214,.04))', pill: 'rgba(228,240,214,.1)' },
  h2: { c: '#E6C77E', hi: '#F4DFA8', num: '#F2D27E', card: 'linear-gradient(180deg,rgba(230,199,126,.34),rgba(230,199,126,.06))', pill: 'rgba(230,199,126,.22)' },
  h3: { c: '#F0A58C', hi: '#F8C8B6', num: '#F5A98E', card: 'linear-gradient(180deg,rgba(240,165,140,.36),rgba(240,165,140,.06))', pill: 'rgba(240,165,140,.24)' },
  h4: { c: '#C85C44', hi: '#E78E71', num: '#F08A6C', card: 'linear-gradient(180deg,rgba(200,92,68,.5),rgba(200,92,68,.1))', pill: 'rgba(200,92,68,.36)' }
};
const money = v => v >= 1e9 ? '$' + (v / 1e9).toFixed(1) + 'bn' : v >= 1e6 ? '$' + (v / 1e6).toFixed(1) + 'm' : v >= 1e4 ? '$' + Math.round(v / 1e3) + 'k' : '$' + Math.round(v).toLocaleString('en-AU');
const num = v => Math.round(v).toLocaleString('en-AU');
// Headcount slider: a log scale from 20 to 10,000, so a 60-person business and a
// 6,000-person one both get room, snapping to round numbers. Typing allows 5 to 100,000.
const HC_MIN = 20, HC_MAX = 10000;
const hcStep = v => v < 100 ? 5 : v < 300 ? 10 : v < 1000 ? 25 : v < 3000 ? 50 : v < 6000 ? 100 : 250;
const hcSnap = v => Math.min(HC_MAX, Math.max(HC_MIN, Math.round(v / hcStep(v)) * hcStep(v)));
const hcPos = v => Math.round(1000 * Math.log(Math.min(HC_MAX, Math.max(HC_MIN, v)) / HC_MIN) / Math.log(HC_MAX / HC_MIN));
const hcFromPos = p => hcSnap(HC_MIN * Math.pow(HC_MAX / HC_MIN, p / 1000));
const pct = v => (v % 1 ? v.toFixed(1) : v) + '%';
const mulberry = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
class RoiPage extends React.Component {
  state = { narrow: false, menu: false, vw: 1200, industry: 'all', headcount: 500, rates: null, hl: null, detail: false, tip: null, chip: false, lit: false, hcText: null, hcOpen: false, touch: false };
  rootRef = React.createRef(); heroRef = React.createRef(); humanRef = React.createRef(); chipRef = React.createRef();
  componentDidMount() {
    this.onResize = () => { const w = window.innerWidth, n = w < 760; if (n !== this.state.narrow || w !== this.state.vw) this.setState({ narrow: n, vw: w, menu: n ? this.state.menu : false }); };
    window.addEventListener('resize', this.onResize); this.onResize(); requestAnimationFrame(this.onResize); setTimeout(this.onResize, 400);
    if (window.ResizeObserver) { this.ro = new ResizeObserver(this.onResize); this.ro.observe(document.documentElement); }
    this.onScroll = () => { const h = this.heroRef.current; if (!h) return; const on = h.getBoundingClientRect().bottom < 0; if (on !== this.state.chip) this.setState(on ? { chip: on } : { chip: on, hcOpen: false }); };
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) this.setState({ touch: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    // The crowd looks fine from the outside; the colours come on once the section is in view.
    this.io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting) && !this.state.lit) { this.io.disconnect(); setTimeout(() => this.setState({ lit: true }), 900); } }, { threshold: .4 });
    if (this.humanRef.current) this.io.observe(this.humanRef.current);
    this.onDoc = e => { const inChip = this.chipRef.current && this.chipRef.current.contains(e.target); if (this.state.tip && !inChip) this.setState({ tip: null }); if (this.state.hcOpen && !inChip) this.setState({ hcOpen: false }); if (this.state.hl && !(e.target.closest && e.target.closest('[data-m=tiers]'))) this.setState({ hl: null }); };
    this.onKey = e => { if (e.key === 'Escape' && this.state.hcOpen) this.setState({ hcOpen: false }); };
    document.addEventListener('keydown', this.onKey);
    document.addEventListener('click', this.onDoc);
  }
  componentWillUnmount() { if (this.ro) this.ro.disconnect(); window.removeEventListener('resize', this.onResize); window.removeEventListener('scroll', this.onScroll); document.removeEventListener('click', this.onDoc); document.removeEventListener('keydown', this.onKey); if (this.io) this.io.disconnect(); }
  ind() { return IND.find(i => i.id === this.state.industry) || IND[0]; }
  rates() { const i = this.ind(); return { turn: i.turn, abs: i.abs, sal: i.sal, ...(this.state.rates || {}) }; }
  setRate(k, v) { this.setState({ rates: { ...(this.state.rates || {}), [k]: v } }); }
  // One SVG dot per person (or per group when the headcount is large), scattered so the signal sits inside the crowd.
  dots(N, counts, hl) {
    // One dot per person up to 2,000; beyond that the crowd keeps growing (denser), never resetting.
    const n = N <= 2000 ? Math.max(1, N) : Math.min(7000, Math.round(2000 + 880 * Math.log2(N / 2000))), per = N / n, aspect = this.state.narrow ? 1.1 : 3.4;
    const cols = Math.max(8, Math.ceil(Math.sqrt(n * aspect))), rows = Math.ceil(n / cols), g = 10, r = 3.4;
    const order = Array.from({ length: n }, (_, i) => i), rnd = mulberry(7);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const kinds = []; let left = n;
    ['h4', 'h3', 'h2', 'h1'].forEach(k => { const c = Math.min(left, Math.round(counts[k] / per)); for (let i = 0; i < c; i++) kinds.push(k); left -= c; });
    while (kinds.length < n) kinds.push('well');
    const defs = React.createElement('defs', null, Object.keys(K).map(k => React.createElement('radialGradient', { key: k, id: 'dot-' + k, cx: '35%', cy: '32%', r: '70%' },
      React.createElement('stop', { offset: '0', stopColor: K[k].hi }), React.createElement('stop', { offset: '1', stopColor: K[k].c }))));
    const els = order.map((pos, i) => {
      const k = kinds[i], x = (pos % cols) * g + g / 2, y = Math.floor(pos / cols) * g + g / 2, dim = hl && hl !== k, lit = this.state.lit;
      return React.createElement('circle', { key: pos, cx: x, cy: y, r: lit && k === 'h4' ? r + .5 : r, fill: 'url(#dot-' + (lit ? k : 'well') + ')', opacity: dim ? (k === 'well' ? .14 : .22) : 1, style: { transition: 'opacity .3s ease, fill 1.2s ease ' + (lit ? ((pos % 7) * .08).toFixed(2) + 's' : '0s') } });
    });
    const svg = React.createElement('svg', { viewBox: '0 0 ' + cols * g + ' ' + rows * g, 'aria-hidden': 'true', style: { display: 'block', width: '100%', height: 'auto', maxHeight: '540px' } }, defs, els);
    return { svg, per };
  }
  tip(key, text) { const open = this.state.tip === key; return { open, text, show: e => { if (e && e.stopPropagation) e.stopPropagation(); if (!open) this.setState({ tip: key }); }, hide: () => { if (this.state.tip === key) this.setState({ tip: null }); } }; }
  renderVals() {
    const { narrow, menu, hl, detail } = this.state, R = this.rates(), I = this.ind();
    const N = Math.max(5, Math.min(100000, Math.round(+this.state.headcount) || 0));
    const sf = sizeF(N), shares = [I.h[0] * Math.pow(sf, .4), I.h[1] * sf, I.h[2] * sf, I.h[3] * sf];
    const counts = { h1: Math.round(N * shares[0] / 100), h2: Math.round(N * shares[1] / 100), h3: Math.round(N * shares[2] / 100), h4: Math.round(N * shares[3] / 100) };
    const well = Math.max(0, N - counts.h1 - counts.h2 - counts.h3 - counts.h4);
    const { svg, per } = this.dots(N, counts, hl);
    const leavers = N * R.turn / 100, days = N * R.abs, daily = R.sal * 1.2 / 230, replace = R.sal * .5;
    const turn = leavers * replace, abs = days * daily, presX = 2.3 * Math.pow(sf, .25), pres = abs * presX, total = turn + abs + pres, lift = liftFor(N) / 100;
    const card = (k, i) => ({ n: num(counts[k]), pct: pct(Math.round(shares[i] * 10) / 10), c: K[k].num, dot: K[k].c, bg: K[k].card, pill: K[k].pill, ring: hl === k ? 'inset 0 0 0 1px rgba(246,244,233,.22)' : 'inset 0 0 0 1px rgba(246,244,233,0)',
      op: hl && hl !== k ? .5 : 1, tf: hl === k ? 'translateY(-3px)' : 'none', on: () => this.setState({ hl: k }), off: () => this.setState({ hl: null }), tap: () => this.setState({ hl: k }) });
    const inp = (k, min, max, step) => ({ value: R[k], min, max, step, set: e => { const v = +e.target.value; if (!isNaN(v)) this.setRate(k, v); } });
    return {
      rootRef: this.rootRef, heroRef: this.heroRef, wide: !narrow, narrow, menuOpen: narrow && menu, toggleMenu: () => this.setState(s => ({ menu: !s.menu })),
      cardCols: this.state.vw >= 860 ? 4 : this.state.vw >= 520 ? 2 : 1,
      industries: IND.map(i => ({ id: i.id, name: i.name })), industry: this.state.industry, industryName: I.name,
      setIndustry: e => this.setState({ industry: e.target.value, rates: null }),
      headcountLabel: num(N),
      hcPos: hcPos(N), hcT: (hcPos(N) / 1000).toFixed(3), hcValText: num(N) + ' people',
      slide: e => { const p = +e.target.value, cur = hcPos(N); let v = hcFromPos(p); if (v === N && p !== cur) v = hcSnap(p > cur ? N + hcStep(N) : N - hcStep(N - 1)); this.setState({ headcount: v, hcText: null }); },
      hcKeys: e => { const k = e.key, cur = hcPos(N); let v = null;
        if (k === 'ArrowRight' || k === 'ArrowUp') v = hcSnap(N + hcStep(N)); else if (k === 'ArrowLeft' || k === 'ArrowDown') v = hcSnap(N - hcStep(N - 1));
        else if (k === 'PageUp') v = hcFromPos(Math.min(1000, cur + 100)); else if (k === 'PageDown') v = hcFromPos(Math.max(0, cur - 100));
        else if (k === 'Home') v = HC_MIN; else if (k === 'End') v = HC_MAX;
        if (v != null) { e.preventDefault(); this.setState({ headcount: v, hcText: null }); } },
      hcShown: this.state.hcText != null ? this.state.hcText : num(N), hcLen: String(this.state.hcText != null ? this.state.hcText : num(N)).length || 1,
      typeHc: e => { const d = e.target.value.replace(/\D/g, '').slice(0, 6); this.setState(d ? { hcText: d, headcount: +d } : { hcText: d }); },
      hcType: e => { const t = e.target; this.setState({ hcText: String(N) }); requestAnimationFrame(() => { try { t.select(); } catch (_) {} }); },
      hcDone: () => this.setState({ hcText: null, headcount: N }), hcEnter: e => { if (e.key === 'Enter') e.target.blur(); },
      exploreLine: (this.state.touch ? 'Tap' : 'Hover over') + ' a group below to find the people who aren’t.',
      hcOpen: this.state.hcOpen, toggleHc: e => { if (e) e.stopPropagation(); this.setState(st => ({ hcOpen: !st.hcOpen })); }, closeHc: () => this.setState({ hcOpen: false }),
      indMax: this.state.hcOpen ? '0px' : '60vw', indOp: this.state.hcOpen ? 0 : 1, sldMax: this.state.hcOpen ? '320px' : '0px', sldOp: this.state.hcOpen ? 1 : 0,
      sldW: narrow ? 'calc(100vw - 236px)' : '240px', sldTab: this.state.hcOpen ? 0 : -1, sldHidden: !this.state.hcOpen,
      detailOpen: detail, toggleDetail: () => this.setState(s => ({ detail: !s.detail })), detailBg: detail ? 'rgba(217,234,110,.35)' : 'transparent', detailBorder: detail ? 'rgba(20,35,26,.3)' : 'rgba(20,35,26,.18)',
      sTurn: inp('turn', 1, 60, .5), sAbs: inp('abs', 0, 40, .5), sSal: inp('sal', 20000, 400000, 1000), resetRates: () => this.setState({ rates: null }),
      chipOn: this.state.chip, chipRef: this.chipRef,
      backToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      humanRef: this.humanRef,
      dotMap: svg, wellLabel: num(well),
      srcTip: this.tip('src', (per === 1 ? 'Each dot is one person. ' : 'Each dot is about ' + num(per) + ' people. ') + 'Shares from Gallup State of the Global Workplace 2024, Deloitte Australia 2024 and Black Dog Institute, applied to your headcount. Strain spreads further in larger organisations, so the shares edge up with size.'),
      h1: card('h1', 0), h2: card('h2', 1), h3: card('h3', 2), h4: card('h4', 3),
      totalMoney: money(total),
      turn: { money: money(turn), sub: num(leavers) + ' people leave', tip: this.tip('turn', num(leavers) + ' leavers at ' + pct(R.turn) + ' turnover, each costing about half a year’s salary to replace (' + money(replace) + ', Gallup lower bound).') },
      abs: { money: money(abs), sub: num(days) + ' unplanned days off', tip: this.tip('abs', R.abs + ' days a person a year, at a loaded daily cost of ' + money(daily) + ' (' + money(R.sal) + ' salary plus 20% on-costs, over 230 working days).') },
      pres: { money: money(pres), sub: 'At work, not really there', tip: this.tip('pres', 'Benchmarked at ' + presX.toFixed(1) + ' times the cost of absence, a little higher in larger organisations where it hides more easily. The biggest cost, and the one you can’t see.') },
      recoverMoney: money(total * lift),
      stay: { n: num(Math.max(1, leavers * lift)), sub: 'who would otherwise have left this year' },
      days: { n: num(days * lift), sub: 'unplanned days that don’t happen' },
      burn: { n: num(Math.max(1, counts.h2 * lift)), sub: 'people, before it becomes one' },
      caseTip: this.tip('case', 'Gallup’s 2024 meta-analysis puts the gap between the most and least engaged teams at 21 to 51% on turnover and 78% on absence. What comes back here assumes only about a fifth of that gap closes (' + pct(Math.round(lift * 1000) / 10) + ' at your size, since improvements ripple further across more teams), and it can be measured against your own baseline.')
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
                  <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">Your people</a>
                  <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">For leaders</a>
                  <a href="/roi/" style={s(`color:#14231A;padding:4px 0 2px;border-bottom:2px solid #D3E45F`)} className="ri-ho789e87">ROI</a>
                  <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">Help</a>
                </nav>
              </>
            ) : null}
            <div style={s(`display:flex;align-items:center;gap:10px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:44px;padding:0 16px;white-space:nowrap;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px rgba(217,234,110,.22)`)} className="ri-ac3e8255">Book a demo</a>
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
      <section ref={V.heroRef} style={s(`position:relative`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(96px,12vw,160px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(36px,5vw,72px)`)}>
          <div style={s(`flex:1 1 340px;min-width:0;max-width:560px`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>ROI · the case</span>
            <h1 style={s(`margin:16px 0 0;max-width:12em;font:400 clamp(44px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance;padding-bottom:.14em;margin-bottom:-.14em`)}>The human case and the business case are the same case.</h1>
            <p style={s(`margin:28px 0 0;max-width:28em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>Choose your industry and headcount. Everything below is for your organisation.</p>
          </div>
          <div style={s(`flex:1 1 320px;min-width:0;max-width:440px;margin-left:auto;position:relative`)}>
            <div aria-hidden="true" style={s(`position:absolute;left:-8%;right:-8%;top:-10%;bottom:-12%;border-radius:999px 999px 36px 30px / 420px 420px 36px 30px;background:radial-gradient(64% 36% at 50% 8%,rgba(217,234,110,.45) 0%,rgba(217,234,110,.12) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 60%)`)}></div>
            <div aria-hidden="true" style={s(`position:absolute;right:-6%;top:4%;width:58%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(205,226,80,.85),rgba(217,234,110,0) 72%);pointer-events:none`)}></div>
            <div aria-hidden="true" style={s(`position:absolute;left:-4%;bottom:2%;width:52%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(74,107,58,.42),rgba(74,107,58,0) 72%);pointer-events:none`)}></div>
            <div style={s(`position:relative;box-sizing:border-box;padding:clamp(22px,2.6vw,30px);border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;background:linear-gradient(150deg,rgba(250,248,240,.62),rgba(244,242,230,.34));backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 0 1px rgba(255,255,255,.45),0 36px 70px -30px rgba(20,35,26,.4)`)}>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;gap:12px`)}>
                <span style={s(`font:400 clamp(24px,2.2vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.2px;color:#14231A;text-wrap:balance`)}>Build the case for your organisation</span>
                <button type="button" onClick={V.toggleDetail} aria-expanded={V.detailOpen} aria-label="Detailed settings" title="Detailed settings" style={s(`width:40px;height:40px;border-radius:999px;border:1px solid ${V.detailBorder ?? ''};background:${V.detailBg ?? ''};color:#14231A;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .2s ease`)} className="ri-ho4c2018 ri-ac3e8255">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 7h10M18 7h2M4 17h4M12 17h8"></path>
                    <circle cx="16" cy="7" r="2.2"></circle>
                    <circle cx="10" cy="17" r="2.2"></circle>
                  </svg>
                </button>
              </div>
              <div style={s(`margin-top:18px;display:flex;flex-direction:column;gap:14px`)}>
                <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                  <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Industry</span>
                  <span style={s(`position:relative;display:block`)}>
                    <select value={V.industry} onChange={V.setIndustry} style={s(`appearance:none;-webkit-appearance:none;width:100%;height:52px;box-sizing:border-box;padding:0 44px 0 18px;border:1px solid rgba(20,35,26,.14);border-radius:18px 14px 18px 12px / 14px 18px 12px 18px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;cursor:pointer`)} className="ri-foa3fa77">
                      {(V.industries || []).map((o, $index) => (
                        <React.Fragment key={$index}>
                          <option value={o.id}>{o.name}</option>
                        </React.Fragment>
                      ))}
                    </select>
                    <span aria-hidden="true" style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);pointer-events:none;color:rgba(20,35,26,.6)`)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </span>
                </label>
                <div style={s(`display:flex;flex-direction:column;gap:4px;min-width:0`)}>
                  <div style={s(`display:flex;align-items:flex-end;justify-content:space-between;gap:12px`)}>
                    <label htmlFor="roi-headcount" style={s(`padding-bottom:4px;font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Headcount</label>
                    <span style={s(`display:inline-flex;align-items:baseline;gap:7px`)}>
                      <input id="roi-headcount" type="text" inputMode="numeric" autoComplete="off" value={V.hcShown} onChange={V.typeHc} onFocus={V.hcType} onBlur={V.hcDone} onKeyDown={V.hcEnter} style={s(`width:calc(${V.hcLen} * .56em + 6px);box-sizing:content-box;padding:0 2px 2px;border:0;border-bottom:1.5px dashed rgba(20,35,26,.25);border-radius:0;background:transparent;color:#14231A;font:400 30px/1.05 'DM Serif Display',serif;letter-spacing:-.3px;text-align:right;outline:none`)} className="ri-hcnum" />
                      <span style={s(`font:500 14px 'DM Sans',sans-serif;color:rgba(20,35,26,.6)`)}>people</span>
                    </span>
                  </div>
                  <input type="range" className="nrm-range" min="0" max="1000" step="1" value={V.hcPos} onChange={V.slide} onKeyDown={V.hcKeys} aria-label="Headcount" aria-valuetext={V.hcValText} style={s(`--t:${V.hcT}`)} />
                  <div aria-hidden="true" style={s(`display:flex;justify-content:space-between;font:500 12px 'DM Sans',sans-serif;color:rgba(20,35,26,.45)`)}>
                    <span>20</span>
                    <span>10,000+</span>
                  </div>
                </div>
                {(V.detailOpen) ? (
                  <>
                    <div style={s(`margin-top:6px;padding-top:18px;border-top:1px solid rgba(20,35,26,.1);display:flex;flex-direction:column;gap:14px`)}>
                      <span style={s(`font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(20,35,26,.62);text-wrap:pretty`)}>{"If you know your own numbers, use them. Otherwise these are the "}{V.industryName}{" benchmarks."}</span>
                      <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                        <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Turnover a year</span>
                        <span style={s(`position:relative;display:block`)}>
                          <input type="number" inputMode="decimal" value={V.sTurn.value} onChange={V.sTurn.set} onInput={V.sTurn.set} min={V.sTurn.min} max={V.sTurn.max} step={V.sTurn.step} style={s(`width:100%;height:52px;box-sizing:border-box;padding:0 52px 0 18px;border:1px solid rgba(20,35,26,.14);border-radius:18px 12px 16px 12px / 12px 16px 12px 18px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif`)} className="ri-foa3fa77" />
                          <span style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.55);pointer-events:none`)}>%</span>
                        </span>
                      </label>
                      <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                        <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Unplanned days off, per person</span>
                        <span style={s(`position:relative;display:block`)}>
                          <input type="number" inputMode="decimal" value={V.sAbs.value} onChange={V.sAbs.set} onInput={V.sAbs.set} min={V.sAbs.min} max={V.sAbs.max} step={V.sAbs.step} style={s(`width:100%;height:52px;box-sizing:border-box;padding:0 52px 0 18px;border:1px solid rgba(20,35,26,.14);border-radius:12px 18px 12px 16px / 18px 12px 16px 12px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif`)} className="ri-foa3fa77" />
                          <span style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.55);pointer-events:none`)}>days</span>
                        </span>
                      </label>
                      <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                        <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Average salary</span>
                        <span style={s(`position:relative;display:block`)}>
                          <input type="number" inputMode="decimal" value={V.sSal.value} onChange={V.sSal.set} onInput={V.sSal.set} min={V.sSal.min} max={V.sSal.max} step={V.sSal.step} style={s(`width:100%;height:52px;box-sizing:border-box;padding:0 52px 0 18px;border:1px solid rgba(20,35,26,.14);border-radius:16px 12px 18px 12px / 12px 18px 12px 16px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif`)} className="ri-foa3fa77" />
                          <span style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.55);pointer-events:none`)}>$</span>
                        </span>
                      </label>
                      <button type="button" onClick={V.resetRates} style={s(`align-self:flex-start;padding:0;border:0;background:transparent;color:#4A6B3A;font:500 13px 'DM Sans',sans-serif;cursor:pointer`)} className="ri-ho789e87">Back to the benchmarks</button>
                    </div>
                  </>
                ) : null}
              </div>
              <a href="#human" style={s(`display:flex;align-items:center;justify-content:center;margin-top:20px;height:54px;border-radius:30px 22px 28px 20px / 24px 30px 22px 28px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif`)} className="ri-ho4ead8f ri-ac3e8255">Show me</a>
            </div>
          </div>
        </div>
      </section>
      {(V.chipOn) ? (
        <>
          <div ref={V.chipRef} style={s(`position:fixed;left:50%;bottom:22px;z-index:70;transform:translateX(-50%);display:flex;align-items:center;gap:8px;padding:8px;border-radius:999px;background:linear-gradient(150deg,rgba(250,248,240,.8),rgba(236,240,214,.62));backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);color:#14231A;box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 0 0 1px rgba(255,255,255,.4),0 0 0 1px rgba(217,234,110,.45),0 12px 44px rgba(217,234,110,.34),0 24px 60px rgba(10,20,13,.3);max-width:calc(100vw - 24px);box-sizing:border-box`)}>
            <span style={s(`position:relative;display:inline-flex;flex:none;overflow:hidden;max-width:${V.indMax ?? ''};opacity:${V.indOp ?? ''};margin-right:${V.hcOpen ? '-8px' : '0px'};transition:max-width .45s cubic-bezier(.22,.61,.36,1),opacity .25s ease,margin .45s cubic-bezier(.22,.61,.36,1)`)} aria-hidden={V.hcOpen}>
              <select aria-label="Industry" tabIndex={V.hcOpen ? -1 : 0} value={V.industry} onChange={V.setIndustry} style={s(`display:inline-flex;align-items:center;height:36px;box-sizing:border-box;border:0;border-radius:999px;background:#FAF8F0;box-shadow:0 1px 2px rgba(20,35,26,.12);color:#14231A;font:600 13.5px 'DM Sans',sans-serif;cursor:pointer;appearance:none;-webkit-appearance:none;padding:0 32px 0 14px;max-width:46vw;text-overflow:ellipsis`)} className="ri-foa3fa77">
                {(V.industries || []).map((o, $index) => (
                  <React.Fragment key={$index}>
                    <option value={o.id}>{o.name}</option>
                  </React.Fragment>
                ))}
              </select>
              <span aria-hidden="true" style={s(`position:absolute;right:11px;top:50%;transform:translateY(-50%);pointer-events:none;color:rgba(20,35,26,.6)`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </span>
            <span style={s(`display:inline-flex;align-items:center;flex:none;overflow:hidden;padding:6px 0;margin:-6px 0;max-width:${V.sldMax ?? ''};opacity:${V.sldOp ?? ''};transition:max-width .45s cubic-bezier(.22,.61,.36,1),opacity .3s ease .08s`)} aria-hidden={V.sldHidden}>
              <input type="range" className="nrm-range nrm-range-sm" min="0" max="1000" step="1" value={V.hcPos} onChange={V.slide} onKeyDown={V.hcKeys} tabIndex={V.sldTab} aria-label="Headcount" aria-valuetext={V.hcValText} style={s(`width:${V.sldW ?? ''};margin:0 6px 0 8px;--t:${V.hcT}`)} />
            </span>
            <button type="button" onClick={V.toggleHc} aria-expanded={V.hcOpen} aria-label={V.hcValText + ', change headcount'} style={s(`display:inline-flex;align-items:center;flex:none;height:36px;box-sizing:border-box;border:0;border-radius:999px;background:${V.hcOpen ? '#FFFDF5' : '#FAF8F0'};box-shadow:${V.hcOpen ? '0 0 0 2px #C4D94A,0 0 0 6px rgba(217,234,110,.3)' : '0 1px 2px rgba(20,35,26,.12)'};transition:box-shadow .24s ease,background .24s ease;color:#14231A;font:600 13.5px 'DM Sans',sans-serif;cursor:pointer;padding:0 14px 0 12px;gap:6px;font-variant-numeric:tabular-nums`)} className="ri-ac3e8255">
              {V.headcountLabel}
              <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.6)`)}>people</span>
            </button>
            <button type="button" onClick={V.hcOpen ? V.closeHc : V.backToTop} aria-label={V.hcOpen ? 'Done' : 'Back to the top'} title={V.hcOpen ? 'Done' : 'Back to the top'} style={s(`flex:none;width:36px;height:36px;border-radius:999px;border:0;background:#14231A;color:#F4F2E6;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0`)} className="ri-ho3cfe08 ri-ac3e8255">
              {(V.hcOpen) ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5"></path>
                  <path d="M6 11l6-6 6 6"></path>
                </svg>
              )}
            </button>
          </div>
        </>
      ) : null}
      <section id="human" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;right:-12%;top:-18%;width:64%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(231,142,113,.13),rgba(231,142,113,0) 70%);pointer-events:none`)}></div>
        <div aria-hidden="true" style={s(`position:absolute;left:-14%;bottom:-20%;width:50%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.08),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(96px,11vw,152px)`)}>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px 32px`)}>
            <div ref={V.humanRef} style={s(`min-width:0`)}>
              <h2 style={s(`margin:0;max-width:15em;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance;padding-bottom:.12em;margin-bottom:-.12em`)}>
                The human case:
                <br />
                <span style={s(`background:linear-gradient(105deg,#F6F4E9 8%,#EAF79B 48%,#C4D94A 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent`)}>{V.headcountLabel}{" people who all seem fine."}</span>
              </h2>
              <p style={s(`margin:18px 0 0;max-width:30em;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.82);text-wrap:pretty`)}>
                From the outside, everyone looks fine. {V.exploreLine}
              </p>
            </div>
          </div>
          <div data-m="tiers" style={s(`margin-top:clamp(44px,5.5vw,72px);display:grid;grid-template-columns:repeat(${V.cardCols ?? ''},minmax(0,1fr));gap:12px`)}>
            <div onMouseEnter={V.h1.on} onMouseLeave={V.h1.off} onClick={V.h1.tap} style={s(`position:relative;min-width:0;box-sizing:border-box;padding:22px 22px 24px;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;background:${V.h1.bg ?? ''};box-shadow:${V.h1.ring ?? ''};transition:opacity .3s ease,transform .3s ease,box-shadow .3s ease;opacity:${V.h1.op ?? ''};transform:${V.h1.tf ?? ''}`)}>
              <span style={s(`display:flex;align-items:flex-start;gap:9px;min-height:calc(2 * 1.15 * clamp(19px,1.8vw,22px))`)}>
                <span style={s(`flex:none;margin-top:.45em;width:8px;height:8px;border-radius:50%;background:${V.h1.dot ?? ''}`)}></span>
                <span style={s(`font:400 clamp(19px,1.8vw,22px)/1.15 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>Quietly disengaging</span>
              </span>
              {' '}
              <span style={s(`display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap`)}>
                <span style={s(`display:inline-flex;align-items:center;padding:10px 18px;border-radius:16px 12px 14px 12px / 12px 14px 12px 16px;background:${V.h1.pill ?? ''}`)}><span style={s(`font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:${V.h1.c ?? ''}`)}>{V.h1.n}</span></span>
                <span style={s(`font:500 12.5px 'DM Mono',monospace;letter-spacing:.5px;color:rgba(201,212,194,.7)`)}>{V.h1.pct}</span>
              </span>
            </div>
            <div onMouseEnter={V.h2.on} onMouseLeave={V.h2.off} onClick={V.h2.tap} style={s(`position:relative;min-width:0;box-sizing:border-box;padding:22px 22px 24px;border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;background:${V.h2.bg ?? ''};box-shadow:${V.h2.ring ?? ''};transition:opacity .3s ease,transform .3s ease,box-shadow .3s ease;opacity:${V.h2.op ?? ''};transform:${V.h2.tf ?? ''}`)}>
              <span style={s(`display:flex;align-items:flex-start;gap:9px;min-height:calc(2 * 1.15 * clamp(19px,1.8vw,22px))`)}>
                <span style={s(`flex:none;margin-top:.45em;width:8px;height:8px;border-radius:50%;background:${V.h2.dot ?? ''}`)}></span>
                <span style={s(`font:400 clamp(19px,1.8vw,22px)/1.15 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>Heading toward burnout</span>
              </span>
              {' '}
              <span style={s(`display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap`)}>
                <span style={s(`display:inline-flex;align-items:center;padding:10px 18px;border-radius:12px 16px 12px 14px / 16px 12px 14px 12px;background:${V.h2.pill ?? ''}`)}><span style={s(`font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:${V.h2.c ?? ''}`)}>{V.h2.n}</span></span>
                <span style={s(`font:500 12.5px 'DM Mono',monospace;letter-spacing:.5px;color:rgba(201,212,194,.7)`)}>{V.h2.pct}</span>
              </span>
            </div>
            <div onMouseEnter={V.h3.on} onMouseLeave={V.h3.off} onClick={V.h3.tap} style={s(`position:relative;min-width:0;box-sizing:border-box;padding:22px 22px 24px;border-radius:32px 22px 30px 20px / 20px 30px 22px 32px;background:${V.h3.bg ?? ''};box-shadow:${V.h3.ring ?? ''};transition:opacity .3s ease,transform .3s ease,box-shadow .3s ease;opacity:${V.h3.op ?? ''};transform:${V.h3.tf ?? ''}`)}>
              <span style={s(`display:flex;align-items:flex-start;gap:9px;min-height:calc(2 * 1.15 * clamp(19px,1.8vw,22px))`)}>
                <span style={s(`flex:none;margin-top:.45em;width:8px;height:8px;border-radius:50%;background:${V.h3.dot ?? ''}`)}></span>
                <span style={s(`font:400 clamp(19px,1.8vw,22px)/1.15 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>In burnout, hiding it</span>
              </span>
              {' '}
              <span style={s(`display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap`)}>
                <span style={s(`display:inline-flex;align-items:center;padding:10px 18px;border-radius:14px 12px 16px 12px / 12px 16px 12px 14px;background:${V.h3.pill ?? ''}`)}><span style={s(`font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:${V.h3.c ?? ''}`)}>{V.h3.n}</span></span>
                <span style={s(`font:500 12.5px 'DM Mono',monospace;letter-spacing:.5px;color:rgba(201,212,194,.7)`)}>{V.h3.pct}</span>
              </span>
            </div>
            <div onMouseEnter={V.h4.on} onMouseLeave={V.h4.off} onClick={V.h4.tap} style={s(`position:relative;min-width:0;box-sizing:border-box;padding:22px 22px 24px;border-radius:22px 30px 20px 32px / 30px 20px 32px 22px;background:${V.h4.bg ?? ''};box-shadow:${V.h4.ring ?? ''};transition:opacity .3s ease,transform .3s ease,box-shadow .3s ease;opacity:${V.h4.op ?? ''};transform:${V.h4.tf ?? ''}`)}>
              <span style={s(`display:flex;align-items:flex-start;gap:9px;min-height:calc(2 * 1.15 * clamp(19px,1.8vw,22px))`)}>
                <span style={s(`flex:none;margin-top:.45em;width:8px;height:8px;border-radius:50%;background:${V.h4.dot ?? ''}`)}></span>
                <span style={s(`font:400 clamp(19px,1.8vw,22px)/1.15 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>In genuine crisis</span>
              </span>
              {' '}
              <span style={s(`display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap`)}>
                <span style={s(`display:inline-flex;align-items:center;padding:10px 18px;border-radius:12px 14px 12px 16px / 14px 12px 16px 12px;background:${V.h4.pill ?? ''}`)}><span style={s(`font:400 clamp(32px,3.2vw,40px)/1 'DM Serif Display',serif;color:${V.h4.c ?? ''}`)}>{V.h4.n}</span></span>
                <span style={s(`font:500 12.5px 'DM Mono',monospace;letter-spacing:.5px;color:rgba(201,212,194,.7)`)}>{V.h4.pct}</span>
              </span>
            </div>
          </div>
          <div style={s(`margin-top:clamp(28px,3.5vw,44px)`)}>{V.dotMap}</div>
          <p style={s(`position:relative;margin:20px 0 0;display:flex;align-items:center;gap:8px;font:400 14px 'DM Sans',sans-serif;color:rgba(201,212,194,.75)`)}>
            <span style={s(`width:10px;height:10px;border-radius:50%;background:#D9EA6E;opacity:.7;margin-right:2px`)}></span>
            <span>{V.wellLabel}{" doing well"}</span>
            <button type="button" aria-label="How this is calculated" onMouseEnter={V.srcTip.show} onMouseLeave={V.srcTip.hide} onFocus={V.srcTip.show} onBlur={V.srcTip.hide} onClick={V.srcTip.show} style={s(`display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:999px;background:transparent;color:rgba(201,212,194,.55);cursor:pointer`)} className="ri-ho18295a">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5"></circle>
                <path d="M12 11v5"></path>
                <path d="M12 7.8v.1"></path>
              </svg>
            </button>
            {(V.srcTip.open) ? (
              <>
                <span role="tooltip" style={s(`position:absolute;left:0;top:calc(100% + 8px);z-index:5;width:min(300px,78vw);box-sizing:border-box;padding:12px 14px;border-radius:16px 12px 16px 10px / 12px 16px 10px 16px;background:#F4F2E6;color:#14231A;font:400 13px/1.5 'DM Sans',sans-serif;letter-spacing:0;text-transform:none;box-shadow:0 18px 44px rgba(0,0,0,.28);text-wrap:pretty`)}>{V.srcTip.text}</span>
              </>
            ) : null}
          </p>
        </div>
      </section>
      <section id="business" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#0A140D;color:#F4F2E6`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(112px,13vw,176px)`)}>
          <h2 style={s(`margin:0 auto;max-width:22em;text-align:center;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance;padding-bottom:.12em;margin-bottom:-.12em`)}>
            The business case:
            <br />
            <span style={s(`background:linear-gradient(105deg,#F6F4E9 8%,#EAF79B 48%,#C4D94A 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent`)}>What it costs and what you can win back.</span>
          </h2>
          <div style={s(`margin-top:clamp(40px,5vw,64px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,3vw,40px);align-items:stretch`)}>
            <div style={s(`min-width:0;box-sizing:border-box;padding:clamp(26px,3vw,40px);border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;background:linear-gradient(165deg,rgba(240,165,140,.1),rgba(240,165,140,.03) 70%);display:flex;flex-direction:column`)}>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px`)}>
                <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#F5B9A4`)}>What it costs you · a year</span>
              </div>
              <p style={s(`margin:14px 0 0;display:flex;align-items:baseline;gap:12px;flex-wrap:wrap`)}>
                <span style={s(`font:400 clamp(52px,6vw,80px)/1 'DM Serif Display',serif;letter-spacing:-1px;color:#F0A58C`)}>{V.totalMoney}</span>
                <span style={s(`font:400 18px 'DM Sans',sans-serif;color:rgba(201,212,194,.9)`)}>a year</span>
              </p>
              <div style={s(`margin-top:auto;padding-top:28px`)}>
                <div style={s(`position:relative;display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid rgba(228,240,214,.1)`)}>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(240,165,140,.14);display:flex;align-items:center;justify-content:center;color:#F5B9A4`)}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M13 4H6v16h7"></path>
                      <path d="M10 12h10"></path>
                      <path d="M17 9l3 3-3 3"></path>
                    </svg>
                  </span>
                  <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                    <span style={s(`font:400 clamp(20px,2vw,24px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Turnover</span>
                    <span style={s(`font:400 14.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>{V.turn.sub}</span>
                  </span>
                  <span style={s(`display:flex;align-items:center;gap:6px`)}>
                    <span style={s(`font:400 clamp(24px,2.4vw,30px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>{V.turn.money}</span>
                    <button type="button" aria-label="How this is calculated" onMouseEnter={V.turn.tip.show} onMouseLeave={V.turn.tip.hide} onFocus={V.turn.tip.show} onBlur={V.turn.tip.hide} onClick={V.turn.tip.show} style={s(`display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:999px;background:transparent;color:rgba(201,212,194,.55);cursor:pointer`)} className="ri-ho18295a">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="8.5"></circle>
                        <path d="M12 11v5"></path>
                        <path d="M12 7.8v.1"></path>
                      </svg>
                    </button>
                    {(V.turn.tip.open) ? (
                      <>
                        <span role="tooltip" style={s(`position:absolute;right:0;top:calc(100% + 8px);z-index:5;width:min(300px,78vw);box-sizing:border-box;padding:12px 14px;border-radius:16px 12px 16px 10px / 12px 16px 10px 16px;background:#F4F2E6;color:#14231A;font:400 13px/1.5 'DM Sans',sans-serif;letter-spacing:0;text-transform:none;box-shadow:0 18px 44px rgba(0,0,0,.28);text-wrap:pretty`)}>{V.turn.tip.text}</span>
                      </>
                    ) : null}
                  </span>
                </div>
                <div style={s(`position:relative;display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid rgba(228,240,214,.1)`)}>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(240,165,140,.14);display:flex;align-items:center;justify-content:center;color:#F5B9A4`)}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 6.5h16v13H4z"></path>
                      <path d="M8 4v5M16 4v5M4 10.5h16"></path>
                      <path d="M10 13.5l4 4M14 13.5l-4 4"></path>
                    </svg>
                  </span>
                  <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                    <span style={s(`font:400 clamp(20px,2vw,24px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Absence</span>
                    <span style={s(`font:400 14.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>{V.abs.sub}</span>
                  </span>
                  <span style={s(`display:flex;align-items:center;gap:6px`)}>
                    <span style={s(`font:400 clamp(24px,2.4vw,30px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>{V.abs.money}</span>
                    <button type="button" aria-label="How this is calculated" onMouseEnter={V.abs.tip.show} onMouseLeave={V.abs.tip.hide} onFocus={V.abs.tip.show} onBlur={V.abs.tip.hide} onClick={V.abs.tip.show} style={s(`display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:999px;background:transparent;color:rgba(201,212,194,.55);cursor:pointer`)} className="ri-ho18295a">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="8.5"></circle>
                        <path d="M12 11v5"></path>
                        <path d="M12 7.8v.1"></path>
                      </svg>
                    </button>
                    {(V.abs.tip.open) ? (
                      <>
                        <span role="tooltip" style={s(`position:absolute;right:0;top:calc(100% + 8px);z-index:5;width:min(300px,78vw);box-sizing:border-box;padding:12px 14px;border-radius:16px 12px 16px 10px / 12px 16px 10px 16px;background:#F4F2E6;color:#14231A;font:400 13px/1.5 'DM Sans',sans-serif;letter-spacing:0;text-transform:none;box-shadow:0 18px 44px rgba(0,0,0,.28);text-wrap:pretty`)}>{V.abs.tip.text}</span>
                      </>
                    ) : null}
                  </span>
                </div>
                <div style={s(`position:relative;display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid rgba(228,240,214,.1)`)}>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(240,165,140,.14);display:flex;align-items:center;justify-content:center;color:#F5B9A4`)}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 8h12.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 5 8z"></path>
                      <path d="M21 11v2"></path>
                      <path d="M6.5 10.5v3"></path>
                    </svg>
                  </span>
                  <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                    <span style={s(`font:400 clamp(20px,2vw,24px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Presenteeism</span>
                    <span style={s(`font:400 14.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>{V.pres.sub}</span>
                  </span>
                  <span style={s(`display:flex;align-items:center;gap:6px`)}>
                    <span style={s(`font:400 clamp(24px,2.4vw,30px)/1 'DM Serif Display',serif;color:#F6F4E9`)}>{V.pres.money}</span>
                    <button type="button" aria-label="How this is calculated" onMouseEnter={V.pres.tip.show} onMouseLeave={V.pres.tip.hide} onFocus={V.pres.tip.show} onBlur={V.pres.tip.hide} onClick={V.pres.tip.show} style={s(`display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:999px;background:transparent;color:rgba(201,212,194,.55);cursor:pointer`)} className="ri-ho18295a">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="8.5"></circle>
                        <path d="M12 11v5"></path>
                        <path d="M12 7.8v.1"></path>
                      </svg>
                    </button>
                    {(V.pres.tip.open) ? (
                      <>
                        <span role="tooltip" style={s(`position:absolute;right:0;top:calc(100% + 8px);z-index:5;width:min(300px,78vw);box-sizing:border-box;padding:12px 14px;border-radius:16px 12px 16px 10px / 12px 16px 10px 16px;background:#F4F2E6;color:#14231A;font:400 13px/1.5 'DM Sans',sans-serif;letter-spacing:0;text-transform:none;box-shadow:0 18px 44px rgba(0,0,0,.28);text-wrap:pretty`)}>{V.pres.tip.text}</span>
                      </>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>
            <div style={s(`min-width:0;box-sizing:border-box;padding:clamp(26px,3vw,40px);border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;background:linear-gradient(165deg,rgba(217,234,110,.16),rgba(217,234,110,.04) 70%);display:flex;flex-direction:column`)}>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px`)}>
                <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>What comes back · with nørma</span>
                <img src="/assets/v5/norma-app-icon.png" alt="nørma" width="56" height="56" style={s(`display:block;border-radius:15px;box-shadow:0 8px 22px rgba(0,0,0,.4)`)} />
              </div>
              <p style={s(`position:relative;margin:14px 0 0;display:flex;align-items:baseline;gap:12px;flex-wrap:wrap`)}>
                <span style={s(`font:400 clamp(52px,6vw,80px)/1 'DM Serif Display',serif;letter-spacing:-1px;color:#EAF79B`)}>{V.recoverMoney}</span>
                <span style={s(`display:inline-flex;align-items:center;gap:4px;font:400 18px 'DM Sans',sans-serif;color:rgba(201,212,194,.9)`)}>
                  a year
                  <button type="button" aria-label="How this is calculated" onMouseEnter={V.caseTip.show} onMouseLeave={V.caseTip.hide} onFocus={V.caseTip.show} onBlur={V.caseTip.hide} onClick={V.caseTip.show} style={s(`display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:999px;background:transparent;color:rgba(201,212,194,.55);cursor:pointer`)} className="ri-ho18295a">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5"></circle>
                      <path d="M12 11v5"></path>
                      <path d="M12 7.8v.1"></path>
                    </svg>
                  </button>
                  {(V.caseTip.open) ? (
                    <>
                      <span role="tooltip" style={s(`position:absolute;left:0;top:calc(100% + 8px);z-index:5;width:min(300px,78vw);box-sizing:border-box;padding:12px 14px;border-radius:16px 12px 16px 10px / 12px 16px 10px 16px;background:#F4F2E6;color:#14231A;font:400 13px/1.5 'DM Sans',sans-serif;letter-spacing:0;text-transform:none;box-shadow:0 18px 44px rgba(0,0,0,.28);text-wrap:pretty`)}>{V.caseTip.text}</span>
                    </>
                  ) : null}
                </span>
              </p>
              <ul style={s(`list-style:none;margin:auto 0 0;padding:28px 0 0`)}>
                <li style={s(`display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid rgba(217,234,110,.14)`)}>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;background:rgba(217,234,110,.16);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                  </span>
                  <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                    <span style={s(`font:400 clamp(20px,2vw,24px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>People stay</span>
                    <span style={s(`font:400 14.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>{V.stay.sub}</span>
                  </span>
                  <span style={s(`font:400 clamp(24px,2.4vw,30px)/1 'DM Serif Display',serif;color:#EAF79B`)}>{V.stay.n}</span>
                </li>
                <li style={s(`display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid rgba(217,234,110,.14)`)}>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(217,234,110,.16);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                  </span>
                  <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                    <span style={s(`font:400 clamp(20px,2vw,24px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Sick days back</span>
                    <span style={s(`font:400 14.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>{V.days.sub}</span>
                  </span>
                  <span style={s(`font:400 clamp(24px,2.4vw,30px)/1 'DM Serif Display',serif;color:#EAF79B`)}>{V.days.n}</span>
                </li>
                <li style={s(`display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid rgba(217,234,110,.14)`)}>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;background:rgba(217,234,110,.16);display:flex;align-items:center;justify-content:center;color:#EAF79B`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                  </span>
                  <span style={s(`flex:1;min-width:0;display:flex;flex-direction:column;gap:3px`)}>
                    <span style={s(`font:400 clamp(20px,2vw,24px)/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Step back from burnout</span>
                    <span style={s(`font:400 14.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>{V.burn.sub}</span>
                  </span>
                  <span style={s(`font:400 clamp(24px,2.4vw,30px)/1 'DM Serif Display',serif;color:#EAF79B`)}>{V.burn.n}</span>
                </li>
              </ul>
            </div>
          </div>
          <p style={s(`margin:clamp(40px,5vw,64px) auto 0;max-width:34em;text-align:center;font:400 clamp(17px,1.35vw,18px)/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>
            Turnover, absence and presenteeism are where the human case shows up in your numbers, and where it comes back. Human strategy comes first. Business strategy follows from it.
          </p>
        </div>
      </section>
      <section style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0;background:#F4F2E6;color:#14231A`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(88px,11vw,152px);padding-bottom:clamp(72px,9vw,120px)`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(24px,3vw,40px);margin-bottom:clamp(72px,9vw,120px)`)}>
            <div style={s(`padding-top:22px;border-top:1px solid rgba(20,35,26,.12)`)}>
              <span aria-hidden="true" style={s(`display:flex;align-items:center;justify-content:center;width:46px;height:46px;margin-bottom:16px;border-radius:16px 12px 15px 11px / 12px 16px 11px 15px;background:linear-gradient(160deg,#EEF1CD,#E2E8BA);box-shadow:inset 0 0 0 1px rgba(20,35,26,.06);color:#14231A`)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"></ellipse>
                  <path d="M4.5 5.5v6.2c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V5.5"></path>
                  <path d="M4.5 11.7v6.2c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-6.2"></path>
                </svg>
              </span>
              <span style={s(`display:block;font:400 22px 'DM Serif Display',serif;color:#14231A`)}>Nothing new to collect</span>
              <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>Leavers, sick days and claims already sit in your HR and WHS systems. That’s the baseline.</p>
            </div>
            <div style={s(`padding-top:22px;border-top:1px solid rgba(20,35,26,.12)`)}>
              <span aria-hidden="true" style={s(`display:flex;align-items:center;justify-content:center;width:46px;height:46px;margin-bottom:16px;border-radius:12px 16px 11px 15px / 15px 11px 16px 12px;background:linear-gradient(160deg,#EEF1CD,#E2E8BA);box-shadow:inset 0 0 0 1px rgba(20,35,26,.06);color:#14231A`)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="4.5" width="17" height="16" rx="3"></rect>
                  <path d="M8 2.8v3.4M16 2.8v3.4M3.5 9.5h17"></path>
                  <path d="M9 15l2 2 4-4"></path>
                </svg>
              </span>
              <span style={s(`display:block;font:400 22px 'DM Serif Display',serif;color:#14231A`)}>One check-in a month</span>
              <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
                Your people get their own picture first. You get the group signal.{' '}
                <a href="/your-people/" style={s(`color:#14231A;border-bottom:1px solid rgba(20,35,26,.3)`)} className="ri-hodb1b46">See the app ›</a>
              </p>
            </div>
            <div style={s(`padding-top:22px;border-top:1px solid rgba(20,35,26,.12)`)}>
              <span aria-hidden="true" style={s(`display:flex;align-items:center;justify-content:center;width:46px;height:46px;margin-bottom:16px;border-radius:15px 11px 16px 12px / 11px 15px 12px 16px;background:linear-gradient(160deg,#EEF1CD,#E2E8BA);box-shadow:inset 0 0 0 1px rgba(20,35,26,.06);color:#14231A`)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.5s7.5-3.6 7.5-9.4V5.6L12 2.8 4.5 5.6v6.5c0 5.8 7.5 9.4 7.5 9.4z"></path>
                  <path d="M9 12l2.2 2.2L15.5 10"></path>
                </svg>
              </span>
              <span style={s(`display:block;font:400 22px 'DM Serif Display',serif;color:#14231A`)}>Knowing, doing, proving</span>
              <p style={s(`margin:8px 0 0;font:400 15.5px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
                Where to look, what to do, and a dated record of both.{' '}
                <a href="/for-leaders/" style={s(`color:#14231A;border-bottom:1px solid rgba(20,35,26,.3)`)} className="ri-hodb1b46">See the dashboard ›</a>
              </p>
            </div>
          </div>
          <div style={s(`position:relative;max-width:640px;margin:0 auto;box-sizing:border-box;padding:clamp(72px,9vw,120px) clamp(24px,5vw,64px) clamp(52px,6vw,80px);text-align:center`)}>
            <div aria-hidden="true" style={s(`position:absolute;inset:0;border-radius:320px 320px 32px 26px / 320px 320px 32px 26px;background:radial-gradient(62% 40% at 50% 16%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 50%,#ECE8D7 100%)`)}></div>
            <div style={s(`position:relative`)}>
              <img src="/assets/v5/norma-happy.png" alt="" width="92" height="124" style={s(`display:block;margin:0 auto;filter:drop-shadow(0 0 1px rgba(20,35,26,.7)) drop-shadow(0 14px 20px rgba(20,35,26,.16))`)} />
              <h2 style={s(`margin:26px auto 0;max-width:12em;font:400 clamp(40px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;text-wrap:balance`)}>Look after your people. The numbers follow.</h2>
              <p style={s(`margin:20px auto 0;max-width:26em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
                Fewer people leaving and fewer sick days are the part you can count. People who are really there when they show up is the bigger part, and the hardest to put a number on. Both come from a workforce that’s doing well.
              </p>
              <div style={s(`display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:34px`)}>
                <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 28px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="ri-ac3e8255">Book a demo</a>
                <a href="/for-leaders/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 24px;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif`)} className="ri-ho3cfe08 ri-ac3e8255">
                  See the dashboard
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
              <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">Your people</a>
              <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">For leaders</a>
              <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">ROI</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">Help</a>
              <a href="/book-a-demo/" style={s(`color:rgba(20,35,26,.72)`)} className="ri-ho789e87">Book a demo</a>
            </nav>
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(20,35,26,.08);font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>
            <span>© 2026 The Artistry of Humanity Pty Ltd</span>
            <span style={s(`display:flex;flex-wrap:wrap;gap:20px`)}>
              <a href="/privacy/" style={s(`color:rgba(20,35,26,.66)`)} className="ri-ho789e87">Privacy policy</a>
              <a href="/terms/" style={s(`color:rgba(20,35,26,.66)`)} className="ri-ho789e87">Terms of use</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.66)`)} className="ri-ho789e87">Help centre</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
      </>
    );
  }
}

export default RoiPage;
