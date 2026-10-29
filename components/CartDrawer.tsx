"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { eur, finishById } from "@/lib/data";
import { CartThumb } from "./CartThumb";

export function CartDrawer() {
  const { items, open, setOpen, subtotal, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-ink/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-label="Carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-pop transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-2xl font-bold">Tu carrito</h2>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-lavender-soft" aria-label="Cerrar carrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-xl">Tu carrito está vacío 🤍</p>
            <p className="text-ink-soft">Encuentra el diseño perfecto para tu e-reader.</p>
            <Link href="/tienda" onClick={() => setOpen(false)} className="btn btn-primary">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 rounded-2xl bg-white/70 p-3">
                  <CartThumb item={i} className="w-16 shrink-0 self-start" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold leading-tight">{i.name}</p>
                    {i.variant && <p className="text-xs text-ink-soft">{i.variant}</p>}
                    {i.model && <p className="text-xs text-ink-soft">{i.model}</p>}
                    {i.finish && <p className="text-xs text-ink-soft">Acabado: {finishById(i.finish).name}</p>}
                    {i.custom && (
                      <p className="truncate text-xs text-ink-soft">
                        {i.custom.files.length} imagen(es){i.custom.note ? " · con mensaje" : ""}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/20">
                        <button className="h-8 w-8 text-lg" aria-label="Quitar uno" onClick={() => setQty(i.id, i.qty - 1)}>
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                        <button className="h-8 w-8 text-lg" aria-label="Añadir uno" onClick={() => setQty(i.id, i.qty + 1)}>
                          +
                        </button>
                      </div>
                      <p className="font-bold">{eur(i.unitPrice * i.qty)}</p>
                    </div>
                  </div>
                  <button className="self-start rounded-full p-1 text-ink-soft hover:text-ink" aria-label={`Eliminar ${i.name}`} onClick={() => remove(i.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-ink/10 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="font-display text-2xl font-bold">{eur(subtotal)}</span>
              </div>
              <p className="text-xs text-ink-soft">Gastos de envío calculados al finalizar la compra. Esto es una demo: no se realiza ningún cobro.</p>
              <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Finalizar compra
              </Link>
              <button onClick={() => setOpen(false)} className="w-full text-center text-sm font-semibold underline underline-offset-4">
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
