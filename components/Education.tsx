import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="px-6 md:px-10 py-24 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">Education</h2>
        </div>

        {/* Auto-fit so a single entry sits at a readable width instead of being
            stranded in a third of the row. */}
        <div className="grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(16rem,22rem))]">
          {education.map((ed) => (
            <div key={ed.degree} className="border-t border-line pt-5">
              <span className="font-mono text-xs text-mutedDark">{ed.period}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-paper leading-snug">
                {ed.degree}
              </h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">{ed.school}</p>
              <p className="mt-2 text-sm text-teal/90">{ed.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
