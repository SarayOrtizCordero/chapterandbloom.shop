import type { CategoryId } from "@/lib/data";

/** Ilustraciones sencillas para las categorías "Próximamente" (hasta tener fotos reales). */
export function CategoryArt({ id, className = "" }: { id: CategoryId; className?: string }) {
  const common = { viewBox: "0 0 200 200", className: `h-[80%] drop-shadow-xl` };
  if (id === "marcapaginas-magneticos" || id === "marcapaginas") {
    const magnetic = id === "marcapaginas-magneticos";
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg {...common} role="img" aria-label="Marcapáginas">
          <g transform="rotate(-8 100 100)">
            <rect x="62" y="14" width="76" height="172" rx="8" fill="#b8e8ee" />
            <rect x="62" y="14" width="76" height="172" rx="8" fill="none" stroke="#312a44" strokeOpacity=".15" />
            <circle cx="100" cy="64" r="16" fill="#d7c5d2" />
            <path d="M100 50 L103 61 L114 64 L103 67 L100 78 L97 67 L86 64 L97 61Z" fill="#312a44" />
            <rect x="76" y="110" width="48" height="6" rx="3" fill="#312a44" opacity=".7" />
            <rect x="84" y="124" width="32" height="6" rx="3" fill="#312a44" opacity=".35" />
            {magnetic && (
              <>
                <rect x="52" y="22" width="18" height="30" rx="4" fill="#312a44" />
                <rect x="130" y="22" width="18" height="30" rx="4" fill="#312a44" />
              </>
            )}
            {!magnetic && <path d="M100 186 L100 200 M92 200 L108 200" stroke="#a9809b" strokeWidth="3" />}
          </g>
        </svg>
      </div>
    );
  }
  if (id === "pop-sockets") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg {...common} role="img" aria-label="Pop socket">
          <ellipse cx="100" cy="168" rx="44" ry="8" fill="#312a44" opacity=".12" />
          <circle cx="100" cy="92" r="62" fill="#cdc4d7" />
          <circle cx="100" cy="92" r="62" fill="none" stroke="#fff" strokeWidth="5" strokeOpacity=".7" />
          <g transform="translate(100 92)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-20" rx="12" ry="20" fill="#fff" transform={`rotate(${a})`} />
            ))}
            <circle r="8" fill="#f6e7a8" />
          </g>
        </svg>
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg {...common} role="img" aria-label="Vaso de vidrio">
        <path d="M58 30 H142 L134 172 Q133 182 123 182 H77 Q67 182 66 172Z" fill="#dcf3f6" fillOpacity=".75" stroke="#fff" strokeWidth="4" />
        <path d="M64 92 H136 L132 168 Q131 176 123 176 H77 Q69 176 68 168Z" fill="#d7c5d2" />
        <g transform="translate(100 134)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-10" rx="6" ry="10" fill="#fff" transform={`rotate(${a})`} />
          ))}
          <circle r="4" fill="#312a44" />
        </g>
        <path d="M72 40 L76 150" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeOpacity=".7" />
      </svg>
    </div>
  );
}
