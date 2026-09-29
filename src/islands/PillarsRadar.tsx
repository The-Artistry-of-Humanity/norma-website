import { useState } from 'react';
import { s } from '../lib/s';
import { PILLARS, ANGLES, poly } from '../data/site';

const SAMPLE = [67, 50, 75, 67, 59];

const VERT_POS = [
  { left: '50%', top: '8%' },
  { left: '90%', top: '37%' },
  { left: '74%', top: '86%' },
  { left: '26%', top: '86%' },
  { left: '10%', top: '37%' },
];

const VERT_ICONS = [
  <path key="i" d="M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21" />,
  <path key="i" d="M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z" />,
  <path key="i" d="M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z" />,
  <g key="i"><circle cx="9" cy="8.5" r="3.2" /><circle cx="16.8" cy="10.3" r="2.6" /><path d="M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4" /><path d="M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4" /></g>,
  <g key="i"><path d="M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9" /><path d="M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15" /></g>,
];

const VERT_LABELS = ['Health', 'Internal', 'Love', 'Social', 'Flow'];

const HEPT = 'M115.5,24.7 L153.4,53.7 Q173.9,69.4 166.4,93.9 L152.5,139.3 Q145,163.8 119.2,163.6 L71.4,163.2 Q45.6,163 38.2,138.7 L24.4,94 Q17,69.7 37.3,53.9 L74.7,24.9 Q95,9 115.5,24.7 Z';

export default function PillarsRadar() {
  const [pillar, setPillar] = useState(4);
  const p = PILLARS[pillar];
  const index = String(pillar + 1).padStart(2, '0');
  const points = poly(SAMPLE, 200, 200, 150);
  const sx = (200 + 150 * SAMPLE[pillar] / 100 * Math.cos(ANGLES[pillar])).toFixed(1);
  const sy = (200 + 150 * SAMPLE[pillar] / 100 * Math.sin(ANGLES[pillar])).toFixed(1);

  return (
    <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:40px;align-items:center;margin-top:40px')}>
      <div style={s('position:relative;width:100%;max-width:520px;aspect-ratio:1;margin:0 auto')}>
        <div style={s('position:absolute;inset:8%;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.12),rgba(0,0,0,0) 72%);animation:nrmBreathe 6s ease-in-out infinite;pointer-events:none')}></div>
        <svg viewBox="0 0 400 400" style={s('position:absolute;inset:0;width:100%;height:100%')} aria-hidden="true">
          <path d={HEPT} fill="none" stroke="rgba(228,240,214,.12)" vectorEffect="non-scaling-stroke" transform="translate(200 200) scale(1.74) translate(-95 -95)" />
          <path d={HEPT} fill="none" stroke="rgba(228,240,214,.10)" vectorEffect="non-scaling-stroke" transform="translate(200 200) scale(1.16) translate(-95 -95)" />
          <path d={HEPT} fill="none" stroke="rgba(228,240,214,.08)" vectorEffect="non-scaling-stroke" transform="translate(200 200) scale(.58) translate(-95 -95)" />
          <path d="M200,200 L200,50 M200,200 L342.7,153.6 M200,200 L288.2,321.4 M200,200 L111.8,321.4 M200,200 L57.3,153.6" stroke="rgba(228,240,214,.08)" strokeWidth="1" />
          <polygon points={points} fill="rgba(217,234,110,.14)" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" style={s('filter:drop-shadow(0 0 12px rgba(217,234,110,.35))')} />
          <circle cx={sx} cy={sy} r="7" fill="#0D1811" stroke="#EAF79B" strokeWidth="2" style={s('transition:all .5s ease')} />
        </svg>
        {PILLARS.map((_, i) => {
          const on = i === pillar;
          const bg = on ? 'rgba(217,234,110,.16)' : 'rgba(13,24,17,.92)';
          const bc = on ? 'rgba(217,234,110,.65)' : 'rgba(228,240,214,.16)';
          const color = on ? '#EAF79B' : 'rgba(244,242,230,.85)';
          return (
            <button key={i} onClick={() => setPillar(i)} className="hv-chip" style={{ ...s(`position:absolute;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;cursor:pointer;font:500 13px 'DM Sans',sans-serif;transition:all .3s ease`), left: VERT_POS[i].left, top: VERT_POS[i].top, background: bg, border: `1px solid ${bc}`, color }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{VERT_ICONS[i]}</svg>
              {VERT_LABELS[i]}
            </button>
          );
        })}
      </div>
      <div style={s('padding:36px 38px;border-radius:26px;background:rgba(6,11,7,.5);border:1px solid rgba(228,240,214,.10);box-shadow:0 30px 70px rgba(0,0,0,.4)')}>
        <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>PILLAR {index} OF 05</span>
        <h3 style={s(`margin:12px 0 0;font:400 34px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>{p.name}</h3>
        <p style={s(`margin:14px 0 0;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.85);text-wrap:pretty`)}>{p.line}</p>
        <div style={s('display:flex;flex-wrap:wrap;gap:8px;margin-top:20px')}>
          {p.themes.map(th => (
            <span key={th} style={s(`padding:7px 12px;border-radius:999px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.12);font:500 12px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{th}</span>
          ))}
        </div>
        <p style={s(`margin:22px 0 0;padding-top:18px;border-top:1px solid rgba(228,240,214,.08);font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}><strong style={s('font-weight:600;color:#F6F4E9')}>For the organisation:</strong> {p.org}</p>
      </div>
    </div>
  );
}
