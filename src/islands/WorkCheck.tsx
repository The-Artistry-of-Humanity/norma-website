import { useState } from 'react';
import { s } from '../lib/s';
import { HAZARDS, SITES } from '../data/site';

const RAG: Record<string, [string, string, string, string, string]> = {
  red: ['#E78E71', 'rgba(231,142,113,.10)', 'rgba(231,142,113,.4)', '#F0B8A2', 'Red'],
  amber: ['#E6C77E', 'rgba(230,199,126,.07)', 'rgba(230,199,126,.28)', '#EFDCAE', 'Amber'],
  green: ['#6EC585', 'rgba(228,240,214,.035)', 'rgba(228,240,214,.10)', '#F4F2E6', 'Green'],
};
const rag = (i: number, v: number) => { const [a, b] = HAZARDS[i].yn ? [5, 10] : [15, 30]; return v >= b ? 'red' : v >= a ? 'amber' : 'green'; };
const fmtD = (d: number) => d > 0 ? '↑ ' + d : d < 0 ? '↓ ' + (-d) : '→ 0';

export default function WorkCheck() {
  const [site, setSite] = useState(1);
  const [hazard, setHazard] = useState(0);

  const S = SITES[site];
  const hz = HAZARDS[hazard], hv = S.v[hazard], hk = rag(hazard, hv), hc2 = RAG[hk];
  const lot = Math.round(28 + hv * .4), quite = Math.round(36 - hv * .1), little = 100 - lot - quite;
  const falling = S.fulD < 0;
  const harm = hk === 'red' && falling;
  const status = hk === 'red' && falling ? 'Red · harm' : hc2[4];
  const cadence = hz.monthly ? 'FROM THE MONTHLY CHECK-IN' : hz.yn ? 'WORK CHECK · YES OR NO' : 'WORK CHECK · HOW OFTEN';
  const respLabel = hk === 'red' ? 'RESPONSE · REQUIRED FOR EVERY RED' : hk === 'amber' ? 'SUGGESTED PLAYBOOK' : 'NO ACTION NEEDED';
  const control = hk === 'green' ? 'Holding. Watch next quarter.' : hz.control;
  const owner = hk === 'green' ? 'No owner' : 'Owner · ' + hz.owner;
  const due = hk === 'red' ? 'Due 14 Nov · review Q4' : hk === 'amber' ? 'Optional · review Q4' : 'Review Q4';
  const harmText = harm ? 'Fulfilment ' + fmtD(S.fulD) + ' this quarter. Harm, not just a busy quarter: flagged first.' : 'Fulfilment ' + fmtD(S.fulD) + ' this quarter. People are coping; keep watching.';

  return (
    <div style={s('margin-top:32px;border-radius:22px;border:1px solid rgba(228,240,214,.12);background:linear-gradient(165deg,#122416 0%,#0D1811 52%,#0A120C 100%);box-shadow:0 40px 90px rgba(0,0,0,.45);overflow:hidden')}>
      <div style={s('display:flex;align-items:center;height:42px;padding:0 16px;box-sizing:border-box;border-bottom:1px solid rgba(228,240,214,.07);background:rgba(7,13,8,.5)')}>
        <div style={s('display:flex;gap:7px')}><span style={s('width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)')}></span><span style={s('width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)')}></span><span style={s('width:10px;height:10px;border-radius:999px;background:rgba(244,242,230,.16)')}></span></div>
        <span style={s(`margin:0 auto;padding:4px 14px;border-radius:999px;background:rgba(228,240,214,.05);font:400 11px 'DM Mono',monospace;color:rgba(201,212,194,.72)`)}>app.joinnorma.com/work-check</span>
        <span style={s('width:44px')}></span>
      </div>
      <div style={s('padding:24px 28px 28px')}>
        <div style={s('display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px')}>
          <div><div style={s(`font:400 26px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Work Check · Q3 2026</div><div style={s(`margin-top:4px;font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Halden Resources · sample data · {S.people.toLocaleString('en-AU')} people · share affected often or always</div></div>
          <div style={s('display:flex;flex-wrap:wrap;gap:6px')}>
            {SITES.map((st, i) => {
              const on = i === site;
              return <button key={st.name} onClick={() => setSite(i)} className="hv-chip" style={{ ...s(`padding:8px 14px;border-radius:999px;cursor:pointer;font:500 12.5px 'DM Sans',sans-serif;transition:all .3s ease`), background: on ? 'rgba(217,234,110,.12)' : 'transparent', border: `1px solid ${on ? 'rgba(217,234,110,.45)' : 'rgba(228,240,214,.12)'}`, color: on ? '#EAF79B' : 'rgba(244,242,230,.8)' }}>{st.name}</button>;
            })}
          </div>
        </div>
        <div style={s('display:flex;flex-wrap:wrap;gap:18px;margin-top:20px')}>
          <div data-r="wctiles" style={s('flex:2 1 520px;min-width:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr));gap:10px;align-content:start')}>
            {HAZARDS.map((h, i) => {
              const v = S.v[i], k = rag(i, v), c = RAG[k], on = i === hazard;
              const dColor = S.d[i] > 0 ? '#EFB39B' : S.d[i] < 0 ? '#9FD6AB' : 'rgba(201,212,194,.7)';
              return (
                <button key={h.name} data-r="wctile" onClick={() => setHazard(i)} className="hv-tile" style={{ ...s(`text-align:left;cursor:pointer;padding:12px 14px 13px;border-radius:14px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-height:92px;box-sizing:border-box;font-family:'DM Sans',sans-serif;transition:all .3s ease`), background: on ? 'rgba(217,234,110,.10)' : c[1], border: `1px solid ${on ? 'rgba(217,234,110,.6)' : c[2]}` }}>
                  <div style={s('display:flex;align-items:flex-start;justify-content:space-between;gap:8px;width:100%')}><span style={s(`font:500 12px/1.3 'DM Sans',sans-serif;color:#F4F2E6`)}>{h.name}</span><span style={{ ...s('flex:none;width:9px;height:9px;margin-top:3px;border-radius:999px'), background: c[0], boxShadow: `0 0 8px ${c[0]}` }}></span></div>
                  <div style={s('display:flex;align-items:baseline;justify-content:space-between;width:100%')}><span style={{ ...s(`font:400 24px/1 'DM Serif Display',serif`), color: c[3] }}>{v}%</span><span style={{ ...s(`font:500 10.5px 'DM Mono',monospace`), color: dColor }}>{fmtD(S.d[i])}</span></div>
                </button>
              );
            })}
          </div>
          <div style={s('flex:1 1 280px;min-width:0;display:flex;flex-direction:column;gap:12px')}>
            <div style={{ ...s('padding:20px 22px;border-radius:18px;background:rgba(6,11,7,.55)'), border: `1px solid ${hc2[2]}` }}>
              <div style={s('display:flex;align-items:center;justify-content:space-between;gap:10px')}><span style={s(`font:600 9px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>{cadence}</span><span style={{ ...s(`padding:4px 10px;border-radius:999px;font:500 10.5px 'DM Sans',sans-serif;white-space:nowrap`), background: hc2[1], border: `1px solid ${hc2[2]}`, color: hc2[3] }}>{status}</span></div>
              <div style={s(`margin-top:10px;font:400 24px/1.15 'DM Serif Display',serif;color:#F6F4E9`)}>{hz.name}</div>
              <p style={s(`margin:6px 0 0;font:400 13px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.78);text-wrap:pretty`)}>{hz.desc}</p>
              <div style={s('display:flex;align-items:baseline;gap:10px;margin-top:10px')}><span style={{ ...s(`font:400 40px/1 'DM Serif Display',serif`), color: hc2[3] }}>{hv}%</span><span style={s(`font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>affected · {fmtD(S.d[hazard])} vs Q2</span></div>
              <div style={s('display:flex;height:7px;border-radius:4px;overflow:hidden;margin-top:14px;background:rgba(244,242,230,.07)')}><span style={{ width: little + '%', background: 'rgba(230,199,126,.45)' }}></span><span style={{ width: quite + '%', background: '#E6C77E' }}></span><span style={{ width: lot + '%', background: '#E78E71' }}></span></div>
              <div style={s(`display:flex;justify-content:space-between;margin-top:7px;font:400 11px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}><span>A little {little}%</span><span>Quite a bit {quite}%</span><span>A lot {lot}%</span></div>
              <div style={{ ...s(`display:flex;align-items:center;gap:10px;margin-top:16px;padding:10px 12px;border-radius:12px;font:400 12.5px/1.4 'DM Sans',sans-serif;color:rgba(244,242,230,.9)`), background: harm ? 'rgba(231,142,113,.08)' : 'rgba(228,240,214,.04)', border: `1px solid ${harm ? 'rgba(231,142,113,.3)' : 'rgba(228,240,214,.10)'}` }}><span style={{ ...s(`flex:none;font:400 20px/1 'DM Serif Display',serif`), color: harm ? '#F0B8A2' : '#F6F4E9' }}>{S.ful}</span><span>{harmText}</span></div>
            </div>
            <div style={s('padding:18px 22px;border-radius:18px;background:linear-gradient(120deg,rgba(217,234,110,.10),rgba(217,234,110,.03) 60%);border:1px solid rgba(217,234,110,.3)')}>
              <span style={s(`font:600 9px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>{respLabel}</span>
              <div style={s(`margin-top:8px;font:400 17px/1.3 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>{control}</div>
              <div style={s(`display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;font:500 11.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}><span style={s('padding:5px 10px;border-radius:999px;background:rgba(10,19,13,.5);border:1px solid rgba(228,240,214,.14)')}>{owner}</span><span style={s('padding:5px 10px;border-radius:999px;background:rgba(10,19,13,.5);border:1px solid rgba(228,240,214,.14)')}>{due}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
