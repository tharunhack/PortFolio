"use client";

import { Canvas } from "@react-three/fiber";
import SkillGraph from "./SkillGraph";

export default function SkillGraphCanvas({
  counts,
  activeIndex,
  pointerRef,
  paused,
  reducedMotion,
}: {
  counts: number[];
  activeIndex: number | null;
  pointerRef: { current: { x: number; y: number } };
  paused: boolean;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      frameloop={reducedMotion ? "demand" : paused ? "never" : "always"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <SkillGraph counts={counts} activeIndex={activeIndex} pointerRef={pointerRef} />
    </Canvas>
  );
}
