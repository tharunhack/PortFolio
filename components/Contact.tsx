import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "linkedin.com/in/tharun2002", href: profile.linkedin, icon: Linkedin },
  { label: "github.com/tharunhack", href: profile.github, icon: Github },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-28 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="font-mono text-xs text-goldDim">#0004 — next</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-semibold text-paper leading-tight">
            Have something worth building? Let&apos;s add the next block.
          </h2>
          <p className="mt-5 text-muted leading-relaxed max-w-lg">
            Open to full-stack and blockchain roles, contract work, or a good technical
            conversation. Based in Chennai, happy to work remote.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-gold text-ink font-medium text-sm hover:bg-gold/90 transition-colors"
          >
            Email me
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-sm border border-line px-4 py-3.5 text-sm text-muted hover:text-paper hover:border-mutedDark transition-colors"
            >
              <l.icon size={16} className="shrink-0" />
              <span className="truncate">{l.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-20 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-xs text-mutedDark">
          {profile.name} — {profile.title}
        </p>
        <p className="font-mono text-xs text-mutedDark">Chennai, India</p>
      </div>
    </section>
  );
}
