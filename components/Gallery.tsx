"use client";

import { useState } from "react";
import type { FinishId, Img } from "@/lib/data";
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
  const idx = Math.min(i, images.length - 1);
  const main = images[idx];
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
        {finish && main.kind === "spread" && (
          /* Capa de acabado solo sobre la zona donde está la skin */
          <div className="absolute overflow-hidden rounded-[3%]" style={{ left: "9%", top: "16%", width: "84%", height: "65%" }}>
            <FinishFx finish={finish} animate />
          </div>
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
