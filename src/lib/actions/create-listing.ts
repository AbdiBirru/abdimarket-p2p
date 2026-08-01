"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";

type CategoryValue = (typeof CATEGORIES)[number]["value"];
type PaymentMethodValue = (typeof PAYMENT_METHODS)[number]["value"];

export type CreateListingState = {
  error: string | null;
  success: boolean;
};

export async function createListing(
  _prevState: CreateListingState,
  formData: FormData
): Promise<CreateListingState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in.", success: false };
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

  const details: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("detail:") && typeof value === "string" && value.trim()) {
      details[key.slice(7)] = value.trim();
    }
  }

  await prisma.listing.create({
    data: {
      title,
      category: category as CategoryValue,
      price: negotiable ? null : Number(priceRaw),
      location,
      paymentMethods: paymentMethods as PaymentMethodValue[],
      deliveryAvailable,
      phone,
      photos,
      sellerId: session.user.id,
      ...(Object.keys(details).length > 0 ? { details } : {}),
    },
  });

  return { error: null, success: true };
}
