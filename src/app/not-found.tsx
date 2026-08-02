import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <SearchX className="h-12 w-12 text-marigold-500" />
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Nothing here</h1>
      <p className="mt-2 text-sm text-ink-muted">
        This listing or page doesn&apos;t exist — it may have been removed, or the link might be off.
      </p>
      <Link href="/" className={`mt-6 ${buttonVariants("primary")}`}>
        Back to browsing
      </Link>
    </div>
  );
}
