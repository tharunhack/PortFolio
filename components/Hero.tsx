"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile, stats } from "@/lib/data";
import ChainTicker from "./ChainTicker";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-16 px-6 md:px-10">
      {/* subtle schematic grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:56px_56px] opacity-[0.35]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={item} className="flex items-center gap-2 mb-6 font-mono text-xs text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-blink" aria-hidden="true" />
          available for new work
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display font-semibold text-paper leading-[1.04] text-4xl sm:text-5xl md:text-6xl max-w-3xl"
        >
          Tharun K writes the contracts, the APIs, and the interface around them.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
          {profile.summary}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-gold text-ink font-medium text-sm hover:bg-gold/90 transition-colors"
          >
            See the work
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-line text-paper font-medium text-sm hover:border-mutedDark transition-colors"
          >
            <Mail size={16} />
            Get in touch
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-semibold text-paper">{s.value}</div>
              <div className="mt-1 text-sm text-muted leading-snug">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="mt-14"
      >
        <ChainTicker />
      </motion.div>
    </section>
  );
}
