import Link from "next/link";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-coffee-950/10 bg-white py-2 md:hidden">
      <Link href="/" className="flex flex-col items-center gap-1 px-3 py-1 text-coffee-950">
        <Home className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      <button className="flex flex-col items-center gap-1 px-3 py-1 text-coffee-950/60">
        <Search className="h-6 w-6" />
        <span className="text-xs">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1 px-3 py-1 text-marigold-600">
        <PlusCircle className="h-7 w-7" />
        <span className="text-xs font-medium">Sell</span>
      </button>
      <button className="flex flex-col items-center gap-1 px-3 py-1 text-coffee-950/60">
        <Heart className="h-6 w-6" />
        <span className="text-xs">Saved</span>
      </button>
      <button className="flex flex-col items-center gap-1 px-3 py-1 text-coffee-950/60">
        <User className="h-6 w-6" />
        <span className="text-xs">Account</span>
      </button>
    </nav>
  );
}
