// src/pages/NewDesign7/pixels.js
// Rasterizes A.J.'s continuous-line AJ mark into a pixel grid, so the logo and the intro
// can be drawn from squares. Runs once in the browser using an offscreen canvas.
const MARK_PATH = 'M12 48 L27 16 H50 M45 16 V39.5 A8.5 8.5 0 0 1 28.5 42 M27 16 L33.5 30 M20.6 35 H31';

export const markPixels = (size = 28, stroke = 5.6) => {
  if (typeof document === 'undefined') return [];
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx || typeof Path2D === 'undefined') return [];
  // The mark spans roughly x 9..53, y 13..51 in a 64 box; fit that area into the grid
  const scale = size / 46;
  ctx.setTransform(scale, 0, 0, scale, -8 * scale, -10 * scale);
  ctx.lineWidth = stroke;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#000';
  ctx.stroke(new Path2D(MARK_PATH));
  const { data } = ctx.getImageData(0, 0, size, size);
  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (data[(y * size + x) * 4 + 3] > 110) cells.push([x, y]);
    }
  }
  return cells;
};
