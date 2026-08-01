export default function ListingDetailFields({
  initialDetails = "",
}: {
  initialDetails?: string;
}) {
  return (
    <div>
      <label htmlFor="details" className="mb-1 block text-sm font-medium text-ink">
        Details <span className="font-normal text-ink-muted">(optional)</span>
      </label>
      <textarea
        id="details"
        name="details"
        rows={4}
        defaultValue={initialDetails}
        placeholder="Describe the item in your own words — model, size, condition, features, anything a buyer would want to know."
        className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-marigold-500 focus:ring-2 focus:ring-marigold-500/30"
      />
    </div>
  );
}
