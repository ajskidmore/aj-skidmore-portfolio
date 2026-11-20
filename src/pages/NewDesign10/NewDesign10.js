// src/pages/NewDesign10/NewDesign10.js
// /new-design10 · "Network"
// Inspired by sequen.ai: warm paper, a calm serif headline and an exploding node network.
// Made original and interactive: the network IS A.J.'s work. Projects sit in the core and
// skills orbit outside; hover or focus a project (in the graph or the list) to light up the
// skills it used. The graph is decorative-but-mirrored: every connection is also listed in text.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign10.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;500;600&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap';

const SKILLS = {
  research: 'User research',
  testing: 'Usability testing',
  ia: 'Information architecture',
  figma: 'Figma prototyping',
  system: 'Design systems',
  a11y: 'Accessibility',
  react: 'React',
  ts: 'TypeScript',
  next: 'Next.js',
  firebase: 'Firebase',
  dataviz: 'Data visualization',
  content: 'Plain-language content',
};

const USES = {
  travelcare: ['research', 'ia', 'system', 'a11y', 'react', 'ts', 'next', 'firebase', 'content'],
  efilmhub: ['research', 'testing', 'figma', 'ia', 'react', 'ts', 'next'],
  eudo: ['research', 'figma', 'dataviz', 'react', 'ts', 'next', 'firebase'],
  loopwise: ['a11y', 'system', 'react', 'ts', 'firebase', 'content'],
  bloom: ['testing', 'a11y', 'firebase', 'content'],
};
const ORDER = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };

const W = 1000;
const H = 620;
const CX = W / 2;
const CY = H / 2 + 20;

const NewDesign10 = () => {
  const rootRef = useRef(null);
  const [active, setActive] = useState(null);
  const [drift, setDrift] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  usePreviewPage({ title: 'A.J. Skidmore | Network preview', fontHref: FONT_HREF, bodyClass: 'n10-page' });
  useReveal(rootRef, '.n10-reveal');

  const projects = useMemo(() => ORDER.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean), []);

  // Layout: projects on an inner ring, skills on an outer ring
  const layout = useMemo(() => {
    const pNodes = projects.map((p, i) => {
      const a = (i / projects.length) * Math.PI * 2 - Math.PI / 2;
      return { id: p.id, name: p.name, x: CX + Math.cos(a) * 120, y: CY + Math.sin(a) * 105 };
    });
    const keys = Object.keys(SKILLS);
    const sNodes = keys.map((k, i) => {
      const a = (i / keys.length) * Math.PI * 2 - Math.PI / 2 + 0.26;
      const r = i % 2 ? 300 : 255;
      return { id: k, name: SKILLS[k], x: CX + Math.cos(a) * r * 1.45, y: CY + Math.sin(a) * r * 0.82, ring: i % 2 };
    });
    return { pNodes, sNodes };
  }, [projects]);

  // Gentle breathing drift of the outer ring (off for reduced motion)
  useEffect(() => {
    if (reduceMotion) return undefined;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      setDrift(Math.sin((now - start) / 2200));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const lit = active ? new Set(USES[active]) : null;

  return (
    <div className="n10" ref={rootRef}>
      <a className="n10-skip" href="#n10-main">Skip to main content</a>

      <header className="n10-bar">
        <a className="n10-brand" href="#top" aria-label="A.J. Skidmore, back to top">
          <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
            <path d="M8 30 L20 10 L32 30 M14 22 H26" fill="none" stroke="#1f4e6e" strokeWidth="2" />
            <circle cx="20" cy="10" r="3.2" fill="#1f4e6e" /><circle cx="8" cy="30" r="3.2" fill="#c0405f" /><circle cx="32" cy="30" r="3.2" fill="#7f9a92" />
          </svg>
          <span>skidmore.</span>
        </a>
        <nav aria-label="Main" className="n10-nav">
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
        <a className="n10-cta" href="mailto:hello@ajskidmore.com">Get in touch</a>
      </header>

      <main id="n10-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n10-hero" id="top" aria-labelledby="n10-title">
          <p className="n10-pill n10-reveal">Open to UX design roles <span aria-hidden="true">&rarr;</span></p>
          <h1 className="n10-title n10-reveal" id="n10-title">A.J. is how teams turn research into products people actually use.</h1>
          <p className="n10-lede n10-reveal">
            UX designer and front-end engineer. Every project below connects research, design and code.
            Hover a project to see the skills behind it.
          </p>
          <div className="n10-actions n10-reveal">
            <a className="n10-btn" href="#work">See the work</a>
            <a className="n10-btn n10-btn--line" href="#about">About me</a>
          </div>

          <div className="n10-graph" aria-hidden="true" onMouseLeave={() => setActive(null)}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
              {layout.pNodes.map((p) => USES[p.id].map((sid) => {
                const s = layout.sNodes.find((n) => n.id === sid);
                const on = active === p.id;
                return (
                  <line key={`${p.id}-${sid}`} x1={p.x} y1={p.y} x2={s.x} y2={s.y + (s.ring ? drift * 6 : -drift * 6)}
                    className={`n10-edge${on ? ' is-on' : ''}${active && !on ? ' is-dim' : ''}`} />
                );
              }))}
              {layout.sNodes.map((s) => {
                const on = lit && lit.has(s.id);
                const y = s.y + (s.ring ? drift * 6 : -drift * 6);
                return (
                  <g key={s.id} className={`n10-skill${on ? ' is-on' : ''}${lit && !on ? ' is-dim' : ''}`}>
                    <circle cx={s.x} cy={y} r={on ? 9 : 6.5} />
                    <text x={s.x} y={y - 16} textAnchor="middle">{s.name}</text>
                  </g>
                );
              })}
              {layout.pNodes.map((p) => (
                <g key={p.id} className={`n10-proj${active === p.id ? ' is-on' : ''}`} onMouseEnter={() => setActive(p.id)}>
                  <circle cx={p.x} cy={p.y} r="15" />
                  <text x={p.x} y={p.y + 34} textAnchor="middle">{p.name}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ---------- Work list (the accessible mirror of the graph) ---------- */}
        <section className="n10-section" id="work" aria-labelledby="n10-work-title">
          <p className="n10-eyebrow n10-reveal">Selected work</p>
          <h2 className="n10-h2 n10-reveal" id="n10-work-title">Five products, one connected practice.</h2>
          <ul className="n10-cards">
            {projects.map((p) => (
              <li key={p.id} className="n10-card n10-reveal" data-on={active === p.id ? 'true' : undefined}
                onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.id)} onBlur={() => setActive(null)}>
                <div className="n10-card__img" aria-hidden="true">
                  <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                </div>
                <p className="n10-mono">{p.category}</p>
                <h3><Link to={`/projects/${p.id}`} className="n10-stretch">{p.name}</Link></h3>
                <p className="n10-card__summary">{p.summary}</p>
                <p className="n10-card__skills"><span className="visually-hidden">Skills used: </span>{USES[p.id].map((k) => SKILLS[k]).join(' · ')}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Skills ---------- */}
        <section className="n10-section n10-skills" id="skills" aria-labelledby="n10-skills-title">
          <p className="n10-eyebrow n10-reveal">Skills</p>
          <h2 className="n10-h2 n10-reveal" id="n10-skills-title">Research, design and code, connected.</h2>
          <ul className="n10-skill-list">
            {Object.entries(SKILLS).map(([k, name]) => (
              <li key={k} className="n10-reveal">
                <span className="n10-skill-list__name">{name}</span>
                <span className="n10-mono">{ORDER.filter((id) => USES[id].includes(k)).length} of 5 projects</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- About ---------- */}
        <section className="n10-section n10-about" id="about" aria-labelledby="n10-about-title">
          <img className="n10-about__photo n10-reveal" src="/assets/images/new-design/aj-cutout.png" alt="A.J. Skidmore smiling, in a navy suit jacket" width="1200" height="1600" loading="lazy" />
          <div>
            <p className="n10-eyebrow n10-reveal">About</p>
            <h2 className="n10-h2 n10-reveal" id="n10-about-title">Experience Architecture, applied.</h2>
            <p className="n10-reveal">I studied Experience Architecture at Michigan State, a blend of UX and UI design, user research and web development. For 4+ years I&rsquo;ve shipped 30+ production sites and apps, led a team of developers, and run accessibility audits for public services.</p>
            <div className="n10-actions n10-reveal">
              <a className="n10-btn" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
              <a className="n10-btn n10-btn--line" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="n10-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign10;
