"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function assertOwnership(listingId: string, userId: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { sellerId: true },
  });
  if (!listing || listing.sellerId !== userId) {
    throw new Error("Listing not found or you don't have permission.");
  }
}

export async function toggleSoldStatus(
  listingId: string,
  currentStatus: "ACTIVE" | "SOLD" | "REMOVED"
) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in.");

  await assertOwnership(listingId, session.user.id);

  const nextStatus = currentStatus === "SOLD" ? "ACTIVE" : "SOLD";
  await prisma.listing.update({
    where: { id: listingId },
    data: { status: nextStatus },
  });

  revalidatePath("/my-listings");
  revalidatePath("/");
}

export async function deleteListing(listingId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in.");

  await assertOwnership(listingId, session.user.id);

  await prisma.listing.delete({ where: { id: listingId } });

  revalidatePath("/my-listings");
  revalidatePath("/");
}
