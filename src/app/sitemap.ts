import { type MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";

  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, updatedAt: true },
  });

  const listingUrls: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${baseUrl}/listings/${listing.id}`,
    lastModified: listing.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...listingUrls,
  ];
}
