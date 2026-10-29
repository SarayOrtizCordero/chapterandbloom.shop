"use client";

import { useRef, type ReactNode } from "react";

export function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-soft transition hover:bg-mint md:flex";
  return (
    <div className="relative" role="region" aria-label={label}>
      <button className={`${arrow} -left-3 lg:-left-5`} aria-label="Anterior" onClick={() => scroll(-1)}>
        ‹
      </button>
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6">
        {children}
      </div>
      <button className={`${arrow} -right-3 lg:-right-5`} aria-label="Siguiente" onClick={() => scroll(1)}>
        ›
      </button>
    </div>
  );
}
