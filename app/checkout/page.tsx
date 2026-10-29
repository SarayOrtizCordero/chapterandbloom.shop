"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { eur, finishById } from "@/lib/data";
import { CartThumb } from "@/components/CartThumb";

const field = "w-full rounded-2xl border-2 border-ink/60 bg-white/80 px-4 py-3";

function Field({ label, className = "", optional, ...input }: { label: string; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-ink-soft"> (opcional)</span>}
      </span>
      <input required={!optional} className={field} {...input} />
    </label>
  );
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [order, setOrder] = useState<string | null>(null);

  if (order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl" aria-hidden>
          🌸
        </p>
        <h1 className="font-display mt-4 text-4xl font-black">¡Gracias por tu pedido!</h1>
        <p className="mt-3 text-ink-soft">
          Pedido <strong className="text-ink">{order}</strong> registrado. Esto es una demo: no se ha realizado ningún cobro ni se enviará nada.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-black">Tu carrito está vacío</h1>
        <p className="mt-3 text-ink-soft">Añade algo bonito antes de finalizar la compra.</p>
        <Link href="/tienda" className="btn btn-primary mt-8">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-black sm:text-5xl">Finalizar compra</h1>
      <p className="mt-2 rounded-2xl bg-mint-soft px-4 py-2 text-sm font-semibold">Modo demo: el pago es simulado y no se guardan datos.</p>

      <form
        className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px]"
        onSubmit={(e) => {
          e.preventDefault();
          setOrder(`CB-${Math.floor(1000 + Math.random() * 9000)}`);
          clear();
        }}
      >
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold">Contacto</h2>
            <Field label="Correo electrónico" type="email" name="email" autoComplete="email" />
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold">Envío</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nombre" name="nombre" autoComplete="given-name" />
              <Field label="Apellidos" name="apellidos" autoComplete="family-name" />
            </div>
            <Field label="Dirección" name="direccion" autoComplete="street-address" />
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Código postal" name="cp" autoComplete="postal-code" inputMode="numeric" />
              <Field label="Ciudad" name="ciudad" autoComplete="address-level2" className="sm:col-span-2" />
            </div>
            <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" optional />
            <p className="text-xs text-ink-soft">Solo lo usamos si hay algún problema con la entrega.</p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold">Pago</h2>
            <div className="rounded-2xl border-2 border-dashed border-ink/30 bg-white/50 p-5 text-sm text-ink-soft">
              Aquí irá el pago real (por ejemplo, tarjeta, PayPal o Bizum). En esta demo basta con pulsar el botón.
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-3xl bg-white/70 p-6 lg:sticky lg:top-40">
          <h2 className="font-display text-2xl font-bold">Resumen</h2>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex gap-3">
                <div className="relative w-14 shrink-0 self-start">
                  <CartThumb item={i} />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-cream">{i.qty}</span>
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-bold leading-tight">{i.name}</p>
                  <p className="text-xs text-ink-soft">{[i.variant, i.model, i.finish && finishById(i.finish).name].filter(Boolean).join(" · ")}</p>
                </div>
                <p className="text-sm font-bold">{eur(i.unitPrice * i.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">{eur(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Envío</span>
              <span>Se calcula al pagar (demo)</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between border-t border-ink/10 pt-4">
            <span className="font-bold">Total</span>
            <span className="font-display text-3xl font-bold">{eur(subtotal)}</span>
          </div>
          <button className="btn btn-primary w-full !py-4 text-base">Realizar pedido (demo)</button>
        </aside>
      </form>
    </div>
  );
}
