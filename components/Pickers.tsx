"use client";

import type { ReactNode } from "react";
import { brands, eur, finishById, finishes, HOLO_EXTRA, type FinishId, type Img } from "@/lib/data";
import { FinishFx } from "./finish";

/* Recorte cuadrado de la zona central de la skin (trasera) para las miniaturas. */
const crops = {
  spread: { x: 0.12, y: 0.35, s: 0.33 },
  photo: { x: 0.4, y: 0.3, s: 0.32 },
} as const;

export function CropBox({ img, className = "", children }: { img: Img; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative aspect-square overflow-hidden bg-white ${className}`}>
      {img.kind === "plain" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img.src} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img.src}
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute max-w-none"
          style={{
            width: `${100 / crops[img.kind].s}%`,
            left: `${(-crops[img.kind].x / crops[img.kind].s) * 100}%`,
            top: `${(-crops[img.kind].y / crops[img.kind].s) * 100}%`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export function ModelPicker({ model, onModel, error }: { model: string; onModel: (m: string) => void; error?: boolean }) {
  return (
    <div>
      <label htmlFor="model" className="mb-2 block font-bold">
        Dispositivo
      </label>
      <select
        id="model"
        value={model}
        onChange={(e) => onModel(e.target.value)}
        aria-invalid={error}
        className={`w-full rounded-xl border bg-white px-4 py-3.5 ${error ? "border-rose-deep ring-2 ring-rose-deep/30" : "border-ink/25"}`}
      >
        <option value="">Selecciona tu dispositivo</option>
        {brands.map((b) => (
          <optgroup key={b.id} label={b.name}>
            {b.models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {error && (
        <p role="alert" className="mt-2 text-sm font-bold text-rose-deep">
          Elige tu modelo para continuar.
        </p>
      )}
      <details className="mt-2 text-sm">
        <summary className="cursor-pointer font-semibold text-orchid underline underline-offset-4">¿No estás segura? Encuentra tu modelo</summary>
        <div className="mt-2 space-y-1 rounded-xl bg-lavender-soft/70 p-4 text-ink-soft">
          <p>
            <strong className="text-ink">Kindle:</strong> Ajustes → Opciones del dispositivo → Información del dispositivo.
          </p>
          <p>
            <strong className="text-ink">Kobo:</strong> Más → Ajustes → Acerca de tu eReader.
          </p>
          <p>¿Sigues con dudas? Escríbenos por Instagram y te ayudamos.</p>
        </div>
      </details>
      <p className="mt-2 text-xs text-ink-soft">Cada skin se corta a medida para un modelo concreto: comprueba bien el tuyo antes de pedir.</p>
    </div>
  );
}

export function FinishPicker({ value, onChange, image }: { value: FinishId; onChange: (f: FinishId) => void; image?: Img | null }) {
  const current = finishById(value);
  return (
    <fieldset>
      <legend className="mb-2 font-bold">
        Acabado: <span className="font-normal">{current.name}</span>
      </legend>
      <div role="radiogroup" aria-label="Acabado" className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
        {finishes.map((f) => {
          const active = f.id === value;
          return (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(f.id)}
              className={`overflow-hidden rounded-xl border-2 bg-white text-center transition ${
                active ? "border-ink shadow-soft" : "border-ink/15 hover:border-ink/50"
              }`}
            >
              {image ? (
                <CropBox img={image}>
                  <FinishFx finish={f.id} />
                </CropBox>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.thumb} alt="" className="aspect-square w-full object-cover" />
              )}
              <span className="block min-h-[2.6rem] px-1 pb-1.5 pt-1.5 text-[11px] font-bold leading-tight">
                {f.name}
                {f.holo && <span className="block font-semibold text-orchid">+{eur(HOLO_EXTRA)}</span>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-ink-soft">{current.desc}</p>
      <p className="mt-1 text-xs text-ink-soft">ⓘ Las vistas previas son orientativas: el acabado real puede verse ligeramente distinto en persona.</p>
    </fieldset>
  );
}
