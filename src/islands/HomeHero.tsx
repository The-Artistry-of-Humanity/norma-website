// @ts-nocheck
/* Generated from the v3 design handoff by dc2jsx: markup and styles verbatim.
   State and data come from ./v3/home-logic.js (the reference's own logic). */
import React from 'react';
import { s } from '../lib/s';
import Phone from './Phone';
import * as L from './v3/home-logic.js';
import './HomeHero.dc.css';

export default class HomeHero extends L.HomeBase {
  render() {
    const V = { ...this.props, ...this.renderVals() };
    return (
      <>
    <div style={s(`position:relative;background:linear-gradient(178deg,#17301F 0%,#0F2015 40%,#0A130D 100%)`)}>
      <div style={s(`position:absolute;left:50%;top:80px;width:900px;height:620px;margin-left:-300px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.14),rgba(217,234,110,.04) 55%,rgba(0,0,0,0) 100%);animation:breathe 6s ease-in-out infinite;pointer-events:none`)}></div>
      <div style={s(`position:relative;max-width:1180px;margin:0 auto;padding:84px 40px 70px;box-sizing:border-box;display:flex;flex-wrap:wrap;gap:40px;align-items:center;justify-content:center`)}>
        <div style={s(`flex:1 1 360px;max-width:560px`)}>
          <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>THE WELL-BEING OPERATING SYSTEM</span>
          <h1 style={s(`margin:22px 0 0;font:400 clamp(42px,4.8vw,62px)/1.05 'DM Serif Display',serif;letter-spacing:-.9px;color:#F6F4E9;text-wrap:pretty`)}>Empower your people to thrive. Give leaders the signals to act.</h1>
          <p style={s(`margin:24px 0 0;max-width:520px;font:400 18px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.78);text-wrap:pretty`)}>
            A private space that builds awareness, ownership and action for every employee. Collective signals give leaders visibility, then guide them on what to do next.
          </p>
          <p style={s(`margin:14px 0 0;max-width:520px;font:400 18px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.78);text-wrap:pretty`)}>Closing the loop between individual wellbeing and workplace action.</p>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:36px`)}>
            <a href="#demo" style={s(`display:inline-flex;align-items:center;padding:15px 26px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:600 15px 'DM Sans',sans-serif;color:#152213;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 10px 30px rgba(217,234,110,.28);transition:all .2s ease`)} className="hro-ho65fd62">Book a demo</a>
            <a href="#rhythm" style={s(`display:inline-flex;align-items:center;gap:8px;padding:15px 22px;border-radius:999px;border:1px solid rgba(228,240,214,.16);font:500 15px 'DM Sans',sans-serif;color:#F4F2E6;transition:all .2s ease`)} className="hro-hobddb24">
              See how it works
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(244,242,230,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 L15 12 L9 18"></path></svg>
            </a>
          </div>
        </div>
        <div data-r="herowrap" style={s(`flex:none;width:700px;max-width:100%;display:flex;justify-content:center`)}>
          <div data-r="heroart" style={s(`position:relative;width:700px;flex:none;height:620px`)}>
            <div id="hero-dashboard" style={s(`position:absolute;left:0;top:28px;width:600px;border-radius:18px;border:1px solid rgba(228,240,214,.12);background:linear-gradient(165deg,#0F1C13 0%,#0A140D 55%,#070D09 100%);box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden`)}>
              <div style={s(`display:flex;align-items:center;height:34px;padding:0 14px;box-sizing:border-box;border-bottom:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.5)`)}>
                <div style={s(`display:flex;gap:6px`)}>
                  <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                  <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                  <span style={s(`width:8px;height:8px;border-radius:999px;background:rgba(244,242,230,.16)`)}></span>
                </div>
                <span style={s(`margin:0 auto;padding:3px 12px;border-radius:999px;background:rgba(228,240,214,.05);font:400 10px 'DM Mono',monospace;color:rgba(201,212,194,.72)`)}>app.joinnorma.com/dashboard</span>
                <span style={s(`width:34px`)}></span>
              </div>
              <div style={s(`display:flex`)}>
                <aside style={s(`flex:none;width:118px;padding:16px 8px 14px;box-sizing:border-box;display:flex;flex-direction:column;border-right:1px solid rgba(228,240,214,.07);background:rgba(4,8,5,.4)`)}>
                  <div style={s(`display:flex;align-items:center;gap:6px;padding:0 6px`)}>
                    <span style={s(`width:8px;height:8px;background:#D9EA6E;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)`)}></span>
                    <span style={s(`font:italic 400 15px 'DM Serif Display',serif;color:#F6F4E9`)}>nørma</span>
                  </div>
                  <div style={s(`margin-top:20px;padding:0 7px;font:600 7px 'DM Sans',sans-serif;letter-spacing:1.6px;color:rgba(201,212,194,.5)`)}>SIGNAL</div>
                  <div style={s(`margin-top:5px;display:flex;flex-direction:column;gap:1px;font:400 10.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.68)`)}>
                    <span style={s(`padding:6px 7px;border-radius:8px;background:rgba(217,234,110,.1);font-weight:500;color:#EAF79B`)}>Dashboard</span>
                    <span style={s(`padding:6px 7px`)}>Departments</span>
                    <span style={s(`padding:6px 7px`)}>Check-ins</span>
                    <span style={s(`padding:6px 7px`)}>Themes</span>
                  </div>
                  <div style={s(`margin-top:14px;padding:0 7px;font:600 7px 'DM Sans',sans-serif;letter-spacing:1.6px;color:rgba(201,212,194,.5)`)}>ACT</div>
                  <div style={s(`margin-top:5px;display:flex;flex-direction:column;gap:1px;font:400 10.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.68)`)}>
                    <span style={s(`padding:6px 7px`)}>Growth work</span>
                    <span style={s(`padding:6px 7px`)}>Playbooks</span>
                  </div>
                  <div style={s(`margin-top:auto;padding:10px 6px 0;border-top:1px solid rgba(228,240,214,.07);display:flex;align-items:center;gap:7px`)}>
                    <span style={s(`width:20px;height:20px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.1);display:flex;align-items:center;justify-content:center;font:500 8px 'DM Sans',sans-serif;color:#F4F2E6`)}>MR</span>
                    <span style={s(`font:500 10px 'DM Sans',sans-serif;color:#F4F2E6`)}>Mara</span>
                  </div>
                </aside>
                <div style={s(`flex:1;min-width:0;padding:18px 106px 18px 16px;display:flex;flex-direction:column;gap:14px`)}>
                  <div style={s(`display:flex;align-items:baseline;justify-content:space-between;gap:10px`)}>
                    <span style={s(`font:400 20px/1.1 'DM Serif Display',serif;color:#F6F4E9;white-space:nowrap`)}>
                      Northwind{' '}
                      <span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>▾</span>
                    </span>
                    <span style={s(`display:inline-flex;align-items:center;gap:6px;font:400 10.5px 'DM Sans',sans-serif;color:#EAF79B`)}>
                      <span style={s(`width:6px;height:6px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 0 3px rgba(217,234,110,.2)`)}></span>
                      October signal
                    </span>
                  </div>
                  <div style={s(`display:grid;grid-template-columns:1fr 1fr;gap:10px`)}>
                    <div style={s(`padding:12px 14px;border-radius:24px 16px 22px 14px / 16px 24px 14px 22px;background:rgba(228,240,214,.07)`)}>
                      <div style={s(`font:500 11px 'DM Sans',sans-serif;color:#F4F2E6`)}>Fulfilment</div>
                      <div style={s(`display:flex;align-items:baseline;gap:8px;margin-top:6px`)}>
                        <span style={s(`font:400 34px/1 'DM Serif Display',serif;color:#F6F4E9`)}>59</span>
                        <span style={s(`font:500 10px 'DM Mono',monospace;color:#EFB39B`)}>↓ 2</span>
                        <span style={s(`margin-left:auto;padding:3px 8px;border-radius:14px 10px 12px 8px / 10px 14px 8px 12px;background:rgba(228,240,214,.12);font:500 9.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>Steady</span>
                      </div>
                      <svg viewBox="0 0 100 18" width="100%" height="18" preserveAspectRatio="none" style={s(`display:block;margin-top:8px`)}><polyline fill="none" stroke="#D9EA6E" strokeWidth="1.6" points="0,8 20,6 40,6 60,8 80,8 100,13"></polyline></svg>
                    </div>
                    <div style={s(`padding:12px 14px;border-radius:16px 24px 14px 22px / 24px 16px 22px 14px;background:rgba(228,240,214,.07)`)}>
                      <div style={s(`font:500 11px 'DM Sans',sans-serif;color:#F4F2E6`)}>Culture</div>
                      <div style={s(`display:flex;align-items:baseline;gap:8px;margin-top:6px`)}>
                        <span style={s(`font:400 34px/1 'DM Serif Display',serif;color:#F6F4E9`)}>69</span>
                        <span style={s(`font:500 10px 'DM Mono',monospace;color:rgba(201,212,194,.6)`)}>· 0</span>
                        <span style={s(`margin-left:auto;padding:3px 8px;border-radius:10px 14px 8px 12px / 14px 10px 12px 8px;background:rgba(228,240,214,.12);font:500 9.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>Steady</span>
                      </div>
                      <svg viewBox="0 0 100 18" width="100%" height="18" preserveAspectRatio="none" style={s(`display:block;margin-top:8px`)}><polyline fill="none" stroke="#D9EA6E" strokeWidth="1.6" points="0,10 20,8 40,6 60,8 80,8 100,8"></polyline></svg>
                    </div>
                  </div>
                  <div style={s(`display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:18px 12px 20px 10px / 12px 20px 10px 18px;border:1px solid rgba(228,240,214,.1)`)}>
                    <span style={s(`flex:none;width:7px;height:7px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71`)}></span>
                    <span style={s(`font:400 11px/1.4 'DM Sans',sans-serif;color:rgba(244,242,230,.86)`)}>
                      <span style={s(`font:400 13px 'DM Serif Display',serif;color:#F6F4E9;margin-right:4px`)}>Operations</span>
                      Fulfilment 52, down 6. Culture is holding.
                    </span>
                    <span style={s(`margin-left:auto;flex:none;padding:6px 10px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:500 10px 'DM Sans',sans-serif;color:#14231A`)}>Open ›</span>
                  </div>
                  <div style={s(`display:flex;flex-direction:column;gap:3px`)}>
                    <div style={s(`display:grid;grid-template-columns:1fr 64px 64px;gap:6px;padding:0 6px 2px;font:600 8px 'DM Sans',sans-serif;letter-spacing:1.6px;color:rgba(201,212,194,.62);text-align:center`)}>
                      <span style={s(`text-align:left`)}></span>
                      <span>FULFILMENT</span>
                      <span>CULTURE</span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:1fr 64px 64px;gap:6px;align-items:center;padding:0 6px`)}>
                      <span style={s(`font:400 13px 'DM Serif Display',serif;color:#F6F4E9`)}>Engineering</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(228,240,214,.12);font:400 15px 'DM Serif Display',serif;color:#F4F2E6`)}>62</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(228,240,214,.12);font:400 15px 'DM Serif Display',serif;color:#F4F2E6`)}>67</span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:1fr 64px 64px;gap:6px;align-items:center;padding:0 6px`)}>
                      <span style={s(`display:flex;align-items:center;gap:7px;font:400 13px 'DM Serif Display',serif;color:#F6F4E9`)}>
                        <span style={s(`width:7px;height:7px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:#E78E71`)}></span>
                        Operations
                      </span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;gap:3px;border-radius:9px;background:rgba(230,199,126,.4);font:400 15px 'DM Serif Display',serif;color:#F8E9C9`)}>
                        52
                        <span style={s(`font:400 9px 'DM Sans',sans-serif;opacity:.7`)}>↓</span>
                      </span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(217,234,110,.42);font:400 15px 'DM Serif Display',serif;color:#F2FBB8`)}>70</span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:1fr 64px 64px;gap:6px;align-items:center;padding:0 6px`)}>
                      <span style={s(`font:400 13px 'DM Serif Display',serif;color:#F6F4E9`)}>Customer Success</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(228,240,214,.12);font:400 15px 'DM Serif Display',serif;color:#F4F2E6`)}>63</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(228,240,214,.12);font:400 15px 'DM Serif Display',serif;color:#F4F2E6`)}>66</span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:1fr 64px 64px;gap:6px;align-items:center;padding:0 6px`)}>
                      <span style={s(`font:400 13px 'DM Serif Display',serif;color:#F6F4E9`)}>Product</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(228,240,214,.12);font:400 15px 'DM Serif Display',serif;color:#F4F2E6`)}>66</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(217,234,110,.42);font:400 15px 'DM Serif Display',serif;color:#F2FBB8`)}>73</span>
                    </div>
                    <div style={s(`display:grid;grid-template-columns:1fr 64px 64px;gap:6px;align-items:center;padding:0 6px`)}>
                      <span style={s(`font:400 13px 'DM Serif Display',serif;color:#F6F4E9`)}>Design</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(228,240,214,.12);font:400 15px 'DM Serif Display',serif;color:#F4F2E6`)}>69</span>
                      <span style={s(`height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(217,234,110,.42);font:400 15px 'DM Serif Display',serif;color:#F2FBB8`)}>77</span>
                    </div>
                  </div>
                  <div style={s(`font:400 9.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>Groups under five people are never shown.</div>
                </div>
              </div>
            </div>
            <span style={s(`position:absolute;left:0;top:0;font:600 9px 'DM Sans',sans-serif;letter-spacing:2px;color:#D9EA6E`)}>WHAT YOU SEE · AGGREGATED</span>
            <div id="hero-phone" style={s(`position:absolute;right:-22px;top:112px;width:290px;height:600px;transform:scale(.76);transform-origin:top right`)}><Phone screen="home" /></div>
            <span style={s(`position:absolute;right:-22px;top:582px;width:220px;text-align:center;font:600 9px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.8)`)}>WHAT YOUR PEOPLE SEE · PRIVATE</span>
            <div style={s(`position:absolute;right:-94px;top:262px;width:68px;display:flex;flex-direction:column;align-items:flex-start;gap:6px;pointer-events:none`)}></div>
          </div>
        </div>
      </div>
    </div>
      </>
    );
  }
}
