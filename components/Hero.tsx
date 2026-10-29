"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Photo } from "./Photo";

const slides = [
  {
    kicker: "Skins para e-readers",
    title: "Dale un nuevo capítulo a tu e-reader",
    text: "Diseños originales para Kindle, Kobo, Onyx Boox, Xteink y Bigme. Elige tu modelo y tu acabado favorito.",
    cta: { label: "Ver skins", href: "/tienda?cat=skins" },
    cta2: { label: "Ver inserts", href: "/tienda?cat=inserts" },
    image: "/brand/skins/Lazos-Rosa-Coquette.jpeg",
  },
  {
    kicker: "Marcapáginas y pegatinas",
    title: "Tus personajes favoritos, en tu libro",
    text: "Marcapáginas magnéticos desde 3,50 € y packs de 4 hojas de pegatinas por 5 €.",
    cta: { label: "Ver marcapáginas", href: "/tienda?cat=marcapaginas-magneticos" },
    cta2: { label: "Ver pegatinas", href: "/tienda?cat=pegatinas" },
    image: "/brand/marcapaginas-magneticos/principe-cruel/los-habitantes-del-aire.jpeg",
  },
] as const;

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 7000);
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
            className={`bg-lavender-soft transition-opacity duration-700 ${k === i ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
              <div className="space-y-5">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">{s.kicker}</p>
                <h1 className="font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">{s.title}</h1>
                <p className="max-w-md text-lg text-ink-soft">{s.text}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href={s.cta.href} className="btn btn-primary" tabIndex={k === i ? 0 : -1}>
                    {s.cta.label}
                  </Link>
                  <Link href={s.cta2.href} className="btn btn-ghost" tabIndex={k === i ? 0 : -1}>
                    {s.cta2.label}
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-white md:max-w-lg">
                <Photo src={s.image} size={1100} alt="" fill priority sizes="(min-width: 768px) 512px, 90vw" className="object-cover" />
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
            className={`h-2 rounded-full transition-all ${k === i ? "w-7 bg-ink" : "w-2 bg-ink/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
