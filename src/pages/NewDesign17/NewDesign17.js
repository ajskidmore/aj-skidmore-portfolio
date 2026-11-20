// src/pages/NewDesign17/NewDesign17.js
// /new-design17 · "Canvas"
// Inspired by akshattt.com (a product designer's site laid out like a design tool: rulers,
// a selection box around the name, sticky notes and an ID badge). Original take that shows
// design AND engineering: every letter of the name can be selected and inspected, and the
// inspect panel computes its real WCAG contrast ratio live. A Design / Code switch flips the
// hero to the actual markup behind it, and the project frames carry their tech stacks.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal } from '../NewDesign/previewPage';
import './newDesign17.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@600&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const CANVAS = '#ffffff';

// Every fill below is checked against its background (white canvas or its own tile).
const STYLES = [
  { font: 'display', fg: '#1f2a5c', bg: null },
  { font: 'display', fg: '#1f1f3a', bg: '#ff6b3d' },
  { font: 'serif', fg: '#2b2b52', bg: null },
  { font: 'display', fg: '#4f46e5', bg: null, small: true },
  { font: 'display', fg: '#1a1a1a', bg: '#c6f432' },
  { font: 'display', fg: '#be185d', bg: null },
  { font: 'display', fg: '#ffffff', bg: '#1f2a5c', small: true },
  { font: 'serif', fg: '#047857', bg: null },
];
const FONT_NAMES = { display: 'Bricolage Grotesque · 800', serif: 'Instrument Serif · Italic' };
const LETTERS = ['S', 'K', 'I', 'D', 'M', 'O', 'R', 'E'];
const TIDY = { order: [0, 1, 2, 3, 4, 5, 6, 7], tilt: [-3, 2, 0, -2, 4, 0, -4, 2] };

// WCAG 2.x relative luminance and contrast ratio.
const channel = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const CODE = `// Name.jsx: the letters you just clicked
export function Name({ letters, styles }) {
  const [selected, select] = useState(null);
  return (
    <div role="group" aria-label="Letters of my name">
      {letters.map((char, i) => (
        <button
          key={i}
          aria-pressed={selected === i}
          aria-label={\`Inspect letter \${char}\`}
          onClick={() => select(i)}
          style={{ color: styles[i].fg }}
        >
          {char}
        </button>
      ))}
    </div>
  );
}

// contrast.js: every fill is checked before it ships
const ratio = (a, b) =>
  (luminance(a) + 0.05) / (luminance(b) + 0.05);
// AA needs 4.5:1 for body text, 3:1 for large text`;

// Tiny highlighter: comments, strings and a few keywords.
const highlight = (src) => src.split('\n').map((line, n) => {
  if (line.trim().startsWith('//')) return <span key={n} className="c17-tok-c">{line}{'\n'}</span>;
  const parts = line.split(/(`[^`]*`|'[^']*'|"[^"]*"|\b(?:export|function|const|return|useState)\b)/g);
  return (
    <span key={n}>
      {parts.map((p, i) => {
        if (/^[`'"]/.test(p)) return <span key={i} className="c17-tok-s">{p}</span>;
        if (/^(export|function|const|return|useState)$/.test(p)) return <span key={i} className="c17-tok-k">{p}</span>;
        return p;
      })}
      {'\n'}
    </span>
  );
});

const Mark = () => (
  <svg className="c17-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {[[6, 6], [34, 6], [6, 34], [34, 34]].map(([x, y]) => (
      <rect key={`${x}${y}`} x={x - 3} y={y - 3} width="6" height="6" fill="#fff" stroke="#1d4ed8" strokeWidth="1.5" />
    ))}
    <text x="20" y="25.5" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="14" fill="currentColor">aj</text>
  </svg>
);

const Ruler = () => (
  <div className="c17-ruler" aria-hidden="true">
    {Array.from({ length: 15 }, (_, i) => <span key={i}>{i * 100}</span>)}
  </div>
);

const NewDesign17 = () => {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const letterRefs = useRef([]);
  const [layout, setLayout] = useState(TIDY);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('design');
  const [size, setSize] = useState(null);
  const [fontPx, setFontPx] = useState(null);
  const [status, setStatus] = useState('');

  usePreviewPage({ title: 'A.J. Skidmore | Canvas preview', fontHref: FONT_HREF, bodyClass: 'c17-page' });
  useReveal(rootRef, '.c17-reveal');

  // Live frame size, like a design tool's dimension label.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !('ResizeObserver' in window)) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize(`${Math.round(width)} × ${Math.round(height)}`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Read the rendered font size of the selected letter.
  useEffect(() => {
    if (selected === null) return;
    const el = letterRefs.current[selected];
    if (el) setFontPx(Math.round(parseFloat(getComputedStyle(el).fontSize)));
  }, [selected, layout]);

  const inspect = useMemo(() => {
    if (selected === null) return null;
    const s = STYLES[layout.order[selected]];
    const bg = s.bg || CANVAS;
    const r = contrast(s.fg, bg);
    return { s, bg, r, char: LETTERS[selected], tilt: layout.tilt[selected] };
  }, [selected, layout]);

  const remix = () => {
    setLayout({ order: shuffle(TIDY.order), tilt: TIDY.tilt.map(() => Math.round(Math.random() * 12 - 6)) });
    setStatus('Letters remixed. Every combination still passes WCAG AA contrast.');
  };
  const tidy = () => {
    setLayout(TIDY);
    setStatus('Letters reset.');
  };
  const switchMode = (m) => {
    setMode(m);
    setStatus(m === 'code' ? 'Showing the code behind the name.' : 'Showing the design.');
  };

  const work = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'].map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="c17" ref={rootRef}>
      <a className="c17-skip" href="#c17-main">Skip to main content</a>
      <header className="c17-bar">
        <a className="c17-brand" href="#top" aria-label="A.J. Skidmore, back to top"><Mark /></a>
        <nav aria-label="Main" className="c17-nav">
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#system">System</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
        <a className="c17-contact" href="mailto:hello@ajskidmore.com">Contact</a>
      </header>
      <Ruler />

      <main id="c17-main" tabIndex={-1}>
        <section className="c17-hero" id="top" aria-labelledby="c17-title">
          <h1 className="visually-hidden" id="c17-title">A.J. Skidmore, UX designer and front-end engineer</h1>

          <div className="c17-note">
            <p className="c17-note__title">to-do</p>
            <ul>
              <li className="is-done"><span className="visually-hidden">Done: </span>design it</li>
              <li className="is-done"><span className="visually-hidden">Done: </span>build it</li>
              <li className="is-done"><span className="visually-hidden">Done: </span>test it with a screen reader</li>
              <li><span className="visually-hidden">Not done: </span>work with you</li>
            </ul>
          </div>

          <div className="c17-center">
            <p className="c17-frame-label"><span>hero / name</span><span aria-hidden="true">{size}</span></p>
            <div className={`c17-frame${mode === 'code' ? ' is-code' : ''}`} ref={frameRef}>
              <span className="c17-handle c17-handle--tl" aria-hidden="true" />
              <span className="c17-handle c17-handle--tr" aria-hidden="true" />
              <span className="c17-handle c17-handle--bl" aria-hidden="true" />
              <span className="c17-handle c17-handle--br" aria-hidden="true" />
              {mode === 'design' ? (
                <div className="c17-name">
                  <p className="c17-first" aria-hidden="true">A.J.</p>
                  <div className="c17-letters" role="group" aria-label="Letters of my last name. Select one to inspect it.">
                    {LETTERS.map((ch, i) => {
                      const s = STYLES[layout.order[i]];
                      return (
                        <button
                          key={ch + i}
                          ref={(el) => { letterRefs.current[i] = el; }}
                          type="button"
                          className="c17-letter"
                          data-font={s.font}
                          data-tile={s.bg ? 'true' : 'false'}
                          data-small={s.small ? 'true' : 'false'}
                          aria-pressed={selected === i}
                          aria-label={`Inspect letter ${ch}`}
                          onClick={() => setSelected(selected === i ? null : i)}
                          style={{ color: s.fg, background: s.bg || 'transparent', '--tilt': `${layout.tilt[i]}deg` }}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                  <p className="c17-role">UX designer <span aria-hidden="true">+</span><span className="visually-hidden">and</span> front-end engineer</p>
                </div>
              ) : (
                <pre className="c17-code" tabIndex={0} aria-label="Code for the name component"><code>{highlight(CODE)}</code></pre>
              )}
            </div>

            <div className="c17-dock" role="toolbar" aria-label="Canvas tools">
              <div className="c17-seg" role="group" aria-label="View">
                <button type="button" aria-pressed={mode === 'design'} onClick={() => switchMode('design')}>Design</button>
                <button type="button" aria-pressed={mode === 'code'} onClick={() => switchMode('code')}>Code</button>
              </div>
              <button type="button" className="c17-tool" onClick={remix} disabled={mode === 'code'}>Remix</button>
              <button type="button" className="c17-tool" onClick={tidy} disabled={mode === 'code'}>Tidy</button>
            </div>
            <p className="visually-hidden" aria-live="polite">{status}</p>

            <ul className="c17-tape" aria-label="What I do">
              <li data-c="1">User research</li>
              <li data-c="2">UX / UI design</li>
              <li data-c="3">Accessibility</li>
              <li data-c="4">React engineering</li>
            </ul>
          </div>

          <div className="c17-side">
            <div className="c17-badge">
              <span className="c17-badge__clip" aria-hidden="true" />
              <div className="c17-badge__photo"><img src="/assets/images/new-design/aj-cutout-sm.png" alt="A.J. Skidmore" width="600" height="800" /></div>
              <p className="c17-badge__name">A.J. Skidmore</p>
              <p className="c17-badge__role">Designer &amp; engineer</p>
              <p className="c17-badge__meta">Experience Architecture · MSU</p>
            </div>

            <section className="c17-inspect" aria-labelledby="c17-inspect-title">
              <h2 className="c17-inspect__title" id="c17-inspect-title">Inspect</h2>
              <div aria-live="polite">
                {inspect ? (
                  <dl>
                    <div><dt>Layer</dt><dd>Letter {inspect.char}</dd></div>
                    <div><dt>Font</dt><dd>{FONT_NAMES[inspect.s.font]}</dd></div>
                    <div><dt>Size</dt><dd>{fontPx ? `${fontPx}px` : '—'}</dd></div>
                    <div><dt>Rotate</dt><dd>{inspect.tilt}°</dd></div>
                    <div><dt>Fill</dt><dd><i className="c17-sw" style={{ background: inspect.s.fg }} aria-hidden="true" />{inspect.s.fg}</dd></div>
                    <div><dt>Behind</dt><dd><i className="c17-sw" style={{ background: inspect.bg }} aria-hidden="true" />{inspect.bg}</dd></div>
                    <div className="c17-ratio"><dt>Contrast</dt><dd>{inspect.r.toFixed(2)}:1</dd></div>
                    <div><dt>WCAG AA</dt><dd>{inspect.r >= 4.5 ? 'Pass' : 'Fail'}</dd></div>
                    <div><dt>WCAG AAA</dt><dd>{inspect.r >= 7 ? 'Pass' : 'Large text only'}</dd></div>
                  </dl>
                ) : (
                  <p className="c17-inspect__empty">Select a letter of my name to see its font, color and live contrast ratio.</p>
                )}
              </div>
            </section>
          </div>
        </section>

        <section className="c17-section c17-work" id="work" aria-labelledby="c17-work-title">
          <div className="c17-head c17-reveal">
            <p className="c17-kicker">Page 2 · Frames</p>
            <h2 id="c17-work-title">Five products, designed and shipped.</h2>
            <p>I take each one from research to Figma to production code, so nothing gets lost in handoff.</p>
          </div>
          <ul className="c17-frames">
            {work.map((p, i) => (
              <li key={p.id} className="c17-card c17-reveal">
                <p className="c17-card__label" aria-hidden="true"><span>Frame · {String(i + 1).padStart(2, '0')}</span><span>{i === 0 ? '1440 × 720' : '1440 × 900'}</span></p>
                <div className="c17-card__box">
                  <div className="c17-card__img" aria-hidden="true"><img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" /></div>
                  <div className="c17-card__text">
                    <p className="c17-card__cat">{p.category}</p>
                    <h3><Link className="c17-stretch" to={`/projects/${p.id}`}>{p.name}</Link></h3>
                    <p>{p.summary}</p>
                    <ul className="c17-chips" aria-label={`${p.name} built with`}>
                      {p.tools.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <span className="c17-redline" aria-hidden="true">24</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="c17-section c17-system" id="system" aria-labelledby="c17-system-title">
          <div className="c17-head c17-reveal">
            <p className="c17-kicker">Page 3 · Tokens</p>
            <h2 id="c17-system-title">The system behind this page.</h2>
            <p>Design decisions become named tokens, and tokens become code. Here are this page&rsquo;s colors with their contrast on white, checked in the browser as you read.</p>
          </div>
          <div className="c17-sys">
          <div className="c17-tokens c17-reveal" role="region" aria-label="Color tokens table" tabIndex={0}>
            <table>
              <caption className="visually-hidden">Color tokens with their contrast ratio on white</caption>
              <thead>
                <tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">On white</th><th scope="col">Use</th></tr>
              </thead>
              <tbody>
                {[
                  ['--ink', '#1f2a5c', 'Headings and body'],
                  ['--muted', '#5b6170', 'Secondary text'],
                  ['--select', '#1d4ed8', 'Selection and focus'],
                  ['--pink', '#be185d', 'Accent'],
                  ['--green', '#047857', 'Accent'],
                ].map(([t, v, u]) => (
                  <tr key={t}>
                    <th scope="row"><code>{t}</code></th>
                    <td><i className="c17-sw" style={{ background: v }} aria-hidden="true" />{v}</td>
                    <td>{contrast(v, CANVAS).toFixed(2)}:1 <span className="c17-pass">AA</span></td>
                    <td>{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="c17-space c17-reveal">
            <h3>Spacing scale</h3>
            <ul>
              {[4, 8, 16, 24, 40, 64].map((n) => (
                <li key={n}><span>--s-{n}</span><i style={{ width: n * 2 }} aria-hidden="true" /></li>
              ))}
            </ul>
          </div>
          </div>
        </section>

        <section className="c17-section c17-about" id="about" aria-labelledby="c17-about-title">
          <div className="c17-head c17-reveal">
            <p className="c17-kicker">Page 4 · About</p>
            <h2 id="c17-about-title">A designer who can open the code.</h2>
          </div>
          <div className="c17-about__grid">
            <p className="c17-reveal">I studied Experience Architecture at Michigan State, then spent 4+ years shipping 30+ production sites and apps. I&rsquo;ve led a team of five developers, run user interviews and usability tests, and audited public services for accessibility.</p>
            <p className="c17-reveal">Because I design and build, the spec and the shipped product match: same spacing, same states, same contrast, and every interaction works with a keyboard and a screen reader.</p>
          </div>
          <div className="c17-comment c17-reveal">
            <span className="c17-comment__pin" aria-hidden="true">AJ</span>
            <div>
              <p className="c17-comment__name">A.J. Skidmore <span>just now</span></p>
              <p>Building something people depend on? Let&rsquo;s talk.</p>
              <p className="c17-comment__links">
                <a href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
                <a href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="c17-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore · Designed in Figma, built in React</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign17;
