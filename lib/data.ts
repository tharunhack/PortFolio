export const profile = {
  name: "Tharun K",
  title: "Full Stack Blockchain Developer",
  location: "Chennai, India",
  email: "tharunk2002@gmail.com",
  phone: "+91 93827 57576",
  linkedin: "https://linkedin.com/in/tharun2002",
  github: "https://github.com/tharunhack",
  summary:
    "I build decentralized applications end to end — smart contracts, the APIs that sit behind them, and the interfaces people actually click on. Three years in, across gas-sponsorship dashboards, a private-chain supply network, and a live crypto exchange.",
};

export const stats = [
  { value: "3+", label: "years shipping production dApps" },
  { value: "5", label: "chains worked on: EVM, Aptos, Supra, Solana, Fabric" },
  { value: "20+", label: "public repos, from contracts to trading bots" },
];

export const skillGroups = [
  {
    label: "Blockchain",
    items: [
      "Solidity",
      "ERC-20 / 721 / 1155",
      "Web3.js",
      "Ethers.js",
      "Hardhat",
      "OpenZeppelin",
      "Hyperledger Fabric",
      "Aptos SDK",
      "Supra SDK",
      "Solana SDK",
      "IPFS",
    ],
  },
  {
    label: "Systems & languages",
    items: ["Rust", "TypeScript", "JavaScript (ES6+)", "Python"],
  },
  {
    label: "AI & agentic systems",
    items: [
      "Agentic AI",
      "LLM-based agents",
      "Prompt engineering",
      "Tool / function calling",
      "RAG pipelines",
    ],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "MetaMask wallet integration"],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Fastify",
      "NestJS",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Redis",
    ],
  },
  {
    label: "Data & infra",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "CouchDB",
      "Prisma / TypeORM",
      "AWS (EC2, S3)",
      "Docker",
      "Kubernetes",
    ],
  },
];

export type Experience = {
  height: string; // block height, purely decorative but themed
  role: string;
  org: string;
  context?: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    height: "#0003",
    role: "Full Stack Engineer",
    org: "Pibase",
    context: "UnicoinDCX & Zebacus — crypto exchange / Web3 platforms",
    period: "Jul 2025 — Present",
    bullets: [
      "Build and maintain the digital-asset vault behind Piwallet: creation, configuration, backup, and key management for custody",
      "Ship REST APIs for spot and futures order placement, wallet balances, P&L calculation, and live market price feeds",
      "Pair with the Next.js frontend team on real-time dashboards for exchange operations",
      "Built KYC-aware authentication, transaction history, and the push / email / in-app notification pipeline",
    ],
  },
  {
    height: "#0002",
    role: "Blockchain Developer",
    org: "GS1 India",
    period: "Apr 2025 — Jul 2025",
    bullets: [
      "Architected and deployed a private Hyperledger Fabric network with org-based access control via Fabric MSP",
      "Implemented private data collections and a CouchDB-backed queryable ledger for product lifecycle tracking",
      "Combined on-chain document hashing with off-chain file storage",
      "Built REST APIs bridging blockchain data to the frontend, working cross-functionally end to end",
    ],
  },
  {
    height: "#0001",
    role: "Software Developer",
    org: "Tradala Trade Solutions (Kana Labs)",
    period: "Nov 2022 — Apr 2025",
    bullets: [
      "Developed and deployed ERC-20 / 721 / 1155 smart contracts with Solidity and OpenZeppelin",
      "Built Aptos Paymaster, a gas-sponsorship dashboard for Aptos, full backend and frontend — live at aptos-paymaster.kanalabs.io",
      "Replicated the sponsorship architecture as Supra Paymaster for the Supra ecosystem",
      "Built full-stack dApps with React, Next.js, and Ethers.js, with MetaMask auth and IPFS storage",
      "Built scalable REST APIs with Fastify behind real-time blockchain-backed UI components",
    ],
  },
];

export type ShippedProject = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  link?: { label: string; url: string };
};

// Production work — proprietary, no public repo, but real and live/shipped.
export const shippedProjects: ShippedProject[] = [
  {
    name: "Aptos Paymaster & Supra Paymaster",
    tagline: "Gas-sponsorship dashboards",
    description:
      "Fee-payer infrastructure so users can transact without holding gas tokens. Native SDK integration, sponsorship logic, and a dashboard for issuers to fund and monitor fee accounts — built for Aptos, then re-architected for Supra.",
    tags: ["Aptos SDK", "Supra SDK", "Next.js", "Fastify"],
    link: { label: "aptos-paymaster.kanalabs.io", url: "https://aptos-paymaster.kanalabs.io" },
  },
  {
    name: "Piwallet",
    tagline: "Digital asset vault & custody platform",
    description:
      "Vault creation and management, address management, transaction handling, and backup / recovery, all built around secure key-management protocols for institutional custody.",
    tags: ["Node.js", "Key management", "PostgreSQL"],
  },
  {
    name: "UnicoinDCX & Zebacus",
    tagline: "Crypto exchange platforms",
    description:
      "Spot and futures order APIs, wallet balance tracking, a P&L engine, market price feeds, KYC-aware auth, transaction history, and real-time notifications behind live exchange dashboards.",
    tags: ["Fastify", "WebSockets", "Redis", "Next.js"],
  },
];

export type GithubProject = {
  name: string;
  repo: string;
  description: string;
  lang: string;
};

// Personal / open-source work, pulled from github.com/tharunhack
export const githubProjects: GithubProject[] = [
  {
    name: "Mini-Dex",
    repo: "Mini-Dex",
    description:
      "A minimal decentralized exchange — swap logic and liquidity handling built from scratch to understand what an AMM does under the hood.",
    lang: "TypeScript",
  },
  {
    name: "NFT Marketplace",
    repo: "NFT",
    description:
      "Smart-contract-based minting, buying, and selling with IPFS storage for assets and MetaMask for wallet auth and signing.",
    lang: "JavaScript",
  },
  {
    name: "Token Vesting dApp",
    repo: "Token-Vesting-dApp",
    description:
      "Linear and cliff-based token vesting schedules, with a contract that streams tokens to beneficiaries over time.",
    lang: "JavaScript",
  },
  {
    name: "Soulbound NFTs on Aptos",
    repo: "Aptos-batch-transfer-soulbound-nfts",
    description:
      "Batch transfer tooling for non-transferable, identity-bound tokens on Aptos — built against the Aptos SDK.",
    lang: "TypeScript",
  },
  {
    name: "Wallet Recovery Suite",
    repo: "wallet-recovery",
    description:
      "A wallet frontend, backend, and social-recovery flow split across three repos — recovering access without a single point of failure.",
    lang: "TypeScript",
  },
  {
    name: "E-Voting on Blockchain",
    repo: "e-voting-blockchain",
    description:
      "A voting system where ballots are cast as on-chain transactions — tamper-evident by construction, not by policy.",
    lang: "JavaScript",
  },
  {
    name: "DefiLlama Server",
    repo: "defillama-server",
    description: "Server-side work on DefiLlama's data pipeline for tracking protocol TVL.",
    lang: "TypeScript",
  },
  {
    name: "Kana Gaming Contract",
    repo: "kana-gaming-contract",
    description: "Solidity contracts powering on-chain game logic and asset ownership for Kana Labs.",
    lang: "Solidity",
  },
];

export const education = [
  {
    degree: "B.Tech, Information Technology",
    school: "S.A. Engineering College, Thiruverkadu, Chennai",
    period: "2019 — 2023",
    detail: "CGPA 8.2 / 10",
  },
];

// Drives both the hero's 3D ledger and the marquee ticker — every block in the
// chain is a real piece of shipped work, not filler.
export const ledgerFeed = [
  "Piwallet — key management",
  "UnicoinDCX — order API",
  "Aptos Paymaster shipped",
  "Fabric MSP access control",
  "Supra Paymaster shipped",
  "ERC-1155 contract deployed",
  "Mini-Dex swap logic",
  "Soulbound NFT batch transfer",
];

export const GENESIS_HEIGHT = 731;

// Blocks held in the hero's visible chain. The scene and the text readout both
// derive block heights from this, so the number on a cube's face always matches
// the number in the panel beside it.
export const CHAIN_DEPTH = 8;
