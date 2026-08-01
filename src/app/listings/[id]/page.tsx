import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Truck } from "lucide-react";
import { auth } from "@/auth";
import { getListingById, getSellerRating } from "@/lib/listings";
import { getCategoryLabel, getPaymentMethodLabel } from "@/lib/constants";
import { formatPrice, parseListingDetails } from "@/lib/utils";
import Card from "@/components/ui/Card";
import PhotoGallery from "@/components/listings/PhotoGallery";
import SaveButton from "@/components/listings/SaveButton";
import ReportButton from "@/components/listings/ReportButton";
import ReviewButton from "@/components/listings/ReviewButton";
import RatingDisplay from "@/components/listings/RatingDisplay";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return { title: "Listing not found" };
  }

  const description = `${formatPrice(listing.price)} · ${listing.location} · ${getCategoryLabel(listing.category)}`;

  return {
    title: listing.title,
    description,
    openGraph: {
      title: listing.title,
      description,
      images: listing.photos[0] ? [{ url: listing.photos[0] }] : [],
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const listing = await getListingById(id, session?.user?.id ?? null);

  if (!listing) {
    notFound();
  }

  const rating = await getSellerRating(listing.sellerId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <PhotoGallery photos={listing.photos} title={listing.title} />

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-marigold-600">
            {getCategoryLabel(listing.category)}
          </p>
          <h1 className="mt-1 font-display text-xl font-bold text-coffee-950">
            {listing.title}
          </h1>
          <p className="mt-1 font-mono text-lg font-bold text-coffee-950">
            {formatPrice(listing.price)}
          </p>
        </div>

        <SaveButton
          listingId={listing.id}
          initialSaved={listing.isSaved}
          isLoggedIn={!!session?.user}
          size="lg"
        />
      </div>

      <Card className="mt-5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-coffee-950">{listing.seller.name}</p>
            <p className="text-sm text-coffee-950/60">{listing.location}</p>
            <div className="mt-1">
              <RatingDisplay average={rating.average} count={rating.count} />
            </div>
          </div>
          <ReviewButton
            sellerId={listing.sellerId}
            isLoggedIn={!!session?.user}
            isOwnListing={session?.user?.id === listing.sellerId}
          />
        </div>

        
         <a href={`tel:${listing.phone}`}
          className="mt-3 flex items-center justify-center rounded-full bg-marigold-500 px-4 py-2.5 text-sm font-semibold text-coffee-950"
        >
          Call {listing.phone}
        </a>
      </Card>

      <Card className="mt-4 p-4">
        <p className="text-sm font-medium text-coffee-950">Payment methods</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {listing.paymentMethods.map((method) => (
            <span
              key={method}
              className="rounded-full bg-coffee-950/5 px-3 py-1 text-xs font-medium text-coffee-950"
            >
              {getPaymentMethodLabel(method)}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-coffee-950">
          <Truck className="h-4 w-4 text-eucalyptus-600" />
          {listing.deliveryAvailable ? "Delivery available" : "Pickup only"}
        </div>
      </Card>

      <ReportButton listingId={listing.id} isLoggedIn={!!session?.user} />
    {Object.keys(parseListingDetails(listing.details)).length > 0 && (
      <Card className="mt-4 p-4">
          <p className="text-sm font-medium text-coffee-950">Specifications</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(parseListingDetails(listing.details)).map(([key, value]) => (
                            <div key={key}>
                                      <dt className="text-xs text-coffee-950/50">{key}</dt>
                                                <dd className="text-sm font-medium text-coffee-950">{value}</dd>
                                                        </div>
                                                              ))}
                                                                  </dl>
                                                                    </Card>
                                                                    )}
    </div>
  );
}
