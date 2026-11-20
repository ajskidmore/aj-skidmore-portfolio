// src/pages/NewDesign/previewPage.js
// Shared setup for the /new-design* preview pages: fonts, title, noindex,
// the new favicon, a plain body, and the scroll-reveal helper.
import { useEffect, useState } from 'react';

export const usePreviewPage = ({ title, fontHref, bodyClass }) => {
  useEffect(() => {
    if (fontHref && !document.querySelector(`link[href="${fontHref}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontHref;
      document.head.appendChild(link);
    }
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);

    const previousTitle = document.title;
    document.title = title;

    const icon = document.querySelector('link[rel="icon"]');
    const previousIcon = icon && icon.getAttribute('href');
    if (icon) icon.setAttribute('href', '/assets/images/brand/aj-favicon.svg');

    if (bodyClass) document.body.classList.add(bodyClass);
    window.scrollTo(0, 0);

    return () => {
      robots.remove();
      document.title = previousTitle;
      if (icon && previousIcon) icon.setAttribute('href', previousIcon);
      if (bodyClass) document.body.classList.remove(bodyClass);
    };
  }, [title, fontHref, bodyClass]);
};

// Adds .is-in to elements matching `selector` as they scroll into view.
// A failsafe reveals everything after 2.5s so content is never left hidden.
export const useReveal = (rootRef, selector = '.reveal') => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll(selector);
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
    const failsafe = setTimeout(() => items.forEach((el) => el.classList.add('is-in')), 2500);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [rootRef, selector]);
};

export const usePrefersReducedMotion = () => {
  const query = '(prefers-reduced-motion: reduce)';
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [reduced, setReduced] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
};
