// @ts-nocheck
/* Our story (28 Oct 2026). Not from a design handoff: written here in the
   round 5 system (same header, footer, colours, type and section shapes as
   the generated pages), from Ian's own words in the 27 Oct weekly call. */
import React from 'react';
import { s } from '../../lib/s';
import './OurStory.css';

const W = `max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box`;
const EYEBROW = `font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase`;
const H2 = `margin:14px 0 0;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;text-wrap:balance`;
const BODY = `margin:20px 0 0;font:400 clamp(17px,1.4vw,18.5px)/1.65 'DM Sans',sans-serif;text-wrap:pretty`;
// Overlapping section tops, alternating the two organic shapes the other pages use.
const TOP_A = `position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0`;
const TOP_B = `position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0`;

const NAV = [['/your-people/', 'Your people'], ['/for-leaders/', 'For leaders'], ['/roi/', 'ROI'], ['/our-story/', 'Our story']];

const Quote = ({ text, dark }) => (
  <figure style={s(`margin:clamp(32px,4vw,44px) 0 0;padding:0`)}>
    <span aria-hidden="true" style={s(`display:block;height:44px;font:400 84px/1 'DM Serif Display',serif;color:${dark ? '#D9EA6E' : '#6E8A1C'}`)}>“</span>
    <blockquote style={s(`margin:0;font:italic 400 clamp(23px,2.3vw,29px)/1.32 'DM Serif Display',serif;letter-spacing:-.2px;color:${dark ? '#F6F4E9' : '#14231A'};text-wrap:pretty`)}>{text}</blockquote>
    <figcaption style={s(`margin-top:16px;${EYEBROW};color:${dark ? 'rgba(220,236,133,.85)' : '#4A6B3A'}`)}>Ian Williams</figcaption>
  </figure>
);

const Icon = ({ children }) => (
  <span aria-hidden="true" style={s(`display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:20px 16px 20px 14px / 16px 20px 14px 20px;background:rgba(217,234,110,.12);color:#D9EA6E`)}>
    <svg width="30" height="30" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
  </span>
);

const NAME = [
  {
    icon: <><path d="M7 6h8v23h22v8H7z" /><path d="M15 12h-3.5M15 17h-3.5M15 22h-3.5M21 29v3.5M26 29v3.5M31 29v3.5" /></>,
    title: 'The carpenter’s square',
    text: 'In Latin, norma is the carpenter’s square, the tool that checks whether a corner is true. It’s also where the word norm comes from.',
  },
  {
    icon: <><circle cx="22" cy="22" r="11" /><path d="M11 35L33 9" /></>,
    title: 'A line through the norm',
    text: 'The ø puts a line through the norm. In German it’s also the sign for an average, and average isn’t what we’re aiming for. Busy, distracted and running on empty has become normal at work. It shouldn’t be.',
  },
  {
    icon: <><path d="M12 36h20" /><path d="M22 36V21" /><path d="M22 25c-7 0-11-4-11-10 6 0 11 4 11 10z" /><path d="M22 21c0-6 4-10 11-10 0 6-4 10-11 10z" /></>,
    title: 'Norma',
    text: 'nørma is named after Ian’s mum, Norma, the most resilient person he knows.',
  },
];

class OurStory extends React.Component {
  state = { narrow: false, menu: false, loop: false };
  loopRef = React.createRef();
  componentDidMount() {
    this.onResize = () => { const n = window.innerWidth < 760; if (n !== this.state.narrow) this.setState({ narrow: n, menu: n ? this.state.menu : false }); };
    window.addEventListener('resize', this.onResize); this.onResize();
    // The way out of the loop draws itself once the picture is on screen.
    if (window.IntersectionObserver && this.loopRef.current) {
      this.io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { this.setState({ loop: true }); this.io.disconnect(); } }, { threshold: .45 });
      this.io.observe(this.loopRef.current);
    } else this.setState({ loop: true });
  }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); if (this.io) this.io.disconnect(); }

  render() {
    const { narrow, menu, loop } = this.state;
    return (
      <div style={s(`background:#F4F2E6;color:#14231A;font-family:'DM Sans',sans-serif;overflow-x:clip;-webkit-font-smoothing:antialiased`)}>
        <header style={s(`position:sticky;top:0;z-index:60;border-radius:0 0 26px 20px / 0 0 20px 26px;background:linear-gradient(180deg,rgba(250,248,240,.78),rgba(244,242,230,.6));backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -1px 0 rgba(255,255,255,.35),0 1px 0 rgba(20,35,26,.06),0 10px 30px -18px rgba(20,35,26,.25)`)}>
          <div style={s(`${W};height:68px;display:flex;align-items:center;justify-content:space-between;gap:24px`)}>
            <a href="/" style={s(`display:flex;align-items:center;gap:10px;color:#14231A`)}>
              <img src="/assets/v5/norma-icon.png" alt="" width="30" height="30" style={s(`display:block;border-radius:9px`)} />
              <span style={s(`font:400 23px/1 'DM Serif Display',serif;letter-spacing:-.2px`)}>nørma</span>
            </a>
            <div style={s(`display:flex;align-items:center;gap:28px`)}>
              {!narrow ? (
                <nav style={s(`display:flex;align-items:center;gap:28px;font:500 14px 'DM Sans',sans-serif`)}>
                  {NAV.map(([href, label]) => <a key={href} href={href} aria-current={href === '/our-story/' ? 'page' : undefined} style={s(href === '/our-story/' ? `color:#14231A;padding:4px 0 2px;border-bottom:2px solid #D3E45F` : `color:rgba(20,35,26,.72)`)} className="os-nav">{label}</a>)}
                </nav>
              ) : null}
              <div style={s(`display:flex;align-items:center;gap:10px`)}>
                <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:44px;padding:0 16px;white-space:nowrap;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 13px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px rgba(217,234,110,.22)`)} className="os-press">Book a demo</a>
                {narrow ? (
                  <button type="button" onClick={() => this.setState(st => ({ menu: !st.menu }))} aria-label="Menu" aria-expanded={menu} style={s(`width:40px;height:40px;border-radius:999px;border:1px solid rgba(20,35,26,.16);background:transparent;display:flex;align-items:center;justify-content:center;color:#14231A;cursor:pointer;padding:0`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 8h16"></path><path d="M4 16h16"></path></svg>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          {narrow && menu ? (
            <nav style={s(`padding:8px clamp(20px,5vw,48px) 20px;display:flex;flex-direction:column;border-top:1px solid rgba(20,35,26,.07);font:400 22px 'DM Serif Display',serif`)}>
              {NAV.map(([href, label], i) => <a key={href} href={href} style={s(`padding:12px 0;${i < NAV.length - 1 ? 'border-bottom:1px solid rgba(20,35,26,.08);' : ''}color:#14231A`)}>{label}</a>)}
            </nav>
          ) : null}
        </header>

        {/* Hero: who it comes from. Ian stands in the same doorway arch as Home's hero. */}
        <section style={s(`position:relative;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;right:-14%;top:-22%;width:62%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.42),rgba(217,234,110,0) 72%);pointer-events:none`)}></div>
          <div data-m="os-hero" style={s(`position:relative;${W};padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(110px,13vw,180px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,6vw,88px)`)}>
            <div style={s(`flex:1 1 380px;min-width:0;max-width:560px`)}>
              <span style={s(`${EYEBROW};color:rgba(20,35,26,.6)`)}>Our story</span>
              <h1 style={s(`margin:16px 0 0;font:400 clamp(46px,6vw,76px)/1.02 'DM Serif Display',serif;letter-spacing:-1px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance;padding-bottom:.14em;margin-bottom:-.14em`)}>From leaders, for leaders.</h1>
              <p style={s(`${BODY};margin-top:28px;max-width:29em;color:rgba(20,35,26,.72)`)}>
                Ian Williams stepped into his first leadership role at seventeen, growing up in Liverpool. Since then he has spent more than two decades leading teams in some of the world’s largest organisations, across three continents.
              </p>
              <p style={s(`${BODY};max-width:29em;color:rgba(20,35,26,.72)`)}>
                nørma comes out of what he saw in those rooms. It’s built for the leaders sitting in them now.
              </p>
            </div>
            <figure data-m="os-portrait" style={s(`flex:0 1 420px;min-width:0;margin:0 auto`)}>
              <div style={s(`position:relative;width:100%;aspect-ratio:420/520;overflow:hidden;border-radius:210px 210px 30px 24px / 210px 210px 30px 24px;background:radial-gradient(64% 42% at 50% 22%,rgba(217,234,110,.6) 0%,rgba(217,234,110,.16) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 52%,#E4DFCA 100%);box-shadow:inset 0 0 0 1px rgba(20,35,26,.05)`)}>
                <img src="/assets/v5/story/ian-portrait.webp" alt="Ian Williams" width="900" height="802" style={s(`position:absolute;left:50%;bottom:0;width:128%;max-width:none;height:auto;transform:translateX(-50%)`)} />
              </div>
              <figcaption style={s(`margin-top:16px;text-align:center;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(20,35,26,.6)`)}>
                Ian Williams, founder of The Artistry of Humanity, the team behind nørma
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Where it starts: the cluttered mind, and the way out of the loop. */}
        <section id="cluttered-mind" style={s(`${TOP_A};background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;left:-14%;bottom:-20%;width:56%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.08),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
          <div style={s(`position:relative;${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(48px,6vw,96px)`)}>
            <div style={s(`flex:1 1 420px;min-width:0;max-width:600px`)}>
              <span style={s(`${EYEBROW};color:#DCEC85`)}>Where it starts</span>
              <h2 style={s(`${H2};color:#F6F4E9`)}>Most problems at work start with a cluttered mind.</h2>
              <p style={s(`${BODY};color:rgba(201,212,194,.9)`)}>
                Disengagement, poor productivity, good people running on empty. Ian has seen all of it up close, and it nearly always leads back to the same place: a person who isn’t firing on all cylinders.
              </p>
              <p style={s(`${BODY};color:rgba(201,212,194,.9)`)}>
                That person usually has a cluttered mind. Everything competes for their attention, the same thoughts run round and round, and there’s no room left to notice what is actually going on inside them. Underneath it sits a lack of awareness and a lack of presence.
              </p>
              <Quote dark text="At the root of suffering is a lack of awareness and a lack of presence. We become the emotion, which we are not. When you’re aware and present, you can helicopter out of that loop." />
            </div>
            <div data-m="os-loop" style={s(`flex:1 1 320px;min-width:0;max-width:440px;margin:0 auto`)}>
              <svg ref={this.loopRef} viewBox="0 0 400 440" role="img" aria-label="Thoughts going round and round in a loop, and a line rising out of it: aware and present" style={s(`display:block;width:100%;height:auto;overflow:visible`)}>
                <defs>
                  <radialGradient id="os-glow"><stop offset="0" stopColor="#D9EA6E" stopOpacity=".55" /><stop offset="1" stopColor="#D9EA6E" stopOpacity="0" /></radialGradient>
                </defs>
                <g fill="none" stroke="rgba(244,242,230,.24)" strokeWidth="1.5">
                  <ellipse cx="200" cy="330" rx="128" ry="46" transform="rotate(-10 200 330)" />
                  <ellipse cx="196" cy="334" rx="112" ry="54" transform="rotate(14 196 334)" />
                  <ellipse cx="204" cy="326" rx="96" ry="38" transform="rotate(-26 204 326)" />
                  <ellipse cx="200" cy="332" rx="138" ry="32" transform="rotate(4 200 332)" />
                  <ellipse cx="198" cy="328" rx="76" ry="46" transform="rotate(30 198 328)" />
                </g>
                <text x="200" y="420" textAnchor="middle" style={s(`font:600 13px 'DM Sans',sans-serif;letter-spacing:2.4px;fill:rgba(201,212,194,.62)`)}>ROUND AND ROUND</text>
                <path d="M200 330C200 268 146 236 178 178S270 128 256 76" fill="none" stroke="#D9EA6E" strokeWidth="2.5" strokeLinecap="round" pathLength="100" strokeDasharray="100" style={s(`stroke-dashoffset:${loop ? 0 : 100};transition:stroke-dashoffset 2.4s cubic-bezier(.22,.61,.36,1) .2s`)} />
                <g style={s(`opacity:${loop ? 1 : 0};transition:opacity .8s ease 2.2s`)}>
                  <circle cx="256" cy="76" r="44" fill="url(#os-glow)" />
                  <circle cx="256" cy="76" r="7" fill="#D9EA6E" />
                  <text x="236" y="40" textAnchor="end" style={s(`font:600 13px 'DM Sans',sans-serif;letter-spacing:2.4px;fill:#DCEC85`)}>AWARE AND PRESENT</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* The gift: Ian's line as the headline, his reasoning beside the photo. */}
        <section id="the-gift" style={s(`${TOP_B};background:#F4F2E6;color:#14231A`)}>
          <div style={s(`${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`max-width:900px;margin:0 auto;text-align:center`)}>
              <span style={s(`${EYEBROW};color:#4A6B3A`)}>A responsibility</span>
              <h2 style={s(`margin:16px auto 0;font:400 clamp(36px,4.8vw,60px)/1.06 'DM Serif Display',serif;letter-spacing:-.8px;color:#14231A;text-wrap:balance`)}>The greatest gift an organisation can give its people is access to themselves.</h2>
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,6vw,88px);margin-top:clamp(56px,7vw,96px)`)}>
              <figure style={s(`flex:1.15 1 380px;min-width:0;margin:0`)}>
                <img src="/assets/v5/story/ian-session.webp" alt="Ian Williams running a leadership session in front of a projector screen and flip-chart notes" width="1024" height="683" loading="lazy" style={s(`display:block;width:100%;height:auto;border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;box-shadow:0 36px 70px -36px rgba(20,35,26,.45)`)} />
                <figcaption style={s(`margin-top:14px;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(20,35,26,.6)`)}>Ian running a leadership session.</figcaption>
              </figure>
              <div style={s(`flex:1 1 340px;min-width:0;max-width:520px`)}>
                <p style={s(`${BODY};margin-top:0;color:rgba(20,35,26,.74)`)}>
                  Most of our waking hours go to work, and work often comes home with us in our heads. By the nature of the work people do for us, we take them away from themselves.
                </p>
                <p style={s(`${BODY};color:rgba(20,35,26,.74)`)}>
                  Giving that back isn’t a nice-to-have. Ian sees it as a responsibility every organisation carries.
                </p>
                <Quote text="So here’s our gift back to our people: a system of awareness. And then everybody wins." />
              </div>
            </div>
          </div>
        </section>

        {/* Both sides: what the system of awareness is, and where to see each half. */}
        <section id="both-sides" style={s(`${TOP_A};background:#ECE8D7;color:#14231A`)}>
          <div style={s(`${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`max-width:720px;margin:0 auto;text-align:center`)}>
              <span style={s(`${EYEBROW};color:#4A6B3A`)}>A system of awareness</span>
              <h2 style={s(`${H2};color:#14231A`)}>Awareness, on both sides.</h2>
              <p style={s(`${BODY};margin-left:auto;margin-right:auto;max-width:32em;color:rgba(20,35,26,.72)`)}>nørma gives that awareness to your people and to you. Each side sees what it needs to, and nothing more.</p>
            </div>
            <div style={s(`position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:18px;max-width:1000px;margin:clamp(44px,5.5vw,72px) auto 0`)}>
              <div style={s(`position:relative;box-sizing:border-box;padding:clamp(28px,3.4vw,44px);border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;background:linear-gradient(150deg,rgba(250,248,240,.8),rgba(244,242,230,.55));box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 0 1px rgba(255,255,255,.45),0 30px 60px -34px rgba(20,35,26,.3);display:flex;flex-direction:column`)}>
                <span style={s(`${EYEBROW};color:#4A6B3A`)}>For your people</span>
                <h3 style={s(`margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;text-wrap:balance;color:#14231A`)}>Where their life is at.</h3>
                <p style={s(`margin:14px 0 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>Their own app. A three-minute check-in once a month shows them where they stand across health, relationships, friendships, inner life and work, and the app helps them act on it. What they do there stays theirs.</p>
                <a href="/your-people/" style={s(`margin-top:auto;padding-top:24px;display:inline-flex;align-items:center;gap:6px;font:600 15px 'DM Sans',sans-serif;color:#14231A`)} className="os-link">Meet the app <span aria-hidden="true">›</span></a>
              </div>
              <div style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:clamp(28px,3.4vw,44px);border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;background:linear-gradient(150deg,rgba(11,24,16,.97),rgba(15,32,21,.92));color:#F4F2E6;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 0 0 1px rgba(255,255,255,.08),0 36px 70px -30px rgba(20,35,26,.5);display:flex;flex-direction:column`)}>
                <div aria-hidden="true" style={s(`position:absolute;right:-24%;top:-44%;width:80%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.14),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
                <span style={s(`position:relative;${EYEBROW};color:#DCEC85`)}>For you</span>
                <h3 style={s(`position:relative;margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;text-wrap:balance;color:#F6F4E9`)}>Where your culture is at.</h3>
                <p style={s(`position:relative;margin:14px 0 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>A dashboard for the organisation, each department and each team, from groups of five or more. You see where to look, what to try, and whether it worked.</p>
                <a href="/for-leaders/" style={s(`position:relative;margin-top:auto;padding-top:24px;display:inline-flex;align-items:center;gap:6px;font:600 15px 'DM Sans',sans-serif;color:#EAF79B`)} className="os-link-dark">See the dashboard <span aria-hidden="true">›</span></a>
              </div>
            </div>
            <p style={s(`margin:clamp(44px,5.5vw,64px) auto 0;max-width:22em;text-align:center;font:400 clamp(24px,2.6vw,32px)/1.25 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A;text-wrap:balance`)}>
              Your people get access to themselves. You get a clear view of your culture. That’s what Ian means by everybody wins.
            </p>
          </div>
        </section>

        {/* The name. */}
        <section id="the-name" style={s(`${TOP_B};background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;right:-12%;top:-16%;width:58%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.1),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
          <div style={s(`position:relative;${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`text-align:center`)}>
              <span style={s(`${EYEBROW};color:#DCEC85`)}>The name</span>
              <h2 style={s(`${H2};color:#F6F4E9`)}>Why it’s called nørma.</h2>
              <p aria-hidden="true" style={s(`margin:clamp(28px,4vw,48px) 0 0;font:400 clamp(104px,19vw,240px)/1 'DM Serif Display',serif;letter-spacing:-.04em;color:#F6F4E9`)}>
                n<span style={s(`background:linear-gradient(160deg,#F1FAB4 10%,#D9EA6E 55%,#A9C23A 95%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent`)}>ø</span>rma
              </p>
              <p style={s(`${BODY};margin-top:clamp(20px,2.5vw,28px);color:rgba(201,212,194,.9)`)}>Three things came together in one word.</p>
            </div>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:40px clamp(32px,4vw,56px);max-width:1040px;margin:clamp(48px,6vw,80px) auto 0`)}>
              {NAME.map(n => (
                <div key={n.title} style={s(`min-width:0`)}>
                  <Icon>{n.icon}</Icon>
                  <h3 style={s(`margin:22px 0 0;font:400 clamp(24px,2.4vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>{n.title}</h3>
                  <p style={s(`margin:12px 0 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.88);text-wrap:pretty`)}>{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Close, as on For leaders. */}
        <section style={s(`${TOP_A};background:#F4F2E6;color:#14231A`)}>
          <div style={s(`${W};padding-top:clamp(88px,11vw,152px);padding-bottom:clamp(72px,9vw,120px)`)}>
            <div style={s(`position:relative;max-width:620px;margin:0 auto;box-sizing:border-box;padding:clamp(72px,9vw,120px) clamp(24px,5vw,64px) clamp(52px,6vw,80px);text-align:center`)}>
              <div aria-hidden="true" style={s(`position:absolute;inset:0;border-radius:310px 310px 32px 26px / 310px 310px 32px 26px;background:radial-gradient(62% 40% at 50% 16%,rgba(217,234,110,.5) 0%,rgba(217,234,110,.14) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 50%,#ECE8D7 100%)`)}></div>
              <div style={s(`position:relative`)}>
                <img src="/assets/v5/norma-happy.png" alt="" width="92" height="124" style={s(`display:block;margin:0 auto;filter:drop-shadow(0 0 1px rgba(20,35,26,.7)) drop-shadow(0 14px 20px rgba(20,35,26,.16))`)} />
                <h2 style={s(`margin:26px auto 0;max-width:11em;font:400 clamp(40px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;text-wrap:balance`)}>Give your people access to themselves.</h2>
                <p style={s(`margin:20px auto 0;max-width:24em;font:400 clamp(17px,1.4vw,19px)/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.7);text-wrap:pretty`)}>Thirty minutes with the team behind nørma. We’ll show you the app your people use and the dashboard you’d use alongside it.</p>
                <div style={s(`display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:34px`)}>
                  <a href="/book-a-demo/" style={s(`display:inline-flex;align-items:center;height:54px;padding:0 28px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);color:#152213;font:600 15.5px 'DM Sans',sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 12px 32px rgba(217,234,110,.24)`)} className="os-press">Book a demo</a>
                  <a href="/roi/" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 24px;border-radius:999px;background:#14231A;color:#F4F2E6;font:600 15.5px 'DM Sans',sans-serif`)} className="os-dark os-press">
                    Work out your ROI
                    <span aria-hidden="true">›</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer style={s(`border-top:1px solid rgba(20,35,26,.1)`)}>
          <div style={s(`${W};padding-top:36px;padding-bottom:40px;display:flex;flex-direction:column;gap:28px`)}>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px`)}>
              <a href="/" style={s(`display:flex;align-items:center;gap:10px;color:#14231A`)}>
                <img src="/assets/v5/norma-icon.png" alt="" width="26" height="26" style={s(`display:block;border-radius:8px`)} />
                <span style={s(`font:400 20px/1 'DM Serif Display',serif`)}>nørma</span>
              </a>
              <nav style={s(`display:flex;flex-wrap:wrap;gap:12px 28px;font:500 14px 'DM Sans',sans-serif`)}>
                {[...NAV, ['/help/', 'Help'], ['/book-a-demo/', 'Book a demo']].map(([href, label]) => <a key={href} href={href} style={s(`color:rgba(20,35,26,.72)`)} className="os-nav">{label}</a>)}
              </nav>
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(20,35,26,.08);font:400 12.5px 'DM Sans',sans-serif;color:rgba(20,35,26,.66)`)}>
              <span>© 2026 The Artistry of Humanity Pty Ltd</span>
              <span style={s(`display:flex;flex-wrap:wrap;gap:20px`)}>
                <a href="/privacy/" style={s(`color:rgba(20,35,26,.66)`)} className="os-nav">Privacy policy</a>
                <a href="/terms/" style={s(`color:rgba(20,35,26,.66)`)} className="os-nav">Terms of use</a>
                <a href="/help/" style={s(`color:rgba(20,35,26,.66)`)} className="os-nav">Help centre</a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default OurStory;
