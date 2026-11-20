// src/pages/NewDesign18/NewDesign18.js
// /new-design18 · "Record"
// Inspired by healthex.io (a personal health-record wallet): warm peach gradient, navy type,
// a floating pill nav, and stacked app panels showing a chronological record next to a detail
// view. Original take: the hero IS a working product UI. A.J.'s projects are "records" you can
// filter and open, built as real accessible HTML (not screenshots). Further down, a process
// timeline and a live accessibility-settings demo with working switches.
import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal } from '../NewDesign/previewPage';
import './newDesign18.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap';
const G = '/assets/images/new-design/gallery';

const RECORDS = [
  { id: 'travelcare', tone: 'navy', group: 'Health & wellbeing', tags: ['Research', 'Design', 'Code', 'Audit'],
    problem: 'Travel clinicians juggle licenses, contracts and tax rules written in legal language.' },
  { id: 'bloom', tone: 'teal', group: 'Health & wellbeing', tags: ['Design', 'Code'],
    problem: 'Daily health tracking is scattered across apps, and most of them feel like a scorecard.' },
  { id: 'efilmhub', tone: 'orange', group: 'Platforms', tags: ['Research', 'Design', 'Code'],
    problem: 'African filmmakers found crew and jobs through scattered social media groups.' },
  { id: 'eudo', tone: 'blue', group: 'Platforms', tags: ['Design', 'Code'],
    problem: 'HR teams invest in programs without a clear way to show what worked.' },
  { id: 'loopwise', tone: 'navy', group: 'Platforms', tags: ['Design', 'Code'],
    problem: 'Learning to code feels out of reach when lessons assume you already know the basics.' },
];
const FILTERS = ['All', 'Research', 'Design', 'Code', 'Audit'];

const Icon = ({ id }) => {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    travelcare: <path {...common} d="M12 5v14M5 12h14" />,
    bloom: <g {...common}><circle cx="12" cy="10" r="2.4" /><path d="M12 7.6V5M14.4 10H17M12 12.4V15M9.6 10H7M12 15v5M12 18c-2 0-3.5-1-4-2.5" /></g>,
    efilmhub: <g {...common}><rect x="4" y="9" width="16" height="10" rx="1.5" /><path d="M4 9l15-4M8.5 7.8l2 2.2M13 6.6l2 2.2" /></g>,
    eudo: <g {...common}><path d="M4 18h16" /><path d="M5 15l4-4 3 2 6-6" /></g>,
    loopwise: <g {...common}><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" /></g>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[id]}</svg>;
};

const Mark = () => (
  <svg className="r18-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect x="5" y="3" width="22" height="26" rx="5" fill="#13294b" />
    <path d="M10 11h12M10 16h12M10 21h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="23" r="5" fill="#f28c28" stroke="#fdf3e3" strokeWidth="2" />
  </svg>
);

const NewDesign18 = () => {
  const rootRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState('travelcare');
  const [prefs, setPrefs] = useState({ large: false, contrast: false, calm: false });
  usePreviewPage({ title: 'A.J. Skidmore | Record preview', fontHref: FONT_HREF, bodyClass: 'r18-page' });
  useReveal(rootRef, '.r18-reveal');

  const byId = useMemo(() => Object.fromEntries(featuredProjects.map((p) => [p.id, p])), []);
  const visible = RECORDS.filter((r) => filter === 'All' || r.tags.includes(filter));
  const groups = [...new Set(visible.map((r) => r.group))];
  const rec = RECORDS.find((r) => r.id === active);
  const proj = byId[active];
  const tools = [...new Set(featuredProjects.flatMap((p) => p.tools))];

  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="r18" ref={rootRef}>
      <a className="r18-skip" href="#r18-main">Skip to main content</a>
      <div className="r18-navwrap">
        <header className="r18-bar">
          <a className="r18-brand" href="#top" aria-label="A.J. Skidmore, back to top"><Mark /><span>A.J. Skidmore</span></a>
          <nav aria-label="Main" className="r18-nav">
            <ul>
              <li><a href="#record">Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#access">Accessibility</a></li>
            </ul>
          </nav>
          <a className="r18-btn r18-btn--dark r18-bar__cta" href="#contact">Get in touch</a>
        </header>
      </div>

      <main id="r18-main" tabIndex={-1}>
        <section className="r18-hero" id="top" aria-labelledby="r18-title">
          <div className="r18-hero__copy">
            <h1 id="r18-title" className="r18-reveal">Meet my<br />work record</h1>
            <p className="r18-lede r18-reveal">Every project, from first interview to final accessibility audit, in one place. I&rsquo;m A.J., a UX designer who also writes the production code.</p>
            <div className="r18-actions r18-reveal">
              <a className="r18-btn r18-btn--dark" href="#record">Open the record</a>
              <a className="r18-btn r18-btn--ghost" href="#contact">Contact</a>
            </div>
          </div>

          <div className="r18-app r18-reveal" id="record">
            <section className="r18-panel r18-list" aria-labelledby="r18-list-title">
              <p className="r18-panel__brand" aria-hidden="true"><Mark />A.J. Skidmore</p>
              <h2 id="r18-list-title" className="r18-list__title">Work record <span>Five shipped products, grouped by type.</span></h2>
              <div className="r18-chips" role="group" aria-label="Filter by discipline">
                {FILTERS.map((f) => (
                  <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </div>
              <p className="visually-hidden" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'} shown</p>
              {groups.map((g) => (
                <div key={g} className="r18-group">
                  <h3 className="r18-group__title">{g}</h3>
                  <ul>
                    {visible.filter((r) => r.group === g).map((r) => (
                      <li key={r.id}>
                        <button type="button" className="r18-row" aria-pressed={active === r.id} aria-controls="r18-detail" onClick={() => setActive(r.id)}>
                          <span className={`r18-ico r18-ico--${r.tone}`}><Icon id={r.id} /></span>
                          <span className="r18-row__text">
                            <span className="r18-row__name">{byId[r.id].name} <span>· {byId[r.id].category}</span></span>
                            <span className="r18-row__tags">{r.tags.join(' · ')}</span>
                          </span>
                          <svg className="r18-row__chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="r18-panel r18-detail" id="r18-detail" aria-live="polite" aria-labelledby="r18-detail-title">
              <div className={`r18-detail__head r18-detail__head--${rec.tone}`}>
                <span className={`r18-ico r18-ico--${rec.tone}`}><Icon id={rec.id} /></span>
                <div>
                  <h2 id="r18-detail-title">{proj.name}</h2>
                  <p>{proj.category} · {rec.tags.join(', ')}</p>
                </div>
              </div>
              <dl className="r18-fields">
                <div><dt>Designer &amp; developer</dt><dd>A.J. Skidmore</dd></div>
                <div><dt>The problem</dt><dd>{rec.problem}</dd></div>
                <div><dt>What I made</dt><dd>{proj.summary}</dd></div>
                <div><dt>Built with</dt><dd className="r18-tools">{proj.tools.slice(0, 5).map((t) => <span key={t}>{t}</span>)}</dd></div>
              </dl>
              <div className="r18-overview">
                <h3>Design focus</h3>
                <ul>{proj.designFocus.slice(0, 2).map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <Link className="r18-btn r18-btn--dark r18-detail__cta" to={`/projects/${proj.id}`}>View {proj.name}<span className="visually-hidden"> project page</span></Link>
            </section>
          </div>
        </section>

        <section className="r18-tools-band" aria-labelledby="r18-tools-title">
          <h2 id="r18-tools-title" className="r18-h2 r18-reveal">Works with the tools<br />your team already uses</h2>
          <ul className="r18-bubbles r18-reveal">
            {tools.map((t) => (
              <li key={t}><span aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </section>

        <section className="r18-features" aria-label="How I work">
          <article className="r18-feature r18-reveal" id="process" aria-labelledby="r18-f1">
            <div className="r18-feature__text">
              <h2 id="r18-f1">See the whole process.</h2>
              <p>Research, design, build and audit happen in one pair of hands, so decisions made with users survive all the way to production.</p>
            </div>
            <div className="r18-feature__art r18-timeline" aria-hidden="true">
              <div className="r18-tl__line"><span>Research</span><span>Design</span><span>Build</span><span>Audit</span></div>
              <div className="r18-tl__card r18-tl__card--a"><span className="r18-ico r18-ico--orange"><Icon id="efilmhub" /></span><b>Interviews</b> · eFilmHub</div>
              <div className="r18-tl__card r18-tl__card--b"><span className="r18-ico r18-ico--blue"><Icon id="eudo" /></span><b>Prototype</b> · Eudo</div>
              <div className="r18-tl__card r18-tl__card--c"><span className="r18-ico r18-ico--navy"><Icon id="loopwise" /></span><b>Ship</b> · Loopwise</div>
              <div className="r18-tl__card r18-tl__card--d"><span className="r18-ico r18-ico--navy"><Icon id="travelcare" /></span><b>WCAG 2.2 AA</b> · TravelCare+</div>
            </div>
          </article>

          <article className="r18-feature r18-feature--flip r18-reveal" id="access" aria-labelledby="r18-f2">
            <div className="r18-feature__text">
              <h2 id="r18-f2">Accessibility you can switch on.</h2>
              <p>People should control how an interface treats them. Try it: these switches really restyle the sample screen, the way I build preferences into products.</p>
            </div>
            <div className="r18-feature__art r18-access">
              <ul className="r18-switches" aria-label="Display preferences">
                {[
                  ['large', 'Larger text'],
                  ['contrast', 'Higher contrast'],
                  ['calm', 'Calmer motion'],
                ].map(([k, label]) => (
                  <li key={k}>
                    <span id={`r18-sw-${k}`}>{label}</span>
                    <button type="button" role="switch" aria-checked={prefs[k]} aria-labelledby={`r18-sw-${k}`} className="r18-switch" onClick={() => toggle(k)}><span /></button>
                  </li>
                ))}
              </ul>
              <div className="r18-sample" data-large={prefs.large} data-contrast={prefs.contrast} data-calm={prefs.calm}>
                <p className="r18-sample__k"><i aria-hidden="true" />Sample screen · reminder</p>
                <p className="r18-sample__t">License renewal due</p>
                <p className="r18-sample__d">Your Oregon RN license expires in 23 days. Renewal takes about 15 minutes.</p>
                <span className="r18-sample__b">Start renewal</span>
              </div>
            </div>
          </article>

          <article className="r18-feature r18-reveal" aria-labelledby="r18-f3">
            <div className="r18-feature__text">
              <h2 id="r18-f3">Shipped, not just mocked up.</h2>
              <p>These are real screens from live products, built from my own Figma files. Every one is in production today.</p>
            </div>
            <div className="r18-feature__art r18-shots" aria-hidden="true">
              <img className="r18-shot r18-shot--a" src={`${G}/tc-credentials.jpg`} alt="" width="1440" height="720" loading="lazy" />
              <img className="r18-shot r18-shot--b" src={`${G}/eudo-2.jpg`} alt="" width="1600" height="901" loading="lazy" />
              <img className="r18-shot r18-shot--c" src={`${G}/efh-profile-page.jpg`} alt="" width="690" height="1514" loading="lazy" />
            </div>
          </article>
        </section>

        <section className="r18-contact" id="contact" aria-labelledby="r18-contact-title">
          <div className="r18-contact__card r18-reveal">
            <img src="/assets/images/new-design/aj-cutout.png" alt="A.J. Skidmore smiling, in a navy suit jacket" width="1200" height="1600" loading="lazy" />
            <div>
              <h2 id="r18-contact-title" className="r18-h2">Meet your designer.</h2>
              <p>Experience Architecture grad from Michigan State with 4+ years shipping 30+ production sites and apps. I&rsquo;ve led a team of five developers and audited public services for accessibility. I&rsquo;d love to help build care tools people can trust.</p>
              <div className="r18-actions">
                <a className="r18-btn r18-btn--dark" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
                <a className="r18-btn r18-btn--ghost" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="r18-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign18;
