// src/pages/NewDesign6/WaveCanvas.js
// Glowing light waves for the Signal hero. Canvas 2D with additive blending.
// Interactive: waves swell near the pointer and their phase follows its height.
// Stops for `paused`, reduced motion (draws one still frame), hidden tabs and off-screen.
import React, { useEffect, useRef } from 'react';

const COLORS = ['#4f6bff', '#3b9dff', '#22d3ee', '#8b7bff', '#c084fc', '#f472b6'];

const WaveCanvas = ({ paused }) => {
  const ref = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -9999, y: 0.5, strength: 0 };
    let t = 4;
    let last = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const px = pointer.x * dpr;
      const sigma = w * 0.12;
      COLORS.forEach((color, i) => {
        const base = h * (0.8 + i * 0.01);
        const amp = h * 0.075 * (1 + 0.45 * Math.sin(t * 0.25 + i * 1.3));
        const k = (Math.PI * 2) / (w * (0.62 - i * 0.045));
        const phase = t * (0.35 + i * 0.07) + (pointer.y - 0.5) * 2.4 + i * 0.9;
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 6 * dpr) {
          const env = Math.sin((x / w) * Math.PI) * 0.6 + 0.4;
          const bulge = pointer.strength * h * 0.09 * Math.exp(-((x - px) ** 2) / (2 * sigma * sigma)) * Math.sin(t * 1.6 + i);
          const y = base + amp * env * Math.sin(k * x + phase) + bulge;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = (i % 2 ? 1.4 : 2.2) * dpr;
        ctx.shadowColor = color;
        ctx.shadowBlur = 22 * dpr;
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.lineWidth = 0.8 * dpr;
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const running = () => !pausedRef.current && !reduce.matches && visible && document.visibilityState === 'visible';

    const loop = (now) => {
      if (!running()) { frame = 0; return; }
      if (last) t += Math.min((now - last) / 1000, 0.05);
      last = now;
      pointer.strength += ((pointer.x > -9000 ? 1 : 0) - pointer.strength) * 0.05;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      draw();
      if (running() && !frame) { last = 0; frame = requestAnimationFrame(loop); }
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    };
    const onLeave = () => { pointer.x = -9999; };

    resize();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); });
    io.observe(canvas);
    const host = canvas.parentElement;
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

  return <canvas ref={ref} className="n6-waves" aria-hidden="true" />;
};

export default WaveCanvas;
