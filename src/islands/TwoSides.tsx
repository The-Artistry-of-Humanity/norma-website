// @ts-nocheck
/* Generated from the v3 design handoff by dc2jsx: markup and styles verbatim.
   State and data come from ./v3/home-logic.js (the reference's own logic). */
import React from 'react';
import { s } from '../lib/s';
import Phone from './Phone';
import * as L from './v3/home-logic.js';
import './TwoSides.dc.css';

export default class TwoSides extends L.HomeBase {
  render() {
    const V = { ...this.props, ...this.renderVals() };
    return (
      <>
    <div id="product" data-r="wrap" style={s(`max-width:1180px;margin:0 auto;padding:100px 40px 40px;box-sizing:border-box`)}>
      <div style={s(`display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px 40px`)}>
        <div style={s(`max-width:620px`)}>
          <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>ONE SYSTEM, TWO SIDES</span>
          <h2 style={s(`margin:16px 0 0;font:400 clamp(34px,4vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:pretty`)}>Your people get a live companion. You get a signal to act on.</h2>
        </div>
        <div style={s(`display:inline-flex;padding:4px;border-radius:999px;border:1px solid rgba(228,240,214,.12);background:rgba(10,19,13,.4)`)}>
          <button onClick={V.pickPeople} style={s(`padding:10px 18px;border-radius:999px;border:0;cursor:pointer;background:${V.sidePeople.bg ?? ''};color:${V.sidePeople.c ?? ''};font:500 14px 'DM Sans',sans-serif;transition:all .3s ease`)} className="tws-ho950d73">Employee app</button>
          <button onClick={V.pickYou} style={s(`padding:10px 18px;border-radius:999px;border:0;cursor:pointer;background:${V.sideYou.bg ?? ''};color:${V.sideYou.c ?? ''};font:500 14px 'DM Sans',sans-serif;transition:all .3s ease`)} className="tws-ho950d73">Your dashboard</button>
        </div>
      </div>
      <div data-r="panel" style={s(`margin-top:36px;padding:44px 40px;border-radius:30px;background:rgba(228,240,214,.035);border:1px solid rgba(228,240,214,.08)`)}>
        {(V.sideIsPeople) ? (
          <>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:40px;align-items:center`)}>
              <div>
                <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>THE EMPLOYEE APP · PRIVATE</span>
                <h3 style={s(`margin:14px 0 0;font:400 30px/1.15 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>A companion for the whole month, not just check-in day.</h3>
                <div style={s(`display:flex;flex-direction:column;gap:2px;margin-top:22px`)}>
                  {(V.peopleFeatures || []).map((f, $index) => (
                    <React.Fragment key={$index}>
                      <button onClick={f.pick} style={s(`display:flex;gap:16px;align-items:flex-start;text-align:left;width:100%;padding:14px 14px;border-radius:${f.r ?? ''};border:0;cursor:pointer;background:${f.bg ?? ''};transition:all .3s ease;font-family:'DM Sans',sans-serif`)} className="tws-hodb1302">
                        <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:${f.iconBg ?? ''};color:${f.iconFg ?? ''}`)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d={f.d1}></path>
                            <path d={f.d2}></path>
                          </svg>
                        </span>
                        <span style={s(`display:flex;flex-direction:column;gap:4px;min-width:0`)}>
                          <span style={s(`font:500 15.5px 'DM Sans',sans-serif;color:#F6F4E9`)}>{f.title}</span>
                          <span style={s(`font:400 14px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.8);text-wrap:pretty`)}>{f.line}</span>
                        </span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:26px;padding-left:14px`)}>
                  <span style={s(`display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 12px;border-radius:14px 10px 12px 8px / 10px 14px 8px 12px;border:1px solid rgba(228,240,214,.16);background:rgba(10,19,13,.55);color:#F4F2E6`)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#F4F2E6" aria-hidden="true">
                      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.8zM14.1 5.9c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3z"></path>
                    </svg>
                    <span style={s(`display:flex;flex-direction:column;gap:1px;line-height:1`)}>
                      <span style={s(`font:400 9.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Download on the</span>
                      <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>App Store</span>
                    </span>
                  </span>
                  <span style={s(`display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 12px;border-radius:10px 14px 8px 12px / 14px 10px 12px 8px;border:1px solid rgba(228,240,214,.16);background:rgba(10,19,13,.55);color:#F4F2E6`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4F2E6" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 3.5 L19 12 L5 20.5 Z"></path>
                      <path d="M5 3.5 L14.5 13"></path>
                      <path d="M5 20.5 L14.5 11"></path>
                    </svg>
                    <span style={s(`display:flex;flex-direction:column;gap:1px;line-height:1`)}>
                      <span style={s(`font:400 9.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Get it on</span>
                      <span style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>Google Play</span>
                    </span>
                  </span>
                </div>
              </div>
              <div style={s(`position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;min-height:680px`)}>
                <div style={s(`position:absolute;width:460px;height:460px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.12),rgba(0,0,0,0) 72%);animation:breathe 6s ease-in-out infinite;pointer-events:none`)}></div>
                <div id="side-phone" style={s(`position:relative`)}><Phone screen={V.shot} /></div>
                <div style={s(`position:relative;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;max-width:520px`)}>
                  {(V.shots || []).map((sh, $index) => (
                    <React.Fragment key={$index}>
                      <button onClick={sh.pick} style={s(`padding:7px 12px;border-radius:999px;cursor:pointer;background:${sh.bg ?? ''};border:1px solid ${sh.bc ?? ''};color:${sh.c ?? ''};font:500 12.5px 'DM Sans',sans-serif;transition:all .3s ease`)} className="tws-ho647409">{sh.label}</button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
        {(V.sideIsYou) ? (
          <>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px 40px`)}>
              <div style={s(`max-width:520px`)}>
                <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>YOUR DASHBOARD · FED BY THE APP</span>
                <h3 style={s(`margin:14px 0 0;font:400 30px/1.15 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>Every check-in in the app, aggregated into one signal.</h3>
              </div>
            </div>
            <div data-r="g4" style={s(`display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:22px`)}>
              {(V.youFeatures || []).map((f, $index) => (
                <React.Fragment key={$index}>
                  <button onClick={f.pick} style={s(`display:flex;gap:16px;align-items:flex-start;text-align:left;padding:14px 14px;border-radius:${f.r ?? ''};border:0;cursor:pointer;background:${f.bg ?? ''};transition:all .3s ease;font-family:'DM Sans',sans-serif`)} className="tws-hodb1302">
                    <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:${f.iconBg ?? ''};color:${f.iconFg ?? ''}`)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={f.d1}></path>
                        <path d={f.d2}></path>
                      </svg>
                    </span>
                    <span style={s(`display:flex;flex-direction:column;gap:4px;min-width:0`)}>
                      <span style={s(`font:500 15.5px 'DM Sans',sans-serif;color:#F6F4E9`)}>{f.title}</span>
                      <span style={s(`font:400 14px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.8);text-wrap:pretty`)}>{f.line}</span>
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div id="side-dashboard" style={s(`position:relative;margin-top:28px;padding:34px 36px 30px;border-radius:30px 20px 32px 22px / 20px 30px 22px 32px;background:rgba(6,11,7,.55);border:1px solid rgba(228,240,214,.1);overflow:hidden;color:#F4F2E6`)}>
              <div style={s(`position:absolute;left:50%;top:-120px;width:620px;height:420px;margin-left:-310px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.10),rgba(0,0,0,0) 72%);pointer-events:none`)}></div>
              <div style={s(`position:relative;display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 20px;margin-bottom:22px`)}>
                <span style={s(`font:400 21px 'DM Serif Display',serif;color:#F6F4E9`)}>{V.ttl}</span>
                <span style={s(`font:500 10.5px 'DM Mono',monospace;letter-spacing:1.4px;color:rgba(201,212,194,.6)`)}>{V.ttlSub}</span>
              </div>
              <div style={s(`position:relative;display:flex;flex-direction:column;gap:22px`)}>
                {(V.youIs0) ? (
                  <>
                    <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px`)}>
                      <div style={s(`padding:22px 24px;border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:rgba(228,240,214,.07);display:flex;flex-direction:column;gap:14px`)}>
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
                          <span style={s(`font:400 64px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>{V.L.orgF}</span>
                          <span style={s(`font:500 12.5px 'DM Mono',monospace;white-space:nowrap;color:${V.L.orgFdColor ?? ''}`)}>{V.L.orgFdText}</span>
                          <span style={s(`margin-left:auto;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:${V.L.orgFBand.bg ?? ''};color:${V.L.orgFBand.fg ?? ''};font:500 12px 'DM Sans',sans-serif`)}>{V.L.orgFBand.label}</span>
                        </div>
                        <svg viewBox="0 0 400 60" width="100%" height="60" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                          <polyline fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" points="0,60 400,60"></polyline>
                          <polyline fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={V.L.orgSpark60}></polyline>
                          <circle r="3.5" fill="#EAF79B" cx="400" cy={V.L.orgSparkLastY60}></circle>
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
                      <div style={s(`padding:22px 24px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;background:rgba(228,240,214,.07);display:flex;flex-direction:column;gap:14px`)}>
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
                          <span style={s(`font:400 64px/1 'DM Serif Display',serif;color:#F6F4E9;font-variant-numeric:tabular-nums`)}>{V.L.orgC}</span>
                          <span style={s(`font:500 12.5px 'DM Mono',monospace;white-space:nowrap;color:${V.L.orgCdColor ?? ''}`)}>{V.L.orgCdText}</span>
                          <span style={s(`margin-left:auto;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:${V.L.orgCBand.bg ?? ''};color:${V.L.orgCBand.fg ?? ''};font:500 12px 'DM Sans',sans-serif`)}>{V.L.orgCBand.label}</span>
                        </div>
                        <svg viewBox="0 0 400 60" width="100%" height="60" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                          <polyline fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" points="0,60 400,60"></polyline>
                          <polyline fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={V.L.orgCSpark60}></polyline>
                          <circle r="3.5" fill="#EAF79B" cx="400" cy={V.L.orgCSparkLastY60}></circle>
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
                        <span style={s(`margin-left:auto;flex:none;display:inline-flex;align-items:center;padding:9px 16px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:500 13px 'DM Sans',sans-serif;color:#14231A`)}>Open ›</span>
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
                        <span style={s(`margin-left:auto;flex:none;font:500 13px 'DM Sans',sans-serif;color:#EAF79B`)}>Open ›</span>
                      </div>
                    </div>
                    <div style={s(`font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.62)`)}>Northwind · 184 people · 71% checked in · every number is an aggregate of the app’s check-ins</div>
                  </>
                ) : null}
                {(V.youIs1) ? (
                  <>
                    <div style={s(`padding:18px 20px 16px;border-radius:30px 20px 32px 22px / 20px 30px 22px 32px;background:rgba(228,240,214,.05);display:flex;flex-direction:column;gap:12px`)}>
                      <div style={s(`display:grid;grid-template-columns:150px 80px 20px 80px 1fr;gap:4px;align-items:end;padding:0 4px`)}>
                        <span></span>
                        <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>FULFILMENT</span>
                        <span></span>
                        <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(244,242,230,.85);text-align:center;padding-bottom:4px`)}>CULTURE</span>
                        <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.55);padding:0 0 4px 24px`)}>SIX MONTHS</span>
                      </div>
                      <div style={s(`display:flex;flex-direction:column;gap:2px`)}>
                        {(V.L.rows || []).map((r, $index) => (
                          <React.Fragment key={$index}>
                            <div style={s(`display:grid;grid-template-columns:150px 80px 20px 80px 1fr;gap:4px;align-items:center;padding:3px 4px;border-radius:12px;transition:background .2s ease`)} className="tws-hob7451d">
                              <span style={s(`display:flex;align-items:center;gap:9px;font:400 16px 'DM Serif Display',serif;color:#F6F4E9`)}>
                                <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71;display:${r.lookDisplay ?? ''}`)}></span>
                                {r.name}
                              </span>
                              <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:44px;border-radius:12px;background:${r.fT.bg ?? ''};color:${r.fT.fg ?? ''};font:400 20px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                                <span>{r.fT.v}</span>
                                <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>{r.fT.a}</span>
                              </span>
                              <span></span>
                              <span style={s(`display:flex;align-items:center;justify-content:center;gap:4px;height:44px;border-radius:12px;background:${r.cT.bg ?? ''};color:${r.cT.fg ?? ''};font:400 20px 'DM Serif Display',serif;font-variant-numeric:tabular-nums`)}>
                                <span>{r.cT.v}</span>
                                <span style={s(`font:400 11px 'DM Sans',sans-serif;opacity:.7`)}>{r.cT.a}</span>
                              </span>
                              <span style={s(`padding-left:24px`)}>
                                <svg viewBox="0 0 200 30" width="200" height="30" preserveAspectRatio="none" style={s(`display:block;overflow:visible`)}>
                                  <polyline fill="none" stroke="rgba(217,234,110,.7)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" points={r.spark}></polyline>
                                </svg>
                              </span>
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
                        <span>↑ ↓ moved two points or more since September · open a row for the five pillars and three culture questions</span>
                      </div>
                    </div>
                  </>
                ) : null}
                {(V.youIs2) ? (
                  <>
                    <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:20px;align-items:start`)}>
                      <div style={s(`padding:22px 24px;border-radius:32px 22px 30px 20px / 22px 32px 20px 30px;background:rgba(228,240,214,.07);display:flex;flex-direction:column;gap:14px`)}>
                        <span style={s(`display:flex;align-items:center;gap:8px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>
                          <span style={s(`width:8px;height:8px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71`)}></span>
                          {"FOCUS AREA · "}{V.L.focusUpper}
                        </span>
                        <div style={s(`display:flex;align-items:baseline;gap:14px`)}>
                          <span style={s(`font:400 64px/1 'DM Serif Display',serif;color:#F6F4E9`)}>{V.L.focusScore}</span>
                          <span style={s(`font:500 12.5px 'DM Mono',monospace;color:#EFB39B`)}>{V.L.focusDelta}</span>
                          <span style={s(`margin-left:auto;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:${V.L.focusBand.bg ?? ''};color:${V.L.focusBand.fg ?? ''};font:500 12px 'DM Sans',sans-serif`)}>{V.L.focusBand.label}</span>
                        </div>
                        <p style={s(`margin:0;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>{V.L.focusText}</p>
                        <div style={s(`display:flex;flex-direction:column;gap:10px;margin-top:4px`)}>
                          <div style={s(`display:grid;grid-template-columns:90px 1fr 44px;gap:14px;align-items:center`)}>
                            <span style={s(`font:400 15px 'DM Serif Display',serif;color:#F6F4E9`)}>Health</span>
                            <span style={s(`height:10px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:47%;border-radius:999px;background:rgba(230,199,126,.75)`)}></span></span>
                            <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F8E9C9;text-align:right`)}>47</span>
                          </div>
                          <div style={s(`display:grid;grid-template-columns:90px 1fr 44px;gap:14px;align-items:center`)}>
                            <span style={s(`font:400 15px 'DM Serif Display',serif;color:#F6F4E9`)}>Internal</span>
                            <span style={s(`height:10px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:55%;border-radius:999px;background:rgba(217,234,110,.55)`)}></span></span>
                            <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F4F2E6;text-align:right`)}>55</span>
                          </div>
                          <div style={s(`display:grid;grid-template-columns:90px 1fr 44px;gap:14px;align-items:center`)}>
                            <span style={s(`font:400 15px 'DM Serif Display',serif;color:#F6F4E9`)}>Love</span>
                            <span style={s(`height:10px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:58%;border-radius:999px;background:rgba(217,234,110,.55)`)}></span></span>
                            <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F4F2E6;text-align:right`)}>58</span>
                          </div>
                          <div style={s(`display:grid;grid-template-columns:90px 1fr 44px;gap:14px;align-items:center`)}>
                            <span style={s(`font:400 15px 'DM Serif Display',serif;color:#F6F4E9`)}>Social</span>
                            <span style={s(`height:10px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:56%;border-radius:999px;background:rgba(217,234,110,.55)`)}></span></span>
                            <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F4F2E6;text-align:right`)}>56</span>
                          </div>
                          <div style={s(`display:grid;grid-template-columns:90px 1fr 44px;gap:14px;align-items:center`)}>
                            <span style={s(`font:400 15px 'DM Serif Display',serif;color:#F6F4E9`)}>Flow</span>
                            <span style={s(`height:10px;border-radius:999px;background:rgba(228,240,214,.08);overflow:hidden`)}><span style={s(`display:block;height:100%;width:44%;border-radius:999px;background:rgba(230,199,126,.75)`)}></span></span>
                            <span style={s(`font:400 17px 'DM Serif Display',serif;color:#F8E9C9;text-align:right`)}>44</span>
                          </div>
                        </div>
                      </div>
                      <div style={s(`display:flex;flex-direction:column;gap:14px`)}>
                        <div style={s(`padding:20px 22px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;border:1px solid rgba(228,240,214,.1)`)}>
                          <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.72)`)}>WHAT PEOPLE SAY · AGGREGATED</span>
                          <div style={s(`display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;font:500 12.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.9)`)}>
                            <span style={s(`padding:7px 12px;border-radius:999px;background:rgba(230,199,126,.14);border:1px solid rgba(230,199,126,.3)`)}>Shift recovery · many</span>
                            <span style={s(`padding:7px 12px;border-radius:999px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.12)`)}>Sleep · some</span>
                            <span style={s(`padding:7px 12px;border-radius:999px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.12)`)}>Time with family · some</span>
                          </div>
                        </div>
                        <div style={s(`padding:20px 22px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;background:linear-gradient(120deg,rgba(217,234,110,.10),rgba(217,234,110,.03) 60%);border:1px solid rgba(217,234,110,.3)`)}>
                          <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:#DCEC85`)}>SUGGESTED NEXT STEP</span>
                          <div style={s(`margin-top:10px;font:400 20px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>{V.L.runTitle}</div>
                          <p style={s(`margin:6px 0 0;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>A twenty-minute session from the library, built on the two lowest pillars. Logged against the October signal.</p>
                          <span style={s(`display:inline-flex;align-items:center;margin-top:14px;padding:9px 16px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:500 13px 'DM Sans',sans-serif;color:#14231A`)}>Start it ›</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {(V.youIs3) ? (
                  <>
                    <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
                      <div style={s(`display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;background:rgba(217,234,110,.08);border:1px solid rgba(217,234,110,.3)`)}>
                        <span style={s(`flex:none;width:10px;height:10px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 0 4px rgba(217,234,110,.18)`)}></span>
                        <div style={s(`flex:1;min-width:0`)}>
                          <div style={s(`font:400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>{V.L.runTitle}</div>
                          <div style={s(`margin-top:3px;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>{V.L.runMeta}{" · answers the October signal"}</div>
                        </div>
                        <div style={s(`display:flex;gap:6px;flex:none`)}>
                          <span style={s(`width:28px;height:6px;border-radius:999px;background:#D9EA6E`)}></span>
                          <span style={s(`width:28px;height:6px;border-radius:999px;background:#D9EA6E`)}></span>
                          <span style={s(`width:28px;height:6px;border-radius:999px;background:rgba(228,240,214,.14)`)}></span>
                        </div>
                        <span style={s(`flex:none;font:500 13px 'DM Sans',sans-serif;color:#EAF79B`)}>Continue ›</span>
                      </div>
                      <div style={s(`display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;border:1px solid rgba(228,240,214,.1)`)}>
                        <span style={s(`flex:none;width:10px;height:10px;border-radius:999px;background:rgba(228,240,214,.35)`)}></span>
                        <div style={s(`flex:1;min-width:0`)}>
                          <div style={s(`font:400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>Stop for Wellness · Work & Life Flow</div>
                          <div style={s(`margin-top:3px;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>Platform team · ran 12 September · Flow 45 → 51 in October</div>
                        </div>
                        <span style={s(`flex:none;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:rgba(217,234,110,.42);color:#F2FBB8;font:500 12px 'DM Sans',sans-serif`)}>Moved ↑ 6</span>
                      </div>
                      <div style={s(`display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:26px 18px 28px 16px / 18px 28px 16px 26px;border:1px solid rgba(228,240,214,.1)`)}>
                        <span style={s(`flex:none;width:10px;height:10px;border-radius:999px;background:rgba(228,240,214,.35)`)}></span>
                        <div style={s(`flex:1;min-width:0`)}>
                          <div style={s(`font:400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>Listening round</div>
                          <div style={s(`margin-top:3px;font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>Customer Success · ran 28 August · Heard 58 → 60</div>
                        </div>
                        <span style={s(`flex:none;padding:5px 11px;border-radius:22px 14px 20px 12px / 14px 20px 12px 22px;background:rgba(228,240,214,.12);color:#F4F2E6;font:500 12px 'DM Sans',sans-serif`)}>Steady</span>
                      </div>
                      <div style={s(`display:flex;align-items:baseline;justify-content:space-between;margin-top:14px`)}>
                        <span style={s(`font:400 21px 'DM Serif Display',serif;color:#F6F4E9`)}>From the library</span>
                        <span style={s(`font:500 13px 'DM Sans',sans-serif;color:#EAF79B`)}>All playbooks ›</span>
                      </div>
                      <div data-r="g3" style={s(`display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px`)}>
                        <div style={s(`padding:16px 18px;border-radius:18px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.09)`)}>
                          <div style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1.4px;color:rgba(201,212,194,.7)`)}>20 MIN · TEAM</div>
                          <div style={s(`margin-top:8px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>Stop for Wellness</div>
                          <div style={s(`margin-top:4px;font:400 12.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>One question everyone answers, one commitment.</div>
                        </div>
                        <div style={s(`padding:16px 18px;border-radius:18px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.09)`)}>
                          <div style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1.4px;color:rgba(201,212,194,.7)`)}>30 MIN · TEAM</div>
                          <div style={s(`margin-top:8px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>Listening round</div>
                          <div style={s(`margin-top:4px;font:400 12.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>For when culture is slipping and people have gone quiet.</div>
                        </div>
                        <div style={s(`padding:16px 18px;border-radius:18px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.09)`)}>
                          <div style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1.4px;color:rgba(201,212,194,.7)`)}>1:1 · 15 MIN</div>
                          <div style={s(`margin-top:8px;font:400 17px 'DM Serif Display',serif;color:#F6F4E9`)}>Shift recovery review</div>
                          <div style={s(`margin-top:4px;font:400 12.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Rosters, rest and the week after nights.</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div style={s(`display:flex;align-items:center;justify-content:center;gap:10px;margin-top:26px;font:400 15px 'DM Serif Display',serif;color:rgba(244,242,230,.85)`)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D9EA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M2.5 12 C5 7 8.5 4.5 12 4.5 C15.5 4.5 19 7 21.5 12 C19 17 15.5 19.5 12 19.5 C8.5 19.5 5 17 2.5 12 Z"></path>
        </svg>
        Everything a person enters stays in their app. The dashboard only ever shows aggregates, for groups of five or more.
      </div>
    </div>
      </>
    );
  }
}
