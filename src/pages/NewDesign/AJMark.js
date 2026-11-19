// src/pages/NewDesign/AJMark.js
// The A.J. Skidmore mark, "one continuous stroke" (refined): the A's left leg rises to
// the apex and runs straight into the J's top bar, drawn as one fine gradient line.
// Source SVGs: public/assets/images/brand. Brand sheet: docs/brand/logo-sheet.html.
import React, { useId } from 'react';

const PATH = 'M12 48 L27 16 H50 M45 16 V39.5 A8.5 8.5 0 0 1 28.5 42 M27 16 L33.5 30 M20.6 35 H31';

// Deep gradient for light backgrounds, lighter one for dark backgrounds
const STOPS = {
  dark: ['#4338ca', '#2563eb', '#7c3aed', '#db2777'],
  light: ['#a5b4fc', '#93c5fd', '#c4b5fd', '#f9a8d4'],
};

// Keep the line about 2.6px thick on screen: fine when large, heavier when small
const strokeFor = (width) => Math.min(5.5, Math.max(1.8, 2.6 / (width / 44)));

const AJMark = ({ size = 40, tone = 'dark', className }) => {
  const gradientId = `aj-line-${useId().replace(/:/g, '')}`;
  const stops = STOPS[tone] || STOPS.dark;
  return (
    <svg
      className={className}
      viewBox="9 13 44 38"
      width={size}
      height={Math.round((size * 38) / 44)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="12" y1="48" x2="50" y2="16">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.45" stopColor={stops[1]} />
          <stop offset="0.75" stopColor={stops[2]} />
          <stop offset="1" stopColor={stops[3]} />
        </linearGradient>
      </defs>
      <path
        d={PATH}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeFor(size)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AJMark;
