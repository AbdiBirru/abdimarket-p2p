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

export function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      photos: true,
      category: true,
      price: true,
      location: true,
      paymentMethods: true,
      deliveryAvailable: true,
      phone: true,
      status: true,
      createdAt: true,
      seller: {
        select: { name: true },
      },
    },
  });
}

export type ListingDetailData = NonNullable<Awaited<ReturnType<typeof getListingById>>>;
