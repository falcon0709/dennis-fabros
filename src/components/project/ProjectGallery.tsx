import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { responsiveImage } from "@/data/projects";

type ProjectGalleryProps = {
  title: string;
  images: string[];
  autoplayMs?: number;
};

const pad = (value: number) => String(value).padStart(2, "0");

const ProjectGallery = ({ title, images, autoplayMs = 5000 }: ProjectGalleryProps) => {
  const hasMultiple = images.length > 1;
  const [viewportRef, api] = useEmblaCarousel({ loop: hasMultiple, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  // Re-armed on every slide change so manual navigation restarts the countdown.
  useEffect(() => {
    if (!api || !hasMultiple || isPaused || prefersReducedMotion) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") api.scrollNext();
    }, autoplayMs);
    return () => window.clearTimeout(timer);
  }, [api, hasMultiple, isPaused, prefersReducedMotion, autoplayMs, selectedIndex]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="group/gallery outline-none focus-visible:ring-1 focus-visible:ring-white/60"
    >
      <div className="relative overflow-hidden border border-white/10 bg-white/[0.03]">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {images.map((image, index) => {
              const { src, srcSet } = responsiveImage(image);
              return (
                <div
                  key={image}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${images.length}`}
                  className="relative min-w-0 shrink-0 grow-0 basis-full aspect-[16/10] md:aspect-[16/8]"
                >
                  <img
                    src={src}
                    srcSet={srcSet}
                    sizes="(min-width: 1440px) 1344px, 100vw"
                    alt={`${title} — image ${index + 1} of ${images.length}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous image"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors md:opacity-0 md:group-hover/gallery:opacity-100 md:group-focus-within/gallery:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next image"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors md:opacity-0 md:group-hover/gallery:opacity-100 md:group-focus-within/gallery:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <p
              aria-live="polite"
              className="absolute bottom-4 right-5 font-body text-xs tracking-[0.3em] text-white/80 tabular-nums"
            >
              {pad(selectedIndex + 1)} <span className="text-white/40">/ {pad(images.length)}</span>
            </p>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((image, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={image}
                type="button"
                aria-current={isActive}
                aria-label={`Show image ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={cn(
                  "relative aspect-[16/10] overflow-hidden border transition-all duration-300",
                  isActive ? "border-white opacity-100" : "border-white/10 opacity-50 hover:opacity-80",
                )}
              >
                <img
                  src={responsiveImage(image, 320).src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {isActive && !isPaused && !prefersReducedMotion && (
                  <span
                    key={selectedIndex}
                    className="absolute bottom-0 left-0 h-0.5 bg-white animate-gallery-progress"
                    style={{ animationDuration: `${autoplayMs}ms` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
