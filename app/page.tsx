import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { CategoryArt } from "@/components/CategoryArt";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { categories, eur, finishes, HOLO_EXTRA, products, reviews } from "@/lib/data";

const tints = ["bg-lavender-soft", "bg-mint-soft", "bg-rose/50", "bg-lavender-soft", "bg-mint-soft", "bg-rose/50"];

export default function Home() {
  const featured = [
    products.find((p) => p.slug === "jardin-de-medianoche-skin")!,
    products.find((p) => p.slug === "cerezos-y-libros-skin")!,
    products.find((p) => p.slug === "biblioteca-celestial-insert")!,
    products.find((p) => p.slug === "rosas-y-dragones-skin")!,
    products.find((p) => p.slug === "lavanda-insert")!,
    products.find((p) => p.slug === "capitulos-de-menta-skin")!,
    products.find((p) => p.slug === "dark-academia-skin")!,
  ];

  return (
    <>
      <Hero />

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-black sm:text-5xl">Explora por categoría</h2>
          <Link href="/tienda" className="hidden text-sm font-bold underline underline-offset-4 sm:block">
            Ver toda la tienda
          </Link>
        </div>
        <Carousel label="Categorías">
          {categories.map((c, k) => (
            <Link
              key={c.id}
              href={`/tienda?cat=${c.id}`}
              className="group w-64 shrink-0 snap-start sm:w-72"
            >
              <div className={`relative h-72 overflow-hidden rounded-3xl ${tints[k % tints.length]} transition group-hover:shadow-pop`}>
                <div className="sparkle-bg absolute inset-0 opacity-70" />
                <CategoryArt id={c.id} className="absolute inset-0 transition duration-300 group-hover:scale-105" />
                {c.soon && <span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-cream">Próximamente</span>}
              </div>
              <h3 className="font-display mt-3 text-xl font-bold">{c.name}</h3>
              <p className="line-clamp-2 text-sm text-ink-soft">{c.blurb}</p>
            </Link>
          ))}
          <Link href="/personalizadas" className="group w-64 shrink-0 snap-start sm:w-72">
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-ink text-center text-cream transition group-hover:shadow-pop">
              <div className="space-y-2 px-6">
                <p className="text-4xl">✦</p>
                <p className="font-display text-2xl font-bold">Skin personalizada</p>
                <p className="text-sm text-cream/75">Sube tu diseño</p>
              </div>
            </div>
            <h3 className="font-display mt-3 text-xl font-bold">A tu gusto</h3>
            <p className="line-clamp-2 text-sm text-ink-soft">Tu imagen, tu modelo y tu acabado. Desde {eur(8)}.</p>
          </Link>
        </Carousel>
      </section>

      {/* Destacados */}
      <section className="bg-lavender/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-black sm:text-5xl">Los favoritos del momento</h2>
            <Link href="/tienda" className="btn btn-ghost !py-2.5">
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
      <section id="acabados" className="mx-auto max-w-7xl scroll-mt-40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-black sm:text-5xl">Elige tu acabado</h2>
          <p className="mt-3 text-ink-soft">
            Disponibles en todos los diseños de Chapter & Bloom. Mate y brillante van incluidos; los holográficos suman solo {eur(HOLO_EXTRA)}.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {finishes.map((f) => (
            <div key={f.id} className="overflow-hidden rounded-3xl bg-white/70 shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.thumb} alt={`Acabado ${f.name}`} className="aspect-[4/3] w-full object-cover" />
              <div className="p-3">
                <p className="font-display font-bold">{f.name}</p>
                <p className="text-xs text-ink-soft">{f.desc}</p>
                <p className="mt-2 inline-block rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-bold">{f.holo ? `+${eur(HOLO_EXTRA)}` : "Incluido"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personalizada */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-cream md:px-16">
          <div className="sparkle-bg absolute inset-0 opacity-30" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <span className="inline-block rounded-full bg-mint px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">Skins personalizadas</span>
              <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">Tu historia, en tu e-reader</h2>
              <p className="max-w-lg text-cream/80">
                Sube hasta 2 imágenes, elige modelo y acabado y deja un mensaje con todos los detalles. Skin desde {eur(8)}, insert desde {eur(5)}.
              </p>
              <Link href="/personalizadas" className="btn btn-mint">
                Crear mi skin
              </Link>
            </div>
            <div className="relative hidden h-72 md:block">
              <div className="floaty absolute left-4 top-0 h-full" style={{ ["--r" as string]: "-6deg" }}>
                <svg viewBox="0 0 288 400" className="h-full" aria-hidden>
                  <rect width="288" height="400" rx="24" fill="#cdc4d7" />
                  <rect x="30" y="40" width="228" height="150" rx="14" fill="#faf3f1" opacity=".9" />
                  <path d="M60 170 L110 110 L150 150 L190 100 L230 170Z" fill="#b8e8ee" />
                  <circle cx="200" cy="80" r="14" fill="#d7c5d2" />
                  <rect x="40" y="230" width="150" height="10" rx="5" fill="#312a44" opacity=".75" />
                  <rect x="40" y="254" width="100" height="10" rx="5" fill="#312a44" opacity=".4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-display text-4xl font-black sm:text-5xl">Lo que dicen las lectoras</h2>
          <p className="mt-2 font-bold">
            <span className="text-orchid" aria-hidden>
              ★★★★★
            </span>{" "}
            4,9 · Reseñas de ejemplo
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl bg-white/70 p-6 shadow-soft">
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
        <div className="rounded-[2.5rem] bg-mint-soft px-8 py-12 text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Síguenos en Instagram</h2>
          <p className="mt-2 text-ink-soft">Novedades, sorteos y mucho cariño por la lectura 🤍</p>
          <a href="https://www.instagram.com/chapterandbloom.shop/" target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
            @chapterandbloom.shop
          </a>
        </div>
      </section>
    </>
  );
}
