import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import "../assets/css/project.css"

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack Web",
    description: "A scalable e-commerce solution with payment gateway integration, inventory management, and real-time analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: unsplash("photo-1556742049-0cfed4f6a45d"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 2,
    title: "Sneaker Bot Dashboard",
    category: "Bots & Automation",
    description: "High-performance dashboard for managing sneaker bots with real-time monitoring, task scheduling, and proxy management.",
    tech: ["Electron", "React", "Node.js", "Discord.js"],
    image: unsplash("photo-1542291026-7eec264c27ff"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 3,
    title: "NFT Marketplace",
    category: "Web3 / Blockchain",
    description: "Decentralized NFT platform with wallet integration, minting capabilities, and auction functionality.",
    tech: ["Next.js", "Solidity", "Web3.js", "IPFS"],
    image: unsplash("photo-1639762681485-074b7f938ba0"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    category: "Mobile Apps",
    description: "Cross-platform fitness application with workout tracking, nutrition logging, and social features.",
    tech: ["React Native", "Firebase", "Redux", "Node.js"],
    image: unsplash("photo-1517836357463-d25dfeac3438"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 5,
    title: "Resume AI",
    category: "AI / Machine Learning",
    description: "AI-powered resume screening system using NLP for skill matching and scoring.",
    tech: ["Python", "Django", "PostgreSQL", "Tailwind CSS"],
    image: unsplash("photo-1586281380349-632531db7ed4"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 6,
    title: "StockDesk",
    category: "Full Stack Web",
    description: "Real-time stock trading dashboard with automated bot strategies and charting.",
    tech: ["React", "Node.js", "MongoDB", "WebSockets"],
    image: unsplash("photo-1611974789855-9c2a0a7236a3"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 7,
    title: "TicketFlow",
    category: "Full Stack Web",
    description: "Secure event ticketing platform with QR validation and payment support.",
    tech: ["Laravel", "MySQL", "React", "Stripe"],
    image: unsplash("photo-1540575467063-178a50c2df87"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 8,
    title: "SmartHome",
    category: "IoT / Hardware",
    description: "IoT home automation controller with voice commands and scheduling features.",
    tech: ["Flutter", "Firebase", "Node.js", "MQTT"],
    image: unsplash("photo-1558002038-1055907df827"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 9,
    title: "CryptoTrack",
    category: "Web3 / Blockchain",
    description: "Wallet-connected crypto dashboard with analytics, history, and staking.",
    tech: ["Next.js", "TypeScript", "Web3.js", "PostgreSQL"],
    image: unsplash("photo-1621761191319-c6fb62004040"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 10,
    title: "Learnify",
    category: "Full Stack Web",
    description: "Online learning system with courses, quizzes, video modules, and certificates.",
    tech: ["Vue", "PHP", "Laravel", "MySQL"],
    image: unsplash("photo-1501504905252-473c47e087f8"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 11,
    title: "ChatWave",
    category: "Mobile Apps",
    description: "Secure real-time chat app with end-to-end encryption and media sharing.",
    tech: ["React Native", "Node.js", "WebSockets", "MongoDB"],
    image: unsplash("photo-1577563908411-5077b6dc7624"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 12,
    title: "VaultX",
    category: "Desktop Software",
    description: "Encrypted password manager with offline mode, generator, and sync options.",
    tech: ["Electron", "Golang", "SQLite", "React"],
    image: unsplash("photo-1614064641938-3bbee52942c7"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 13,
    title: "FitDash",
    category: "Data & Visualization",
    description: "Visual fitness dashboard with progress charts, stats, and goal tracking.",
    tech: ["Angular", "TypeScript", "Node.js", "MongoDB"],
    image: unsplash("photo-1551288049-bebda4e38f71"),
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 14,
    title: "Customizer 3D",
    category: "E-Commerce",
    description: "3D product customizer with pricing logic and checkout integration.",
    tech: ["React", "Three.js", "Node.js", "Stripe"],
    image: unsplash("photo-1618005182384-a83a8bd57fbe"),
    liveUrl: "",
    githubUrl: "",
  },
];

const PAGE_SIZE = 9;

type LinkButtonProps = {
  href?: string;
  label: string;
  icon: ReactNode;
  variant: "solid" | "outline";
};

const LinkButton = ({ href, label, icon, variant }: LinkButtonProps) => {
  const base =
    "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-body text-xs tracking-widest uppercase transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-white text-black hover:bg-white/80"
      : "border border-white/30 text-white hover:border-white hover:bg-white/10";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon"
        className={`${base} ${styles} opacity-40 cursor-not-allowed`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      {icon}
      {label}
    </a>
  );
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(projects.length / PAGE_SIZE);
  const visibleProjects = projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const goToPage = (next: number) => {
    setPage(next);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" className="py-32 bg-black text-white relative min-h-screen bg-foreground text-primary-foreground relative overflow-hidden flex items-center full-landing-image">
      <div className="section-padding max-w-7xl mx-auto scroll-mt-24" ref={ref}>
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-white/50">
              Selected Work
            </span>
            <h2 className="font-display text-6xl md:text-8xl mt-4 leading-none">
              PROJECTS
            </h2>
          </div>
          <p className="font-body text-white/60 max-w-sm mt-6 md:mt-0">
            A curated selection of projects showcasing technical expertise and creative solutions
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="group flex flex-col h-full border border-white/10 bg-white/[0.03] hover:border-white/30 transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
              >
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={`${project.title} cover`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/15">
                    {project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display text-3xl md:text-4xl leading-none">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed mt-3 line-clamp-2">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2 mt-5">
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="font-body text-[11px] px-2.5 py-1 border border-white/15 text-white/80"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3 mt-auto pt-6">
                    <LinkButton
                      href={project.liveUrl}
                      label="Live"
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                      variant="solid"
                    />
                    <LinkButton
                      href={project.githubUrl}
                      label="GitHub"
                      icon={<Github className="w-3.5 h-3.5" />}
                      variant="outline"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {pageCount > 1 && (
          <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Projects pagination">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="w-10 h-10 inline-flex items-center justify-center border border-white/20 hover:border-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-current={i === page ? "page" : undefined}
                className={`w-10 h-10 font-body text-sm border transition-colors ${
                  i === page ? "bg-white text-black border-white" : "border-white/20 hover:border-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === pageCount - 1}
              aria-label="Next page"
              className="w-10 h-10 inline-flex items-center justify-center border border-white/20 hover:border-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
