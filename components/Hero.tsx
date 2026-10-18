"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { CHAIN_DEPTH, GENESIS_HEIGHT, ledgerFeed, profile, stats } from "@/lib/data";
import { useSceneRig, useReducedMotion } from "@/lib/useHeroMotion";
import BlockReadout from "./BlockReadout";
import ChainTicker from "./ChainTicker";

const LedgerCanvas = dynamic(() => import("./three/LedgerCanvas"), { ssr: false });

const MINE_INTERVAL = 3800;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { pointerRef, scrollRef, paused, seen } = useSceneRig(sectionRef);
  const reducedMotion = useReducedMotion();

  // The chain mines a new block on a steady tick; `headRef` is read by the 3D
  // rig each frame, while `head` re-renders the text readout beside it.
  const headRef = useRef(0);
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      headRef.current += 1;
      setHead(headRef.current);
    }, MINE_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const label = ledgerFeed[head % ledgerFeed.length];

  return (
    <section ref={sectionRef} id="top" className="relative pt-36 pb-16 px-6 md:px-10 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-grid bg-[size:56px_56px] opacity-[0.35]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* The focal moment: a live chain of blocks, mined one at a time. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {seen && (
          <LedgerCanvas
            headRef={headRef}
            pointerRef={pointerRef}
            scrollRef={scrollRef}
            paused={paused}
            reducedMotion={reducedMotion}
          />
        )}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl"
      >
        <motion.h1
          variants={item}
          className="font-display font-semibold text-paper leading-[1.04] text-4xl sm:text-5xl md:text-6xl max-w-3xl text-balance"
        >
          Tharun K writes the contracts, the APIs, and the interface around them.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
          {profile.summary}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-gold text-ink font-medium text-sm transition-colors hover:bg-gold/90"
          >
            See the work
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-line text-paper font-medium text-sm transition-colors hover:border-mutedDark"
          >
            <Mail size={16} />
            Get in touch
          </a>
        </motion.div>

        {/* On a phone the chain gets a band of its own here; on desktop it lives
            off to the right of this column and this spacer collapses. */}
        <div className="h-72 md:hidden" aria-hidden="true" />

        {/* Credentials as a ledger status bar, not three big numbers. */}
        <motion.dl
          variants={item}
          className="mt-12 flex flex-col sm:flex-row sm:items-stretch gap-y-4 sm:gap-x-8 max-w-3xl"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-baseline gap-2.5 sm:flex-col sm:gap-1 ${
                i > 0 ? "sm:border-l sm:border-line sm:pl-8" : ""
              }`}
            >
              <dt className="order-2 sm:order-2 text-sm text-muted leading-snug">{s.label}</dt>
              <dd className="order-1 font-mono text-base font-medium text-gold tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={item} className="mt-12 lg:flex lg:justify-end">
          <BlockReadout
            height={GENESIS_HEIGHT + CHAIN_DEPTH - 1 + head}
            label={label}
            reducedMotion={reducedMotion}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={item} initial="hidden" animate="show" className="relative mt-12">
        <ChainTicker />
      </motion.div>
    </section>
  );
}
