"use client";

import { useEffect, useRef, useState } from "react";
import { pseudoHash } from "@/lib/hash";

const HEX = "0123456789abcdef";

/**
 * The chain head, in text. The hash resolves from scrambled hex to its settled
 * value over ~700ms — the same confirmation the 3D block is showing in parallel.
 */
export default function BlockReadout({
  height,
  label,
  reducedMotion,
}: {
  height: number;
  label: string;
  reducedMotion: boolean;
}) {
  const settled = pseudoHash(label, 10);
  const [hash, setHash] = useState(settled);
  const frame = useRef<number>();

  useEffect(() => {
    if (reducedMotion) {
      setHash(settled);
      return;
    }
    const start = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / 700);
      const keep = Math.floor(p * settled.length);
      let out = settled.slice(0, keep);
      for (let i = keep; i < settled.length; i++) {
        const ch = settled[i];
        out += ch === "x" || ch === "…" ? ch : HEX[(Math.random() * 16) | 0];
      }
      setHash(out);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [settled, reducedMotion]);

  return (
    <div className="inline-flex flex-col gap-2 rounded-sm border border-line bg-panel/70 px-5 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mutedDark">
        <span className="h-1.5 w-1.5 rounded-full bg-teal animate-blink" aria-hidden="true" />
        chain head
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xl font-semibold text-paper tabular-nums">
          #{String(height).padStart(7, "0")}
        </span>
        <span className="font-mono text-xs text-goldDim">{hash}</span>
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
