"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in.");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") throw new Error("Admin access required.");
}

export async function adminSetListingStatus(
  listingId: string,
  status: "ACTIVE" | "REMOVED"
) {
  await assertAdmin();

  await prisma.listing.update({
    where: { id: listingId },
    data: { status },
  });

  revalidatePath("/admin/listings");
  revalidatePath("/admin/reports");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function resolveReport(reportId: string) {
  await assertAdmin();

  await prisma.report.update({
    where: { id: reportId },
    data: { status: "RESOLVED" },
  });

  revalidatePath("/admin/reports");
  revalidatePath("/admin");
}

export async function dismissReport(reportId: string) {
  await assertAdmin();

  await prisma.report.update({
    where: { id: reportId },
    data: { status: "DISMISSED" },
  });

  revalidatePath("/admin/reports");
  revalidatePath("/admin");
}
