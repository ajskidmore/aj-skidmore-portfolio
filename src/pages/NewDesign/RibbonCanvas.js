// src/pages/NewDesign/RibbonCanvas.js
// The hero's "silk ribbon": an original WebGL shader, drawn at the device's pixel
// density so it stays sharp on high-resolution screens.
//
// Accessibility and performance:
// - Purely decorative (aria-hidden). The shader fades the ribbon out before it reaches
//   the text (`clearRef`), so text always sits on plain white (WCAG 1.4.3).
// - Stops moving when `paused`, when the visitor prefers reduced motion (2.2.2, 2.3.3),
//   when the tab is hidden, or when the hero is scrolled out of view.
// - Falls back to a static CSS gradient when WebGL isn't available.
import React, { useEffect, useRef, useState } from 'react';

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 u_res;        // canvas size in device pixels
uniform float u_dpr;
uniform float u_time;
uniform float u_mobile;    // 1.0 = ribbon across the top, 0.0 = ribbon on the right
uniform vec2 u_clear;      // x: text column's right edge, y: text column's top (CSS px)

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

// Brand spectrum: indigo, blue, cyan, violet, pink, peach
vec3 palette(float k) {
  vec3 c0 = vec3(0.310, 0.275, 0.898);
  vec3 c1 = vec3(0.145, 0.388, 0.922);
  vec3 c2 = vec3(0.133, 0.827, 0.933);
  vec3 c3 = vec3(0.655, 0.545, 0.980);
  vec3 c4 = vec3(0.957, 0.447, 0.714);
  vec3 c5 = vec3(0.992, 0.729, 0.455);
  k = clamp(k, 0.0, 1.0) * 5.0;
  if (k < 1.0) return mix(c0, c1, k);
  if (k < 2.0) return mix(c1, c2, k - 1.0);
  if (k < 3.0) return mix(c2, c3, k - 2.0);
  if (k < 4.0) return mix(c3, c4, k - 3.0);
  return mix(c4, c5, k - 4.0);
}

void main() {
  vec2 res = u_res / u_dpr;
  vec2 px = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y) / u_dpr; // CSS px from top-left
  float aspect = res.x / res.y;
  vec2 p = vec2(px.x / res.y, px.y / res.y);
  float t = u_time;

  float w = fbm(p * 1.4 + vec2(t * 0.020, -t * 0.014));

  // Distance across the ribbon. Desktop: a sweep rising to the top right.
  // Mobile: a gentle band across the top.
  float bDesk = (p.x - p.y * 0.85) - aspect * 0.66 + 0.16 * sin(p.y * 3.0 + t * 0.12) + 0.30 * (w - 0.5);
  float bMob = (p.y + p.x * 0.28) - 0.30 + 0.06 * sin(p.x * 4.0 + t * 0.12) + 0.18 * (w - 0.5);
  float b = mix(bDesk, bMob, u_mobile);
  float width = mix(0.46, 0.24, u_mobile);

  float body = smoothstep(width, width * 0.25, abs(b));
  float folds = 0.5 + 0.5 * sin(b * 20.0 + w * 9.0 + t * 0.22);
  float fine = 0.5 + 0.5 * sin(b * 85.0 + w * 26.0);

  float k = (b / width) * 0.5 + 0.5 + (w - 0.5) * 0.55;
  vec3 col = palette(k);
  col *= mix(0.80, 1.06, folds);
  col += pow(folds, 12.0) * 0.30 + fine * 0.025;
  col = min(col, vec3(1.0));

  float a = body;
  // Keep the text column clear: the ribbon fades out before it gets near the words.
  float clearDesk = smoothstep(u_clear.x + 24.0, u_clear.x + 240.0, px.x);
  float clearMob = 1.0 - smoothstep(u_clear.y - 120.0, u_clear.y - 16.0, px.y);
  a *= mix(clearDesk, clearMob, u_mobile);

  gl_FragColor = vec4(col * a, a); // premultiplied alpha over the white page
}
`;

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const MOBILE_BREAKPOINT = 900;
const START_TIME = 18; // a pleasing frame for the still (reduced-motion) version

const RibbonCanvas = ({ paused, clearRef }) => {
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas && canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false });
    if (!gl) {
      setFallback(true);
      return undefined;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs) {
      setFallback(true);
      return undefined;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return undefined;
    }
    gl.useProgram(program);

    // One triangle that covers the whole canvas
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(program, 'u_res'),
      dpr: gl.getUniformLocation(program, 'u_dpr'),
      time: gl.getUniformLocation(program, 'u_time'),
      mobile: gl.getUniformLocation(program, 'u_mobile'),
      clear: gl.getUniformLocation(program, 'u_clear'),
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let time = START_TIME;
    let last = 0;
    let frame = 0;
    let visible = true;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      const mobile = rect.width < MOBILE_BREAKPOINT ? 1 : 0;
      let clearX = rect.width * 0.5;
      let clearY = rect.height * 0.5;
      const textEl = clearRef && clearRef.current;
      if (textEl) {
        const tr = textEl.getBoundingClientRect();
        clearX = tr.right - rect.left;
        clearY = tr.top - rect.top;
      }
      gl.uniform2f(u.res, w, h);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.mobile, mobile);
      gl.uniform2f(u.clear, clearX, clearY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const shouldAnimate = () =>
      !pausedRef.current && !reduceMotion.matches && visible && document.visibilityState === 'visible';

    const loop = (now) => {
      if (!shouldAnimate()) {
        frame = 0;
        return;
      }
      if (last) time += Math.min((now - last) / 1000, 0.05);
      last = now;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      draw();
      if (shouldAnimate() && !frame) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    if (clearRef && clearRef.current) ro.observe(clearRef.current);
    document.addEventListener('visibilitychange', sync);
    reduceMotion.addEventListener('change', sync);
    canvas.__sync = sync; // lets the pause button restart the loop

    sync();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduceMotion.removeEventListener('change', sync);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [clearRef]);

  // Restart or stop the loop when the pause button changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.__sync) canvas.__sync();
  }, [paused]);

  if (fallback) return <div className="nd-ribbon nd-ribbon--fallback" aria-hidden="true" />;
  return <canvas ref={canvasRef} className="nd-ribbon" aria-hidden="true" />;
};

export default RibbonCanvas;
