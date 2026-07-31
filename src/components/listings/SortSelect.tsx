"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Select from "@/components/ui/Select";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value && e.target.value !== "newest") {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      value={searchParams.get("sort") ?? "newest"}
      onChange={handleChange}
      className="w-auto"
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  );
}
