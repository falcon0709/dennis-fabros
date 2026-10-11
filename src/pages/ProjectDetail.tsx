import { useEffect, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Navigation from "@/components/Navigation";
import TechIcon from "@/components/TechIcon";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectNavigation from "@/components/project/ProjectNavigation";
import NotFound from "@/pages/NotFound";
import { getAdjacentProjects, getProjectBySlug, projects, projectsListPath } from "@/data/projects";
import { cn } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

const SectionLabel = ({ index, children }: { index: string; children: ReactNode }) => (
  <p className="flex items-center gap-4 font-body text-xs tracking-[0.3em] uppercase text-white/50">
    <span className="tabular-nums">{index}</span>
    <span className="h-px w-10 bg-white/30" aria-hidden />
    {children}
  </p>
);

const ExternalButton = ({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  primary?: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body text-xs tracking-widest uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white",
      primary
        ? "bg-white text-black hover:bg-white/80"
        : "border border-white/30 text-white hover:border-white hover:bg-white/10",
    )}
  >
    {icon}
    {label}
    <span className="sr-only">(opens in a new tab)</span>
  </a>
);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (!project) return;
    const previousTitle = document.title;
    document.title = `${project.title} — Dennis Fabros`;
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  if (!project) return <NotFound />;

  const { previous, next } = getAdjacentProjects(project.slug);
  const position = projects.indexOf(project) + 1;
  const backTo = projectsListPath(project.slug);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Keyed so entry animations replay when moving between projects. */}
      <article key={project.slug} className="section-padding pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="mx-auto" style={{ maxWidth: "90rem" }}>
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={backTo}
              className="group inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
              Back to projects
            </Link>

            <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-xs tracking-[0.3em] uppercase text-white/50">
              <span>{project.category}</span>
              <span className="tabular-nums">
                {pad(position)} / {pad(projects.length)}
              </span>
            </div>

            <h1 className="mt-4 font-display text-[16vw] sm:text-[12vw] lg:text-[min(9vw,9rem)] leading-[0.85] tracking-tight break-words">
              {project.title}
            </h1>

            <div className="mt-8 md:mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <p className="font-body text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl">
                {project.description}
              </p>

              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <ExternalButton
                      href={project.liveUrl}
                      label="Live site"
                      icon={<ExternalLink className="w-4 h-4" aria-hidden />}
                      primary
                    />
                  )}
                  {project.githubUrl && (
                    <ExternalButton
                      href={project.githubUrl}
                      label="Source code"
                      icon={<Github className="w-4 h-4" aria-hidden />}
                    />
                  )}
                </div>
              )}
            </div>
          </motion.header>

          {/* Gallery */}
          <motion.div
            className="mt-12 md:mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectGallery title={project.title} images={project.images} />
          </motion.div>

          {/* Challenge & solution */}
          <div className="mt-24 md:mt-32 grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-24">
            <motion.section {...reveal} aria-labelledby="project-challenge">
              <SectionLabel index="01">Challenge</SectionLabel>
              <h2 id="project-challenge" className="mt-6 font-display text-5xl md:text-6xl leading-none">
                The Problem
              </h2>
              <p className="mt-6 font-body text-base md:text-lg text-white/70 leading-relaxed">
                {project.challenge}
              </p>
            </motion.section>

            <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} aria-labelledby="project-solution">
              <SectionLabel index="02">Solution</SectionLabel>
              <h2 id="project-solution" className="mt-6 font-display text-5xl md:text-6xl leading-none">
                The Approach
              </h2>
              <p className="mt-6 font-body text-base md:text-lg text-white/70 leading-relaxed">
                {project.solution}
              </p>
            </motion.section>
          </div>

          {/* Technologies */}
          <motion.section {...reveal} className="mt-24 md:mt-32" aria-labelledby="project-tech">
            <SectionLabel index="03">Technologies</SectionLabel>
            <h2 id="project-tech" className="mt-6 font-display text-5xl md:text-6xl leading-none">
              Built With
            </h2>
            <ul
              className="mt-10 grid gap-3 md:gap-4"
              style={{
                gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
                display: "grid"
              }}
            >
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="group flex flex-col items-center justify-center gap-3 aspect-[5/4] transition-colors duration-300"
                >
                  <span className="w-15 h-15 md:w-[4.5rem] md:h-[4.5rem] transition-transform duration-300 group-hover:scale-110" aria-hidden>
                    <TechIcon name={tech} />
                  </span>
             
                  <span className="font-body text-xs tracking-widest uppercase text-white/70">{tech}</span>
                </li>
              ))}
            </ul>
       
          </motion.section>

          {/* Navigation */}
          <motion.div {...reveal} className="mt-24 md:mt-32 pt-12 border-t border-white/10">
            <ProjectNavigation previous={previous} next={next} backTo={backTo} />
          </motion.div>
        </div>
      </article>
    </main>
  );
};

export default ProjectDetail;
