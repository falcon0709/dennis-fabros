import type { TechName } from "@/data/techStack";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  tech: TechName[];
  /** The first image is used as the cover. */
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

export const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    category: "Full Stack Web",
    description:
      "A scalable e-commerce solution with payment gateway integration, inventory management, and real-time analytics for merchants running thousands of SKUs.",
    challenge:
      "The client's legacy storefront slowed to a crawl during seasonal sales, inventory drifted out of sync between the warehouse and the website, and checkout abandonment was climbing because payments failed silently under load.",
    solution:
      "I rebuilt the platform as a React storefront backed by a Node.js API and PostgreSQL, with Stripe handling payments through idempotent webhooks. Inventory is reserved transactionally at checkout, and a real-time analytics dashboard surfaces conversion, stock levels, and revenue as they happen.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    images: [
      unsplash("photo-1556742049-0cfed4f6a45d"),
      unsplash("photo-1556740749-887f6717d7e4"),
      unsplash("photo-1472851294608-062f824d29cc"),
    ],
  },
  {
    slug: "sneaker-bot-dashboard",
    title: "Sneaker Bot Dashboard",
    category: "Bots & Automation",
    description:
      "High-performance desktop dashboard for managing sneaker bots with real-time monitoring, task scheduling, and proxy management.",
    challenge:
      "Power users were juggling hundreds of concurrent tasks across scripts and spreadsheets, with no visibility into which proxies were burned or which tasks had silently stalled during a release drop.",
    solution:
      "I built an Electron app with a React interface that orchestrates tasks from a Node.js worker pool, rotates and health-checks proxies automatically, and pushes checkout results to Discord in real time through a Discord.js bot.",
    tech: ["Electron", "React", "Node.js", "Discord.js"],
    images: [
      unsplash("photo-1542291026-7eec264c27ff"),
      unsplash("photo-1595950653106-6c9ebd614d3a"),
      unsplash("photo-1600185365483-26d7a4cc7519"),
    ],
  },
  {
    slug: "nft-marketplace",
    title: "NFT Marketplace",
    category: "Web3 / Blockchain",
    description:
      "Decentralized NFT platform with wallet integration, minting capabilities, and timed auction functionality.",
    challenge:
      "Creators needed a marketplace that kept gas costs predictable, stored artwork permanently rather than on a centralized server, and made wallet onboarding painless for collectors new to Web3.",
    solution:
      "I wrote gas-optimized Solidity contracts for lazy minting and English auctions, pinned media and metadata to IPFS, and built a Next.js front end with Web3.js that guides users through wallet connection and transaction states.",
    tech: ["Next.js", "Solidity", "Web3.js", "IPFS"],
    images: [
      unsplash("photo-1639762681485-074b7f938ba0"),
      unsplash("photo-1620321023374-d1a68fbc720d"),
      unsplash("photo-1642104704074-907c0698cbd9"),
    ],
  },
  {
    slug: "mobile-fitness-app",
    title: "Mobile Fitness App",
    category: "Mobile Apps",
    description:
      "Cross-platform fitness application with workout tracking, nutrition logging, and social features.",
    challenge:
      "Users train in gyms with patchy connectivity, so logging a set could not depend on the network, yet progress still had to sync reliably across devices and with friends.",
    solution:
      "I built an offline-first React Native app with Redux-managed local state that syncs to Firebase when connectivity returns, backed by a Node.js service for social feeds, challenges, and push notifications.",
    tech: ["React Native", "Firebase", "Redux", "Node.js"],
    images: [
      unsplash("photo-1517836357463-d25dfeac3438"),
      unsplash("photo-1571019613454-1cb2f99b2d8b"),
      unsplash("photo-1534438327276-14e5300c3a48"),
    ],
  },
  {
    slug: "resume-ai",
    title: "Resume AI",
    category: "AI / Machine Learning",
    description: "AI-powered resume screening system using NLP for skill matching and candidate scoring.",
    challenge:
      "Recruiters were manually reading hundreds of resumes per opening, and keyword filters rejected qualified candidates who described the same skills in different words.",
    solution:
      "I built a Django service with an NLP pipeline that extracts skills and experience, matches them semantically against the job description, and produces an explainable score. Results are stored in PostgreSQL and reviewed in a Tailwind CSS dashboard.",
    tech: ["Python", "Django", "PostgreSQL", "Tailwind CSS"],
    images: [
      unsplash("photo-1586281380349-632531db7ed4"),
      unsplash("photo-1454165804606-c3d57bc86b40"),
      unsplash("photo-1573496359142-b8d87734a5a2"),
    ],
  },
  {
    slug: "stockdesk",
    title: "StockDesk",
    category: "Full Stack Web",
    description: "Real-time stock trading dashboard with automated bot strategies and interactive charting.",
    challenge:
      "Traders needed sub-second price updates and strategy execution, but polling REST endpoints introduced lag and rate-limit failures exactly when the market was most volatile.",
    solution:
      "I streamed market data over WebSockets into a Node.js engine that evaluates bot strategies in real time, persisted trades and backtests in MongoDB, and built a React dashboard with live charts and one-click strategy controls.",
    tech: ["React", "Node.js", "MongoDB", "WebSockets"],
    images: [
      unsplash("photo-1611974789855-9c2a0a7236a3"),
      unsplash("photo-1590283603385-17ffb3a7f29f"),
      unsplash("photo-1642790106117-e829e14a795f"),
    ],
  },
  {
    slug: "ticketflow",
    title: "TicketFlow",
    category: "Full Stack Web",
    description: "Secure event ticketing platform with QR validation and payment support.",
    challenge:
      "Event organizers were losing revenue to counterfeit and duplicated tickets, and their door staff needed to validate thousands of attendees quickly, sometimes without reliable internet.",
    solution:
      "I built a Laravel and MySQL platform that issues signed, single-use QR tickets, takes payments through Stripe, and ships a React scanner app that validates tickets offline and reconciles entries once it reconnects.",
    tech: ["Laravel", "MySQL", "React", "Stripe"],
    images: [
      unsplash("photo-1540575467063-178a50c2df87"),
      unsplash("photo-1492684223066-81342ee5ff30"),
      unsplash("photo-1501281668745-f7f57925c3b4"),
    ],
  },
  {
    slug: "smarthome",
    title: "SmartHome",
    category: "IoT / Hardware",
    description: "IoT home automation controller with voice commands and scheduling features.",
    challenge:
      "Devices from different manufacturers each needed their own app, and cloud-dependent controls stopped working whenever the home internet connection dropped.",
    solution:
      "I unified device control behind a Node.js hub that speaks MQTT on the local network, so automations keep running offline. A Flutter app provides voice commands, schedules, and scenes, with Firebase handling authentication and remote access.",
    tech: ["Flutter", "Firebase", "Node.js", "MQTT"],
    images: [
      unsplash("photo-1558002038-1055907df827"),
      unsplash("photo-1585776245991-cf89dd7fc73a"),
      unsplash("photo-1551650975-87deedd944c3"),
    ],
  },
  {
    slug: "cryptotrack",
    title: "CryptoTrack",
    category: "Web3 / Blockchain",
    description: "Wallet-connected crypto dashboard with portfolio analytics, transaction history, and staking.",
    challenge:
      "Holders with assets spread across several wallets had no single view of their portfolio, and indexing on-chain history directly from the blockchain was too slow to feel interactive.",
    solution:
      "I built a type-safe Next.js app that connects wallets through Web3.js, indexes transactions into PostgreSQL in the background, and serves portfolio analytics and staking actions instantly from that index.",
    tech: ["Next.js", "TypeScript", "Web3.js", "PostgreSQL"],
    images: [
      unsplash("photo-1621761191319-c6fb62004040"),
      unsplash("photo-1518546305927-5a555bb7020d"),
      unsplash("photo-1610563166150-b34df4f3bcd6"),
    ],
  },
  {
    slug: "learnify",
    title: "Learnify",
    category: "Full Stack Web",
    description: "Online learning platform with courses, quizzes, video modules, and certificates.",
    challenge:
      "An education provider needed to move in-person courses online, track each learner's progress across video and quiz modules, and issue certificates that employers could verify.",
    solution:
      "I built a Laravel and MySQL back end that models courses, progress, and assessments, with a Vue.js front end for streaming lessons and taking quizzes. Certificates are generated automatically and carry a public verification link.",
    tech: ["Vue.js", "PHP", "Laravel", "MySQL"],
    images: [
      unsplash("photo-1501504905252-473c47e087f8"),
      unsplash("photo-1522202176988-66273c2fd55f"),
      unsplash("photo-1434030216411-0b793f4b4173"),
    ],
  },
  {
    slug: "chatwave",
    title: "ChatWave",
    category: "Mobile Apps",
    description: "Secure real-time chat app with end-to-end encryption and media sharing.",
    challenge:
      "The product had to deliver messages instantly on mobile networks while guaranteeing that not even the server operator could read conversations or shared media.",
    solution:
      "I implemented end-to-end encryption on the device in React Native, with a Node.js relay that only ever handles ciphertext over WebSockets. MongoDB stores encrypted message envelopes and delivery receipts for offline recipients.",
    tech: ["React Native", "Node.js", "WebSockets", "MongoDB"],
    images: [
      unsplash("photo-1577563908411-5077b6dc7624"),
      unsplash("photo-1611606063065-ee7946f0787a"),
      unsplash("photo-1516321318423-f06f85e504b3"),
    ],
  },
  {
    slug: "vaultx",
    title: "VaultX",
    category: "Desktop Software",
    description: "Encrypted password manager with offline mode, password generator, and sync options.",
    challenge:
      "Security-conscious users wanted a password manager that works fully offline and never sends plaintext secrets anywhere, without giving up sync between their machines.",
    solution:
      "I built an Electron app with a React interface and a Golang core that handles key derivation and encryption. Vaults live in an encrypted SQLite database, and optional sync only ever transmits encrypted blobs.",
    tech: ["Electron", "Golang", "SQLite", "React"],
    images: [
      unsplash("photo-1614064641938-3bbee52942c7"),
      unsplash("photo-1555949963-ff9fe0c870eb"),
      unsplash("photo-1550751827-4bd374c3f58b"),
    ],
  },
  {
    slug: "fitdash",
    title: "FitDash",
    category: "Data & Visualization",
    description: "Visual fitness dashboard with progress charts, stats, and goal tracking.",
    challenge:
      "Coaches were exporting client data from several wearables into spreadsheets, which made it slow to spot trends or show clients meaningful progress over time.",
    solution:
      "I built an Angular and TypeScript dashboard backed by a Node.js API that normalizes data from multiple wearable sources into MongoDB, then renders interactive progress charts and goal tracking per client.",
    tech: ["Angular", "TypeScript", "Node.js", "MongoDB"],
    images: [
      unsplash("photo-1551288049-bebda4e38f71"),
      unsplash("photo-1504868584819-f8e8b4b6d7e3"),
      unsplash("photo-1543286386-713bdd548da4"),
    ],
  },
  {
    slug: "customizer-3d",
    title: "Customizer 3D",
    category: "E-Commerce",
    description: "Interactive 3D product customizer with live pricing logic and checkout integration.",
    challenge:
      "Customers could not picture their customized products from static photos, which led to low conversion and costly returns when the delivered item did not match expectations.",
    solution:
      "I built a React and Three.js configurator that renders every material and option change in real time, calculates pricing on a Node.js service, and passes the exact configuration through to Stripe checkout.",
    tech: ["React", "Three.js", "Node.js", "Stripe"],
    images: [
      unsplash("photo-1618005182384-a83a8bd57fbe"),
      unsplash("photo-1617791160505-6f00504e3519"),
      unsplash("photo-1633409361618-c73427e4e206"),
    ],
  },
];

export const PROJECTS_PAGE_SIZE = 9;
export const PROJECTS_PAGE_PARAM = "page";

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug);

/** Home URL that opens the projects grid on the page containing `slug`. */
export const projectsListPath = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  const page = Math.floor(Math.max(index, 0) / PROJECTS_PAGE_SIZE) + 1;
  return page > 1 ? `/?${PROJECTS_PAGE_PARAM}=${page}#projects` : "/#projects";
};

/** Previous/next wrap around so every project has both neighbours. */
export const getAdjacentProjects = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
};

const UNSPLASH_HOST = "images.unsplash.com";
const RESPONSIVE_WIDTHS = [640, 960, 1280, 1920];

/** Builds `src`/`srcSet` for Unsplash URLs; other sources are returned unchanged. */
export const responsiveImage = (src: string, defaultWidth = 1280) => {
  if (!src.includes(UNSPLASH_HOST)) return { src };

  const withWidth = (width: number) => {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    return url.toString();
  };

  return {
    src: withWidth(defaultWidth),
    srcSet: RESPONSIVE_WIDTHS.map((width) => `${withWidth(width)} ${width}w`).join(", "),
  };
};
