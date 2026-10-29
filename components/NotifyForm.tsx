"use client";

import { useState } from "react";

export function NotifyForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="font-bold text-ink">¡Apuntado! Te avisaremos cuando llegue 🤍 (demo)</p>;
  return (
    <form
      className="flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="notify" className="sr-only">
        Correo electrónico
      </label>
      <input id="notify" type="email" required placeholder="tu@correo.com" className="min-w-0 flex-1 rounded-full border-2 border-ink/20 bg-white px-5 py-3" />
      <button className="btn btn-primary !px-5">Avísame</button>
    </form>
  );
}
