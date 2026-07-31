import ListingGrid from "@/components/listings/ListingGrid";
import { getActiveListings } from "@/lib/listings";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();
  const listings = await getActiveListings(session?.user?.id ?? null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-coffee-950">
          Buy and sell, right where you are
        </h1>
        <p className="mt-1 text-sm text-coffee-950/60">
          Browse listings from sellers across Ethiopia. Contact them directly — no middleman.
        </p>
      </div>
      <ListingGrid listings={listings} isLoggedIn={!!session?.user} />
    </div>
  );
}
