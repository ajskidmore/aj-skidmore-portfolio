// src/pages/NewDesign5/NewDesign5.js
// /new-design5 · "Clicky"
// Inspired by crazycreative.design (A.J.'s pick): loud color, chunky type, an illustrated
// mascot and a "crazy" switch. Made original and accessible: an original cursor mascot whose
// eyes follow the pointer, a real Crazy/Calm switch (role="switch") that restyles the page,
// dark-ink text on every neon surface (6.8:1 or better), no endless animation.
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal, usePrefersReducedMotion } from '../NewDesign/previewPage';
import './newDesign5.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@700&display=swap';

const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];
const STICKER_COLORS = ['#ff5cbf', '#7cf7e8', '#fff27a', '#c6ff5c', '#b9a6ff'];

// "Clicky": an original mascot shaped like a mouse cursor. Pupils follow the pointer.
const Clicky = ({ eyesRef }) => (
  <svg className="n5-clicky" viewBox="0 0 220 260" aria-hidden="true" focusable="false">
    <path
      d="M40 18 L40 214 Q40 226 51 220 L96 176 L128 244 Q133 254 144 249 L168 238 Q178 233 173 222 L141 156 L198 152 Q211 151 202 141 L57 9 Q40 -6 40 18 Z"
      fill="#ffffff" stroke="#170a2a" strokeWidth="8" strokeLinejoin="round"
    />
    <g ref={eyesRef}>
      <g className="n5-eye" data-cx="78" data-cy="96">
        <circle cx="78" cy="96" r="22" fill="#fff" stroke="#170a2a" strokeWidth="6" />
        <circle className="n5-pupil" cx="78" cy="96" r="9" fill="#170a2a" />
      </g>
      <g className="n5-eye" data-cx="128" data-cy="120">
        <circle cx="128" cy="120" r="20" fill="#fff" stroke="#170a2a" strokeWidth="6" />
        <circle className="n5-pupil" cx="128" cy="120" r="8" fill="#170a2a" />
      </g>
    </g>
    <ellipse cx="66" cy="140" rx="11" ry="7" fill="#ff5cbf" opacity="0.8" />
    <ellipse cx="146" cy="158" rx="10" ry="6" fill="#ff5cbf" opacity="0.8" />
    <path d="M86 150 Q100 166 116 154" fill="none" stroke="#170a2a" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// Sticker-style logo: chunky "aj!" with an offset shadow
const Logo = () => (
  <span className="n5-logo" aria-hidden="true">aj<span>!</span></span>
);

const Bolt = (props) => (
  <svg viewBox="0 0 60 100" aria-hidden="true" focusable="false" {...props}>
    <path d="M36 2 L6 58 L28 58 L20 98 L54 36 L32 36 Z" fill="#fff27a" stroke="#170a2a" strokeWidth="4" strokeLinejoin="round" />
  </svg>
);
const Star = (props) => (
  <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" {...props}>
    <path d="M50 4 L61 38 L96 38 L68 59 L79 94 L50 72 L21 94 L32 59 L4 38 L39 38 Z" fill="#7cf7e8" stroke="#170a2a" strokeWidth="4" strokeLinejoin="round" />
  </svg>
);
const Squiggle = (props) => (
  <svg viewBox="0 0 160 40" aria-hidden="true" focusable="false" {...props}>
    <path d="M4 20 Q24 0 44 20 T84 20 T124 20 T156 20" fill="none" stroke="#c6ff5c" strokeWidth="10" strokeLinecap="round" />
  </svg>
);
const Blob = (props) => (
  <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" {...props}>
    <path d="M60 6 C92 6 114 30 112 62 C110 96 84 114 56 112 C26 110 6 88 8 58 C10 28 30 6 60 6 Z" fill="#b9a6ff" stroke="#170a2a" strokeWidth="4" />
  </svg>
);

const POWERS = [
  { title: 'Research', text: 'I talk to the people who will use it, then test early and often.', color: '#7cf7e8', icon: 'M20 34a14 14 0 1 1 10-4l10 10' },
  { title: 'Design', text: 'Flows, wireframes and Figma prototypes with a tidy design system.', color: '#fff27a', icon: 'M8 40 L30 8 L40 18 L18 46 Z M8 40 L6 48 L14 46' },
  { title: 'Build', text: 'React, TypeScript and Next.js. 30+ production sites and apps shipped.', color: '#c6ff5c', icon: 'M16 14 L6 26 L16 38 M34 14 L44 26 L34 38 M28 8 L22 44' },
  { title: 'Accessibility', text: 'WCAG 2.2 AA by default, tested by hand with a keyboard and NVDA.', color: '#b9a6ff', icon: 'M26 10a4 4 0 1 0 0.1 0 M10 20 L42 20 M26 20 L26 32 L18 46 M26 32 L34 46' },
];

const FAQ = [
  ['Designer or developer?', 'Yes. I design in Figma and build in React, so the thing you approve is the thing that ships.'],
  ['Can it be fun AND accessible?', 'Always. This page is loud on purpose, and every bit of text still passes WCAG AA contrast. Flip the switch to Calm mode if you prefer it quiet.'],
  ['What kinds of products?', 'Healthcare tools, learning apps, data dashboards and websites, mostly for small teams that care about craft.'],
];

const NewDesign5 = () => {
  const rootRef = useRef(null);
  const eyesRef = useRef(null);
  const [crazy, setCrazy] = useState(true);
  const reduceMotion = usePrefersReducedMotion();

  usePreviewPage({ title: 'A.J. Skidmore | Clicky preview', fontHref: FONT_HREF, bodyClass: 'n5-page' });
  useReveal(rootRef, '.n5-reveal');

  // Eyes follow the pointer (pointer-driven motion only; off for reduced motion)
  useEffect(() => {
    if (reduceMotion) return undefined;
    const move = (e) => {
      const g = eyesRef.current;
      if (!g) return;
      g.querySelectorAll('.n5-eye').forEach((eye) => {
        const pupil = eye.querySelector('.n5-pupil');
        const box = eye.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(9, Math.hypot(e.clientX - cx, e.clientY - cy) / 30);
        pupil.setAttribute('transform', `translate(${Math.cos(angle) * dist} ${Math.sin(angle) * dist})`);
      });
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reduceMotion]);

  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className={`n5 ${crazy ? 'is-crazy' : 'is-calm'}`} ref={rootRef}>
      <a className="n5-skip" href="#n5-main">Skip to main content</a>
      <div className="n5-frame">
        <header className="n5-bar">
          <a className="n5-brand" href="#top" aria-label="A.J. Skidmore, back to top"><Logo /><span>A.J. Skidmore</span></a>
          <nav aria-label="Main" className="n5-nav">
            <ul>
              <li><a href="#powers">Superpowers</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>
          <button
            type="button"
            role="switch"
            aria-checked={crazy}
            className="n5-switch"
            onClick={() => setCrazy((c) => !c)}
          >
            <span className="n5-switch__label">{crazy ? 'Crazy mode' : 'Calm mode'}</span>
            <span className="n5-switch__track" aria-hidden="true"><span className="n5-switch__thumb" /></span>
          </button>
        </header>

        <main id="n5-main" tabIndex={-1}>
          {/* ---------- Hero ---------- */}
          <section className="n5-hero" id="top" aria-labelledby="n5-title">
            <Bolt className="n5-deco n5-deco--bolt" />
            <Star className="n5-deco n5-deco--star" />
            <Squiggle className="n5-deco n5-deco--squiggle" />
            <Blob className="n5-deco n5-deco--blob" />

            <p className="n5-script n5-reveal">psst, over here</p>
            <h1 className="n5-title n5-reveal" id="n5-title">Design that <span className="n5-hl">clicks</span>.</h1>
            <p className="n5-sub n5-reveal">
              I&rsquo;m A.J., a UX designer who builds. I make accessible web apps people actually
              enjoy using, from first interview to final line of code.
            </p>
            <div className="n5-actions n5-reveal">
              <a className="n5-btn n5-btn--ink" href="mailto:hello@ajskidmore.com">Say hi</a>
              <a className="n5-btn n5-btn--white" href="#work">See the work</a>
            </div>
            <div className="n5-mascot">
              <Clicky eyesRef={eyesRef} />
              <p className="n5-bubble">Hi! I&rsquo;m Clicky. I follow you around.</p>
            </div>
          </section>

          {/* ---------- Proof ---------- */}
          <section className="n5-proof" aria-label="At a glance">
            <ul>
              <li className="n5-seal n5-reveal" style={{ '--seal': '#fff27a' }}><strong>30+</strong><span>sites &amp; apps shipped</span></li>
              <li className="n5-seal n5-reveal" style={{ '--seal': '#7cf7e8' }}><strong>4+</strong><span>years designing &amp; building</span></li>
              <li className="n5-seal n5-reveal" style={{ '--seal': '#c6ff5c' }}><strong>AA</strong><span>WCAG, audited by hand</span></li>
              <li className="n5-seal n5-reveal" style={{ '--seal': '#b9a6ff' }}><strong>B.A.</strong><span>Experience Architecture, MSU</span></li>
            </ul>
          </section>

          {/* ---------- Superpowers ---------- */}
          <section className="n5-section" id="powers" aria-labelledby="n5-powers-title">
            <h2 className="n5-h2 n5-reveal" id="n5-powers-title">My <span className="n5-hl n5-hl--cyan">superpowers</span></h2>
            <ul className="n5-powers">
              {POWERS.map((p, i) => (
                <li key={p.title} className="n5-power n5-reveal" style={{ '--card': p.color, '--tilt': `${[-2, 1.5, -1, 2][i]}deg` }}>
                  <svg viewBox="0 0 50 50" className="n5-power__icon" aria-hidden="true" focusable="false">
                    <path d={p.icon} fill="none" stroke="#170a2a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ---------- Work ---------- */}
          <section className="n5-section" id="work" aria-labelledby="n5-work-title">
            <h2 className="n5-h2 n5-reveal" id="n5-work-title">Stuff I <span className="n5-hl n5-hl--lime">made</span></h2>
            <ul className="n5-work">
              {work.map((p, i) => (
                <li key={p.id} className="n5-sticker n5-reveal" style={{ '--sticker': STICKER_COLORS[i % STICKER_COLORS.length], '--tilt': `${[-3, 2, -1.5, 2.5, -2][i]}deg` }}>
                  <div className="n5-sticker__img" aria-hidden="true">
                    <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                  </div>
                  <h3><Link to={`/projects/${p.id}`} className="n5-stretch">{p.name}</Link></h3>
                  <p>{p.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ---------- FAQ ---------- */}
          <section className="n5-section n5-faq" id="faq" aria-labelledby="n5-faq-title">
            <h2 className="n5-h2 n5-reveal" id="n5-faq-title">Good <span className="n5-hl n5-hl--yellow">questions</span></h2>
            <div className="n5-faq__list">
              {FAQ.map(([q, a]) => (
                <details key={q} className="n5-qa n5-reveal">
                  <summary>{q}<span aria-hidden="true">+</span></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ---------- CTA ---------- */}
          <section className="n5-cta n5-reveal" aria-labelledby="n5-cta-title">
            <p className="n5-script">let&rsquo;s go!</p>
            <h2 className="n5-cta__title" id="n5-cta-title">Ready to make something people love?</h2>
            <div className="n5-actions">
              <a className="n5-btn n5-btn--pink" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
              <a className="n5-btn n5-btn--white" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </section>
        </main>

        <footer className="n5-foot">
          <p>&copy; {new Date().getFullYear()} A.J. Skidmore. Made with care (and a little chaos).</p>
          <p><Link to="/">View the current site</Link></p>
        </footer>
      </div>
    </div>
  );
};

export default NewDesign5;
