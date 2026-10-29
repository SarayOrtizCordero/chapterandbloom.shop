export type ImgSize = 640 | 1100;

/**
 * Las fotos originales viven en /brand; las versiones ligeras (WebP) las genera
 * `node scripts/optimize-images.mjs` en /img. Cualquier otra ruta (blob:, etc.) se deja igual.
 */
export function optimized(src: string, size: ImgSize): string {
  if (!src.startsWith("/brand/")) return src;
  return src.replace("/brand/", "/img/").replace(/\.(jpe?g|png)$/i, `-${size}.webp`);
}
