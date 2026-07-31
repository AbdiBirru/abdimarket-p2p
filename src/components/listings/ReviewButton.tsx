"use client";

import { useRef, useEffect, useState } from "react";
import { useActionState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { createReview } from "@/lib/actions/review";

export default function ReviewButton({
  sellerId,
  isLoggedIn,
  isOwnListing,
}: {
  sellerId: string;
  isLoggedIn: boolean;
  isOwnListing: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [rating, setRating] = useState(5);
  const createReviewWithId = createReview.bind(null, sellerId);
  const [state, formAction, isPending] = useActionState(createReviewWithId, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      const timeout = setTimeout(() => dialogRef.current?.close(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [state.success]);

  if (isOwnListing) return null;

  function openDialog() {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button type="button" onClick={openDialog} className="text-xs font-semibold text-marigold-600">
        Rate this seller
      </button>

      <dialog
        ref={dialogRef}
        className="w-[90vw] max-w-sm rounded-2xl border border-coffee-950/10 p-5 backdrop:bg-coffee-950/40"
      >
        <h2 className="font-display text-lg font-bold text-coffee-950">Rate this seller</h2>

        {state.success ? (
          <p className="mt-4 rounded-lg bg-eucalyptus-600/10 px-3 py-2 text-sm text-eucalyptus-600">
            Thanks for your feedback!
          </p>
        ) : (
          <form action={formAction} className="mt-4 space-y-3">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                  <Star
                    className={cn(
                      "h-8 w-8",
                      n <= rating ? "fill-marigold-500 text-marigold-500" : "text-coffee-950/20"
                    )}
                  />
                </button>
              ))}
            </div>
            <input type="hidden" name="rating" value={rating} />

            <textarea
              name="comment"
              rows={3}
              placeholder="Optional comment"
              className="w-full rounded-xl border border-coffee-950/15 p-3 text-sm text-coffee-950 outline-none focus:border-marigold-500 focus:ring-2 focus:ring-marigold-500/30"
            />

            {state.error && <p className="text-sm text-brick-600">{state.error}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="flex-1 rounded-full border border-coffee-950/15 px-4 py-2.5 text-sm font-semibold text-coffee-950"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 rounded-full bg-marigold-500 px-4 py-2.5 text-sm font-semibold text-coffee-950 disabled:opacity-60"
              >
                {isPending ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
