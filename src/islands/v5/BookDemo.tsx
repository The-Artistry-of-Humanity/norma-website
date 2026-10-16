// @ts-nocheck
/* Generated from the design handoff (design_handoff_v5/reference) by dc2jsx.
   Markup and styles are verbatim from the reference; logic is the reference's
   own renderVals/state code. Edit the reference and regenerate rather than
   hand-tuning values here. */
import React from 'react';
import { s } from '../../lib/s';
import './BookDemo.dc.css';


const COUNTRIES = ['Australia', 'New Zealand', 'United States', 'Canada', 'United Kingdom', 'Ireland', 'Germany', 'Austria', 'Switzerland', 'Netherlands', 'Singapore', 'Other'];
const SIZES = ['Under 50', '50 to 199', '200 to 499', '500 to 999', '1,000 to 4,999', '5,000 or more'];
const REQ = ['name', 'email', 'company', 'country', 'size', 'role', 'message'];
const FAQ = [
  ['What do we see as an organisation?', 'Scores for the organisation, each department and each team, across the five pillars and the three culture questions, plus how much the app is being used. You never see an individual’s answers or an individual’s name. You see the group, and from our experience the group signal is more than enough to start moving in a better direction.'],
  ['What about small teams?', 'A group needs at least five people before anything shows. A team of four shows nothing, and its results roll up into the department instead.'],
  ['How much time does it take from our people?', 'The check-in takes about three minutes once a month. Everything else is up to them. The app is their private companion for their whole life, not a work tool, and most people open it the way they open a habit tracker or a meditation app: when it helps.'],
  ['Will people actually use it?', 'They use it because it is theirs. It looks at their whole life, not their job: health, relationships, friendships, inner life and work. They get their own picture, growth journeys, habits, Reset and Gratitude, and none of it is shared with you. The dashboard shows how many people checked in, so you will see for yourself.'],
  ['What do we need to set up?', 'Very little. You set up your organisation, departments and teams in the dashboard and invite your people. From their first check-in you have your baseline.'],
  ['How soon do we see something?', 'The first check-in gives you your baseline. From then on you watch how things unfold month by month. Some of the movement comes from your people using what the app gives them, some from what you do with the dashboard: the growth library, your own initiatives, the conversations the numbers start. Every initiative you log is stamped on the timeline, so you can see what made a difference.'],
  ['How does this help with our psychosocial safety duties?', 'Work health and safety laws increasingly cover psychosocial hazards, and they come down to four questions. What did you identify? What did you do? Did it work? Can you prove it? nørma answers all four as you go: the check-in surfaces the hazard, the initiative you log is your action, the next check-ins show whether it worked, and every step is dated. That record is what regulators ask to see.'],
  ['Can we start with one department?', 'Yes. Most organisations start with one department or team, get their baseline, and expand from there.'],
  ['Where is the data stored and who can read it?', 'Everything a person does in the app stays theirs: their check-ins, habits, reflections, journeys, all of it. It is encrypted and only they can see it. You see trends for groups of five or more, and that is what you need to lead well.'],
  ['What if our scores look bad?', 'Then you know where to look, which is the point. Low scores point to a department or a team, and the growth library gives you something to start with the same week: initiatives, conversations, habits for the team. If you want more, our expert facilitators can work with your leaders directly.']
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class BookDemo extends React.Component {
  state = { narrow: false, menu: false, f: { name: '', email: '', company: '', country: '', size: '', role: '', phone: '', message: '' }, bad: {}, tried: false, sent: false, pop: false, cardMin: 'auto', faq: -1 };
  rootRef = React.createRef(); cardRef = React.createRef();
  componentDidMount() {
    this.onResize = () => { const n = window.innerWidth < 760; if (n !== this.state.narrow) this.setState({ narrow: n, menu: n ? this.state.menu : false }); };
    window.addEventListener('resize', this.onResize); this.onResize();
    if (window.ResizeObserver) { this.ro = new ResizeObserver(this.onResize); this.ro.observe(document.documentElement); }
  }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); if (this.ro) this.ro.disconnect(); clearTimeout(this.popT); }
  set(k) { return e => { const v = e.target.value; this.setState(s => ({ f: { ...s.f, [k]: v }, bad: s.tried ? { ...s.bad, [k]: false } : s.bad })); }; }
  check(f) { const bad = {}; REQ.forEach(k => { if (!String(f[k]).trim()) bad[k] = true; }); if (f.email && !EMAIL.test(f.email.trim())) bad.email = true; return bad; }
  submit = e => {
    e.preventDefault();
    const bad = this.check(this.state.f);
    if (Object.keys(bad).length) { this.setState({ bad, tried: true }); return; }
    // Keep the card's height so the page doesn't jump, then let the thank-you bloom in.
    const h = this.cardRef.current ? this.cardRef.current.offsetHeight + 'px' : 'auto';
    this.setState({ sent: true, cardMin: h });
    this.popT = setTimeout(() => this.setState({ pop: true }), 80);
  };
  renderVals() {
    const { narrow, menu, f, bad, tried, sent, pop } = this.state, n = Object.keys(bad).filter(k => bad[k]).length;
    const v = { rootRef: this.rootRef, cardRef: this.cardRef, wide: !narrow, narrow, menuOpen: narrow && menu, toggleMenu: () => this.setState(s => ({ menu: !s.menu })),
      countries: COUNTRIES, sizes: SIZES, submit: this.submit, toTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      faqs: FAQ.map(([q, a], i) => { const open = this.state.faq === i; return { q, a, open, toggle: () => this.setState(s => ({ faq: s.faq === i ? -1 : i })), rows: open ? '1fr' : '0fr', rot: open ? 'rotate(45deg)' : 'none', bg: open ? 'rgba(217,234,110,.16)' : 'rgba(228,240,214,.08)' }; }), sent, notSent: !sent, cardMin: this.state.cardMin,
      hint: tried && n ? (n === 1 ? 'One field still needs filling in.' : n + ' fields still need filling in.') : '',
      hintCol: tried && n ? '#C85C44' : 'rgba(20,35,26,.55)',
      first: (f.name.trim().split(/\s+/)[0] || 'there'), email: f.email.trim(),
      bloomS: pop ? 1 : .15, popT: pop ? 'translateY(0) scale(1)' : 'translateY(40px) scale(.6)', popO: pop ? 1 : 0, txT: pop ? 'translateY(0)' : 'translateY(16px)', txO: pop ? 1 : 0 };
    Object.keys(f).forEach(k => { v[k] = f[k]; v['set_' + k] = this.set(k); v['b_' + k] = bad[k] ? '1px solid #D9735A' : '1px solid rgba(20,35,26,.16)'; });
    return v;
  }

  render() {
    const V = { ...this.props, ...(this.renderVals ? this.renderVals() : {}) };
    return (
      <>
    <div ref={V.rootRef} style={s(`background:#F4F2E6;color:#14231A;font-family:'DM Sans',sans-serif;overflow-x:clip;-webkit-font-smoothing:antialiased`)}>
      <header style={s(`position:sticky;top:0;z-index:60;border-radius:0 0 26px 20px / 0 0 20px 26px;background:linear-gradient(180deg,rgba(250,248,240,.78),rgba(244,242,230,.6));backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -1px 0 rgba(255,255,255,.35),0 1px 0 rgba(20,35,26,.06),0 10px 30px -18px rgba(20,35,26,.25)`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;height:68px;display:flex;align-items:center;justify-content:space-between;gap:24px`)}>
          <a href="/" style={s(`display:flex;align-items:center;gap:10px;color:#14231A`)}>
            <img src="/assets/v5/norma-icon.png" alt="" width="30" height="30" style={s(`display:block;border-radius:9px`)} />
            <span style={s(`font:400 23px/1 'DM Serif Display',serif;letter-spacing:-.2px`)}>nørma</span>
          </a>
          <div style={s(`display:flex;align-items:center;gap:28px`)}>
            {(V.wide) ? (
              <>
                <nav style={s(`display:flex;align-items:center;gap:28px;font:500 14px 'DM Sans',sans-serif`)}>
                  <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">Your people</a>
                  <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">For leaders</a>
                  <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">ROI</a>
                  <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">Help</a>
                </nav>
              </>
            ) : null}
            <div style={s(`display:flex;align-items:center;gap:10px`)}>
              <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:44px;padding:0 16px;white-space:nowrap;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px rgba(217,234,110,.22)`)} className="bd-ac3e8255">Book a demo</a>
              {(V.narrow) ? (
                <>
                  <button type="button" onClick={V.toggleMenu} aria-label="Menu" style={s(`width:40px;height:40px;border-radius:999px;border:1px solid rgba(20,35,26,.16);background:transparent;display:flex;align-items:center;justify-content:center;color:#14231A;cursor:pointer;padding:0`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M4 8h16"></path>
                      <path d="M4 16h16"></path>
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {(V.menuOpen) ? (
          <>
            <nav style={s(`padding:8px clamp(20px,5vw,48px) 20px;display:flex;flex-direction:column;border-top:1px solid rgba(20,35,26,.07);font:400 22px 'DM Serif Display',serif`)}>
              <a href="/your-people/" style={s(`padding:12px 0;border-bottom:1px solid rgba(20,35,26,.08);color:#14231A`)}>Your people</a>
              <a href="/for-leaders/" style={s(`padding:12px 0;border-bottom:1px solid rgba(20,35,26,.08);color:#14231A`)}>For leaders</a>
              <a href="/roi/" style={s(`padding:12px 0;border-bottom:1px solid rgba(20,35,26,.08);color:#14231A`)}>ROI</a>
              <a href="/help/" style={s(`padding:12px 0;color:#14231A`)}>Help</a>
            </nav>
          </>
        ) : null}
      </header>
      <section id="book" style={s(`position:relative;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;right:-14%;top:-22%;width:62%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.55),rgba(217,234,110,0) 72%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(150px,18vw,240px)`)}>
          <div style={s(`display:flex;flex-direction:column;gap:clamp(40px,5vw,64px)`)}>
            <div style={s(`min-width:0;max-width:760px;margin:0 auto;text-align:center`)}>
              <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:rgba(20,35,26,.6)`)}>Book a demo</span>
              <h1 style={s(`margin:16px auto 0;max-width:12em;font:400 clamp(44px,5.4vw,68px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance;padding-bottom:.14em;margin-bottom:-.14em`)}>Let’s turn the lights on.</h1>
              <p style={s(`margin:24px auto 0;max-width:30em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>
                Thirty minutes with the team behind nørma. Pick a time that suits you, or tell us about your organisation and we’ll come back to you.
              </p>
            </div>
            <div style={s(`min-width:0;position:relative;max-width:820px;width:100%;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;gap:18px`)}>
              <div aria-hidden="true" style={s(`position:absolute;left:-10%;top:30%;width:60%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(205,226,80,.7),rgba(217,234,110,0) 72%);pointer-events:none`)}></div>
              <div aria-hidden="true" style={s(`position:absolute;right:-8%;bottom:-6%;width:56%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(74,107,58,.38),rgba(74,107,58,0) 72%);pointer-events:none`)}></div>
              <div style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:clamp(26px,3vw,36px);border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;background:linear-gradient(150deg,rgba(15,32,21,.9),rgba(15,32,21,.78));backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);color:#F4F2E6;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 0 0 1px rgba(255,255,255,.08),0 36px 70px -30px rgba(20,35,26,.5)`)}>
                <div aria-hidden="true" style={s(`position:absolute;right:-18%;top:-40%;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.22),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
                <img src="/assets/v5/norma-point.png" alt="" width="150" height="202" style={s(`position:absolute;right:clamp(-10px,1vw,18px);bottom:-26px;width:clamp(110px,16vw,150px);height:auto;filter:drop-shadow(0 0 1px rgba(246,244,233,.35)) drop-shadow(0 18px 24px rgba(0,0,0,.35));pointer-events:none;z-index:1`)} />
                <div style={s(`position:relative;padding-right:clamp(120px,18vw,180px)`)}>
                  <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>The easiest way</span>
                  <h2 style={s(`margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;color:#F6F4E9;text-wrap:balance`)}>Pick a time that suits you.</h2>
                  <p style={s(`margin:12px 0 0;max-width:26em;font:400 16px/1.55 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>A thirty-minute demo call. Choose a slot in our calendar and it’s booked.</p>
                  <div style={s(`display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:24px`)}>
                    <a href="https://calendar.app.google/P14aVTpPNqgrVAbHA" target="_blank" rel="noopener" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 26px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.28)`)} className="bd-hob247fb bd-ac3e8255">
                      Book a demo slot
                      <span aria-hidden="true">›</span>
                    </a>
                  </div>
                </div>
              </div>
              <div ref={V.cardRef} style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:clamp(26px,3vw,36px);border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;background:linear-gradient(150deg,rgba(250,248,240,.62),rgba(244,242,230,.34));backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 0 1px rgba(255,255,255,.45),0 30px 60px -34px rgba(20,35,26,.35);min-height:${V.cardMin ?? ''};display:flex;flex-direction:column`)}>
                {(V.notSent) ? (
                  <>
                    <form onSubmit={V.submit} style={s(`display:flex;flex-direction:column;gap:20px`)}>
                      <div>
                        <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#4A6B3A`)}>Or write to us</span>
                        <h2 style={s(`margin:12px 0 0;font:400 clamp(24px,2.4vw,30px)/1.12 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A;text-wrap:balance`)}>Tell us about your organisation.</h2>
                        <p style={s(`margin:10px 0 0;font:400 15.5px/1.5 'DM Sans',sans-serif;color:rgba(20,35,26,.68)`)}>We reply within one working day, from a person.</p>
                      </div>
                      <div style={s(`display:flex;flex-direction:column;gap:16px`)}>
                        <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:16px 14px`)}>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Name</span>
                            <input type="text" autoComplete="name" placeholder="Enter your name" value={V.name} onChange={V.set_name} onInput={V.set_name} style={s(`width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_name ?? ''};border-radius:18px 14px 18px 12px / 14px 18px 12px 18px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease`)} className="bd-foa3fa77" />
                          </label>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Your role</span>
                            <input type="text" autoComplete="organization-title" placeholder="Enter your role" value={V.role} onChange={V.set_role} onInput={V.set_role} style={s(`width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_role ?? ''};border-radius:14px 18px 12px 18px / 18px 14px 18px 12px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease`)} className="bd-foa3fa77" />
                          </label>
                        </div>
                        <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:16px 14px`)}>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Phone (optional)</span>
                            <input type="tel" autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" value={V.phone} onChange={V.set_phone} onInput={V.set_phone} style={s(`width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_phone ?? ''};border-radius:14px 18px 12px 18px / 18px 14px 18px 12px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease`)} className="bd-foa3fa77" />
                          </label>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Work email</span>
                            <input type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" value={V.email} onChange={V.set_email} onInput={V.set_email} style={s(`width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_email ?? ''};border-radius:14px 18px 12px 18px / 18px 14px 18px 12px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease`)} className="bd-foa3fa77" />
                          </label>
                        </div>
                        <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:16px 14px`)}>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Company</span>
                            <input type="text" autoComplete="organization" placeholder="Enter your company name" value={V.company} onChange={V.set_company} onInput={V.set_company} style={s(`width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_company ?? ''};border-radius:14px 18px 12px 18px / 18px 14px 18px 12px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease`)} className="bd-foa3fa77" />
                          </label>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Country</span>
                            <span style={s(`position:relative;display:block`)}>
                              <select value={V.country} onChange={V.set_country} style={s(`appearance:none;-webkit-appearance:none;width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_country ?? ''};border-radius:18px 14px 18px 12px / 14px 18px 12px 18px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease;padding-right:44px;cursor:pointer`)} className="bd-foa3fa77">
                                <option value="">Choose</option>
                                {(V.countries || []).map((c, $index) => (
                                  <React.Fragment key={$index}>
                                    <option value={c}>{c}</option>
                                  </React.Fragment>
                                ))}
                              </select>
                              <span aria-hidden="true" style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);pointer-events:none;color:rgba(20,35,26,.6)`)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
                              </span>
                            </span>
                          </label>
                          <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0`)}>
                            <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Headcount</span>
                            <span style={s(`position:relative;display:block`)}>
                              <select value={V.size} onChange={V.set_size} style={s(`appearance:none;-webkit-appearance:none;width:100%;height:56px;box-sizing:border-box;padding:0 18px;border:${V.b_size ?? ''};border-radius:18px 14px 18px 12px / 14px 18px 12px 18px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px 'DM Sans',sans-serif;transition:border-color .2s ease;padding-right:44px;cursor:pointer`)} className="bd-foa3fa77">
                                <option value="">Choose</option>
                                {(V.sizes || []).map((s_, $index) => (
                                  <React.Fragment key={$index}>
                                    <option value={s_}>{s_}</option>
                                  </React.Fragment>
                                ))}
                              </select>
                              <span aria-hidden="true" style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);pointer-events:none;color:rgba(20,35,26,.6)`)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
                              </span>
                            </span>
                          </label>
                        </div>
                        <label style={s(`display:flex;flex-direction:column;gap:8px;min-width:0;`)}>
                          <span style={s(`font:500 13px 'DM Sans',sans-serif;color:rgba(20,35,26,.62)`)}>Your message</span>
                          <textarea rows="4" value={V.message} onChange={V.set_message} onInput={V.set_message} placeholder="Enter your message" style={s(`width:100%;box-sizing:border-box;padding:14px 18px;border:${V.b_message ?? ''};border-radius:22px 18px 22px 16px / 18px 22px 16px 22px;background:rgba(255,255,255,.55);color:#14231A;font:500 16px/1.5 'DM Sans',sans-serif;resize:vertical;min-height:120px;transition:border-color .2s ease`)} className="bd-foa3fa77"></textarea>
                        </label>
                      </div>
                      <div style={s(`display:flex;align-items:center;gap:16px;flex-wrap:wrap`)}>
                        <button type="submit" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 28px;border:0;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif;cursor:pointer`)} className="bd-ho3cfe08 bd-ac3e8255">Send</button>
                        <span style={s(`font:400 14px/1.45 'DM Sans',sans-serif;color:${V.hintCol ?? ''};transition:color .2s ease`)}>{V.hint}</span>
                      </div>
                    </form>
                  </>
                ) : null}
                {(V.sent) ? (
                  <>
                    <div style={s(`position:relative;flex:1;min-height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 8px`)}>
                      <div aria-hidden="true" style={s(`position:absolute;left:50%;top:38%;width:min(560px,120%);aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.75),rgba(217,234,110,.18) 50%,rgba(217,234,110,0) 72%);transform:translate(-50%,-50%) scale(${V.bloomS ?? ''});transition:transform 1.6s cubic-bezier(.22,.61,.36,1);pointer-events:none`)}></div>
                      <img src="/assets/v5/norma-happy.png" alt="" width="116" height="156" style={s(`position:relative;display:block;filter:drop-shadow(0 0 1px rgba(20,35,26,.7)) drop-shadow(0 18px 24px rgba(20,35,26,.18));transform:${V.popT ?? ''};opacity:${V.popO ?? ''};transition:transform 1.2s cubic-bezier(.22,.61,.36,1),opacity .7s ease`)} />
                      <h2 style={s(`position:relative;margin:24px 0 0;font:400 clamp(34px,3.6vw,44px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#14231A;transform:${V.txT ?? ''};opacity:${V.txO ?? ''};transition:transform 1s cubic-bezier(.22,.61,.36,1) .35s,opacity .8s ease .35s`)}>{"Thanks, "}{V.first}.</h2>
                      <p style={s(`position:relative;margin:14px 0 0;max-width:24em;font:400 17px/1.55 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty;transform:${V.txT ?? ''};opacity:${V.txO ?? ''};transition:transform 1s cubic-bezier(.22,.61,.36,1) .5s,opacity .8s ease .5s`)}>{"Your message is with us. We’ll write to "}{V.email}{" within one working day."}</p>
                      <a href="https://calendar.app.google/P14aVTpPNqgrVAbHA" target="_blank" rel="noopener" style={s(`position:relative;display:inline-flex;align-items:center;gap:8px;margin-top:28px;height:50px;padding:0 24px;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15px 'DM Sans',sans-serif;opacity:${V.txO ?? ''};transition:opacity .8s ease .75s`)} className="bd-ho4ead8f bd-ac3e8255">
                        Can’t wait? Pick a time now
                        <span aria-hidden="true">›</span>
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="questions" style={s(`position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0;background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
        <div aria-hidden="true" style={s(`position:absolute;right:-12%;top:-16%;width:58%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.1),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
        <div style={s(`position:relative;max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(96px,12vw,160px)`)}>
          <div style={s(`max-width:760px;margin:0 auto`)}>
            <span style={s(`font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase;color:#DCEC85`)}>Frequently asked questions</span>
            <h2 style={s(`margin:14px 0 0;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;color:#F6F4E9;text-wrap:balance`)}>What leaders ask us before a demo.</h2>
            <div style={s(`margin-top:clamp(32px,4vw,48px);border-top:1px solid rgba(228,240,214,.12)`)}>
              {(V.faqs || []).map((q, $index) => (
                <React.Fragment key={$index}>
                  <div style={s(`border-bottom:1px solid rgba(228,240,214,.12)`)}>
                    <button type="button" onClick={q.toggle} aria-expanded={q.open} style={s(`display:flex;align-items:center;justify-content:space-between;gap:20px;width:100%;padding:22px 0;border:0;background:transparent;color:#F6F4E9;text-align:left;cursor:pointer;font:400 clamp(20px,2vw,24px)/1.25 'DM Serif Display',serif;letter-spacing:-.2px`)} className="bd-ho950d73">
                      <span style={s(`text-wrap:pretty`)}>{q.q}</span>
                      <span aria-hidden="true" style={s(`flex:none;width:36px;height:36px;border-radius:999px;background:${q.bg ?? ''};display:flex;align-items:center;justify-content:center;color:#DCEC85;transform:${q.rot ?? ''};transition:transform .4s cubic-bezier(.22,.61,.36,1),background .3s ease`)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </svg>
                      </span>
                    </button>
                    <div style={s(`display:grid;grid-template-rows:${q.rows ?? ''};transition:grid-template-rows .42s cubic-bezier(.22,.61,.36,1)`)}>
                      <div style={s(`overflow:hidden;min-height:0`)}>
                        <p style={s(`margin:0;padding:0 56px 24px 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>{q.a}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:16px 24px;margin-top:clamp(40px,5vw,64px)`)}>
              <button type="button" onClick={V.toTop} style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 26px;border:0;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="bd-ac3e8255">
                Book a demo slot
                <span aria-hidden="true">›</span>
              </button>
              <span style={s(`font:400 15px 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>Something we haven’t answered? Ask it in the form.</span>
            </div>
          </div>
        </div>
      </section>
      <footer style={s(`border-top:1px solid rgba(20,35,26,.1)`)}>
        <div style={s(`max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box;padding-top:36px;padding-bottom:40px;display:flex;flex-direction:column;gap:28px`)}>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px`)}>
            <a href="/" style={s(`display:flex;align-items:center;gap:10px;color:#14231A`)}>
              <img src="/assets/v5/norma-icon.png" alt="" width="26" height="26" style={s(`display:block;border-radius:8px`)} />
              <span style={s(`font:400 20px/1 'DM Serif Display',serif`)}>nørma</span>
            </a>
            <nav style={s(`display:flex;flex-wrap:wrap;gap:12px 28px;font:500 14px 'DM Sans',sans-serif`)}>
              <a href="/your-people/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">Your people</a>
              <a href="/for-leaders/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">For leaders</a>
              <a href="/roi/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">ROI</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">Help</a>
              <a href="/book-a-demo/" style={s(`color:rgba(20,35,26,.72)`)} className="bd-ho789e87">Book a demo</a>
            </nav>
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(20,35,26,.08);font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>
            <span>© 2026 The Artistry of Humanity Pty Ltd</span>
            <span style={s(`display:flex;flex-wrap:wrap;gap:20px`)}>
              <a href="/privacy/" style={s(`color:rgba(20,35,26,.66)`)} className="bd-ho789e87">Privacy policy</a>
              <a href="/terms/" style={s(`color:rgba(20,35,26,.66)`)} className="bd-ho789e87">Terms of use</a>
              <a href="/help/" style={s(`color:rgba(20,35,26,.66)`)} className="bd-ho789e87">Help centre</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
      </>
    );
  }
}

export default BookDemo;
