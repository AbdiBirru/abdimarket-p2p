import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { getCategoryLabel } from "@/lib/constants";
import { type ListingCardData } from "@/lib/listings";

export default function ListingCard({ listing }: { listing: ListingCardData }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
    >
      <Card className="h-full transition-transform hover:-translate-y-0.5">
        <div className="relative aspect-square w-full bg-coffee-950/5">
          <Image
            src={listing.photos[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-marigold-600">
            {getCategoryLabel(listing.category)}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-coffee-950">
            {listing.title}
          </h3>
          <p className="mt-1 font-mono text-sm font-bold text-coffee-950">
            {formatPrice(listing.price)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
