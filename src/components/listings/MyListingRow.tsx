"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, RotateCcw, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { toggleSoldStatus, deleteListing } from "@/lib/actions/manage-listing";
import { type MyListingData } from "@/lib/listings";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-eucalyptus-600/10 text-eucalyptus-600",
  SOLD: "bg-coffee-950/10 text-coffee-950/60",
  REMOVED: "bg-brick-600/10 text-brick-600",
};

export default function MyListingRow({ listing }: { listing: MyListingData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggleSold() {
    setError(null);
    startTransition(async () => {
      try {
        await toggleSoldStatus(listing.id, listing.status);
        router.refresh();
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${listing.title}"? This can't be undone.`)) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteListing(listing.id);
        router.refresh();
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  const isRemoved = listing.status === "REMOVED";

  return (
    <Card className="p-3">
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-coffee-950/5">
          <Image src={listing.photos[0]} alt={listing.title} fill sizes="64px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-coffee-950">{listing.title}</p>
          <p className="mt-0.5 font-mono text-sm text-coffee-950/80">{formatPrice(listing.price)}</p>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[listing.status]}`}>
            {listing.status === "ACTIVE" ? "Active" : listing.status === "SOLD" ? "Sold" : "Removed by admin"}
          </span>
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-brick-600">{error}</p>}

      {!isRemoved && (
        <div className="mt-3 flex gap-2 border-t border-coffee-950/10 pt-3">
          <Link
            href={`/sell/${listing.id}/edit`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-coffee-950 hover:bg-coffee-950/5"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
          <button
            onClick={handleToggleSold}
            disabled={isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-coffee-950 hover:bg-coffee-950/5 disabled:opacity-50"
          >
            {listing.status === "SOLD" ? (
              <>
                <RotateCcw className="h-3.5 w-3.5" />
                Relist
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Mark Sold
              </>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-brick-600 hover:bg-brick-600/5 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </Card>
  );
}
