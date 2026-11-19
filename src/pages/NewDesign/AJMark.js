// src/pages/NewDesign/AJMark.js
// The A.J. Skidmore mark ("one continuous stroke"): the A's left leg rises to the apex
// and runs straight into the J's top bar. The crossbar carries the ribbon gradient.
// Source files and the brand sheet live in public/assets/images/brand and docs/brand.
import React, { useId } from 'react';

const AJMark = ({ size = 32, tile = true, color = '#ffffff', className }) => {
  const gradientId = `aj-bar-${useId().replace(/:/g, '')}`;
  const stroke = color;
  return (
    <svg
      className={className}
      viewBox={tile ? '0 0 64 64' : '9 13 44 38'}
      width={size}
      height={tile ? size : Math.round((size * 38) / 44)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="14" y1="0" x2="50" y2="0">
          <stop offset="0" stopColor="#818cf8" />
          <stop offset="0.3" stopColor="#3b82f6" />
          <stop offset="0.55" stopColor="#22d3ee" />
          <stop offset="0.8" stopColor="#c084fc" />
          <stop offset="1" stopColor="#fda4af" />
        </linearGradient>
      </defs>
      {tile && <rect width="64" height="64" rx="16" fill="#0a1020" />}
      <path d="M12 48 L27 16 H50 M45 16 V39.5 A8.5 8.5 0 0 1 28.5 42" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 16 L33.5 30" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      <path d="M20.6 35 H31" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

export default AJMark;
