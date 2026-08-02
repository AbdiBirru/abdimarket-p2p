"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleSaveListing } from "@/lib/actions/save-listing";

export default function SaveButton({
  listingId,
  initialSaved,
  isLoggedIn,
  size = "sm",
}: {
  listingId: string;
  initialSaved: boolean;
  isLoggedIn: boolean;
  size?: "sm" | "lg";
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const next = !saved;
    setSaved(next);
    startTransition(async () => {
      try {
        await toggleSaveListing(listingId);
        router.refresh();
      } catch {
        setSaved(!next);
      }
    });
  }

  const dimensions = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={saved ? "Remove from saved listings" : "Save listing"}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-card/90 text-ink shadow-sm backdrop-blur transition-colors disabled:opacity-60",
        dimensions
      )}
    >
      <Heart className={cn(iconSize, saved && "fill-marigold-500 text-marigold-500")} />
    </button>
  );
}
