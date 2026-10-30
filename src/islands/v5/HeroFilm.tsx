import React, { useEffect, useRef, useState } from 'react';
import { s } from '../../lib/s';

/* The onboarding film, in the hero's centre phone. It never starts by itself: a
   lime button plays it with sound on, so nobody misses the beginning, and nothing
   downloads until then. While it plays there are pause and sound buttons on the
   phone. It pauses when scrolled away and goes back to its poster at the end. On
   phones the hero scales down too far to read, so the same button plays it full
   screen. */
const SRC = '/assets/v5/film/onboarding.mp4', POSTER = '/assets/v5/film/onboarding-poster.webp';
const NARROW = 760;
const glass = `border:0;cursor:pointer;color:#F6F4E9;background:rgba(27,50,37,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)`;
const round = `position:absolute;bottom:14px;width:38px;height:38px;border-radius:999px;display:flex;align-items:center;justify-content:center;padding:0;${glass}`;
// Bottom left, where the pause button sits once it's playing: clear of nørma's
// face and the captions. Larger on phones, where the whole hero scales down.
const big = (px: number) => `position:absolute;left:${43 - px / 2 - 10}px;bottom:${43 - px / 2 - 10}px;width:${px}px;height:${px}px;border-radius:999px;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 0 0 2px;color:#152213;background:linear-gradient(180deg,#E9F693,#D3E45F);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 8px 20px rgba(20,35,26,.28)`;

const Svg = ({ children, size = 18 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{children}</svg>
);
const Play = ({ size }: { size?: number }) => <Svg size={size}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></Svg>;
const Pause = () => <Svg><rect x="6.5" y="5" width="4" height="14" rx="1.2" /><rect x="13.5" y="5" width="4" height="14" rx="1.2" /></Svg>;
const Sound = ({ on }: { on: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" />
    {on ? <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" /> : <path d="m16 9.5 5 5m0-5-5 5" />}
  </svg>
);

export default function HeroFilm({ onPlaying }: { onPlaying?: (on: boolean) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [narrow, setNarrow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [begun, setBegun] = useState(false);
  const [muted, setMuted] = useState(false);
  const show = (on: boolean) => { setPlaying(on); onPlaying?.(on); };

  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.innerWidth < NARROW) {
      setNarrow(true);
      // Leaving full screen puts the phone back on its poster.
      const reset = () => { v.pause(); v.controls = false; setBegun(false); v.load(); };
      const onFull = () => { if (!document.fullscreenElement) reset(); };
      document.addEventListener('fullscreenchange', onFull);
      v.addEventListener('webkitendfullscreen', reset);
      return () => { document.removeEventListener('fullscreenchange', onFull); v.removeEventListener('webkitendfullscreen', reset); };
    }
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) v.pause(); }, { threshold: .4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const play = () => {
    const v = ref.current; if (!v) return;
    v.play().catch(() => {});
    if (!narrow) return;
    // iPhones have no requestFullscreen: without playsInline they go full screen on play.
    v.controls = true;
    v.requestFullscreen?.().catch(() => {});
  };
  const toggle = () => { if (ref.current?.paused) play(); else ref.current?.pause(); };
  const toggleSound = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
  };
  const onEnded = () => { const v = ref.current; if (!v) return; show(false); setBegun(false); v.load(); };

  return (
    <div style={s(`position:relative;width:100%;height:100%`)}>
      <video ref={ref} src={SRC} poster={POSTER} playsInline={!narrow} preload="none"
        aria-label="nørma introduces the app: the five pillars, the monthly check-in and what to do in between"
        onPlay={() => { show(true); setBegun(true); }} onPause={() => show(false)} onEnded={onEnded} onClick={toggle}
        style={s(`display:block;width:100%;height:100%;object-fit:cover;cursor:pointer`)} />
      {!playing && <button type="button" onClick={play} aria-label="Play the film with sound" style={s(big(narrow ? 56 : 46))}><Play size={narrow ? 27 : 22} /></button>}
      {!narrow && playing && <button type="button" onClick={() => ref.current?.pause()} aria-label="Pause the film" style={s(`left:14px;${round}`)}><Pause /></button>}
      {!narrow && begun && <button type="button" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'} style={s(`right:14px;${round}`)}><Sound on={!muted} /></button>}
    </div>
  );
}
