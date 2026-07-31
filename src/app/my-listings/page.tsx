import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getMyListings } from "@/lib/listings";
import MyListingRow from "@/components/listings/MyListingRow";

export const dynamic = "force-dynamic";

export default async function MyListingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/my-listings");
  }

  const listings = await getMyListings(session.user.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-coffee-950">My Listings</h1>
        <Link href="/sell" className="text-sm font-semibold text-marigold-600">
          + New listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="py-12 text-center text-sm text-coffee-950/60">
          You haven&apos;t listed anything yet.
        </p>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <MyListingRow key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
