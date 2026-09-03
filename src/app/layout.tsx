import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { StickyWhatsApp } from "@/components/whatsapp/StickyWhatsApp";
import { site } from "@/data/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Sidrah Fashion is a premium wholesale boys' kidswear house from Mumbai, supplying retailers, boutiques and international wholesale buyers.",
  metadataBase: new URL("https://sidrahfashion.example"),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "Premium wholesale boys' kidswear from Mumbai. Curated brands, considered fabrics, worldwide shipping.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-page text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-page"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
