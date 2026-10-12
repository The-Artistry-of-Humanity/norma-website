// @ts-nocheck
/* Generated from the v3 design handoff by dc2jsx: markup and styles verbatim.
   State and data come from ./v3/home-logic.js (the reference's own logic). */
import React from 'react';
import { s } from '../lib/s';
import Phone from './Phone';
import * as L from './v3/home-logic.js';
import './Leaders.dc.css';

export default class Leaders extends L.HomeBase {
  render() {
    const V = { ...this.props, ...this.renderVals() };
    return (
      <>
    <div id="leaders" data-r="wrap" style={s(`max-width:1180px;margin:0 auto;padding:110px 40px 40px;box-sizing:border-box`)}>
      <div style={s(`display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px 40px`)}>
        <div style={s(`max-width:620px`)}>
          <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>FOR LEADERS · THE DASHBOARD</span>
          <h2 style={s(`margin:16px 0 0;font:400 clamp(34px,4vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:pretty`)}>Two numbers, every department, one place to look.</h2>
          <p style={s(`margin:16px 0 0;max-width:560px;font:400 17px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.72);text-wrap:pretty`)}>Northwind, a sample organisation of 184 people. Two Octobers, two stories.</p>
        </div>
        <div style={s(`display:flex;flex-direction:column;gap:12px;align-items:flex-start;max-width:400px`)}>
          <div style={s(`display:inline-flex;padding:4px;border-radius:999px;border:1px solid rgba(228,240,214,.12);background:rgba(10,19,13,.4)`)}>
            {(V.stories || []).map((st, $index) => (
              <React.Fragment key={$index}>
                <button onClick={st.pick} style={s(`padding:10px 18px;border-radius:999px;border:0;cursor:pointer;background:${st.bg ?? ''};color:${st.c ?? ''};font:500 14px 'DM Sans',sans-serif;transition:all .3s ease`)} className="ldr-ho950d73">{st.label}</button>
              </React.Fragment>
            ))}
          </div>
          <span style={s(`font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.85);text-wrap:pretty`)}>{V.L.lede}</span>
        </div>
      </div>
      <div id="leaders-dashboard" style={s(`margin-top:36px;border-radius:22px;border:1px solid rgba(228,240,214,.12);background:linear-gradient(165deg,#122416 0%,#0D1811 52%,#0A120C 100%);box-shadow:0 40px 90px rgba(0,0,0,.45);overflow:hidden`)}>
        <div style={s(`display:flex;align-items:center;height:42px;padding:0 16px;box-sizing:border-box;border-bottom:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.5)`)}>
          <div style={s(`display:flex;gap:7px`)}>
            <span style={s(`width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
            <span style={s(`width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
            <span style={s(`width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
          </div>
          <span style={s(`margin:0 auto;padding:4px 14px;border-radius:999px;background:rgba(228,240,214,.05);font:400 11px 'DM Mono',monospace;color:rgba(201,212,194,.72)`)}>app.joinnorma.com/dashboard</span>
          <span style={s(`width:44px`)}></span>
        </div>
        <span data-r="ldhint" style={s(`display:none;padding:12px 16px 0;font:400 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>Swipe sideways to see the whole dashboard →</span>
        <div data-r="ldscroll" style={s(`overflow-x:auto`)}>
          <div data-r="ldinner" style={s(`min-width:1120px;display:flex;color:#F4F2E6`)}>
            <aside data-r="ldaside" style={s(`flex:none;width:196px;padding:24px 14px 20px;display:flex;flex-direction:column;box-sizing:border-box;border-right:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.3)`)}>
              <div style={s(`display:flex;align-items:center;gap:8px;padding:0 10px`)}>
                <span style={s(`width:11px;height:11px;background:#D9EA6E;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)`)}></span>
                <span style={s(`font:italic 400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>nørma</span>
              </div>
              <div style={s(`margin-top:30px;padding:0 12px;font:600 9px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.5)`)}>SIGNAL</div>
              <div style={s(`margin-top:8px;display:flex;flex-direction:column;gap:2px`)}>
                <div style={s(`padding:8px 12px;border-radius:12px;background:rgba(217,234,110,.1);font:500 13px 'DM Sans',sans-serif;color:#EAF79B`)}>Dashboard</div>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Departments</div>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Check-ins</div>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Themes</div>
              </div>
              <div style={s(`margin-top:24px;padding:0 12px;font:600 9px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.5)`)}>ACT</div>
              <div style={s(`margin-top:8px;display:flex;flex-direction:column;gap:2px`)}>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Growth work</div>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Playbooks</div>
              </div>
              <div style={s(`margin-top:auto;display:flex;flex-direction:column;gap:2px`)}>
                <div style={s(`padding:0 12px 6px;font:600 9px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.5)`)}>ORGANISATION</div>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>People & structure</div>
                <div style={s(`padding:8px 12px;border-radius:12px;background:transparent;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`)}>Settings</div>
                <div style={s(`margin:12px 12px 0;height:1px;background:rgba(228,240,214,.08)`)}></div>
                <div style={s(`display:flex;align-items:center;gap:10px;padding:12px 12px 0`)}>
                  <span style={s(`width:28px;height:28px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;font:500 10.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>MR</span>
                  <span style={s(`display:flex;flex-direction:column;gap:1px`)}>
                    <span style={s(`font:500 12.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>Mara</span>
                    <span style={s(`font:400 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>Head of People</span>
                  </span>
                </div>
              </div>
            </aside>
            <main style={s(`flex:1;min-width:0;padding:26px 32px 32px;box-sizing:border-box;display:flex;flex-direction:column;gap:22px`)}>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;gap:24px`)}>
                <div style={s(`display:flex;align-items:baseline;gap:10px`)}>
                  <span style={s(`font:400 28px/1.1 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>Northwind</span>
                  <span style={s(`font:400 14px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>▾</span>
                </div>
                <div style={s(`display:flex;align-items:center;font:400 12px 'DM Sans',sans-serif;white-space:nowrap`)}>
                  <span style={s(`display:inline-flex;align-items:center;gap:7px;color:rgba(201,212,194,.72)`)}>
                    <span style={s(`width:7px;height:7px;border-radius:999px;background:rgba(217,234,110,.5)`)}></span>
                    Check-in closed
                    <span style={s(`font:500 10.5px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>3 OCT</span>
                  </span>
                  <span style={s(`width:24px;height:1px;background:rgba(228,240,214,.16);margin:0 10px`)}></span>
                  <span style={s(`display:inline-flex;align-items:center;gap:7px;color:#EAF79B`)}>
                    <span style={s(`width:7px;height:7px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 0 3px rgba(217,234,110,.2)`)}></span>
                    October signal
                    <span style={s(`color:rgba(234,247,155,.7)`)}>▾</span>
                  </span>
                  <span style={s(`width:24px;height:1px;background:rgba(228,240,214,.16);margin:0 10px`)}></span>
                  <span style={s(`display:inline-flex;align-items:center;gap:7px;color:rgba(201,212,194,.72)`)}>
                    <span style={s(`width:7px;height:7px;border-radius:999px;border:1px solid rgba(228,240,214,.3);box-sizing:border-box`)}></span>
                    Next check-in
                    <span style={s(`font:500 10.5px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>1 NOV</span>
                  </span>
                </div>
              </div>
              <div style={s(`display:grid;grid-template-columns:1fr 1fr;gap:20px`)}>
                <div style={s(`padding:20px 22px 20px;border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:rgba(228,240,214,.07);display:flex;flex-direction:column;gap:12px`)}>
                  <div style={s(`display:flex;align-items:center;gap:8px`)}>
                    <span style={s(`font:500 14px 'DM Sans',sans-serif;color:#F4F2E6`)}>Fulfilment</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.72)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 11v5"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    <span style={s(`margin-left:auto;font:400 18px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>›</span>
                  </div>
                  <div style={s(`display:flex;align-items:baseline;gap:14px`)}>
                    <span style={s(`font:400 60px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>{V.L.orgF}</span>
                    <span style={s(`font:500 12.5px 'DM Mono',monospace;white-space:nowrap;color:${V.L.orgFdColor ?? ''}`)}>{V.L.orgFdText}</span>
                    <span style={s(`margin-left:auto;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:${V.L.orgFBand.bg ?? ''};color:${V.L.orgFBand.fg ?? ''};font:500 12px 'DM Sans',sans-serif`)}>{V.L.orgFBand.label}</span>
                  </div>
                  <svg viewBox="0 0 400 50" width="100%" height="50" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                    <polyline fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" points="0,50 400,50"></polyline>
                    <polyline fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={V.L.orgSpark}></polyline>
                    <circle r="3.5" fill="#EAF79B" cx="400" cy={V.L.orgSparkLastY}></circle>
                  </svg>
                  <div style={s(`display:flex;justify-content:space-between;font:500 9.5px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL</span>
                    <span>AUG</span>
                    <span>SEP</span>
                    <span>OCT</span>
                  </div>
                </div>
                <div style={s(`padding:20px 22px 20px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;background:rgba(228,240,214,.07);display:flex;flex-direction:column;gap:12px`)}>
                  <div style={s(`display:flex;align-items:center;gap:8px`)}>
                    <span style={s(`font:500 14px 'DM Sans',sans-serif;color:#F4F2E6`)}>Culture</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(201,212,194,.72)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 11v5"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    <span style={s(`margin-left:auto;font:400 18px/1 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>›</span>
                  </div>
                  <div style={s(`display:flex;align-items:baseline;gap:14px`)}>
                    <span style={s(`font:400 60px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>{V.L.orgC}</span>
                    <span style={s(`font:500 12.5px 'DM Mono',monospace;white-space:nowrap;color:${V.L.orgCdColor ?? ''}`)}>{V.L.orgCdText}</span>
                    <span style={s(`margin-left:auto;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:${V.L.orgCBand.bg ?? ''};color:${V.L.orgCBand.fg ?? ''};font:500 12px 'DM Sans',sans-serif`)}>{V.L.orgCBand.label}</span>
                  </div>
                  <svg viewBox="0 0 400 50" width="100%" height="50" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                    <polyline fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" points="0,50 400,50"></polyline>
                    <polyline fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={V.L.orgCSpark}></polyline>
                    <circle r="3.5" fill="#EAF79B" cx="400" cy={V.L.orgCSparkLastY}></circle>
                  </svg>
                  <div style={s(`display:flex;justify-content:space-between;font:500 9.5px 'DM Mono',monospace;color:rgba(201,212,194,.55)`)}>
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL</span>
                    <span>AUG</span>
                    <span>SEP</span>
                    <span>OCT</span>
                  </div>
                </div>
              </div>
              <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:14px`)}>
                <div style={s(`display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;border:1px solid rgba(228,240,214,.1)`)}>
                  <div style={s(`display:flex;flex-direction:column;gap:6px;min-width:0`)}>
                    <span style={s(`display:flex;align-items:center;gap:8px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>
                      <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71`)}></span>
                      FOCUS AREA
                    </span>
                    <span style={s(`font:400 13.5px/1.45 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>
                      <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9;margin-right:6px`)}>{V.L.focusName}</span>
                      {V.L.focusText}
                    </span>
                  </div>
                  <span style={s(`margin-left:auto;flex:none;display:inline-flex;align-items:center;padding:9px 16px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:500 13px 'DM Sans',sans-serif;color:#14231A;gap:4px`)}>
                    <span>Open</span>
                    <span>{V.L.focusName}</span>
                    <span>›</span>
                  </span>
                </div>
                <div style={s(`display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;border:1px solid rgba(228,240,214,.1)`)}>
                  <div style={s(`display:flex;flex-direction:column;gap:6px;min-width:0`)}>
                    <span style={s(`display:flex;align-items:center;gap:8px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>
                      <span style={s(`width:8px;height:8px;border-radius:999px;background:#D9EA6E`)}></span>
                      RUNNING
                    </span>
                    <span style={s(`font:400 13.5px/1.45 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>
                      <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F6F4E9;margin-right:6px`)}>{V.L.runTitle}</span>
                      {V.L.runMeta}
                    </span>
                  </div>
                  <span style={s(`margin-left-auto:0;margin-left:auto;flex:none;font:500 13px 'DM Sans',sans-serif;color:#EAF79B`)}>Open ›</span>
                </div>
              </div>
              <div style={s(`display:flex;align-items:baseline;justify-content:space-between`)}>
                <span style={s(`font:400 21px 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9`)}>By department</span>
                <span style={s(`display:inline-flex;border:1px solid rgba(228,240,214,.12);border-radius:999px;overflow:hidden;font:500 12px 'DM Sans',sans-serif`)}>
                  <span style={s(`padding:6px 13px;color:rgba(244,242,230,.6)`)}>Overview</span>
                  <span style={s(`padding:6px 13px;background:rgba(217,234,110,.12);color:#EAF79B`)}>Detail</span>
                </span>
              </div>
              <div style={s(`margin-top:-10px;padding:18px 20px 16px;border-radius:30px 20px 32px 22px / 20px 30px 22px 32px;background:rgba(228,240,214,.05);display:flex;flex-direction:column;gap:12px`)}>
                <div style={s(`display:grid;grid-template-columns:150px 80px 6px repeat(5,50px) 20px 80px 6px repeat(3,50px);gap:4px;align-items:end;padding:0 4px`)}>
                  <span></span>
                  <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>FULFILMENT</span>
                  <span></span>
                  {(V.pillarHeads || []).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                        <span style={s(`width:24px;height:24px;border-radius:${p.disc ?? ''};background:${p.tint ?? ''};display:flex;align-items:center;justify-content:center;color:${p.fg ?? ''}`)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d={p.d1}></path>
                            <path d={p.d2}></path>
                            <circle cx="9" cy="8.5" r={p.r1}></circle>
                            <circle cx="16.8" cy="10.3" r={p.r2}></circle>
                          </svg>
                        </span>
                        <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>{p.short}</span>
                      </span>
                    </React.Fragment>
                  ))}
                  <span></span>
                  <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>CULTURE</span>
                  <span></span>
                  {(V.cultureHeads || []).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <span style={s(`display:flex;flex-direction:column;align-items:center;gap:4px`)}>
                        <span style={s(`width:24px;height:24px;border-radius:${p.disc ?? ''};background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;color:rgba(244,242,230,.85)`)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d={p.d1}></path>
                            <path d={p.d2}></path>
                          </svg>
                        </span>
                        <span style={s(`font:400 10px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>{p.short}</span>
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <div style={s(`display:flex;flex-direction:column;gap:2px`)}>
                  {(V.L.rows || []).map((r, $index) => (
                    <React.Fragment key={$index}>
                      <div style={s(`display:grid;grid-template-columns:150px 80px 6px repeat(5,50px) 20px 80px 6px repeat(3,50px);gap:4px;align-items:center;padding:3px 4px;border-radius:12px;transition:background .2s ease`)} className="ldr-hob7451d">
                        <span style={s(`display:flex;align-items:center;gap:9px;font:400 16px 'DM Serif Display',serif;color:#F6F4E9`)}>
                          <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71;display:${r.lookDisplay ?? ''}`)}></span>
                          {r.name}
                        </span>
                        <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:44px;border-radius:12px;background:${r.fT.bg ?? ''};color:${r.fT.fg ?? ''};font:400 20px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                          <span>{r.fT.v}</span>
                          <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>{r.fT.a}</span>
                        </span>
                        <span></span>
                        {(r.pcells || []).map((c, $index) => (
                          <React.Fragment key={$index}>
                            <span style={s(`display:flex;align-items:center;justify-content:center;height:44px;font:400 13.5px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color:${c.ink ?? ''}`)}>
                              <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background:${c.dot ?? ''}`)}>{c.v}</span>
                            </span>
                          </React.Fragment>
                        ))}
                        <span></span>
                        <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:44px;border-radius:12px;background:${r.cT.bg ?? ''};color:${r.cT.fg ?? ''};font:400 20px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                          <span>{r.cT.v}</span>
                          <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>{r.cT.a}</span>
                        </span>
                        <span></span>
                        {(r.qcells || []).map((c, $index) => (
                          <React.Fragment key={$index}>
                            <span style={s(`display:flex;align-items:center;justify-content:center;height:44px;font:400 13.5px 'DM Sans',sans-serif;font-variant-numeric:tabular-nums;color:${c.ink ?? ''}`)}>
                              <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background:${c.dot ?? ''}`)}>{c.v}</span>
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                  <div style={s(`display:grid;grid-template-columns:150px 1fr;gap:4px;align-items:center;padding:3px 4px`)}>
                    <span style={s(`font:400 16px 'DM Serif Display',serif;color:#F6F4E9`)}>People & Finance</span>
                    <span style={s(`display:flex;align-items:center;height:44px;padding:0 16px;border-radius:12px;background:repeating-linear-gradient(135deg,rgba(228,240,214,.05) 0 5px,rgba(0,0,0,0) 5px 13px);font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Fewer than five people</span>
                  </div>
                </div>
                <div style={s(`display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px 18px;padding:6px 4px 0;font:400 11.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>
                  <span style={s(`display:flex;flex-wrap:wrap;gap:16px`)}>
                    {(V.legend || []).map((g, $index) => (
                      <React.Fragment key={$index}>
                        <span style={s(`display:inline-flex;align-items:center;gap:7px`)}>
                          <span style={s(`width:12px;height:12px;border-radius:4px;background:${g.bg ?? ''}`)}></span>
                          {g.label}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                  <span>↑ ↓ moved two points or more since September</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px;margin-top:28px;padding:28px 32px;border-radius:22px;background:linear-gradient(120deg,rgba(217,234,110,.10),rgba(217,234,110,.03) 60%);border:1px solid rgba(217,234,110,.28)`)}>
        <div style={s(`flex:1 1 320px`)}>
          <div style={s(`font:400 clamp(24px,2.6vw,30px)/1.15 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>See what nørma would show for your teams.</div>
          <div style={s(`margin-top:6px;font:400 15px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>A 30-minute walkthrough of the app and the leader dashboard.</div>
        </div>
        <a href="#demo" style={s(`flex:none;display:inline-flex;align-items:center;padding:15px 26px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:600 15px 'DM Sans',sans-serif;color:#152213;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 10px 30px rgba(217,234,110,.28);transition:all .2s ease`)} className="ldr-ho65fd62">Book a demo</a>
      </div>
    </div>
      </>
    );
  }
}
