import Link from "next/link";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";
import { auth } from "@/auth";

export default async function BottomNav() {
  const session = await auth();
  const accountHref = session?.user ? "/account" : "/login";

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
      <Link href="/sell" className="flex flex-col items-center gap-1 px-3 py-1 text-marigold-600">
        <PlusCircle className="h-7 w-7" />
        <span className="text-xs font-medium">Sell</span>
      </Link>
      <button className="flex flex-col items-center gap-1 px-3 py-1 text-coffee-950/60">
        <Heart className="h-6 w-6" />
        <span className="text-xs">Saved</span>
      </button>
      <Link href={accountHref} className="flex flex-col items-center gap-1 px-3 py-1 text-coffee-950/60">
        <User className="h-6 w-6" />
        <span className="text-xs">{session?.user ? "Account" : "Log In"}</span>
      </Link>
    </nav>
  );
}
