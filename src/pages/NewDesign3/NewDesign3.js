// src/pages/NewDesign3/NewDesign3.js
// /new-design3 · "Folio"
// Inspired by tombrown.design's editorial Swiss typography (offset intro, huge tight
// headline with one italic word, project index, FAQ), mixed with jptrindade.com's
// full-width nameplate and carolineschnetzler.com's grotesk + serif-italic pairing.
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign3.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500&family=Instrument+Serif:ital@1&display=swap';

const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };

const INDEX = [
  { id: 'travelcare', discipline: 'Research · UX · Build', platform: 'Web app' },
  { id: 'efilmhub', discipline: 'Research · UX · Build', platform: 'Web platform' },
  { id: 'eudo', discipline: 'Product design · Data viz', platform: 'SaaS' },
  { id: 'loopwise', discipline: 'UX · Content · Build', platform: 'Web app' },
  { id: 'bloom', discipline: 'UX · Build', platform: 'Progressive web app' },
];

const FAQ = [
  {
    q: 'Are you a designer or a developer?',
    a: 'Both, on purpose. I studied Experience Architecture (UX & UI design, user research and web development) and have spent 4+ years shipping production work. I design in Figma, then build the result in React, so nothing gets lost between the mockup and the product.',
  },
  {
    q: 'How do you approach accessibility?',
    a: 'From the first wireframe. I design to WCAG 2.2 AA, check contrast for every color pair, and audit by hand with a keyboard and the NVDA screen reader before running automated tests. I run recurring WCAG audits for municipal sites in my current role.',
  },
  {
    q: 'How do you run research?',
    a: 'I talk to the people who will use the product, watch how they work today, and test prototypes with them early. TravelCare+, for example, was shaped through close collaboration with a traveling occupational therapist.',
  },
  {
    q: 'What tools do you use?',
    a: 'Figma, Framer and Adobe Creative Cloud for design; React, TypeScript, Next.js, Node.js and Firebase for building; NVDA and axe for accessibility testing.',
  },
];

// Small typographic logo: a heavy "aj" whose j-dot is a cobalt square
const Logo = () => (
  <span className="n3-logo" aria-hidden="true">
    a<span className="n3-logo__j">j<i /></span>
  </span>
);

// A preview image that follows the pointer over the project index (pointer devices only)
const useCursorPreview = (enabled) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const el = ref.current;
    const move = (e) => {
      if (el) el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [enabled]);
  return ref;
};

const NewDesign3 = () => {
  const rootRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(null);
  const previewRef = useCursorPreview(!reduceMotion);

  usePreviewPage({ title: 'A.J. Skidmore | Folio preview', fontHref: FONT_HREF, bodyClass: 'n3-page' });
  useReveal(rootRef, '.n3-reveal');

  const rows = INDEX.map((row) => ({ ...row, ...featuredProjects.find((p) => p.id === row.id) }));
  const latest = rows[0];
  const hoveredRow = rows.find((r) => r.id === hovered);

  return (
    <div className="n3" ref={rootRef}>
      <a className="n3-skip" href="#n3-main">Skip to main content</a>

      <header className="n3-bar">
        <a className="n3-brand" href="#top" aria-label="A.J. Skidmore, back to top">
          <Logo />
          <span>A.J. Skidmore</span>
        </a>
        <nav aria-label="Main" className="n3-nav">
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </nav>
        <a className="n3-cta" href="mailto:hello@ajskidmore.com">
          Start a conversation <span aria-hidden="true">&#8599;</span>
        </a>
      </header>

      <main id="n3-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n3-hero" id="top" aria-labelledby="n3-title">
          <p className="n3-intro n3-reveal">
            <span className="n3-intro__lead">UX designer &amp; engineer</span> designing accessible
            products rooted in research, systems and craft.
          </p>
          <h1 className="n3-title n3-reveal" id="n3-title">
            Making <em>complex</em> things feel simple.
          </h1>
          <article className="n3-latest n3-reveal" aria-labelledby="n3-latest-title">
            <div className="n3-latest__mat" aria-hidden="true">
              <img src={IMAGES[latest.id] || latest.imageUrl} alt="" width="1440" height="720" />
            </div>
            <p className="n3-label">Latest project</p>
            <h2 className="n3-latest__title" id="n3-latest-title">
              <Link to={`/projects/${latest.id}`} className="n3-stretch">
                {latest.name} <span aria-hidden="true">&#8599;</span>
              </Link>
            </h2>
          </article>
        </section>

        {/* ---------- Nameplate ---------- */}
        <section className="n3-plate" aria-hidden="true">
          <p className="n3-plate__name">A.J.SKIDMORE</p>
          <p className="n3-plate__sub">UX DESIGN + ENGINEERING</p>
        </section>

        {/* ---------- Work index ---------- */}
        <section className="n3-section" id="work" aria-labelledby="n3-work-title">
          <header className="n3-head n3-reveal">
            <h2 id="n3-work-title">Selected work</h2>
            <p className="n3-count">({String(rows.length).padStart(2, '0')})</p>
          </header>
          <ol className="n3-index" onMouseLeave={() => setHovered(null)}>
            {rows.map((r, i) => (
              <li
                key={r.id}
                className={`n3-row n3-reveal${hovered === r.id ? ' is-hovered' : ''}`}
                onMouseEnter={() => setHovered(r.id)}
              >
                <span className="n3-row__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="n3-row__name">
                  <Link to={`/projects/${r.id}`} className="n3-stretch">{r.name}</Link>
                </h3>
                <p className="n3-row__meta">{r.discipline}</p>
                <p className="n3-row__meta">{r.platform}</p>
                <span className="n3-row__arrow" aria-hidden="true">&#8599;</span>
              </li>
            ))}
          </ol>
          <div
            ref={previewRef}
            className={`n3-preview${hoveredRow ? ' is-visible' : ''}`}
            aria-hidden="true"
          >
            {rows.map((r) => (
              <img
                key={r.id}
                src={IMAGES[r.id] || r.imageUrl}
                alt=""
                className={hovered === r.id ? 'is-active' : ''}
                width="1440"
                height="720"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="n3-section n3-statement" id="about" aria-labelledby="n3-about-title">
          <h2 className="n3-label n3-reveal" id="n3-about-title">About</h2>
          <p className="n3-statement__text n3-reveal">
            The best interfaces are the ones nobody notices: <em>clear</em>, fast, and usable by
            <em> everyone</em>. I research with real users, design in systems, and build the result
            myself, so the product people use is the one we designed.
          </p>
          <div className="n3-caps">
            {[
              ['01', 'Research', 'Interviews, observation and usability tests with the people who will use the product.'],
              ['02', 'Design', 'Flows, wireframes and Figma prototypes, organized into a small design system.'],
              ['03', 'Engineering', 'React, TypeScript, Next.js and Firebase. 30+ production sites and apps shipped.'],
              ['04', 'Accessibility', 'WCAG 2.2 AA by default, audited by hand with a keyboard and NVDA.'],
            ].map(([n, t, d]) => (
              <div key={n} className="n3-cap n3-reveal">
                <p className="n3-cap__num">{n}</p>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="n3-section n3-faq" id="faq" aria-labelledby="n3-faq-title">
          <div className="n3-faq__intro n3-reveal">
            <h2 id="n3-faq-title">Questions, <em>answered</em>.</h2>
            <p>Not what you&rsquo;re looking for? Email <a href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>.</p>
          </div>
          <div className="n3-faq__list">
            {FAQ.map((item) => (
              <details key={item.q} className="n3-qa n3-reveal">
                <summary>
                  <span>{item.q}</span>
                  <span className="n3-qa__icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- Closing ---------- */}
        <section className="n3-close" aria-labelledby="n3-close-title">
          <h2 className="n3-close__title n3-reveal" id="n3-close-title">
            Let&rsquo;s build something <em>useful</em>.
          </h2>
          <div className="n3-close__links n3-reveal">
            <a href="mailto:hello@ajskidmore.com">hello@ajskidmore.com <span aria-hidden="true">&#8599;</span></a>
            <a href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">&#8599;</span><span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href="#top">Back to top <span aria-hidden="true">&#8593;</span></a>
          </div>
        </section>
      </main>

      <footer className="n3-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign3;
