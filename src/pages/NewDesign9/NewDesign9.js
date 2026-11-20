// src/pages/NewDesign9/NewDesign9.js
// /new-design9 · "Human"
// Inspired by bohdan.design (A.J.'s pick): a giant headline with the person standing in the
// middle of it, orange accents with corner-bracket callouts, a scroll-driven statement and
// rolling-letter project names. Made accessible where the original isn't: the headline is real
// ink text (13:1), not white on gray (1.4:1); words are not split into letters for screen
// readers; the scroll statement is fully readable without scrolling; motion is off for
// reduced-motion users.
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign9.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];

const STATEMENT = 'by tying digital products and people together with clear, accessible, foolproof interfaces.';

const PILLARS = [
  ['Research led', 'I start with the people who use it: interviews, observation and usability tests before and after design.'],
  ['Human first', 'Plain language, obvious next steps and WCAG 2.2 AA, so nobody is left out of the experience.'],
  ['Built to ship', 'I build what I design in React and TypeScript, so the shipped product matches the design.'],
];

// Name whose letters roll up on hover (visual only; the accessible name is the plain word)
const RollingName = ({ text }) => (
  <span className="n9-roll">
    <span className="visually-hidden">{text}</span>
    <span className="n9-roll__letters" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="n9-roll__ch" style={{ '--d': `${i * 22}ms` }}>
          <span>{ch === ' ' ? ' ' : ch}</span>
          <span>{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  </span>
);

// Corner-bracket callout box
const Callout = ({ label, children, className = '' }) => (
  <div className={`n9-callout ${className}`}>
    <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
    <p className="n9-mono n9-callout__label">{label}</p>
    <p>{children}</p>
  </div>
);

const NewDesign9 = () => {
  const rootRef = useRef(null);
  const statementRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  usePreviewPage({ title: 'A.J. Skidmore | Human preview', fontHref: FONT_HREF, bodyClass: 'n9-page' });
  useReveal(rootRef, '.n9-reveal');

  // Scroll-driven statement: words light up as the section passes (visual emphasis only)
  useEffect(() => {
    const el = statementRef.current;
    if (!el || reduceMotion) return undefined;
    const words = [...el.querySelectorAll('.n9-word')];
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.35)));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduceMotion]);

  // Portrait leans toward the pointer a little (pointer devices only)
  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const fig = rootRef.current && rootRef.current.querySelector('.n9-portrait');
    if (!fig) return undefined;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      fig.style.transform = `translate(-50%, 0) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reduceMotion]);

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="n9" ref={rootRef}>
      <a className="n9-skip" href="#n9-main">Skip to main content</a>

      <header className="n9-bar">
        <a className="n9-brand" href="#top" aria-label="A.J. Skidmore, back to top">
          <span className="n9-logo" aria-hidden="true">aj<span>+</span></span>
          <span>A.J. Skidmore</span>
        </a>
        <nav aria-label="Main" className="n9-nav n9-mono">
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#approach">Approach</a></li>
          </ul>
        </nav>
        <a className="n9-talk" href="#contact"><span aria-hidden="true">+</span> Let&rsquo;s talk</a>
      </header>

      <main id="n9-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n9-hero" id="top" aria-labelledby="n9-title">
          <h1 className="n9-title" id="n9-title">
            <span className="n9-title__l1">I make </span>
            <span className="n9-title__l2"><span>tech </span><span>more </span></span>
            <span className="n9-title__l3">human</span>
          </h1>
          <figure className="n9-portrait" aria-hidden="true">
            <img src="/assets/images/new-design/portrait-tall.jpg" alt="" width="900" height="1200" />
          </figure>
          <Callout label="Built to be used" className="n9-hero__callout">
            A UX designer and front-end engineer shaping products people understand on the first try.
          </Callout>
          <p className="n9-hero__meta n9-mono">B.A. Experience Architecture · MSU<br />30+ sites &amp; apps shipped</p>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="n9-section n9-statement" aria-label="Approach summary">
          <p className="n9-statement__text" ref={statementRef}>
            {STATEMENT.split(' ').map((w, i) => (
              <span key={i} className="n9-word">{w} </span>
            ))}
          </p>
        </section>

        {/* ---------- Pillars ---------- */}
        <section className="n9-section" id="approach" aria-labelledby="n9-approach-title">
          <h2 className="n9-h2 n9-reveal" id="n9-approach-title">How I work</h2>
          <ul className="n9-pillars">
            {PILLARS.map(([t, d], i) => (
              <li key={t} className="n9-reveal">
                <Callout label={`0${i + 1} / ${t}`}>{d}</Callout>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Work ---------- */}
        <section className="n9-section" id="work" aria-labelledby="n9-work-title">
          <header className="n9-work-head n9-reveal">
            <h2 className="n9-h2" id="n9-work-title">Selected work</h2>
            <p>Human-centered design, built and shipped. Hover a name.</p>
          </header>
          <ol className="n9-work">
            {work.map((p, i) => (
              <li key={p.id} className="n9-row n9-reveal">
                <span className="n9-row__num n9-mono" aria-hidden="true">_{String(i + 1).padStart(2, '0')}</span>
                <h3 className="n9-row__name">
                  <Link to={`/projects/${p.id}`} className="n9-stretch"><RollingName text={p.name} /></Link>
                </h3>
                <p className="n9-row__meta n9-mono">{p.category}</p>
                <div className="n9-row__img" aria-hidden="true">
                  <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="n9-section n9-contact" id="contact" aria-labelledby="n9-contact-title">
          <p className="n9-mono n9-contact__kicker n9-reveal">Let&rsquo;s talk</p>
          <h2 className="n9-contact__title n9-reveal" id="n9-contact-title">Good design starts with a conversation.</h2>
          <p className="n9-contact__sub n9-reveal">Tell me what you&rsquo;re building. I&rsquo;ll help make it clear, accessible and easy to love.</p>
          <div className="n9-contact__links n9-reveal">
            <a className="n9-btn" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
            <a className="n9-btn n9-btn--line" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
          </div>
        </section>
      </main>

      <footer className="n9-foot n9-mono">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign9;
