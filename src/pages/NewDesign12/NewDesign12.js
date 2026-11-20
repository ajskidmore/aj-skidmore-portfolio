// src/pages/NewDesign12/NewDesign12.js
// /new-design12 · "Wavelength"
// A closer take on wavyideas.com (A.J.'s pick): a hand-drawn line illustration that draws
// itself as the intro, a bubbly logo, a framed electric-blue hero panel where the last word
// blurs into focus, a two-tone statement, a marquee, big rounded full-bleed work cards with
// titles over the image, and [01] services. Original illustration: line-drawn A.J. sailing a
// paper boat with a laptop. Accessible: short skippable intro (off for reduced motion,
// ?nointro), marquee pause button, text over images sits on a dark scrim (7:1+).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign12.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Figtree:wght@400;500;600&family=Space+Mono&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];
const MARQUEE = ['TravelCare+', 'eFilmHub', 'Eudo', 'Loopwise', 'Bloom', 'Michigan State', 'WCAG 2.2 AA', 'Figma', 'React'];

const SERVICES = [
  ['UX research', 'I talk with the people who will use the product, watch how they work and test early ideas with them.', ['Interviews', 'Usability tests', 'Synthesis']],
  ['Product design', 'Flows, wireframes and Figma prototypes, organized into a design system that keeps every screen consistent.', ['User flows', 'Prototyping', 'Design systems']],
  ['Web development', 'I build what I design in React, TypeScript and Next.js, so nothing gets lost in handoff.', ['React', 'TypeScript', 'Firebase']],
  ['Accessibility', 'WCAG 2.2 AA from the first sketch, checked by hand with a keyboard and the NVDA screen reader.', ['WCAG 2.2 AA', 'NVDA', 'Audits']],
];

// Original line illustration: A.J. with a laptop, sailing a paper boat on a wave
const BoatDrawing = ({ className }) => (
  <svg className={className} viewBox="0 0 520 300" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      {/* paper boat */}
      <path pathLength="1" d="M70 200 L450 200 L400 252 Q260 262 120 252 Z" />
      <path pathLength="1" d="M150 200 L260 70 L370 200" />
      <path pathLength="1" d="M260 70 L260 200" />
      <path pathLength="1" d="M205 200 L260 136 L315 200" />
      {/* person: head, hair, face */}
      <path pathLength="1" d="M318 112 a20 21 0 1 0 0.1 0" />
      <path pathLength="1" d="M300 104 q6 -18 26 -14 q12 3 13 16 q-8 -8 -20 -6 q-10 2 -19 4" />
      <path pathLength="1" d="M311 122 q1 3 3 0 M325 121 q1 3 3 0 M313 132 q6 5 12 0" />
      {/* body sitting on the bow, laptop on lap */}
      <path pathLength="1" d="M318 154 q-4 22 2 40" />
      <path pathLength="1" d="M318 166 q-22 6 -30 20 M318 166 q20 10 26 22" />
      <path pathLength="1" d="M280 186 L340 186 L354 158 L296 158 Z" />
      <path pathLength="1" d="M276 188 L346 188" />
      {/* little flag */}
      <path pathLength="1" d="M260 70 L260 40 L290 50 L260 60" />
    </g>
    {/* wave */}
    <path pathLength="1" className="wave" d="M10 262 Q60 236 110 262 T210 262 T310 262 T410 262 T510 262" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <path pathLength="1" className="wave" d="M40 284 Q80 266 120 284 T200 284 T280 284 T360 284 T440 284" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const Intro = ({ onDone }) => {
  useEffect(() => {
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <div className="n12-intro" aria-hidden="true">
      <BoatDrawing className="n12-intro__boat" />
      <button type="button" className="n12-intro__skip" tabIndex={-1} onClick={onDone}>Skip</button>
    </div>
  );
};

const NewDesign12 = () => {
  const rootRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const skipIntro = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('nointro');
  const [intro, setIntro] = useState(!reduceMotion && !skipIntro);
  const [marqueePaused, setMarqueePaused] = useState(false);

  usePreviewPage({ title: 'A.J. Skidmore | Wavelength preview', fontHref: FONT_HREF, bodyClass: 'n12-page' });
  useReveal(rootRef, '.n12-reveal');

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className={`n12${intro ? ' is-intro' : ''}`} ref={rootRef}>
      {intro && <Intro onDone={() => setIntro(false)} />}
      <a className="n12-skip" href="#n12-main">Skip to main content</a>

      <header className="n12-bar">
        <a className="n12-logo" href="#top" aria-label="A.J. Skidmore, back to top">aj&nbsp;skid</a>
        <nav aria-label="Main" className="n12-nav">
          <ul>
            <li><a href="#works">Works</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="n12-main" tabIndex={-1}>
        {/* ---------- Hero panel ---------- */}
        <section className="n12-hero" id="top" aria-labelledby="n12-title">
          <div className="n12-panel">
            <div className="n12-panel__glow" aria-hidden="true" />
            <div className="n12-panel__grain" aria-hidden="true" />
            <BoatDrawing className="n12-panel__boat" />
            <h1 className="n12-title" id="n12-title">
              Designing experiences on a new <span className="n12-focus">wavelength</span>.
            </h1>
            <a className="n12-start" href="mailto:hello@ajskidmore.com">Start a project <span aria-hidden="true">&rarr;</span></a>
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="n12-section n12-statement" id="about" aria-labelledby="n12-about-title">
          <h2 className="visually-hidden" id="n12-about-title">About</h2>
          <p className="n12-statement__text n12-reveal">
            I&rsquo;m A.J., a UX designer and front-end engineer who researches, designs and builds
            digital products people enjoy.{' '}
            <span>My mindset is to always try new things and leave every product clearer and more accessible than I found it.</span>
          </p>
        </section>

        {/* ---------- Marquee ---------- */}
        <section className="n12-marquee-wrap" aria-label="Projects and skills">
          <p className="n12-marquee__label">Designed and built</p>
          <div className={`n12-marquee${marqueePaused ? ' is-paused' : ''}`}>
            <ul className="n12-marquee__track">
              {[...MARQUEE, ...MARQUEE].map((m, i) => (
                <li key={i} aria-hidden={i >= MARQUEE.length || undefined}>{m}</li>
              ))}
            </ul>
          </div>
          {!reduceMotion && (
            <button type="button" className="n12-pause" aria-pressed={marqueePaused} onClick={() => setMarqueePaused((p) => !p)}>
              {marqueePaused ? 'Play' : 'Pause'} scrolling list
            </button>
          )}
        </section>

        {/* ---------- Works ---------- */}
        <section className="n12-section" id="works" aria-labelledby="n12-works-title">
          <header className="n12-head n12-reveal">
            <h2 id="n12-works-title">Works</h2>
            <p aria-hidden="true">(22–26)</p>
          </header>
          <ul className="n12-works">
            {work.map((p) => (
              <li key={p.id} className="n12-work n12-reveal">
                <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                <div className="n12-work__scrim" aria-hidden="true" />
                <div className="n12-work__text">
                  <h3><Link to={`/projects/${p.id}`} className="n12-stretch">{p.name}</Link></h3>
                  <p>{p.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Services ---------- */}
        <section className="n12-section" id="services" aria-labelledby="n12-services-title">
          <header className="n12-head n12-reveal">
            <h2 id="n12-services-title">Services</h2>
            <p>What do I provide?</p>
          </header>
          <ol className="n12-services">
            {SERVICES.map(([t, d, tags], i) => (
              <li key={t} className="n12-service n12-reveal">
                <p className="n12-service__num" aria-hidden="true">[0{i + 1}]</p>
                <h3>{t}</h3>
                <p>{d}</p>
                <ul aria-label={`${t} skills`}>{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="n12-section n12-contact" id="contact" aria-labelledby="n12-contact-title">
          <BoatDrawing className="n12-contact__boat" />
          <h2 className="n12-contact__title n12-reveal" id="n12-contact-title">Let&rsquo;s set sail.</h2>
          <div className="n12-contact__links n12-reveal">
            <a href="mailto:hello@ajskidmore.com">hello@ajskidmore.com <span aria-hidden="true">&rarr;</span></a>
            <a href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">&rarr;</span><span className="visually-hidden"> (opens in a new tab)</span></a>
          </div>
        </section>
      </main>

      <footer className="n12-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign12;
