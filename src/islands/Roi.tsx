import { useState } from 'react';
import { s } from '../lib/s';
import { INDUSTRIES, num } from '../data/site';

const CUR = 'A$';
const money = (v: number) => { if (!Number.isFinite(v)) return CUR + '0'; if (v >= 1e6) return CUR + (v / 1e6).toFixed(1) + 'M'; if (v >= 1e4) return CUR + Math.round(v / 1e3) + 'k'; return CUR + Math.round(v).toLocaleString('en-AU'); };
const people = (v: number) => v >= 1 || v === 0 ? Math.round(v).toLocaleString('en-AU') : '<1';

const fieldLabel = s(`display:flex;flex-direction:column;gap:7px;font:500 12.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`);
const fieldInput = s(`height:44px;padding:0 14px;border-radius:12px;border:1px solid rgba(228,240,214,.16);background:rgba(10,19,13,.6);color:#F6F4E9;font:500 15px 'DM Sans',sans-serif;box-sizing:border-box;width:100%`);

export default function Roi() {
  const [ratesOpen, setRatesOpen] = useState(false);
  const [headcount, setHeadcount] = useState('500');
  const [industry, setIndustry] = useState('all');
  const [rates, setRates] = useState({ turnover: '13.5', absence: '9', salary: '100000', replace: '0.5', pres: '10.8' });

  const pickIndustry = (k: string) => { const p = INDUSTRIES[k] || INDUSTRIES.all; setIndustry(k); setRates(r => ({ ...r, turnover: String(p.turnover), absence: String(p.absence), salary: String(p.salary) })); };
  const rate = (k: keyof typeof rates) => (e: React.ChangeEvent<HTMLInputElement>) => setRates(r => ({ ...r, [k]: e.target.value }));

  const hc = Math.max(0, num(headcount, 0));
  const turnover = num(rates.turnover, 0) / 100, absence = num(rates.absence, 0), salary = num(rates.salary, 0), replace = num(rates.replace, 0), pres = num(rates.pres, 0) / 100, moved = 0.10;
  const leavers = hc * turnover, turnoverCost = leavers * salary * replace, absDays = hc * absence, absenceCost = absDays * salary * 1.2 / 230, presCost = hc * salary * pres, total = turnoverCost + absenceCost + presCost;
  const est = {
    leavers: Math.round(leavers).toLocaleString('en-AU'), turnover: money(turnoverCost), absDays: Math.round(absDays).toLocaleString('en-AU'), absence: money(absenceCost), pres: money(presCost), total: money(total),
    dis: people(hc * .47), toward: people(hc * .17), burn: people(hc * .086), crisis: people(hc * .006),
    moved: money(total * moved), stay: people(leavers * moved), daysBack: Math.round(absDays * moved).toLocaleString('en-AU'), back: people(hc * .17 * moved),
  };

  return (
    <>
      <div style={s('margin-top:40px;padding:24px 28px;border-radius:24px;background:rgba(228,240,214,.055);border:1px solid rgba(228,240,214,.10);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 18px 44px rgba(0,0,0,.28)')}>
        <div style={s('display:flex;flex-wrap:wrap;align-items:flex-end;gap:16px')}>
          <label style={{ ...fieldLabel, ...s('flex:2 1 240px') }}>Industry<select value={industry} onChange={e => pickIndustry(e.target.value)} style={{ ...fieldInput, ...s('padding:0 12px;font-size:14.5px') }}>
            <option value="all">All industries</option>
            <option value="hospitality">Hospitality &amp; tourism</option>
            <option value="retail">Retail</option>
            <option value="health">Healthcare &amp; aged care</option>
            <option value="professional">Professional services</option>
            <option value="tech">Technology</option>
            <option value="finance">Financial services</option>
            <option value="construction">Construction &amp; mining</option>
            <option value="manufacturing">Manufacturing &amp; logistics</option>
            <option value="public">Public sector</option>
            <option value="education">Education</option>
          </select></label>
          <label style={{ ...fieldLabel, ...s('flex:1 1 160px') }}>Headcount<input type="number" min={5} step={10} value={headcount} onChange={e => setHeadcount(e.target.value)} style={{ ...fieldInput, ...s('font-size:16px') }} /></label>
          <button onClick={() => setRatesOpen(o => !o)} className="hv-ghost2" style={s(`flex:0 0 auto;display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 18px;border-radius:999px;cursor:pointer;background:transparent;border:1px solid rgba(228,240,214,.18);color:#F4F2E6;font:500 13.5px 'DM Sans',sans-serif;transition:all .2s ease`)}>{ratesOpen ? 'Hide starting rates' : 'Adjust starting rates'}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${ratesOpen ? 180 : 0}deg)`, transition: 'transform .3s ease' }}><path d="M6 9 L12 15 L18 9" /></svg></button>
        </div>
        {ratesOpen && (
          <>
            <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr));gap:14px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(228,240,214,.08)')}>
              <label style={fieldLabel}><span>Turnover, % a year</span><input type="number" min={0} step={0.5} value={rates.turnover} onChange={rate('turnover')} style={fieldInput} /></label>
              <label style={fieldLabel}><span>Absence, days a person</span><input type="number" min={0} step={0.5} value={rates.absence} onChange={rate('absence')} style={fieldInput} /></label>
              <label style={fieldLabel}><span>Average salary, {CUR}</span><input type="number" min={0} step={5000} value={rates.salary} onChange={rate('salary')} style={fieldInput} /></label>
              <label style={fieldLabel}><span>Replacement, × salary</span><input type="number" min={0} step={0.1} value={rates.replace} onChange={rate('replace')} style={fieldInput} /></label>
              <label style={fieldLabel}><span>Presenteeism, % of payroll</span><input type="number" min={0} step={0.5} value={rates.pres} onChange={rate('pres')} style={fieldInput} /></label>
            </div>
            <p style={s(`margin:14px 0 0;font:400 12px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Benchmarks: AHRI Work Outlook 2025–26, ABS, APSC. Loaded daily cost: salary plus 20% on-costs over 230 days.</p>
          </>
        )}
      </div>
      <div style={s('margin-top:16px;padding:26px 28px;border-radius:24px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)')}>
        <div style={s('display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 20px')}><span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:rgba(201,212,194,.78)`)}>THE HUMAN COST · RIGHT NOW</span><span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Gallup 2024, Deloitte Australia 2024, Black Dog Institute, applied to your headcount</span></div>
        <div data-r="g4" style={s('display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:18px')}>
          <div style={s('padding:18px 20px;border-radius:18px;background:rgba(228,240,214,.04);border:1px solid rgba(228,240,214,.09)')}><div style={s(`font:400 38px/1 'DM Serif Display',serif;color:#F6F4E9`)}>{est.dis}</div><div style={s(`margin-top:8px;font:400 13px/1.35 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>quietly disengaging</div></div>
          <div style={s('padding:18px 20px;border-radius:18px;background:rgba(230,199,126,.06);border:1px solid rgba(230,199,126,.2)')}><div style={s(`font:400 38px/1 'DM Serif Display',serif;color:#EFDCAE`)}>{est.toward}</div><div style={s(`margin-top:8px;font:400 13px/1.35 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>heading toward burnout</div></div>
          <div style={s('padding:18px 20px;border-radius:18px;background:rgba(231,142,113,.06);border:1px solid rgba(231,142,113,.22)')}><div style={s(`font:400 38px/1 'DM Serif Display',serif;color:#EFB39B`)}>{est.burn}</div><div style={s(`margin-top:8px;font:400 13px/1.35 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>in burnout, mostly hiding it</div></div>
          <div style={s('padding:18px 20px;border-radius:18px;background:rgba(231,142,113,.06);border:1px solid rgba(231,142,113,.22)')}><div style={s(`font:400 38px/1 'DM Serif Display',serif;color:#EFB39B`)}>{est.crisis}</div><div style={s(`margin-top:8px;font:400 13px/1.35 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>in genuine crisis</div></div>
        </div>
      </div>
      <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:16px;margin-top:16px')}>
        <div style={s('padding:26px 28px;border-radius:24px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)')}>
          <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:rgba(201,212,194,.78)`)}>THE BUSINESS COST · A YEAR</span>
          <div style={s(`display:flex;flex-direction:column;gap:10px;margin-top:18px;font:400 14.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
            <div style={s('display:flex;justify-content:space-between;gap:12px')}><span>Turnover · {est.leavers} people leave</span><span style={s('font-weight:600;color:#F6F4E9')}>{est.turnover}</span></div>
            <div style={s('display:flex;justify-content:space-between;gap:12px')}><span>Absence · {est.absDays} unplanned days</span><span style={s('font-weight:600;color:#F6F4E9')}>{est.absence}</span></div>
            <div style={s('display:flex;justify-content:space-between;gap:12px')}><span>Presenteeism · at work, not really there</span><span style={s('font-weight:600;color:#F6F4E9')}>{est.pres}</span></div>
          </div>
          <div style={s('display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-top:18px;padding-top:18px;border-top:1px solid rgba(228,240,214,.08)')}><span style={s(`font:400 14px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Total a year</span><span style={s(`font:400 40px/1 'DM Serif Display',serif;color:#F6F4E9`)}>{est.total}</span></div>
        </div>
        <div style={s('padding:26px 28px;border-radius:24px;background:linear-gradient(135deg,rgba(217,234,110,.10),rgba(228,240,214,.04) 60%);border:1px solid rgba(217,234,110,.22)')}>
          <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>THE BUSINESS CASE</span>
          <div style={s(`margin-top:14px;font:400 14px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>Potential recovery with nørma</div>
          <div style={s('display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-top:6px')}><span style={s(`font:400 52px/1 'DM Serif Display',serif;color:#EAF79B`)}>{est.moved}</span><span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>a year</span></div>
          <div style={s(`display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;font:500 12.5px 'DM Sans',sans-serif;color:#F4F2E6`)}>
            <span style={s('padding:7px 12px;border-radius:999px;background:rgba(10,19,13,.5);border:1px solid rgba(228,240,214,.14)')}>{est.stay} people stay</span>
            <span style={s('padding:7px 12px;border-radius:999px;background:rgba(10,19,13,.5);border:1px solid rgba(228,240,214,.14)')}>{est.daysBack} sick days back</span>
            <span style={s('padding:7px 12px;border-radius:999px;background:rgba(10,19,13,.5);border:1px solid rgba(228,240,214,.14)')}>{est.back} people step back from burnout</span>
          </div>
          <p style={s(`margin:16px 0 0;font:400 12px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.75)`)}>Assumes a 10% improvement: a fifth of the gap Gallup finds between the most and least engaged teams. A pilot measures it against your own baseline.</p>
        </div>
      </div>
    </>
  );
}
