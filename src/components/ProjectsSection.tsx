import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { PROJECTS_PAGE_PARAM, PROJECTS_PAGE_SIZE, projects, responsiveImage } from "@/data/projects";
import { cn } from "@/lib/utils";
import "../assets/css/project.css"

const pageCount = Math.ceil(projects.length / PROJECTS_PAGE_SIZE);

const buttonBase =
  "inline-flex items-center justify-center gap-2 px-3 py-3 whitespace-nowrap font-body text-xs tracking-widest uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white";

type ReadMeButtonProps = {
  to: string;
  title: string;
  style?: CSSProperties;
};

const ReadMeButton = ({ to, title, style }: ReadMeButtonProps) => (
  <Link
    to={to}
    aria-label={`Read more about ${title}`}
    className={buttonBase}
    style={{ color: "grey", cursor: "pointer", backgroundColor: "transparent", ...style }}
  >
    <ExternalLink className="w-3.5 h-3.5" aria-hidden />
    Read Me
  </Link>
);

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedPage = Number(searchParams.get(PROJECTS_PAGE_PARAM)) || 1;
  const page = Math.min(Math.max(requestedPage, 1), pageCount) - 1;
  const visibleProjects = projects.slice(page * PROJECTS_PAGE_SIZE, (page + 1) * PROJECTS_PAGE_SIZE);

  const goToPage = (next: number) => {
    setSearchParams(
      (params) => {
        if (next === 0) params.delete(PROJECTS_PAGE_PARAM);
        else params.set(PROJECTS_PAGE_PARAM, String(next + 1));
        return params;
      },
      { replace: true, preventScrollReset: true },
    );
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" className="bg-black text-white relative min-h-screen bg-foreground text-primary-foreground relative overflow-hidden flex items-center full-landing-image">
      <div className="section-padding w-full py-24 md:py-32">
        <div className="mx-auto scroll-mt-24" ref={ref} style={{ maxWidth: "90rem" }}>
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
            <motion.ul
              key={page}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {visibleProjects.map((project, index) => {
                const detailPath = `/projects/${project.slug}`;
                const cover = responsiveImage(project.images[0], 960);

                return (
                  <motion.li
                    key={project.slug}
                    className="group flex flex-col border border-white/10 bg-white/[0.03] hover:border-white/30 transition-colors duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
                  >
                    <Link
                      to={detailPath}
                      aria-label={`Read more about ${project.title}`}
                      className="relative block aspect-[4/3] overflow-hidden bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white"
                    >
                      <img
                        src={cover.src}
                        srcSet={cover.srcSet}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
                        <span className="w-16 h-16 inline-flex items-center justify-center rounded-full border border-white/60 text-white scale-75 group-hover:scale-100 group-focus-within:scale-100 transition-transform duration-500">
                          <ExternalLink className="w-15.5 h-15.5" aria-hidden />
                        </span>
                      </div>
                    </Link>

                    <div className="grid grid-cols-1 gap-3 p-2 lg:hidden">
                      <ReadMeButton
                        to={detailPath}
                        title={project.title}
                        style={{
                          border: "1px solid grey",
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          color: "white"
                        }}
                      />
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
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
                  aria-label={`Page ${i + 1}`}
                  className={cn(
                    "w-10 h-10 font-body text-sm border transition-colors",
                    i === page ? "bg-white text-black border-white" : "border-white/20 hover:border-white",
                  )}
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
      </div>
    </section>
  );
};

export default ProjectsSection;
