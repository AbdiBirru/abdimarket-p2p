import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [listingCount, userCount, pendingReports] = await Promise.all([
    prisma.listing.count(),
    prisma.user.count(),
    prisma.report.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-line bg-card p-4">
        <p className="text-2xl font-bold text-ink">{listingCount}</p>
        <p className="text-sm text-ink/60">Total listings</p>
      </div>
      <div className="rounded-2xl border border-line bg-card p-4">
        <p className="text-2xl font-bold text-ink">{userCount}</p>
        <p className="text-sm text-ink/60">Total users</p>
      </div>
      <Link
        href="/admin/reports"
        className="rounded-2xl border border-line bg-card p-4 transition-colors hover:bg-ink/5"
      >
        <p className="text-2xl font-bold text-ink">{pendingReports}</p>
        <p className="text-sm text-ink/60">Pending reports</p>
      </Link>
    </div>
  );
}
