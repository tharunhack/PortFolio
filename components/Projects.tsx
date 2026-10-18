import { ArrowUpRight, Github } from "lucide-react";
import { shippedProjects, githubProjects, profile } from "@/lib/data";
import { pseudoHash } from "@/lib/hash";
import TiltCard from "./TiltCard";

const langColor: Record<string, string> = {
  TypeScript: "#3fa9f5",
  JavaScript: "#e8c547",
  Solidity: "#b993e8",
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-10 py-24 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">
            Shipped &amp; live
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Production systems currently handling real users, real balances, and real gas fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {shippedProjects.map((p) => (
            <TiltCard
              key={p.name}
              className="group flex flex-col rounded-sm border border-line bg-panel/50 p-6 hover:border-goldDim"
            >
              <span className="font-mono text-[11px] text-mutedDark">{pseudoHash(p.name, 6)}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">{p.name}</h3>
              <p className="mt-1 text-sm text-teal/90">{p.tagline}</p>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-sm border border-line text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-5 inline-flex items-center gap-1.5 text-sm text-gold transition-colors hover:text-gold/80"
                >
                  {p.link.label}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </TiltCard>
          ))}
        </div>

        <div className="max-w-xl mt-24 mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-paper">
            Open source &amp; experiments
          </h3>
          <p className="mt-4 text-muted leading-relaxed">
            What I build on my own time, all public on{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-line underline-offset-4 hover:decoration-gold"
            >
              github.com/tharunhack
            </a>
            .
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {githubProjects.map((p) => (
            <TiltCard
              key={p.repo}
              as="a"
              maxTilt={5}
              href={`${profile.github}/${p.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-sm border border-line p-5 hover:border-mutedDark hover:bg-panel/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display font-semibold text-paper text-[15px]">{p.name}</h4>
                <Github
                  size={16}
                  className="shrink-0 mt-0.5 text-mutedDark transition-colors group-hover:text-paper"
                />
              </div>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{p.description}</p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-mutedDark">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langColor[p.lang] ?? "#8C93A8" }}
                  aria-hidden="true"
                />
                {p.lang}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
