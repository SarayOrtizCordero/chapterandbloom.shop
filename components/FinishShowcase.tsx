import { eur, finishes, HOLO_EXTRA } from "@/lib/data";
import { FinishFx } from "./finish";
import { Reveal } from "./Reveal";

export function FinishShowcase() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {finishes.map((f, i) => (
        <Reveal key={f.id} delay={i * 0.09}>
          <article className="group h-full rounded-3xl bg-lavender p-3 transition duration-300 hover:-translate-y-1.5 hover:shadow-pop">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.thumb} alt={`Muestra del acabado ${f.name}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <FinishFx finish={f.id} animate />
            </div>
            <div className="px-1 pb-1 pt-3">
              <h3 className="font-display text-lg font-bold leading-tight">{f.name}</h3>
              <p className="mt-0.5 text-xs text-ink/70">{f.short}</p>
              <p className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${f.holo ? "bg-mint" : "bg-cream"}`}>
                {f.holo ? `+${eur(HOLO_EXTRA)}` : "Incluido"}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
