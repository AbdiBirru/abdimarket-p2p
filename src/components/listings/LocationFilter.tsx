"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Select from "@/components/ui/Select";

export default function LocationFilter({ locations }: { locations: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("location", e.target.value);
    } else {
      params.delete("location");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      value={searchParams.get("location") ?? ""}
      onChange={handleChange}
      className="w-auto"
    >
      <option value="">All locations</option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </Select>
  );
}
