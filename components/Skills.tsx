"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { skillGroups } from "@/lib/data";
import { useSceneRig, useReducedMotion } from "@/lib/useHeroMotion";

const SkillGraphCanvas = dynamic(() => import("./three/SkillGraphCanvas"), { ssr: false });

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { pointerRef, paused, seen } = useSceneRig(sectionRef);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const counts = skillGroups.map((g) => g.items.length);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative px-6 md:px-10 py-24 border-t border-line"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">The stack</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Six clusters, kept current. Hover one to pick it out of the graph — the tools I reach
            for most on any given week.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          {/* Each cluster in the graph is one group in the list beside it. */}
          <div
            className="relative h-[280px] sm:h-[380px] lg:h-[520px] lg:sticky lg:top-24"
            aria-hidden="true"
          >
            {seen && (
              <SkillGraphCanvas
                counts={counts}
                activeIndex={active}
                pointerRef={pointerRef}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {skillGroups.map((g, i) => (
              <div
                key={g.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                className="rounded-sm outline-none transition-opacity duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                style={{ opacity: active === null || active === i ? 1 : 0.45 }}
              >
                <h3
                  className="font-display text-sm font-semibold pb-3 mb-4 border-b transition-colors duration-300"
                  style={{
                    color: active === i ? "#3FD8C4" : "#D8A945",
                    borderColor: active === i ? "#3FD8C4" : "#232C42",
                  }}
                >
                  {g.label}
                </h3>
                <ul className="space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="text-[15px] text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
