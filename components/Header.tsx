"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[]; pill?: boolean };

const nav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Skins", href: "/tienda?cat=skins" },
  { label: "Inserts", href: "/tienda?cat=inserts" },
  {
    label: "Marcapáginas",
    href: "/tienda?cat=marcapaginas-magneticos",
    children: [
      { label: "Magnéticos", href: "/tienda?cat=marcapaginas-magneticos" },
      { label: "Tradicionales", href: "/tienda?cat=marcapaginas" },
    ],
  },
  {
    label: "Accesorios",
    href: "/tienda?cat=pop-sockets",
    children: [
      { label: "Pop sockets", href: "/tienda?cat=pop-sockets" },
      { label: "Vasos de vidrio", href: "/tienda?cat=vasos" },
    ],
  },
  { label: "Skins personalizadas", href: "/personalizadas", pill: true },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink px-4 py-2 text-center text-xs font-medium tracking-wide text-cream sm:text-sm">
        Diseños originales para tu e-reader 🤍 Skins desde 6 € · Acabados holográficos por solo +1 €
      </div>
      <div className="border-b border-ink/10 bg-lavender">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            className="-ml-2 rounded-full p-2 lg:hidden"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          <Link href="/" aria-label="Chapter & Bloom, inicio" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Chapter & Bloom" className="h-16 w-auto sm:h-[84px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {nav.map((n) => (
              <div key={n.label} className="group relative">
                <Link
                  href={n.href}
                  className={
                    n.pill
                      ? "ml-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition hover:bg-orchid"
                      : "rounded-full px-3 py-2 text-sm font-bold transition hover:bg-cream/60"
                  }
                >
                  {n.label}
                  {n.children && <span aria-hidden> ▾</span>}
                </Link>
                {n.children && (
                  <div className="invisible absolute left-0 top-full min-w-48 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl bg-cream p-2 shadow-pop">
                      {n.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block rounded-xl px-4 py-2 text-sm font-semibold hover:bg-lavender-soft">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link href="/tienda#buscar" className="rounded-full p-2.5 transition hover:bg-cream/60" aria-label="Buscar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </Link>
            <button className="relative rounded-full p-2.5 transition hover:bg-cream/60" aria-label={`Abrir carrito, ${count} artículos`} onClick={() => setOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orchid px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {menu && (
          <nav className="border-t border-ink/10 bg-cream px-4 py-3 lg:hidden" aria-label="Móvil">
            {nav.map((n) => (
              <div key={n.label}>
                <Link href={n.children ? n.children[0].href : n.href} onClick={() => setMenu(false)} className="block rounded-xl px-3 py-3 font-bold hover:bg-lavender-soft">
                  {n.label}
                </Link>
                {n.children?.map((c) => (
                  <Link key={c.href} href={c.href} onClick={() => setMenu(false)} className="block rounded-xl py-2 pl-8 pr-3 text-sm font-semibold text-ink-soft hover:bg-lavender-soft">
                    {c.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
