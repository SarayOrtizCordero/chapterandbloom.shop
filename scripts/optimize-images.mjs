// Genera versiones WebP ligeras de las imágenes de producto de public/brand → public/img.
// Uso: node scripts/optimize-images.mjs   (ejecútalo cada vez que añadas o cambies fotos)
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/brand");
const out = path.resolve("public/img");
const sizes = [640, 1100];
const skip = /^(finishes|models|logo|finish-.*)\./i;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(e.name) && !skip.test(e.name)) yield p;
  }
}

let n = 0;
for await (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\.[^.]+$/, "");
  await mkdir(path.dirname(path.join(out, rel)), { recursive: true });
  for (const w of sizes) {
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(out, `${rel}-${w}.webp`));
  }
  n++;
}
console.log(`${n} imágenes optimizadas en public/img`);
