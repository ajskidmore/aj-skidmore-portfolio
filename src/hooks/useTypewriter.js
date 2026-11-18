// src/hooks/useTypewriter.js
// Typing animation for headline titles.
// Accessibility: when `paused` is true, or the visitor has "reduce motion" turned on,
// it shows the full current title and stops (WCAG 2.2.2 Pause, Stop, Hide; 2.3.3).
// With `loop: false` it types the first title once and stops.
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

const useTypewriter = (titles, { paused = false, loop = true } = {}) => {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const stopped = paused || reduceMotion;
  const current = titles[index];

  useEffect(() => {
    if (stopped) return undefined;

    if (!isDeleting && displayed === current) {
      if (!loop) return undefined;
      const t = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % titles.length);
      return undefined;
    }

    const t = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, current, stopped, loop, titles.length]);

  // When stopped, show the whole title instead of a half-typed one.
  return stopped ? current : displayed;
};

export default useTypewriter;
