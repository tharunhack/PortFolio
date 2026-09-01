import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-10 py-24 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">The stack</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Six categories, kept current — the tools I reach for most on any given week.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <h3 className="font-display text-sm font-semibold text-gold pb-3 mb-4 border-b border-line">
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
    </section>
  );
}
