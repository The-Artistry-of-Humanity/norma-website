import { useState } from 'react';
import { s } from '../lib/s';
import { PILLARS, ORG, DEPTS, cells, poly } from '../data/site';

const cellStyle = (bg: string, fg: string) => ({ ...s(`margin:6px 3px;padding:9px 0;border-radius:8px;text-align:center;font:500 13px 'DM Mono',monospace`), background: bg, color: fg });
const rowGrid = 'display:grid;grid-template-columns:minmax(170px,1.8fr) repeat(5,minmax(56px,1fr)) 14px repeat(3,minmax(56px,1fr)) 30px';

export default function Leaders() {
  const [drill, setDrill] = useState(0);
  const [dept, setDept] = useState(4);

  const D = DEPTS[dept];
  const isOrg = drill === 0;
  const L = isOrg ? ORG : (D as typeof ORG & typeof D);
  const minV = Math.min(...(L.pillars as number[]));
  const bars = (L.pillars as number[]).map((v, i) => ({ name: PILLARS[i].short, v, pct: v, fill: v === minV ? 'linear-gradient(90deg,#C9A45F,#E6C77E)' : 'rgba(244,242,230,.32)', color: v === minV ? '#EFDCAE' : 'rgba(244,242,230,.85)' }));
  const cul = L.cul as number, safe = L.safe as number;
  const ringColor = cul >= 60 ? '#6EC585' : cul >= 50 ? '#E6C77E' : '#E78E71';
  const culColor = cul >= 60 ? '#F6F4E9' : cul >= 50 ? '#EFDCAE' : '#F0C9AE';
  const safeColor = safe < 50 ? '#EFB39B' : 'rgba(244,242,230,.85)';
  const safeFill = safe < 50 ? 'linear-gradient(90deg,#C97C5F,#E78E71)' : 'rgba(244,242,230,.32)';
  const dash = (cul / 100 * 389.6).toFixed(1);
  const points = poly(L.pillars as number[], 75, 75, 50);
  const rows = isOrg
    ? DEPTS.map((d, i) => ({ name: d.name, people: d.people, withheld: !!d.withheld, click: !d.withheld, pick: () => { setDrill(1); setDept(i); }, pillars: d.pillars, c: d.withheld ? undefined : [d.heard!, d.valued!, d.safe!] }))
    : (D.teams || []).map(t => ({ name: t.name, people: t.people, withheld: !!t.withheld, click: false, pick: undefined as undefined | (() => void), pillars: t.pillars, c: t.c }));
  const heatTitle = isOrg ? 'DEPARTMENTS · CLICK ONE TO OPEN IT' : 'TEAMS IN ' + D.name.toUpperCase();
  const heatCol = isOrg ? 'DEPARTMENT' : 'TEAM';
  const levels = ['Organisation', D.crumb];

  const barRow = (label: string, v: number, fill: string, color?: string) => (
    <div key={label} style={{ ...s('display:flex;align-items:center;gap:10px'), ...(color ? { color } : {}) }}><span style={s('width:52px')}>{label}</span><div style={s('flex:1;height:5px;border-radius:3px;background:rgba(244,242,230,.07)')}><div style={{ ...s('height:100%;border-radius:3px;transition:width .5s ease'), width: v + '%', background: fill }}></div></div><span style={s('width:20px;text-align:right;font-weight:600')}>{v}</span></div>
  );

  return (
    <div style={s('margin-top:40px;border-radius:22px;border:1px solid rgba(228,240,214,.12);background:linear-gradient(165deg,#122416 0%,#0D1811 52%,#0A120C 100%);box-shadow:0 40px 90px rgba(0,0,0,.45);overflow:hidden')}>
      <div style={s('display:flex;align-items:center;height:42px;padding:0 16px;box-sizing:border-box;border-bottom:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.5)')}>
        <div style={s('display:flex;gap:7px')}><span style={s('width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)')}></span><span style={s('width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)')}></span><span style={s('width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)')}></span></div>
        <span style={s(`margin:0 auto;padding:4px 14px;border-radius:999px;background:rgba(228,240,214,.05);font:400 11px 'DM Mono',monospace;color:rgba(201,212,194,.72)`)}>app.joinnorma.com/signal</span>
        <span style={s('width:44px')}></span>
      </div>
      <div style={s('padding:26px 32px 32px')}>
        <div style={s('display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px')}>
          <div style={s('display:flex;align-items:center;gap:6px;flex-wrap:wrap')}>
            {levels.map((name, i) => {
              const on = i === drill;
              return <button key={name} onClick={() => setDrill(i)} className="hv-chip" style={{ ...s(`display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;cursor:pointer;font:500 13px 'DM Sans',sans-serif;transition:all .3s ease`), background: on ? 'rgba(217,234,110,.12)' : 'transparent', border: `1px solid ${on ? 'rgba(217,234,110,.4)' : 'rgba(228,240,214,.1)'}`, color: on ? '#EAF79B' : 'rgba(244,242,230,.8)' }}>{name}</button>;
            })}
          </div>
          <span style={s(`display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:999px;background:rgba(228,240,214,.05);border:1px solid rgba(228,240,214,.11);font:500 11.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>Sample data · September 2026</span>
        </div>
        <div style={s('display:flex;flex-wrap:wrap;align-items:baseline;gap:14px;margin-top:22px')}>
          <span style={s(`font:400 32px/1 'DM Serif Display',serif;color:#F6F4E9`)}>{L.name}</span>
          <span style={s(`font:400 13px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>{L.people} · your level and everything beneath it</span>
        </div>
        <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:14px;margin-top:20px')}>
          <div style={s('padding:22px 24px;border-radius:18px;background:rgba(217,234,110,.06);border:1px solid rgba(217,234,110,.22)')}>
            <div style={s('display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px 10px;min-height:22px')}><span style={s(`font:600 9px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>FULFILMENT · HOW PEOPLE ARE</span><span style={s(`font:500 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>{L.part}% took part</span></div>
            <div style={s('display:flex;align-items:center;justify-content:space-between;gap:16px;height:84px;margin-top:14px')}>
              <div><div style={s('display:flex;align-items:baseline;gap:10px')}><span style={s(`font:400 54px/1 'DM Serif Display',serif;color:#F6F4E9`)}>{L.ful}</span><span style={s(`padding:4px 9px;border-radius:999px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.14);font:500 10.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{L.fulD}</span></div><div style={s(`margin-top:8px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Average of personal scores. Never a person&rsquo;s.</div></div>
            </div>
            <div style={s(`display:flex;flex-direction:column;gap:9px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(228,240,214,.08);font:400 12px 'DM Sans',sans-serif`)}>
              {bars.map(b => barRow(b.name, b.v, b.fill, b.color))}
            </div>
          </div>
          <div style={s('padding:22px 24px;border-radius:18px;background:rgba(217,234,110,.06);border:1px solid rgba(217,234,110,.22)')}>
            <div style={s('display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px 10px;min-height:22px')}><span style={s(`font:600 9px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>CULTURE · WILL THEY TELL YOU</span><span style={s(`font:500 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>3 questions a month</span></div>
            <div style={s('display:flex;align-items:center;justify-content:space-between;gap:16px;height:84px;margin-top:14px')}>
              <div><div style={s('display:flex;align-items:baseline;gap:10px')}><span style={{ ...s(`font:400 54px/1 'DM Serif Display',serif`), color: culColor }}>{cul}</span><span style={s(`padding:4px 9px;border-radius:999px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.14);font:500 10.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{L.culD}</span></div><div style={s(`margin-top:8px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>The ring around the pillars.</div></div>
              <svg width="84" height="84" viewBox="0 0 150 150" style={s('flex:none')} aria-hidden="true">
                <circle cx="75" cy="75" r="62" fill="none" stroke="rgba(228,240,214,.08)" strokeWidth="6" />
                <circle cx="75" cy="75" r="62" fill="none" stroke={ringColor} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} 389.6`} transform="rotate(-90 75 75)" opacity=".9" style={s('transition:all .5s ease')} />
                <polygon points={points} fill="rgba(217,234,110,.14)" stroke="#D9EA6E" strokeWidth="2" strokeLinejoin="round" style={s('transition:all .5s ease')} />
              </svg>
            </div>
            <div style={s(`display:flex;flex-direction:column;gap:9px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(228,240,214,.08);font:400 12px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
              {barRow('Heard', L.heard as number, 'rgba(244,242,230,.32)')}
              {barRow('Valued', L.valued as number, 'rgba(244,242,230,.32)')}
              {barRow('Safe', safe, safeFill, safeColor)}
            </div>
          </div>
        </div>
        <div data-r="lbody" style={s('display:flex;flex-direction:column;gap:14px;margin-top:14px;min-height:560px')}>
          {!isOrg && (
            <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:14px')}>
              <div style={s('display:flex;align-items:center;gap:16px;padding:18px 22px;border-radius:18px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.10)')}>
                <svg width="30" height="30" viewBox="0 0 44 44" fill="none" style={s('flex:none')} aria-hidden="true"><path d="M26.5,8.8 L33.7,14 Q38.2,17.25 36.5,22.6 L33.7,30.9 Q32,36.25 26.4,36.25 L17.6,36.25 Q12,36.25 10.3,30.9 L7.5,22.6 Q5.8,17.25 10.3,14 L17.5,8.8 Q22,5.5 26.5,8.8 Z" fill="rgba(217,234,110,.08)" stroke="#D9EA6E" strokeWidth="1.3" /></svg>
                <div><span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>WHAT NØRMA NOTICED</span><p style={s(`margin:6px 0 0;font:400 15.5px/1.4 'DM Serif Display',serif;color:#F4F2E6;text-wrap:pretty`)}>{D.insight}</p></div>
              </div>
              <div style={s('padding:18px 22px;border-radius:18px;background:linear-gradient(120deg,rgba(217,234,110,.12),rgba(217,234,110,.04) 60%);border:1px solid rgba(217,234,110,.35)')}>
                <div style={s('display:flex;align-items:center;justify-content:space-between')}><span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>FROM THE LIBRARY · DO THIS NEXT</span><span style={s(`font:500 10.5px 'DM Mono',monospace;color:rgba(201,212,194,.78)`)}>{D.actionMeta}</span></div>
                <div style={s('display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:8px')}>
                  <div><div style={s(`font:400 20px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>{D.action}</div><div style={s(`margin-top:4px;font:400 12.5px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>{D.actionWhy}</div></div>
                  <span style={s(`flex:none;display:inline-flex;align-items:center;padding:10px 16px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 12.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)`)}>Run it</span>
                </div>
              </div>
            </div>
          )}
          <div style={s('flex:1;padding-top:18px;border-radius:18px;background:rgba(228,240,214,.035);border:1px solid rgba(228,240,214,.10);overflow:hidden')}>
            <div style={s('display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 18px;padding:0 20px 16px')}>
              <span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>{heatTitle}</span>
              <div style={s(`display:flex;flex-wrap:wrap;gap:6px 14px;font:400 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>
                <span style={s('display:flex;align-items:center;gap:6px')}><span style={s('width:10px;height:10px;border-radius:3px;background:rgba(217,234,110,.22);border:1px solid rgba(217,234,110,.5)')}></span>Thriving 70+</span>
                <span style={s('display:flex;align-items:center;gap:6px')}><span style={s('width:10px;height:10px;border-radius:3px;background:transparent;border:1px solid rgba(244,242,230,.3)')}></span>Steady 55–69</span>
                <span style={s('display:flex;align-items:center;gap:6px')}><span style={s('width:10px;height:10px;border-radius:3px;background:rgba(230,199,126,.22);border:1px solid rgba(230,199,126,.5)')}></span>Needs care 46–54</span>
                <span style={s('display:flex;align-items:center;gap:6px')}><span style={s('width:10px;height:10px;border-radius:3px;background:rgba(231,142,113,.22);border:1px solid rgba(231,142,113,.5)')}></span>Attention 45 and under</span>
              </div>
            </div>
            <div style={s('overflow-x:auto')}>
              <div style={s('min-width:760px')}>
                <div style={s(rowGrid + `;align-items:end;padding:0 12px 10px 20px;font:600 9px 'DM Sans',sans-serif;letter-spacing:1.6px;color:rgba(201,212,194,.72);text-align:center`)}>
                  <span style={s('text-align:left')}>{heatCol}</span><span>HEALTH</span><span>INTERNAL</span><span>LOVE</span><span>SOCIAL</span><span>FLOW</span><span></span><span>HEARD</span><span>VALUED</span><span>SAFE</span><span></span>
                </div>
                {rows.map((h) => {
                  if (h.withheld) {
                    return (
                      <div key={h.name} style={s('display:grid;grid-template-columns:minmax(170px,1.8fr) 1fr;align-items:center;padding:0 12px 0 20px;border-top:1px solid rgba(228,240,214,.06)')}>
                        <span style={s('display:flex;flex-direction:column;gap:2px;padding:10px 0')}><span style={s(`font:400 16px/1.2 'DM Serif Display',serif;color:rgba(244,242,230,.6)`)}>{h.name}</span><span style={s(`font:400 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>{h.people}</span></span>
                        <span style={s(`font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>Fewer than five people. Nothing is shown.</span>
                      </div>
                    );
                  }
                  const p = cells(h.pillars as number[]);
                  const c = cells(h.c as number[]);
                  const inner = (
                    <>
                      <span style={s('display:flex;flex-direction:column;gap:2px;padding:10px 0')}><span style={s(`font:400 16px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>{h.name}</span><span style={s(`font:400 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>{h.people}</span></span>
                      {p.map((cell, i) => <span key={'p' + i} style={cellStyle(cell.bg, cell.fg)}>{cell.v}</span>)}
                      <span></span>
                      {c.map((cell, i) => <span key={'c' + i} style={cellStyle(cell.bg, cell.fg)}>{cell.v}</span>)}
                    </>
                  );
                  return h.click ? (
                    <button key={h.name} onClick={h.pick} className="hv-row" style={s(rowGrid + ';align-items:center;width:100%;padding:0 12px 0 20px;box-sizing:border-box;border:0;border-top:1px solid rgba(228,240,214,.06);background:transparent;cursor:pointer;text-align:left;transition:background .2s ease')}>
                      {inner}
                      <span style={s(`text-align:right;font:400 16px 'DM Sans',sans-serif;color:rgba(217,234,110,.7)`)}>›</span>
                    </button>
                  ) : (
                    <div key={h.name} className="hv-row2" style={s(rowGrid + ';align-items:center;padding:0 12px 0 20px;border-top:1px solid rgba(228,240,214,.06);transition:background .2s ease')}>
                      {inner}
                      <span></span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
