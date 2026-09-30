import { useEffect, useRef, useState } from 'react';
import { s } from '../lib/s';
import { FILM_LEN, fmtTime } from '../data/site';

declare global {
  interface Window { Ch00Film?: { render: (c: HTMLCanvasElement, t: number, o: { captions: boolean }) => void } }
}

const SCRIPT_SRC = '/assets/journey/ch00-film.js';
// Optional narration mix matching the 36s web cut. When this file exists in
// public/, the player gains a sound toggle; until then it stays silent.
const AUDIO_SRC = '/assets/journey/ch00-audio.mp3';

export default function Film() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  const st = useRef({ t: 0, prev: 0, raf: 0, playing: false, film: undefined as Window['Ch00Film'], io: undefined as IntersectionObserver | undefined, timer: 0, tries: 0, audio: undefined as HTMLAudioElement | undefined, audioOn: false });

  useEffect(() => {
    const S = st.current;
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const el = document.createElement('script');
      el.src = SCRIPT_SRC;
      document.head.appendChild(el);
    }
    fetch(AUDIO_SRC, { method: 'HEAD' }).then((r) => {
      if (!r.ok) return;
      const a = new Audio(AUDIO_SRC);
      a.preload = 'auto';
      S.audio = a;
      setHasAudio(true);
    }).catch(() => { /* no audio available */ });
    const syncAudio = () => {
      const a = S.audio; if (!a) return;
      if (S.playing && S.audioOn && S.t < FILM_LEN) {
        if (Math.abs(a.currentTime - S.t) > 0.35) a.currentTime = S.t;
        if (a.paused) a.play().catch(() => { /* blocked */ });
      } else if (!a.paused) a.pause();
    };
    const drawFilm = () => {
      const c = canvasRef.current; if (!c || !S.film) return;
      try { S.film.render(c, S.t, { captions: true }); } catch (e) { /* ignore */ }
      if (seekRef.current) seekRef.current.value = String(S.t);
      if (timeRef.current) timeRef.current.textContent = fmtTime(S.t) + ' / 0:36';
    };
    const tick = (now: number) => {
      if (!S.playing) return;
      const dt = Math.min(.1, (now - S.prev) / 1000); S.prev = now; S.t += dt;
      if (S.t >= FILM_LEN + 1.2) { S.t = 0; if (S.audio) S.audio.currentTime = 0; }
      drawFilm();
      syncAudio();
      S.raf = requestAnimationFrame(tick);
    };
    const playFilm = () => { if (S.playing || !S.film) return; S.playing = true; S.prev = performance.now(); S.raf = requestAnimationFrame(tick); setFilmPlaying(true); };
    const pauseFilm = () => { if (!S.playing) return; S.playing = false; cancelAnimationFrame(S.raf); setFilmPlaying(false); syncAudio(); };
    const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const boot = () => {
      if (!window.Ch00Film || !canvasRef.current) { if (S.tries++ < 150) S.timer = window.setTimeout(boot, 200); return; }
      S.film = window.Ch00Film; drawFilm();
      const c = canvasRef.current;
      if ('IntersectionObserver' in window) {
        S.io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { if (!reduced) playFilm(); } else pauseFilm(); }), { threshold: .3 });
        S.io.observe(c);
      }
    };
    boot();
    (S as any).playFilm = playFilm; (S as any).pauseFilm = pauseFilm; (S as any).drawFilm = drawFilm; (S as any).syncAudio = syncAudio;
    return () => { cancelAnimationFrame(S.raf); clearTimeout(S.timer); if (S.io) S.io.disconnect(); if (S.audio) S.audio.pause(); };
  }, []);

  const toggleFilm = () => { const S = st.current as any; S.playing ? S.pauseFilm() : S.playFilm(); };
  const seekFilm = (e: React.ChangeEvent<HTMLInputElement>) => { const S = st.current as any; S.t = Math.min(FILM_LEN, Math.max(0, +e.target.value)); if (S.audio) S.audio.currentTime = S.t; S.drawFilm(); S.syncAudio(); };
  const toggleAudio = () => {
    const S = st.current as any;
    S.audioOn = !S.audioOn;
    setAudioOn(S.audioOn);
    if (S.audioOn && !S.playing) S.playFilm();
    S.syncAudio();
  };

  return (
    <div style={s('display:flex;flex-direction:column;align-items:center;gap:16px')}>
      <div style={s('position:relative;width:300px;max-width:100%;border-radius:40px;padding:8px;box-sizing:border-box;background:#14231A;box-shadow:0 40px 90px rgba(20,35,26,.35)')}>
        <canvas ref={canvasRef} width={720} height={1280} style={s('display:block;width:100%;height:auto;border-radius:32px;background:#DCE8CF')} aria-label="Chapter film: Five pillars, one life"></canvas>
        <span style={s(`position:absolute;left:22px;top:22px;padding:5px 10px;border-radius:999px;background:rgba(27,50,37,.6);backdrop-filter:blur(6px);font:500 10px 'DM Mono',monospace;letter-spacing:1px;color:#F6F4E9`)}>FIVE PILLARS, ONE LIFE</span>
      </div>
      <div style={s('display:flex;align-items:center;gap:12px;width:300px;max-width:100%')}>
        <button onClick={toggleFilm} aria-label="Play or pause" className="hv-play" style={s('flex:none;width:40px;height:40px;border-radius:999px;border:0;cursor:pointer;background:#14231A;display:flex;align-items:center;justify-content:center;transition:all .2s ease')}>
          {filmPlaying
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#D9EA6E"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="#D9EA6E" style={s('margin-left:2px')}><path d="M7 4.5 L19 12 L7 19.5 Z" /></svg>}
        </button>
        {hasAudio && (
          <button onClick={toggleAudio} aria-label={audioOn ? 'Mute narration' : 'Play narration'} className="hv-play" style={s('flex:none;width:40px;height:40px;border-radius:999px;border:0;cursor:pointer;background:#14231A;display:flex;align-items:center;justify-content:center;transition:all .2s ease')}>
            {audioOn
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D9EA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 L6.5 9 H3.5 V15 H6.5 L11 19 Z" fill="#D9EA6E" stroke="none" /><path d="M15 9 C16.2 10.6 16.2 13.4 15 15" /><path d="M17.8 6.8 C20 9.6 20 14.4 17.8 17.2" /></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D9EA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 L6.5 9 H3.5 V15 H6.5 L11 19 Z" fill="#D9EA6E" stroke="none" /><path d="M15.5 9.5 L20.5 14.5" /><path d="M20.5 9.5 L15.5 14.5" /></svg>}
          </button>
        )}
        <input type="range" min={0} max={36} step={0.05} ref={seekRef} onChange={seekFilm} defaultValue={0} style={s('flex:1;background:rgba(20,35,26,.15)')} aria-label="Scrub the film" />
        <span ref={timeRef} style={s(`flex:none;font:500 11px 'DM Mono',monospace;color:#4C5E4A`)}>0:00 / 0:36</span>
      </div>
      <span style={s(`font:400 12px 'DM Sans',sans-serif;color:#4C5E4A`)}>{hasAudio ? 'A real chapter. Drag to scrub.' : 'A real chapter, silent here. Drag to scrub.'}</span>
    </div>
  );
}
