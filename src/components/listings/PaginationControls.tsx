import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PaginationControls({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    if (page > 1) {
      params.set("page", String(page));
    }
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const baseClass =
    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium";

  return (
    <nav className="mt-6 flex items-center justify-center gap-4" aria-label="Pagination">
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1)}
          className={cn(baseClass, "border-coffee-950/15 text-coffee-950")}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(baseClass, "border-coffee-950/10 text-coffee-950/30")} aria-hidden>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      <span className="text-sm text-coffee-950/60">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          className={cn(baseClass, "border-coffee-950/15 text-coffee-950")}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(baseClass, "border-coffee-950/10 text-coffee-950/30")} aria-hidden>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
