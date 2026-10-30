// Convierte las muestras de acabado (public/brand/finish-*.jpg, sobre fondo beige) en texturas
// neutras (gris medio) que se pueden mezclar sobre cualquier skin con mix-blend-mode.
// Uso: node scripts/make-finish-textures.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("public/brand");
const out = path.resolve("public/finish");
await mkdir(out, { recursive: true });

// Zona sin el dibujo de flores (a la izquierda de cada muestra)
const regions = {
  stars: { left: 78, top: 0, width: 122, height: 165 },
  rainbow: { left: 78, top: 0, width: 122, height: 165 },
  glass: { left: 78, top: 0, width: 122, height: 165 },
  dots: { left: 78, top: 0, width: 122, height: 165 },
};
const GAIN = 2.4;

const median = (arr) => {
  const s = Uint8Array.from(arr).sort();
  return s[s.length >> 1];
};

for (const [name, region] of Object.entries(regions)) {
  const { data, info } = await sharp(path.join(src, `finish-${name}.jpg`)).extract(region).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const base = [0, 1, 2].map((c) => median(Array.from({ length: info.width * info.height }, (_, i) => data[i * ch + c])));
  const outBuf = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    for (let c = 0; c < 3; c++) {
      const v = 128 + (data[i * ch + c] - base[c]) * GAIN;
      outBuf[i * 3 + c] = Math.max(0, Math.min(255, v));
    }
  }
  await sharp(outBuf, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize({ width: 480, kernel: "lanczos3" })
    .webp({ quality: 85 })
    .toFile(path.join(out, `${name}.webp`));
  console.log(name, "base", base.join(","));
}
