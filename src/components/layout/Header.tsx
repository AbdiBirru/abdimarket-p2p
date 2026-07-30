import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-coffee-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold text-cream-50">
          AbdiMarket<span className="text-marigold-500">-P2P</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-cream-50/80 md:flex">
          <span>Log In</span>
          <span className="rounded-full bg-marigold-500 px-4 py-2 font-semibold text-coffee-950">
            Sell an item
          </span>
        </nav>

        <button className="text-cream-50 md:hidden" aria-label="Search">
          <Search className="h-6 w-6" />
        </button>
      </div>
      <div className="trim-strip" />
    </header>
  );
}
