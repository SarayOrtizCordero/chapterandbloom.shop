"use client";

import { brands, eur, finishes, HOLO_EXTRA, type FinishId } from "@/lib/data";

export function ModelPicker({
  brandId,
  model,
  onBrand,
  onModel,
}: {
  brandId: string;
  model: string;
  onBrand: (id: string) => void;
  onModel: (m: string) => void;
}) {
  const brand = brands.find((b) => b.id === brandId) ?? brands[0];
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-soft">1 · Tu e-reader</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Marca">
        {brands.map((b) => (
          <button
            key={b.id}
            type="button"
            role="radio"
            aria-checked={b.id === brand.id}
            onClick={() => {
              onBrand(b.id);
              onModel("");
            }}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
              b.id === brand.id ? "border-ink bg-ink text-cream" : "border-ink/20 bg-white/60 hover:border-ink"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>
      <label htmlFor="model" className="sr-only">
        Modelo
      </label>
      <select
        id="model"
        value={model}
        onChange={(e) => onModel(e.target.value)}
        className="mt-3 w-full rounded-2xl border-2 border-ink/20 bg-white/80 px-4 py-3 font-semibold"
      >
        <option value="">Elige tu modelo de {brand.name}…</option>
        {brand.models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <details className="mt-3 rounded-2xl bg-lavender-soft/70 px-4 py-3 text-sm">
        <summary className="cursor-pointer font-bold">¿No sabes cuál es tu modelo?</summary>
        <div className="mt-2 space-y-2 text-ink-soft">
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
    </fieldset>
  );
}

export function FinishPicker({ value, onChange }: { value: FinishId; onChange: (f: FinishId) => void }) {
  const group = (holo: boolean) => finishes.filter((f) => f.holo === holo);
  const card = (f: (typeof finishes)[number]) => {
    const active = f.id === value;
    return (
      <button
        key={f.id}
        type="button"
        role="radio"
        aria-checked={active}
        onClick={() => onChange(f.id)}
        className={`group overflow-hidden rounded-2xl border-2 bg-white/80 text-left transition ${
          active ? "border-ink shadow-soft" : "border-ink/15 hover:border-ink/50"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={f.thumb} alt="" className="aspect-[4/3] w-full object-cover" />
        <div className="px-3 py-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-sm font-bold">{f.name}</span>
            {f.holo ? (
              <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-bold">+{eur(HOLO_EXTRA)}</span>
            ) : (
              <span className="text-[11px] font-semibold text-ink-soft">Incluido</span>
            )}
          </div>
        </div>
      </button>
    );
  };
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-soft">2 · Acabado</legend>
      <div role="radiogroup" aria-label="Acabado" className="space-y-3">
        <div className="grid grid-cols-2 gap-3">{group(false).map(card)}</div>
        <p className="pt-1 text-xs font-bold uppercase tracking-wider text-ink-soft">Holográficos premium · +{eur(HOLO_EXTRA)}</p>
        <div className="grid grid-cols-2 gap-3">{group(true).map(card)}</div>
      </div>
    </fieldset>
  );
}
