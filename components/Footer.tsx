"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="Chapter & Bloom" className="h-24 w-auto" />
          <p className="mt-3 text-sm text-cream/75">Skins e inserts con diseños originales para tu e-reader.</p>
          <a
            href="https://www.instagram.com/chapterandbloom.shop/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm font-semibold hover:bg-cream/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            @chapterandbloom.shop
          </a>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Tienda</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li><Link href="/tienda?cat=skins" className="hover:text-mint">Skins</Link></li>
            <li><Link href="/tienda?cat=inserts" className="hover:text-mint">Inserts</Link></li>
            <li><Link href="/personalizadas" className="hover:text-mint">Skins personalizadas</Link></li>
            <li><Link href="/tienda" className="hover:text-mint">Todo</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Ayuda</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>Envíos</li>
            <li>Devoluciones</li>
            <li>¿Cuál es mi modelo?</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Novedades y sorteos</h3>
          {sent ? (
            <p className="mt-3 text-sm text-mint">¡Gracias! Te avisaremos de las novedades 🤍 (demo)</p>
          ) : (
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="nl-email">Correo electrónico</label>
              <input id="nl-email" type="email" required placeholder="tu@correo.com" className="min-w-0 flex-1 rounded-full bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/70" />
              <button className="btn btn-mint !px-4 !py-2.5">Unirme</button>
            </form>
          )}
          <p className="mt-6 text-xs uppercase tracking-wider text-cream/60">Métodos de pago (demo)</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
            {["Visa", "Mastercard", "PayPal", "Bizum", "Apple Pay"].map((p) => (
              <span key={p} className="rounded-md bg-cream/10 px-2.5 py-1">{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/60">
        © 2026 Chapter & Bloom · Demo de diseño, los pedidos no son reales
      </div>
    </footer>
  );
}
