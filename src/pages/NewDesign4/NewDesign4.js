// src/pages/NewDesign4/NewDesign4.js
// /new-design4 · "Archive"
// Inspired by maxhenningsson.com: the work is the website. A quiet two-column intro,
// then a long captioned wall of real artifacts on full-bleed panels in each product's
// own color. Mixed with Stripe-style browser and phone frames and A.J.'s process artifacts.
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePreviewPage, useReveal } from '../NewDesign/previewPage';
import './newDesign4.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap';
const G = '/assets/images/new-design/gallery';
const MARK_PATH = 'M12 48 L27 16 H50 M45 16 V39.5 A8.5 8.5 0 0 1 28.5 42 M27 16 L33.5 30 M20.6 35 H31';

// Catalog-stamp logo: AJ over SK in a hairline square
const Stamp = () => (
  <span className="n4-stamp" aria-hidden="true">
    <span>A</span><span>J</span><span>S</span><span>K</span>
  </span>
);

const Browser = ({ src, alt, domain }) => (
  <div className="n4-browser">
    <div className="n4-browser__bar" aria-hidden="true"><i /><i /><i /><span>{domain}</span></div>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const Phone = ({ src, alt }) => (
  <div className="n4-phone">
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const ITEMS = [
  {
    caption: 'travelcare+ home', project: 'travelcare', span: 8, bg: '#0c7059',
    body: <Browser src="/assets/images/new-design/travelcare.png" domain="travelcareplus.com" alt="TravelCare+ home page: 'The travel healthcare guide nobody gave you' with Start learning and I'm already traveling buttons" />,
  },
  {
    caption: 'travelcare+ credentials tracker', project: 'travelcare', span: 4, bg: '#dff3ec', tall: true,
    body: <Browser src={`${G}/tc-credentials.jpg`} domain="travelcareplus.com/credentials" alt="TravelCare+ Credentials page with an Add a credential button, a continuing education log and a 'Can I work in…?' compact checker" />,
  },
  {
    caption: 'travelcare+ plain-language guides', project: 'travelcare', span: 4, bg: '#dbeafe', tall: true,
    body: <Browser src={`${G}/tc-learn.jpg`} domain="travelcareplus.com/learn" alt="TravelCare+ Guides page with an Ask a question box and guides grouped under Start here, Taxes and Pay" />,
  },
  {
    caption: 'travelcare+ tax home record', project: 'travelcare', span: 4, bg: '#f1f5f9', tall: true,
    body: <Browser src={`${G}/tc-taxhome.jpg`} domain="travelcareplus.com/tax-home" alt="TravelCare+ Tax home record page with fields for time at home and costs of the tax home" />,
  },
  {
    caption: 'travelcare+ state licensing rules', project: 'travelcare', span: 4, bg: '#ede9fe', tall: true,
    body: <Browser src={`${G}/tc-states.jpg`} domain="travelcareplus.com/states/tx" alt="TravelCare+ Texas page listing licensing compacts by profession, each with a plain-language status label" />,
  },
  {
    caption: 'efilmhub mobile screens: profile, search, job posting, messaging', project: 'efilmhub', span: 12, bg: '#16100b', phones: true,
    body: (
      <div className="n4-phones">
        <Phone src={`${G}/efh-profile-page.jpg`} alt="eFilmHub profile page on a phone, with a portfolio-style gallery of the member's work" />
        <Phone src={`${G}/efh-search-filter.jpg`} alt="eFilmHub talent search on a phone with filters for role, location and availability" />
        <Phone src={`${G}/efh-job-posting-1.jpg`} alt="eFilmHub job posting form on a phone" />
        <Phone src={`${G}/efh-messaging-1.jpg`} alt="eFilmHub messaging inbox on a phone" />
      </div>
    ),
  },
  {
    caption: 'eudo experiment workflow', project: 'eudo', span: 7, bg: '#0f3d2a',
    body: <Browser src={`${G}/eudo-1.jpg`} domain="eudo.co" alt="Eudo experiment page showing an intervention's step-by-step setup checklist and progress" />,
  },
  {
    caption: 'eudo diagnostic scores', project: 'eudo', span: 5, bg: '#e3f0e8', tall: true,
    body: <Browser src={`${G}/eudo-2.jpg`} domain="eudo.co" alt="Eudo diagnostic dashboard with score cards for Environment and Livelihood and filters down the left" />,
  },
  {
    caption: 'loopwise course map', project: 'loopwise', span: 6, bg: '#1b1530',
    body: <Browser src={`${G}/lw-learn.jpg`} domain="loopwise" alt="Loopwise learning path for How Computers Think, with locked and unlocked lesson nodes and an Up next card" />,
  },
  {
    caption: 'loopwise practice arena', project: 'loopwise', span: 6, bg: '#5b21b6',
    body: <Browser src={`${G}/lw-practice.jpg`} domain="loopwise" alt="Loopwise Practice Arena listing coding problems with difficulty and topic tags" />,
  },
  {
    caption: 'loopwise course catalog', project: 'loopwise', span: 8, bg: '#2a2050',
    body: <Browser src={`${G}/lw-courses.jpg`} domain="loopwise" alt="Loopwise All courses page with course cards grouped under Start here, Programming and Math for CS" />,
  },
  {
    caption: 'bloom today screen', project: 'bloom', span: 4, bg: '#f4efe4', phones: true,
    body: <div className="n4-phones n4-phones--one"><Phone src={`${G}/bloom-mobile.jpg`} alt="Bloom on a phone: a smiling potted flower, a 60% watered progress bar and starter habits" /></div>,
  },
  {
    caption: 'aj logo construction', span: 6, bg: '#ffffff',
    body: (
      <svg className="n4-construct" viewBox="0 0 64 64" role="img" aria-label="Construction drawing of the AJ logo: one continuous line on a 64-unit grid">
        <defs>
          <linearGradient id="n4-g" gradientUnits="userSpaceOnUse" x1="12" y1="48" x2="50" y2="16">
            <stop offset="0" stopColor="#4338ca" /><stop offset="0.45" stopColor="#2563eb" /><stop offset="0.75" stopColor="#7c3aed" /><stop offset="1" stopColor="#db2777" />
          </linearGradient>
        </defs>
        <g stroke="#1d4ed8" strokeOpacity="0.3" strokeWidth="0.2" strokeDasharray="0.8 0.8" fill="none">
          <path d="M0 16H64M0 48H64M0 35H64M12 0V64M27 0V64M45 0V64M50 0V64" />
          <circle cx="36.5" cy="39.5" r="8.5" />
        </g>
        <path d={MARK_PATH} fill="none" stroke="url(#n4-g)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    caption: 'accessibility audit, run on every release', span: 6, bg: '#0a1020',
    body: (
      <ul className="n4-audit">
        {[
          ['Text contrast', '6.7:1', 'Pass AA'],
          ['Keyboard & visible focus', '', 'Pass'],
          ['Screen reader (NVDA)', '', 'Pass'],
          ['Reduced motion respected', '', 'Pass'],
          ['axe automated scan', '0 issues', 'Pass'],
        ].map(([label, detail, status]) => (
          <li key={label}>
            <span className="n4-audit__check" aria-hidden="true">&#10003;</span>
            {label}
            {detail && <em>{detail}</em>}
            <span className="n4-audit__status">{status}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

const NewDesign4 = () => {
  const rootRef = useRef(null);
  usePreviewPage({ title: 'A.J. Skidmore | Archive preview', fontHref: FONT_HREF, bodyClass: 'n4-page' });
  useReveal(rootRef, '.n4-reveal');

  return (
    <div className="n4" ref={rootRef}>
      <a className="n4-skip" href="#n4-main">Skip to main content</a>

      <main id="n4-main" tabIndex={-1}>
        <header className="n4-intro">
          <div className="n4-intro__who">
            <Stamp />
            <h1>A.J. Skidmore</h1>
            <p>UX designer who builds: apps, design systems and websites, mostly for healthcare, learning and data tools.</p>
          </div>
          <div className="n4-intro__how">
            <h2>Working with me</h2>
            <p>You&rsquo;ll get the most from working with me on products where clarity matters: complex information, high stakes, and people who need it to just work, including people using a keyboard or a screen reader.</p>
            <p>I studied Experience Architecture at Michigan State and have spent 4+ years shipping 30+ production sites and apps. I research, design and build the result myself.</p>
            <p>Scroll to see the work, and drop me a line if you&rsquo;d like to talk.</p>
            <div className="n4-actions">
              <a className="n4-btn" href="mailto:hello@ajskidmore.com"><span aria-hidden="true">&#9993;</span> Send email</a>
              <a className="n4-btn" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">in</span> LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </header>

        <section className="n4-wall" aria-label="Work archive">
          {ITEMS.map((item) => (
            <figure
              key={item.caption}
              className={`n4-item n4-reveal${item.tall ? ' n4-item--tall' : ''}${item.phones ? ' n4-item--phones' : ''}`}
              style={{ '--span': item.span, '--panel': item.bg }}
            >
              <figcaption>
                {item.project ? <Link to={`/projects/${item.project}`}>{item.caption}</Link> : item.caption}
              </figcaption>
              <div className="n4-panel">{item.body}</div>
            </figure>
          ))}
        </section>

        <section className="n4-outro n4-reveal" aria-labelledby="n4-outro-title">
          <img className="n4-avatar" src="/assets/images/new-design/aj-cutout-sm.png" alt="" width="96" height="128" loading="lazy" />
          <h2 id="n4-outro-title">Hey, it&rsquo;s me, the maker of everything you just saw.</h2>
          <p>If something caught your eye, I&rsquo;m a message away.</p>
          <div className="n4-actions">
            <a className="n4-btn" href="mailto:hello@ajskidmore.com"><span aria-hidden="true">&#9993;</span> Send email</a>
            <a className="n4-btn" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">in</span> LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="n4-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign4;
