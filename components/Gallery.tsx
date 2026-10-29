"use client";

import Image from "next/image";
import { useState } from "react";
import type { FinishId, Img } from "@/lib/data";
import { FinishFx } from "./finish";

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
        <Image src={main.src} alt={alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        {finish && main.kind === "spread" && (
          /* Capa de acabado solo sobre la zona donde está la skin */
          <div className="absolute overflow-hidden rounded-[3%]" style={{ left: "9%", top: "16%", width: "84%", height: "65%" }}>
            <FinishFx finish={finish} />
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
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
