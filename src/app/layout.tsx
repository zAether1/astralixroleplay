import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { CartProvider } from "@/lib/cart/store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "AstralixRoleplay | Tienda Oficial",
  description:
    "Tienda oficial de AstralixRoleplay - El mejor servidor de roleplay en FiveM. Adquiere paquetes VIP, vehículos y beneficios exclusivos.",
  keywords: "FiveM, roleplay, RP, GTA V, servidor, AstralixRoleplay, tienda, VIP",
  authors: [{ name: "AstralixRoleplay" }],
  openGraph: {
    type: "website",
    siteName: "AstralixRoleplay",
    title: "AstralixRoleplay | Tienda Oficial",
    description:
      "Tienda oficial de AstralixRoleplay - El mejor servidor de roleplay en FiveM.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstralixRoleplay | Tienda Oficial",
    description:
      "Tienda oficial de AstralixRoleplay - El mejor servidor de roleplay en FiveM.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <CartProvider>
          <div id="root">
            {children}
            <CartDrawer />
          </div>
        </CartProvider>
        <Script 
          src="https://js.tip4serv.com/tip4serv.min.js?v=1.0.16" 
          data-store-id="23746"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
