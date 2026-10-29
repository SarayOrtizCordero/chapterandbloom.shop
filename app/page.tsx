import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { CategoryArt } from "@/components/CategoryArt";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CropBox } from "@/components/Pickers";
import { FinishFx } from "@/components/finish";
import { categories, eur, finishes, HOLO_EXTRA, productBySlug, reviews } from "@/lib/data";

const featuredSlugs = [
  "lazos-coquette-skin",
  "acotar-skin",
  "spooky-book-club-insert",
  "jude-duarte-marcapaginas",
  "pack-4-hojas-pegatinas",
  "celestial-dreams-skin",
  "vampire-bite-insert",
];

const steps = [
  ["1", "Elige tu e-reader y el acabado"],
  ["2", "Sube tu diseño (hasta 2 imágenes)"],
  ["3", "Cuéntanos cómo lo quieres"],
];

export default function Home() {
  const featured = featuredSlugs.map((s) => productBySlug(s)!);
  const showcase = { src: "/brand/skins/Lazos-Rosa-Coquette.jpeg", kind: "spread" } as const;

  return (
    <>
      <Hero />

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Explora por categoría</h2>
          <Link href="/tienda" className="text-sm font-semibold underline underline-offset-4">
            Ver toda la tienda
          </Link>
        </div>
        <Carousel label="Categorías">
          {categories.map((c) => (
            <Link key={c.id} href={`/tienda?cat=${c.id}`} className="group w-56 shrink-0 snap-start sm:w-64">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                {c.cover ? (
                  <Image src={c.cover} alt="" fill sizes="256px" className="object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <CategoryArt id={c.id} className="absolute inset-0 bg-lavender-soft" />
                )}
                {c.soon && <span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-cream">Próximamente</span>}
              </div>
              <h3 className="mt-3 font-semibold">{c.name}</h3>
              <p className="line-clamp-2 text-sm text-ink-soft">{c.blurb}</p>
            </Link>
          ))}
        </Carousel>
      </section>

      {/* Destacados */}
      <section className="bg-lavender-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-black sm:text-4xl">Los favoritos del momento</h2>
            <Link href="/tienda" className="btn btn-ghost !py-2 !text-sm">
              Ver todo
            </Link>
          </div>
          <Carousel label="Productos destacados">
            {featured.map((p) => (
              <div key={p.slug} className="w-56 shrink-0 snap-start sm:w-64">
                <ProductCard product={p} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Acabados */}
      <section id="acabados" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Elige tu acabado</h2>
          <p className="mt-3 text-ink-soft">
            Disponibles en todos los diseños de Chapter & Bloom. Mate y brillante van incluidos; los holográficos suman solo {eur(HOLO_EXTRA)}.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 md:grid-cols-6">
          {finishes.map((f) => (
            <div key={f.id} className="text-center">
              <CropBox img={showcase} className="rounded-2xl">
                <FinishFx finish={f.id} />
              </CropBox>
              <p className="mt-2 font-semibold">{f.name}</p>
              <p className="text-xs text-ink-soft">{f.holo ? `+${eur(HOLO_EXTRA)}` : "Incluido"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personalizada */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 rounded-3xl bg-ink px-8 py-12 text-cream md:grid-cols-2 md:px-14">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-mint">Skins personalizadas</p>
            <h2 className="font-display text-3xl font-black leading-tight sm:text-4xl">Tu historia, en tu e-reader</h2>
            <p className="max-w-md text-cream/80">
              Skin desde {eur(8)} e insert desde {eur(5)}, con acabado mate o brillante. Los holográficos suman {eur(HOLO_EXTRA)}.
            </p>
            <Link href="/personalizadas" className="btn btn-mint">
              Crear mi skin
            </Link>
          </div>
          <ol className="space-y-3">
            {steps.map(([n, t]) => (
              <li key={n} className="flex items-center gap-4 rounded-2xl bg-cream/10 px-5 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint font-bold text-ink">{n}</span>
                <span className="font-semibold">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reseñas */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Lo que dicen las lectoras</h2>
          <p className="mt-2 text-sm text-ink-soft">Reseñas de ejemplo para la demo</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl bg-white p-6">
              <div className="text-orchid" aria-label={`${r.stars} de 5 estrellas`}>
                {"★".repeat(r.stars)}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl bg-mint-soft px-8 py-12 text-center">
          <h2 className="font-display text-2xl font-black sm:text-3xl">Síguenos en Instagram</h2>
          <p className="mt-2 text-ink-soft">Novedades, sorteos y mucho cariño por la lectura 🤍</p>
          <a href="https://www.instagram.com/chapterandbloom.shop/" target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
            @chapterandbloom.shop
          </a>
        </div>
      </section>
    </>
  );
}
