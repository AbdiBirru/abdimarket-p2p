"use client";

import { useRef, useEffect } from "react";
import { useActionState } from "react";
import { Flag, X } from "lucide-react";
import { REPORT_REASONS } from "@/lib/constants";
import { createReport } from "@/lib/actions/report";

export default function ReportButton({
  listingId,
  isLoggedIn,
}: {
  listingId: string;
  isLoggedIn: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const createReportWithId = createReport.bind(null, listingId);
  const [state, formAction, isPending] = useActionState(createReportWithId, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      const timeout = setTimeout(() => dialogRef.current?.close(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [state.success]);

  function openDialog() {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="mx-auto mt-4 flex items-center gap-1.5 text-xs font-medium text-coffee-950/40 hover:text-brick-600"
      >
        <Flag className="h-3.5 w-3.5" />
        Report this listing
      </button>

      <dialog
        ref={dialogRef}
        className="w-[90vw] max-w-sm rounded-2xl border border-coffee-950/10 p-5 backdrop:bg-coffee-950/40"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-coffee-950">Report listing</h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="text-coffee-950/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {state.success ? (
          <p className="mt-4 rounded-lg bg-eucalyptus-600/10 px-3 py-2 text-sm text-eucalyptus-600">
            Thanks — our team will take a look.
          </p>
        ) : (
          <form action={formAction} className="mt-4 space-y-3">
            <div className="space-y-1.5">
              {REPORT_REASONS.map((r) => (
                <label key={r.value} className="flex items-center gap-2 text-sm text-coffee-950">
                  <input
                    type="radio"
                    name="reason"
                    value={r.value}
                    required
                    className="accent-marigold-500"
                  />
                  {r.label}
                </label>
              ))}
            </div>
            <textarea
              name="details"
              rows={3}
              placeholder="Anything else we should know? (optional)"
              className="w-full rounded-xl border border-coffee-950/15 p-3 text-sm text-coffee-950 outline-none focus:border-marigold-500 focus:ring-2 focus:ring-marigold-500/30"
            />
            {state.error && <p className="text-sm text-brick-600">{state.error}</p>}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-brick-600 px-4 py-2.5 text-sm font-semibold text-cream-50 disabled:opacity-60"
            >
              {isPending ? "Submitting..." : "Submit report"}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
