import Image, { type ImageProps } from "next/image";
import { optimized, type ImgSize } from "@/lib/img";

/** Imagen de producto: sirve directamente la versión WebP ya optimizada (sin esperar al optimizador). */
export function Photo({ src, size, alt, ...rest }: Omit<ImageProps, "src"> & { src: string; size: ImgSize; alt: string }) {
  return <Image src={optimized(src, size)} alt={alt} unoptimized {...rest} />;
}
