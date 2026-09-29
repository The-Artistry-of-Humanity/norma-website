import { useState } from 'react';
import { s } from '../lib/s';
import { LOOP, pt } from '../data/site';

const HEPT = 'M115.5,24.7 L153.4,53.7 Q173.9,69.4 166.4,93.9 L152.5,139.3 Q145,163.8 119.2,163.6 L71.4,163.2 Q45.6,163 38.2,138.7 L24.4,94 Q17,69.7 37.3,53.9 L74.7,24.9 Q95,9 115.5,24.7 Z';

export default function Loop() {
  const [loop, setLoop] = useState(3);
  const li = loop, endDeg = li * 45, R = 140;
  const [ex, ey] = pt(endDeg === 0 ? .01 : endDeg, R);
  const arc = 'M200,60 A140,140 0 ' + (endDeg > 180 ? 1 : 0) + ',1 ' + ex.toFixed(1) + ',' + ey.toFixed(1);
  const sel = LOOP[li];
  const n = String(li + 1).padStart(2, '0');

  return (
    <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:40px;align-items:center;margin-top:44px')}>
      <div style={s('display:flex;justify-content:center')}>
        <div style={s('position:relative;width:400px;max-width:100%;aspect-ratio:1')}>
          <svg viewBox="0 0 400 400" style={s('position:absolute;inset:0;width:100%;height:100%')} aria-hidden="true">
            <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(228,240,214,.12)" strokeWidth="1" strokeDasharray="3 5" />
            <path d={arc} fill="none" stroke="#D9EA6E" strokeWidth="2.5" strokeLinecap="round" style={s('filter:drop-shadow(0 0 8px rgba(217,234,110,.5));transition:all .4s ease')} />
            <path d={HEPT} fill="rgba(217,234,110,.06)" stroke="#D9EA6E" strokeWidth="1.4" vectorEffect="non-scaling-stroke" transform="translate(200 200) scale(0.5) translate(-95 -95)" />
            <text x="200" y="196" textAnchor="middle" style={s(`font:400 24px 'DM Serif Display',serif;fill:#F6F4E9`)}>Monthly</text>
            <text x="200" y="216" textAnchor="middle" style={s(`font:500 10px 'DM Mono',monospace;letter-spacing:1.4px;fill:rgba(201,212,194,.78)`)}>TEAM BY TEAM</text>
          </svg>
          {LOOP.map((nd, i) => {
            const [x, y] = pt(i * 45, R);
            const on = i === li, done = i < li;
            return (
              <button key={nd.label} onClick={() => setLoop(i)} className="hv-chip" style={{ ...s(`position:absolute;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:999px;cursor:pointer;font:600 10.5px 'DM Sans',sans-serif;letter-spacing:1.4px;transition:all .3s ease;white-space:nowrap`), left: (x / 4).toFixed(2) + '%', top: (y / 4).toFixed(2) + '%', background: on ? 'rgba(217,234,110,.16)' : 'rgba(13,24,17,.95)', border: `1px solid ${on ? 'rgba(217,234,110,.7)' : done ? 'rgba(217,234,110,.35)' : 'rgba(228,240,214,.16)'}`, color: on ? '#EAF79B' : 'rgba(244,242,230,.85)' }}>
                <span style={{ ...s('width:7px;height:7px;border-radius:999px'), background: on || done ? '#D9EA6E' : 'rgba(228,240,214,.3)' }}></span>{nd.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={s('padding:34px 36px;border-radius:26px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09);min-height:300px;box-sizing:border-box')}>
        <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>{n} · {sel.label}</span>
        <h3 style={s(`margin:14px 0 0;font:400 32px/1.12 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>{sel.title}</h3>
        <p style={s(`margin:14px 0 0;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.78);text-wrap:pretty`)}>{sel.body}</p>
        <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(228,240,214,.08)')}>
          <div><span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>THE EMPLOYEE</span><p style={s(`margin:6px 0 0;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{sel.emp}</p></div>
          <div><span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>THE LEADER</span><p style={s(`margin:6px 0 0;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{sel.lead}</p></div>
        </div>
      </div>
    </div>
  );
}
