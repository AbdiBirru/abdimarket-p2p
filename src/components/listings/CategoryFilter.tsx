import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function CategoryFilter({
  currentQuery,
  currentLocation,
  activeCategory,
}: {
  currentQuery?: string;
  currentLocation?: string;
  activeCategory?: string;
}) {
  function buildHref(category?: string) {
    const params = new URLSearchParams();
    if (currentQuery) params.set("q", currentQuery);
    if (currentLocation) params.set("location", currentLocation);
    if (category) params.set("category", category);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Link
        href={buildHref(undefined)}
        className={cn(
          "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium",
          !activeCategory
            ? "border-marigold-500 bg-marigold-500 text-coffee-950"
            : "border-coffee-950/15 text-coffee-950/70"
        )}
      >
        All
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.value}
          href={buildHref(c.value)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium",
            activeCategory === c.value
              ? "border-marigold-500 bg-marigold-500 text-coffee-950"
              : "border-coffee-950/15 text-coffee-950/70"
          )}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
