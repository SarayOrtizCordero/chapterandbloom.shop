"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { eur, finishById, HOLO_EXTRA, PRICES, type FinishId } from "@/lib/data";
import { Art } from "./Art";
import { FinishPicker, ModelPicker } from "./Pickers";

type Upload = { name: string; url: string };

export function CustomForm() {
  const { add } = useCart();
  const [kind, setKind] = useState<"skin" | "insert">("skin");
  const [model, setModel] = useState("");
  const [finish, setFinish] = useState<FinishId>("matte");
  const [files, setFiles] = useState<Upload[]>([]);
  const [note, setNote] = useState("");
  const [modelError, setModelError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [done, setDone] = useState(false);
  const [drag, setDrag] = useState(false);
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
    setFileError(false);
    setDone(false);
  };

  const submit = () => {
    setModelError(!model);
    setFileError(files.length === 0);
    if (!model || files.length === 0) return;
    add({
      name: kind === "skin" ? "Skin personalizada" : "Insert personalizado",
      image: { src: files[0].url, kind: "plain" },
      model,
      finish,
      unitPrice: price,
      custom: { files: files.map((f) => f.name), note, kind },
    });
    setDone(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-white">
          <Art designId="lavanda" variant={kind} finish={finish} image={files[0]?.url} className="h-[88%] drop-shadow-xl" />
        </div>
        {!files[0] && <p className="mt-3 text-center text-sm font-semibold">Aquí verás una vista previa de tu diseño</p>}
        <p className="mt-2 text-center text-xs text-ink-soft">Vista orientativa. Revisaremos tu imagen y te escribiremos si necesitamos ajustar algo.</p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">A tu gusto</p>
          <h1 className="font-display mt-1 text-3xl font-black leading-tight sm:text-4xl">Crea tu skin personalizada</h1>
          <p className="mt-3 max-w-prose text-ink-soft">
            Elige tu e-reader y el acabado, y sube tu diseño (hasta 2 imágenes). Cuéntanos en el mensaje cómo lo imaginas y nosotras lo preparamos.
          </p>
        </div>

        <fieldset>
          <legend className="mb-2 font-bold">Producto</legend>
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
                className={`rounded-xl border-2 p-4 text-left transition ${kind === k ? "border-ink bg-white shadow-soft" : "border-ink/60 bg-white hover:border-ink"}`}
              >
                <span className="block text-sm font-semibold">{label}</span>
                <span className="text-xl font-bold">{eur(p)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <ModelPicker
          model={model}
          error={modelError}
          onModel={(m) => {
            setModel(m);
            setModelError(false);
          }}
        />

        <FinishPicker value={finish} onChange={setFinish} image={files[0] ? { src: files[0].url, kind: "plain" } : null} />

        <fieldset>
          <legend className="mb-2 font-bold">Tu diseño (máx. 2 imágenes)</legend>
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
            className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
              fileError ? "border-rose-deep bg-rose/30" : drag ? "border-ink bg-mint-soft" : "border-ink/60 bg-white"
            }`}
          >
            <input type="file" accept="image/*" multiple className="sr-only" id="files" onChange={(e) => addFiles(e.target.files)} />
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
                  <li key={f.url} className="relative overflow-hidden rounded-xl bg-cream p-2 text-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.url} alt={`Imagen ${i + 1}`} className="aspect-square w-full rounded-lg object-cover" />
                    <p className="mt-1 truncate text-xs">{f.name}</p>
                    <button
                      type="button"
                      onClick={() => setFiles((fs) => fs.filter((_, k) => k !== i))}
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream"
                      aria-label={`Quitar ${f.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {fileError && (
            <p role="alert" className="mt-2 text-sm font-bold text-rose-deep">
              Sube al menos una imagen con tu diseño.
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor="note" className="mb-2 block font-bold">
            Mensaje para nosotras
          </label>
          <textarea
            id="note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Cuéntanos cómo lo quieres: colocación de las imágenes, textos, colores, dudas…"
            className="w-full rounded-xl border border-ink/60 bg-white px-4 py-3"
          />
        </div>

        <button type="button" onClick={submit} className="btn btn-primary w-full !py-3.5 text-base">
          Añadir al carrito · {eur(price)}
        </button>
        {done && <p className="text-center text-sm font-bold">¡Añadida al carrito! 🤍 Puedes crear otra si quieres.</p>}
        <p className="text-xs text-ink-soft">
          Skin personalizada {eur(PRICES.customSkin)} · insert personalizado {eur(PRICES.customInsert)} · acabados holográficos +{eur(HOLO_EXTRA)}.
        </p>
      </div>
    </div>
  );
}
