// src/pages/NewDesign16/NewDesign16.js
// /new-design16 · "Craft"
// Inspired by alissonrocha.work (a product designer's portfolio): soft gray canvas, a gray sans
// headline with black script accent words, an italic serif name, pill buttons, and a row of
// phone screens from a real product flow. Original: the phones show A.J.'s real mobile work
// (eFilmHub, Bloom), they fan out on hover, and project cards follow below.
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { usePreviewPage, useReveal } from '../NewDesign/previewPage';
import './newDesign16.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Instrument+Serif:ital@0;1&family=Caveat:wght@700&display=swap';
const G = '/assets/images/new-design/gallery';
const IMAGES = { travelcare: '/assets/images/new-design/travelcare.png' };

const PHONES = [
  { src: `${G}/efh-profile-page.jpg`, title: 'Show your work', text: 'Portfolio-style profiles for film professionals.', alt: 'eFilmHub profile page on a phone' },
  { src: `${G}/efh-search-filter.jpg`, title: 'Find the right crew', text: 'Search filters for role, location and availability.', alt: 'eFilmHub talent search results on a phone' },
  { src: `${G}/bloom-mobile.jpg`, title: 'Grow a routine', text: 'Daily habits, with a flower that blooms as you go.', alt: 'Bloom Today screen with a smiling flower on a phone' },
];

const NewDesign16 = () => {
  const rootRef = useRef(null);
  usePreviewPage({ title: 'A.J. Skidmore | Craft preview', fontHref: FONT_HREF, bodyClass: 'n16-page' });
  useReveal(rootRef, '.n16-reveal');
  const work = ['travelcare', 'efilmhub', 'eudo', 'loopwise', 'bloom'].map((id) => featuredProjects.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="n16" ref={rootRef}>
      <a className="n16-skip" href="#n16-main">Skip to main content</a>
      <header className="n16-bar">
        <a className="n16-name" href="#top">A.J. Skidmore</a>
        <nav aria-label="Main" className="n16-nav">
          <ul>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About me</a></li>
            <li><a href="mailto:hello@ajskidmore.com">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="n16-main" tabIndex={-1}>
        <section className="n16-hero" id="top" aria-labelledby="n16-title">
          <h1 className="n16-title n16-reveal" id="n16-title">
            Combining <em className="n16-script">research</em> and <em className="n16-script">craft</em> to build accessible digital products
          </h1>
          <div className="n16-actions n16-reveal">
            <a className="n16-pill n16-pill--dark" href="#projects">Projects</a>
            <a className="n16-pill" href="#about">About me</a>
          </div>

          <div className="n16-stage n16-reveal">
            <ul className="n16-phones">
              {PHONES.map((p, i) => (
                <li key={p.title} className="n16-phone" style={{ '--i': i }}>
                  <div className="n16-phone__frame"><img src={p.src} alt={p.alt} loading="lazy" /></div>
                  <p className="n16-phone__title">{p.title}</p>
                  <p className="n16-phone__text">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="n16-section" id="projects" aria-labelledby="n16-projects-title">
          <h2 className="n16-h2 n16-reveal" id="n16-projects-title">Selected <em className="n16-script">projects</em></h2>
          <ul className="n16-cards">
            {work.map((p, i) => (
              <li key={p.id} className="n16-card n16-reveal">
                <div className="n16-card__img" aria-hidden="true"><img src={IMAGES[p.id] || p.imageUrl} alt="" width="1440" height="720" loading="lazy" /></div>
                <div className="n16-card__text">
                  <p className="n16-card__meta">{String(i + 1).padStart(2, '0')} · {p.category}</p>
                  <h3><Link to={`/projects/${p.id}`} className="n16-stretch">{p.name}</Link></h3>
                  <p>{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="n16-section n16-about" id="about" aria-labelledby="n16-about-title">
          <img className="n16-about__photo n16-reveal" src="/assets/images/new-design/aj-cutout.png" alt="A.J. Skidmore smiling, in a navy suit jacket" width="1200" height="1600" loading="lazy" />
          <div>
            <h2 className="n16-h2 n16-reveal" id="n16-about-title">Hi, I&rsquo;m <em className="n16-script">A.J.</em></h2>
            <p className="n16-reveal">I&rsquo;m a UX designer and front-end engineer with a degree in Experience Architecture from Michigan State. Over 4+ years I&rsquo;ve shipped 30+ production sites and apps, led a team of five developers and audited public services for accessibility.</p>
            <p className="n16-reveal">I care about the details people feel but rarely notice: clear words, calm layouts and interfaces that work with a keyboard, a screen reader or a shaky hand.</p>
            <div className="n16-actions n16-actions--left n16-reveal">
              <a className="n16-pill n16-pill--dark" href="mailto:hello@ajskidmore.com">hello@ajskidmore.com</a>
              <a className="n16-pill" href="https://linkedin.com/in/aj-skidmore" target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="n16-foot">
        <p>&copy; {new Date().getFullYear()} A.J. Skidmore</p>
        <p><Link to="/">View the current site</Link></p>
      </footer>
    </div>
  );
};

export default NewDesign16;
