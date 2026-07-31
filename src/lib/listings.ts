import { prisma } from "@/lib/prisma";

export async function getActiveListings(userId: string | null = null) {
  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      photos: true,
      category: true,
      price: true,
      savedBy: {
        where: { userId: userId ?? "" },
        select: { id: true },
      },
    },
  });

  return listings.map(({ savedBy, ...listing }) => ({
    ...listing,
    isSaved: savedBy.length > 0,
  }));
}

export type ListingCardData = Awaited<ReturnType<typeof getActiveListings>>[number];

export async function getListingById(id: string, userId: string | null = null) {
  const listing = await prisma.listing.findUnique({
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
      sellerId: true,
      seller: { select: { name: true } },
      savedBy: {
        where: { userId: userId ?? "" },
        select: { id: true },
      },
    },
  });

  if (!listing) return null;

  const { savedBy, ...rest } = listing;
  return { ...rest, isSaved: savedBy.length > 0 };
}

export type ListingDetailData = NonNullable<Awaited<ReturnType<typeof getListingById>>>;

export function getMyListings(sellerId: string) {
  return prisma.listing.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      photos: true,
      price: true,
      status: true,
    },
  });
}

export type MyListingData = Awaited<ReturnType<typeof getMyListings>>[number];

export async function getSavedListings(userId: string) {
  const saved = await prisma.savedListing.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      listing: {
        select: {
          id: true,
          title: true,
          photos: true,
          category: true,
          price: true,
        },
      },
    },
  });

  return saved.map(({ listing }) => ({ ...listing, isSaved: true }));
}
