"use client";

import { useEffect, useRef, useState } from "react";
import { finishById, type FinishId, type Img } from "@/lib/data";
import { FinishFx } from "./finish";
import { Photo } from "./Photo";

export function Gallery({
  images,
  alt,
  finish,
  portrait = false,
}: {
  images: Img[];
  alt: string;
  finish?: FinishId;
  portrait?: boolean;
}) {
  const [i, setI] = useState(0);
  const [rendering, setRendering] = useState(false);
  const first = useRef(true);
  const idx = Math.min(i, images.length - 1);
  const main = images[idx];

  // Al cambiar de acabado: "generando vista previa…" un instante y luego "vista previa"
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setRendering(true);
    const t = setTimeout(() => setRendering(false), 650);
    return () => clearTimeout(t);
  }, [finish]);

  const showFx = finish && main.kind === "spread";

  return (
    <div>
      <div className={`relative overflow-hidden rounded-3xl bg-white ${portrait ? "aspect-[4/5]" : "aspect-square"}`}>
        {/* Todas las imágenes están montadas: al cambiar solo se alterna la visibilidad (sin esperas) */}
        {images.map((img, k) => (
          <Photo
            key={img.src}
            src={img.src}
            size={1100}
            alt={k === idx ? alt : ""}
            fill
            priority={k === 0}
            sizes="(min-width: 1024px) 560px, 100vw"
            aria-hidden={k !== idx}
            className={`object-cover transition-opacity duration-300 ${k === idx ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {showFx && (
          /* Capa de acabado solo sobre la zona donde está la skin; entra con un fundido */
          <div
            key={finish}
            className={`fx-in absolute overflow-hidden rounded-[3%] ${rendering ? "opacity-60" : ""}`}
            style={{ left: "9%", top: "16%", width: "84%", height: "65%" }}
          >
            <FinishFx finish={finish} animate />
          </div>
        )}

        {showFx && (
          <p
            role="status"
            className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-ink/15 bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-soft"
          >
            <span className={`h-2 w-2 rounded-full bg-mint ring-2 ring-ink/20 ${rendering ? "animate-pulse" : ""}`} aria-hidden />
            {finishById(finish).name} · {rendering ? "generando vista previa…" : "vista previa"}
          </p>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, k) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setI(k)}
                aria-label={`Ver imagen ${k + 1}`}
                aria-current={k === idx}
                className={`relative block h-20 w-20 overflow-hidden rounded-xl border-2 bg-white transition ${k === idx ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <Photo src={img.src} size={640} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
