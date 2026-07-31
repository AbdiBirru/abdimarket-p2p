import { Star } from "lucide-react";

export default function RatingDisplay({
  average,
  count,
}: {
  average: number | null;
  count: number;
}) {
  if (count === 0) {
    return <span className="text-xs text-coffee-950/40">No reviews yet</span>;
  }

  return (
    <span className="flex items-center gap-1 text-xs text-coffee-950/70">
      <Star className="h-3.5 w-3.5 fill-marigold-500 text-marigold-500" />
      <span className="font-semibold text-coffee-950">{average?.toFixed(1)}</span>
      <span>
        ({count} review{count === 1 ? "" : "s"})
      </span>
    </span>
  );
}
