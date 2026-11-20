// src/pages/NewDesign11/Terrain.js
// Particle terrain for the Dusk hero: a field of glowing dots rolling like a landscape at dusk,
// drawn in perspective on a 2D canvas. The pointer raises a soft hill under it.
// Stops for `paused`, reduced motion (one still frame), hidden tabs and off-screen.
import React, { useEffect, useRef } from 'react';

const COLS = 90;
const ROWS = 36;

const Terrain = ({ paused }) => {
  const ref = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0.5, y: 0.7, on: 0, target: 0 };
    let t = 3;
    let last = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };

    const height = (u, v) =>
      Math.sin(u * 6 + t * 0.5) * 0.35 +
      Math.sin(u * 13 - v * 4 + t * 0.32) * 0.18 +
      Math.cos(v * 7 + u * 3 - t * 0.4) * 0.22 +
      pointer.on * 1.1 * Math.exp(-(((u - pointer.x) * 3.2) ** 2 + ((v - pointer.y) * 4) ** 2));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.52;
      for (let j = 0; j < ROWS; j += 1) {
        const v = j / (ROWS - 1);
        const depth = 0.18 + v * 0.82;
        const y0 = horizon + (h - horizon) * (v ** 1.6);
        for (let i = 0; i < COLS; i += 1) {
          const u = i / (COLS - 1);
          const spread = 0.4 + depth * 1.1;
          const x = w / 2 + (u - 0.5) * w * spread;
          if (x < -10 || x > w + 10) continue;
          const y = y0 - height(u, v) * h * 0.06 * depth;
          const a = (0.25 + 0.75 * v) * (0.7 + 0.3 * Math.sin(u * 9 + t));
          const r = (1 + depth * 2.2) * dpr;
          const hue = 215 + (u - 0.5) * 70 + v * 20;
          ctx.fillStyle = `hsla(${hue}, 85%, ${72 + v * 14}%, ${Math.max(0.08, a)})`;
          ctx.beginPath();
          ctx.arc(x, y, r / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const running = () => !pausedRef.current && !reduce.matches && visible && document.visibilityState === 'visible';
    const loop = (now) => {
      if (!running()) { frame = 0; return; }
      if (last) t += Math.min((now - last) / 1000, 0.05);
      last = now;
      pointer.on += (pointer.target - pointer.on) * 0.06;
      draw();
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      draw();
      if (running() && !frame) { last = 0; frame = requestAnimationFrame(loop); }
    };

    const host = canvas.parentElement;
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      pointer.y = Math.min(1, Math.max(0, (y - 0.52) / 0.48));
      pointer.target = y > 0.45 ? 1 : 0.3;
    };
    const onLeave = () => { pointer.target = 0; };

    resize();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); });
    io.observe(canvas);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    canvas.__sync = sync;
    sync();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (ref.current && ref.current.__sync) ref.current.__sync();
  }, [paused]);

  return <canvas ref={ref} className="n11-terrain" aria-hidden="true" />;
};

export default Terrain;
