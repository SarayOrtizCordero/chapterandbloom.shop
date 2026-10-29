import Link from "next/link";
import { eur, kindLabel, type Product } from "@/lib/data";
import { Art } from "./Art";

const tint: Record<string, string> = {
  skin: "bg-lavender-soft",
  insert: "bg-mint-soft",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl ${tint[product.kind]} transition group-hover:shadow-pop`}>
        <div className="absolute inset-0 sparkle-bg opacity-60" />
        <Art
          designId={product.designId}
          variant={product.kind}
          finish="glossy"
          className="relative h-[78%] -rotate-3 drop-shadow-xl transition duration-300 group-hover:-translate-y-1 group-hover:rotate-2 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-bold">{kindLabel[product.kind]}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug">{product.name}</h3>
      <p className="text-sm text-ink-soft">
        Desde <span className="font-bold text-ink">{eur(product.price)}</span>
      </p>
    </Link>
  );
}
