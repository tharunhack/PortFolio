"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold text-paper">
          <span className="grid place-items-center w-7 h-7 rounded-sm border border-gold/60 text-gold text-xs font-mono">
            TK
          </span>
          <span className="hidden sm:inline text-sm text-muted font-mono">tharunhack</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Availability lives here so it stays true on every section, not just the hero. */}
          <span className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-teal">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-blink" aria-hidden="true" />
            available for work
          </span>
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 text-sm text-muted hover:text-paper transition-colors rounded-sm"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Reading position — continuity, not decoration. */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gold origin-left transition-transform duration-150"
        style={{ width: "100%", transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
