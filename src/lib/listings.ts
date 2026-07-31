import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/constants";

type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const PAGE_SIZE = 12;

type ListingFilters = {
  query?: string;
  category?: string;
  location?: string;
  sort?: string;
};

function buildWhere(filters: ListingFilters) {
  const { query, category, location } = filters;
  return {
    status: "ACTIVE" as const,
    ...(query ? { title: { contains: query, mode: "insensitive" as const } } : {}),
    ...(category && CATEGORIES.some((c) => c.value === category)
      ? { category: category as CategoryValue }
      : {}),
    ...(location ? { location } : {}),
  };
}

function getOrderBy(sort?: string) {
  switch (sort) {
    case "price-asc":
      return { price: { sort: "asc" as const, nulls: "last" as const } };
    case "price-desc":
      return { price: { sort: "desc" as const, nulls: "last" as const } };
    default:
      return { createdAt: "desc" as const };
  }
}

export async function getActiveListings(
  userId: string | null = null,
  filters: ListingFilters = {},
  page = 1
) {
  const listings = await prisma.listing.findMany({
    where: buildWhere(filters),
    orderBy: getOrderBy(filters.sort),
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
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

export async function getActiveListingsCount(filters: ListingFilters = {}) {
  return prisma.listing.count({ where: buildWhere(filters) });
}

export async function getDistinctLocations() {
  const results = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    select: { location: true },
    distinct: ["location"],
    orderBy: { location: "asc" },
  });
  return results.map((r) => r.location);
}

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
