// src/pages/NewDesign15/NewDesign15.js
// /new-design15 · "Inside Out"
// Inspired by pradnyadighe.com (a senior product designer's portfolio): a huge amber serif name
// scrolling across a near-black page, a centered asterisk mark, a monospace people-first
// statement, and a dotted scroll line. Original copy and structure: case rows with
// problem / approach / outcome, a principles section and the background-removed portrait.
// The name marquee is decorative (aria-hidden), pausable and still for reduced motion.
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign15.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=IBM+Plex+Mono:wght@400;500&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };

const CASES = [
  { id: 'travelcare', problem: 'Travel clinicians juggle licenses, contracts and tax rules written in legal language.', approach: 'Researched with a traveling occupational therapist; designed plain-language guides and tools with every fact cited.', outcome: 'One place to compare offers, track credentials and plan each assignment, audited to WCAG 2.2 AA.' },
  { id: 'efilmhub', problem: 'African filmmakers found crew and jobs through scattered social media groups.', approach: 'Interviewed filmmakers, mapped their workflows, prototyped mobile-first in Figma and tested with users.', outcome: 'One professional network for profiles, talent search, job postings and messaging.' },
  { id: 'eudo', problem: 'HR teams invest in programs without a clear way to show what worked.', approach: 'Turned causal-impact statistics into labeled charts and plain-language summaries.', outcome: 'Leaders can run programs as experiments and track results against the business case.' },
];

const Asterisk = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <path d="M20 4 V36 M6.1 12 L33.9 28 M6.1 28 L33.9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const NewDesign15 = () => {
  const rootRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  usePreviewPage({ title: 'A.J. Skidmore | Inside Out preview', fontHref: FONT_HREF, bodyClass: 'n15-page' });
  useReveal(rootRef, '.n15-reveal');

  return (
    <div className={`n15${paused ? ' is-paused' : ''}`} ref={rootRef}>
      <a className="n15-skip" href="#n15-main">Skip to main content</a>
      <header className="n15-bar">
        <a className="n15-mono" href="#top">A.J. Skidmore</a>
        <a className="n15-mark-link" href="#top" aria-label="Back to top"><Asterisk className="n15-mark" /></a>
        <p className="n15-mono">UX designer &amp; engineer</p>
      </header>

      <main id="n15-main" tabIndex={-1}>
        <section className="n15-hero" id="top" aria-labelledby="n15-title">
          <h1 className="visually-hidden" id="n15-title">A.J. Skidmore, UX designer and front-end engineer</h1>
          <div className="n15-marquee" aria-hidden="true">
            <div className="n15-marquee__track">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="n15-marquee__item">A.J.&nbsp;Skidmore <Asterisk className="n15-marquee__star" /></span>
              ))}
            </div>
          </div>
          <div className="n15-statement">
            <p className="n15-mono n15-statement__a">Design that starts with people.</p>
            <p className="n15-mono n15-statement__b">Behind every confusing screen is someone trying to get something done. I start there.</p>
          </div>
          <div className="n15-scrollline" aria-hidden="true"><i /><i /><span /><i /></div>
          {!reduceMotion && (
            <button type="button" className="n15-pause n15-mono" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              {paused ? 'Play name' : 'Pause name'}
            </button>
          )}
        </section>

        <section className="n15-section n15-about" aria-labelledby="n15-about-title">
          <img className="n15-portrait n15-reveal" src="/assets/images/new-design/aj-cutout.png" alt="A.J. Skidmore smiling, in a navy suit jacket" width="1200" height="1600" loading="lazy" />
          <div>
            <p className="n15-mono n15-kicker n15-reveal">About</p>
            <h2 className="n15-h2 n15-reveal" id="n15-about-title">A designer who builds, and an engineer who listens.</h2>
            <p className="n15-body n15-reveal">Experience Architecture grad from Michigan State. For 4+ years I&rsquo;ve shipped 30+ production sites and apps, led a team of five developers and audited public services for accessibility. I research, design and build, so the product people use is the one we designed.</p>
          </div>
        </section>

        <section className="n15-section" aria-labelledby="n15-work-title">
          <p className="n15-mono n15-kicker n15-reveal">Selected work</p>
          <h2 className="n15-h2 n15-reveal" id="n15-work-title">Problems, people and what changed.</h2>
          <ol className="n15-cases">
            {CASES.map((c, i) => {
              const p = featuredProjects.find((x) => x.id === c.id);
              return (
                <li key={c.id} className="n15-case n15-reveal">
                  <div className="n15-case__head">
                    <p className="n15-mono n15-case__n">0{i + 1}</p>
                    <h3><Link to={`/projects/${c.id}`}>{p.name}</Link></h3>
                    <p className="n15-mono">{p.category}</p>
                  </div>
                  <div className="n15-case__img" aria-hidden="true"><img src={IMAGES[c.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" /></div>
                  <dl className="n15-case__grid">
                    <div><dt className="n15-mono">Problem</dt><dd>{c.problem}</dd></div>
                    <div><dt className="n15-mono">Approach</dt><dd>{c.approach}</dd></div>
                    <div><dt className="n15-mono">Outcome</dt><dd>{c.outcome}</dd></div>
                  </dl>
                </li>
              );
            })}
          </ol>
          <p className="n15-more n15-reveal">Also: <Link to="/projects/loopwise">Loopwise</Link> and <Link to="/projects/bloom">Bloom</Link>.</p>
        </section>

        <section className="n15-section n15-principles" aria-labelledby="n15-pr-title">
          <h2 className="n15-h2 n15-reveal" id="n15-pr-title">Three things I believe.</h2>
          <ol>
            {['Clarity is a form of respect.', 'Accessibility is the baseline, not a feature.', 'The design isn’t done until it ships.'].map((t) => (
              <li key={t} className="n15-reveal"><Asterisk className="n15-li-star" />{t}</li>
            ))}
          </ol>
        </section>

        <section className="n15-section n15-contact" aria-labelledby="n15-contact-title">
          <h2 className="n15-contact__title n15-reveal" id="n15-contact-title">Say hello.</h2>
          <p className="n15-reveal"><a className="n15-mail" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a></p>
          <p className="n15-reveal"><a className="n15-mono n15-li" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn &rarr;<span className="visually-hidden"> (opens in a new tab)</span></a></p>
        </section>
      </main>

      <footer className="n15-foot n15-mono">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign15;
