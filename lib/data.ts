export type Motif = "flower" | "star" | "leaf" | "moon" | "heart" | "rose";

export type Design = {
  id: string;
  name: string;
  blurb: string;
  bg: [string, string];
  accents: string[];
  motifs: Motif[];
  seed: number;
};

export type FinishId = "matte" | "glossy" | "stars" | "rainbow" | "glass" | "dots";

export type Finish = {
  id: FinishId;
  name: string;
  desc: string;
  holo: boolean;
  thumb: string;
};

export const HOLO_EXTRA = 1;

export const finishes: Finish[] = [
  { id: "matte", name: "Mate", desc: "Suave, liso y sin reflejos", holo: false, thumb: "/brand/finish-matte.jpg" },
  { id: "glossy", name: "Brillante", desc: "Colores vibrantes con un brillo precioso", holo: false, thumb: "/brand/finish-glossy.jpg" },
  { id: "stars", name: "Estrellas", desc: "Holográfico con estrellitas", holo: true, thumb: "/brand/finish-stars.jpg" },
  { id: "rainbow", name: "Arcoíris", desc: "Holográfico con destellos arcoíris", holo: true, thumb: "/brand/finish-rainbow.jpg" },
  { id: "glass", name: "Vidrio roto", desc: "Holográfico con efecto cristal", holo: true, thumb: "/brand/finish-glass.jpg" },
  { id: "dots", name: "Puntitos", desc: "Holográfico con puntitos brillantes", holo: true, thumb: "/brand/finish-dots.jpg" },
];

export const finishById = (id: FinishId) => finishes.find((f) => f.id === id)!;

export type Brand = { id: string; name: string; models: string[] };

export const brands: Brand[] = [
  {
    id: "kindle",
    name: "Kindle",
    models: [
      "Kindle Paperwhite 7th Generation",
      "Kindle Paperwhite 10th Generation",
      "Kindle Paperwhite 11th Generation",
      "Kindle Paperwhite 12th Generation",
      "Kindle Colorsoft",
      "Kindle Basic 2022/2024 (11th Gen)",
      "Kindle Basic 10th Generation",
      "Kindle Oasis 9th Generation",
      "Kindle Oasis 10th Generation",
    ],
  },
  {
    id: "kobo",
    name: "Kobo",
    models: ["Kobo Clara Colour", "Kobo Clara BW", "Kobo Clara 2E", "Kobo Libra Colour", "Kobo Libra 2", "Kobo Libra H2O"],
  },
  { id: "boox", name: "Onyx Boox", models: ["BOOX Go Color 7", "BOOX Go 7"] },
  { id: "xteink", name: "Xteink", models: ["Xteink x3", "Xteink x4", "Xteink x4 Pro"] },
  { id: "bigme", name: "Bigme", models: ["Bigme B6 Color", "Bigme B6 Black & White", "Bigme B6 Pro"] },
];

export const designs: Design[] = [
  {
    id: "jardin-de-medianoche",
    name: "Jardín de Medianoche",
    blurb: "Flores y hojas bajo un cielo violeta profundo.",
    bg: ["#2a2347", "#4a3b6e"],
    accents: ["#b8e8ee", "#d7c5d2", "#f6e7a8"],
    motifs: ["flower", "leaf", "star"],
    seed: 11,
  },
  {
    id: "cerezos-y-libros",
    name: "Cerezos y Libros",
    blurb: "Pétalos rosados para lecturas de primavera.",
    bg: ["#fbe3ea", "#f4c3d3"],
    accents: ["#ffffff", "#d9758f", "#a35a74"],
    motifs: ["flower", "heart", "leaf"],
    seed: 23,
  },
  {
    id: "biblioteca-celestial",
    name: "Biblioteca Celestial",
    blurb: "Lunas y estrellas para leer hasta la madrugada.",
    bg: ["#1f2a4a", "#312a44"],
    accents: ["#f6e7a8", "#b8e8ee", "#cdc4d7"],
    motifs: ["moon", "star"],
    seed: 37,
  },
  {
    id: "lavanda",
    name: "Lavanda",
    blurb: "Calma, hojas y florecitas en tonos lila.",
    bg: ["#e9e1f2", "#cdc4d7"],
    accents: ["#7b5fa0", "#ffffff", "#b8e8ee"],
    motifs: ["leaf", "flower"],
    seed: 41,
  },
  {
    id: "rosas-y-dragones",
    name: "Rosas y Dragones",
    blurb: "Para las lectoras de romantasy más intensas.",
    bg: ["#3b1f35", "#5c2a4a"],
    accents: ["#e58aa5", "#d7c5d2", "#f6e7a8"],
    motifs: ["rose", "leaf", "star"],
    seed: 53,
  },
  {
    id: "cabana-acogedora",
    name: "Cabaña Acogedora",
    blurb: "Un rincón cálido, con flores y corazones.",
    bg: ["#f7e9d8", "#ecd5ba"],
    accents: ["#8aa77b", "#d98a6c", "#ffffff"],
    motifs: ["flower", "leaf", "heart"],
    seed: 67,
  },
  {
    id: "capitulos-de-menta",
    name: "Capítulos de Menta",
    blurb: "Fresca, luminosa y muy Chapter & Bloom.",
    bg: ["#dcf3f6", "#b8e8ee"],
    accents: ["#312a44", "#ffffff", "#d7c5d2"],
    motifs: ["leaf", "star", "flower"],
    seed: 79,
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    blurb: "Dorados antiguos sobre tonos de biblioteca.",
    bg: ["#2b2a2a", "#3d3326"],
    accents: ["#c9a96e", "#8b6b4a", "#e8dcc4"],
    motifs: ["star", "leaf", "moon"],
    seed: 83,
  },
];

export const designById = (id: string) => designs.find((d) => d.id === id)!;

export type Kind = "skin" | "insert";

export const PRICES = {
  skin: 6,
  insert: 3,
  customSkin: 8,
  customInsert: 5,
} as const;

export const kindLabel: Record<Kind, string> = { skin: "Skin", insert: "Insert" };

export type Product = {
  slug: string;
  name: string;
  kind: Kind;
  designId: string;
  price: number;
  category: "skins" | "inserts";
  description: string;
};

export const products: Product[] = designs.flatMap((d) => [
  {
    slug: `${d.id}-skin`,
    name: `${d.name} · Skin`,
    kind: "skin" as const,
    designId: d.id,
    price: PRICES.skin,
    category: "skins" as const,
    description: `${d.blurb} Skin de vinilo para tu e-reader, cortada a medida para tu modelo.`,
  },
  {
    slug: `${d.id}-insert`,
    name: `${d.name} · Insert`,
    kind: "insert" as const,
    designId: d.id,
    price: PRICES.insert,
    category: "inserts" as const,
    description: `${d.blurb} Insert para la funda transparente de tu e-reader, a medida de tu modelo.`,
  },
]);

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const unitPrice = (base: number, finish: FinishId) => base + (finishById(finish).holo ? HOLO_EXTRA : 0);

export type CategoryId = "skins" | "inserts" | "marcapaginas-magneticos" | "marcapaginas" | "pop-sockets" | "vasos";

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  blurb: string;
  soon: boolean;
};

export const categories: Category[] = [
  { id: "skins", name: "Skins", short: "Skins para e-readers", blurb: "Dale un nuevo capítulo a tu e-reader con diseños de vinilo hechos para enamorarte.", soon: false },
  { id: "inserts", name: "Inserts", short: "Inserts para fundas", blurb: "El detalle que se ve a través de tu funda transparente. Mismo diseño, otro toque.", soon: false },
  { id: "marcapaginas-magneticos", name: "Marcapáginas magnéticos", short: "Marcapáginas magnéticos", blurb: "Se quedan en su sitio y marcan tu lectura con mucho estilo.", soon: true },
  { id: "marcapaginas", name: "Marcapáginas tradicionales", short: "Marcapáginas clásicos", blurb: "Los de toda la vida, con diseños pensados para lectoras.", soon: true },
  { id: "pop-sockets", name: "Pop sockets", short: "Pop sockets", blurb: "Agarra tu e-reader o tu móvil con comodidad y con diseño.", soon: true },
  { id: "vasos", name: "Vasos de vidrio", short: "Vasos de vidrio", blurb: "Vasos con diseño para acompañar tus tardes de lectura.", soon: true },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);

export const reviews = [
  { name: "Lucía M.", text: "La skin quedó perfecta en mi Paperwhite, el acabado arcoíris es una pasada.", stars: 5 },
  { name: "Carmen R.", text: "Pedí una personalizada con la portada de mi libro favorito y es preciosa.", stars: 5 },
  { name: "Paula G.", text: "Llegó todo muy bien empaquetado y el corte es exacto. Repetiré.", stars: 5 },
  { name: "Irene S.", text: "Los inserts son un detallazo, mi Kobo parece otro.", stars: 5 },
];

export const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
