import type { IconName } from "tech-stack-icons";

export type TechIconSource =
  | { stackIcon: IconName }
  | { iconify: string; iconClassName?: string };

// Entries with `iconify` are missing from tech-stack-icons or unreadable on a dark background.
export const TECH_ICONS = {
  PHP: { stackIcon: "php" },
  Python: { stackIcon: "python" },
  "Node.js": { stackIcon: "nodejs" },
  Golang: { stackIcon: "go" },
  Laravel: { stackIcon: "laravel" },
  Django: { stackIcon: "django" },
  Flask: { stackIcon: "flask" },
  "C++": { iconify: "logos:c-plusplus" },
  "C#": { stackIcon: "csharp" },
  "ASP.NET": { stackIcon: "net" },
  ".NET Core": { stackIcon: "netcore" },
  Java: { stackIcon: "java" },
  React: { stackIcon: "react" },
  Angular: { stackIcon: "angular" },
  "Vue.js": { stackIcon: "vuejs" },
  "Next.js": { stackIcon: "nextjs2" },
  TypeScript: { stackIcon: "typescript" },
  "Tailwind CSS": { stackIcon: "tailwindcss" },
  "Nuxt.js": { stackIcon: "nuxtjs" },
  Webflow: { stackIcon: "webflow" },
  Electron: { stackIcon: "electron" },
  "React Native": { stackIcon: "reactnative" },
  Flutter: { stackIcon: "flutter" },
  Swift: { stackIcon: "swift" },
  Kotlin: { stackIcon: "kotlin" },
  Firebase: { stackIcon: "firebase" },
  PostgreSQL: { stackIcon: "postgresql" },
  MongoDB: { stackIcon: "mongodb" },
  MySQL: { iconify: "simple-icons:mysql", iconClassName: "text-sky-300" },
  SQLite: { stackIcon: "sqlite" },
  AWS: { stackIcon: "aws" },
  "CI/CD": { iconify: "logos:github-actions" },
  "REST APIs": { stackIcon: "openapi" },
  GraphQL: { stackIcon: "graphql" },
  Solidity: { stackIcon: "solidity" },
  "Web3.js": { stackIcon: "web3js" },
  Polygon: { stackIcon: "polygon" },
  IPFS: { iconify: "simple-icons:ipfs", iconClassName: "text-teal-300" },
  "Market Data APIs": { iconify: "mdi:chart-line", iconClassName: "text-emerald-400" },
  WebSockets: { iconify: "logos:websocket", iconClassName: "invert" },
  MQTT: { iconify: "simple-icons:mqtt", iconClassName: "text-fuchsia-300" },
  Pandas: { stackIcon: "pandas" },
  NumPy: { stackIcon: "numpy" },
  "Machine Learning": { stackIcon: "tensorflow" },
  "LLM Integration": { stackIcon: "openai" },
  Stripe: { stackIcon: "stripe" },
  Redux: { stackIcon: "redux" },
  "Three.js": { stackIcon: "threejs" },
  "Discord.js": { iconify: "simple-icons:discorddotjs", iconClassName: "text-indigo-300" },
} satisfies Record<string, TechIconSource>;

export type TechName = keyof typeof TECH_ICONS;

export const HERO_STACK: TechName[] = [
  "PHP", "Python", "Node.js", "Golang", "Laravel", "Django", "Flask", "C++", "C#", "ASP.NET",
  ".NET Core", "Java", "React", "Angular", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS",
  "Nuxt.js", "Webflow", "Electron", "React Native", "Flutter", "Swift", "Kotlin", "Firebase",
  "PostgreSQL", "MongoDB", "MySQL", "AWS", "CI/CD", "REST APIs", "GraphQL", "Solidity", "Web3.js",
  "Polygon", "Market Data APIs", "WebSockets", "Pandas", "NumPy", "Machine Learning", "LLM Integration",
];
