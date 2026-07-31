import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getSavedListings } from "@/lib/listings";
import ListingGrid from "@/components/listings/ListingGrid";

export const dynamic = "force-dynamic";

export default async function SavedListingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/saved");
  }

  const listings = await getSavedListings(session.user.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-coffee-950">Saved Listings</h1>
      <p className="mt-1 text-sm text-coffee-950/60">
        Items you&apos;ve saved to check out later.
      </p>
      <div className="mt-6">
        <ListingGrid
          listings={listings}
          isLoggedIn
          emptyMessage="You haven't saved anything yet — tap the heart on a listing to save it here."
        />
      </div>
    </div>
  );
}
