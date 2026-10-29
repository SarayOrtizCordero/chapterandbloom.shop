"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Art } from "./Art";

const slides = [
  {
    kicker: "Skins para e-readers",
    title: "Dale un nuevo capítulo a tu e-reader",
    text: "Diseños originales para Kindle, Kobo, Onyx Boox, Xteink y Bigme. Elige tu modelo y tu acabado favorito.",
    cta: { label: "Ver skins", href: "/tienda?cat=skins" },
    cta2: { label: "Ver inserts", href: "/tienda?cat=inserts" },
    bg: "from-lavender to-lavender-soft",
    art: [
      { id: "jardin-de-medianoche", finish: "glossy", cls: "h-[78%] -rotate-6 -translate-x-8" },
      { id: "cerezos-y-libros", finish: "rainbow", cls: "h-[70%] rotate-6 translate-x-10 translate-y-6" },
    ],
  },
  {
    kicker: "Hecho a tu medida",
    title: "Diseña tu propia skin personalizada",
    text: "Sube tu imagen, elige modelo y acabado, y cuéntanos cómo lo imaginas. Desde 8 €.",
    cta: { label: "Crear la mía", href: "/personalizadas" },
    cta2: { label: "Ver acabados", href: "/#acabados" },
    bg: "from-mint to-mint-soft",
    art: [
      { id: "biblioteca-celestial", finish: "stars", cls: "h-[78%] rotate-3 -translate-x-6" },
      { id: "lavanda", finish: "glass", cls: "h-[66%] -rotate-6 translate-x-12 translate-y-8" },
    ],
  },
] as const;

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden">
        {slides.map((s, k) => (
          <div
            key={s.title}
            aria-hidden={k !== i}
            className={`bg-gradient-to-br ${s.bg} transition-opacity duration-700 ${k === i ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}
          >
            <div className="sparkle-bg absolute inset-0" />
            <div className="relative mx-auto grid min-h-[34rem] max-w-7xl items-center gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
              <div className="space-y-5">
                <span className="inline-block rounded-full bg-cream/80 px-4 py-1 text-xs font-bold uppercase tracking-wider">{s.kicker}</span>
                <h1 className="font-display text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">{s.title}</h1>
                <p className="max-w-lg text-lg text-ink-soft">{s.text}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href={s.cta.href} className="btn btn-primary">
                    {s.cta.label}
                  </Link>
                  <Link href={s.cta2.href} className="btn btn-ghost">
                    {s.cta2.label}
                  </Link>
                </div>
              </div>
              <div className="relative flex h-80 items-center justify-center md:h-[28rem]">
                {s.art.map((a) => (
                  <Art key={a.id} designId={a.id} finish={a.finish} className={`absolute drop-shadow-2xl ${a.cls}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((s, k) => (
          <button
            key={s.title}
            aria-label={`Ir a la diapositiva ${k + 1}`}
            aria-current={k === i}
            onClick={() => setI(k)}
            className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-ink" : "w-2.5 bg-ink/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
