import { prisma } from "@/lib/prisma";

export function getActiveListings() {
  return prisma.listing.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      photos: true,
      category: true,
      price: true,
    },
  });
}

export type ListingCardData = Awaited<ReturnType<typeof getActiveListings>>[number];
