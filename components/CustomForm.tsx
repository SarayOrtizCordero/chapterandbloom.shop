"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { eur, finishById, PRICES, HOLO_EXTRA, type FinishId } from "@/lib/data";
import { Art } from "./Art";
import { FinishPicker, ModelPicker } from "./Pickers";

type Upload = { name: string; url: string };

export function CustomForm() {
  const { add } = useCart();
  const [kind, setKind] = useState<"skin" | "insert">("skin");
  const [brandId, setBrandId] = useState("kindle");
  const [model, setModel] = useState("");
  const [finish, setFinish] = useState<FinishId>("matte");
  const [files, setFiles] = useState<Upload[]>([]);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const base = kind === "skin" ? PRICES.customSkin : PRICES.customInsert;
  const price = base + (finishById(finish).holo ? HOLO_EXTRA : 0);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/") || next.length >= 2) continue;
      const url = URL.createObjectURL(f);
      urls.current.push(url);
      next.push({ name: f.name, url });
    }
    setFiles(next);
    setErrors([]);
  };

  const removeFile = (i: number) => setFiles((fs) => fs.filter((_, k) => k !== i));

  const submit = () => {
    const errs: string[] = [];
    if (!model) errs.push("Elige tu modelo de e-reader.");
    if (files.length === 0) errs.push("Sube al menos una imagen con tu diseño.");
    setErrors(errs);
    if (errs.length) return;
    add({
      name: `${kind === "skin" ? "Skin" : "Insert"} personalizado`,
      kind,
      designId: "lavanda",
      model,
      finish,
      unitPrice: price,
      custom: { files: files.map((f) => f.name), note, preview: files[0].url },
    });
    setDone(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="lg:sticky lg:top-40 lg:self-start">
        <div className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] ${kind === "skin" ? "bg-lavender-soft" : "bg-mint-soft"}`}>
          <div className="absolute inset-0 sparkle-bg" />
          <Art designId="lavanda" variant={kind} finish={finish} image={files[0]?.url} className="relative h-[84%] drop-shadow-2xl" />
          {!files[0] && (
            <p className="absolute inset-x-8 bottom-6 rounded-2xl bg-cream/90 px-4 py-2 text-center text-sm font-semibold">
              Aquí verás una vista previa de tu diseño ✨
            </p>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-ink-soft">Vista orientativa. Revisaremos tu imagen y te escribiremos si necesitamos ajustar algo.</p>
      </div>

      <div className="space-y-7">
        <div>
          <span className="inline-block rounded-full bg-mint px-4 py-1 text-xs font-bold uppercase tracking-wider">A tu gusto</span>
          <h1 className="font-display mt-3 text-4xl font-black leading-tight sm:text-5xl">Crea tu skin personalizada</h1>
          <p className="mt-3 max-w-prose text-ink-soft">
            Elige tu e-reader, el acabado y sube tu diseño (hasta 2 imágenes). Cuéntanos en el mensaje cómo lo imaginas y nosotras lo preparamos.
          </p>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-soft">Producto</legend>
          <div className="grid grid-cols-2 gap-3" role="radiogroup">
            {(
              [
                ["skin", "Skin personalizada", PRICES.customSkin],
                ["insert", "Insert personalizado", PRICES.customInsert],
              ] as const
            ).map(([k, label, p]) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={kind === k}
                onClick={() => setKind(k)}
                className={`rounded-2xl border-2 p-4 text-left transition ${kind === k ? "border-ink bg-white shadow-soft" : "border-ink/15 bg-white/60 hover:border-ink/50"}`}
              >
                <span className="block font-bold">{label}</span>
                <span className="font-display text-xl font-bold">{eur(p)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <ModelPicker brandId={brandId} model={model} onBrand={setBrandId} onModel={setModel} />
        <FinishPicker value={finish} onChange={setFinish} />

        <fieldset>
          <legend className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-soft">3 · Tu diseño (máx. 2 imágenes)</legend>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`rounded-3xl border-2 border-dashed p-6 text-center transition ${drag ? "border-orchid bg-lavender-soft" : "border-ink/30 bg-white/60"}`}
          >
            <input ref={input} type="file" accept="image/*" multiple className="sr-only" id="files" onChange={(e) => addFiles(e.target.files)} />
            {files.length < 2 ? (
              <>
                <p className="font-semibold">Arrastra aquí tu imagen o</p>
                <label htmlFor="files" className="btn btn-ghost mt-3 !py-2.5">
                  Elegir archivo
                </label>
                <p className="mt-2 text-xs text-ink-soft">{files.length}/2 subidas · JPG o PNG</p>
              </>
            ) : (
              <p className="font-semibold">Has subido las 2 imágenes ✓</p>
            )}
            {files.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {files.map((f, i) => (
                  <li key={f.url} className="relative overflow-hidden rounded-2xl bg-white p-2 text-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.url} alt={`Imagen ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" />
                    <p className="mt-1 truncate text-xs">{f.name}</p>
                    <button type="button" onClick={() => removeFile(i)} className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream" aria-label={`Quitar ${f.name}`}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </fieldset>

        <div>
          <label htmlFor="note" className="mb-2 block text-sm font-bold uppercase tracking-wider text-ink-soft">
            4 · Mensaje para nosotras
          </label>
          <textarea
            id="note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Cuéntanos cómo lo quieres: colocación de las imágenes, textos, colores, dudas…"
            className="w-full rounded-2xl border-2 border-ink/20 bg-white/80 px-4 py-3"
          />
        </div>

        {errors.length > 0 && (
          <ul role="alert" className="rounded-2xl bg-rose/50 px-4 py-3 text-sm font-bold">
            {errors.map((e) => (
              <li key={e}>• {e}</li>
            ))}
          </ul>
        )}

        <button type="button" onClick={submit} className="btn btn-primary w-full !py-4 text-base">
          Añadir al carrito · {eur(price)}
        </button>
        {done && <p className="text-center text-sm font-bold text-orchid">¡Añadida al carrito! 🤍 Puedes crear otra si quieres.</p>}
        <p className="text-xs text-ink-soft">Skin personalizada {eur(PRICES.customSkin)} · insert personalizado {eur(PRICES.customInsert)} · acabados holográficos +{eur(HOLO_EXTRA)}.</p>
      </div>
    </div>
  );
}
