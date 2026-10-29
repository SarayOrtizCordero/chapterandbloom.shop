"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { brands, eur, finishById, finishes, HOLO_EXTRA, type FinishId, type Img } from "@/lib/data";
import { optimized } from "@/lib/img";

/* ---------- Recorte cuadrado de la skin (miniaturas del carrito) ---------- */

const crops = {
  spread: { x: 0.12, y: 0.35, s: 0.33 },
  photo: { x: 0.4, y: 0.3, s: 0.32 },
} as const;

export function CropBox({ img, className = "", children }: { img: Img; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative aspect-square overflow-hidden bg-white ${className}`}>
      {img.kind === "plain" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={optimized(img.src, 640)} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={optimized(img.src, 640)}
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

/* ---------- Selector de dispositivo ---------- */

const Chevron = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Check = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint" aria-hidden>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#312a44" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  </span>
);

export function ModelPicker({ model, onModel, error }: { model: string; onModel: (m: string) => void; error?: boolean }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const listId = useId();

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    return brands
      .map((b) => ({ ...b, models: !term || b.name.toLowerCase().includes(term) ? b.models : b.models.filter((m) => m.toLowerCase().includes(term)) }))
      .filter((g) => g.models.length > 0);
  }, [q]);
  const flat = useMemo(() => groups.flatMap((g) => g.models), [groups]);
  const optId = (i: number) => `${listId}-opt-${i}`;
  const brandOfModel = brands.find((b) => b.models.includes(model))?.name;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    search.current?.focus();
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(optId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  const openList = () => {
    setQ("");
    setActive(Math.max(0, brands.flatMap((b) => b.models).indexOf(model)));
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    button.current?.focus();
  };
  const choose = (m: string) => {
    onModel(m);
    close();
  };

  const onSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(flat.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[active]) choose(flat[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <div ref={root}>
      <span id={`${listId}-label`} className="mb-2 block font-bold">
        Dispositivo <span className="font-normal text-ink-soft">(obligatorio)</span>
      </span>
      <div className="relative">
        <button
          ref={button}
          id="model"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${listId}-label model`}
          aria-invalid={error}
          onClick={() => (open ? close() : openList())}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !open) {
              e.preventDefault();
              openList();
            }
          }}
          className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-3 text-left transition ${
            open ? "border-ink ring-4 ring-mint/70" : error ? "border-rose-deep ring-4 ring-rose/60" : "border-ink/15 hover:border-ink/40"
          }`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#312a44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
              <path d="M8.5 7.5h7M8.5 11h7M8.5 14.5h4" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            {model ? (
              <>
                <span className="block truncate font-bold">{model}</span>
                <span className="block text-xs text-ink-soft">{brandOfModel}</span>
              </>
            ) : (
              <>
                <span className="block font-semibold">Selecciona tu dispositivo</span>
                <span className="block text-xs text-ink-soft">Kindle, Kobo, Onyx Boox, Xteink o Bigme</span>
              </>
            )}
          </span>
          <Chevron open={open} />
        </button>

        {open && (
          <div className="absolute inset-x-0 z-30 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-pop">
            <div className="border-b border-ink/10 p-3">
              <div className="relative">
                <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  ref={search}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onSearchKey}
                  role="combobox"
                  aria-expanded
                  aria-controls={listId}
                  aria-activedescendant={flat[active] ? optId(active) : undefined}
                  aria-label="Buscar modelo"
                  placeholder="Busca tu modelo…"
                  className="w-full rounded-xl bg-lavender-soft py-2.5 pl-10 pr-3 text-sm placeholder:text-ink-soft"
                />
              </div>
            </div>
            <ul id={listId} role="listbox" aria-label="Dispositivos" className="max-h-72 overflow-y-auto pb-2">
              {groups.map((g) => (
                <li key={g.id} role="presentation">
                  <p className="sticky top-0 z-10 bg-mint-soft px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-soft">{g.name}</p>
                  <ul role="presentation">
                    {g.models.map((m) => {
                      const i = flat.indexOf(m);
                      const selected = m === model;
                      return (
                        <li
                          key={m}
                          id={optId(i)}
                          role="option"
                          aria-selected={selected}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => choose(m)}
                          className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm ${i === active ? "bg-lavender-soft" : ""} ${selected ? "font-bold" : ""}`}
                        >
                          {m}
                          {selected && <Check />}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
              {groups.length === 0 && <li className="px-4 py-6 text-center text-sm text-ink-soft">No encontramos ese modelo. Escríbenos por Instagram y lo miramos 🤍</li>}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm font-bold text-rose-deep">
          Elige tu modelo para continuar.
        </p>
      )}
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold underline decoration-mint decoration-2 underline-offset-4">¿No estás segura? Encuentra tu modelo</summary>
        <div className="mt-2 space-y-1 rounded-xl bg-mint-soft p-4 text-ink-soft">
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

/* ---------- Selector de acabado ---------- */

function FinishOption({ id, active, onSelect }: { id: FinishId; active: boolean; onSelect: (f: FinishId) => void }) {
  const f = finishById(id);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => onSelect(id)}
      className={`flex items-center gap-3 rounded-2xl border-2 bg-white p-2.5 text-left transition ${
        active ? "border-ink ring-4 ring-mint/70" : "border-ink/10 hover:border-ink/40"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={f.thumb} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block font-bold leading-tight">{f.name}</span>
        <span className="block text-xs text-ink-soft">{f.short}</span>
      </span>
      {active ? <Check /> : f.holo ? <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-bold">+{eur(HOLO_EXTRA)}</span> : null}
    </button>
  );
}

export function FinishPicker({ value, onChange }: { value: FinishId; onChange: (f: FinishId) => void }) {
  const current = finishById(value);
  const included = finishes.filter((f) => !f.holo);
  const holo = finishes.filter((f) => f.holo);
  return (
    <fieldset>
      <legend className="mb-3 font-bold">
        Acabado: <span className="font-normal">{current.name}</span>
        {current.holo && <span className="ml-2 rounded-full bg-mint px-2.5 py-0.5 align-middle text-xs font-bold">+{eur(HOLO_EXTRA)}</span>}
      </legend>
      <div role="radiogroup" aria-label="Acabado" className="space-y-4">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-soft">Incluidos</p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {included.map((f) => (
              <FinishOption key={f.id} id={f.id} active={f.id === value} onSelect={onChange} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-soft">
            Holográficos premium <span className="text-ink">· +{eur(HOLO_EXTRA)}</span>
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {holo.map((f) => (
              <FinishOption key={f.id} id={f.id} active={f.id === value} onSelect={onChange} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-soft">ⓘ La vista previa es orientativa: el acabado real puede verse ligeramente distinto en persona.</p>
    </fieldset>
  );
}
