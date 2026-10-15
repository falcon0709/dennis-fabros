import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { preloadImage } from "@/lib/preloadImage";
import { GALLERY_IMAGE_SIZES, responsiveImage, type Project } from "@/data/projects";

type Direction = "previous" | "next";

type ProjectNavigationProps = {
  previous: Project;
  next: Project;
  backTo: string;
  position: number;
  total: number;
};

const projectPath = (project: Project) => `/projects/${project.slug}`;
const pad = (value: number) => String(value).padStart(2, "0");

const focusRing =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/** Warms the cache for the first slide the destination gallery will render. */
const preloadCover = (project: Project) =>
  preloadImage({ ...responsiveImage(project.images[0]), sizes: GALLERY_IMAGE_SIZES });

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/** ←/→ move between projects unless another control (e.g. the gallery) already handled the key. */
const useArrowKeyNavigation = (previousPath: string, nextPath: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTypingTarget(event.target)) return;

      if (event.key === "ArrowLeft") navigate(previousPath);
      else if (event.key === "ArrowRight") navigate(nextPath);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, previousPath, nextPath]);
};

const Kbd = ({ children }: { children: string }) => (
  <kbd className="inline-flex h-5 min-w-5 items-center justify-center px-1 border border-white/20 font-body text-[10px] text-white/50">
    {children}
  </kbd>
);

const AdjacentLink = ({ project, direction }: { project: Project; direction: Direction }) => {
  const isNext = direction === "next";
  const thumb = responsiveImage(project.images[0], 960);
  const Arrow = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      to={projectPath(project)}
      rel={isNext ? "next" : "prev"}
      aria-keyshortcuts={isNext ? "ArrowRight" : "ArrowLeft"}
      onPointerEnter={() => preloadCover(project)}
      onFocus={() => preloadCover(project)}
      className={cn(
        "group relative isolate flex min-h-[10rem] md:min-h-[15rem] flex-col justify-between overflow-hidden border border-white/10 p-5 md:p-8 transition-colors duration-500 hover:border-white/40",
        isNext ? "items-end text-right" : "items-start text-left",
        focusRing,
      )}
    >
      <img
        src={thumb.src}
        srcSet={thumb.srcSet}
        sizes="(min-width: 768px) 40vw, 50vw"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-45 group-hover:grayscale-0 group-focus-visible:opacity-45 group-focus-visible:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/40" aria-hidden />

      <div className={cn("flex w-full items-center gap-3", isNext && "flex-row-reverse")}>
        <span
          className="inline-flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black group-focus-visible:bg-white group-focus-visible:text-black"
          aria-hidden
        >
          <Arrow
            className={cn(
              "h-4 w-4 transition-transform duration-300 motion-reduce:transition-none",
              isNext ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5",
            )}
          />
        </span>
        <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60">
          {isNext ? "Next" : "Previous"}
          <span className="hidden sm:inline"> project</span>
        </span>
      </div>

      <div className="mt-8">
        <p className="hidden md:block font-body text-[11px] tracking-[0.25em] uppercase text-white/40">
          {project.category}
        </p>
        <p className="mt-2 font-display text-2xl sm:text-3xl md:text-5xl leading-[0.9] text-white/80 transition-colors duration-300 group-hover:text-white">
          {project.title}
        </p>
      </div>
    </Link>
  );
};

const IndexLink = ({ to, position, total }: { to: string; position: number; total: number }) => (
  <Link
    to={to}
    className={cn(
      "group col-span-2 md:col-span-1 order-first md:order-none flex flex-col justify-between gap-5 border border-white/10 bg-white/[0.02] p-5 md:min-w-[13rem] md:p-8 transition-colors duration-500 hover:border-white/40 hover:bg-white/[0.05]",
      focusRing,
    )}
  >
    <div className="flex items-center justify-between gap-6 md:flex-col md:items-center md:gap-5">
      <div className="flex items-center gap-4 md:flex-col md:gap-5">
        {/* 3×3 index glyph; cells fill in a diagonal wave on hover. */}
        <span className="grid grid-cols-3 gap-[3px]" aria-hidden>
          {Array.from({ length: 9 }, (_, cell) => (
            <span
              key={cell}
              className="h-1.5 w-1.5 md:h-2 md:w-2 border border-white/50 transition-all duration-300 group-hover:border-white group-hover:bg-white group-focus-visible:bg-white motion-reduce:transition-none"
              style={{ transitionDelay: `${(Math.floor(cell / 3) + (cell % 3)) * 50}ms` }}
            />
          ))}
        </span>
        <span className="relative font-body text-xs tracking-[0.3em] uppercase">
          All projects
          <span
            className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </div>

      <p className="font-body text-xs tabular-nums tracking-[0.2em] text-white/50">
        <span className="text-white">{pad(position)}</span> / {pad(total)}
        <span className="sr-only">, project {position} of {total}</span>
      </p>
    </div>

    <div className="flex gap-[3px]" aria-hidden>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-0.5 flex-1 transition-colors duration-500",
            index === position - 1 ? "bg-white" : index < position - 1 ? "bg-white/40" : "bg-white/15",
          )}
        />
      ))}
    </div>
  </Link>
);

const ProjectNavigation = ({ previous, next, backTo, position, total }: ProjectNavigationProps) => {
  useArrowKeyNavigation(projectPath(previous), projectPath(next));

  return (
    <nav aria-labelledby="project-navigation-heading">
      <div className="mb-6 md:mb-8 flex items-end justify-between gap-6">
        <h2 id="project-navigation-heading" className="font-body text-xs tracking-[0.3em] uppercase text-white/50">
          Continue exploring
        </h2>
        <p className="hidden md:[@media(hover:hover)]:flex items-center gap-2 font-body text-[11px] text-white/40">
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
          <span>to browse projects</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <AdjacentLink project={previous} direction="previous" />
        <IndexLink to={backTo} position={position} total={total} />
        <AdjacentLink project={next} direction="next" />
      </div>
    </nav>
  );
};

export default ProjectNavigation;
