"use server";

import { auth } from "@/auth";
import { CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";

export type CreateListingState = {
  error: string | null;
  success: boolean;
};

export async function createListingDraft(
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

  console.log("Validated listing (photos + save arrive Day 13-14):", {
    title,
    category,
    price: negotiable ? null : Number(priceRaw),
    location,
    paymentMethods,
    deliveryAvailable,
    phone,
  });

  return { error: null, success: true };
}
