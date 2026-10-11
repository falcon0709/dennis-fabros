import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { responsiveImage, type Project } from "@/data/projects";

type ProjectNavigationProps = {
  previous: Project;
  next: Project;
  backTo: string;
};

const AdjacentLink = ({ project, direction }: { project: Project; direction: "previous" | "next" }) => {
  const isNext = direction === "next";
  const thumb = responsiveImage(project.images[0], 640);

  return (
    <Link
      to={`/projects/${project.slug}`}
      rel={direction === "next" ? "next" : "prev"}
      className={cn(
        "group relative flex min-h-[9rem] md:min-h-[11rem] overflow-hidden border border-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white",
        isNext ? "justify-end text-right" : "justify-start text-left",
      )}
    >
      <img
        src={thumb.src}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

      <div className={cn("relative flex flex-col justify-end p-5 md:p-8", isNext && "items-end")}>
        <span className="inline-flex items-center gap-2 font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60">
          {!isNext && <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />}
          <span>
            {isNext ? "Next" : "Previous"}
            <span className="hidden sm:inline"> project</span>
          </span>
          {isNext && <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
        </span>
        <span className="mt-2 font-display text-2xl md:text-4xl leading-none">{project.title}</span>
      </div>
    </Link>
  );
};

const ProjectNavigation = ({ previous, next, backTo }: ProjectNavigationProps) => (
  <nav aria-label="Project navigation" className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4">
    <AdjacentLink project={previous} direction="previous" />

    <Link
      to={backTo}
      className="group col-span-2 md:col-span-1 order-first md:order-none flex md:flex-col items-center justify-center gap-3 px-6 py-4 md:px-10 border border-white/10 hover:border-white hover:bg-white hover:text-black transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
    >
      <LayoutGrid className="w-5 h-5" aria-hidden />
      <span className="font-body text-xs tracking-[0.3em] uppercase">All projects</span>
    </Link>

    <AdjacentLink project={next} direction="next" />
  </nav>
);

export default ProjectNavigation;
