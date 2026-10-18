import { GENESIS_HEIGHT, ledgerFeed } from "@/lib/data";
import { pseudoHash } from "@/lib/hash";

function Block({ height, label }: { height: string; label: string }) {
  return (
    <div className="flex items-center gap-3 shrink-0 px-5 py-3 mx-2 rounded-sm border border-line bg-panel/60">
      <span className="font-mono text-xs text-goldDim tabular-nums">#{height}</span>
      <span className="w-1 h-1 rounded-full bg-teal/70" aria-hidden="true" />
      <span className="text-sm text-muted whitespace-nowrap">{label}</span>
      <span className="font-mono text-[11px] text-mutedDark whitespace-nowrap hidden md:inline">
        {pseudoHash(label)}
      </span>
    </div>
  );
}

export default function ChainTicker() {
  const feed = ledgerFeed.map((label, i) => ({
    label,
    height: String(GENESIS_HEIGHT - i).padStart(7, "0"),
  }));
  const doubled = [...feed, ...feed];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-line py-3"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
      aria-label="Recent activity ticker"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {doubled.map((b, i) => (
          <Block key={i} height={b.height} label={b.label} />
        ))}
      </div>
    </div>
  );
}
