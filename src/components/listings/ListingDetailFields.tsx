"use client";

import Input from "@/components/ui/Input";
import { CATEGORY_DETAIL_FIELDS } from "@/lib/constants";

export default function ListingDetailFields({
  category,
  initialDetails = {},
}: {
  category: string;
  initialDetails?: Record<string, string>;
}) {
  const fields = CATEGORY_DETAIL_FIELDS[category] ?? [];

  if (fields.length === 0) return null;

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-coffee-950">
        Details <span className="font-normal text-coffee-950/40">(optional)</span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        {fields.map((field) => (
          <div key={field}>
            <label className="mb-1 block text-xs text-coffee-950/60">{field}</label>
            <Input
              name={`detail:${field}`}
              defaultValue={initialDetails[field] ?? ""}
              placeholder={field}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
