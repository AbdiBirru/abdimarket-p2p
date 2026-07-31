import { Suspense } from "react";
import ListingGrid from "@/components/listings/ListingGrid";
import SearchBar from "@/components/listings/SearchBar";
import CategoryFilter from "@/components/listings/CategoryFilter";
import LocationFilter from "@/components/listings/LocationFilter";
import { getActiveListings, getDistinctLocations } from "@/lib/listings";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; location?: string }>;
}) {
  const { q, category, location } = await searchParams;
  const session = await auth();

  const [listings, locations] = await Promise.all([
    getActiveListings(session?.user?.id ?? null, { query: q, category, location }),
    getDistinctLocations(),
  ]);

  const hasFilters = !!(q || category || location);

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

      <div className="mb-3">
        <Suspense fallback={<div className="h-11 rounded-full border border-coffee-950/15 bg-white" />}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="mb-3">
        <CategoryFilter currentQuery={q} currentLocation={location} activeCategory={category} />
      </div>

      <div className="mb-5">
        <Suspense fallback={<div className="h-11 w-40 rounded-xl border border-coffee-950/15 bg-white" />}>
          <LocationFilter locations={locations} />
        </Suspense>
      </div>

      <ListingGrid
        listings={listings}
        isLoggedIn={!!session?.user}
        emptyMessage={
          hasFilters
            ? "No listings match your filters."
            : "No listings yet — be the first to sell something here."
        }
      />
    </div>
  );
}
