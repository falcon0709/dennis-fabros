import { motion } from "framer-motion";
import { useEffect } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";
import { Icon } from "@iconify/react";
import "../assets/css/home.css";

type TechItem =
  | { label: string; stackIcon: IconName }
  | { label: string; iconify: string; iconClassName?: string };

// Entries with `iconify` have no equivalent in tech-stack-icons.
const TECH_STACK: TechItem[] = [
  { label: "PHP", stackIcon: "php" },
  { label: "Python", stackIcon: "python" },
  { label: "Node.js", stackIcon: "nodejs" },
  { label: "Golang", stackIcon: "go" },
  { label: "Laravel", stackIcon: "laravel" },
  { label: "Django", stackIcon: "django" },
  { label: "Flask", stackIcon: "flask" },
  { label: "C++", iconify: "logos:c-plusplus" },
  { label: "C#", stackIcon: "csharp" },
  { label: "ASP.NET", stackIcon: "net" },
  { label: ".NET Core", stackIcon: "netcore" },
  { label: "Java", stackIcon: "java" },
  { label: "React", stackIcon: "react" },
  { label: "Angular", stackIcon: "angular" },
  { label: "Vue.js", stackIcon: "vuejs" },
  { label: "Next.js", stackIcon: "nextjs2" },
  { label: "TypeScript", stackIcon: "typescript" },
  { label: "Tailwind CSS", stackIcon: "tailwindcss" },
  { label: "Nuxt.js", stackIcon: "nuxtjs" },
  { label: "Webflow", stackIcon: "webflow" },
  { label: "Electron", stackIcon: "electron" },
  { label: "React Native", stackIcon: "reactnative" },
  { label: "Flutter", stackIcon: "flutter" },
  { label: "Swift", stackIcon: "swift" },
  { label: "Kotlin", stackIcon: "kotlin" },
  { label: "Firebase", stackIcon: "firebase" },
  { label: "PostgreSQL", stackIcon: "postgresql" },
  { label: "MongoDB", stackIcon: "mongodb" },
  { label: "MySQL", stackIcon: "mysql" },
  { label: "AWS", stackIcon: "aws" },
  { label: "CI/CD", iconify: "logos:github-actions" },
  { label: "REST APIs", stackIcon: "openapi" },
  { label: "GraphQL", stackIcon: "graphql" },
  { label: "Solidity", stackIcon: "solidity" },
  { label: "Web3.js", stackIcon: "web3js" },
  { label: "Polygon", stackIcon: "polygon" },
  { label: "Market Data APIs", iconify: "mdi:chart-line", iconClassName: "text-emerald-400" },
  { label: "WebSockets", iconify: "logos:websocket", iconClassName: "invert" },
  { label: "Pandas", stackIcon: "pandas" },
  { label: "NumPy", stackIcon: "numpy" },
  { label: "Machine Learning", stackIcon: "tensorflow" },
  { label: "LLM Integration", stackIcon: "openai" },
];


const HeroSection = () => {
  useEffect(() => {
    // Initialize ripples effect after component mounts
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      const element = $('.full-landing-image');
      
      if (element.length > 0 && typeof element.ripples === 'function') {
        element.ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      }
    }
  }, []);
  return (
    <>
      <section
        id="home"
        className="min-h-screen bg-foreground text-primary-foreground relative overflow-hidden flex items-center full-landing-image"
      >
        {/* Geometric accent lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-primary-foreground/20" />
        <div className="absolute bottom-1/3 right-0 w-48 h-px bg-primary-foreground/20" />
        <div className="absolute top-0 right-1/4 w-px h-32 bg-primary-foreground/20" />

        <div className="section-padding w-full py-32">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center" style={{ maxWidth: "90rem" }}>
     
            {/* Left: name + about */}
            <div>
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60">
                  Full Stack Developer • 8 Years Experience
                </span>
              </motion.div>

              <div className="relative">
                <motion.h1
                  className="font-display text-[22vw] md:text-[14vw] lg:text-[min(9vw,9rem)] leading-[0.85] tracking-tight"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  DENNIS
                </motion.h1>
                <motion.h1
                  className="font-display text-[22vw] md:text-[14vw] lg:text-[min(9vw,9rem)] leading-[0.85] tracking-tight text-stroke-thin"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{
                    WebkitTextStroke: "1px hsl(0 0% 100%)",
                    color: "transparent",
                  }}
                >
                  FABROS
                </motion.h1>
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-4">
                  About Me
                </h2>
                <p className="font-body text-base md:text-lg max-w-lg text-primary-foreground/80 leading-relaxed">
                  I'm a full stack developer with 8 years of experience building web, mobile, and
                  desktop products end to end — from scalable APIs and cloud infrastructure to polished
                  front-ends. I also work on Web3, real-time market data, and AI/LLM-powered applications.
                </p>
              </motion.div>

              <motion.div
                className="mt-10 flex items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <a
                  href="/resume.pdf"
                  download
                  className="font-body text-sm tracking-widest uppercase border border-primary-foreground px-8 py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
                >
                  Resume
                </a>
                <a
                  href="#projects"
                  className="font-body text-sm tracking-widest uppercase link-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Work
                </a>
              </motion.div>
            </div>

            {/* Right: tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ul className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                {TECH_STACK.map((tech, i) => (
                  <motion.li
                    key={tech.label}
                    title={tech.label}
                    className="group flex flex-col items-center justify-start gap-2 p-2 pt-3 border border-primary-foreground/10 bg-primary-foreground/[0.03] hover:border-primary-foreground/40 hover:bg-primary-foreground/[0.08] transition-colors duration-300"
                    style={{ borderRadius: "20px" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.025 }}
                  >
             
                    <span className="w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {"stackIcon" in tech ? (
                        <StackIcon name={tech.stackIcon} variant="dark" className="w-16 h-16 block" />
                      ) : (
                        <Icon icon={tech.iconify} className={`w-16 h-16 ${tech.iconClassName ?? ""}`} />
                      )}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="font-body text-xs tracking-widest uppercase text-primary-foreground/60">
            Scroll
          </span>
          <motion.div
            className="w-px h-12 bg-primary-foreground/40"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
