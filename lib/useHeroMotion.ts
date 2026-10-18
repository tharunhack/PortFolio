"use client";

import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/**
 * Drives a section's 3D rig: pointer parallax, scroll progress, and the two
 * lifecycle flags a WebGL scene needs — `seen` to mount it the first time it
 * scrolls into view, `paused` to stop rendering whenever it is not on screen.
 * The context is built once and then idles; it is never torn down on scroll.
 */
export function useSceneRig(sectionRef: React.RefObject<HTMLElement>) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [paused, setPaused] = useState(true);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    const onPointer = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const h = el?.offsetHeight ?? window.innerHeight;
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / h));
    };

    let visible = false;
    const sync = () => setPaused(document.hidden || !visible);
    const onVisibility = () => sync();

    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) setSeen(true);
          sync();
        },
        { rootMargin: "200px" }
      );
      io.observe(el);
    } else {
      visible = true;
      sync();
    }

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, [sectionRef]);

  return { pointerRef, scrollRef, paused, seen };
}
