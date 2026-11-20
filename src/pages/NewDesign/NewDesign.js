// src/pages/NewDesign/NewDesign.js
// Redesign preview at /new-design. Self-contained: its own layout, styles (newDesign.css,
// all classes prefixed "nd-") and fonts, so the current site is unaffected.
//
// Concept "Blueprint": an Experience Architecture portfolio drawn like an architect's
// sheet. Visible grid rails, hairline bento boxes, a hi-res silk ribbon, and real
// mini-interfaces that show the process. WCAG 2.2 AA throughout.
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import RibbonCanvas from './RibbonCanvas';
import AJMark from './AJMark';
import './newDesign.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@1&display=swap';

const WORK_ORDER = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];
const WORK_LAYOUT = {
  travelcare: 'nd-c7',
  efilmhub: 'nd-c5',
  eudo: 'nd-c4',
  loopwise: 'nd-c4',
  bloom: 'nd-c4',
};
const DOMAINS = {
  travelcare: 'travelcareplus.com',
  efilmhub: 'efilmhub.com',
  eudo: 'eudo.co',
  loopwise: 'loopwise-de7e1.web.app',
  bloom: 'bloom-wellness-28cww.web.app',
};

// Screenshots used only on this page (the current site keeps its own files)
const IMAGE_OVERRIDES = {
  travelcare: '/assets/images/new-design/travelcare.png',
};

const TOOLKIT = [
  'Figma', 'Framer', 'Adobe CC', 'User research', 'Usability testing', 'Design systems',
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Firebase', 'WordPress / PHP', 'NVDA', 'axe',
];

const Arrow = () => (
  <span className="nd-arrow" aria-hidden="true">
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const Check = () => (
  <svg className="nd-check" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.14" />
    <path d="M4.8 8.2 7 10.3l4.2-4.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Adds .is-in to elements with .nd-reveal as they scroll into view
const useReveal = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll('.nd-reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden if an observer callback is missed
    const failsafe = setTimeout(() => items.forEach((el) => el.classList.add('is-in')), 2500);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [rootRef]);
};

const NewDesign = () => {
  const rootRef = useRef(null);
  const heroTextRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useReveal(rootRef);

  // Page setup: fonts, title, keep this preview out of search results, plain body
  useEffect(() => {
    if (!document.querySelector(`link[href="${FONT_HREF}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONT_HREF;
      document.head.appendChild(link);
    }
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    const previousTitle = document.title;
    document.title = 'A.J. Skidmore | UX Designer & Full-Stack Engineer';
    document.body.classList.add('nd-body');
    // Preview the new favicon on this page only; restored when leaving
    const icon = document.querySelector('link[rel="icon"]');
    const previousIcon = icon && icon.getAttribute('href');
    if (icon) icon.setAttribute('href', '/assets/images/brand/aj-favicon.svg');
    window.scrollTo(0, 0);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduceMotion(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);

    return () => {
      robots.remove();
      document.title = previousTitle;
      document.body.classList.remove('nd-body');
      if (icon && previousIcon) icon.setAttribute('href', previousIcon);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const work = WORK_ORDER.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="nd" ref={rootRef}>
      <a className="nd-skip" href="#nd-main">Skip to main content</a>

      {/* ---------- Top bar ---------- */}
      <header className="nd-bar">
        <div className="nd-wrap nd-bar__inner">
          <a className="nd-brand" href="#top" aria-label="A.J. Skidmore, back to top">
            <AJMark size={40} />
            <span>A.J. Skidmore</span>
          </a>
          <nav className="nd-nav" aria-label="Main">
            <ul>
              <li><a href="#work">Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
          <a className="nd-btn nd-btn--sm nd-btn--ink" href="#contact">
            Let&rsquo;s talk <Arrow />
          </a>
        </div>
      </header>

      <main id="nd-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="nd-hero" id="top" aria-labelledby="nd-hero-title">
          <RibbonCanvas paused={paused} clearRef={heroTextRef} />
          <div className="nd-rails nd-rails--dashed" aria-hidden="true"><div className="nd-wrap" /></div>
          <div className="nd-wrap nd-hero__inner">
            <div className="nd-hero__text" ref={heroTextRef}>
              <p className="nd-eyebrow nd-reveal">
                <span className="nd-dot" aria-hidden="true" /> UX Designer &amp; Full-Stack Engineer
              </p>
              <h1 className="nd-display nd-reveal" id="nd-hero-title">
                I design products people <em className="nd-serif nd-grad">understand</em>
                <span className="nd-tone"> and build them to work for <em className="nd-serif nd-grad">everyone</em>.</span>
              </h1>
              <p className="nd-lede nd-reveal">
                Experience Architecture grad from Michigan State with 4+ years taking products from user
                research and prototypes to accessible, production-ready code.
              </p>
              <div className="nd-actions nd-reveal">
                <a className="nd-btn nd-btn--ink" href="#work">See my work <Arrow /></a>
                <a className="nd-btn nd-btn--ghost" href="#about">About me <Arrow /></a>
              </div>
            </div>
          </div>
          {!reduceMotion && (
            <button
              type="button"
              className="nd-pause"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                {paused
                  ? <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
                  : <path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" fill="currentColor" />}
              </svg>
              {paused ? 'Play background' : 'Pause background'}
            </button>
          )}
        </section>

        {/* ---------- Stats ---------- */}
        <section className="nd-stats" aria-label="At a glance">
          <div className="nd-wrap">
            <dl className="nd-stats__grid">
              <div className="nd-stat nd-reveal"><dt>Production sites &amp; apps</dt><dd>30+</dd></div>
              <div className="nd-stat nd-reveal"><dt>Products designed &amp; built</dt><dd>5</dd></div>
              <div className="nd-stat nd-reveal"><dt>Years in design &amp; engineering</dt><dd>4+</dd></div>
              <div className="nd-stat nd-reveal"><dt>Accessibility audits</dt><dd>WCAG&nbsp;AA</dd></div>
            </dl>
          </div>
        </section>

        {/* ---------- Process strip ---------- */}
        <section className="nd-strip" aria-label="What I do">
          <div className="nd-wrap">
            <ul className="nd-strip__list">
              {['User research', 'User flows', 'Wireframes', 'Prototypes', 'Design systems', 'Front-end build', 'Accessibility audits'].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section className="nd-section" id="work" aria-labelledby="nd-work-title">
          <div className="nd-rails" aria-hidden="true"><div className="nd-wrap" /></div>
          <div className="nd-wrap">
            <header className="nd-head nd-reveal">
              <p className="nd-kicker">01 · Selected work</p>
              <h2 className="nd-h2" id="nd-work-title">
                Five products, designed and built end to end.
                <span className="nd-tone"> Research, interface and production code.</span>
              </h2>
            </header>

            <ul className="nd-bento">
              {work.map((p) => (
                <li key={p.id} className={`nd-card nd-card--${p.id} ${WORK_LAYOUT[p.id]} nd-reveal`}>
                  <div className="nd-card__body">
                    <div className="nd-card__text">
                      <p className="nd-card__meta">{p.category}</p>
                      <h3 className="nd-card__title">
                        {/* The title is the link; its ::after stretches over the whole card */}
                        <Link to={`/projects/${p.id}`} className="nd-card__link">{p.name}</Link>
                      </h3>
                      <p className="nd-card__summary">{p.summary}</p>
                      <span className="nd-card__cta" aria-hidden="true">View project <Arrow /></span>
                    </div>
                    <div className="nd-card__media" aria-hidden="true">
                      <div className="nd-browser">
                        <div className="nd-browser__bar">
                          <i /><i /><i />
                          <span>{DOMAINS[p.id]}</span>
                        </div>
                        <img src={IMAGE_OVERRIDES[p.id] || p.imageUrl} alt="" loading="lazy" width="1440" height="720" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Process (dark) ---------- */}
        <section className="nd-section nd-dark" id="process" aria-labelledby="nd-process-title">
          <div className="nd-rails" aria-hidden="true"><div className="nd-wrap" /></div>
          <div className="nd-glow" aria-hidden="true" />
          <div className="nd-wrap">
            <header className="nd-head nd-reveal">
              <p className="nd-kicker">02 · How I work</p>
              <h2 className="nd-h2" id="nd-process-title">
                Architecture for experiences.
                <span className="nd-tone"> From the first interview to the last accessibility check.</span>
              </h2>
            </header>

            <ol className="nd-bento nd-process">
              <li className="nd-box nd-c7 nd-reveal">
                <p className="nd-box__num">01</p>
                <h3>Research</h3>
                <p>I start with the people who will use it: interviews, observation and the notes they actually keep, sorted into themes that shape every screen.</p>
                <div className="nd-mock nd-mock--notes" aria-hidden="true">
                  <div className="nd-note nd-note--a">&ldquo;I keep my license dates in my Notes app.&rdquo;<small>Sample note</small></div>
                  <div className="nd-note nd-note--b">&ldquo;Too much text is overwhelming.&rdquo;<small>Sample note</small></div>
                  <div className="nd-note nd-note--c">&ldquo;I just want to know my real take-home.&rdquo;<small>Sample note</small></div>
                  <div className="nd-tag">Theme · Plain language first</div>
                </div>
              </li>
              <li className="nd-box nd-c5 nd-reveal">
                <p className="nd-box__num">02</p>
                <h3>Design</h3>
                <p>Flows, wireframes and prototypes, then a small design system so every screen stays consistent.</p>
                <div className="nd-mock nd-mock--tokens" aria-hidden="true">
                  <div className="nd-wire">
                    <span className="w1" /><span className="w2" /><span className="w3" />
                    <span className="w4" /><span className="w4" /><span className="w4" />
                  </div>
                  <ul className="nd-tokens">
                    <li><b style={{ background: '#1d4ed8' }} />accent · 6.7:1</li>
                    <li><b className="nd-tokens__radius" />radius · 20px</li>
                    <li><b className="nd-tokens__type">Aa</b>Geist 600</li>
                  </ul>
                </div>
              </li>
              <li className="nd-box nd-c5 nd-reveal">
                <p className="nd-box__num">03</p>
                <h3>Build</h3>
                <p>I build the design myself in React, so nothing gets lost between the mockup and the product.</p>
                <pre className="nd-mock nd-code" aria-hidden="true"><code>
                  <span className="k">export function</span> <span className="f">ProjectCard</span>({'{ project }'}) {'{'}{'\n'}
                  {'  '}<span className="k">return</span> ({'\n'}
                  {'    '}<span className="t">&lt;Link</span> <span className="a">to</span>=<span className="s">{'{project.url}'}</span><span className="t">&gt;</span>{'\n'}
                  {'      '}<span className="t">&lt;h3&gt;</span>{'{project.name}'}<span className="t">&lt;/h3&gt;</span>{'\n'}
                  {'    '}<span className="t">&lt;/Link&gt;</span>{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </code></pre>
              </li>
              <li className="nd-box nd-c7 nd-reveal">
                <p className="nd-box__num">04</p>
                <h3>Audit</h3>
                <p>Every release is checked by hand against WCAG 2.2 AA with a keyboard and a screen reader, plus automated tests.</p>
                <ul className="nd-mock nd-audit" aria-hidden="true">
                  <li><Check /> Text contrast <em>6.7:1</em><span>Pass AA</span></li>
                  <li><Check /> Keyboard &amp; visible focus<span>Pass</span></li>
                  <li><Check /> Screen reader (NVDA)<span>Pass</span></li>
                  <li><Check /> Reduced motion respected<span>Pass</span></li>
                  <li><Check /> axe automated scan <em>0 issues</em><span>Pass</span></li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section className="nd-section" id="about" aria-labelledby="nd-about-title">
          <div className="nd-rails" aria-hidden="true"><div className="nd-wrap" /></div>
          <div className="nd-wrap nd-about">
            <div className="nd-about__photo nd-reveal">
              <div className="nd-portrait">
                <img src="/assets/images/new-design/aj-cutout.png" alt="A.J. Skidmore smiling, wearing a navy suit jacket" width="1200" height="1600" loading="lazy" />
              </div>
              <p className="nd-caption">B.A. Experience Architecture<br />Michigan State University, 2023</p>
            </div>

            <div className="nd-about__text">
              <header className="nd-head nd-reveal">
                <p className="nd-kicker">03 · About</p>
                <h2 className="nd-h2" id="nd-about-title">
                  A designer who ships.
                  <span className="nd-tone"> From research to release, nothing lost in between.</span>
                </h2>
              </header>

              <div className="nd-roles nd-reveal">
                <article className="nd-role">
                  <p className="nd-role__when">2022 — Present</p>
                  <div>
                    <h3>Full-Stack Engineer, Shumaker Technology Group</h3>
                    <p className="nd-role__path">Web Developer → Full-Stack Engineer → Lead Full-Stack Engineer</p>
                    <ul>
                      <li>Designed and developed 30+ production sites and apps for public- and private-sector clients, from stakeholder discovery and wireframes through launch.</li>
                      <li>Run recurring WCAG 2.1 AA audits of municipal sites by hand with NVDA, then guide the fixes.</li>
                      <li>Lead a team of 5 developers and review builds against the designs.</li>
                    </ul>
                  </div>
                </article>
              </div>

              <div className="nd-toolkit nd-reveal">
                <h3 className="nd-kicker">Toolkit</h3>
                <ul>
                  {TOOLKIT.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="nd-section nd-section--cta" id="contact" aria-labelledby="nd-contact-title">
          <div className="nd-wrap">
            <div className="nd-cta nd-reveal">
              <div className="nd-cta__glow" aria-hidden="true" />
              <p className="nd-kicker">04 · Contact</p>
              <h2 className="nd-h2" id="nd-contact-title">
                Let&rsquo;s make something people <em className="nd-serif">love</em> to use.
              </h2>
              <div className="nd-actions">
                <a className="nd-btn nd-btn--light" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com <Arrow /></a>
                <a className="nd-btn nd-btn--outline-light" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span className="visually-hidden">(opens in a new tab)</span> <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="nd-foot">
        <div className="nd-wrap nd-foot__inner">
          <p className="nd-foot__brand">
            <AJMark size={28} />
            &copy; {new Date().getFullYear()} A.J. Skidmore. Designed and built by me.
          </p>
          <p><Link to="/">View the current site</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default NewDesign;
