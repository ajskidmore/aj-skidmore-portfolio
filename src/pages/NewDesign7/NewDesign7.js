// src/pages/NewDesign7/NewDesign7.js
// /new-design7 · "Assembly"
// Inspired by oblikdigital.com (blueprint grid, a pixel logo that assembles while a counter
// loads, a 3D ring of work, code-style labels) and A.J.'s Blueprint direction. Original:
// the pixels form A.J.'s continuous-line AJ; the ring is draggable, keyboard-operable and pausable.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import { markPixels } from './pixels';
import './newDesign7.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];
const GRID = 32;

const PRINCIPLES = [
  ['research_first', 'Decisions start with the people who use it', 'Interviews, observation and usability tests come before pixels, and again after them.'],
  ['plain_language', 'If it needs a manual, it isn’t done', 'Clear labels, short sentences and obvious next steps, written for real reading levels.'],
  ['accessible_by_default', 'Everyone gets the same product', 'WCAG 2.2 AA from the first wireframe, checked by hand with a keyboard and NVDA.'],
  ['systems_not_screens', 'Consistency is designed, not hoped for', 'Tokens and components keep every screen coherent as the product grows.'],
  ['design_meets_code', 'Nothing gets lost in handoff', 'I build what I design in React and TypeScript, so the shipped product matches the design.'],
  ['measured_results', 'Launch is the middle, not the end', 'Usability feedback and analytics after release decide what changes next.'],
];

const STAGES = [
  ['Discover', 'Interviews, audits of what exists, goals'],
  ['Define', 'Flows, information architecture, success measures'],
  ['Design', 'Wireframes, prototypes, design system'],
  ['Build', 'React front end, content, integrations'],
  ['Audit', 'WCAG checks, usability tests, launch'],
];

// Pixel logo drawn from the rasterized mark
const PixelMark = ({ size = 32, cells }) => (
  <svg viewBox={`0 0 ${GRID} ${GRID}`} width={size} height={size} aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" fill="#2440e6" />)}
  </svg>
);

// Intro: pixels assemble while a counter runs to 100 (about 1.6s, skippable, off for reduced motion)
const Intro = ({ cells, onDone }) => {
  const [count, setCount] = useState(0);
  const order = useMemo(() => cells.map((c, i) => [c, (Math.sin(i * 12.9898) * 43758.5453) % 1]).sort((a, b) => a[1] - b[1]).map(([c]) => c), [cells]);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / 1400));
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const shown = Math.round((count / 100) * order.length);
  return (
    <div className="n7-intro" aria-hidden="true">
      <div className="n7-intro__grid">
        <svg viewBox={`0 0 ${GRID} ${GRID}`} shapeRendering="crispEdges">
          {order.map(([x, y], i) => (
            <rect key={`${x}-${y}`} x={x + 0.1} y={y + 0.1} width="0.8" height="0.8" className={i < shown ? 'on' : ''} />
          ))}
        </svg>
      </div>
      <p className="n7-intro__label">{'{{ loading }}'}</p>
      <p className="n7-intro__count">{String(count).padStart(3, '0')}</p>
      <button type="button" className="n7-intro__skip" tabIndex={-1} onClick={onDone}>Skip</button>
    </div>
  );
};

// The 3D ring of project cards
const Ring = ({ projects, paused, reduceMotion }) => {
  const ringRef = useRef(null);
  const angle = useRef(0);
  const target = useRef(null);
  const drag = useRef(null);
  const hover = useRef(false);
  const items = [...projects, ...projects];
  const step = 360 / items.length;

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (target.current !== null) {
        const diff = ((target.current - angle.current + 540) % 360) - 180;
        angle.current += diff * Math.min(1, dt * 8);
        if (Math.abs(diff) < 0.2) target.current = null;
      } else if (!drag.current && !paused && !reduceMotion && !hover.current) {
        angle.current -= dt * 8;
      }
      if (ringRef.current) ringRef.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(-7deg) rotateY(${angle.current}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduceMotion]);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, a: angle.current };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    angle.current = drag.current.a + (e.clientX - drag.current.x) * 0.25;
  };
  const onPointerUp = () => { drag.current = null; };
  const faceCard = (i) => { target.current = -i * step; };
  const nudge = (dir) => {
    const nearest = Math.round(-angle.current / step);
    target.current = -(nearest + dir) * step;
  };

  return (
    <div className="n7-ring-wrap">
      <div
        className="n7-ring-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => { hover.current = true; }}
        onMouseLeave={() => { hover.current = false; }}
      >
        <ul className="n7-ring" ref={ringRef} style={{ '--n': items.length }}>
          {items.map((p, i) => {
            const duplicate = i >= projects.length;
            return (
              <li key={`${p.id}-${i}`} className="n7-ring__card" style={{ '--i': i }} aria-hidden={duplicate || undefined}>
                <img src={IMAGES[p.id] || p.imageUrl} alt="" draggable="false" width="1440" height="720" />
                <p>
                  <span className="n7-mono">{String((i % projects.length) + 1).padStart(2, '0')}/</span>
                  {duplicate ? p.name : (
                    <Link to={`/projects/${p.id}`} onFocus={() => faceCard(i)} draggable="false">{p.name}</Link>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="n7-ring-controls">
        <button type="button" onClick={() => nudge(-1)} aria-label="Previous project">&larr;</button>
        <span className="n7-mono">drag, use arrows, or tab through projects</span>
        <button type="button" onClick={() => nudge(1)} aria-label="Next project">&rarr;</button>
      </div>
    </div>
  );
};

const NewDesign7 = () => {
  const rootRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const cells = useMemo(() => markPixels(GRID, 3.6), []);
  // ?nointro skips the intro (handy for sharing a link straight to the page)
  const skipIntro = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('nointro');
  const [intro, setIntro] = useState(!reduceMotion && !skipIntro);
  const [paused, setPaused] = useState(false);

  usePreviewPage({ title: 'A.J. Skidmore | Assembly preview', fontHref: FONT_HREF, bodyClass: 'n7-page' });
  useReveal(rootRef, '.n7-reveal');

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="n7" ref={rootRef}>
      {intro && cells.length > 0 && <Intro cells={cells} onDone={() => setIntro(false)} />}
      <a className="n7-skip" href="#n7-main">Skip to main content</a>
      <div className="n7-lines" aria-hidden="true" />

      <header className="n7-bar">
        <a className="n7-brand" href="#top" aria-label="A.J. Skidmore, back to top">
          <PixelMark cells={cells} />
          <span className="n7-mono">aj/skidmore</span>
        </a>
        <nav aria-label="Main" className="n7-nav">
          <ul className="n7-mono">
            <li><a href="#work">/ work</a></li>
            <li><a href="#principles">/ principles</a></li>
            <li><a href="#process">/ process</a></li>
          </ul>
        </nav>
        <a className="n7-cta" href="mailto:hello@ajskidmore.com">Let&rsquo;s talk <span aria-hidden="true">&rarr;</span></a>
      </header>

      <main id="n7-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n7-hero" id="top" aria-labelledby="n7-title">
          <div className="n7-hero__meta n7-mono n7-reveal">
            <p>UX design &amp; front-end engineering</p>
            <p>Shipping since 2022 · 30+ launches</p>
          </div>
          <p className="n7-kicker n7-reveal">Research, design and code, applied with care.</p>
          <h1 className="n7-title n7-reveal" id="n7-title">I design products that set a higher standard for access.</h1>
          <p className="n7-lede n7-reveal">
            UX designer and full-stack engineer with 4+ years and 30+ production sites and apps.
            I research, design and build products that work for everyone who uses them.
          </p>
          <div className="n7-hero__actions n7-reveal">
            <a className="n7-btn" href="mailto:hello@ajskidmore.com">Start a conversation <span aria-hidden="true">&rarr;</span></a>
            <a className="n7-link n7-mono" href="#work">/ see-work</a>
          </div>
        </section>

        {/* ---------- Work ring ---------- */}
        <section className="n7-section n7-work" id="work" aria-labelledby="n7-work-title">
          <header className="n7-head n7-reveal">
            <p className="n7-mono">01/04 · work</p>
            <h2 id="n7-work-title">Five products, designed and built end to end</h2>
            {!reduceMotion && (
              <button type="button" className="n7-pause n7-mono" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
                {paused ? '[ play rotation ]' : '[ pause rotation ]'}
              </button>
            )}
          </header>
          <Ring projects={work} paused={paused} reduceMotion={reduceMotion} />
        </section>

        {/* ---------- Principles ---------- */}
        <section className="n7-section" id="principles" aria-labelledby="n7-principles-title">
          <header className="n7-head n7-reveal">
            <p className="n7-mono">02/04 · principles</p>
            <h2 id="n7-principles-title">Invisible principles, visible results</h2>
          </header>
          <ol className="n7-principles">
            {PRINCIPLES.map(([code, title, text], i) => (
              <li key={code} className="n7-principle n7-reveal">
                <p className="n7-mono n7-principle__code">[ {String(i + 1).padStart(2, '0')} ] {code}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Process ---------- */}
        <section className="n7-section" id="process" aria-labelledby="n7-process-title">
          <header className="n7-head n7-reveal">
            <p className="n7-mono">03/04 · process</p>
            <h2 id="n7-process-title">Five stages, two approval points</h2>
          </header>
          <ol className="n7-stages">
            {STAGES.map(([name, text], i) => (
              <li key={name} className="n7-stage n7-reveal">
                <span className="n7-stage__node" aria-hidden="true" />
                <p className="n7-mono">{String(i + 1).padStart(2, '0')}</p>
                <h3>{name}</h3>
                <p>{text}</p>
                {(i === 1 || i === 3) && <p className="n7-flag n7-mono">approval point</p>}
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="n7-section n7-contact" aria-labelledby="n7-contact-title">
          <p className="n7-mono n7-reveal">04/04 · contact</p>
          <h2 className="n7-contact__title n7-reveal" id="n7-contact-title">A website is the tip of the iceberg. Let&rsquo;s build what&rsquo;s underneath.</h2>
          <div className="n7-hero__actions n7-reveal">
            <a className="n7-btn" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com <span aria-hidden="true">&rarr;</span></a>
            <a className="n7-link n7-mono" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
              / linkedin<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="n7-foot n7-mono">
        <p>&copy; {new Date().getFullYear()} aj/skidmore</p>
        <p><Link to="/">/ current-site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign7;
