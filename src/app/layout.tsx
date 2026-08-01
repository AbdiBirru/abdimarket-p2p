import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-display",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--ff-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AbdiMarket-P2P — Buy and sell locally across Ethiopia",
    template: "%s | AbdiMarket-P2P",
  },
  description:
    "A peer-to-peer marketplace connecting buyers and sellers across Ethiopia. Browse listings and contact sellers directly — no middleman, no fees.",
  openGraph: {
    type: "website",
    siteName: "AbdiMarket-P2P",
    title: "AbdiMarket-P2P — Buy and sell locally across Ethiopia",
    description: "Browse listings from sellers across Ethiopia and contact them directly.",
  },
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && systemDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-surface font-sans text-ink antialiased">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
