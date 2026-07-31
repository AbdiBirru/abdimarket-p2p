"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { REPORT_REASONS } from "@/lib/constants";

type ReasonValue = (typeof REPORT_REASONS)[number]["value"];

export type ReportState = { error: string | null; success: boolean };

export async function createReport(
  listingId: string,
  _prevState: ReportState,
  formData: FormData
): Promise<ReportState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in to report a listing.", success: false };
  }

  const reason = formData.get("reason") as string;
  const details = (formData.get("details") as string)?.trim() || null;

  if (!REPORT_REASONS.some((r) => r.value === reason)) {
    return { error: "Choose a reason.", success: false };
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true },
  });
  if (!listing) {
    return { error: "This listing no longer exists.", success: false };
  }

  const existing = await prisma.report.findUnique({
    where: { listingId_reporterId: { listingId, reporterId: session.user.id } },
  });
  if (existing) {
    return { error: "You've already reported this listing.", success: false };
  }

  await prisma.report.create({
    data: {
      listingId,
      reporterId: session.user.id,
      reason: reason as ReasonValue,
      details,
    },
  });

  return { error: null, success: true };
}
