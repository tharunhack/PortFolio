import * as THREE from "three";
import { GENESIS_HEIGHT } from "./data";

const HEX = "0123456789abcdef";

// Deterministic PRNG so every render of a given block index looks identical.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Face texture for a ledger block: rows of hex data on an etched panel, drawn
 * procedurally so the model ships as code rather than an image asset.
 *
 * This texture carries the block's full colour — the material's `color` stays
 * white, or the two multiply together and crush the block to black.
 */
export function makeBlockTexture(seed: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = mulberry32(seed * 9973 + 7);

  // Panel base, with a soft diagonal sheen so flat faces still read as surfaces.
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#35425f");
  grad.addColorStop(0.5, "#27314a");
  grad.addColorStop(1, "#1d2538");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Etched frame
  ctx.strokeStyle = "rgba(216,169,69,0.45)";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, size - 24, size - 24);

  // Header band — every block states its own height.
  ctx.fillStyle = "rgba(216,169,69,0.16)";
  ctx.fillRect(13, 13, size - 26, 34);
  ctx.fillStyle = "rgba(240,200,120,0.95)";
  ctx.font = "bold 17px ui-monospace, 'Courier New', monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(`#${String(GENESIS_HEIGHT + seed).padStart(7, "0")}`, 24, 31);

  ctx.font = "14px ui-monospace, 'Courier New', monospace";
  ctx.textBaseline = "top";

  const rows = 9;
  for (let r = 0; r < rows; r++) {
    const y = 62 + r * 20;
    let x = 24;
    while (x < size - 30) {
      const run = 2 + Math.floor(rand() * 4);
      let s = "";
      for (let i = 0; i < run; i++) s += HEX[Math.floor(rand() * 16)];
      const roll = rand();
      // Most data is quiet; a few bytes catch the gold, fewer still the teal.
      ctx.fillStyle =
        roll > 0.9
          ? "rgba(240,200,120,0.95)"
          : roll > 0.78
          ? "rgba(120,235,215,0.9)"
          : `rgba(190,205,230,${0.4 + rand() * 0.35})`;
      ctx.fillText(s, x, y);
      x += run * 9 + 8;
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}
