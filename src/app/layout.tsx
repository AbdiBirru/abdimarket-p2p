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
  title: "AbdiMarket-P2P",
  description: "Buy and sell locally across Ethiopia — connect directly, no middleman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream-50 font-sans text-coffee-950 antialiased">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
