// @ts-nocheck
/* Help centre (home + article views), generated from the v3 handoff
   (reference/Norma Help Centre.dc.html) by dc2jsx: markup and styles verbatim.
   Logic is the reference's own, adapted so articles live at real URLs
   (/help/{app|dashboard}/{slug}) instead of #hash state. Content comes from
   src/data/help-centre.json via src/data/help.ts. */
import React from 'react';
import { s } from '../lib/s';
import Phone from './Phone';
import { ALL, BY, DOCS, TOP, PROBLEMS } from '../data/help';
import './HelpCentre.dc.css';

const SHAPES = ['32px 22px 30px 20px / 22px 32px 20px 30px', '22px 30px 20px 28px / 30px 20px 28px 22px', '22px 14px 20px 12px / 14px 20px 12px 22px', '12px 22px 14px 20px / 20px 12px 22px 14px'];
const STEP_DISCS = ['52% 48% 50% 50% / 50% 54% 46% 50%', '48% 52% 50% 50% / 54% 50% 50% 46%', '50% 50% 48% 52% / 46% 50% 54% 50%'];
const go = (url) => { if (typeof window !== 'undefined') window.location.assign(url); };

export default class HelpCentre extends React.Component {
  state = { path: this.props.path ?? 'app', view: this.props.view ?? 'home', id: this.props.id ?? 'a-signin', q: '' };
  searchRef = React.createRef(); heroRef = React.createRef();
  open = Object.fromEntries(ALL.map(a => [a.id, () => go(a.url)]));
  goHome = () => go('/help');
  pickApp = () => { if (this.state.view === 'article' && this.state.path !== 'app') go(BY['a-signin'].url); else this.setState({ path: 'app' }); };
  pickDash = () => { if (this.state.view === 'article' && this.state.path !== 'dash') go(BY['d-setup'].url); else this.setState({ path: 'dash' }); };
  setQ = e => this.setState({ q: e.target.value });
  focusSearch = () => { const el = this.heroRef.current || this.searchRef.current; if (el) el.focus(); };
  onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.focusSearch(); } if (e.key === 'Escape' && this.state.q) this.setState({ q: '' }); };
  componentDidMount() {
    window.addEventListener('keydown', this.onKey);
    // old reference-style links (#a-checkin) and /help#dashboard still work
    const h = (location.hash || '').slice(1);
    if (this.state.view === 'home') { if (BY[h]) go(BY[h].url); else if (h === 'dashboard') this.setState({ path: 'dash' }); }
  }
  componentWillUnmount() { window.removeEventListener('keydown', this.onKey); }
  renderVals() {
    const s = this.state, seg = on => ({ bg: on ? 'rgba(217,234,110,.14)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.8)' });
    const q = s.q.trim().toLowerCase();
    const results = q ? ALL.filter(a => (a.title + ' ' + a.summary + ' ' + a.group + ' ' + a.keys).toLowerCase().includes(q)).slice(0, 8).map(a => ({ title: a.title, summary: a.summary, tag: a.path === 'app' ? 'APP' : 'DASHBOARD', pick: this.open[a.id] })) : [];
    const count = p => ALL.filter(a => a.path === p).length;
    const pathCards = [
      { eyebrow: 'THE APP', title: 'I use the nørma app', line: 'Check-ins, reflections, habits and journeys. What is private, and how to keep it that way.', d1: 'M7 2.5h10a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V4A1.5 1.5 0 0 1 7 2.5z', d2: 'M10.5 18.5h3', r: SHAPES[0], count: count('app'), top: TOP.app.map(id => ({ title: BY[id].title, pick: this.open[id] })), browse: this.open['a-signin'] },
      { eyebrow: 'THE DASHBOARD', title: 'I run nørma for my organisation', line: 'Reading the signal, acting on it, and setting up people, teams and sign-in.', d1: 'M3 4.5h18v12H3z', d2: 'M8 20.5h8M12 16.5v4', r: SHAPES[1], count: count('dash'), top: TOP.dash.map(id => ({ title: BY[id].title, pick: this.open[id] })), browse: this.open['d-setup'] },
    ];
    const problems = PROBLEMS[s.path].map(([id, qq, a], i) => ({ q: qq, a, pick: this.open[id], r: SHAPES[i % 4] }));
    const nav = DOCS[s.path].groups.map(([name, items]) => ({ upper: name.toUpperCase(), items: items.map(([id, title]) => { const on = id === s.id; return { title, pick: this.open[id], bg: on ? 'rgba(217,234,110,.1)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.74)', w: on ? 500 : 400 }; }) }));
    const A = BY[s.id] || ALL[0], list = ALL.filter(a => a.path === A.path), idx = list.findIndex(a => a.id === A.id);
    const pv = list[(idx - 1 + list.length) % list.length], nx = list[(idx + 1) % list.length];
    const crisis = A.id === 'a-crisis', isApp = A.path === 'app';
    const art = { ...A, hasShot: !!A.shot, tagUpper: (A.pathLabel + ' · ' + A.group).toUpperCase(),
      callLabel: crisis ? 'SOMEONE TO TALK TO' : isApp ? 'YOUR PRIVACY' : 'WHAT YOU SEE',
      // The reference's dashboard callout also said "A leader’s own answers are left out of their team’s figures."
      // Removed: the product includes leaders' answers since decision D172 (2026-09-14).
      callText: crisis ? 'Lifeline on 13 11 14 (Australia) or 988 (United States), any time. In an emergency, 000 or 911. nørma will not alert your employer or anyone else.' : isApp ? 'Your employer never sees your check-in answers, reflections, voice recordings or scores. Only anonymised results for groups of at least five people.' : 'Results for groups of five or more, never a person’s answers.',
      callBg: crisis ? 'rgba(230,199,126,.08)' : 'rgba(217,234,110,.06)', callBc: crisis ? 'rgba(230,199,126,.3)' : 'rgba(217,234,110,.25)', callEye: crisis ? '#EFDCAE' : '#DCEC85' };
    return {
      q: s.q, setQ: this.setQ, hasQ: !!q, results, noResults: !!q && !results.length, searchRef: this.searchRef, heroRef: this.heroRef, focusSearch: this.focusSearch,
      isHome: s.view === 'home', isArticle: s.view === 'article', goHome: this.goHome,
      pickApp: this.pickApp, pickDash: this.pickDash, segApp: seg(s.path === 'app'), segDash: seg(s.path === 'dash'),
      pathCards, problems, nav, art, prev: { title: pv.title, pick: this.open[pv.id] }, next: { title: nx.title, pick: this.open[nx.id] },
    };
  }

  render() {
    const V = { ...this.props, ...this.renderVals() };
    return (
      <>
      {(V.isHome) ? (
        <>
          <div style={s(`position:relative;z-index:5;background:linear-gradient(178deg,#17301F 0%,#0F2015 45%,#0A130D 100%)`)}>
            {/* Glow clipped in its own layer so the search results can overlap the cards below. */}
            <div style={s(`position:absolute;inset:0;overflow:hidden;pointer-events:none`)}><div style={s(`position:absolute;left:50%;top:-140px;width:900px;height:560px;margin-left:-450px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.13),rgba(0,0,0,0) 72%)`)}></div></div>
            <div data-r="wrap" style={s(`position:relative;max-width:1180px;margin:0 auto;padding:96px 40px 72px;box-sizing:border-box;text-align:center`)}>
              <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>NØRMA HELP CENTRE</span>
              <h1 style={s(`margin:18px 0 0;font:400 clamp(42px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#F6F4E9`)}>How can we help?</h1>
              <p style={s(`margin:18px auto 0;max-width:540px;font:400 17px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.8);text-wrap:pretty`)}>Two ways in: the app everyone uses, and the dashboard leaders and administrators work from.</p>
              <div style={s(`position:relative;width:100%;max-width:600px;margin:34px auto 0;text-align:left`)}>
                <label style={s(`display:flex;align-items:center;gap:12px;height:58px;padding:0 18px 0 20px;box-sizing:border-box;border-radius:20px 14px 22px 16px / 14px 22px 16px 20px;background:rgba(228,240,214,.07);border:1px solid rgba(228,240,214,.14);cursor:text`)} className="hc-ho151e36">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.8)" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="6.5"></circle>
                    <path d="M16 16 L20.5 20.5"></path>
                  </svg>
                  <input ref={V.heroRef} value={V.q} onChange={V.setQ} placeholder="Search articles, e.g. “who sees my answers”" aria-label="Search the help centre" style={s(`flex:1;min-width:0;height:100%;border:0;outline:none;background:transparent;font:400 16px 'DM Sans',sans-serif;color:#F6F4E9`)} />
                  <span style={s(`flex:none;padding:3px 8px;border-radius:7px;border:1px solid rgba(228,240,214,.16);font:500 11.5px 'DM Mono',monospace;color:rgba(201,212,194,.7)`)}>⌘K</span>
                </label>
                {(V.hasQ) ? (
                  <>
                    <div style={s(`position:absolute;z-index:20;left:0;right:0;top:66px;padding:8px;border-radius:20px;background:#0F1C13;border:1px solid rgba(228,240,214,.12);box-shadow:0 30px 70px rgba(0,0,0,.55);display:flex;flex-direction:column;gap:2px;max-height:440px;overflow:auto`)}>
                      {(V.results || []).map((r, $index) => (
                        <React.Fragment key={$index}>
                          <button onClick={r.pick} style={s(`display:flex;flex-direction:column;gap:4px;text-align:left;padding:10px 12px;border:0;border-radius:14px;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif`)} className="hc-ho0c9b04">
                            <span style={s(`display:flex;align-items:center;gap:8px`)}>
                              <span style={s(`font:500 14px 'DM Sans',sans-serif;color:#F6F4E9`)}>{r.title}</span>
                              <span style={s(`padding:2px 7px;border-radius:999px;background:rgba(228,240,214,.07);font:500 10px 'DM Mono',monospace;letter-spacing:.6px;color:rgba(201,212,194,.75)`)}>{r.tag}</span>
                            </span>
                            <span style={s(`font:400 12.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.75)`)}>{r.summary}</span>
                          </button>
                        </React.Fragment>
                      ))}
                      {(V.noResults) ? (
                        <>
                          <div style={s(`padding:14px 12px;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Nothing matches that yet. Try “check-in”, “privacy” or “participation”, or write to [support@joinnorma.com].</div>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div data-r="wrap" style={s(`max-width:1180px;margin:0 auto;padding:0 40px;box-sizing:border-box`)}>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:20px;margin-top:-8px`)}>
              {(V.pathCards || []).map((pc, $index) => (
                <React.Fragment key={$index}>
                  <div style={s(`display:flex;flex-direction:column;padding:34px 34px 30px;border-radius:${pc.r ?? ''};background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)`)}>
                    <div style={s(`display:flex;align-items:center;gap:14px`)}>
                      <span style={s(`flex:none;width:48px;height:48px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);color:#EAF79B`)}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
                          <button onClick={t.pick} style={s(`display:flex;align-items:center;gap:12px;padding:13px 2px;border:0;border-top:1px solid rgba(228,240,214,.08);background:transparent;cursor:pointer;text-align:left;font:400 15px 'DM Sans',sans-serif;color:rgba(244,242,230,.9);transition:all .2s ease`)} className="hc-ho950d73">
                            <span style={s(`flex:1`)}>{t.title}</span>
                            <span style={s(`color:rgba(201,212,194,.5)`)}>›</span>
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    <button onClick={pc.browse} style={s(`align-self:flex-start;margin-top:18px;padding:0;border:0;background:transparent;cursor:pointer;font:500 14px 'DM Sans',sans-serif;color:#D9EA6E`)} className="hc-ho950d73">{"Browse all "}{pc.count}{" articles ›"}</button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-top:96px`)}>
              <div>
                <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>SOLVE A PROBLEM</span>
                <h2 style={s(`margin:14px 0 0;font:400 clamp(30px,3.4vw,40px)/1.1 'DM Serif Display',serif;letter-spacing:-.5px;color:#F6F4E9`)}>What people usually come here for.</h2>
              </div>
              <div style={s(`display:inline-flex;padding:4px;border-radius:999px;border:1px solid rgba(228,240,214,.12);background:rgba(10,19,13,.4)`)}>
                <button onClick={V.pickApp} style={s(`padding:9px 16px;border-radius:999px;border:0;cursor:pointer;background:${V.segApp.bg ?? ''};color:${V.segApp.c ?? ''};font:500 13.5px 'DM Sans',sans-serif;transition:all .3s ease`)}>I use the app</button>
                <button onClick={V.pickDash} style={s(`padding:9px 16px;border-radius:999px;border:0;cursor:pointer;background:${V.segDash.bg ?? ''};color:${V.segDash.c ?? ''};font:500 13.5px 'DM Sans',sans-serif;transition:all .3s ease`)}>I run nørma</button>
              </div>
            </div>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;margin-top:28px`)}>
              {(V.problems || []).map((pr, $index) => (
                <React.Fragment key={$index}>
                  <button onClick={pr.pick} style={s(`display:flex;flex-direction:column;justify-content:space-between;gap:28px;min-height:150px;padding:22px 22px 20px;box-sizing:border-box;text-align:left;border-radius:${pr.r ?? ''};background:rgba(6,11,7,.5);border:1px solid rgba(228,240,214,.09);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .3s ease`)} className="hc-ho648b7a">
                    <span style={s(`font:400 19px/1.25 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>{pr.q}</span>
                    <span style={s(`font:500 12.5px 'DM Sans',sans-serif;color:#D9EA6E`)}>{pr.a}{" ›"}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:10px 32px;margin:96px 0 0;padding:22px 0 0;border-top:1px solid rgba(228,240,214,.08);font:400 13.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>
              <span style={s(`flex:1 1 360px;text-wrap:pretty`)}>
                nørma supports wellbeing day to day. It isn’t a crisis service, so for urgent support please reach out to someone directly.
              </span>
              <span style={s(`display:flex;flex-wrap:wrap;gap:6px 18px;color:rgba(244,242,230,.82)`)}>
                <span>Lifeline 13 11 14</span>
                <span>988 in the US</span>
                <span>000 or 911 in an emergency</span>
              </span>
            </div>
          </div>
        </>
      ) : null}
      {(V.isArticle) ? (
        <>
          <div data-r="wrap" style={s(`max-width:1320px;margin:0 auto;padding:28px 32px 0;box-sizing:border-box;display:flex;align-items:center;gap:24px`)}>
            <div data-r="side" style={s(`flex:none;width:250px;display:flex;padding:4px;box-sizing:border-box;border-radius:14px;border:1px solid rgba(228,240,214,.1);background:rgba(10,19,13,.4)`)}>
              <button onClick={V.pickApp} style={s(`flex:1;padding:8px 10px;border-radius:10px;border:0;cursor:pointer;background:${V.segApp.bg ?? ''};color:${V.segApp.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The app</button>
              <button onClick={V.pickDash} style={s(`flex:1;padding:8px 10px;border-radius:10px;border:0;cursor:pointer;background:${V.segDash.bg ?? ''};color:${V.segDash.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The dashboard</button>
            </div>
            <div data-r="topsearch" style={s(`position:relative;z-index:30;flex:1;max-width:340px;margin-left:auto`)}>
              <div style={s(`display:flex;align-items:center;gap:10px;height:36px;padding:0 10px 0 13px;border-radius:12px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.1)`)} className="hc-topsearch">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.7)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="6.5"></circle>
                  <path d="M16 16 L20.5 20.5"></path>
                </svg>
                <input ref={V.searchRef} value={V.q} onChange={V.setQ} placeholder="Search the help centre" aria-label="Search the help centre" style={s(`flex:1;min-width:0;height:100%;border:0;outline:none;background:transparent;font:400 14px 'DM Sans',sans-serif;color:#F6F4E9`)} />
                <span style={s(`flex:none;padding:2px 7px;border-radius:6px;border:1px solid rgba(228,240,214,.16);font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.7)`)}>⌘K</span>
              </div>
              {(V.hasQ) ? (
                <>
                  <div style={s(`position:absolute;left:0;right:0;top:48px;padding:8px;border-radius:20px;background:#0F1C13;border:1px solid rgba(228,240,214,.12);box-shadow:0 30px 70px rgba(0,0,0,.55);display:flex;flex-direction:column;gap:2px;max-height:440px;overflow:auto`)}>
                    {(V.results || []).map((r, $index) => (
                      <React.Fragment key={$index}>
                        <button onClick={r.pick} style={s(`display:flex;flex-direction:column;gap:4px;text-align:left;padding:10px 12px;border:0;border-radius:14px;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif`)} className="hc-ho0c9b04">
                          <span style={s(`display:flex;align-items:center;gap:8px`)}>
                            <span style={s(`font:500 14px 'DM Sans',sans-serif;color:#F6F4E9`)}>{r.title}</span>
                            <span style={s(`padding:2px 7px;border-radius:999px;background:rgba(228,240,214,.07);font:500 10px 'DM Mono',monospace;letter-spacing:.6px;color:rgba(201,212,194,.75)`)}>{r.tag}</span>
                          </span>
                          <span style={s(`font:400 12.5px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.75)`)}>{r.summary}</span>
                        </button>
                      </React.Fragment>
                    ))}
                    {(V.noResults) ? (
                      <>
                        <div style={s(`padding:14px 12px;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Nothing matches that yet. Try “check-in”, “privacy” or “participation”, or write to [support@joinnorma.com].</div>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div data-r="wrap" style={s(`max-width:1320px;margin:0 auto;padding:0 32px;box-sizing:border-box;display:flex;gap:48px;align-items:flex-start`)}>
            <aside data-r="side" style={s(`flex:none;width:250px;position:sticky;top:68px;max-height:calc(100vh - 68px);overflow:auto;padding:32px 0 40px;box-sizing:border-box`)}>
              <div style={s(`display:flex;flex-direction:column;gap:22px`)}>
                {(V.nav || []).map((g, $index) => (
                  <React.Fragment key={$index}>
                    <div>
                      <div style={s(`padding:0 10px 6px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.55)`)}>{g.upper}</div>
                      {(g.items || []).map((it, $index) => (
                        <React.Fragment key={$index}>
                          <button onClick={it.pick} style={s(`display:block;width:100%;text-align:left;padding:7px 10px;border:0;border-radius:10px;cursor:pointer;background:${it.bg ?? ''};font:${it.w ?? ''} 13.5px/1.35 'DM Sans',sans-serif;color:${it.c ?? ''};transition:all .2s ease`)} className="hc-ho950d73">{it.title}</button>
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </aside>
            <main style={s(`flex:1;min-width:0;max-width:720px;padding:44px 0 120px`)}>
              <div data-r="mpath" style={s(`display:none;margin-bottom:18px;padding:4px;border-radius:14px;border:1px solid rgba(228,240,214,.1)`)}>
                <button onClick={V.pickApp} style={s(`flex:1;padding:8px 10px;border-radius:10px;border:0;cursor:pointer;background:${V.segApp.bg ?? ''};color:${V.segApp.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The app</button>
                {' '}
                <button onClick={V.pickDash} style={s(`flex:1;padding:8px 10px;border-radius:10px;border:0;cursor:pointer;background:${V.segDash.bg ?? ''};color:${V.segDash.c ?? ''};font:500 13px 'DM Sans',sans-serif`)}>The dashboard</button>
              </div>
              <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:8px;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>
                <button onClick={V.goHome} style={s(`padding:0;border:0;background:transparent;cursor:pointer;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)} className="hc-ho950d73">Help centre</button>
                <span>›</span>
                <span>{V.art.pathLabel}</span>
                <span>›</span>
                <span>{V.art.group}</span>
              </div>
              <h1 style={s(`margin:18px 0 0;font:400 clamp(36px,4.4vw,50px)/1.06 'DM Serif Display',serif;letter-spacing:-.7px;color:#F6F4E9;text-wrap:pretty`)}>{V.art.title}</h1>
              <p style={s(`margin:16px 0 0;font:400 19px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>{V.art.summary}</p>
              <div style={s(`display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.62)`)}>
                <span>{V.art.tagUpper}</span>
                <span>·</span>
                <span>3 MIN READ</span>
              </div>
              {(V.art.hasShot) ? (
                <>
                  <figure style={s(`position:relative;margin:36px 0 0;padding:34px 0 0;height:440px;overflow:hidden;border-radius:28px 20px 0 0 / 20px 28px 0 0;background:radial-gradient(60% 70% at 50% 20%,rgba(217,234,110,.12),rgba(0,0,0,0) 70%),rgba(228,240,214,.04);display:flex;justify-content:center`)}>
                    <div style={s(`width:290px;flex:none;transform:scale(.82);transform-origin:top center`)}><Phone screen={V.art.shot} /></div>
                    <div style={s(`position:absolute;left:0;right:0;bottom:0;height:80px;background:linear-gradient(180deg,rgba(10,19,13,0),#0A130D);pointer-events:none`)}></div>
                  </figure>
                </>
              ) : null}
              <section id="how" style={s(`scroll-margin-top:96px;margin-top:44px`)}>
                <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>How it works</h2>
                {V.art.body && V.art.body.how ? (
                  <div style={s(`display:flex;flex-direction:column;gap:14px;margin-top:16px`)}>
                    {V.art.body.how.map((t, i) => <p key={i} style={s(`margin:0;font:400 16px/1.65 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>{t}</p>)}
                  </div>
                ) : (
                <div style={s(`display:flex;flex-direction:column;gap:10px;margin-top:16px`)}>
                  <span style={s(`height:12px;width:100%;border-radius:6px;background:rgba(228,240,214,.08)`)}></span>
                  <span style={s(`height:12px;width:94%;border-radius:6px;background:rgba(228,240,214,.08)`)}></span>
                  <span style={s(`height:12px;width:72%;border-radius:6px;background:rgba(228,240,214,.08)`)}></span>
                </div>
                )}
              </section>
              <section id="steps" style={s(`scroll-margin-top:96px;margin-top:40px`)}>
                <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>Step by step</h2>
                <div style={s(`display:flex;flex-direction:column;gap:12px;margin-top:16px`)}>
                  {V.art.body && V.art.body.steps ? V.art.body.steps.map((t, i) => (
                    <div key={i} style={s(`display:flex;gap:16px;align-items:center;padding:16px 18px;border-radius:18px;border:1px solid rgba(228,240,214,.09)`)}>
                      <span style={s(`flex:none;width:30px;height:30px;border-radius:${STEP_DISCS[i % 3]};display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);font:500 12px 'DM Mono',monospace;color:#EAF79B`)}>{i + 1}</span>
                      <span style={s(`flex:1;font:400 15px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.88);text-wrap:pretty`)}>{t}</span>
                    </div>
                  )) : (
                  <>
                  <div style={s(`display:flex;gap:16px;align-items:center;padding:16px 18px;border-radius:18px;border:1px solid rgba(228,240,214,.09)`)}>
                    <span style={s(`flex:none;width:30px;height:30px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);font:500 12px 'DM Mono',monospace;color:#EAF79B`)}>1</span>
                    <span style={s(`flex:1;display:flex;flex-direction:column;gap:8px`)}>
                      <span style={s(`height:11px;width:60%;border-radius:6px;background:rgba(228,240,214,.1)`)}></span>
                      <span style={s(`height:9px;width:85%;border-radius:5px;background:rgba(228,240,214,.06)`)}></span>
                    </span>
                  </div>
                  <div style={s(`display:flex;gap:16px;align-items:center;padding:16px 18px;border-radius:18px;border:1px solid rgba(228,240,214,.09)`)}>
                    <span style={s(`flex:none;width:30px;height:30px;border-radius:48% 52% 50% 50% / 54% 50% 50% 46%;display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);font:500 12px 'DM Mono',monospace;color:#EAF79B`)}>2</span>
                    <span style={s(`flex:1;display:flex;flex-direction:column;gap:8px`)}>
                      <span style={s(`height:11px;width:48%;border-radius:6px;background:rgba(228,240,214,.1)`)}></span>
                      <span style={s(`height:9px;width:78%;border-radius:5px;background:rgba(228,240,214,.06)`)}></span>
                    </span>
                  </div>
                  <div style={s(`display:flex;gap:16px;align-items:center;padding:16px 18px;border-radius:18px;border:1px solid rgba(228,240,214,.09)`)}>
                    <span style={s(`flex:none;width:30px;height:30px;border-radius:50% 50% 48% 52% / 46% 50% 54% 50%;display:flex;align-items:center;justify-content:center;background:rgba(217,234,110,.12);font:500 12px 'DM Mono',monospace;color:#EAF79B`)}>3</span>
                    <span style={s(`flex:1;display:flex;flex-direction:column;gap:8px`)}>
                      <span style={s(`height:11px;width:55%;border-radius:6px;background:rgba(228,240,214,.1)`)}></span>
                      <span style={s(`height:9px;width:66%;border-radius:5px;background:rgba(228,240,214,.06)`)}></span>
                    </span>
                  </div>
                  </>
                  )}
                </div>
              </section>
              <section id="know" style={s(`scroll-margin-top:96px;margin-top:40px`)}>
                <h2 style={s(`margin:0;font:400 26px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>Good to know</h2>
                {V.art.body && V.art.body.know ? (
                  <div style={s(`display:flex;flex-direction:column;gap:14px;margin-top:16px`)}>
                    {V.art.body.know.map((t, i) => <p key={i} style={s(`margin:0;font:400 16px/1.65 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>{t}</p>)}
                  </div>
                ) : (
                <div style={s(`display:flex;flex-direction:column;gap:10px;margin-top:16px`)}>
                  <span style={s(`height:12px;width:98%;border-radius:6px;background:rgba(228,240,214,.08)`)}></span>
                  <span style={s(`height:12px;width:64%;border-radius:6px;background:rgba(228,240,214,.08)`)}></span>
                </div>
                )}
                <div style={s(`margin-top:22px;padding:18px 20px;border-radius:22px 16px 24px 14px / 16px 24px 14px 22px;background:${V.art.callBg ?? ''};border:1px solid ${V.art.callBc ?? ''}`)}>
                  <div style={s(`display:flex;align-items:center;gap:10px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:${V.art.callEye ?? ''}`)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5.5" y="10.5" width="13" height="9" rx="2.5"></rect>
                      <path d="M8.5 10.5 V8 A3.5 3.5 0 0 1 15.5 8 V10.5"></path>
                    </svg>
                    {V.art.callLabel}
                  </div>
                  <p style={s(`margin:8px 0 0;font:400 14.5px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.9);text-wrap:pretty`)}>{V.art.callText}</p>
                </div>
              </section>
              {V.art.body ? null : (<div style={s(`margin-top:22px;font:500 10.5px 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.5)`)}>PLACEHOLDER · ARTICLE COPY TO COME</div>)}
              <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px;margin-top:56px`)}>
                <button onClick={V.prev.pick} style={s(`display:flex;flex-direction:column;gap:6px;text-align:left;padding:18px 20px;border-radius:18px;border:1px solid rgba(228,240,214,.1);background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif`)} className="hc-hoc01b3c">
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.6)`)}>‹ PREVIOUS</span>
                  <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>{V.prev.title}</span>
                </button>
                <button onClick={V.next.pick} style={s(`display:flex;flex-direction:column;align-items:flex-end;gap:6px;text-align:right;padding:18px 20px;border-radius:18px;border:1px solid rgba(228,240,214,.1);background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif`)} className="hc-hoc01b3c">
                  <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.6)`)}>NEXT ›</span>
                  <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>{V.next.title}</span>
                </button>
              </div>
            </main>
            <aside data-r="toc" style={s(`flex:none;width:210px;position:sticky;top:68px;padding:48px 0 0`)}>
              <div style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.55)`)}>ON THIS PAGE</div>
              <div style={s(`display:flex;flex-direction:column;gap:2px;margin-top:10px;border-left:1px solid rgba(228,240,214,.1)`)}>
                <a href="#how" style={s(`padding:5px 0 5px 14px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)} className="hc-ho950d73">How it works</a>
                <a href="#steps" style={s(`padding:5px 0 5px 14px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)} className="hc-ho950d73">Step by step</a>
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
