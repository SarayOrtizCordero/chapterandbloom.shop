import type { FinishId } from "@/lib/data";

/** Efectos de acabado dibujados en SVG, sobre un lienzo de 288 × 400. */
export const FW = 288;
export const FH = 400;

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pastel = ["#fff6b0", "#ffd1f0", "#bfe9ff", "#d9c8ff", "#ffffff"];

export function FinishDefs({ uid }: { uid: string }) {
  return (
    <>
      <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0.28" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.4" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.66" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.74" stopColor="#fff" stopOpacity="0.32" />
        <stop offset="0.82" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${uid}-rainbow`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0.15" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.28" stopColor="#ffb3c7" stopOpacity="0.55" />
        <stop offset="0.38" stopColor="#ffe9a8" stopOpacity="0.6" />
        <stop offset="0.48" stopColor="#b6f2c9" stopOpacity="0.6" />
        <stop offset="0.58" stopColor="#a9d8ff" stopOpacity="0.6" />
        <stop offset="0.68" stopColor="#d3b8ff" stopOpacity="0.55" />
        <stop offset="0.82" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </>
  );
}

export function FinishShapes({ finish, uid }: { finish: FinishId; uid: string }) {
  const r = rng(7);
  switch (finish) {
    case "matte":
      return (
        <>
          <rect width={FW} height={FH} filter={`url(#${uid}-grain)`} opacity="0.12" style={{ mixBlendMode: "multiply" }} />
          <rect width={FW} height={FH} fill="#ffffff" opacity="0.05" />
        </>
      );
    case "glossy":
      return (
        <>
          <rect width={FW} height={FH} fill={`url(#${uid}-gloss)`} />
          <rect width={FW} height={FH} fill="#ffffff" opacity="0.06" />
        </>
      );
    case "stars": {
      const stars = Array.from({ length: 34 }, (_, i) => {
        const x = r() * FW;
        const y = r() * FH;
        const s = 3 + r() * 6;
        return (
          <path
            key={i}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            d={`M0,${-s} Q${s * 0.12},${-s * 0.12} ${s},0 Q${s * 0.12},${s * 0.12} 0,${s} Q${-s * 0.12},${s * 0.12} ${-s},0 Q${-s * 0.12},${-s * 0.12} 0,${-s}Z`}
            fill={pastel[i % pastel.length]}
            opacity="0.95"
            stroke="#b9a9d6"
            strokeOpacity="0.5"
            strokeWidth="0.4"
          />
        );
      });
      return (
        <>
          <rect width={FW} height={FH} fill={`url(#${uid}-gloss)`} opacity="0.5" />
          {stars}
        </>
      );
    }
    case "rainbow":
      return (
        <>
          <rect width={FW} height={FH} fill={`url(#${uid}-rainbow)`} />
          <rect width={FW} height={FH} fill={`url(#${uid}-gloss)`} opacity="0.35" />
        </>
      );
    case "glass": {
      const shards = Array.from({ length: 26 }, (_, i) => {
        const cx = r() * FW;
        const cy = r() * FH;
        const pts = Array.from({ length: 3 }, () => `${(cx + (r() - 0.5) * 90).toFixed(0)},${(cy + (r() - 0.5) * 90).toFixed(0)}`).join(" ");
        return (
          <polygon key={i} points={pts} fill={pastel[i % pastel.length]} opacity={0.2 + r() * 0.25} stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.7" />
        );
      });
      return <>{shards}</>;
    }
    case "dots": {
      const dots = Array.from({ length: 60 }, (_, i) => (
        <circle key={i} cx={(r() * FW).toFixed(1)} cy={(r() * FH).toFixed(1)} r={(1.1 + r() * 2).toFixed(1)} fill={pastel[i % pastel.length]} stroke="#b9a9d6" strokeOpacity="0.4" strokeWidth="0.3" />
      ));
      return (
        <>
          <rect width={FW} height={FH} fill={`url(#${uid}-gloss)`} opacity="0.35" />
          {dots}
        </>
      );
    }
  }
}

/** Capa que se superpone a cualquier imagen (ocupa todo el contenedor padre). */
export function FinishFx({ finish, className = "" }: { finish: FinishId; className?: string }) {
  const uid = `fx-${finish}`;
  return (
    <svg
      viewBox={`0 0 ${FW} ${FH}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    >
      <defs>
        <FinishDefs uid={uid} />
      </defs>
      <FinishShapes finish={finish} uid={uid} />
    </svg>
  );
}
