import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="work" className="px-6 md:px-10 py-24 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">
            Three jobs, one chain of custody
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Each role picked up where the last one left off — from contracts, to a private
            network, to the exchange running on top of both.
          </p>
        </div>

        <ol className="relative">
          {experience.map((e, i) => (
            <li key={e.height} className="relative pl-10 md:pl-14 pb-14 last:pb-0">
              {/* connecting rail */}
              {i !== experience.length - 1 && (
                <span
                  className="absolute left-[7px] md:left-[11px] top-3 bottom-0 w-px bg-line"
                  aria-hidden="true"
                />
              )}
              <span
                className="absolute left-0 md:left-1 top-1 w-[15px] h-[15px] rounded-full border-2 border-gold bg-ink"
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <span className="font-mono text-xs text-goldDim">{e.height}</span>
                <span className="font-mono text-xs text-mutedDark">{e.period}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-paper">
                {e.role} <span className="text-muted font-normal">— {e.org}</span>
              </h3>
              {e.context && <p className="mt-1 text-sm text-teal/90">{e.context}</p>}

              <ul className="mt-4 space-y-2.5 max-w-2xl">
                {e.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-3 text-[15px] text-muted leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-line shrink-0" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
