// src/pages/NewDesign8/NewDesign8.js
// /new-design8 · "Sticker Deck"
// Inspired by micaeladl.xyz (A.J.'s pick): a sticker-cycling intro with a tall % counter,
// full-screen slides with a "01 / 05" counter, warm red and orange, big condensed type,
// a photo and stickers. Made original and accessible: cream text 7:1 and golden display
// type 4.9:1 on the red, native scroll-snap slides with real buttons, draggable decorative
// stickers, a portrait die-cut sticker, and an intro that is short, skippable and off for
// reduced motion (?nointro skips it too).
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign8.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;700&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const PROJECTS = ['travelcare', 'efilmhub', 'loopwise'];

/* ---------- Stickers (original SVGs) ---------- */
const Smiley = () => (
  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" /><circle cx="50" cy="50" r="40" fill="#ffb02e" stroke="#2a0c0c" strokeWidth="4" /><ellipse cx="37" cy="40" rx="4.5" ry="8" fill="#2a0c0c" /><ellipse cx="63" cy="40" rx="4.5" ry="8" fill="#2a0c0c" /><path d="M30 58 Q50 78 70 58" fill="none" stroke="#2a0c0c" strokeWidth="5" strokeLinecap="round" /></svg>
);
const Peace = () => (
  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" /><circle cx="50" cy="50" r="40" fill="#7ad3c9" stroke="#2a0c0c" strokeWidth="4" /><circle cx="50" cy="50" r="26" fill="none" stroke="#2a0c0c" strokeWidth="6" /><path d="M50 24 V76 M50 50 L32 68 M50 50 L68 68" stroke="#2a0c0c" strokeWidth="6" strokeLinecap="round" /></svg>
);
const StarSticker = () => (
  <svg viewBox="0 0 100 100"><path d="M50 2 L62 34 L97 36 L70 57 L80 92 L50 72 L20 92 L30 57 L3 36 L38 34 Z" fill="#fff" /><path d="M50 12 L59 38 L86 39 L65 55 L72 82 L50 66 L28 82 L35 55 L14 39 L41 38 Z" fill="#ff7aa8" stroke="#2a0c0c" strokeWidth="4" strokeLinejoin="round" /></svg>
);
const Heart = () => (
  <svg viewBox="0 0 100 100"><path d="M50 92 C10 64 2 42 14 24 C26 8 44 12 50 26 C56 12 74 8 86 24 C98 42 90 64 50 92 Z" fill="#fff" /><path d="M50 82 C18 60 12 44 21 30 C30 18 44 22 50 34 C56 22 70 18 79 30 C88 44 82 60 50 82 Z" fill="#ffd166" stroke="#2a0c0c" strokeWidth="4" /></svg>
);
const UXBadge = () => (
  <svg viewBox="0 0 120 70"><rect x="2" y="2" width="116" height="66" rx="33" fill="#fff" /><rect x="8" y="8" width="104" height="54" rx="27" fill="#2a0c0c" /><text x="60" y="46" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="30" fill="#ffc06b" letterSpacing="1">UX+DEV</text></svg>
);

const INTRO_STICKERS = [Smiley, Peace, StarSticker, Heart];

const Logo = () => (
  <span className="n8-logo" aria-hidden="true">
    <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#fff" /><circle cx="20" cy="20" r="15.5" fill="#ffb02e" stroke="#2a0c0c" strokeWidth="2" /><text x="20" y="25.5" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="15" fill="#2a0c0c">aj</text></svg>
  </span>
);

/* ---------- Intro ---------- */
const Intro = ({ onDone }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / 1500));
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const Sticker = INTRO_STICKERS[Math.min(INTRO_STICKERS.length - 1, Math.floor(count / 26))];
  return (
    <div className="n8-intro" aria-hidden="true">
      <div className="n8-intro__sticker" key={Sticker.name}><Sticker /></div>
      <p className="n8-intro__count">{String(count).padStart(3, '0')}<span>%</span></p>
      <p className="n8-intro__mark">AJ &copy;{new Date().getFullYear()}</p>
      <button type="button" className="n8-intro__skip" tabIndex={-1} onClick={onDone}>Skip</button>
    </div>
  );
};

/* ---------- Draggable sticker ---------- */
const Draggable = ({ children, className, style }) => {
  const ref = useRef(null);
  const start = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const down = (e) => {
    start.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    ref.current.classList.add('is-dragging');
  };
  const move = (e) => {
    if (!start.current) return;
    pos.current = { x: e.clientX - start.current.x, y: e.clientY - start.current.y };
    ref.current.style.translate = `${pos.current.x}px ${pos.current.y}px`;
  };
  const up = () => {
    start.current = null;
    if (ref.current) ref.current.classList.remove('is-dragging');
  };
  return (
    <div ref={ref} className={`n8-sticker ${className}`} style={style} aria-hidden="true"
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {children}
    </div>
  );
};

const NewDesign8 = () => {
  const reduceMotion = usePrefersReducedMotion();
  const skipIntro = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('nointro');
  const [intro, setIntro] = useState(!reduceMotion && !skipIntro);
  const [current, setCurrent] = useState(0);
  const slidesRef = useRef([]);

  usePreviewPage({ title: 'A.J. Skidmore | Sticker Deck preview', fontHref: FONT_HREF, bodyClass: 'n8-page' });

  const projects = useMemo(() => PROJECTS.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean), []);
  const total = projects.length + 2;

  // Track which slide is on screen for the counter
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setCurrent(Number(e.target.dataset.index));
      }),
      { threshold: 0.55 }
    );
    slidesRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const go = (dir) => {
    const next = Math.max(0, Math.min(total - 1, current + dir));
    const el = slidesRef.current[next];
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const slide = (i) => ({
    ref: (el) => { slidesRef.current[i] = el; },
    'data-index': i,
  });

  return (
    <div className="n8">
      {intro && <Intro onDone={() => setIntro(false)} />}
      <a className="n8-skip" href="#n8-main">Skip to main content</a>

      <header className="n8-bar">
        <a className="n8-brand" href="#n8-slide-0" aria-label="A.J. Skidmore, first slide"><Logo /><span>A.J. Skidmore</span></a>
        <nav aria-label="Main" className="n8-nav">
          <ul>
            <li><a href="#n8-slide-1">Work</a></li>
            <li><a href="#n8-slide-4">Let&rsquo;s talk</a></li>
          </ul>
        </nav>
      </header>

      <main id="n8-main" tabIndex={-1}>
        {/* 01 · Hello */}
        <section className="n8-slide n8-hello" id="n8-slide-0" aria-labelledby="n8-title" {...slide(0)}>
          <h1 className="n8-name" id="n8-title">
            <span>A.J.</span> <span>Skidmore</span>
          </h1>
          <figure className="n8-portrait">
            <img src="/assets/images/A.J.%20Skidmore%20Headshot.jpg" alt="A.J. Skidmore smiling, in a navy suit jacket" width="320" height="320" />
          </figure>
          <p className="n8-tagline">UX designer &amp; front-end engineer making the internet a friendlier place.</p>
          <Draggable className="n8-s1"><Smiley /></Draggable>
          <Draggable className="n8-s2"><Peace /></Draggable>
          <Draggable className="n8-s3"><StarSticker /></Draggable>
          <Draggable className="n8-s4"><UXBadge /></Draggable>
          <Draggable className="n8-s5"><Heart /></Draggable>
          <p className="n8-hint" aria-hidden="true">psst, the stickers move</p>
        </section>

        {/* 02-04 · Projects */}
        {projects.map((p, i) => (
          <section key={p.id} className="n8-slide n8-project" id={`n8-slide-${i + 1}`} aria-labelledby={`n8-p-${p.id}`} {...slide(i + 1)}>
            <div className="n8-project__text">
              <p className="n8-kicker">{p.category}</p>
              <h2 className="n8-project__name" id={`n8-p-${p.id}`}>{p.name}</h2>
              <p className="n8-project__summary">{p.summary}</p>
              <Link className="n8-pill" to={`/projects/${p.id}`}>View project<span className="visually-hidden">: {p.name}</span> <span aria-hidden="true">&#8599;</span></Link>
            </div>
            <figure className="n8-shot" style={{ '--tilt': `${[-4, 3, -2][i]}deg` }}>
              <img src={IMAGES[p.id] || p.imageUrl} alt={p.imageAlt} width="1440" height="720" loading="lazy" />
            </figure>
          </section>
        ))}

        {/* 05 · Contact */}
        <section className="n8-slide n8-talk" id="n8-slide-4" aria-labelledby="n8-talk-title" {...slide(total - 1)}>
          <h2 className="n8-talk__title" id="n8-talk-title">Let&rsquo;s talk!</h2>
          <p className="n8-talk__sub">Open to new conversations about products, people and accessibility.</p>
          <div className="n8-talk__links">
            <a className="n8-pill n8-pill--light" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
            <a className="n8-pill" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
          </div>
          <p className="n8-talk__foot">&copy; {new Date().getFullYear()} A.J. Skidmore · <Link to="/">View the current site</Link></p>
        </section>
      </main>

      {/* Fixed slide controls */}
      <div className="n8-controls">
        <p className="n8-counter" aria-live="polite">
          <span className="visually-hidden">Slide </span>
          {String(current + 1).padStart(2, '0')}<span aria-hidden="true"> / </span><span className="visually-hidden"> of </span>{String(total).padStart(2, '0')}
        </p>
        <div className="n8-arrows">
          <button type="button" onClick={() => go(-1)} disabled={current === 0} aria-label="Previous slide">&uarr;</button>
          <button type="button" onClick={() => go(1)} disabled={current === total - 1} aria-label="Next slide">&darr;</button>
        </div>
      </div>
    </div>
  );
};

export default NewDesign8;
