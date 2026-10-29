"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { eur, finishById, kindLabel, unitPrice, type FinishId, type Product } from "@/lib/data";
import { Art } from "./Art";
import { FinishPicker, ModelPicker } from "./Pickers";

export function Configurator({ product }: { product: Product }) {
  const { add } = useCart();
  const [brandId, setBrandId] = useState("kindle");
  const [model, setModel] = useState("");
  const [finish, setFinish] = useState<FinishId>("matte");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);

  const price = unitPrice(product.price, finish);

  const submit = () => {
    if (!model) {
      setError(true);
      document.getElementById("model")?.focus();
      return;
    }
    add({
      name: product.name,
      kind: product.kind,
      designId: product.designId,
      model,
      finish,
      unitPrice: price,
      qty,
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="lg:sticky lg:top-40 lg:self-start">
        <div className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] ${product.kind === "skin" ? "bg-lavender-soft" : "bg-mint-soft"}`}>
          <div className="absolute inset-0 sparkle-bg" />
          <Art designId={product.designId} variant={product.kind} finish={finish} className="relative h-[84%] drop-shadow-2xl transition-all" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-cream/90 px-3 py-1">Acabado: {finishById(finish).name}</span>
            {model && <span className="rounded-full bg-cream/90 px-3 py-1">{model}</span>}
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-ink-soft">Imagen orientativa: los colores pueden variar ligeramente.</p>
      </div>

      <div className="space-y-7">
        <div>
          <Link href={`/tienda?cat=${product.category}`} className="text-sm font-bold text-orchid hover:underline">
            ← {kindLabel[product.kind]}s
          </Link>
          <h1 className="font-display mt-2 text-4xl font-black leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-3 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold">{eur(price)}</span>
            {finishById(finish).holo && <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold">incluye acabado holográfico</span>}
          </p>
          <p className="mt-3 max-w-prose text-ink-soft">{product.description}</p>
        </div>

        <div>
          <ModelPicker
            brandId={brandId}
            model={model}
            onBrand={setBrandId}
            onModel={(m) => {
              setModel(m);
              setError(false);
            }}
          />
          {error && (
            <p role="alert" className="mt-2 text-sm font-bold text-rose-deep">
              Elige primero tu modelo para continuar.
            </p>
          )}
        </div>

        <FinishPicker value={finish} onChange={setFinish} />

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border-2 border-ink/20 bg-white/70">
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
          <button type="button" onClick={submit} className="btn btn-primary flex-1 !py-4 text-base">
            Añadir al carrito · {eur(price * qty)}
          </button>
        </div>

        <ul className="grid gap-2 rounded-3xl bg-white/60 p-5 text-sm text-ink-soft sm:grid-cols-2">
          <li>✦ Vinilo de calidad premium</li>
          <li>✦ Se retira sin dejar residuos</li>
          <li>✦ Fácil de colocar y recolocar</li>
          <li>✦ Corte exacto a tu modelo</li>
        </ul>
        <p className="text-xs text-ink-soft">Solo decorativa: no es una funda de protección. Los colores pueden variar según la pantalla.</p>
      </div>
    </div>
  );
}
