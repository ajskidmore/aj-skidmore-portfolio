// src/pages/NewDesign2/NewDesign2.js
// /new-design2 · "Nocturne"
// Inspired by amoscimpean.com's cinematic restraint: a near-black stage, one glowing
// monogram, a serif statement. Made original with A.J.'s continuous-line mark: a pulse
// of light travels the single stroke (pausable, still for reduced motion).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import AJMark from '../NewDesign/AJMark';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign2.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap';

const MARK_PATH = 'M12 48 L27 16 H50 M45 16 V39.5 A8.5 8.5 0 0 1 28.5 42 M27 16 L33.5 30 M20.6 35 H31';

const IMAGES = {
  travelcare: '/assets/images/new-design/travelcare.png',
};

const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];

const useEasternTime = () => {
  const format = () =>
    new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
};

// The hero mark: layered SVG strokes for the glow, plus a travelling light pulse
const GlowMark = () => (
  <svg className="n2-mark" viewBox="6 10 50 44" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="n2-grad" gradientUnits="userSpaceOnUse" x1="12" y1="48" x2="50" y2="16">
        <stop offset="0" stopColor="#6d7cff" />
        <stop offset="0.45" stopColor="#8fb8ff" />
        <stop offset="0.75" stopColor="#b69cff" />
        <stop offset="1" stopColor="#f3a6e0" />
      </linearGradient>
      <filter id="n2-bloom" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
      <filter id="n2-soft" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="0.6" />
      </filter>
    </defs>
    <path d={MARK_PATH} className="n2-mark__haze" stroke="url(#n2-grad)" filter="url(#n2-bloom)" />
    <path d={MARK_PATH} className="n2-mark__glow" stroke="url(#n2-grad)" filter="url(#n2-soft)" />
    <path d={MARK_PATH} className="n2-mark__core" />
    <path d={MARK_PATH} className="n2-mark__pulse" pathLength="100" filter="url(#n2-soft)" />
  </svg>
);

const NewDesign2 = () => {
  const rootRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const time = useEasternTime();

  usePreviewPage({ title: 'A.J. Skidmore | Nocturne preview', fontHref: FONT_HREF, bodyClass: 'n2-page' });
  useReveal(rootRef, '.n2-reveal');

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className={`n2${paused ? ' is-paused' : ''}`} ref={rootRef}>
      <a className="n2-skip" href="#n2-main">Skip to main content</a>

      <header className="n2-bar">
        <a className="n2-name" href="#top"><AJMark size={30} tone="light" />A.J. Skidmore</a>
        <p className="n2-role">UX Designer &amp; Full-Stack Engineer</p>
        <nav aria-label="Main" className="n2-nav">
          <ul>
            <li><a href="#work">Work</a>,</li>
            <li><a href="#about">About</a>,</li>
            <li><a href="#services">Services</a>,</li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="n2-main" tabIndex={-1}>
        {/* ---------- Stage ---------- */}
        <section className="n2-stage" id="top" aria-labelledby="n2-title">
          <div className="n2-bloom" aria-hidden="true" />
          <div className="n2-stage__mark">
            <GlowMark />
          </div>
          <div className="n2-stage__copy">
            <h1 className="n2-title" id="n2-title">
              Designer working where research meets engineering, building products people
              <em> understand</em>.
            </h1>
            <a className="n2-pill" href="#about">More about me</a>
          </div>
          {!reduceMotion && (
            <button type="button" className="n2-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                {paused ? <path d="M5 3.5v9l7-4.5z" fill="currentColor" /> : <path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" fill="currentColor" />}
              </svg>
              {paused ? 'Play light' : 'Pause light'}
            </button>
          )}
          <div className="n2-stage__foot">
            <p>Designed &amp; built by me.</p>
            <p className="n2-open"><span aria-hidden="true" />Open to new conversations</p>
            <p>Eastern Time <time>{time}</time></p>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section className="n2-section n2-about" id="about" aria-labelledby="n2-about-title">
          <div className="n2-about__photo n2-reveal">
            <img src="/assets/images/A.J.%20Skidmore%20Headshot.jpg" alt="A.J. Skidmore smiling, wearing a navy suit jacket" width="420" height="420" loading="lazy" />
          </div>
          <div className="n2-about__text">
            <h2 className="n2-h2 n2-reveal" id="n2-about-title">Hey, I&rsquo;m A.J.</h2>
            <p className="n2-lead n2-reveal">UX designer and full-stack engineer with 4+ years taking products from user research and prototypes to accessible, production-ready code.</p>
            <p className="n2-body n2-reveal">I studied Experience Architecture at Michigan State, a program that blends UX and UI design, user research and web development. Today I lead a team of developers, run accessibility audits by hand, and design and build my own products end to end.</p>
            <ul className="n2-creds n2-reveal">
              <li>B.A. Experience Architecture, Michigan State University</li>
              <li>30+ production sites and applications shipped</li>
              <li>Lead Full-Stack Engineer, Shumaker Technology Group</li>
              <li>WCAG 2.1 AA audits by hand with NVDA</li>
            </ul>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section className="n2-section" id="services" aria-labelledby="n2-services-title">
          <h2 className="n2-kicker n2-reveal" id="n2-services-title">In short, what I do</h2>
          <div className="n2-cols">
            <div className="n2-col n2-reveal">
              <h3>Product</h3>
              <ul><li>User research &amp; testing</li><li>UX/UI design</li><li>Prototyping in Figma</li><li>Design systems</li></ul>
            </div>
            <div className="n2-col n2-reveal">
              <h3>Engineering</h3>
              <ul><li>React &amp; TypeScript</li><li>Next.js &amp; Node.js</li><li>Firebase</li><li>WordPress &amp; PHP</li></ul>
            </div>
            <div className="n2-col n2-reveal">
              <h3>Accessibility</h3>
              <ul><li>WCAG 2.2 AA audits</li><li>Screen reader testing</li><li>Inclusive content</li><li>Remediation plans</li></ul>
            </div>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section className="n2-section" id="work" aria-labelledby="n2-work-title">
          <h2 className="n2-kicker n2-reveal" id="n2-work-title">Selected work</h2>
          <ol className="n2-work">
            {work.map((p, i) => (
              <li key={p.id} className="n2-project n2-reveal">
                <div className="n2-project__media" aria-hidden="true">
                  <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                </div>
                <div className="n2-project__text">
                  <p className="n2-project__num">{String(i + 1).padStart(2, '0')} · {p.category}</p>
                  <h3 className="n2-project__title">
                    <Link to={`/projects/${p.id}`} className="n2-project__link">{p.name}</Link>
                  </h3>
                  <p className="n2-project__summary">{p.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="n2-section n2-contact" id="contact" aria-labelledby="n2-contact-title">
          <h2 className="n2-contact__title n2-reveal" id="n2-contact-title">Let&rsquo;s <em>talk</em>.</h2>
          <p className="n2-reveal">
            <a className="n2-contact__mail" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
          </p>
          <p className="n2-reveal">
            <a className="n2-pill" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        </section>
      </main>

      <footer className="n2-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign2;
