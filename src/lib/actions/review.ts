"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type ReviewState = { error: string | null; success: boolean };

export async function createReview(
  sellerId: string,
  _prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in to leave a review.", success: false };
  }

  if (session.user.id === sellerId) {
    return { error: "You can't review your own seller profile.", success: false };
  }

  const rating = Number(formData.get("rating"));
  const comment = (formData.get("comment") as string)?.trim() || null;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Choose a rating from 1 to 5.", success: false };
  }

  await prisma.review.upsert({
    where: { sellerId_reviewerId: { sellerId, reviewerId: session.user.id } },
    create: { sellerId, reviewerId: session.user.id, rating, comment },
    update: { rating, comment },
  });

  return { error: null, success: true };
}
