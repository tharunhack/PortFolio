"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/useHeroMotion";

/**
 * Tilts toward the pointer and tracks a specular highlight across the surface,
 * so a card reads as a physical panel being turned rather than a hover colour.
 * Written straight to style on a rAF — no re-render per pointer move.
 */
export default function TiltCard({
  children,
  className = "",
  as: Tag = "div",
  maxTilt = 7,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a";
  maxTilt?: number;
} & React.HTMLAttributes<HTMLElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number>();
  const reduced = useReducedMotion();

  const apply = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * maxTilt}deg) rotateY(${
        (px - 0.5) * maxTilt
      }deg) translateZ(6px)`;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform = "";
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  return (
    <Tag
      // @ts-expect-error -- one ref covers both the div and anchor branches
      ref={ref}
      onPointerMove={apply}
      onPointerLeave={reset}
      onBlur={reset}
      className={`tilt-card ${className}`}
      {...rest}
    >
      <span className="tilt-sheen" aria-hidden="true" />
      {children}
    </Tag>
  );
}
