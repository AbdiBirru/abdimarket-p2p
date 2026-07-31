"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";
import { type CreateListingState } from "@/lib/actions/create-listing";

type CategoryValue = (typeof CATEGORIES)[number]["value"];
type PaymentMethodValue = (typeof PAYMENT_METHODS)[number]["value"];

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

export async function updateListing(
  listingId: string,
  _prevState: CreateListingState,
  formData: FormData
): Promise<CreateListingState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in.", success: false };
  }

  try {
    await assertOwnership(listingId, session.user.id);
  } catch {
    return { error: "You don't have permission to edit this listing.", success: false };
  }

  const title = (formData.get("title") as string)?.trim();
  const category = formData.get("category") as string;
  const priceRaw = formData.get("price") as string;
  const negotiable = formData.get("negotiable") === "on";
  const location = (formData.get("location") as string)?.trim();
  const paymentMethods = formData.getAll("paymentMethods") as string[];
  const deliveryAvailable = formData.get("deliveryAvailable") === "yes";
  const phone = (formData.get("phone") as string)?.trim();
  const photos = formData.getAll("photos") as string[];

  if (!title) return { error: "Title is required.", success: false };

  if (!CATEGORIES.some((c) => c.value === category)) {
    return { error: "Choose a category.", success: false };
  }

  if (!negotiable && !priceRaw) {
    return { error: "Enter a price, or mark it as negotiable.", success: false };
  }
  if (!negotiable && (isNaN(Number(priceRaw)) || Number(priceRaw) <= 0)) {
    return { error: "Enter a valid price.", success: false };
  }

  if (!location) return { error: "Location is required.", success: false };

  if (
    paymentMethods.length === 0 ||
    !paymentMethods.every((m) => PAYMENT_METHODS.some((p) => p.value === m))
  ) {
    return { error: "Select at least one payment method.", success: false };
  }

  if (!phone) return { error: "Phone number is required.", success: false };

  if (photos.length === 0) {
    return { error: "Add at least one photo.", success: false };
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: {
      title,
      category: category as CategoryValue,
      price: negotiable ? null : Number(priceRaw),
      location,
      paymentMethods: paymentMethods as PaymentMethodValue[],
      deliveryAvailable,
      phone,
      photos,
    },
  });

  revalidatePath("/my-listings");
  revalidatePath(`/listings/${listingId}`);
  revalidatePath("/");

  redirect("/my-listings");
}
