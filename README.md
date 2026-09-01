# Tharun K — Portfolio

A Next.js 14 (App Router) portfolio built from your resume and your public GitHub
repos at github.com/tharunhack. Design concept: a blockchain "ledger" — the hero
has a live scrolling block ticker, and your work experience is laid out as a
chain of linked blocks (#0001 → #0003), each one picking up where the last left off.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Deploy

The fastest path is [Vercel](https://vercel.com/new) (made by the Next.js team):
push this folder to a GitHub repo, import it in Vercel, and it deploys on every push.
Netlify and Cloudflare Pages also support Next.js directly if you'd rather use those.

## Editing your content

Everything text-based lives in one place: **`lib/data.ts`**.

- `profile` — name, title, contact links, summary
- `stats` — the three hero numbers
- `skillGroups` — the stack section
- `experience` — your work history (shows up as the linked chain)
- `shippedProjects` — the 3 featured production case studies
- `githubProjects` — the open-source grid; each card links to
  `github.com/tharunhack/<repo>`, so if you rename or add a repo, update the
  `repo` field here to match
- `education` — the education row

No other file needs to change for a content update. Colors and type live in
`tailwind.config.ts`; the fonts (Space Grotesk / IBM Plex Sans / IBM Plex Mono)
are wired up in `app/layout.tsx`.

## Notes

- The block ticker and timeline numbering are a deliberate design device tied to
  the blockchain theme — not decoration for its own sake.
- Motion respects `prefers-reduced-motion`; the ticker and load-in animation
  turn off automatically for anyone with that OS setting on.
- `shippedProjects` (Aptos/Supra Paymaster, Piwallet, UnicoinDCX/Zebacus) are
  proprietary work, so they don't link to a repo — only a live link where one
  exists. `githubProjects` link straight to your public repos.
