const preloaded = new Set<string>();

/**
 * Warms the browser cache for an image. Uses <link rel="preload"> so a `srcSet`/`sizes`
 * pair resolves to the same candidate the eventual <img> will request.
 */
export const preloadImage = ({ src, srcSet, sizes }: { src: string; srcSet?: string; sizes?: string }) => {
  const key = srcSet ?? src;
  if (preloaded.has(key) || typeof document === "undefined") return;
  preloaded.add(key);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  if (srcSet) link.setAttribute("imagesrcset", srcSet);
  if (sizes) link.setAttribute("imagesizes", sizes);
  document.head.appendChild(link);
};
