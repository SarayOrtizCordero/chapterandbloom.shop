import type { ReactNode } from "react";
import { designById, type Design, type FinishId, type Motif } from "@/lib/data";

const W = 288;
const H = 400;

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

function motifShape(m: Motif, s: number, color: string, alt: string): ReactNode {
  switch (m) {
    case "flower":
      return (
        <g>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy={-s * 0.55} rx={s * 0.38} ry={s * 0.55} fill={color} transform={`rotate(${a})`} opacity="0.95" />
          ))}
          <circle r={s * 0.28} fill={alt} />
        </g>
      );
    case "star":
      return (
        <path
          d={`M0,${-s} Q${s * 0.12},${-s * 0.12} ${s},0 Q${s * 0.12},${s * 0.12} 0,${s} Q${-s * 0.12},${s * 0.12} ${-s},0 Q${-s * 0.12},${-s * 0.12} 0,${-s}Z`}
          fill={color}
        />
      );
    case "leaf":
      return (
        <g>
          <path
            d={`M0,${s} C${s * 0.9},${s * 0.3} ${s * 0.9},${-s * 0.5} 0,${-s} C${-s * 0.9},${-s * 0.5} ${-s * 0.9},${s * 0.3} 0,${s}Z`}
            fill={color}
          />
          <path d={`M0,${s} L0,${-s * 0.6}`} stroke={alt} strokeWidth="1" opacity="0.6" />
        </g>
      );
    case "moon":
      return <path d={`M0,${-s} A${s} ${s} 0 1 0 0,${s} A${s * 0.72} ${s * 0.72} 0 1 1 0,${-s}Z`} fill={color} />;
    case "heart":
      return (
        <path
          d={`M0,${s * 0.9} C${-s * 1.5},${-s * 0.2} ${-s * 0.8},${-s * 1.1} 0,${-s * 0.4} C${s * 0.8},${-s * 1.1} ${s * 1.5},${-s * 0.2} 0,${s * 0.9}Z`}
          fill={color}
        />
      );
    case "rose":
      return (
        <g>
          <circle r={s} fill={color} />
          <path d={`M${-s * 0.6},0 A${s * 0.6} ${s * 0.6} 0 0 1 ${s * 0.6},0`} stroke={alt} strokeWidth="1.3" fill="none" />
          <path d={`M${-s * 0.3},${s * 0.1} A${s * 0.3} ${s * 0.3} 0 1 1 ${s * 0.3},${s * 0.1}`} stroke={alt} strokeWidth="1.3" fill="none" />
          <circle r={s * 0.1} fill={alt} />
        </g>
      );
  }
}

function Motifs({ design }: { design: Design }) {
  const r = rng(design.seed);
  const cols = 4;
  const rows = 6;
  const cw = W / cols;
  const ch = H / rows;
  const items: ReactNode[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = (col + 0.5) * cw + (r() - 0.5) * cw * 0.55;
      const y = (row + 0.5) * ch + (r() - 0.5) * ch * 0.55;
      const s = 9 + r() * 12;
      const rot = r() * 360;
      const m = design.motifs[Math.floor(r() * design.motifs.length)];
      const c = design.accents[Math.floor(r() * design.accents.length)];
      const alt = design.accents[(design.accents.indexOf(c) + 1) % design.accents.length];
      items.push(
        <g key={`${row}-${col}`} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)})`}>
          {motifShape(m, s, c, alt)}
        </g>,
      );
    }
  }
  return <>{items}</>;
}

function Finish({ finish, uid }: { finish: FinishId; uid: string }) {
  const r = rng(7);
  const pastel = ["#fff6b0", "#ffd1f0", "#bfe9ff", "#d9c8ff", "#ffffff"];
  switch (finish) {
    case "matte":
      return (
        <>
          <rect width={W} height={H} filter={`url(#${uid}-grain)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
          <rect width={W} height={H} fill="#ffffff" opacity="0.05" />
        </>
      );
    case "glossy":
      return (
        <>
          <rect width={W} height={H} fill={`url(#${uid}-gloss)`} />
          <rect width={W} height={H} fill="#ffffff" opacity="0.06" />
        </>
      );
    case "stars": {
      const stars = Array.from({ length: 34 }, (_, i) => {
        const x = r() * W;
        const y = r() * H;
        const s = 2.5 + r() * 5.5;
        return (
          <path
            key={i}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            d={`M0,${-s} Q${s * 0.12},${-s * 0.12} ${s},0 Q${s * 0.12},${s * 0.12} 0,${s} Q${-s * 0.12},${s * 0.12} ${-s},0 Q${-s * 0.12},${-s * 0.12} 0,${-s}Z`}
            fill={pastel[i % pastel.length]}
            opacity="0.9"
            stroke="#fff"
            strokeWidth="0.4"
          />
        );
      });
      return (
        <>
          <rect width={W} height={H} fill={`url(#${uid}-gloss)`} opacity="0.5" />
          {stars}
        </>
      );
    }
    case "rainbow":
      return (
        <>
          <rect width={W} height={H} fill={`url(#${uid}-rainbow)`} style={{ mixBlendMode: "screen" }} />
          <rect width={W} height={H} fill={`url(#${uid}-gloss)`} opacity="0.35" />
        </>
      );
    case "glass": {
      const shards = Array.from({ length: 26 }, (_, i) => {
        const cx = r() * W;
        const cy = r() * H;
        const pts = Array.from({ length: 3 }, () => `${(cx + (r() - 0.5) * 90).toFixed(0)},${(cy + (r() - 0.5) * 90).toFixed(0)}`).join(" ");
        return (
          <polygon key={i} points={pts} fill={pastel[i % pastel.length]} opacity={0.18 + r() * 0.22} stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.6" />
        );
      });
      return <>{shards}</>;
    }
    case "dots": {
      const dots = Array.from({ length: 60 }, (_, i) => (
        <circle key={i} cx={(r() * W).toFixed(1)} cy={(r() * H).toFixed(1)} r={(0.9 + r() * 1.8).toFixed(1)} fill={pastel[i % pastel.length]} opacity="0.95" />
      ));
      return (
        <>
          <rect width={W} height={H} fill={`url(#${uid}-gloss)`} opacity="0.35" />
          {dots}
        </>
      );
    }
  }
}

export function Art({
  designId,
  finish = "glossy",
  variant = "skin",
  image,
  className = "",
}: {
  designId: string;
  finish?: FinishId;
  variant?: "skin" | "insert";
  image?: string | null;
  className?: string;
}) {
  const design = designById(designId);
  const uid = `a-${design.id}-${finish}-${variant}${image ? "-img" : ""}`;
  const inset = variant === "insert" ? 12 : 0;
  const rx = variant === "insert" ? 6 : 24;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`${design.name}, acabado ${finish}`}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={design.bg[0]} />
          <stop offset="1" stopColor={design.bg[1]} />
        </linearGradient>
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
        <clipPath id={`${uid}-clip`}>
          <rect x={inset} y={inset} width={W - inset * 2} height={H - inset * 2} rx={rx} />
        </clipPath>
      </defs>
      {variant === "insert" && <rect width={W} height={H} rx="10" fill="#fffdfb" />}
      <g clipPath={`url(#${uid}-clip)`}>
        <rect width={W} height={H} fill={`url(#${uid}-bg)`} />
        {image ? (
          <image href={image} width={W} height={H} preserveAspectRatio="xMidYMid slice" />
        ) : (
          <Motifs design={design} />
        )}
        <Finish finish={finish} uid={uid} />
      </g>
      <rect x={inset} y={inset} width={W - inset * 2} height={H - inset * 2} rx={rx} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}
