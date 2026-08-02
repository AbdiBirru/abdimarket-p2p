import Link from "next/link";
import { getReportsForAdmin } from "@/lib/admin";
import ReportRow from "@/components/admin/ReportRow";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "PENDING", label: "Pending" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "DISMISSED", label: "Dismissed" },
  { value: "ALL", label: "All" },
] as const;

export const dynamic = "force-dynamic";

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = (status ?? "PENDING") as (typeof TABS)[number]["value"];
  const reports = await getReportsForAdmin(activeStatus);

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink">
        Reported Listings ({reports.length})
      </h2>

      <div className="mt-3 flex gap-2">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value === "PENDING" ? "/admin/reports" : `/admin/reports?status=${tab.value}`}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              activeStatus === tab.value
                ? "border-marigold-500 bg-marigold-500 text-ink"
                : "border-line text-ink/60"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {reports.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink/50">Nothing here.</p>
        ) : (
          reports.map((report) => <ReportRow key={report.id} report={report} />)
        )}
      </div>
    </div>
  );
}
