import type { FinishId } from "@/lib/data";

/** Efectos de acabado dibujados en SVG, sobre un lienzo de 288 × 400. Las animaciones están en globals.css (.fx-anim). */
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
      <linearGradient id={`${uid}-band`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.62" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${uid}-rainbow`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0.12" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.26" stopColor="#ffb3c7" stopOpacity="0.32" />
        <stop offset="0.38" stopColor="#ffe9a8" stopOpacity="0.36" />
        <stop offset="0.5" stopColor="#b6f2c9" stopOpacity="0.36" />
        <stop offset="0.62" stopColor="#a9d8ff" stopOpacity="0.36" />
        <stop offset="0.74" stopColor="#d3b8ff" stopOpacity="0.32" />
        <stop offset="0.88" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </>
  );
}

/** Banda de brillo diagonal; en modo animado cruza la superficie. */
function Shine({ uid, strength = 1 }: { uid: string; strength?: number }) {
  return (
    <g className="fx-sweep" opacity={strength}>
      <rect x="150" y="-60" width="96" height="520" fill={`url(#${uid}-band)`} transform="skewX(-18)" />
    </g>
  );
}

const sparkle = (s: number) =>
  `M0,${-s} Q${s * 0.12},${-s * 0.12} ${s},0 Q${s * 0.12},${s * 0.12} 0,${s} Q${-s * 0.12},${s * 0.12} ${-s},0 Q${-s * 0.12},${-s * 0.12} 0,${-s}Z`;

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
      return <Shine uid={uid} />;
    case "stars": {
      const stars = Array.from({ length: 30 }, (_, i) => {
        const x = r() * FW;
        const y = r() * FH;
        const s = 3 + r() * 6;
        return (
          <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <path
              className="fx-twinkle"
              style={{ animationDelay: `${((i * 0.43) % 2.6).toFixed(2)}s` }}
              d={sparkle(s)}
              fill={pastel[i % pastel.length]}
              stroke="#b9a9d6"
              strokeOpacity="0.5"
              strokeWidth="0.4"
            />
          </g>
        );
      });
      return (
        <>
          <Shine uid={uid} strength={0.55} />
          {stars}
        </>
      );
    }
    case "rainbow":
      return (
        <>
          <g className="fx-drift">
            <rect x="-90" width={FW + 180} height={FH} fill={`url(#${uid}-rainbow)`} />
          </g>
          <Shine uid={uid} strength={0.4} />
        </>
      );
    case "glass": {
      const shards = Array.from({ length: 26 }, (_, i) => {
        const cx = r() * FW;
        const cy = r() * FH;
        const pts = Array.from({ length: 3 }, () => `${(cx + (r() - 0.5) * 90).toFixed(0)},${(cy + (r() - 0.5) * 90).toFixed(0)}`).join(" ");
        return (
          <polygon
            key={i}
            className="fx-glint"
            style={{ animationDelay: `${((i * 0.31) % 3).toFixed(2)}s` }}
            points={pts}
            fill={pastel[i % pastel.length]}
            opacity={0.2 + r() * 0.25}
            stroke="#ffffff"
            strokeOpacity="0.7"
            strokeWidth="0.7"
          />
        );
      });
      return <>{shards}</>;
    }
    case "dots": {
      const dots = Array.from({ length: 60 }, (_, i) => (
        <circle
          key={i}
          className="fx-glint"
          style={{ animationDelay: `${((i * 0.23) % 3).toFixed(2)}s` }}
          cx={(r() * FW).toFixed(1)}
          cy={(r() * FH).toFixed(1)}
          r={(1.1 + r() * 2).toFixed(1)}
          fill={pastel[i % pastel.length]}
          stroke="#b9a9d6"
          strokeOpacity="0.4"
          strokeWidth="0.3"
        />
      ));
      return (
        <>
          <Shine uid={uid} strength={0.4} />
          {dots}
        </>
      );
    }
  }
}

/** Capa que se superpone a cualquier imagen (ocupa todo el contenedor padre). */
export function FinishFx({ finish, animate = false, className = "" }: { finish: FinishId; animate?: boolean; className?: string }) {
  const uid = `fx-${finish}`;
  return (
    <svg
      viewBox={`0 0 ${FW} ${FH}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${animate ? "fx-anim" : ""} ${className}`}
      aria-hidden
    >
      <defs>
        <FinishDefs uid={uid} />
      </defs>
      <FinishShapes finish={finish} uid={uid} />
    </svg>
  );
}
