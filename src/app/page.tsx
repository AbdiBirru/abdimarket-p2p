import { Suspense } from "react";
import ListingGrid from "@/components/listings/ListingGrid";
import SearchBar from "@/components/listings/SearchBar";
import { getActiveListings } from "@/lib/listings";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const session = await auth();
  const listings = await getActiveListings(session?.user?.id ?? null, q);

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

      <div className="mb-5">
        <Suspense fallback={<div className="h-11 rounded-full border border-coffee-950/15 bg-white" />}>
          <SearchBar />
        </Suspense>
      </div>

      <ListingGrid
        listings={listings}
        isLoggedIn={!!session?.user}
        emptyMessage={
          q
            ? `No listings match "${q}".`
            : "No listings yet — be the first to sell something here."
        }
      />
    </div>
  );
}
