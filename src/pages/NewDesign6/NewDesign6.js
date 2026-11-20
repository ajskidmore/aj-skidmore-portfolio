// src/pages/NewDesign6/NewDesign6.js
// /new-design6 · "Signal"
// Inspired by wavyideas.com (glowing light wave on black, hand-drawn doodles, bracket-numbered
// services). Made original: interactive light waves that react to the pointer, a hand-drawn
// strike through "noise", a keyboard-friendly card rail, and a sine-wave logo.
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import WaveCanvas from './WaveCanvas';
import './newDesign6.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap';

const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];

const SERVICES = [
  { n: '01', title: 'Research', text: 'Interviews, observation and usability tests with the people who will actually use the product.', tags: ['Interviews', 'Usability testing', 'Synthesis'] },
  { n: '02', title: 'UX & UI design', text: 'Flows, wireframes and Figma prototypes, organized into a design system that keeps every screen consistent.', tags: ['User flows', 'Prototyping', 'Design systems'] },
  { n: '03', title: 'Front-end engineering', text: 'I build what I design in React, TypeScript and Next.js, so nothing gets lost between mockup and product.', tags: ['React', 'TypeScript', 'Firebase'] },
  { n: '04', title: 'Accessibility', text: 'WCAG 2.2 AA from the first wireframe, checked by hand with a keyboard and the NVDA screen reader.', tags: ['WCAG 2.2 AA', 'NVDA', 'Audits'] },
];

// Logo: a sine wave in a glowing rounded square
const Logo = () => (
  <svg className="n6-logo" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="none" stroke="url(#n6-lg)" strokeWidth="2" />
    <path d="M7 20 C11 10, 15 10, 20 20 S29 30, 33 20" fill="none" stroke="url(#n6-lg)" strokeWidth="3" strokeLinecap="round" />
    <defs>
      <linearGradient id="n6-lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7dd3fc" /><stop offset="0.5" stopColor="#a78bfa" /><stop offset="1" stopColor="#f472b6" />
      </linearGradient>
    </defs>
  </svg>
);

const NewDesign6 = () => {
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  usePreviewPage({ title: 'A.J. Skidmore | Signal preview', fontHref: FONT_HREF, bodyClass: 'n6-page' });
  useReveal(rootRef, '.n6-reveal');

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  const scrollRail = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : 400;
    rail.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="n6" ref={rootRef}>
      <a className="n6-skip" href="#n6-main">Skip to main content</a>

      <header className="n6-bar">
        <a className="n6-brand" href="#top" aria-label="A.J. Skidmore, back to top"><Logo /><span>aj skidmore</span></a>
        <nav aria-label="Main" className="n6-nav">
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a className="n6-cta" href="mailto:hello@ajskidmore.com">Start a project</a>
      </header>

      <main id="n6-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n6-hero" id="top" aria-labelledby="n6-title">
          <WaveCanvas paused={paused} />
          <div className="n6-hero__copy">
            <p className="n6-eyebrow n6-reveal">UX designer &amp; front-end engineer</p>
            <h1 className="n6-title n6-reveal" id="n6-title">
              Clear signal.
              <span className="n6-title__line">
                Zero{' '}
                <span className="n6-strike">
                  noise
                  <svg viewBox="0 0 220 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                    <path d="M6 38 C40 30, 80 22, 120 26 S190 20, 214 14" />
                    <path d="M10 22 C60 34, 120 40, 210 34" />
                  </svg>
                </span>.
              </span>
            </h1>
            <p className="n6-lede n6-reveal">
              I design and build accessible products where clarity matters, from the first
              interview to the last line of code.
            </p>
            <div className="n6-actions n6-reveal">
              <a className="n6-btn n6-btn--glow" href="#work">See the work</a>
              <a className="n6-btn" href="#services">How I work</a>
              <svg className="n6-doodle-arrow" viewBox="0 0 120 70" aria-hidden="true" focusable="false">
                <path d="M112 54 C90 58, 40 52, 14 26" />
                <path d="M10 42 L12 24 L30 24" />
              </svg>
            </div>
          </div>
          {!reduceMotion && (
            <button type="button" className="n6-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                {paused ? <path d="M5 3.5v9l7-4.5z" fill="currentColor" /> : <path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" fill="currentColor" />}
              </svg>
              {paused ? 'Play waves' : 'Pause waves'}
            </button>
          )}
          <p className="n6-hint" aria-hidden="true">move your cursor over the waves</p>
        </section>

        {/* ---------- Intro ---------- */}
        <section className="n6-section n6-intro" aria-labelledby="n6-intro-title">
          <h2 className="visually-hidden" id="n6-intro-title">About</h2>
          <p className="n6-intro__text n6-reveal">
            I&rsquo;m A.J., an Experience Architecture grad from Michigan State. For 4+ years I&rsquo;ve
            shipped 30+ production sites and apps, led a team of developers, and audited public
            services for accessibility. Now I design and build my own products end to end.
          </p>
        </section>

        {/* ---------- Services ---------- */}
        <section className="n6-section" id="services" aria-labelledby="n6-services-title">
          <header className="n6-head n6-reveal">
            <p className="n6-eyebrow">Services</p>
            <h2 className="n6-h2" id="n6-services-title">What I bring to the team</h2>
          </header>
          <ol className="n6-services">
            {SERVICES.map((s) => (
              <li key={s.n} className="n6-service n6-reveal">
                <p className="n6-service__num" aria-hidden="true">[{s.n}]</p>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <ul className="n6-tags" aria-label={`${s.title} skills`}>
                  {s.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Work rail ---------- */}
        <section className="n6-section" id="work" aria-labelledby="n6-work-title">
          <header className="n6-head n6-head--row n6-reveal">
            <div>
              <p className="n6-eyebrow">Works <span aria-hidden="true">(05)</span></p>
              <h2 className="n6-h2" id="n6-work-title">Products I designed and built</h2>
            </div>
            <div className="n6-rail-btns">
              <button type="button" onClick={() => scrollRail(-1)} aria-label="Previous projects">&larr;</button>
              <button type="button" onClick={() => scrollRail(1)} aria-label="Next projects">&rarr;</button>
            </div>
          </header>
          <ul className="n6-rail" ref={railRef} tabIndex={0} aria-label="Projects, scroll sideways">
            {work.map((p) => (
              <li key={p.id} className="n6-card">
                <div className="n6-card__img" aria-hidden="true">
                  <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                </div>
                <p className="n6-card__meta">{p.category}</p>
                <h3><Link to={`/projects/${p.id}`} className="n6-stretch">{p.name}</Link></h3>
                <p className="n6-card__summary">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="n6-section n6-contact" id="contact" aria-labelledby="n6-contact-title">
          <h2 className="n6-contact__title n6-reveal" id="n6-contact-title">Tune in.</h2>
          <p className="n6-reveal">Have a product that needs to be clearer, kinder or more accessible? Let&rsquo;s talk.</p>
          <div className="n6-actions n6-actions--center n6-reveal">
            <a className="n6-btn n6-btn--glow" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
            <a className="n6-btn" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="n6-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign6;
