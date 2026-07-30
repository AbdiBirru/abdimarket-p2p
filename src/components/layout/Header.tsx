import Link from "next/link";
import { Search } from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 bg-coffee-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold text-cream-50">
          AbdiMarket<span className="text-marigold-500">-P2P</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-cream-50/80 md:flex">
          {session?.user ? (
            <>
              <span className="text-cream-50">Hi, {session.user.name}</span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="text-cream-50/80 hover:text-cream-50">Log Out</button>
              </form>
            </>
          ) : (
            <Link href="/login">Log In</Link>
          )}
          <Link
            href="/sell"
            className="rounded-full bg-marigold-500 px-4 py-2 font-semibold text-coffee-950"
          >
            Sell an item
          </Link>
        </nav>

        <button className="text-cream-50 md:hidden" aria-label="Search">
          <Search className="h-6 w-6" />
        </button>
      </div>
      <div className="trim-strip" />
    </header>
  );
}
