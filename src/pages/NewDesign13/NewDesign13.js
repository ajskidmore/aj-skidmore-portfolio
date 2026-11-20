// src/pages/NewDesign13/NewDesign13.js
// /new-design13 · "Recovery"
// Inspired by whoop.com (A.J.'s pick): jet black and clean white sections, a thin wide-tracked
// wordmark, big light headlines, dark app screens with glowing metric rings, uppercase pill
// buttons, rounded photo cards with "+" buttons, ONE / PEAK / LIFE tier cards and a floating
// pill CTA. Original: A.J. presented as a performance profile (rings for real stats), expandable
// "+" cards (native details/summary) and three role tiers. Rings fill once; motion respects
// reduced motion.
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal } from '../NewDesign/previewPage';
import './newDesign13.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800&family=Barlow+Condensed:wght@500;600&display=swap';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };
const WORK = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'];

// A glowing progress ring (decorative; the number and label beside it are real text)
const Ring = ({ value, color, size = 140, stroke = 10 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg className="n13-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false" style={{ '--c': c, '--off': c * (1 - value) }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle className="n13-ring__fill" cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value)} transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
    </svg>
  );
};

const CARDS = [
  ['Start with the people', 'Every project begins with interviews and observation. TravelCare+ was shaped with a traveling occupational therapist, and eFilmHub with working filmmakers.', 'research'],
  ['Know when to simplify', 'Plain language, obvious next steps and fewer choices per screen. I write the words as carefully as I draw the layouts.', 'clarity'],
  ['Built for everyone', 'WCAG 2.2 AA from the first wireframe, then checked by hand with a keyboard and the NVDA screen reader before launch.', 'access'],
  ['Ship what you designed', 'I build the design myself in React and TypeScript, so the product people use matches the one we approved.', 'build'],
];

const TIERS = [
  { name: 'ONE', role: 'UX Designer', tag: 'Research & design', items: ['User interviews & usability tests', 'User flows & information architecture', 'Wireframes & Figma prototypes', 'Accessibility reviews'] },
  { name: 'PEAK', role: 'Product Designer', tag: 'Most requested', featured: true, items: ['Everything in ONE, plus', 'Design systems & component libraries', 'Data visualization & dashboards', 'Post-launch iteration'] },
  { name: 'LIFE', role: 'Design Engineer', tag: 'End to end', items: ['Everything in PEAK, plus', 'React, TypeScript & Next.js builds', 'Firebase back ends', 'WCAG 2.2 AA audits by hand'] },
];

const NewDesign13 = () => {
  const rootRef = useRef(null);
  usePreviewPage({ title: 'A.J. Skidmore | Recovery preview', fontHref: FONT_HREF, bodyClass: 'n13-page' });
  useReveal(rootRef, '.n13-reveal');
  const work = WORK.map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="n13" ref={rootRef}>
      <a className="n13-skip" href="#n13-main">Skip to main content</a>
      <aside aria-label="Availability"><p className="n13-banner">Open to UX design roles <a href="mailto:hello@ajskidmore.com">Get in touch</a></p></aside>

      <header className="n13-bar">
        <a className="n13-word" href="#top" aria-label="A.J. Skidmore, back to top">AJ SKIDMORE</a>
        <nav aria-label="Main" className="n13-nav">
          <ul>
            <li><a href="#how">How I work</a></li>
            <li><a href="#roles">Roles</a></li>
            <li><a href="#work">Work</a></li>
          </ul>
        </nav>
      </header>

      <main id="n13-main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="n13-hero" id="top" aria-labelledby="n13-title">
          <div className="n13-hero__copy">
            <p className="n13-chip n13-reveal">UX designer &amp; front-end engineer</p>
            <h1 className="n13-title n13-reveal" id="n13-title">Unlock better products.</h1>
            <p className="n13-lede n13-reveal">Research, design and accessible code from one person, measured by how easily real people get things done.</p>
            <a className="n13-pill n13-pill--light n13-reveal" href="#work">See the work</a>
          </div>
          <div className="n13-hero__visual">
            <img className="n13-portrait" src="/assets/images/new-design/aj-cutout.png" alt="A.J. Skidmore smiling, in a navy suit jacket" width="1200" height="1600" />
            <ul className="n13-metrics">
              <li className="n13-metric n13-metric--a"><Ring value={1} color="#16ec06" size={92} stroke={8} /><div><strong>AA</strong><span>WCAG</span></div></li>
              <li className="n13-metric n13-metric--b"><Ring value={0.86} color="#00b7ff" size={92} stroke={8} /><div><strong>30+</strong><span>Launches</span></div></li>
              <li className="n13-metric n13-metric--c"><Ring value={0.66} color="#ffde00" size={92} stroke={8} /><div><strong>4+</strong><span>Years</span></div></li>
            </ul>
          </div>
        </section>

        {/* ---------- App screen ---------- */}
        <section className="n13-section n13-dark" aria-labelledby="n13-data-title">
          <div className="n13-split">
            <div>
              <h2 className="n13-h2 n13-reveal" id="n13-data-title">Know what your users need, every day.</h2>
              <p className="n13-body n13-reveal">I track the signals that matter (clarity, contrast and access for everyone) the same way a good wearable tracks recovery. These numbers come from this portfolio&rsquo;s own accessibility checks.</p>
            </div>
            <figure className="n13-phone n13-reveal" aria-label="Example dashboard of A.J.'s design metrics">
              <div className="n13-phone__screen">
                <p className="n13-phone__label">Design recovery</p>
                <div className="n13-phone__ring">
                  <Ring value={1} color="#16ec06" size={190} stroke={14} />
                  <p><strong>100%</strong><span>Automated a11y checks passed</span></p>
                </div>
                <dl className="n13-phone__stats">
                  <div><dt>Contrast</dt><dd>6.7:1</dd></div>
                  <div><dt>axe issues</dt><dd>0</dd></div>
                  <div><dt>Projects</dt><dd>5</dd></div>
                </dl>
              </div>
            </figure>
          </div>
        </section>

        {/* ---------- + cards ---------- */}
        <section className="n13-section" id="how" aria-labelledby="n13-how-title">
          <h2 className="n13-h2 n13-h2--center n13-reveal" id="n13-how-title">The way I work</h2>
          <ul className="n13-cards">
            {CARDS.map(([title, text, key]) => (
              <li key={key} className={`n13-card n13-card--${key} n13-reveal`}>
                <details>
                  <summary>
                    <span className="n13-card__title">{title}</span>
                    <span className="n13-plus" aria-hidden="true" />
                  </summary>
                  <p>{text}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Tiers ---------- */}
        <section className="n13-section n13-dark" id="roles" aria-labelledby="n13-roles-title">
          <h2 className="n13-h2 n13-h2--center n13-reveal" id="n13-roles-title">Choose your fit</h2>
          <p className="n13-body n13-body--center n13-reveal">Three ways I can join your team.</p>
          <ul className="n13-tiers">
            {TIERS.map((t) => (
              <li key={t.name} className={`n13-tier n13-reveal${t.featured ? ' n13-tier--featured' : ''}`}>
                <p className="n13-tier__tag">{t.tag}</p>
                <h3><span className="n13-tier__name">{t.name}</span><span className="n13-tier__role">{t.role}</span></h3>
                <ul>{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <a className={`n13-pill${t.featured ? ' n13-pill--light' : ''}`} href="mailto:hello@ajskidmore.com">Talk about {t.role}<span className="visually-hidden"> roles</span></a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Work ---------- */}
        <section className="n13-section" id="work" aria-labelledby="n13-work-title">
          <h2 className="n13-h2 n13-h2--center n13-reveal" id="n13-work-title">The work</h2>
          <ul className="n13-work">
            {work.map((p) => (
              <li key={p.id} className="n13-workcard n13-reveal">
                <img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" />
                <div className="n13-workcard__scrim" aria-hidden="true" />
                <h3><Link to={`/projects/${p.id}`} className="n13-stretch">{p.name}</Link></h3>
                <p>{p.category}</p>
                <span className="n13-plus n13-plus--corner" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="n13-section n13-dark n13-cta" aria-labelledby="n13-cta-title">
          <h2 className="n13-cta__title n13-reveal" id="n13-cta-title">Start your next product with a designer who builds.</h2>
          <div className="n13-cta__links n13-reveal">
            <a className="n13-pill n13-pill--light" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
            <a className="n13-pill" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
          </div>
        </section>
      </main>

      <aside aria-label="Quick contact"><a className="n13-float" href="mailto:hello@ajskidmore.com">Hire A.J.</a></aside>

      <footer className="n13-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign13;
