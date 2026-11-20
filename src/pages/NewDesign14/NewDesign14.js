// src/pages/NewDesign14/NewDesign14.js
// /new-design14 · "Clinical"
// Inspired by ohmd.com (healthcare software, close to A.J.'s target role): deep forest green,
// a calm serif headline, floating UI cards over a glittering particle field, warm paper sections
// with rounded photo-and-text cards, a trust strip, mint pill buttons. Original: the floating
// cards show REAL TravelCare+ features (credential reminder, compact check, plain-language guide).
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign14.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400&family=Inter:wght@400;500;600&display=swap';
const G = '/assets/images/new-design/gallery';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };

const STORIES = [
  {
    id: 'travelcare', kicker: 'Healthcare',
    title: 'Clinicians shouldn’t need a lawyer to read a contract.',
    body: 'TravelCare+ turns licenses, compacts, stipends and tax rules into plain English for travel nurses and therapists, with every fact linked to its official source. I researched it alongside a traveling occupational therapist, designed it and built it.',
    img: `${G}/tc-credentials.jpg`, alt: 'TravelCare+ credentials tracker with renewal reminders and a "Can I work in…?" checker',
  },
  {
    id: 'eudo', kicker: 'Data & research',
    title: 'Complex statistics, explained like a person would.',
    body: 'Eudo helps HR teams run programs as experiments. I turned causal-impact results into labeled charts and plain-language summaries leaders can act on.',
    img: `${G}/eudo-1.jpg`, alt: 'Eudo experiment page with a step-by-step setup checklist and progress score',
  },
  {
    id: 'loopwise', kicker: 'Accessible learning',
    title: 'Accessibility checks that block a release.',
    body: 'Loopwise teaches coding from zero. Its automated WCAG 2.2 AA checks must pass before anything ships, and every color meets contrast by design.',
    img: `${G}/lw-learn.jpg`, alt: 'Loopwise learning path with lesson nodes and an Up next card',
  },
];

// Glittering particle field (decorative canvas; still for reduced motion)
const Glitter = () => {
  const ref = useRef(null);
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0; let h = 0; let raf = 0;
    const pts = Array.from({ length: 420 }, () => ({ x: Math.random(), y: 0.45 + Math.random() * 0.55, r: Math.random() * 1.4 + 0.3, p: Math.random() * 6.28, s: 0.4 + Math.random() }));
    const size = () => { const b = c.getBoundingClientRect(); w = c.width = b.width * dpr; h = c.height = b.height * dpr; };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        const wave = Math.sin(p.x * 6 + t * 0.0004) * 0.04;
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.p + t * 0.0015 * p.s));
        ctx.fillStyle = `rgba(182, 242, 201, ${reduce ? 0.5 : a})`;
        ctx.beginPath(); ctx.arc(p.x * w, (p.y + wave) * h, p.r * dpr, 0, 6.29); ctx.fill();
      });
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    size(); draw(0);
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(0); });
    ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduce]);
  return <canvas ref={ref} className="n14-glitter" aria-hidden="true" />;
};

const NewDesign14 = () => {
  const rootRef = useRef(null);
  usePreviewPage({ title: 'A.J. Skidmore | Clinical preview', fontHref: FONT_HREF, bodyClass: 'n14-page' });
  useReveal(rootRef, '.n14-reveal');
  const others = ['efilmhub', 'bloom'].map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="n14" ref={rootRef}>
      <a className="n14-skip" href="#n14-main">Skip to main content</a>
      <header className="n14-bar">
        <a className="n14-brand" href="#top" aria-label="A.J. Skidmore, back to top">
          <span className="n14-dots" aria-hidden="true"><i /><i /><i /><i /><i /></span>A.J. Skidmore
        </a>
        <nav aria-label="Main" className="n14-nav">
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#approach">Approach</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="n14-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n14-hero" id="top" aria-labelledby="n14-title">
          <Glitter />
          <div className="n14-hero__copy">
            <h1 className="n14-title n14-reveal" id="n14-title">Clinical workflows end. Good design doesn&rsquo;t.</h1>
            <p className="n14-lede n14-reveal">I&rsquo;m A.J., a UX designer and front-end engineer. I turn complex, regulated workflows into interfaces clinicians and patients understand on the first try, and I build them to WCAG 2.2 AA.</p>
            <div className="n14-actions n14-reveal">
              <a className="n14-btn n14-btn--mint" href="#work">See the work</a>
              <a className="n14-btn n14-btn--ghost" href="#approach">How I work</a>
            </div>
          </div>

          <div className="n14-float" aria-label="Examples from TravelCare+, a healthcare product A.J. designed and built" role="group">
            <div className="n14-ui n14-ui--a n14-reveal">
              <p className="n14-ui__head"><span className="n14-ui__icon" aria-hidden="true">RN</span>Texas RN license <time>in 30 days</time></p>
              <p className="n14-ui__body">Renewal coming up. 12 of 20 continuing-education hours logged.</p>
            </div>
            <div className="n14-ui n14-ui--b n14-reveal">
              <p className="n14-ui__head"><span className="n14-ui__icon n14-ui__icon--ok" aria-hidden="true">&#10003;</span>Can I work in Arizona?</p>
              <p className="n14-ui__body">Yes. Arizona is a Nurse Licensure Compact state. <em>Source: NCSBN</em></p>
            </div>
            <div className="n14-ui n14-ui--c n14-reveal">
              <p className="n14-ui__head"><span className="n14-ui__icon" aria-hidden="true">?</span>What is a tax home?</p>
              <p className="n14-ui__body">In short: the place you keep coming back to. Details explained in plain English.</p>
            </div>
          </div>
        </section>

        {/* ---------- Trust ---------- */}
        <section className="n14-trust" aria-label="Background">
          <p>Experience Architecture, Michigan State</p>
          <p>30+ production sites &amp; apps</p>
          <p>WCAG audits for public services</p>
          <p>Lead of a 5-developer team</p>
        </section>

        {/* ---------- Stories ---------- */}
        <section className="n14-section" id="work" aria-labelledby="n14-work-title">
          <h2 className="n14-h2 n14-reveal" id="n14-work-title">Work that makes hard things feel simple.</h2>
          <ul className="n14-stories">
            {STORIES.map((s) => (
              <li key={s.id} className="n14-story n14-reveal">
                <div className="n14-story__text">
                  <p className="n14-kicker">{s.kicker}</p>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <Link className="n14-link" to={`/projects/${s.id}`}>View {featuredProjects.find((p) => p.id === s.id).name} <span aria-hidden="true">&rarr;</span></Link>
                </div>
                <div className="n14-story__img"><img src={s.img} alt={s.alt} loading="lazy" /></div>
              </li>
            ))}
          </ul>
          <ul className="n14-mini">
            {others.map((p) => (
              <li key={p.id} className="n14-minicard n14-reveal">
                <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                <div>
                  <p className="n14-kicker">{p.category}</p>
                  <h3><Link to={`/projects/${p.id}`} className="n14-stretch">{p.name}</Link></h3>
                  <p>{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Approach ---------- */}
        <section className="n14-section n14-dark" id="approach" aria-labelledby="n14-approach-title">
          <h2 className="n14-h2 n14-reveal" id="n14-approach-title">How I work with clinical teams.</h2>
          <ol className="n14-steps">
            {[
              ['Listen', 'Shadow the workflow, interview clinicians and stakeholders, and map where people get stuck.'],
              ['Design', 'Flows, wireframes and Figma prototypes, tested early with the people who will use them.'],
              ['Build', 'Accessible React interfaces, consistent with brand standards and a shared design system.'],
              ['Measure', 'Post-launch usability feedback and analytics decide what changes next.'],
            ].map(([t, d], i) => (
              <li key={t} className="n14-step n14-reveal"><p className="n14-step__n">0{i + 1}</p><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="n14-section n14-contact" id="contact" aria-labelledby="n14-contact-title">
          <h2 className="n14-h2 n14-reveal" id="n14-contact-title">Let&rsquo;s make care easier to use.</h2>
          <div className="n14-actions n14-reveal">
            <a className="n14-btn n14-btn--dark" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
            <a className="n14-btn n14-btn--line" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
          </div>
        </section>
      </main>

      <footer className="n14-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign14;
