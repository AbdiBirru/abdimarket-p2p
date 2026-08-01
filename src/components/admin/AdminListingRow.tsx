"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldOff, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { getCategoryLabel } from "@/lib/constants";
import { adminSetListingStatus } from "@/lib/actions/admin";
import { type AdminListingData } from "@/lib/admin";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-eucalyptus-600/10 text-eucalyptus-600",
  SOLD: "bg-coffee-950/10 text-coffee-950/60",
  REMOVED: "bg-brick-600/10 text-brick-600",
};

export default function AdminListingRow({ listing }: { listing: AdminListingData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle() {
    const nextStatus = listing.status === "REMOVED" ? "ACTIVE" : "REMOVED";
    if (
      nextStatus === "REMOVED" &&
      !window.confirm(`Remove "${listing.title}" from the marketplace?`)
    ) {
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        await adminSetListingStatus(listing.id, nextStatus);
        router.refresh();
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-coffee-950/10 bg-white p-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-coffee-950/5">
        <Image src={listing.photos[0]} alt={listing.title} fill sizes="48px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={`/listings/${listing.id}`}
          className="truncate text-sm font-semibold text-coffee-950 hover:underline"
        >
          {listing.title}
        </Link>
        <p className="text-xs text-coffee-950/50">
          {getCategoryLabel(listing.category)} · {formatPrice(listing.price)} · {listing.seller.name}
        </p>
        {error && <p className="mt-1 text-xs text-brick-600">{error}</p>}
      </div>

      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[listing.status]}`}
      >
        {listing.status}
      </span>

      {listing.status !== "SOLD" && (
        <button
          onClick={handleToggle}
          disabled={isPending}
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-coffee-950 hover:bg-coffee-950/5 disabled:opacity-50"
        >
          {listing.status === "REMOVED" ? (
            <>
              <ShieldCheck className="h-3.5 w-3.5" />
              Approve
            </>
          ) : (
            <>
              <ShieldOff className="h-3.5 w-3.5" />
              Remove
            </>
          )}
        </button>
      )}
    </div>
  );
}
