import { prisma } from "@/lib/prisma";

export function getAllListingsForAdmin() {
  return prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      photos: true,
      category: true,
      price: true,
      status: true,
      createdAt: true,
      seller: { select: { name: true, email: true } },
    },
  });
}

export type AdminListingData = Awaited<ReturnType<typeof getAllListingsForAdmin>>[number];

export function getAllUsersForAdmin() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { listings: true } },
    },
  });
}

export type AdminUserData = Awaited<ReturnType<typeof getAllUsersForAdmin>>[number];

export function getReportsForAdmin(
  status: "PENDING" | "RESOLVED" | "DISMISSED" | "ALL" = "PENDING"
) {
  return prisma.report.findMany({
    where: status === "ALL" ? {} : { status },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      reason: true,
      details: true,
      status: true,
      createdAt: true,
      reporter: { select: { name: true } },
      listing: {
        select: {
          id: true,
          title: true,
          photos: true,
          status: true,
        },
      },
    },
  });
}

export type AdminReportData = Awaited<ReturnType<typeof getReportsForAdmin>>[number];
