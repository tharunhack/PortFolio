"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LedgerScene from "./LedgerScene";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export type LedgerCanvasProps = {
  headRef: { current: number };
  pointerRef: { current: { x: number; y: number } };
  scrollRef: { current: number };
  /** True while the hero is offscreen or the tab is hidden. */
  paused: boolean;
  reducedMotion: boolean;
};

export default function LedgerCanvas({
  headRef,
  pointerRef,
  scrollRef,
  paused,
  reducedMotion,
}: LedgerCanvasProps) {
  const [ok, setOk] = useState<boolean | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setOk(webglAvailable());
  }, []);

  // No WebGL: the section's grid backdrop carries the hero on its own.
  if (ok !== true) return null;

  // Reduced motion keeps the object and its depth, but holds it still.
  const frameloop = reducedMotion ? "demand" : paused ? "never" : "always";

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8.4], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <LedgerScene headRef={headRef} pointerRef={pointerRef} scrollRef={scrollRef} />
    </Canvas>
  );
}
