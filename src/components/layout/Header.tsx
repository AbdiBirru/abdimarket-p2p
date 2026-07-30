import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-slate-900">
          AbdiMarket<span className="text-slate-400">-P2P</span>
        </Link>

        {/* Placeholders — wired to real pages on Day 9 & Day 12 */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <span>Log In</span>
          <span className="rounded-full bg-slate-900 px-4 py-2 text-white">
            Sell an item
          </span>
        </nav>

        {/* Mobile only — becomes functional on Day 20 */}
        <button className="md:hidden" aria-label="Search">
          <Search className="h-6 w-6 text-slate-700" />
        </button>
      </div>
    </header>
  );
}
