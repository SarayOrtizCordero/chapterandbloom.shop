import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  title: "Chapter & Bloom · Skins e inserts para e-readers",
  description:
    "Skins e inserts con diseños originales para Kindle, Kobo, Onyx Boox, Xteink y Bigme. Elige tu modelo y tu acabado, o crea el tuyo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${dm.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
