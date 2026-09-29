import { useState } from 'react';
import { s } from '../lib/s';
import { STEPS } from '../data/site';

const phoneShell = s(`position:relative;width:290px;height:600px;box-sizing:border-box;border-radius:44px;background:linear-gradient(178deg,#0F2015 0%,#122718 52%,#0A130D 100%);border:1px solid rgba(228,240,214,.16);box-shadow:0 40px 90px rgba(0,0,0,.55),inset 0 0 0 5px #060B07;overflow:hidden`);
const notch = s('position:absolute;top:14px;left:50%;transform:translateX(-50%);width:80px;height:20px;border-radius:999px;background:#060B07');

function Phone0() {
  const opt = s(`flex:1;aspect-ratio:1;border-radius:999px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.12);display:flex;align-items:center;justify-content:center;font:500 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.7)`);
  return (
    <div style={phoneShell}>
      <div style={notch}></div>
      <div style={s('position:relative;height:100%;box-sizing:border-box;padding:50px 20px 18px;display:flex;flex-direction:column')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(244,242,230,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 6 L8.5 12 L14.5 18" /></svg>
          <span style={s(`font:500 9px 'DM Mono',monospace;letter-spacing:1.8px;color:rgba(201,212,194,.78)`)}>1 OF 23</span>
          <span style={s('width:16px')}></span>
        </div>
        <div style={s('margin-top:14px;height:4px;border-radius:2px;background:rgba(244,242,230,.1);overflow:hidden')}><div style={s('width:5%;height:100%;border-radius:2px;background:#EAF79B;box-shadow:0 0 10px rgba(234,247,155,.5)')}></div></div>
        <span style={s(`margin-top:26px;font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>HEALTH &amp; FITNESS</span>
        <div style={s(`margin-top:10px;font:400 25px/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9;text-wrap:pretty`)}>Do you exercise regularly each week?</div>
        <div style={s('display:flex;justify-content:space-between;gap:6px;margin-top:34px')}>
          <span style={opt}>1</span>
          <span style={opt}>2</span>
          <span style={s(`flex:1;aspect-ratio:1;border-radius:999px;background:rgba(217,234,110,.14);border:1px solid rgba(217,234,110,.6);display:flex;align-items:center;justify-content:center;font:600 13px 'DM Sans',sans-serif;color:#EAF79B;box-shadow:0 0 16px rgba(217,234,110,.3)`)}>3</span>
          <span style={opt}>4</span>
          <span style={opt}>5</span>
        </div>
        <div style={s(`display:flex;justify-content:space-between;margin-top:10px;font:400 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}><span>Not at all</span><span>Absolutely</span></div>
        <div style={s('margin-top:auto;display:flex;flex-direction:column;gap:10px')}>
          <span style={s(`text-align:center;font:400 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Your answers stay with you.</span>
          <span style={s(`display:flex;align-items:center;justify-content:center;height:46px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)}>Next</span>
        </div>
      </div>
    </div>
  );
}

function Phone1() {
  const row = (label: string, pct: number, v: string) => (
    <div style={s('display:flex;align-items:center;gap:10px')}><span style={s('width:52px')}>{label}</span><div style={s('flex:1;height:5px;border-radius:3px;background:rgba(244,242,230,.08)')}><div style={{ ...s('height:100%;border-radius:3px;background:rgba(244,242,230,.32)'), width: pct + '%' }}></div></div><span style={s('width:22px;text-align:right;font-weight:600')}>{v}</span></div>
  );
  return (
    <div style={phoneShell}>
      <div style={s('position:absolute;left:-40px;top:60px;width:370px;height:260px;border-radius:50%;background:radial-gradient(closest-side,rgba(219,236,120,.16),rgba(0,0,0,0) 75%);pointer-events:none')}></div>
      <div style={notch}></div>
      <div style={s('position:relative;height:100%;box-sizing:border-box;padding:50px 20px 18px;display:flex;flex-direction:column')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between')}>
          <span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>YOUR MIRROR · SEPTEMBER</span>
          <span style={s(`display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border-radius:999px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.12);font:500 9px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#D9EA6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5.5" y="10.5" width="13" height="9" rx="2.5" /><path d="M8.5 10.5 V8 A3.5 3.5 0 0 1 15.5 8 V10.5" /></svg>Yours only</span>
        </div>
        <p style={s(`margin:30px 0 0;font:400 25px/1.28 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9;text-wrap:pretty`)}>Love is climbing. <span style={s('color:rgba(244,242,230,.7)')}>Social has been quiet for a few weeks though.</span></p>
        <p style={s(`margin:14px 0 0;font:400 12px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>One thing worth noticing. Not a verdict, not a plan.</p>
        <div style={s(`display:flex;flex-direction:column;gap:10px;margin-top:26px;padding-top:18px;border-top:1px solid rgba(228,240,214,.08);font:400 11.5px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
          {row('Health', 67, '67')}
          {row('Internal', 50, '50')}
          <div style={s('display:flex;align-items:center;gap:10px;color:#E4F290')}><span style={s('width:52px')}>Love</span><div style={s('flex:1;height:5px;border-radius:3px;background:rgba(244,242,230,.08)')}><div style={s('width:75%;height:100%;border-radius:3px;background:linear-gradient(90deg,#B9CC55,#D9EA6E)')}></div></div><span style={s('width:22px;text-align:right;font-weight:600')}>75 ↗</span></div>
          <div style={s('display:flex;align-items:center;gap:10px;color:#EFDCAE')}><span style={s('width:52px')}>Social</span><div style={s('flex:1;height:5px;border-radius:3px;background:rgba(244,242,230,.08)')}><div style={s('width:48%;height:100%;border-radius:3px;background:linear-gradient(90deg,#C9A45F,#E6C77E)')}></div></div><span style={s('width:22px;text-align:right;font-weight:600')}>48 ↘</span></div>
          {row('Flow', 59, '59')}
        </div>
        <div style={s('margin-top:auto;padding:12px 14px;border-radius:14px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09);display:flex;align-items:center;justify-content:space-between;gap:10px')}>
          <span style={s(`font:400 11px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Nothing on this screen goes to your employer.</span>
          <span style={s(`flex:none;font:500 10.5px 'DM Sans',sans-serif;color:#D9EA6E`)}>See what they see →</span>
        </div>
      </div>
    </div>
  );
}

function Phone2() {
  const waveBars: Array<[number, string, string]> = [[9, '#D9EA6E', '0s'], [16, '#D9EA6E', '-.08s'], [24, '#DCEC85', '-.16s'], [28, '#EAF79B', '-.24s'], [20, '#DCEC85', '-.32s'], [12, '#D9EA6E', '-.4s'], [22, '#DCEC85', '-.48s'], [27, '#EAF79B', '-.56s'], [17, '#DCEC85', '-.64s'], [10, '#D9EA6E', '-.72s']];
  return (
    <div style={phoneShell}>
      <div style={notch}></div>
      <div style={s('position:relative;height:100%;box-sizing:border-box;padding:50px 18px 16px;display:flex;flex-direction:column')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between')}>
          <span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>TUE · 8 SEP</span>
          <span style={s(`display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;background:rgba(217,234,110,.10);border:1px solid rgba(217,234,110,.22);font:500 9px 'DM Sans',sans-serif;color:#DCEC85`)}>Momentum · 3 weeks</span>
        </div>
        <div style={s(`margin-top:8px;font:400 21px/1.15 'DM Serif Display',serif;letter-spacing:-.2px;color:#F4F2E6`)}>One small step.</div>
        <div style={s('margin-top:14px;padding:12px 15px 13px;border-radius:20px;background:rgba(228,240,214,.055);border:1px solid rgba(228,240,214,.10);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 14px 34px rgba(0,0,0,.28)')}>
          <div style={s(`font:600 8px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>HABIT · SOCIAL CONNECTION</div>
          <div style={s('display:flex;align-items:center;gap:9px;padding:9px 0 2px')}>
            <span style={s('width:17px;height:17px;border-radius:999px;border:1.5px solid rgba(217,234,110,.6);flex:none')}></span>
            <span style={s(`flex:1;font:400 12px/1.3 'DM Sans',sans-serif;color:#F4F2E6`)}>Message one friend, just because</span>
            <span style={s(`font:500 8.5px 'DM Mono',monospace;color:rgba(201,212,194,.78)`)}>2d</span>
          </div>
        </div>
        <div style={s('margin-top:10px;padding:12px 15px 13px;border-radius:20px;background:rgba(228,240,214,.055);border:1px solid rgba(228,240,214,.10)')}>
          <div style={s(`font:600 8px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.78)`)}>ONE ACTION THIS WEEK</div>
          <div style={s(`margin-top:8px;font:400 13.5px/1.3 'DM Serif Display',serif;color:#F4F2E6`)}>Book the walk with Maya you keep postponing.</div>
        </div>
        <div style={s('margin-top:10px;padding:14px 16px;border-radius:20px;background:#0D1811;border:1px solid rgba(217,234,110,.22)')}>
          <span style={s(`font:600 8.5px 'DM Sans',sans-serif;letter-spacing:2px;color:#D9EA6E`)}>VOICE REFLECTION</span>
          <div style={s('display:flex;align-items:center;gap:12px;margin-top:12px')}>
            <span style={s('flex:none;width:34px;height:34px;border-radius:999px;background:#D9EA6E;box-shadow:0 0 18px rgba(217,234,110,.4);display:flex;align-items:center;justify-content:center')}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3.5" width="6" height="11" rx="3" /><path d="M5.5 11.5 A6.5 6.5 0 0 0 18.5 11.5" /><path d="M12 18 V21" /></svg></span>
            <div style={s('display:flex;align-items:center;gap:2.5px;height:28px')}>
              {waveBars.map(([h, bg, delay], i) => (
                <span key={i} style={{ ...s('width:2.5px;border-radius:2px;animation:nrmWave 1.15s ease-in-out infinite'), height: h + 'px', background: bg, animationDelay: delay }}></span>
              ))}
            </div>
            <span style={s(`font:500 10.5px 'DM Mono',monospace;color:rgba(244,242,230,.85)`)}>0:47</span>
          </div>
          <div style={s(`margin-top:10px;font:400 10.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Only you ever hear this.</div>
        </div>
        <div style={s('margin-top:auto;height:46px;border-radius:23px;background:rgba(12,20,13,.74);border:1px solid rgba(228,240,214,.09);display:flex;align-items:center')}>
          <span style={s(`flex:1;text-align:center;font:500 8.5px 'DM Sans',sans-serif;letter-spacing:.4px;color:rgba(244,242,230,.72)`)}>Home</span>
          <span style={s(`flex:1;text-align:center;font:600 8.5px 'DM Sans',sans-serif;letter-spacing:.4px;color:#D9EA6E`)}>Grow</span>
          <span style={s(`flex:1;text-align:center;font:500 8.5px 'DM Sans',sans-serif;letter-spacing:.4px;color:rgba(244,242,230,.72)`)}>Reflect</span>
          <span style={s(`flex:1;text-align:center;font:500 8.5px 'DM Sans',sans-serif;letter-spacing:.4px;color:rgba(244,242,230,.72)`)}>Profile</span>
        </div>
      </div>
    </div>
  );
}

function Phone3() {
  const item = (label: string, mins: string) => (
    <div style={s('display:flex;justify-content:space-between;padding:11px 14px;border-radius:12px;background:rgba(228,240,214,.045);border:1px solid rgba(228,240,214,.09)')}><span>{label}</span><span style={s(`font:500 11px 'DM Mono',monospace;color:rgba(201,212,194,.78)`)}>{mins}</span></div>
  );
  return (
    <div style={s('position:relative;width:360px;max-width:100%;box-sizing:border-box;padding:28px 30px 26px;border-radius:24px;background:#0D1811;border:1px solid rgba(228,240,214,.12);box-shadow:0 40px 90px rgba(0,0,0,.5)')}>
      <span style={s(`font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:#D9EA6E`)}>STOP FOR WELLNESS · SEPTEMBER</span>
      <div style={s(`margin-top:8px;font:500 11px 'DM Mono',monospace;letter-spacing:1.2px;color:rgba(201,212,194,.78)`)}>PLATFORM TEAM · 14 PEOPLE</div>
      <h3 style={s(`margin:16px 0 0;font:400 30px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Work &amp; Life Flow</h3>
      <p style={s(`margin:8px 0 0;font:400 13.5px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Built on your team&rsquo;s lowest pillar this month.</p>
      <div style={s('display:flex;align-items:baseline;gap:12px;margin-top:18px')}><span style={s(`font:400 44px/1 'DM Serif Display',serif;color:#EFDCAE`)}>45</span><span style={s(`padding:4px 9px;border-radius:999px;background:rgba(230,199,126,.10);border:1px solid rgba(230,199,126,.3);font:500 10.5px 'DM Sans',sans-serif;color:#EFDCAE`)}>↘ 4 vs August</span></div>
      <div style={s(`display:flex;flex-direction:column;gap:8px;margin-top:22px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
        {item('Pause together', '2 MIN')}
        {item('One question, everyone answers', '10 MIN')}
        {item('One commitment for the month', '5 MIN')}
      </div>
      <span style={s(`display:flex;align-items:center;justify-content:center;height:48px;margin-top:20px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 14px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)}>Start the session</span>
    </div>
  );
}

export default function Rhythm() {
  const [step, setStep] = useState(0);
  const st = STEPS[step];
  return (
    <>
      <div style={s('display:flex;flex-wrap:wrap;gap:10px;margin-top:32px')}>
        {STEPS.map((x, i) => {
          const on = i === step;
          return (
            <button key={x.n} onClick={() => setStep(i)} className="hv-chip" style={{ ...s(`display:inline-flex;align-items:center;gap:10px;padding:11px 18px 11px 14px;border-radius:999px;cursor:pointer;font:500 14px 'DM Sans',sans-serif;transition:all .3s ease`), background: on ? 'rgba(217,234,110,.12)' : 'transparent', border: `1px solid ${on ? 'rgba(217,234,110,.5)' : 'rgba(228,240,214,.14)'}`, color: on ? '#EAF79B' : 'rgba(244,242,230,.85)' }}>
              <span style={{ ...s(`font:500 11px 'DM Mono',monospace`), color: on ? '#D9EA6E' : 'rgba(201,212,194,.78)' }}>{x.n}</span>{x.name}
            </button>
          );
        })}
      </div>
      <div data-r="panel" style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:40px;align-items:center;margin-top:32px;padding:44px 40px;border-radius:30px;background:rgba(228,240,214,.035);border:1px solid rgba(228,240,214,.08)')}>
        <div style={s('position:relative;min-height:620px;display:flex;align-items:center;justify-content:center')}>
          <div style={s('position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.12),rgba(0,0,0,0) 72%);animation:breathe 6s ease-in-out infinite;pointer-events:none')}></div>
          {step === 0 && <Phone0 />}
          {step === 1 && <Phone1 />}
          {step === 2 && <Phone2 />}
          {step === 3 && <Phone3 />}
        </div>
        <div>
          <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.6px;color:#DCEC85`)}>{st.n} · {st.name.toUpperCase()}</span>
          <h3 style={s(`margin:14px 0 0;font:400 34px/1.12 'DM Serif Display',serif;color:#F6F4E9;text-wrap:pretty`)}>{st.title}</h3>
          <p style={s(`margin:16px 0 0;max-width:440px;font:400 16.5px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.78);text-wrap:pretty`)}>{st.body}</p>
          <p style={s(`margin:22px 0 0;padding-top:18px;border-top:1px solid rgba(228,240,214,.08);max-width:440px;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{st.note}</p>
        </div>
      </div>
    </>
  );
}
