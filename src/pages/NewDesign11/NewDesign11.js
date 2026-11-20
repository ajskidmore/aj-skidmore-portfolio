// src/pages/NewDesign11/NewDesign11.js
// /new-design11 · "Dusk"
// Inspired by nolana.com: a dusk-blue stage with a glowing particle terrain, a glassy gradient
// chip around one key word, "//_01" code labels, frosted cards and big result numbers.
// Original: the terrain reacts to the pointer, the chip word cycles through A.J.'s three
// disciplines (pausable; static for reduced motion, and screen readers hear one clear sentence).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import Terrain from './Terrain';
import './newDesign11.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];
const WORDS = ['research', 'design', 'code'];

const SERVICES = [
  ['Research & discovery', 'Interviews, observation and usability tests that turn messy workflows into clear requirements.'],
  ['Interface & systems', 'Flows, wireframes, Figma prototypes and design systems that keep every screen consistent.'],
  ['Accessible engineering', 'React and TypeScript builds that meet WCAG 2.2 AA, tested with a keyboard and NVDA.'],
];

const Logo = () => (
  <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="n11-lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9fc3ff" /><stop offset="1" stopColor="#d8a8ff" /></linearGradient>
    </defs>
    <path d="M6 30 L16 10 L26 30 M10.5 22 H21.5" fill="none" stroke="url(#n11-lg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 10 V25 A5 5 0 0 1 22 29" fill="none" stroke="url(#n11-lg)" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="30" cy="6" r="1.8" fill="#d8a8ff" />
  </svg>
);

const NewDesign11 = () => {
  const rootRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [word, setWord] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  usePreviewPage({ title: 'A.J. Skidmore | Dusk preview', fontHref: FONT_HREF, bodyClass: 'n11-page' });
  useReveal(rootRef, '.n11-reveal');

  // Chip word cycles every 2.6s (pausable; stops for reduced motion)
  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="n11" ref={rootRef}>
      <a className="n11-skip" href="#n11-main">Skip to main content</a>

      <header className="n11-bar">
        <a className="n11-brand" href="#top" aria-label="A.J. Skidmore, back to top"><Logo /><span>aj skidmore</span></a>
        <nav aria-label="Main" className="n11-nav">
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
        <a className="n11-cta" href="mailto:hello@ajskidmore.com">Get in touch</a>
      </header>

      <main id="n11-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n11-hero" id="top" aria-labelledby="n11-title">
          <Terrain paused={paused} />
          <div className="n11-frame" aria-hidden="true" />
          <div className="n11-hero__copy">
            <p className="n11-badge n11-reveal"><span>Latest</span> TravelCare+ is live</p>
            <h1 className="n11-title n11-reveal" id="n11-title">
              <span className="visually-hidden">Great products live where research, design and code meet. Most teams lose something between them.</span>
              <span aria-hidden="true">
                Great products live where{' '}
                <span className="n11-chip"><span key={word} className="n11-chip__word">{WORDS[word]}</span></span>{' '}
                meets craft.
                <br />Most teams lose something in between.
              </span>
            </h1>
            <p className="n11-lede n11-reveal">
              I&rsquo;m A.J., a UX designer and front-end engineer. I research, design and build the
              whole thing myself, so nothing gets lost between the people, the mockup and the product.
            </p>
            <div className="n11-actions n11-reveal">
              <a className="n11-btn n11-btn--light" href="#work"><span className="n11-btn__icon" aria-hidden="true">&rarr;</span>See the work</a>
              <a className="n11-btn" href="#about">About me</a>
            </div>
          </div>
          {!reduceMotion && (
            <button type="button" className="n11-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              {paused ? 'Play motion' : 'Pause motion'}
            </button>
          )}
          <p className="n11-trusted n11-mono">Experience Architecture · Michigan State University</p>
        </section>

        {/* ---------- Problem ---------- */}
        <section className="n11-section n11-problem" aria-labelledby="n11-problem-title">
          <p className="n11-mono n11-reveal">The problem</p>
          <h2 className="n11-h2 n11-reveal" id="n11-problem-title">Handoffs leak. Research gets summarized, designs get approximated, and accessibility gets saved for later.</h2>
        </section>

        {/* ---------- Services ---------- */}
        <section className="n11-section" id="services" aria-labelledby="n11-services-title">
          <p className="n11-mono n11-reveal">Core services</p>
          <h2 className="n11-h2 n11-reveal" id="n11-services-title">One person across the whole journey.</h2>
          <ol className="n11-cards">
            {SERVICES.map(([t, d], i) => (
              <li key={t} className="n11-card n11-reveal">
                <p className="n11-mono">{`//_${String(i + 1).padStart(2, '0')}`}</p>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Results ---------- */}
        <section className="n11-section n11-results" aria-labelledby="n11-results-title">
          <h2 className="n11-h2 n11-reveal" id="n11-results-title">The numbers so far.</h2>
          <dl className="n11-stats">
            <div className="n11-reveal"><dt>Production sites &amp; apps shipped</dt><dd>30+</dd></div>
            <div className="n11-reveal"><dt>Years designing and building</dt><dd>4+</dd></div>
            <div className="n11-reveal"><dt>Developers led</dt><dd>5</dd></div>
          </dl>
        </section>

        {/* ---------- Work ---------- */}
        <section className="n11-section" id="work" aria-labelledby="n11-work-title">
          <p className="n11-mono n11-reveal">Selected work</p>
          <h2 className="n11-h2 n11-reveal" id="n11-work-title">Products I designed and built.</h2>
          <ul className="n11-work">
            {work.map((p, i) => (
              <li key={p.id} className="n11-shot n11-reveal">
                <div className="n11-shot__img" aria-hidden="true">
                  <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                </div>
                <div className="n11-shot__text">
                  <p className="n11-mono">{`//_${String(i + 1).padStart(2, '0')} · ${p.category}`}</p>
                  <h3><Link to={`/projects/${p.id}`} className="n11-stretch">{p.name}</Link></h3>
                  <p>{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- About / contact ---------- */}
        <section className="n11-section n11-about" id="about" aria-labelledby="n11-about-title">
          <figure className="n11-quote n11-reveal">
            <blockquote>
              <p>&ldquo;The best interface is the one nobody notices: clear, fast, and usable by everyone.&rdquo;</p>
            </blockquote>
            <figcaption>A.J. Skidmore, UX designer &amp; front-end engineer</figcaption>
          </figure>
          <h2 className="n11-h2 n11-reveal" id="n11-about-title">Let&rsquo;s build something clear.</h2>
          <div className="n11-actions n11-reveal">
            <a className="n11-btn n11-btn--light" href="mailto:hello@ajskidmore.com"><span className="n11-btn__icon" aria-hidden="true">&rarr;</span>hello@ajskidmore.com</a>
            <a className="n11-btn" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
          </div>
        </section>
      </main>

      <footer className="n11-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign11;
