"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { categoryById, eur, finishById, kindLabel, unitPrice, type FinishId, type Img, type Product } from "@/lib/data";
import { optimized } from "@/lib/img";
import { Gallery } from "./Gallery";
import { FinishPicker, ModelPicker } from "./Pickers";

const bullets: Record<Product["kind"], string[]> = {
  skin: ["Vinilo de calidad premium", "Se retira sin dejar residuos", "Fácil de colocar y recolocar", "Corte exacto a tu modelo"],
  insert: ["Impresión de calidad", "Cortado a medida de tu modelo", "Se ve a través de tu funda transparente", "Acabado mate, brillante u holográfico"],
  bookmark: ["Magnético: se queda en su sitio", "Diseño original de Chapter & Bloom", "Tamaño perfecto para tus libros"],
  stickers: ["Cuatro hojas por pack", "Pegatinas Flork para decorar lo que quieras", "Las hojas pueden variar entre packs"],
};

export function ProductView({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.options[0].id ?? "");
  const [model, setModel] = useState("");
  const [finish, setFinish] = useState<FinishId>("matte");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);

  const variant = product.variants?.options.find((o) => o.id === variantId);
  const images = variant?.images ?? product.images;
  const portrait = product.kind === "bookmark" || product.kind === "stickers";
  const category = categoryById(product.category);

  // Imagen sobre la que se previsualiza cada acabado
  const fxImage = useMemo<Img | null>(
    () => (product.hasFinish ? (images.find((i) => i.kind === "spread") ?? images[0]) : null),
    [images, product.hasFinish],
  );

  // Precarga las imágenes de todos los colores/versiones para que el cambio sea instantáneo
  useEffect(() => {
    const srcs = [...product.images, ...(product.variants?.options.flatMap((o) => o.images) ?? [])].map((i) => optimized(i.src, 1100));
    new Set(srcs).forEach((s) => {
      const im = new Image();
      im.src = s;
    });
  }, [product]);

  const price = unitPrice(product, product.hasFinish ? finish : undefined);

  const submit = () => {
    if (product.needsDevice && !model) {
      setError(true);
      document.getElementById("model")?.focus();
      return;
    }
    const cover = fxImage ?? images[0];
    add({
      name: product.name,
      image: product.hasFinish ? cover : { src: cover.src, kind: "plain" },
      model: product.needsDevice ? model : undefined,
      finish: product.hasFinish ? finish : undefined,
      variant: variant?.label,
      unitPrice: price,
      qty,
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Gallery key={variantId} images={images} alt={product.name} finish={product.hasFinish ? finish : undefined} portrait={portrait} />
      </div>

      <div className="space-y-6">
        <div>
          <Link href={`/tienda?cat=${product.category}`} className="text-sm font-semibold underline decoration-mint decoration-2 underline-offset-4">
            ← {category?.name}
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-soft">{kindLabel[product.kind]}</p>
          <h1 className="font-display mt-1 text-3xl font-black leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold">
            {eur(price)}
            {product.hasFinish && finishById(finish).holo && <span className="ml-2 rounded-full bg-mint px-2.5 py-0.5 align-middle text-xs font-bold">incl. acabado holográfico</span>}
          </p>
          <p className="mt-3 max-w-prose text-ink-soft">{product.description}</p>
        </div>

        {product.variants && (
          <fieldset>
            <legend className="mb-2 font-bold">
              {product.variants.label}: <span className="font-normal">{variant?.label}</span>
            </legend>
            <div role="radiogroup" aria-label={product.variants.label} className="flex flex-wrap gap-2.5">
              {product.variants.options.map((o) => {
                const active = o.id === variantId;
                return o.swatch ? (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={o.label}
                    title={o.label}
                    onClick={() => setVariantId(o.id)}
                    className={`h-11 w-11 rounded-full border-2 p-0.5 transition ${active ? "border-ink" : "border-transparent hover:border-ink/40"}`}
                  >
                    <span className="block h-full w-full rounded-full border border-ink/15" style={{ background: o.swatch }} />
                  </button>
                ) : (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setVariantId(o.id)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${active ? "border-ink bg-ink text-cream" : "border-ink/20 bg-white hover:border-ink/50"}`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {product.needsDevice && (
          <ModelPicker
            model={model}
            error={error}
            onModel={(m) => {
              setModel(m);
              setError(false);
            }}
          />
        )}

        {product.hasFinish && <FinishPicker value={finish} onChange={setFinish} />}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center rounded-full border border-ink/25 bg-white">
            <button type="button" className="h-12 w-12 text-xl" aria-label="Menos" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="w-8 text-center font-bold" aria-live="polite">
              {qty}
            </span>
            <button type="button" className="h-12 w-12 text-xl" aria-label="Más" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
          <button type="button" onClick={submit} className="btn btn-primary min-w-0 flex-1 !py-3.5 text-base">
            Añadir al carrito · {eur(price * qty)}
          </button>
        </div>

        <ul className="space-y-1.5 border-t border-ink/10 pt-5 text-sm text-ink-soft">
          {bullets[product.kind].map((b) => (
            <li key={b}>✦ {b}</li>
          ))}
        </ul>
        {product.needsDevice && <p className="text-xs text-ink-soft">Solo decorativa: no es una funda de protección. Los colores pueden variar según la pantalla.</p>}
      </div>
    </div>
  );
}
