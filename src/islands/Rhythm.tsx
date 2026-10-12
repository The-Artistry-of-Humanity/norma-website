// @ts-nocheck
/* Generated from the v3 design handoff by dc2jsx: markup and styles verbatim.
   State and data come from ./v3/home-logic.js (the reference's own logic). */
import React from 'react';
import { s } from '../lib/s';
import Phone from './Phone';
import * as L from './v3/home-logic.js';
import './Rhythm.dc.css';

export default class Rhythm extends L.HomeBase {
  render() {
    const V = { ...this.props, ...this.renderVals() };
    return (
      <>
    <div id="rhythm" data-r="wrap" style={s(`max-width:1180px;margin:0 auto;padding:110px 40px 40px;box-sizing:border-box`)}>
      <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>HOW IT WORKS</span>
      <h2 style={s(`margin:16px 0 0;max-width:640px;font:400 clamp(34px,4vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:pretty`)}>One month with nørma.</h2>
      <div style={s(`display:flex;flex-wrap:wrap;gap:10px;margin-top:32px`)}>
        {(V.steps || []).map((st, $index) => (
          <React.Fragment key={$index}>
            <button onClick={st.pick} style={s(`display:inline-flex;align-items:center;gap:10px;padding:11px 18px 11px 14px;border-radius:999px;cursor:pointer;background:${st.bg ?? ''};border:1px solid ${st.bc ?? ''};color:${st.color ?? ''};font:500 14px 'DM Sans',sans-serif;transition:all .3s ease`)} className="rhy-ho647409">
              <span style={s(`font:500 11px 'DM Mono',monospace;color:${st.num ?? ''}`)}>{st.n}</span>
              {st.name}
            </button>
          </React.Fragment>
        ))}
      </div>
      <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:40px;align-items:center;margin-top:32px;padding:44px 40px;border-radius:30px;background:rgba(228,240,214,.035);border:1px solid rgba(228,240,214,.08)`)} data-r="panel">
        <div style={s(`position:relative;min-height:620px;display:flex;align-items:center;justify-content:center`)}>
          <div style={s(`position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.12),rgba(0,0,0,0) 72%);animation:breathe 6s ease-in-out infinite;pointer-events:none`)}></div>
          {(V.stepIs0) ? (
            <>
              <div id="rhythm-checkin" style={s(`position:relative`)}><Phone screen="checkin" /></div>
            </>
          ) : null}
          {(V.stepIs1) ? (
            <>
              <div id="rhythm-mirror" style={s(`position:relative`)}><Phone screen="mirror" /></div>
            </>
          ) : null}
          {(V.stepIs2) ? (
            <>
              <div id="rhythm-grow" style={s(`position:relative`)}><Phone screen="grow" /></div>
            </>
          ) : null}
          {(V.stepIs3) ? (
            <>
              <div style={s(`position:relative;width:400px;max-width:100%;box-sizing:border-box;border-radius:18px;border:1px solid rgba(228,240,214,.14);background:linear-gradient(165deg,#132718 0%,#0D1811 55%,#0A120C 100%);box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden`)}>
                <div style={s(`display:flex;align-items:center;height:34px;padding:0 14px;box-sizing:border-box;border-bottom:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.5)`)}>
                  <div style={s(`display:flex;gap:6px`)}>
                    <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                    <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                    <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                  </div>
                  <span style={s(`margin:0 auto;padding:3px 12px;border-radius:999px;background:rgba(228,240,214,.05);font:400 10px 'DM Mono',monospace;color:rgba(201,212,194,.72)`)}>app.joinnorma.com/dashboard</span>
                  <span style={s(`width:34px`)}></span>
                </div>
                <div style={s(`padding:20px 22px 22px;display:flex;flex-direction:column;gap:14px`)}>
                  <div style={s(`display:flex;align-items:baseline;justify-content:space-between`)}>
                    <span style={s(`font:400 22px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Northwind</span>
                    <span style={s(`display:inline-flex;align-items:center;gap:6px;font:400 11px 'DM Sans',sans-serif;color:#EAF79B`)}>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 0 3px rgba(217,234,110,.2)`)}></span>
                      October signal
                    </span>
                  </div>
                  <div style={s(`display:grid;grid-template-columns:1fr 1fr;gap:10px`)}>
                    <div style={s(`padding:14px 16px;border-radius:24px 16px 22px 14px / 16px 24px 14px 22px;background:rgba(228,240,214,.07)`)}>
                      <div style={s(`font:500 11px 'DM Sans',sans-serif;color:#F4F2E6`)}>Fulfilment</div>
                      <div style={s(`display:flex;align-items:baseline;gap:8px;margin-top:6px`)}>
                        <span style={s(`font:400 38px/1 'DM Serif Display',serif;color:#F6F4E9`)}>59</span>
                        <span style={s(`font:500 10px 'DM Mono',monospace;color:#EFB39B`)}>↓ 2</span>
                      </div>
                    </div>
                    <div style={s(`padding:14px 16px;border-radius:16px 24px 14px 22px / 24px 16px 22px 14px;background:rgba(228,240,214,.07)`)}>
                      <div style={s(`font:500 11px 'DM Sans',sans-serif;color:#F4F2E6`)}>Culture</div>
                      <div style={s(`display:flex;align-items:baseline;gap:8px;margin-top:6px`)}>
                        <span style={s(`font:400 38px/1 'DM Serif Display',serif;color:#F6F4E9`)}>69</span>
                        <span style={s(`font:500 10px 'DM Mono',monospace;color:rgba(201,212,194,.6)`)}>· 0</span>
                      </div>
                    </div>
                  </div>
                  <div style={s(`padding:14px 16px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;border:1px solid rgba(231,142,113,.35);background:rgba(231,142,113,.06)`)}>
                    <span style={s(`display:flex;align-items:center;gap:8px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>
                      <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71`)}></span>
                      FOCUS AREA
                    </span>
                    <div style={s(`margin-top:8px;font:400 13.5px/1.45 'DM Sans',sans-serif;color:rgba(244,242,230,.86)`)}>
                      <span style={s(`font:400 18px 'DM Serif Display',serif;color:#F6F4E9;margin-right:6px`)}>Operations</span>
                      Fulfilment 52, down 6. Work & Life Flow 44 and Health 47 are the lowest.
                    </div>
                    <span style={s(`display:inline-flex;align-items:center;margin-top:12px;padding:8px 14px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:500 12px 'DM Sans',sans-serif;color:#14231A`)}>Open Operations ›</span>
                  </div>
                  <div style={s(`font:400 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>33 people · aggregated · no individual answers</div>
                </div>
              </div>
            </>
          ) : null}
          {(V.stepIs4) ? (
            <>
              <div style={s(`position:relative;width:360px;max-width:100%;box-sizing:border-box;padding:28px 30px 26px;border-radius:24px;background:#0D1811;border:1px solid rgba(228,240,214,.12);box-shadow:0 40px 90px rgba(0,0,0,.5)`)}>
                <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:#D9EA6E`)}>STOP FOR WELLNESS · OCTOBER</span>
                <div style={s(`margin-top:8px;font:500 11px 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.78)`)}>OPERATIONS · 33 PEOPLE</div>
                <h3 style={s(`margin:16px 0 0;font:400 30px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Work & Life Flow</h3>
                <p style={s(`margin:8px 0 0;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Built on your team’s lowest pillar this month.</p>
                <div style={s(`display:flex;align-items:baseline;gap:12px;margin-top:18px`)}>
                  <span style={s(`font:400 44px/1 'DM Serif Display',serif;color:#EFDCAE`)}>44</span>
                  <span style={s(`padding:4px 9px;border-radius:999px;background:rgba(230,199,126,.10);border:1px solid rgba(230,199,126,.3);font:500 10.5px 'DM Sans',sans-serif;color:#EFDCAE`)}>↘ 6 vs September</span>
                </div>
                <div style={s(`display:flex;flex-direction:column;gap:8px;margin-top:22px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
                  <div style={s(`display:flex;justify-content:space-between;padding:11px 14px;border-radius:12px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)`)}>
                    <span>Pause together</span>
                    <span style={s(`font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.78)`)}>2 MIN</span>
                  </div>
                  <div style={s(`display:flex;justify-content:space-between;padding:11px 14px;border-radius:12px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)`)}>
                    <span>One question, everyone answers</span>
                    <span style={s(`font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.78)`)}>10 MIN</span>
                  </div>
                  <div style={s(`display:flex;justify-content:space-between;padding:11px 14px;border-radius:12px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)`)}>
                    <span>One commitment for the month</span>
                    <span style={s(`font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.78)`)}>5 MIN</span>
                  </div>
                </div>
                <span style={s(`display:flex;align-items:center;justify-content:center;height:48px;margin-top:20px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 14px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)}>Start the session</span>
              </div>
            </>
          ) : null}
          {(V.stepIs5) ? (
            <>
              <div style={s(`position:relative;width:400px;max-width:100%;box-sizing:border-box;border-radius:18px;border:1px solid rgba(228,240,214,.14);background:linear-gradient(165deg,#132718 0%,#0D1811 55%,#0A120C 100%);box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden`)}>
                <div style={s(`display:flex;align-items:center;height:34px;padding:0 14px;box-sizing:border-box;border-bottom:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.5)`)}>
                  <div style={s(`display:flex;gap:6px`)}>
                    <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                    <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                    <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                  </div>
                  <span style={s(`margin:0 auto;padding:3px 12px;border-radius:999px;background:rgba(228,240,214,.05);font:400 10px 'DM Mono',monospace;color:rgba(201,212,194,.72)`)}>app.joinnorma.com/departments/operations</span>
                  <span style={s(`width:34px`)}></span>
                </div>
                <div style={s(`padding:20px 22px 22px;display:flex;flex-direction:column;gap:14px`)}>
                  <div style={s(`display:flex;align-items:baseline;justify-content:space-between`)}>
                    <span style={s(`font:400 22px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Operations</span>
                    <span style={s(`display:inline-flex;align-items:center;gap:6px;font:400 11px 'DM Sans',sans-serif;color:#EAF79B`)}>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 0 3px rgba(217,234,110,.2)`)}></span>
                      November signal
                    </span>
                  </div>
                  <div style={s(`padding:16px 18px;border-radius:24px 16px 22px 14px / 16px 24px 14px 22px;background:rgba(228,240,214,.07)`)}>
                    <div style={s(`font:500 11px 'DM Sans',sans-serif;color:#F4F2E6`)}>Fulfilment</div>
                    <div style={s(`display:flex;align-items:baseline;gap:10px;margin-top:6px`)}>
                      <span style={s(`font:400 44px/1 'DM Serif Display',serif;color:#F6F4E9`)}>57</span>
                      <span style={s(`font:500 11px 'DM Mono',monospace;color:#E4F290`)}>↑ 5 since Oct</span>
                      <span style={s(`margin-left:auto;padding:4px 10px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:rgba(228,240,214,.12);color:#F4F2E6;font:500 11px 'DM Sans',sans-serif`)}>Steady</span>
                    </div>
                    <svg viewBox="0 0 100 24" width="100%" height="24" preserveAspectRatio="none" style={s(`display:block;margin-top:10px;overflow:visible`)}>
                      <polyline fill="none" stroke="#D9EA6E" strokeWidth="1.6" points="0,8 20,8 40,10 60,9 80,20 100,10"></polyline>
                      <circle cx="80" cy="20" r="2.4" fill="#E78E71"></circle>
                      <circle cx="100" cy="10" r="2.6" fill="#EAF79B"></circle>
                    </svg>
                  </div>
                  <div style={s(`display:flex;flex-direction:column;gap:8px`)}>
                    <div style={s(`display:grid;grid-template-columns:70px 1fr 60px;gap:10px;align-items:center;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
                      <span style={s(`font:400 14px 'DM Serif Display',serif;color:#F6F4E9`)}>Flow</span>
                      <span style={s(`height:8px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:51%;border-radius:999px;background:rgba(217,234,110,.55)`)}></span></span>
                      <span style={s(`text-align:right;color:#E4F290`)}>44 → 51</span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:70px 1fr 60px;gap:10px;align-items:center;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
                      <span style={s(`font:400 14px 'DM Serif Display',serif;color:#F6F4E9`)}>Health</span>
                      <span style={s(`height:8px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:49%;border-radius:999px;background:rgba(217,234,110,.55)`)}></span></span>
                      <span style={s(`text-align:right;color:rgba(201,212,194,.8)`)}>47 → 49</span>
                    </div>
                  </div>
                  <div style={s(`display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:rgba(217,234,110,.06);border:1px solid rgba(217,234,110,.22);font:400 12px/1.4 'DM Sans',sans-serif;color:rgba(244,242,230,.9)`)}>
                    <span style={s(`flex:none;width:7px;height:7px;border-radius:999px;background:#D9EA6E`)}></span>
                    Stop for Wellness · ran 14 Oct · logged against the October signal
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div>
          <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>{V.step.n}{" · "}{V.step.nameUpper}</span>
          <h3 style={s(`margin:14px 0 0;font:400 34px/1.12 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>{V.step.title}</h3>
          <p style={s(`margin:16px 0 0;max-width:440px;font:400 16.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.78);text-wrap:pretty`)}>{V.step.body}</p>
          <p style={s(`margin:22px 0 0;padding-top:18px;border-top:1px solid rgba(228,240,214,.08);max-width:440px;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{V.step.note}</p>
        </div>
      </div>
    </div>
      </>
    );
  }
}
