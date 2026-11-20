// src/pages/NewDesign19/NewDesign19.js
// /new-design19 · "Details"
// Inspired by rauno.me (an interaction designer's site): a light gray canvas, large plain sans
// statements in white cards, a bright yellow circle, and a horizontal deck with a tiny slide
// indicator. Original take: every card is a working study of an interface detail A.J. designs
// AND builds (live contrast checker, touch targets, focus rings, easing), followed by the
// project cards. Wide screens get a snap-scrolling deck; phones get a simple vertical stack.
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign19.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };

const channel = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const grayRatio = (g) => {
  const L = channel(g);
  return 1.05 / (L + 0.05);
};
const hex = (g) => `#${g.toString(16).padStart(2, '0').repeat(3)}`;

const Intro = () => {
  const ref = useRef(null);
  const reduce = usePrefersReducedMotion();
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty('--y', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div className="d19-intro" ref={ref} onPointerMove={onMove}>
      <span className="d19-sun" aria-hidden="true"><i /></span>
      <h1 className="d19-statement">
        <span>A.J. Skidmore </span>
        <span className="d19-in">is a UX designer </span>
        <span>and front-end </span>
        <span className="d19-in">engineer who sweats </span>
        <span>the details people </span>
        <span className="d19-in">never notice.</span>
      </h1>
      <p className="d19-meta"><span>Experience Architecture · Michigan State</span><span>Browse with the arrow keys or the buttons below</span></p>
    </div>
  );
};

const Contrast = () => {
  const [g, setG] = useState(0x76);
  const r = grayRatio(g);
  const aa = r >= 4.5;
  const aaa = r >= 7;
  return (
    <div className="d19-study">
      <p className="d19-label">Study 01 · Contrast</p>
      <h2 className="d19-h">Gray text is a decision, not a default.</h2>
      <p className="d19-sample" style={{ color: hex(g) }}>Your next shift starts at 7:00 a.m.</p>
      <label className="d19-range">
        <span>Text gray</span>
        <input
          type="range"
          min="0"
          max="220"
          value={g}
          onChange={(e) => setG(Number(e.target.value))}
          aria-valuetext={`${hex(g)}, contrast ${r.toFixed(2)} to 1, ${aa ? 'passes' : 'fails'} AA`}
        />
      </label>
      <div className="d19-readout" aria-live="polite">
        <span className="d19-mono">{hex(g)}</span>
        <span className="d19-ratio">{r.toFixed(2)}:1</span>
        <span className="d19-badge" data-ok={aa}>AA {aa ? 'pass' : 'fail'}</span>
        <span className="d19-badge" data-ok={aaa}>AAA {aaa ? 'pass' : 'fail'}</span>
      </div>
      <p className="d19-note">Computed live with the WCAG luminance formula, the same check I run on every color token before it ships.</p>
    </div>
  );
};

const Targets = () => (
  <div className="d19-study">
    <p className="d19-label">Study 02 · Touch targets</p>
    <h2 className="d19-h">Fingers are not cursors.</h2>
    <div className="d19-targets" aria-hidden="true">
      <figure>
        <div className="d19-tgt d19-tgt--s"><span>×</span></div>
        <figcaption>20 × 20<br /><b>Too small</b></figcaption>
      </figure>
      <figure>
        <div className="d19-tgt d19-tgt--m"><span>×</span></div>
        <figcaption>24 × 24<br /><b>WCAG minimum</b></figcaption>
      </figure>
      <figure>
        <div className="d19-tgt d19-tgt--l"><span>×</span></div>
        <figcaption>44 × 44<br /><b>What I design</b></figcaption>
      </figure>
    </div>
    <p className="d19-note">Clinicians tap with gloves, in a hurry, on a phone. Every control I ship has at least a 44-pixel hit area, even when the icon is 16.</p>
  </div>
);

const Focus = () => (
  <div className="d19-study">
    <p className="d19-label">Study 03 · Focus</p>
    <h2 className="d19-h">Keyboard users deserve design too.</h2>
    <div className="d19-focus">
      <div className="d19-focus__demo" aria-hidden="true">
        <span className="d19-fbtn d19-fbtn--none">Save</span>
        <small>Focus removed: where am I?</small>
      </div>
      <div className="d19-focus__demo">
        <button type="button" className="d19-fbtn d19-fbtn--real">Press Tab to focus me</button>
        <small>Designed: 2px ring, 3px gap, 3:1 contrast</small>
      </div>
    </div>
    <p className="d19-note">A visible, consistent focus ring is the first thing I check in any build, and it&rsquo;s designed in Figma, not left to the browser.</p>
  </div>
);

const Motion = () => {
  const [on, setOn] = useState(false);
  const reduce = usePrefersReducedMotion();
  return (
    <div className="d19-study">
      <p className="d19-label">Study 04 · Motion</p>
      <h2 className="d19-h">Easing is how an interface feels.</h2>
      <div className="d19-tracks" data-on={on} aria-hidden="true">
        <div className="d19-track"><span className="d19-dot d19-dot--lin" /><small>linear</small></div>
        <div className="d19-track"><span className="d19-dot d19-dot--out" /><small>ease-out (0.16, 1, 0.3, 1)</small></div>
      </div>
      <button type="button" className="d19-pill" aria-pressed={on} onClick={() => setOn((v) => !v)}>{on ? 'Reset' : 'Play'}</button>
      <p className="d19-note">{reduce ? 'Your device asks for reduced motion, so the dots jump instead of glide. I build that preference into every product.' : 'Things should arrive fast and settle gently. And if someone turns on reduced motion, I respect it.'}</p>
    </div>
  );
};

const ProjectCard = ({ p, n }) => (
  <div className="d19-project">
    <div className="d19-project__text">
      <p className="d19-label">Work {String(n).padStart(2, '0')} · {p.category}</p>
      <h2 className="d19-h"><Link to={`/projects/${p.id}`} className="d19-plink">{p.name}</Link></h2>
      <p>{p.summary}</p>
      <ul className="d19-tags" aria-label="Built with">{p.tools.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
    <div className="d19-project__img" aria-hidden="true"><img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" /></div>
  </div>
);

const Contact = () => (
  <div className="d19-contact">
    <img src="/assets/images/new-design/aj-cutout-sm.png" alt="A.J. Skidmore smiling, in a navy suit jacket" width="600" height="800" loading="lazy" />
    <div>
      <p className="d19-label">Say hello</p>
      <h2 className="d19-h">Experience Architecture, Michigan State. 4+ years, 30+ shipped sites and apps, a team of five developers led.</h2>
      <p className="d19-links">
        <a href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
        <a href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
        <Link to="/">Current site</Link>
      </p>
    </div>
  </div>
);

const NewDesign19 = () => {
  const deckRef = useRef(null);
  const cardRefs = useRef([]);
  const [current, setCurrent] = useState(0);
  const reduce = usePrefersReducedMotion();
  usePreviewPage({ title: 'A.J. Skidmore | Details preview', fontHref: FONT_HREF, bodyClass: 'd19-page' });

  const work = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'].map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);
  const CARDS = [
    { key: 'intro', title: 'Intro', el: <Intro /> },
    { key: 'contrast', title: 'Contrast', el: <Contrast /> },
    { key: 'targets', title: 'Touch targets', el: <Targets /> },
    { key: 'focus', title: 'Focus', el: <Focus /> },
    { key: 'motion', title: 'Motion', el: <Motion /> },
    ...work.map((p, i) => ({ key: p.id, title: p.name, el: <ProjectCard p={p} n={i + 1} /> })),
    { key: 'contact', title: 'Contact', el: <Contact /> },
  ];

  useEffect(() => {
    const root = deckRef.current;
    if (!root || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setCurrent(Number(e.target.dataset.i));
      });
    }, { root, threshold: 0.6 });
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i) => {
    const el = cardRefs.current[Math.max(0, Math.min(CARDS.length - 1, i))];
    if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="d19">
      <a className="d19-skip" href="#d19-main">Skip to main content</a>
      <header className="d19-top">
        <nav className="d19-index" aria-label="Cards">
          <ol>
            {CARDS.map((c, i) => (
              <li key={c.key}>
                <button type="button" className={i === 0 ? 'd19-tick d19-tick--first' : 'd19-tick'} aria-current={current === i ? 'true' : undefined} onClick={() => go(i)}>
                  <span className="visually-hidden">{i + 1}: {c.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <main id="d19-main" tabIndex={-1}>
        <div className="d19-deck" ref={deckRef} tabIndex={0} role="region" aria-label="Cards: an introduction, four design studies, five projects and contact">
          {CARDS.map((c, i) => (
            <section
              key={c.key}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-i={i}
              className={`d19-card d19-card--${c.key}`}
              aria-label={`${i + 1} of ${CARDS.length}: ${c.title}`}
            >
              <p className="d19-caption" aria-hidden="true">{c.title}</p>
              {c.el}
            </section>
          ))}
        </div>
        <div className="d19-ctrls">
          <button type="button" className="d19-pill" onClick={() => go(current - 1)} disabled={current === 0}>Previous</button>
          <p className="d19-mono" aria-live="polite">{String(current + 1).padStart(2, '0')} / {String(CARDS.length).padStart(2, '0')} · {CARDS[current].title}</p>
          <button type="button" className="d19-pill" onClick={() => go(current + 1)} disabled={current === CARDS.length - 1}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default NewDesign19;
