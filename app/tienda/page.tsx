import Link from "next/link";
import type { Metadata } from "next";
import { CategoryArt } from "@/components/CategoryArt";
import { NotifyForm } from "@/components/NotifyForm";
import { ProductCard } from "@/components/ProductCard";
import { categories, categoryById, products } from "@/lib/data";

export const metadata: Metadata = { title: "Tienda · Chapter & Bloom" };

export default async function Shop({ searchParams }: { searchParams: Promise<{ cat?: string; q?: string }> }) {
  const { cat, q } = await searchParams;
  const category = cat ? categoryById(cat) : undefined;
  const query = (q ?? "").trim().toLowerCase();

  const list = products.filter(
    (p) => (!category || p.category === category.id) && (!query || p.name.toLowerCase().includes(query)),
  );

  const chip = (active: boolean) =>
    `rounded-full border-2 px-4 py-2 text-sm font-bold transition ${active ? "border-ink bg-ink text-cream" : "border-ink/20 bg-white/60 hover:border-ink"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-5xl font-black">{category ? category.name : "Toda la tienda"}</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">{category ? category.blurb : "Skins e inserts para tu e-reader, y pronto muchas cosas más para lectoras."}</p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-2" aria-label="Categorías">
        <Link href="/tienda" className={chip(!category)}>
          Todo
        </Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/tienda?cat=${c.id}`} className={chip(category?.id === c.id)}>
            {c.short}
            {c.soon && <span className="ml-1 text-[10px] font-semibold opacity-70">pronto</span>}
          </Link>
        ))}
        <Link href="/personalizadas" className="rounded-full bg-mint px-4 py-2 text-sm font-bold hover:brightness-95">
          ✦ Skin personalizada
        </Link>
      </div>

      <form id="buscar" action="/tienda" className="mb-10 flex max-w-md gap-2">
        {category && <input type="hidden" name="cat" value={category.id} />}
        <label htmlFor="q" className="sr-only">
          Buscar
        </label>
        <input id="q" name="q" defaultValue={q} placeholder="Buscar diseños…" className="min-w-0 flex-1 rounded-full border-2 border-ink/20 bg-white/80 px-5 py-3" />
        <button className="btn btn-primary !px-5">Buscar</button>
      </form>

      {category?.soon ? (
        <div className="grid items-center gap-8 rounded-[2rem] bg-lavender-soft p-8 md:grid-cols-2 md:p-12">
          <CategoryArt id={category.id} className="h-64" />
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-mint px-4 py-1 text-xs font-bold uppercase tracking-wider">Próximamente</span>
            <h2 className="font-display text-3xl font-black">{category.name}</h2>
            <p className="text-ink-soft">{category.blurb} Estamos preparando esta colección con mucho cariño.</p>
            <NotifyForm />
          </div>
        </div>
      ) : list.length === 0 ? (
        <p className="py-16 text-center text-ink-soft">No hemos encontrado nada con esa búsqueda 🤍</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
