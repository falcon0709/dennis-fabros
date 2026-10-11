import { motion } from "framer-motion";
import { useEffect } from "react";
import TechIcon from "@/components/TechIcon";
import { HERO_STACK } from "@/data/techStack";
import "../assets/css/home.css";

type RipplesTarget = {
  length: number;
  ripples?: (options: Record<string, unknown> | "destroy") => void;
};

const HeroSection = () => {
  useEffect(() => {
    // jQuery and jquery.ripples are loaded from a CDN in index.html.
    const jQuery = (window as unknown as { jQuery?: (selector: string) => RipplesTarget }).jQuery;
    const element = jQuery?.(".full-landing-image");
    if (!element?.length || typeof element.ripples !== "function") return;

    element.ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
    });

    // Each instance holds a WebGL context; release it when navigating to another route.
    return () => element.ripples?.("destroy");
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

        <div className="section-padding w-full pt-28 pb-16 sm:pt-32 sm:pb-24 xl:py-32">
          <div className="mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center" style={{ maxWidth: "90rem" }}>
     
            {/* Left: name + about */}
            <div>
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary-foreground/60">
                  Full Stack Developer • 8 Years Experience
                </span>
              </motion.div>

              <div className="relative">
                <motion.h1
                  className="font-display text-[22vw] md:text-[min(14vw,10rem)] xl:text-[min(9vw,9rem)] leading-[0.85] tracking-tight"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  DENNIS
                </motion.h1>
                <motion.h1
                  className="font-display text-[22vw] md:text-[min(14vw,10rem)] xl:text-[min(9vw,9rem)] leading-[0.85] tracking-tight text-stroke-thin"
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
                className="mt-8 sm:mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary-foreground/60 mb-3 sm:mb-4">
                  About Me
                </h2>
                <p className="font-body text-base md:text-lg max-w-xl text-primary-foreground/80 leading-relaxed">
                  I'm a full stack developer with 8 years of experience building web, mobile, and
                  desktop products end to end — from scalable APIs and cloud infrastructure to polished
                  front-ends. I also work on Web3, real-time market data, and AI/LLM-powered applications.
                </p>
              </motion.div>

              <motion.div
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <a
                  href="/resume.pdf"
                  download
                  className="font-body text-xs sm:text-sm tracking-widest uppercase border border-primary-foreground px-6 py-3 sm:px-8 sm:py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
                >
                  Resume
                </a>
                <a
                  href="#projects"
                  className="font-body text-xs sm:text-sm tracking-widest uppercase link-underline"
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
              className="rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ul className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {HERO_STACK.map((tech, i) => (
                  <motion.li
                    key={tech}
                    title={tech}
                    className="group relative w-[clamp(3.25rem,2.5rem_+_2.2vw,4.75rem)] aspect-square flex items-center justify-center rounded-2xl bg-primary-foreground/[0.04]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.025 }}
                  >
                    <span className="w-[62%] h-[62%] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <TechIcon name={tech} />
                    </span>
                    <span className="sr-only">{tech}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden xl:flex flex-col items-center gap-2"
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
