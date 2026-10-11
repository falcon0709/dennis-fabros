import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const savedPositions = new Map<string, number>();

/**
 * Scroll handling for <BrowserRouter>, which has no built-in restoration:
 * back/forward restores the previous offset, `#hash` links scroll to the target,
 * and any other route change starts at the top.
 */
const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = original;
    };
  }, []);

  // Cleanup runs before the next route's DOM is committed, so scrollY still belongs to this entry.
  useLayoutEffect(() => {
    const key = location.key;
    return () => {
      savedPositions.set(key, window.scrollY);
    };
  }, [location.key]);

  useEffect(() => {
    const pathnameChanged = previousPathname.current !== location.pathname;
    previousPathname.current = location.pathname;

    if (navigationType === "POP" && savedPositions.has(location.key)) {
      window.scrollTo(0, savedPositions.get(location.key)!);
      return;
    }

    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (pathnameChanged) window.scrollTo(0, 0);
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
};

export default ScrollManager;
