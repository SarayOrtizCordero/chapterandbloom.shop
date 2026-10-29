import Image from "next/image";
import Link from "next/link";
import { eur, productCover, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const cover = productCover(product);
  const swatches = product.variants?.options.filter((o) => o.swatch);
  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
        <Image
          src={cover.src}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold">{product.badge}</span>
        )}
      </div>
      <h3 className="mt-3 font-semibold leading-snug">{product.name}</h3>
      <div className="mt-0.5 flex items-center gap-2 text-sm">
        <span className="text-ink-soft">
          {product.hasFinish ? "Desde " : ""}
          <span className="font-bold text-ink">{eur(product.price)}</span>
        </span>
        {swatches && (
          <span className="flex -space-x-1" aria-hidden>
            {swatches.map((o) => (
              <span key={o.id} className="h-3.5 w-3.5 rounded-full border border-ink/15" style={{ background: o.swatch }} />
            ))}
          </span>
        )}
      </div>
    </Link>
  );
}
