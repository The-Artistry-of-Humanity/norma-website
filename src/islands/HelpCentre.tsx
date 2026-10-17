// @ts-nocheck
/* Help centre (home, path index, search and article views), generated from the
   v3 handoff (reference/Norma Help Centre.dc.html) by dc2jsx: markup and styles
   verbatim. Articles live at real URLs (/help/{app|dashboard}/{slug}/) and every
   route to one is a plain link, so pages work without JavaScript and links can
   be opened in a new tab. Content comes from src/data/help-centre.json via
   src/data/help.ts. Changes after the Tensaria review (13 Oct 2026): links not
   buttons, word-by-word search over the article text, keyboard and screen-reader
   support for search, per-article callouts, read time, updated date, related
   articles, and path index pages. */
import React from 'react';
import { s } from '../lib/s';
import Phone from './Phone';
import { ALL, BY, DOCS, TOP, PROBLEMS, PATH_URL, slugify, search } from '../data/help';
import './HelpCentre.dc.css';

const SHAPES = ['32px 22px 30px 20px / 22px 32px 20px 30px', '22px 30px 20px 28px / 30px 20px 28px 22px', '22px 14px 20px 12px / 14px 20px 12px 22px', '12px 22px 14px 20px / 20px 12px 22px 14px'];
const STEP_DISCS = ['52% 48% 50% 50% / 50% 54% 46% 50%', '48% 52% 50% 50% / 54% 50% 50% 46%', '50% 50% 48% 52% / 46% 50% 54% 50%'];
const go = (url) => { if (typeof window !== 'undefined') window.location.assign(url); };
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const fmtDate = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : ''; };
const searchUrl = (q) => '/help/search/?q=' + encodeURIComponent(q.trim());

// Crisis numbers become tap-to-call links wherever they appear in crisis copy.
const TEL = { '13 11 14': '131114', '1300 22 4636': '1300224636', '000': '000', '911': '911', '988': '988' };
const withTel = (text) => text.split(/\b(13 11 14|1300 22 4636|000|911|988)\b/).map((part, i) => (TEL[part] ? <a key={i} href={`tel:${TEL[part]}`} className="hc-tel">{part}</a> : part));

const PATH_INFO = {
  app: { eyebrow: 'THE APP', title: 'I use the nørma app', line: 'Check-ins, reflections, habits and journeys. What is private, and how to keep it that way.', d1: 'M7 2.5h10a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V4A1.5 1.5 0 0 1 7 2.5z', d2: 'M10.5 18.5h3' },
  dash: { eyebrow: 'THE DASHBOARD', title: 'I run nørma for my organisation', line: 'Reading the signal, acting on it, and setting up people, teams and sign-in.', d1: 'M3 4.5h18v12H3z', d2: 'M8 20.5h8M12 16.5v4' },
};
const CALLOUT = {
  app: { label: 'YOUR PRIVACY', text: 'Nobody where you work can read your entries. Your answers and habits reach them only inside group figures, never with your name.' },
  dash: { label: 'WHAT YOU SEE', text: 'Group figures only, never a person’s answers. Groups below your organisation’s minimum never show, and in a small group a figure can rest on one answer.' },
  crisis: { label: 'SOMEONE TO TALK TO', text: 'In an emergency, call 000 in Australia or 911 in the United States. Lifeline is on 13 11 14 (Australia) and 988 (United States), any time. nørma will not alert your employer or anyone else.' },
};
const CONTACT = {
  app: 'Your organisation’s administrator can help with your account, invitations and anything about how nørma works where you are.',
  dash: 'Contact your nørma contact. They can help with setup, sign-in, your agreement and anything this help centre doesn’t answer.',
};

export default class HelpCentre extends React.Component {
  state = { path: this.props.path ?? 'app', view: this.props.view ?? 'home', id: this.props.id ?? 'a-signin', q: this.props.q ?? '', active: 0, mac: true };
  searchRef = React.createRef(); heroRef = React.createRef();
  pickApp = (e) => { if (this.state.view === 'home') { e.preventDefault(); this.setState({ path: 'app' }); } };
  pickDash = (e) => { if (this.state.view === 'home') { e.preventDefault(); this.setState({ path: 'dash' }); } };
  setQ = e => {
    const q = e.target.value; this.setState({ q, active: 0 });
    if (this.state.view === 'search') history.replaceState(null, '', q.trim() ? searchUrl(q) : '/help/search/');
  };
  focusSearch = () => { const el = this.heroRef.current || this.searchRef.current; if (el) el.focus(); };
  onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.focusSearch(); } };
  onInputKey = e => {
    const n = this.shown().length;
    if (e.key === 'ArrowDown' && n) { e.preventDefault(); this.setState({ active: (this.state.active + 1) % n }); }
    else if (e.key === 'ArrowUp' && n) { e.preventDefault(); this.setState({ active: (this.state.active - 1 + n) % n }); }
    else if (e.key === 'Enter' && this.state.q.trim()) {
      e.preventDefault();
      const r = this.shown();
      if (this.state.view === 'search') { if (r[0]) go(r[Math.min(this.state.active, r.length - 1)].url); }
      else go(r.length ? r[Math.min(this.state.active, r.length - 1)].url : searchUrl(this.state.q));
    }
    else if (e.key === 'Escape' && this.state.q) { this.setState({ q: '', active: 0 }); }
  };
  results() { const q = this.state.q.trim(); return q ? search(q) : []; }
  // The dropdowns show the first eight; the search page shows them all.
  shown() { const r = this.results(); return this.state.view === 'search' ? r : r.slice(0, 8); }
  componentDidMount() {
    window.addEventListener('keydown', this.onKey);
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    if (!mac) this.setState({ mac: false });
    if (this.state.view === 'search') { const q = new URLSearchParams(location.search).get('q') || ''; this.setState({ q }); }
    // old reference-style links (#a-checkin) and /help#dashboard still work
    const h = (location.hash || '').slice(1);
    if (this.state.view === 'home') { if (BY[h]) go(BY[h].url); else if (h === 'dashboard') this.setState({ path: 'dash' }); }
  }
  componentWillUnmount() { window.removeEventListener('keydown', this.onKey); }

  // One results list, used by the hero search, the top-bar search and the search page.
  renderResults(listId, list, full) {
    const st = this.state;
    return (
      <>
        <div id={listId} role="listbox" aria-label="Search results" style={s(full ? `display:flex;flex-direction:column;gap:6px` : `display:flex;flex-direction:column;gap:2px`)}>
          {(full ? list : list.slice(0, 8)).map((a, i) => (
            <a key={a.id} id={`${listId}-${i}`} role="option" aria-selected={i === st.active} href={a.url} style={s(full ? `display:flex;flex-direction:column;gap:6px;padding:18px 20px;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;border:1px solid rgba(228,240,214,.09);background:linear-gradient(158deg,rgba(228,240,214,.085),rgba(228,240,214,.035))` : `display:flex;flex-direction:column;gap:4px;text-align:left;padding:10px 12px;border-radius:14px;background:transparent`)} className="hc-ho0c9b04 hc-opt">
              <span style={s(`display:flex;align-items:center;gap:8px`)}>
                <span style={s(`font:500 ${full ? 16 : 14}px 'DM Sans',sans-serif;color:#F6F4E9`)}>{a.title}</span>
                <span style={s(`padding:2px 7px;border-radius:999px;background:rgba(228,240,214,.07);font:500 10.5px 'DM Mono',monospace;letter-spacing:.6px;color:rgba(201,212,194,.78)`)}>{a.path === 'app' ? 'APP' : 'DASHBOARD'}</span>
              </span>
              <span style={s(`font:400 ${full ? 14 : 12.5}px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>{a.summary}</span>
            </a>
          ))}
        </div>
        {!list.length ? (
          <div style={s(`padding:14px 12px;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Nothing matches that yet. Try fewer words, or “check-in”, “privacy” or “participation”. If you need someone to talk to now, see <a href={BY['a-crisis'].url} style={s(`color:#D9EA6E`)}>When you need more support</a>.</div>
        ) : null}
        {!full && list.length > 8 ? (
          <a href={searchUrl(st.q)} style={s(`display:block;padding:10px 12px;font:500 13px 'DM Sans',sans-serif;color:#D9EA6E`)}>{`See all ${list.length} results ›`}</a>
        ) : null}
      </>
    );
  }

  // The search input, with the ARIA combobox pattern and a live result count.
  renderInput(ref, listId, big) {
    const st = this.state, n = this.shown().length, total = this.results().length, open = !!st.q.trim();
    return (
      <>
        <input ref={ref} value={st.q} onChange={this.setQ} onKeyDown={this.onInputKey} placeholder={big ? 'Search articles, e.g. “who sees my answers”' : 'Search the help centre'} aria-label="Search the help centre"
          role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={open && n ? `${listId}-${Math.min(st.active, n - 1)}` : undefined}
          style={s(big ? `flex:1;min-width:0;height:100%;border:0;outline:none;background:transparent;font:400 16px 'DM Sans',sans-serif;color:#F6F4E9` : `flex:1;min-width:0;height:100%;border:0;outline:none;background:transparent;font:400 14px 'DM Sans',sans-serif;color:#F6F4E9`)} />
        <span aria-hidden="true" style={s(big ? `flex:none;padding:3px 8px;border-radius:7px;border:1px solid rgba(228,240,214,.16);font:500 11.5px 'DM Mono',monospace;color:rgba(201,212,194,.7)` : `flex:none;padding:2px 7px;border-radius:6px;border:1px solid rgba(228,240,214,.16);font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.7)`)}>{st.mac ? '⌘K' : 'Ctrl K'}</span>
        <span className="hc-sr" aria-live="polite">{open ? (total ? `${total} result${total === 1 ? '' : 's'}` : 'No results') : ''}</span>
      </>
    );
  }

  renderVals() {
    const st = this.state, seg = on => ({ bg: on ? 'rgba(217,234,110,.14)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.8)' });
    const all = this.results();
    const count = p => ALL.filter(a => a.path === p).length;
    const pathCards = ['app', 'dash'].map((p, i) => ({ ...PATH_INFO[p], r: SHAPES[i], count: count(p), href: PATH_URL[p], top: TOP[p].map(id => ({ title: BY[id].title, href: BY[id].url })) }));
    const problems = PROBLEMS[st.path].map(([id, qq, a], i) => ({ q: qq, a, href: BY[id].url, r: SHAPES[i % 4] }));
    const nav = DOCS[st.path].groups.map(([name, items]) => ({ upper: name.toUpperCase(), items: items.map(([id, title]) => { const on = id === st.id; return { title, href: BY[id].url, on, bg: on ? 'rgba(217,234,110,.1)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.74)', w: on ? 500 : 400 }; }) }));
    const A = BY[st.id] || ALL[0], list = ALL.filter(a => a.path === A.path), idx = list.findIndex(a => a.id === A.id);
    const pv = idx > 0 ? list[idx - 1] : null, nx = idx < list.length - 1 ? list[idx + 1] : null;
    const sameGroup = list.filter(a => a.group === A.group && a.id !== A.id);
    const related = (sameGroup.length >= 2 ? sameGroup : [...sameGroup, ...list.filter(a => a.group !== A.group && a.id !== A.id)]).slice(0, 3);
    const crisis = A.callout === 'crisis', isApp = A.path === 'app';
    const call = crisis ? CALLOUT.crisis : isApp ? CALLOUT.app : CALLOUT.dash;
    const steps = (A.body && A.body.steps) || [];
    const art = { ...A, hasShot: !!A.shot, tagUpper: (A.pathLabel + ' · ' + A.group).toUpperCase(), crisis, showCall: A.callout !== 'none',
      callLabel: call.label, callText: call.text, hasSteps: steps.length > 0, steps, pathUrl: PATH_URL[A.path], groupUrl: PATH_URL[A.path] + '#' + A.groupSlug,
      readLabel: `${A.minutes} MIN READ`, updatedLabel: fmtDate(A.updated) ? 'UPDATED ' + fmtDate(A.updated) : '', contact: CONTACT[A.path],
      callBg: crisis ? 'rgba(230,199,126,.08)' : 'rgba(217,234,110,.06)', callBc: crisis ? 'rgba(230,199,126,.3)' : 'rgba(217,234,110,.25)', callEye: crisis ? '#EFDCAE' : '#DCEC85' };
    const pathGroups = DOCS[st.path].groups.map(([name, items]) => ({ name, slug: slugify(name), items: items.map(([id]) => BY[id]) }));
    return {
      q: st.q, hasQ: !!st.q.trim(), all,
      isHome: st.view === 'home', isArticle: st.view === 'article', isPath: st.view === 'path', isSearch: st.view === 'search',
      pickApp: this.pickApp, pickDash: this.pickDash, segApp: seg(st.path === 'app'), segDash: seg(st.path === 'dash'),
      appHref: st.view === 'article' && st.path === 'app' ? A.url : PATH_URL.app, dashHref: st.view === 'article' && st.path === 'dash' ? A.url : PATH_URL.dash,
      pathCards, problems, nav, art, prev: pv && { title: pv.title, href: pv.url }, next: nx && { title: nx.title, href: nx.url }, related,
      pathInfo: PATH_INFO[st.path], pathLabel: DOCS[st.path].label, pathGroups,
    };
  }

  renderTopBar(V) {
    return (
      <div data-r="wrap" style={s(`max-width:1320px;margin:0 auto;padding:28px 32px 0;box-sizing:border-box;display:flex;align-items:center;gap:24px`)}>
        <div data-r="side" style={s(`flex:none;width:250px;display:flex;padding:4px;box-sizing:border-box;border-radius:999px;border:1px solid rgba(228,240,214,.12);background:rgba(10,19,13,.4)`)}>
          <a href={PATH_URL.app} aria-current={V.segApp.bg !== 'transparent' ? 'true' : undefined} style={s(`flex:1;text-align:center;padding:8px 10px;border-radius:999px;background:${V.segApp.bg ?? ''};color:${V.segApp.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The app</a>
          <a href={PATH_URL.dash} aria-current={V.segDash.bg !== 'transparent' ? 'true' : undefined} style={s(`flex:1;text-align:center;padding:8px 10px;border-radius:999px;background:${V.segDash.bg ?? ''};color:${V.segDash.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The dashboard</a>
        </div>
        <div data-r="topsearch" style={s(`position:relative;z-index:30;flex:1;max-width:340px;margin-left:auto`)}>
          <div style={s(`display:flex;align-items:center;gap:10px;height:38px;padding:0 10px 0 15px;border-radius:999px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.1)`)} className="hc-topsearch">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.7)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5"></circle>
              <path d="M16 16 L20.5 20.5"></path>
            </svg>
            {this.renderInput(this.searchRef, 'hc-top-results', false)}
          </div>
          {(V.hasQ) ? (
            <div style={s(`position:absolute;left:0;right:0;top:48px;padding:8px;border-radius:22px 16px 24px 14px / 16px 24px 14px 22px;background:#14291C;border:1px solid rgba(228,240,214,.12);box-shadow:0 30px 70px rgba(0,0,0,.55);display:flex;flex-direction:column;gap:2px;max-height:440px;overflow:auto`)}>
              {this.renderResults('hc-top-results', V.all, false)}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const V = { ...this.props, ...this.renderVals() };
    const eyebrow = `font:600 11px 'DM Sans',sans-serif;letter-spacing:2.2px;color:#D9EA6E`;
    return (
      <>
      {(V.isHome || V.isSearch) ? (
        <>
          <div id="main" style={s(`position:relative;z-index:5;background:linear-gradient(178deg,#1A3524 0%,#0F2015 52%,#0F2015 100%)`)}>
            {/* Glow clipped in its own layer so the search results can overlap the cards below. */}
            <div style={s(`position:absolute;inset:0;overflow:hidden;pointer-events:none`)}><div style={s(`position:absolute;left:50%;top:-140px;width:900px;height:560px;margin-left:-450px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.13),rgba(0,0,0,0) 72%)`)}></div></div>
            <div data-r="wrap" style={s(`position:relative;max-width:1180px;margin:0 auto;padding:96px 40px 72px;box-sizing:border-box;text-align:center`)}>
              <span style={s(eyebrow)}>NØRMA HELP CENTRE</span>
              <h1 style={s(`margin:18px 0 0;font:400 clamp(42px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#F6F4E9`)}>{V.isSearch ? 'Search the help centre' : 'How can we help?'}</h1>
              {V.isHome ? <p style={s(`margin:18px auto 0;max-width:540px;font:400 17px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.8);text-wrap:pretty`)}>Two ways in: the app everyone uses, and the dashboard leaders and administrators work from.</p> : null}
              <div style={s(`position:relative;width:100%;max-width:600px;margin:34px auto 0;text-align:left`)}>
                <label style={s(`display:flex;align-items:center;gap:12px;height:58px;padding:0 18px 0 20px;box-sizing:border-box;border-radius:20px 14px 22px 16px / 14px 22px 16px 20px;background:rgba(228,240,214,.07);border:1px solid rgba(228,240,214,.14);cursor:text;transition:all .2s ease`)} className="hc-ho151e36 hc-herosearch">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.8)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5"></circle>
                    <path d="M16 16 L20.5 20.5"></path>
                  </svg>
                  {this.renderInput(this.heroRef, 'hc-hero-results', true)}
                </label>
                {(V.hasQ && V.isHome) ? (
                  <div style={s(`position:absolute;z-index:20;left:0;right:0;top:66px;padding:8px;border-radius:22px 16px 24px 14px / 16px 24px 14px 22px;background:#14291C;border:1px solid rgba(228,240,214,.12);box-shadow:0 30px 70px rgba(0,0,0,.55);display:flex;flex-direction:column;gap:2px;max-height:440px;overflow:auto`)}>
                    {this.renderResults('hc-hero-results', V.all, false)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
      {(V.isSearch) ? (
        <div data-r="wrap" style={s(`max-width:760px;margin:0 auto;padding:0 40px;box-sizing:border-box`)}>
          {V.hasQ ? (
            <>
              <div style={s(`margin:8px 0 18px;font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.68)`)}>{`${V.all.length} RESULT${V.all.length === 1 ? '' : 'S'} FOR “${V.q.trim().toUpperCase()}”`}</div>
              {this.renderResults('hc-hero-results', V.all, true)}
            </>
          ) : (
            <p style={s(`margin:8px 0 0;text-align:center;font:400 15px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>Type a few words above, or browse <a href={PATH_URL.app} style={s(`color:#D9EA6E`)}>the app</a> and <a href={PATH_URL.dash} style={s(`color:#D9EA6E`)}>the dashboard</a> articles.</p>
          )}
        </div>
      ) : null}
      {(V.isHome) ? (
        <>
          <div data-r="wrap" style={s(`max-width:1180px;margin:0 auto;padding:0 40px;box-sizing:border-box`)}>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:20px;margin-top:-8px`)}>
              {(V.pathCards || []).map((pc, $index) => (
                <React.Fragment key={$index}>
                  <div style={s(`display:flex;flex-direction:column;padding:34px 34px 30px;border-radius:${pc.r ?? ''};background:linear-gradient(158deg,rgba(228,240,214,.1),rgba(228,240,214,.04));border:1px solid rgba(228,240,214,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)`)}>
                    <div style={s(`display:flex;align-items:center;gap:14px`)}>
                      <span style={s(`flex:none;width:48px;height:48px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);color:#EAF79B`)}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d={pc.d1}></path>
                          <path d={pc.d2}></path>
                        </svg>
                      </span>
                      <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>{pc.eyebrow}</span>
                    </div>
                    <h2 style={s(`margin:22px 0 0;font:400 30px/1.12 'DM Serif Display',serif;color:#F6F4E9`)}>{pc.title}</h2>
                    <p style={s(`margin:10px 0 0;font:400 15px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.8);text-wrap:pretty`)}>{pc.line}</p>
                    <div style={s(`display:flex;flex-direction:column;margin-top:22px`)}>
                      {(pc.top || []).map((t, $index) => (
                        <React.Fragment key={$index}>
                          <a href={t.href} style={s(`display:flex;align-items:center;gap:12px;padding:13px 2px;border-top:1px solid rgba(228,240,214,.08);background:transparent;text-align:left;font:400 15px 'DM Sans',sans-serif;color:rgba(244,242,230,.9);transition:all .2s ease`)} className="hc-ho950d73">
                            <span style={s(`flex:1`)}>{t.title}</span>
                            <span aria-hidden="true" style={s(`color:rgba(201,212,194,.5)`)}>›</span>
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                    <a href={pc.href} style={s(`align-self:flex-start;margin-top:18px;padding:0;font:500 14px 'DM Sans',sans-serif;color:#D9EA6E`)} className="hc-ho950d73">{"Browse all "}{pc.count}{" articles ›"}</a>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-top:96px`)}>
              <div>
                <span style={s(eyebrow)}>SOLVE A PROBLEM</span>
                <h2 style={s(`margin:14px 0 0;font:400 clamp(30px,3.4vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.5px;color:#F6F4E9`)}>What people usually come here for.</h2>
              </div>
              <div style={s(`display:inline-flex;padding:4px;border-radius:999px;border:1px solid rgba(228,240,214,.12);background:rgba(10,19,13,.4)`)}>
                <button onClick={V.pickApp} aria-pressed={V.segApp.bg !== 'transparent'} style={s(`padding:9px 16px;border-radius:999px;border:0;cursor:pointer;background:${V.segApp.bg ?? ''};color:${V.segApp.c ?? ''};font:500 13.5px 'DM Sans',sans-serif;transition:all .3s ease`)}>I use the app</button>
                <button onClick={V.pickDash} aria-pressed={V.segDash.bg !== 'transparent'} style={s(`padding:9px 16px;border-radius:999px;border:0;cursor:pointer;background:${V.segDash.bg ?? ''};color:${V.segDash.c ?? ''};font:500 13.5px 'DM Sans',sans-serif;transition:all .3s ease`)}>I run nørma</button>
              </div>
            </div>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;margin-top:28px`)}>
              {(V.problems || []).map((pr, $index) => (
                <React.Fragment key={$index}>
                  <a href={pr.href} style={s(`display:flex;flex-direction:column;justify-content:space-between;gap:28px;min-height:150px;padding:22px 22px 20px;box-sizing:border-box;text-align:left;border-radius:${pr.r ?? ''};background:linear-gradient(158deg,rgba(228,240,214,.085),rgba(228,240,214,.035));box-shadow:inset 0 1px 0 rgba(255,255,255,.04);border:1px solid rgba(228,240,214,.09);font-family:'DM Sans',sans-serif;transition:all .3s ease`)} className="hc-ho648b7a">
                    <span style={s(`font:600 16.5px/1.4 'DM Sans',sans-serif;letter-spacing:-.1px;color:#F6F4E9;text-wrap:pretty`)}>{pr.q}</span>
                    <span style={s(`font:500 12.5px 'DM Sans',sans-serif;color:#D9EA6E`)}>{pr.a}{" ›"}</span>
                  </a>
                </React.Fragment>
              ))}
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:10px 32px;margin:96px 0 0;padding:22px 0 0;border-top:1px solid rgba(228,240,214,.08);font:400 13.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>
              <span style={s(`flex:1 1 360px;text-wrap:pretty`)}>
                nørma supports wellbeing day to day. It isn’t a crisis service, so for urgent support please reach out to someone directly.
              </span>
              <span style={s(`display:flex;flex-wrap:wrap;gap:6px 18px;color:rgba(244,242,230,.82)`)}>
                <span>{withTel('000 or 911 in an emergency')}</span>
                <span>{withTel('Lifeline 13 11 14')}</span>
                <span>{withTel('988 in the US')}</span>
              </span>
            </div>
          </div>
        </>
      ) : null}
      {(V.isPath) ? (
        <>
          {this.renderTopBar(V)}
          <div id="main" data-r="wrap" style={s(`max-width:880px;margin:0 auto;padding:44px 32px 40px;box-sizing:border-box`)}>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:8px;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>
              <a href="/help/" style={s(`color:rgba(201,212,194,.82)`)} className="hc-ho950d73">Help centre</a>
              <span aria-hidden="true">›</span>
              <span>{V.pathLabel}</span>
            </div>
            <div style={s(`display:flex;align-items:center;gap:14px;margin-top:22px`)}>
              <span style={s(`flex:none;width:48px;height:48px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);color:#EAF79B`)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={V.pathInfo.d1}></path><path d={V.pathInfo.d2}></path></svg>
              </span>
              <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>{V.pathInfo.eyebrow}</span>
            </div>
            <h1 style={s(`margin:18px 0 0;font:400 clamp(36px,4.4vw,50px)/1.06 'DM Serif Display',serif;letter-spacing:-.7px;color:#F6F4E9;text-wrap:pretty`)}>{V.pathInfo.title}</h1>
            <p style={s(`margin:14px 0 0;font:400 18px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>{V.pathInfo.line}</p>
            {V.pathGroups.map((g) => (
              <section key={g.slug} id={g.slug} style={s(`scroll-margin-top:96px;margin-top:48px`)}>
                <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>{g.name}</h2>
                <div style={s(`display:flex;flex-direction:column;margin-top:12px`)}>
                  {g.items.map((a) => (
                    <a key={a.id} href={a.url} style={s(`display:flex;align-items:center;gap:16px;padding:15px 2px;border-top:1px solid rgba(228,240,214,.08);color:rgba(244,242,230,.9)`)} className="hc-ho950d73">
                      <span style={s(`flex:1;display:flex;flex-direction:column;gap:4px`)}>
                        <span style={s(`font:500 16px 'DM Sans',sans-serif`)}>{a.title}</span>
                        <span style={s(`font:400 14px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>{a.summary}</span>
                      </span>
                      <span aria-hidden="true" style={s(`color:rgba(201,212,194,.5)`)}>›</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      ) : null}
      {(V.isArticle) ? (
        <>
          {this.renderTopBar(V)}
          <div data-r="wrap" style={s(`max-width:1320px;margin:0 auto;padding:0 32px;box-sizing:border-box;display:flex;gap:48px;align-items:flex-start`)}>
            <nav data-r="side" aria-label={`${V.art.pathLabel} articles`} style={s(`flex:none;width:250px;position:sticky;top:68px;max-height:calc(100vh - 68px);overflow:auto;padding:32px 0 40px;box-sizing:border-box`)}>
              <div style={s(`display:flex;flex-direction:column;gap:22px`)}>
                {(V.nav || []).map((g, $index) => (
                  <React.Fragment key={$index}>
                    <div>
                      <div style={s(`padding:0 10px 6px;font:600 11px 'DM Sans',sans-serif;letter-spacing:1.8px;color:rgba(201,212,194,.68)`)}>{g.upper}</div>
                      {(g.items || []).map((it, $index) => (
                        <React.Fragment key={$index}>
                          <a href={it.href} aria-current={it.on ? 'page' : undefined} style={s(`display:block;width:100%;box-sizing:border-box;text-align:left;padding:7px 10px;border-radius:10px;background:${it.bg ?? ''};font:${it.w ?? ''} 13.5px/1.35 'DM Sans',sans-serif;color:${it.c ?? ''};transition:all .2s ease`)} className="hc-ho950d73">{it.title}</a>
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </nav>
            <main id="main" style={s(`flex:1;min-width:0;max-width:720px;padding:44px 0 120px`)}>
              <div data-r="mpath" style={s(`display:none;margin-bottom:18px;padding:4px;border-radius:999px;border:1px solid rgba(228,240,214,.12)`)}>
                <a href={PATH_URL.app} style={s(`flex:1;text-align:center;padding:8px 10px;border-radius:999px;background:${V.segApp.bg ?? ''};color:${V.segApp.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The app</a>
                <a href={PATH_URL.dash} style={s(`flex:1;text-align:center;padding:8px 10px;border-radius:999px;background:${V.segDash.bg ?? ''};color:${V.segDash.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The dashboard</a>
              </div>
              <nav aria-label="Breadcrumb" style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:8px;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>
                <a href="/help/" style={s(`color:rgba(201,212,194,.82)`)} className="hc-ho950d73">Help centre</a>
                <span aria-hidden="true">›</span>
                <a href={V.art.pathUrl} style={s(`color:rgba(201,212,194,.82)`)} className="hc-ho950d73">{V.art.pathLabel}</a>
                <span aria-hidden="true">›</span>
                <a href={V.art.groupUrl} style={s(`color:rgba(201,212,194,.82)`)} className="hc-ho950d73">{V.art.group}</a>
              </nav>
              <h1 style={s(`margin:18px 0 0;font:400 clamp(36px,4.4vw,50px)/1.06 'DM Serif Display',serif;letter-spacing:-.7px;color:#F6F4E9;text-wrap:pretty`)}>{V.art.title}</h1>
              <p style={s(`margin:16px 0 0;font:400 19px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>{V.art.summary}</p>
              <div style={s(`display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.68)`)}>
                <span>{V.art.tagUpper}</span>
                <span aria-hidden="true">·</span>
                <span>{V.art.readLabel}</span>
                {V.art.updatedLabel ? <><span aria-hidden="true">·</span><span>{V.art.updatedLabel}</span></> : null}
              </div>
              {(V.art.hasShot) ? (
                <>
                  <figure aria-hidden="true" style={s(`position:relative;margin:36px 0 0;padding:34px 0 0;height:440px;overflow:hidden;border-radius:28px 20px 0 0 / 20px 28px 0 0;background:radial-gradient(60% 70% at 50% 20%,rgba(217,234,110,.12),rgba(0,0,0,0) 70%),rgba(228,240,214,.04);display:flex;justify-content:center`)}>
                    <div style={s(`width:290px;flex:none;transform:scale(.82);transform-origin:top center`)}><Phone screen={V.art.shot} /></div>
                    <div style={s(`position:absolute;left:0;right:0;bottom:0;height:80px;background:linear-gradient(180deg,rgba(15,32,21,0),#0F2015);pointer-events:none`)}></div>
                  </figure>
                </>
              ) : null}
              <section id="how" style={s(`scroll-margin-top:96px;margin-top:44px`)}>
                <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>How it works</h2>
                <div style={s(`display:flex;flex-direction:column;gap:14px;margin-top:16px`)}>
                  {((V.art.body && V.art.body.how) || []).map((t, i) => <p key={i} style={s(`margin:0;font:400 16px/1.65 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>{V.art.crisis ? withTel(t) : t}</p>)}
                </div>
              </section>
              {V.art.hasSteps ? (
                <section id="steps" style={s(`scroll-margin-top:96px;margin-top:40px`)}>
                  <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>Step by step</h2>
                  <ol style={s(`list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:12px`)}>
                    {V.art.steps.map((t, i) => (
                      <li key={i} style={s(`display:flex;gap:16px;align-items:center;padding:16px 18px;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;border:1px solid rgba(228,240,214,.09)`)}>
                        <span aria-hidden="true" style={s(`flex:none;width:30px;height:30px;border-radius:${STEP_DISCS[i % 3]};display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);font:500 12px 'DM Mono',monospace;color:#EAF79B`)}>{i + 1}</span>
                        <span style={s(`flex:1;font:400 15px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>{V.art.crisis ? withTel(t) : t}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
              <section id="know" style={s(`scroll-margin-top:96px;margin-top:40px`)}>
                <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>Good to know</h2>
                <div style={s(`display:flex;flex-direction:column;gap:14px;margin-top:16px`)}>
                  {((V.art.body && V.art.body.know) || []).map((t, i) => <p key={i} style={s(`margin:0;font:400 16px/1.65 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>{V.art.crisis ? withTel(t) : t}</p>)}
                </div>
                {V.art.showCall ? (
                  <div style={s(`margin-top:22px;padding:18px 20px;border-radius:22px 16px 24px 14px / 16px 24px 14px 22px;background:${V.art.callBg ?? ''};border:1px solid ${V.art.callBc ?? ''}`)}>
                    <div style={s(`display:flex;align-items:center;gap:10px;font:600 11px 'DM Sans',sans-serif;letter-spacing:1.8px;color:${V.art.callEye ?? ''}`)}>
                      {V.art.crisis ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z"></path>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                          <path d="M8.5 10.5 V8 A3.5 3.5 0 0 1 15.5 8 V10.5"></path>
                        </svg>
                      )}
                      {V.art.callLabel}
                    </div>
                    <p style={s(`margin:8px 0 0;font:400 14.5px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.9);text-wrap:pretty`)}>{V.art.crisis ? withTel(V.art.callText) : V.art.callText}</p>
                  </div>
                ) : null}
              </section>
              <section aria-labelledby="hc-contact" style={s(`margin-top:40px;padding:20px 22px;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;border:1px solid rgba(228,240,214,.09);background:rgba(228,240,214,.03)`)}>
                <h2 id="hc-contact" style={s(`margin:0;font:600 17px/1.3 'DM Sans',sans-serif;color:#F6F4E9`)}>Still need a hand?</h2>
                <p style={s(`margin:8px 0 0;font:400 15px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.82);text-wrap:pretty`)}>{V.art.contact}</p>
                {V.art.crisis ? null : <p style={s(`margin:8px 0 0;font:400 14px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Need someone to talk to now? See <a href={BY['a-crisis'].url} style={s(`color:#D9EA6E`)}>When you need more support</a>.</p>}
              </section>
              {V.related.length ? (
                <section aria-labelledby="hc-related" style={s(`margin-top:40px`)}>
                  <h2 id="hc-related" style={s(`margin:0;font:600 11px 'DM Sans',sans-serif;letter-spacing:1.8px;color:rgba(201,212,194,.68)`)}>RELATED ARTICLES</h2>
                  <div style={s(`display:flex;flex-direction:column;margin-top:10px`)}>
                    {V.related.map((a) => (
                      <a key={a.id} href={a.url} style={s(`display:flex;align-items:center;gap:12px;padding:13px 2px;border-top:1px solid rgba(228,240,214,.08);font:400 15px 'DM Sans',sans-serif;color:rgba(244,242,230,.9)`)} className="hc-ho950d73">
                        <span style={s(`flex:1`)}>{a.title}</span>
                        <span aria-hidden="true" style={s(`color:rgba(201,212,194,.5)`)}>›</span>
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
              <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px;margin-top:48px`)}>
                {V.prev ? (
                  <a href={V.prev.href} rel="prev" style={s(`display:flex;flex-direction:column;gap:6px;text-align:left;padding:18px 20px;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;border:1px solid rgba(228,240,214,.1);background:transparent;font-family:'DM Sans',sans-serif`)} className="hc-hoc01b3c">
                    <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.68)`)}>‹ PREVIOUS</span>
                    <span style={s(`font:600 15.5px/1.35 'DM Sans',sans-serif;color:#F6F4E9`)}>{V.prev.title}</span>
                  </a>
                ) : <span></span>}
                {V.next ? (
                  <a href={V.next.href} rel="next" style={s(`display:flex;flex-direction:column;align-items:flex-end;gap:6px;text-align:right;padding:18px 20px;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;border:1px solid rgba(228,240,214,.1);background:transparent;font-family:'DM Sans',sans-serif`)} className="hc-hoc01b3c">
                    <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.68)`)}>NEXT ›</span>
                    <span style={s(`font:600 15.5px/1.35 'DM Sans',sans-serif;color:#F6F4E9`)}>{V.next.title}</span>
                  </a>
                ) : null}
              </div>
            </main>
            <aside data-r="toc" style={s(`flex:none;width:210px;position:sticky;top:68px;padding:48px 0 0`)}>
              <div style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:1.8px;color:rgba(201,212,194,.68)`)}>ON THIS PAGE</div>
              <div style={s(`display:flex;flex-direction:column;gap:2px;margin-top:10px;border-left:1px solid rgba(228,240,214,.1)`)}>
                <a href="#how" style={s(`padding:5px 0 5px 14px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)} className="hc-ho950d73">How it works</a>
                {V.art.hasSteps ? <a href="#steps" style={s(`padding:5px 0 5px 14px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)} className="hc-ho950d73">Step by step</a> : null}
                <a href="#know" style={s(`padding:5px 0 5px 14px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)} className="hc-ho950d73">Good to know</a>
              </div>
            </aside>
          </div>
        </>
      ) : null}
      </>
    );
  }
}
