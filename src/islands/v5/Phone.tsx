// @ts-nocheck
/* Generated from the design handoff (design_handoff_v5/reference) by dc2jsx.
   Markup and styles are verbatim from the reference; logic is the reference's
   own renderVals/state code. Edit the reference and regenerate rather than
   hand-tuning values here. */
import React from 'react';
import { s } from '../../lib/s';


class Phone extends React.Component {
  renderVals() {
    const screen = this.props.screen ?? 'home';
    const phoneShadow = this.props.onLight ? '0 50px 80px -30px rgba(20,35,26,.5),0 0 0 1px rgba(20,35,26,.1),inset 0 0 0 5px #060B07' : '0 40px 90px rgba(0,0,0,.55),inset 0 0 0 5px #060B07';
    const h = React.createElement;
    const svg = (kids, size = 20, sw = 1.8) => h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' }, ...kids);
    const P = d => h('path', { d, key: d });
    const C = (cx, cy, r) => h('circle', { cx, cy, r, key: cx + '-' + cy });
    const ic = {
      health: svg([P('M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21')]),
      internal: svg([P('M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z')]),
      love: svg([P('M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z')]),
      social: svg([C(9, 8.5, 3.2), C(16.8, 10.3, 2.6), P('M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4'), P('M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4')]),
      flow: svg([P('M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9'), P('M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15')]),
      mic: svg([h('rect', { x: 9, y: 3.5, width: 6, height: 11, rx: 3, key: 'r' }), P('M5.5 11.5 A6.5 6.5 0 0 0 18.5 11.5'), P('M12 18 V21')], 18),
      lock: svg([h('rect', { x: 5.5, y: 10.5, width: 13, height: 9, rx: 2.5, key: 'r' }), P('M8.5 10.5 V8 A3.5 3.5 0 0 1 15.5 8 V10.5')], 11, 2),
      play: svg([h('path', { d: 'M8 5.5 L18 12 L8 18.5 Z', fill: 'currentColor', key: 'p' })], 14, 1.6),
      breathe: svg([C(12, 12, 8), C(12, 12, 3.5)], 20, 1.6),
      body: svg([C(12, 5.5, 2.5), P('M8 10.5 H16 L15 20 H9 Z')], 20, 1.6),
      walk: svg([C(13, 4.5, 2), P('M10 21 L12 14 L15 16 L15 21'), P('M8 12 L10 9 L14 8.5 L16 11')], 20, 1.6),
      home: svg([P('M4 11 L12 4.5 L20 11 V19.5 H14.5 V14.5 H9.5 V19.5 H4 Z')], 22, 1.7),
      leaf: svg([P('M5 19 C5 11 10 6 19 5 C18 14 13 19 5 19 Z'), P('M5 19 C9 14 12 11 16 8')], 22, 1.7),
      reflect: svg([P('M4 7 A8 5 0 0 1 20 7 V13 A8 5 0 0 1 12 18 L7 21 V17.5 A8 5 0 0 1 4 13 Z')], 22, 1.7),
      profile: svg([C(12, 8.5, 3.6), P('M4.5 20 C4.5 15.5 7.8 13.5 12 13.5 C16.2 13.5 19.5 15.5 19.5 20')], 22, 1.7),
      check: svg([P('M5.5 12.5 L10 17 L18.5 7.5')], 14, 3),
    };
    const pm = [
      { key: 'health', name: 'Health', bg: 'rgba(159,214,171,.14)', fg: '#A9DDB4', r: '52% 48% 50% 50% / 50% 54% 46% 50%' },
      { key: 'internal', name: 'Internal', bg: 'rgba(185,178,232,.14)', fg: '#C4BEEE', r: '48% 52% 50% 50% / 54% 50% 50% 46%' },
      { key: 'love', name: 'Love', bg: 'rgba(235,175,166,.14)', fg: '#F0BDB5', r: '50% 50% 48% 52% / 46% 50% 54% 50%' },
      { key: 'social', name: 'Social', bg: 'rgba(239,209,154,.14)', fg: '#F2DAAC', r: '50% 46% 54% 50% / 52% 50% 48% 50%' },
      { key: 'flow', name: 'Flow', bg: 'rgba(156,207,221,.14)', fg: '#AAD7E3', r: '54% 50% 46% 50% / 50% 48% 52% 50%' },
    ];
    const scores = [67, 50, 75, 67, 59];
    const pillars = pm.map((p, i) => ({ ...p, icon: ic[p.key], score: scores[i], sc: scores[i] < 55 ? '#EFDCAE' : '#F6F4E9' }));
    const pts = r => Array.from({ length: 5 }, (_, i) => { const a = (-90 + i * 72) * Math.PI / 180; return `${(100 + Math.cos(a) * r).toFixed(1)},${(100 + Math.sin(a) * r).toFixed(1)}`; }).join(' ');
    const pentBloom = scores.map((s, i) => { const a = (-90 + i * 72) * Math.PI / 180, r = 78 * s / 100; return `${(100 + Math.cos(a) * r).toFixed(1)},${(100 + Math.sin(a) * r).toFixed(1)}`; }).join(' ');
    const pentDots = scores.map((s, i) => { const a = (-90 + i * 72) * Math.PI / 180, r = 78 * s / 100; return { x: (100 + Math.cos(a) * r).toFixed(1), y: (100 + Math.sin(a) * r).toFixed(1), c: pm[i].fg }; });
    const marks = (done, total) => Array.from({ length: total }, (_, i) => i < done ? '#D9EA6E' : 'rgba(228,240,214,.14)');
    const homeHabits = [
      { icon: ic.health, bg: pm[0].bg, fg: pm[0].fg, title: 'Walk after lunch', meta: 'Health & Fitness · 3 of 5 this week' },
      { icon: ic.social, bg: pm[3].bg, fg: pm[3].fg, title: 'Coffee with a colleague', meta: 'Social Connection · once a week' },
    ];
    const scale = [1, 2, 3, 4, 5].map(v => ({ v, r: ['52% 48% 50% 50% / 50% 54% 46% 50%', '48% 52% 50% 50% / 54% 50% 50% 46%', '50% 50% 48% 52% / 46% 50% 54% 50%', '50% 46% 54% 50% / 52% 50% 48% 50%', '54% 50% 46% 50% / 50% 48% 52% 50%'][v - 1], bg: v === 3 ? 'rgba(217,234,110,.16)' : 'rgba(228,240,214,.05)', bc: v === 3 ? 'rgba(217,234,110,.6)' : 'rgba(228,240,214,.12)', c: v === 3 ? '#EAF79B' : 'rgba(244,242,230,.75)' }));
    const mirrorBars = [
      { name: 'Health', v: 67, label: '67', c: 'rgba(244,242,230,.85)', fill: 'rgba(244,242,230,.32)' },
      { name: 'Internal', v: 50, label: '50', c: 'rgba(244,242,230,.85)', fill: 'rgba(244,242,230,.32)' },
      { name: 'Love', v: 75, label: '75 ↑', c: '#E4F290', fill: 'linear-gradient(90deg,#B9CC55,#D9EA6E)' },
      { name: 'Social', v: 48, label: '48 ↓', c: '#EFDCAE', fill: 'linear-gradient(90deg,#C9A45F,#E6C77E)' },
      { name: 'Flow', v: 59, label: '59', c: 'rgba(244,242,230,.85)', fill: 'rgba(244,242,230,.32)' },
    ];
    const waves = [9, 16, 24, 28, 20, 12, 22, 27, 17, 10, 19, 25, 14, 8].map((hh, i) => ({ h: hh, c: hh > 22 ? '#EAF79B' : hh > 14 ? '#DCEC85' : '#D9EA6E', d: (-i * 0.08).toFixed(2) }));
    const shapes = ['22px 14px 20px 12px / 14px 20px 12px 22px', '12px 22px 14px 20px / 20px 12px 22px 14px', '18px 12px 22px 16px / 12px 22px 14px 20px', '20px 18px 12px 22px / 16px 12px 22px 14px'];
    const themes = [{ name: 'Sleep', n: 5, c: pm[0].fg }, { name: 'Maya', n: 4, c: pm[2].fg }, { name: 'The Tuesday meeting', n: 3, c: pm[4].fg }, { name: 'Running', n: 2, c: pm[0].fg }].map((t, i) => ({ ...t, r: shapes[i % 4] }));
    const entries = [
      { icon: ic.mic, line: 'Slept badly again, but the walk helped.', meta: 'Today · 0:47 · Health' },
      { icon: ic.mic, line: 'Said no to the Thursday thing. Felt good.', meta: 'Wednesday · 1:12 · Flow' },
      { icon: ic.mic, line: 'Call Maya back. Properly this time.', meta: 'Monday · 0:31 · Love' },
    ];
    const cov = [2, 1, 1, 2, 0];
    const coverage = pm.map((p, i) => ({ ...p, icon: ic[p.key], n: cov[i] || '+', nc: cov[i] ? '#F6F4E9' : 'rgba(201,212,194,.5)', bg: cov[i] ? p.bg : 'transparent', fg: cov[i] ? p.fg : 'rgba(201,212,194,.5)', bd: cov[i] ? '0' : '1.5px dashed rgba(228,240,214,.3)' }));
    const states = ['Stressed', 'Anxious', 'Can’t focus', 'Overwhelmed', 'Low', 'Can’t sleep'];
    const resetStates = states.map((label, i) => ({ label, r: shapes[i % 4] }));
    const resetPick = states.map((label, i) => { const on = i === 2; return { label, r: shapes[i % 4], bg: on ? 'rgba(217,234,110,.16)' : 'rgba(228,240,214,.08)', bc: on ? 'rgba(217,234,110,.6)' : 'rgba(228,240,214,.18)', c: on ? '#EAF79B' : '#F6F4E9' }; });
    const tools = [
      { icon: ic.breathe, title: 'Box breathing', meta: '3 min · last time Tuesday' },
      { icon: ic.body, title: 'Body scan', meta: '5 min · listen only' },
      { icon: ic.walk, title: 'Walk it off', meta: '10 min · no phone' },
    ];
    const habitGroups = [
      { ...pm[0], icon: ic.health, title: 'Health & Fitness', count: '2', rows: [
        { title: 'Walk after lunch', meta: '3 of 5 this week · 6 weeks running', marks: marks(3, 5), tc: '#F6F4E9', strike: 'none', ckBg: 'transparent', ckBc: 'rgba(228,240,214,.25)', check: '' },
        { title: 'Lights out by eleven', meta: 'Done for this week', marks: marks(4, 4), tc: 'rgba(244,242,230,.5)', strike: 'line-through', ckBg: '#D9EA6E', ckBc: '#D9EA6E', check: ic.check },
      ] },
      { ...pm[1], icon: ic.internal, title: 'Internal Work', count: '2', rows: [
        { title: 'Three things, once a day', meta: 'Gratitude · 6 days in a row', marks: marks(6, 7), tc: '#F6F4E9', strike: 'none', ckBg: 'transparent', ckBc: 'rgba(228,240,214,.25)', check: '' },
        { title: 'Ten pages before bed', meta: '2 of 4 this week', marks: marks(2, 4), tc: '#F6F4E9', strike: 'none', ckBg: 'transparent', ckBc: 'rgba(228,240,214,.25)', check: '' },
      ] },
      { ...pm[3], icon: ic.social, title: 'Social Connection', count: '1', rows: [
        { title: 'Coffee with a colleague', meta: 'Once a week · open', marks: marks(0, 1), tc: '#F6F4E9', strike: 'none', ckBg: 'transparent', ckBc: 'rgba(228,240,214,.25)', check: '' },
      ] },
    ];
    const chapterSteps = ['Watch', 'Learn', 'Check', 'Try one thing'].map((label, i) => ({ label, bar: i < 1 ? '#D9EA6E' : i === 1 ? 'rgba(217,234,110,.5)' : 'rgba(228,240,214,.14)', c: i <= 1 ? '#F6F4E9' : 'rgba(201,212,194,.55)' }));
    const stones = [
      { text: 'The light in the kitchen this morning.', c: '#F6F4E9', stone: '#C4BEEE', bg: 'rgba(185,178,232,.12)', bc: 'rgba(185,178,232,.3)', r: '26px 18px 28px 16px / 18px 28px 16px 26px', sr: '50% 50% 45% 55% / 55% 45% 55% 45%' },
      { text: 'Maya called back.', c: '#F6F4E9', stone: '#C4BEEE', bg: 'rgba(185,178,232,.12)', bc: 'rgba(185,178,232,.3)', r: '18px 28px 16px 26px / 28px 18px 26px 16px', sr: '45% 55% 50% 50% / 50% 50% 55% 45%' },
      { text: 'One more…', c: 'rgba(201,212,194,.55)', stone: 'rgba(196,190,238,.35)', bg: 'rgba(228,240,214,.04)', bc: 'rgba(228,240,214,.14)', r: '22px 14px 24px 18px / 14px 24px 18px 22px', sr: '55% 45% 50% 50% / 45% 55% 50% 50%' },
    ];
    const active = { home: 'Home', grow: 'Grow', habits: 'Grow', reset: 'Grow', gratitude: 'Home', reflect: 'Reflect', journey: 'Grow' }[screen];
    const TABI = { Home: ['M12 3.2l8.4 6.1-3.2 9.9H6.8L3.6 9.3z'], Grow: ['M12 21v-8', 'M12 13c0-4.5 3-7 7.5-7 0 4.5-3 7-7.5 7z', 'M12 13c0-3.5-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z'], Reflect: ['M6.5 20V10a5.5 5.5 0 0 1 11 0v10', 'M4 20h16', 'M9.5 12.5l3.5-4.5', 'M9.5 16l5-6.5'], You: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4.5 21c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5'] };
    const tabs = ['Home', 'Grow', 'Reflect', 'You'].map(label => ({ label, icon: svg(TABI[label].map(d => P(d)), 22, 1.6), c: label === active ? '#D9EA6E' : 'rgba(244,242,230,.7)', w: label === active ? 600 : 500 }));
    return {
      phoneShadow,
      isHome: screen === 'home', isCheckin: screen === 'checkin', isMirror: screen === 'mirror', isReflect: screen === 'reflect', isGrow: screen === 'grow', isHabits: screen === 'habits', isJourney: screen === 'journey', isGratitude: screen === 'gratitude', isReset: screen === 'reset', isFilm: screen === 'film', isShot: ['home', 'film', 'reflect', 'reset', 'gratitude'].includes(screen),
      oHome: screen === 'home' ? 1 : 0, sHome: screen === 'home' ? 1 : 1.03, hideHome: screen !== 'home',
      oFilm: screen === 'film' ? 1 : 0, sFilm: screen === 'film' ? 1 : 1.03, hideFilm: screen !== 'film',
      oReflect: screen === 'reflect' ? 1 : 0, sReflect: screen === 'reflect' ? 1 : 1.03, hideReflect: screen !== 'reflect',
      oReset: screen === 'reset' ? 1 : 0, sReset: screen === 'reset' ? 1 : 1.03, hideReset: screen !== 'reset',
      oGratitude: screen === 'gratitude' ? 1 : 0, sGratitude: screen === 'gratitude' ? 1 : 1.03, hideGratitude: screen !== 'gratitude',
      hasTabs: !!active && !['home', 'reflect', 'reset', 'gratitude', 'film'].includes(screen),
      pillars, pentOuter: pts(78), pentBloom, pentDots, homeHabits, scale, mirrorBars, waves, themes, entries, coverage, resetStates, resetPick, tools, habitGroups, chapterSteps, stones, tabs,
      icMic: ic.mic, icMicDark: ic.mic, icLock: ic.lock, icHealth: ic.health, icPlay: ic.play, icBreathe: ic.breathe,
    };
  }

  render() {
    const V = { ...this.props, ...(this.renderVals ? this.renderVals() : {}) };
    return (
      <>
    <div style={s(`position:relative;width:290px;height:628px;border-radius:44px;overflow:hidden;background:linear-gradient(178deg,#17301F 0%,#0F2015 45%,#0A130D 100%);border:1px solid rgba(228,240,214,.16);box-shadow:${V.phoneShadow ?? ''};font-family:'DM Sans',sans-serif;color:#F4F2E6;box-sizing:border-box`)}>
      <div style={s(`position:absolute;left:0;top:0;width:390px;height:844px;transform:scale(.7436);transform-origin:0 0`)}>
        <div style={s(`position:absolute;top:18px;left:50%;transform:translateX(-50%);width:108px;height:28px;border-radius:999px;background:#060B07;z-index:3`)}></div>
        {(V.isShot) ? (
          <>
            <div style={s(`position:absolute;inset:0;overflow:hidden;background:#F4F2E6`)}>
              <img src="/assets/v5/light/app-home.webp" alt="nørma Home: Good evening, Fulfilment 67 with its five pillars and your level, Today I’m grateful for, What’s on your mind" aria-hidden={V.hideHome} style={s(`position:absolute;left:0;top:0;width:390px;height:844px;display:block;opacity:${V.oHome ?? ''};transform:scale(${V.sHome ?? ''});transform-origin:50% 40%;transition:opacity 1.1s cubic-bezier(.22,.61,.36,1),transform 1.4s cubic-bezier(.22,.61,.36,1)`)} />
              {' '}
              <img src="/assets/v5/light/app-film.webp" alt="A growth journey chapter: Five pillars, one life, with a short film, four reads and one question" aria-hidden={V.hideFilm} style={s(`position:absolute;left:0;top:0;width:390px;height:844px;display:block;opacity:${V.oFilm ?? ''};transform:scale(${V.sFilm ?? ''});transform-origin:50% 40%;transition:opacity 1.1s cubic-bezier(.22,.61,.36,1),transform 1.4s cubic-bezier(.22,.61,.36,1)`)} />
              {' '}
              <img src="/assets/v5/light/app-reflect.webp" alt="nørma Reflect: What’s on your mind? Listening, with the words appearing as they’re spoken" aria-hidden={V.hideReflect} style={s(`position:absolute;left:0;top:0;width:390px;height:844px;display:block;opacity:${V.oReflect ?? ''};transform:scale(${V.sReflect ?? ''});transform-origin:50% 40%;transition:opacity 1.1s cubic-bezier(.22,.61,.36,1),transform 1.4s cubic-bezier(.22,.61,.36,1)`)} />
              {' '}
              <img src="/assets/v5/light/app-reset.webp" alt="nørma Reset: tools for the next few minutes, picked by how you feel right now" aria-hidden={V.hideReset} style={s(`position:absolute;left:0;top:0;width:390px;height:844px;display:block;opacity:${V.oReset ?? ''};transform:scale(${V.sReset ?? ''});transform-origin:50% 40%;transition:opacity 1.1s cubic-bezier(.22,.61,.36,1),transform 1.4s cubic-bezier(.22,.61,.36,1)`)} />
              {' '}
              <img src="/assets/v5/light/app-gratitude.webp" alt="nørma Gratitude: three things you’re grateful for, from each day" aria-hidden={V.hideGratitude} style={s(`position:absolute;left:0;top:0;width:390px;height:844px;display:block;opacity:${V.oGratitude ?? ''};transform:scale(${V.sGratitude ?? ''});transform-origin:50% 40%;transition:opacity 1.1s cubic-bezier(.22,.61,.36,1),transform 1.4s cubic-bezier(.22,.61,.36,1)`)} />
            </div>
          </>
        ) : null}
        {(V.isCheckin) ? (
          <>
            <div style={s(`position:relative;padding:68px 24px 0;height:807px;box-sizing:border-box;display:flex;flex-direction:column`)}>
              <div style={s(`display:flex;align-items:center;justify-content:space-between`)}>
                <span style={s(`font:400 22px/1 'DM Sans',sans-serif;color:rgba(244,242,230,.8)`)}>‹</span>
                <span style={s(`font:500 11px 'DM Mono',monospace;letter-spacing:1.8px;color:rgba(201,212,194,.78)`)}>1 OF 23</span>
                <span style={s(`width:16px`)}></span>
              </div>
              <div style={s(`margin-top:18px;height:4px;border-radius:2px;background:rgba(244,242,230,.1);overflow:hidden`)}><div style={s(`width:5%;height:100%;border-radius:2px;background:#EAF79B`)}></div></div>
              <div style={s(`display:flex;align-items:center;gap:10px;margin-top:40px`)}>
                <span style={s(`width:30px;height:30px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:rgba(159,214,171,.14);color:#A9DDB4`)}>{V.icHealth}</span>
                <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.75)`)}>HEALTH & FITNESS</span>
              </div>
              <div style={s(`margin-top:16px;font:400 32px/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9;text-wrap:pretty`)}>Do you exercise regularly each week?</div>
              <div style={s(`display:flex;justify-content:space-between;gap:8px;margin-top:44px`)}>
                {(V.scale || []).map((n, $index) => (
                  <React.Fragment key={$index}>
                    <span style={s(`flex:1;aspect-ratio:1;border-radius:${n.r ?? ''};box-sizing:border-box;background:${n.bg ?? ''};border:1px solid ${n.bc ?? ''};display:flex;align-items:center;justify-content:center;font:500 16px 'DM Sans',sans-serif;color:${n.c ?? ''}`)}>{n.v}</span>
                  </React.Fragment>
                ))}
              </div>
              <div style={s(`display:flex;justify-content:space-between;margin-top:12px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>
                <span>Not at all</span>
                <span>Absolutely</span>
              </div>
              <div style={s(`margin-top:auto;padding-bottom:44px;display:flex;flex-direction:column;gap:14px`)}>
                <span style={s(`text-align:center;font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Your answers stay with you.</span>
                <span style={s(`display:flex;align-items:center;justify-content:center;height:52px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 16px 'DM Sans',sans-serif`)}>Next</span>
              </div>
            </div>
          </>
        ) : null}
        {(V.isMirror) ? (
          <>
            <div style={s(`position:relative;padding:68px 24px 0;height:807px;box-sizing:border-box;display:flex;flex-direction:column`)}>
              <div style={s(`display:flex;align-items:center;justify-content:space-between`)}>
                <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2px;color:#DCEC85`)}>YOUR MIRROR · OCTOBER</span>
                <span style={s(`display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:14px 20px 12px 18px / 20px 14px 18px 12px;background:rgba(228,240,214,.06);border:1px solid rgba(228,240,214,.12);font:500 11px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>{V.icLock}Yours only</span>
              </div>
              <p style={s(`margin:36px 0 0;font:400 30px/1.25 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9;text-wrap:pretty`)}>
                Love is climbing.{' '}
                <span style={s(`color:rgba(244,242,230,.65)`)}>Social has been quiet for a few weeks though.</span>
              </p>
              <p style={s(`margin:16px 0 0;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>One thing worth noticing. Not a verdict, not a plan.</p>
              <div style={s(`display:flex;flex-direction:column;gap:12px;margin-top:32px;padding-top:22px;border-top:1px solid rgba(228,240,214,.08);font:400 14px 'DM Sans',sans-serif;color:rgba(244,242,230,.85)`)}>
                {(V.mirrorBars || []).map((b, $index) => (
                  <React.Fragment key={$index}>
                    <div style={s(`display:flex;align-items:center;gap:12px;color:${b.c ?? ''}`)}>
                      <span style={s(`width:64px`)}>{b.name}</span>
                      <div style={s(`flex:1;height:5px;border-radius:3px;background:rgba(244,242,230,.08)`)}><div style={s(`width:${b.v ?? ''}%;height:100%;border-radius:3px;background:${b.fill ?? ''}`)}></div></div>
                      <span style={s(`width:44px;text-align:right;font-weight:500`)}>{b.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div style={s(`margin-top:auto;margin-bottom:44px;padding:14px 16px;border-radius:20px 14px 22px 12px / 14px 22px 12px 20px;background:rgba(228,240,214,.05);display:flex;align-items:center;justify-content:space-between;gap:12px`)}>
                <span style={s(`font:400 13px/1.4 'DM Sans',sans-serif;color:rgba(201,212,194,.78)`)}>Nothing on this screen goes to your employer.</span>
                <span style={s(`flex:none;font:500 12.5px 'DM Sans',sans-serif;color:#D9EA6E`)}>See what they see ›</span>
              </div>
            </div>
          </>
        ) : null}
        {(V.isGrow) ? (
          <>
            <div style={s(`position:relative;padding:68px 24px 0`)}>
              <div style={s(`font:400 30px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Grow</div>
              <div style={s(`position:relative;overflow:hidden;isolation:isolate;margin-top:20px;padding:16px 18px 16px;border-radius:30px 20px 32px 22px / 20px 30px 22px 32px;background:#1B3328`)}>
                <img src="/assets/v5/norma-world-day.webp" alt="" style={s(`position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center 24%;z-index:-1`)} />
                <div style={s(`position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(15,32,21,.3),rgba(15,32,21,.78) 60%)`)}></div>
                <div style={s(`display:flex;align-items:center;gap:14px`)}>
                  <img src="/assets/v5/norma-sprout.png" alt="" style={s(`width:56px;height:56px;object-fit:contain;flex:none;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))`)} />
                  <div style={s(`flex:1;min-width:0`)}>
                    <div style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(246,244,233,.8)`)}>MOMENTUM · OCTOBER</div>
                    <div style={s(`margin-top:4px;font:400 20px/1.2 'DM Serif Display',serif;color:#F6F4E9`)}>Growing ↗</div>
                    <div style={s(`margin-top:2px;font:400 12.5px 'DM Sans',sans-serif;color:rgba(246,244,233,.85)`)}>Grew from a walk and two reflections.</div>
                  </div>
                </div>
              </div>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;margin-top:30px`)}>
                <span style={s(`font:400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>Habits</span>
                <span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>All ›</span>
              </div>
              <div style={s(`margin-top:12px;padding:16px 18px;border-radius:18px 28px 16px 26px / 28px 18px 26px 16px;background:rgba(228,240,214,.07)`)}>
                <div style={s(`display:flex;align-items:center;gap:14px`)}>
                  <div style={s(`flex:1;min-width:0`)}>
                    <div style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>7 habits · 3 open this week</div>
                    <div style={s(`margin-top:3px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>4 of 5 pillars covered</div>
                  </div>
                  <span style={s(`font:400 18px 'DM Sans',sans-serif;color:rgba(201,212,194,.5)`)}>›</span>
                </div>
                <div style={s(`display:flex;justify-content:space-between;margin-top:16px`)}>
                  {(V.coverage || []).map((c, $index) => (
                    <React.Fragment key={$index}>
                      <div style={s(`display:flex;flex-direction:column;align-items:center;gap:6px;width:56px`)}>
                        <span style={s(`width:40px;height:40px;border-radius:${c.r ?? ''};box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${c.bg ?? ''};color:${c.fg ?? ''};border:${c.bd ?? ''}`)}>{c.icon}</span>
                        <span style={s(`font:500 13px 'DM Mono',monospace;color:${c.nc ?? ''}`)}>{c.n}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;margin-top:30px`)}>
                <span style={s(`font:400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>Reset</span>
                <span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>All ›</span>
              </div>
              <div style={s(`margin-top:12px;padding:16px 16px 14px;border-radius:22px 30px 20px 28px / 30px 20px 28px 22px;background:radial-gradient(55% 60% at 85% 12%, rgba(246,224,150,.3), rgba(0,0,0,0) 70%), radial-gradient(60% 60% at 12% 92%, rgba(159,214,171,.22), rgba(0,0,0,0) 70%), linear-gradient(165deg,#34382A 0%,#22271D 55%,#141712 100%)`)}>
                <div style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>What’s going on right now?</div>
                <div style={s(`display:flex;flex-wrap:wrap;gap:10px;margin-top:14px`)}>
                  {(V.resetStates || []).map((st, $index) => (
                    <React.Fragment key={$index}>
                      <span style={s(`padding:9px 16px;border-radius:${st.r ?? ''};border:1px solid rgba(228,240,214,.22);background:rgba(228,240,214,.1);font:500 13px 'DM Sans',sans-serif;color:#F6F4E9`)}>{st.label}</span>
                    </React.Fragment>
                  ))}
                </div>
                <div style={s(`display:flex;align-items:center;gap:14px;margin-top:16px;padding-top:14px;position:relative`)}>
                  <svg aria-hidden="true" style={s(`position:absolute;left:0;right:0;top:0;width:100%;height:3px;display:block`)} viewBox="0 0 342 3" preserveAspectRatio="none">
                    <path d="M0 1.6 C 60 0.6, 140 2.5, 220 1.2 S 300 2.3, 342 1.4" fill="none" stroke="rgba(228,240,214,.14)" strokeWidth="1"></path>
                  </svg>
                  <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:rgba(244,242,230,.12);color:#F6F4E9`)}>{V.icBreathe}</span>
                  <div style={s(`flex:1;min-width:0`)}>
                    <div style={s(`font:500 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>Box breathing</div>
                    <div style={s(`margin-top:3px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>Last time · Tuesday · 3 min</div>
                  </div>
                  <span style={s(`flex:none;width:34px;height:34px;border-radius:999px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(228,240,214,.2);color:#F6F4E9`)}>{V.icPlay}</span>
                </div>
              </div>
              <div style={s(`display:flex;align-items:center;justify-content:space-between;margin-top:30px`)}>
                <span style={s(`font:400 20px 'DM Serif Display',serif;color:#F6F4E9`)}>Journeys</span>
                <span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>All ›</span>
              </div>
              <div style={s(`margin-top:12px;padding:16px;border-radius:28px 16px 26px 18px / 16px 28px 18px 26px;background:rgba(228,240,214,.07)`)}>
                <div style={s(`display:flex;align-items:baseline;justify-content:space-between`)}>
                  <span style={s(`font:500 16px 'DM Sans',sans-serif;color:#F6F4E9`)}>Foundations</span>
                  <span style={s(`font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>3 of 31 chapters</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {(V.isHabits) ? (
          <>
            <div style={s(`position:relative;padding:68px 24px 0`)}>
              <div style={s(`display:flex;align-items:center;gap:6px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)}>
                <span style={s(`font:400 22px/1 'DM Sans',sans-serif;color:rgba(244,242,230,.8)`)}>‹</span>
                Grow
              </div>
              <div style={s(`display:flex;align-items:flex-end;justify-content:space-between;margin-top:12px`)}>
                <span style={s(`font:400 30px/1.1 'DM Serif Display',serif;color:#F6F4E9`)}>Habits</span>
                <span style={s(`display:inline-flex;gap:10px`)}>
                  <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;background:rgba(228,240,214,.08);color:rgba(244,242,230,.9);font:400 18px 'DM Serif Display',serif`)}>?</span>
                  <span style={s(`display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:400 24px/1 'DM Sans',sans-serif`)}>+</span>
                </span>
              </div>
              <div style={s(`margin-top:8px;font:400 14px/1.45 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>Small things you do on repeat, each one tied to a pillar.</div>
              <div style={s(`margin-top:28px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.6)`)}>7 habits · 3 open this week · resets Monday</div>
              {(V.habitGroups || []).map((g, $index) => (
                <React.Fragment key={$index}>
                  <div style={s(`display:flex;align-items:center;gap:10px;margin-top:28px`)}>
                    <span style={s(`width:28px;height:28px;border-radius:${g.r ?? ''};display:flex;align-items:center;justify-content:center;background:${g.bg ?? ''};color:${g.fg ?? ''}`)}>{g.icon}</span>
                    <span style={s(`font:400 18px 'DM Serif Display',serif;color:#F6F4E9`)}>{g.title}</span>
                    <span style={s(`font:500 12px 'DM Mono',monospace;color:rgba(201,212,194,.5)`)}>{g.count}</span>
                  </div>
                  {(g.rows || []).map((h, $index) => (
                    <React.Fragment key={$index}>
                      <div style={s(`display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid rgba(228,240,214,.07)`)}>
                        <span style={s(`flex:none;width:40px;height:40px;border-radius:52% 48% 50% 50% / 50% 54% 46% 50%;display:flex;align-items:center;justify-content:center;background:${g.bg ?? ''};color:${g.fg ?? ''}`)}>{g.icon}</span>
                        <div style={s(`flex:1;min-width:0`)}>
                          <div style={s(`font:500 15px 'DM Sans',sans-serif;color:${h.tc ?? ''};text-decoration:${h.strike ?? ''}`)}>{h.title}</div>
                          <div style={s(`margin-top:3px;font:400 12px 'DM Sans',sans-serif;color:rgba(201,212,194,.7)`)}>{h.meta}</div>
                          <div style={s(`display:flex;gap:3px;margin-top:7px;width:120px`)}>
                            {(h.marks || []).map((mk, $index) => (
                              <React.Fragment key={$index}>
                                <span style={s(`flex:1;height:4px;border-radius:2px;background:${mk ?? ''}`)}></span>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <span style={s(`flex:none;width:30px;height:30px;border-radius:999px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${h.ckBg ?? ''};border:1.5px solid ${h.ckBc ?? ''};color:#152213`)}>{h.check}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </>
        ) : null}
        {(V.isJourney) ? (
          <>
            <div style={s(`position:relative;padding:68px 24px 0;height:807px;box-sizing:border-box;display:flex;flex-direction:column`)}>
              <div style={s(`display:flex;align-items:center;gap:6px;font:400 13px 'DM Sans',sans-serif;color:rgba(244,242,230,.75)`)}>
                <span style={s(`font:400 22px/1 'DM Sans',sans-serif;color:rgba(244,242,230,.8)`)}>‹</span>
                Journeys
              </div>
              <div style={s(`margin-top:20px;border-radius:30px 20px 32px 22px / 20px 30px 22px 32px;overflow:hidden;position:relative;aspect-ratio:4/3;background:#E4E9D6`)}>
                <img src="/assets/v5/journey/ch-intro-health-b.jpg" alt="" style={s(`width:100%;height:100%;object-fit:cover;object-position:50% 20%;display:block`)} />
                <span style={s(`position:absolute;left:14px;top:14px;padding:5px 10px;border-radius:999px;background:rgba(27,50,37,.6);backdrop-filter:blur(6px);font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:#F6F4E9`)}>HEALTH & FITNESS · 02</span>
              </div>
              <div style={s(`margin-top:22px;font:400 28px/1.2 'DM Serif Display',serif;letter-spacing:-.2px;color:#F6F4E9;text-wrap:pretty`)}>Do you exercise regularly each week?</div>
              <div style={s(`margin-top:10px;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.85)`)}>A short story about one pillar, then one thing to try tonight.</div>
              <div style={s(`display:flex;gap:6px;margin-top:24px`)}>
                {(V.chapterSteps || []).map((cs, $index) => (
                  <React.Fragment key={$index}>
                    <div style={s(`flex:1;display:flex;flex-direction:column;gap:8px`)}>
                      <div style={s(`height:4px;border-radius:2px;background:${cs.bar ?? ''}`)}></div>
                      <span style={s(`font:500 11px 'DM Sans',sans-serif;color:${cs.c ?? ''}`)}>{cs.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div style={s(`margin-top:auto;padding-bottom:44px;display:flex;flex-direction:column;gap:12px`)}>
                <span style={s(`text-align:center;font:400 12.5px 'DM Sans',sans-serif;color:rgba(201,212,194,.72)`)}>Step 2 of 4 · about three minutes</span>
                <span style={s(`display:flex;align-items:center;justify-content:center;height:52px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 16px 'DM Sans',sans-serif`)}>Continue</span>
              </div>
            </div>
          </>
        ) : null}
        {(V.hasTabs) ? (
          <>
            <div style={s(`position:absolute;left:0;right:0;bottom:0;height:190px;background:linear-gradient(180deg,rgba(10,19,13,0) 0%,rgba(10,19,13,.45) 35%,rgba(10,19,13,.88) 65%,#0A130D 100%);pointer-events:none`)}></div>
            <div style={s(`position:absolute;left:16px;right:16px;bottom:24px;height:72px;border-radius:38px 30px 40px 32px / 36px 40px 30px 38px;background:rgba(12,20,13,.8);border:1px solid rgba(228,240,214,.09);display:flex;align-items:center;backdrop-filter:blur(14px)`)}>
              {(V.tabs || []).map((t, $index) => (
                <React.Fragment key={$index}>
                  <div style={s(`flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;color:${t.c ?? ''}`)}>
                    {t.icon}
                    <span style={s(`font-family:'DM Sans',sans-serif;font-size:11px;font-weight:${t.w ?? ''}`)}>{t.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
      </>
    );
  }
}

export default Phone;
