"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function toggleSaveListing(listingId: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be logged in to save listings.");
  }

  const existing = await prisma.savedListing.findUnique({
    where: {
      userId_listingId: {
        userId: session.user.id,
        listingId,
      },
    },
  });

  if (existing) {
    await prisma.savedListing.delete({ where: { id: existing.id } });
  } else {
    await prisma.savedListing.create({
      data: { userId: session.user.id, listingId },
    });
  }

  revalidatePath("/saved");
  revalidatePath("/");
}
