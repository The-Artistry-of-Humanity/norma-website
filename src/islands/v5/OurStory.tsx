// @ts-nocheck
/* Our story (28 Oct 2026). Not from a design handoff: written here in the
   round 5 system (same header, footer, colours, type and section shapes as
   the generated pages), from Ian's own words in the 27 Oct weekly call.
   Ian is the face (photos, quotes, his own section); the rest speaks as "we"
   and names nobody else. */
import React from 'react';
import { s } from '../../lib/s';
import './OurStory.css';

const W = `max-width:1200px;margin:0 auto;padding-left:clamp(20px,5vw,48px);padding-right:clamp(20px,5vw,48px);box-sizing:border-box`;
const EYEBROW = `font:600 11px 'DM Sans',sans-serif;letter-spacing:2.4px;text-transform:uppercase`;
const H2 = `margin:14px 0 0;font:400 clamp(34px,4.2vw,50px)/1.08 'DM Serif Display',serif;letter-spacing:-.6px;text-wrap:balance`;
const BODY = `margin:20px 0 0;font:400 clamp(17px,1.4vw,18.5px)/1.65 'DM Sans',sans-serif;text-wrap:pretty`;
const PAD = `clamp(28px,3.4vw,44px)`;
// Overlapping section tops, alternating the two organic shapes the other pages use.
const TOP_A = `position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(48px,7vw,104px) clamp(28px,4vw,56px) 0 0 / clamp(36px,5vw,72px) clamp(24px,3.5vw,48px) 0 0`;
const TOP_B = `position:relative;z-index:1;margin-top:calc(-1 * clamp(40px,5.5vw,80px));border-radius:clamp(28px,4vw,56px) clamp(52px,7.5vw,112px) 0 0 / clamp(24px,3.5vw,48px) clamp(40px,5.5vw,80px) 0 0`;
const ARCH = `border-radius:210px 210px 30px 24px / 210px 210px 30px 24px`;
const EASE = `cubic-bezier(.22,.61,.36,1)`;

const NAV = [['/your-people/', 'Your people'], ['/for-leaders/', 'For leaders'], ['/roi/', 'ROI'], ['/our-story/', 'Our story']];

const Quote = ({ text, dark }) => (
  <figure style={s(`margin:clamp(32px,4vw,44px) 0 0;padding:0`)}>
    <span aria-hidden="true" style={s(`display:block;height:44px;font:400 84px/1 'DM Serif Display',serif;color:${dark ? '#D9EA6E' : '#6E8A1C'}`)}>“</span>
    <blockquote style={s(`margin:0;font:italic 400 clamp(23px,2.3vw,29px)/1.32 'DM Serif Display',serif;letter-spacing:-.2px;color:${dark ? '#F6F4E9' : '#14231A'};text-wrap:pretty`)}>{text}</blockquote>
    <figcaption style={s(`margin-top:16px;${EYEBROW};color:${dark ? 'rgba(220,236,133,.85)' : '#4A6B3A'}`)}>Ian Williams</figcaption>
  </figure>
);

/* The gift: attention scattered in every direction gathers into a calm ring
   around one lit centre. Positions are seeded so server and client agree. */
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(20261028);
const DASHES = Array.from({ length: 40 }, (_, i) => {
  const a = (i / 40) * Math.PI * 2, b = rnd() * Math.PI * 2, d = 150 + rnd() * 70;
  return {
    to: [220 + Math.cos(a) * 128, 210 + Math.sin(a) * 128, (a * 180) / Math.PI],
    from: [Math.max(14, Math.min(426, 220 + Math.cos(b) * d)), Math.max(14, Math.min(400, 210 + Math.sin(b) * d)), rnd() * 360],
    o: .35 + rnd() * .4,
  };
});
const Gather = ({ on }) => (
  <svg viewBox="0 0 440 450" role="img" aria-label="Short strokes scattered in every direction gather into a calm ring around one lit centre" style={s(`display:block;width:100%;height:auto;overflow:visible`)}>
    <defs>
      <radialGradient id="os-core"><stop offset="0" stopColor="#D9EA6E" stopOpacity=".75" /><stop offset=".5" stopColor="#D9EA6E" stopOpacity=".22" /><stop offset="1" stopColor="#D9EA6E" stopOpacity="0" /></radialGradient>
    </defs>
    <circle cx="220" cy="210" r="112" fill="url(#os-core)" style={s(`transform-box:fill-box;transform-origin:center;transform:scale(${on ? 1 : .2});opacity:${on ? 1 : .5};transition:transform 1.8s ${EASE} .9s,opacity 1.8s ease .9s`)} />
    {DASHES.map((d, i) => {
      const [x, y, r] = on ? d.to : d.from;
      return (
        <g key={i} style={s(`transform:translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg);opacity:${on ? .7 : d.o};transition:transform 1.7s ${EASE} ${(i % 10) * 45}ms,opacity 1.7s ease`)}>
          <line x1="-9" y1="0" x2="9" y2="0" stroke="#14231A" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    })}
    <circle cx="220" cy="210" r="9" fill="#C4D94A" style={s(`transform-box:fill-box;transform-origin:center;transform:scale(${on ? 1 : .5});transition:transform 1.2s ${EASE} 1.1s`)} />
    <text x="220" y="438" textAnchor="middle" style={s(`font:600 13px 'DM Sans',sans-serif;letter-spacing:2.4px;fill:rgba(20,35,26,.5);opacity:${on ? 0 : 1};transition:opacity .6s ease .6s`)}>PULLED IN EVERY DIRECTION</text>
    <text x="220" y="438" textAnchor="middle" style={s(`font:600 13px 'DM Sans',sans-serif;letter-spacing:2.4px;fill:#4A6B3A;opacity:${on ? 1 : 0};transition:opacity .8s ease 1.8s`)}>BACK TO THEMSELVES</text>
  </svg>
);

// The shared words, in each pillar's colour from the app (dark-background set).
const WORDS = [['Health', '#A9DDB4'], ['Internal', '#C4BEEE'], ['Love', '#F0BDB5'], ['Social', '#F2DAAC'], ['Work', '#AAD7E3'], ['Culture', '#D9EA6E']];

const SHARED = [
  ['Shared awareness.', 'Your people check in on the five pillars: Health, Internal, Love, Social and Work. You see the same five on your dashboard, plus whether people feel heard, valued and safe to speak. Both sides are looking at the same picture.'],
  ['Shared accountability.', 'Each side owns its part. Your people own their wellbeing, and the app helps them work on it. You own the culture they work in, and the dashboard shows where it needs attention and whether what you tried has worked.'],
  ['Shared language.', 'The pillars don’t stay in the app. People start using them in one-to-ones, in team meetings, over coffee. Over time it’s simply how your organisation talks about how people are going, and it becomes part of your culture.'],
];

const Icon = ({ children }) => (
  <span aria-hidden="true" style={s(`display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:20px 16px 20px 14px / 16px 20px 14px 20px;background:rgba(217,234,110,.12);color:#D9EA6E`)}>
    <svg width="30" height="30" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
  </span>
);

const NAME = [
  {
    icon: <><path d="M7 6h8v23h22v8H7z" /><path d="M15 12h-3.5M15 17h-3.5M15 22h-3.5M21 29v3.5M26 29v3.5M31 29v3.5" /></>,
    title: 'The carpenter’s square',
    text: 'In Latin, norma is the carpenter’s square, the tool that shows whether a corner is true. It’s where the word norm comes from. nørma does the same for people: it shows them where they truly stand.',
  },
  {
    icon: <><circle cx="22" cy="22" r="11" /><path d="M11 35L33 9" /></>,
    title: 'A line through the norm',
    text: 'The ø puts a line through the norm. In German it’s also the sign for an average. Busy, distracted and running on empty has become normal at work, and we don’t accept that as the standard.',
  },
  {
    icon: <><path d="M12 36h20" /><path d="M22 36V21" /><path d="M22 25c-7 0-11-4-11-10 6 0 11 4 11 10z" /><path d="M22 21c0-6 4-10 11-10 0 6-4 10-11 10z" /></>,
    title: 'Norma',
    text: 'nørma is also named after a real person: Ian’s mum, Norma. She’s the most resilient person he knows, and a real inspiration for the values that shape everything nørma stands for.',
  },
];

const Word = () => <>n<span className="os-o">ø</span>rma</>;

class OurStory extends React.Component {
  state = { narrow: false, menu: false, loop: false, gift: false, shared: false, word: false };
  watch = {};
  at = key => el => { if (el) this.watch[key] = el; };
  componentDidMount() {
    this.onResize = () => { const n = window.innerWidth < 760; if (n !== this.state.narrow) this.setState({ narrow: n, menu: n ? this.state.menu : false }); };
    window.addEventListener('resize', this.onResize); this.onResize();
    // Each drawing plays once, when it's properly on screen.
    const keys = Object.keys(this.watch);
    if (!window.IntersectionObserver) { this.setState(Object.fromEntries(keys.map(k => [k, true]))); return; }
    this.io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const k = e.target.dataset.watch; this.setState({ [k]: true }); this.io.unobserve(e.target);
    }), { threshold: .4 });
    keys.forEach(k => { this.watch[k].dataset.watch = k; this.io.observe(this.watch[k]); });
  }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); if (this.io) this.io.disconnect(); }

  render() {
    const { narrow, menu, loop, gift, shared, word } = this.state;
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

        {/* Hero: who it's from, in the team's voice, with Ian in the doorway arch from Home. */}
        <section style={s(`position:relative;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;right:-14%;top:-22%;width:62%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.42),rgba(217,234,110,0) 72%);pointer-events:none`)}></div>
          <div style={s(`position:relative;${W};padding-top:clamp(40px,7vw,96px);padding-bottom:clamp(110px,13vw,180px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,6vw,88px)`)}>
            <div style={s(`flex:1 1 380px;min-width:0;max-width:560px`)}>
              <span style={s(`${EYEBROW};color:rgba(20,35,26,.6)`)}>Our story</span>
              <h1 style={s(`margin:16px 0 0;font:400 clamp(46px,6vw,76px)/1.02 'DM Serif Display',serif;letter-spacing:-1px;color:#14231A;background:linear-gradient(105deg,#14231A 12%,#2C4A24 52%,#6E8A1C 92%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-wrap:balance;padding-bottom:.14em;margin-bottom:-.14em`)}>From leaders, <span className="nrm-mark">for leaders</span>.</h1>
              <p style={s(`${BODY};margin-top:28px;max-width:29em;color:rgba(20,35,26,.72)`)}>
                Between us, we’ve spent decades leading teams and working alongside the people who run organisations. We’ve seen what brings people to work at their best, and what quietly wears them down.
              </p>
              <p style={s(`${BODY};max-width:29em;color:rgba(20,35,26,.72)`)}>
                nørma comes out of that experience. It’s built for the leaders doing that job now.
              </p>
            </div>
            <figure data-m="os-arch" style={s(`flex:0 1 420px;min-width:0;margin:0 auto`)}>
              <div style={s(`position:relative;width:100%;aspect-ratio:420/520;overflow:hidden;${ARCH};background:#ECE8D7;box-shadow:0 40px 80px -40px rgba(20,35,26,.45)`)}>
                <img src="/assets/v5/story/ian-speaking.webp" alt="Ian Williams speaking to a room of business leaders" width="632" height="783" style={s(`display:block;width:100%;height:100%;object-fit:cover;object-position:50% 30%`)} />
              </div>
              <figcaption style={s(`margin-top:16px;text-align:center;font:400 14px/1.5 'DM Sans',sans-serif;color:rgba(20,35,26,.6)`)}>Ian Williams, founder of The Artistry of Humanity</figcaption>
            </figure>
          </div>
        </section>

        {/* Where it starts: the cluttered mind, and the way out of the loop. */}
        <section id="cluttered-mind" style={s(`${TOP_A};background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;left:-14%;bottom:-20%;width:56%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.08),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
          <div style={s(`position:relative;${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px);display:flex;flex-wrap:wrap;align-items:center;gap:clamp(48px,6vw,96px)`)}>
            <div style={s(`flex:1 1 420px;min-width:0;max-width:600px`)}>
              <span style={s(`${EYEBROW};color:#DCEC85`)}>Where it starts</span>
              <h2 style={s(`${H2};color:#F6F4E9`)}>Most problems at work start with a <span className="nrm-mark nrm-mark-dark">cluttered mind</span>.</h2>
              <p style={s(`${BODY};color:rgba(201,212,194,.9)`)}>
                Disengagement, poor productivity, good people running on empty. We’ve seen all of it up close, and it nearly always leads back to the same place: a person who isn’t firing on all cylinders.
              </p>
              <p style={s(`${BODY};color:rgba(201,212,194,.9)`)}>
                That person usually has a cluttered mind. Everything competes for their attention, the same thoughts run round and round, and there’s no room left to notice what is actually going on inside them. Underneath it sits a lack of awareness and a lack of presence.
              </p>
              <Quote dark text="At the root of suffering is a lack of awareness and a lack of presence. We become the emotion, which we are not. When you’re aware and present, you can helicopter out of that loop." />
            </div>
            <div data-m="os-pic" style={s(`flex:1 1 320px;min-width:0;max-width:440px;margin:0 auto`)}>
              <svg ref={this.at('loop')} viewBox="0 0 400 440" role="img" aria-label="Thoughts going round and round in a loop, and a line rising out of it: aware and present" style={s(`display:block;width:100%;height:auto;overflow:visible`)}>
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
                <path d="M200 330C200 268 146 236 178 178S270 128 256 76" fill="none" stroke="#D9EA6E" strokeWidth="2.5" strokeLinecap="round" pathLength="100" strokeDasharray="100" style={s(`stroke-dashoffset:${loop ? 0 : 100};transition:stroke-dashoffset 2.4s ${EASE} .2s`)} />
                <g style={s(`opacity:${loop ? 1 : 0};transition:opacity .8s ease 2.2s`)}>
                  <circle cx="256" cy="76" r="44" fill="url(#os-glow)" />
                  <circle cx="256" cy="76" r="7" fill="#D9EA6E" />
                  <text x="236" y="40" textAnchor="end" style={s(`font:600 13px 'DM Sans',sans-serif;letter-spacing:2.4px;fill:#DCEC85`)}>AWARE AND PRESENT</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* The gift: the line as headline, the reasoning beside the gathering ring. */}
        <section id="the-gift" style={s(`${TOP_B};background:#F4F2E6;color:#14231A`)}>
          <div style={s(`${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`max-width:900px;margin:0 auto;text-align:center`)}>
              <span style={s(`${EYEBROW};color:#4A6B3A`)}>A responsibility</span>
              <h2 style={s(`margin:16px auto 0;font:400 clamp(36px,4.8vw,60px)/1.06 'DM Serif Display',serif;letter-spacing:-.8px;color:#14231A;text-wrap:balance`)}>The greatest gift an organisation can give its people is <span className="nrm-mark">access to themselves</span>.</h2>
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:clamp(40px,6vw,88px);margin-top:clamp(56px,7vw,96px)`)}>
              <div data-m="os-pic" ref={this.at('gift')} style={s(`flex:1 1 340px;min-width:0;max-width:460px;margin:0 auto`)}>
                <Gather on={gift} />
              </div>
              <div style={s(`flex:1 1 340px;min-width:0;max-width:520px`)}>
                <p style={s(`${BODY};margin-top:0;color:rgba(20,35,26,.74)`)}>
                  Most of our waking hours go to work, and work often comes home with us in our heads. By the nature of the work people do for us, we take them away from themselves.
                </p>
                <p style={s(`${BODY};color:rgba(20,35,26,.74)`)}>
                  Giving that back isn’t a nice-to-have. We see it as a responsibility every organisation carries.
                </p>
                <Quote text="So here’s our gift back to our people: a system of awareness. And then everybody wins." />
              </div>
            </div>
          </div>
        </section>

        {/* Both sides: what the system of awareness is, each half with its own picture. */}
        <section id="both-sides" style={s(`${TOP_A};background:#ECE8D7;color:#14231A`)}>
          <div style={s(`${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`max-width:720px;margin:0 auto;text-align:center`)}>
              <span style={s(`${EYEBROW};color:#4A6B3A`)}>A system of awareness</span>
              <h2 style={s(`${H2};color:#14231A`)}>Awareness, on both sides.</h2>
              <p style={s(`${BODY};margin-left:auto;margin-right:auto;max-width:32em;color:rgba(20,35,26,.72)`)}>nørma gives that awareness to your people and to you. Each side sees what it needs to, and nothing more.</p>
            </div>
            <div style={s(`position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:18px;max-width:1000px;margin:clamp(44px,5.5vw,72px) auto 0`)}>
              <div style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:${PAD};border-radius:20px 32px 22px 30px / 32px 22px 30px 20px;background:linear-gradient(150deg,rgba(250,248,240,.8),rgba(244,242,230,.55));box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 0 1px rgba(255,255,255,.45),0 30px 60px -34px rgba(20,35,26,.3);display:flex;flex-direction:column`)}>
                <div aria-hidden="true" style={s(`position:relative;height:clamp(230px,24vw,270px);margin:calc(-1 * ${PAD}) calc(-1 * ${PAD}) 30px;overflow:hidden;background:radial-gradient(60% 80% at 50% 100%,rgba(217,234,110,.55),rgba(217,234,110,.12) 60%,rgba(217,234,110,0) 85%),#ECEBD8`)}>
                  <div style={s(`position:absolute;left:50%;top:30px;width:190px;aspect-ratio:390/844;box-sizing:border-box;padding:6px;border-radius:34px;background:#0B140E;transform:translateX(-50%) rotate(-3deg);box-shadow:0 30px 50px -24px rgba(20,35,26,.5)`)}>
                    <div style={s(`width:100%;height:100%;border-radius:29px;overflow:hidden;background:#F4F2E6`)}>
                      <img src="/assets/v5/light/app-where-you-stand.webp" alt="" loading="lazy" style={s(`display:block;width:100%;height:100%;object-fit:cover;object-position:top`)} />
                    </div>
                  </div>
                </div>
                <span style={s(`${EYEBROW};color:#4A6B3A`)}>For your people</span>
                <h3 style={s(`margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;text-wrap:balance;color:#14231A`)}>Where their life is at.</h3>
                <p style={s(`margin:12px 0 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(20,35,26,.72);text-wrap:pretty`)}>Their own app. A three-minute monthly check-in shows where they stand across five pillars of life, and the app helps them act on it. It all stays theirs.</p>
                <a href="/your-people/" style={s(`margin-top:auto;padding-top:22px;display:inline-flex;align-items:center;gap:6px;font:600 15px 'DM Sans',sans-serif;color:#14231A`)} className="os-link">Meet the app <span aria-hidden="true">›</span></a>
              </div>
              <div style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:${PAD};border-radius:30px 20px 32px 22px / 22px 32px 20px 30px;background:linear-gradient(150deg,rgba(11,24,16,.97),rgba(15,32,21,.92));color:#F4F2E6;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 0 0 1px rgba(255,255,255,.08),0 36px 70px -30px rgba(20,35,26,.5);display:flex;flex-direction:column`)}>
                <div aria-hidden="true" style={s(`position:relative;height:clamp(230px,24vw,270px);margin:calc(-1 * ${PAD}) calc(-1 * ${PAD}) 30px;overflow:hidden;background:radial-gradient(60% 80% at 50% 100%,rgba(217,234,110,.2),rgba(217,234,110,0) 75%),#13261A`)}>
                  <div style={s(`position:absolute;left:14%;top:44px;width:46%;border-radius:18px;overflow:hidden;transform:rotate(-5deg);opacity:.85;box-shadow:0 24px 40px -20px rgba(0,0,0,.6)`)}>
                    <img src="/assets/v5/light/m-score-card.webp" alt="" loading="lazy" style={s(`display:block;width:106%;margin:-3%;height:auto`)} />
                  </div>
                  <div style={s(`position:absolute;right:9%;top:76px;width:60%;border-radius:18px;overflow:hidden;transform:rotate(2deg);box-shadow:0 30px 50px -22px rgba(0,0,0,.65)`)}>
                    <img src="/assets/v5/light/m-culture-card.webp" alt="" loading="lazy" style={s(`display:block;width:106%;margin:-3%;height:auto`)} />
                  </div>
                </div>
                <span style={s(`position:relative;${EYEBROW};color:#DCEC85`)}>For you</span>
                <h3 style={s(`position:relative;margin:12px 0 0;font:400 clamp(28px,3vw,36px)/1.1 'DM Serif Display',serif;letter-spacing:-.4px;text-wrap:balance;color:#F6F4E9`)}>Where your culture is at.</h3>
                <p style={s(`position:relative;margin:12px 0 0;font:400 16.5px/1.6 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>A dashboard for the organisation, each department and each team, from groups of five or more. Where to look, what to try, and whether it worked.</p>
                <a href="/for-leaders/" style={s(`position:relative;margin-top:auto;padding-top:22px;display:inline-flex;align-items:center;gap:6px;font:600 15px 'DM Sans',sans-serif;color:#EAF79B`)} className="os-link-dark">See the dashboard <span aria-hidden="true">›</span></a>
              </div>
            </div>
            <p style={s(`margin:clamp(44px,5.5vw,64px) auto 0;max-width:22em;text-align:center;font:400 clamp(24px,2.6vw,32px)/1.25 'DM Serif Display',serif;letter-spacing:-.3px;color:#14231A;text-wrap:balance`)}>
              Your people get access to themselves. You get a clear view of your culture. That’s what we mean by everybody wins.
            </p>
          </div>
        </section>

        {/* Shared awareness, accountability and language: both sides meet in the same words. */}
        <section id="shared" style={s(`${TOP_B};background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;right:-16%;top:-10%;width:60%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.09),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
          <div style={s(`position:relative;${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`max-width:760px;margin:0 auto;text-align:center`)}>
              <span style={s(`${EYEBROW};color:#DCEC85`)}>Shared awareness, accountability and language</span>
              <h2 style={s(`${H2};color:#F6F4E9`)}>Both sides, on the same page.</h2>
              <p style={s(`${BODY};margin-left:auto;margin-right:auto;max-width:32em;color:rgba(201,212,194,.9)`)}>Awareness only moves things when both sides can talk about it, and both sides own their part.</p>
            </div>
            <div ref={this.at('shared')} className={shared ? 'os-share os-on' : 'os-share'} style={s(`max-width:760px;margin:clamp(48px,6vw,72px) auto 0;display:flex;flex-direction:column;align-items:center`)}>
              <span style={s(`display:inline-flex;align-items:center;height:46px;padding:0 22px;border-radius:999px;background:rgba(244,242,230,.1);box-shadow:inset 0 0 0 1px rgba(244,242,230,.16);font:600 15px 'DM Sans',sans-serif;color:#F6F4E9`)}>Your people</span>
              <span className="os-wire os-wire-down" aria-hidden="true"></span>
              <ul aria-label="The words both sides share" style={s(`list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:10px`)}>
                {WORDS.map(([w, c], i) => (
                  <li key={w} className="os-chip" style={s(`--d:${300 + i * 90}ms;display:inline-flex;align-items:center;gap:9px;height:42px;padding:0 18px 0 14px;border-radius:999px;background:rgba(228,240,214,.07);box-shadow:inset 0 0 0 1px rgba(228,240,214,.1);font:500 15px 'DM Sans',sans-serif;color:#F4F2E6`)}>
                    <span aria-hidden="true" style={s(`width:10px;height:10px;border-radius:50%;background:${c}`)}></span>{w}
                  </li>
                ))}
              </ul>
              <span className="os-wire os-wire-up" aria-hidden="true"></span>
              <span style={s(`display:inline-flex;align-items:center;height:46px;padding:0 22px;border-radius:999px;background:linear-gradient(180deg,#E9F693,#D3E45F);font:600 15px 'DM Sans',sans-serif;color:#152213`)}>You</span>
            </div>
            <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:36px clamp(32px,4vw,56px);max-width:1080px;margin:clamp(56px,7vw,88px) auto 0`)}>
              {SHARED.map(([t, p]) => (
                <div key={t}>
                  <h3 style={s(`margin:0;font:400 clamp(24px,2.4vw,28px)/1.15 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9`)}>{t}</h3>
                  <p style={s(`margin:12px 0 0;font:400 16.5px/1.65 'DM Sans',sans-serif;color:rgba(201,212,194,.9);text-wrap:pretty`)}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Ian: his backstory, with the cut-out portrait in the arch. */}
        <section id="ian" style={s(`${TOP_A};background:#F4F2E6;color:#14231A`)}>
          <div style={s(`${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px);display:flex;flex-wrap:wrap-reverse;align-items:center;gap:clamp(40px,6vw,88px)`)}>
            <figure data-m="os-arch" style={s(`flex:0 1 400px;min-width:0;margin:0 auto`)}>
              <div style={s(`position:relative;width:100%;aspect-ratio:420/520;overflow:hidden;${ARCH};background:radial-gradient(64% 42% at 50% 22%,rgba(217,234,110,.6) 0%,rgba(217,234,110,.16) 55%,rgba(217,234,110,0) 82%),linear-gradient(180deg,#E8EACB 0%,#ECE8D7 52%,#E4DFCA 100%);box-shadow:inset 0 0 0 1px rgba(20,35,26,.05)`)}>
                <img src="/assets/v5/story/ian-portrait.webp" alt="Ian Williams" width="900" height="802" loading="lazy" style={s(`position:absolute;left:50%;bottom:0;width:128%;max-width:none;height:auto;transform:translateX(-50%)`)} />
              </div>
            </figure>
            <div style={s(`flex:1 1 380px;min-width:0;max-width:560px`)}>
              <span style={s(`${EYEBROW};color:#4A6B3A`)}>Meet Ian</span>
              <h2 style={s(`${H2};color:#14231A`)}><span className="nrm-mark">Leading people</span> since he was seventeen.</h2>
              <p style={s(`${BODY};color:rgba(20,35,26,.72)`)}>
                Ian Williams stepped into his first leadership role at seventeen, growing up in Liverpool. Since then he has spent more than thirty years leading teams in some of the world’s largest organisations, across three continents.
              </p>
              <p style={s(`${BODY};color:rgba(20,35,26,.72)`)}>
                Today he’s the founder and CEO of The Artistry of Humanity, the team behind nørma, and works with leadership teams as a consultant, facilitator and speaker. The thinking on this page is what he brings into those rooms.
              </p>
            </div>
          </div>
        </section>

        {/* The name: the word itself is the headline, lit by a passing torch on arrival. */}
        <section id="the-name" style={s(`${TOP_B};background:#0F2015;color:#F4F2E6;overflow:hidden`)}>
          <div aria-hidden="true" style={s(`position:absolute;right:-12%;top:-16%;width:58%;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(217,234,110,.1),rgba(217,234,110,0) 70%);pointer-events:none`)}></div>
          <div style={s(`position:relative;${W};padding-top:clamp(96px,11vw,152px);padding-bottom:clamp(110px,13vw,180px)`)}>
            <div style={s(`text-align:center`)}>
              <span style={s(`display:block;${EYEBROW};color:#DCEC85`)}>Where the name comes from</span>
              <h2 ref={this.at('word')} aria-label="nørma" className={word ? 'os-word os-lit' : 'os-word'}>
                <span className="os-word-base" aria-hidden="true"><Word /></span>
                <span className="os-word-lit" aria-hidden="true"><Word /></span>
                <span className="os-beam" aria-hidden="true"></span>
              </h2>
              <p style={s(`${BODY};margin-top:clamp(14px,2vw,22px);color:rgba(201,212,194,.9)`)}>Three things came together in one word.</p>
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
                <h2 style={s(`margin:26px auto 0;max-width:11em;font:400 clamp(40px,5.4vw,66px)/1.04 'DM Serif Display',serif;letter-spacing:-.9px;color:#14231A;text-wrap:balance`)}>Give your people <span className="nrm-mark">access to themselves</span>.</h2>
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
