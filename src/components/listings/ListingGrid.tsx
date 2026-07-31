import ListingCard from "./ListingCard";
import { type ListingCardData } from "@/lib/listings";

export default function ListingGrid({
  listings,
  isLoggedIn,
  emptyMessage = "No listings yet — be the first to sell something here.",
}: {
  listings: ListingCardData[];
  isLoggedIn: boolean;
  emptyMessage?: string;
}) {
  if (listings.length === 0) {
    return <p className="py-12 text-center text-sm text-coffee-950/60">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  );
}
