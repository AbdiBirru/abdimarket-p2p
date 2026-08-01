"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, XCircle, ShieldOff } from "lucide-react";
import { getReportReasonLabel } from "@/lib/constants";
import { resolveReport, dismissReport, adminSetListingStatus } from "@/lib/actions/admin";
import { type AdminReportData } from "@/lib/admin";

export default function ReportRow({ report }: { report: AdminReportData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  const isHandled = report.status !== "PENDING";

  return (
    <div className="rounded-xl border border-coffee-950/10 bg-white p-3">
      <div className="flex gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-coffee-950/5">
          <Image
            src={report.listing.photos[0]}
            alt={report.listing.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/listings/${report.listing.id}`}
            className="truncate text-sm font-semibold text-coffee-950 hover:underline"
          >
            {report.listing.title}
          </Link>
          <p className="mt-0.5 text-xs text-coffee-950/60">
            Reported by {report.reporter.name} · {getReportReasonLabel(report.reason)}
          </p>
          {report.details && (
            <p className="mt-1 text-xs italic text-coffee-950/50">&ldquo;{report.details}&rdquo;</p>
          )}
        </div>

        <span
          className={`h-fit shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            report.listing.status === "REMOVED"
              ? "bg-brick-600/10 text-brick-600"
              : "bg-eucalyptus-600/10 text-eucalyptus-600"
          }`}
        >
          Listing {report.listing.status}
        </span>
      </div>

      {error && <p className="mt-2 text-xs text-brick-600">{error}</p>}

      {!isHandled && (
        <div className="mt-3 flex gap-2 border-t border-coffee-950/10 pt-3">
          {report.listing.status === "ACTIVE" && (
            <button
              onClick={() => run(() => adminSetListingStatus(report.listing.id, "REMOVED"))}
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-brick-600 hover:bg-brick-600/5 disabled:opacity-50"
            >
              <ShieldOff className="h-3.5 w-3.5" />
              Remove Listing
            </button>
          )}
          <button
            onClick={() => run(() => resolveReport(report.id))}
            disabled={isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-coffee-950 hover:bg-coffee-950/5 disabled:opacity-50"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Resolve
          </button>
          <button
            onClick={() => run(() => dismissReport(report.id))}
            disabled={isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-coffee-950/60 hover:bg-coffee-950/5 disabled:opacity-50"
          >
            <XCircle className="h-3.5 w-3.5" />
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
