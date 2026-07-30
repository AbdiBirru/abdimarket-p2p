/*
  Warnings:

  - Added the required column `location` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CBE_BIRR', 'TELEBIRR', 'BANK_TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'SOLD', 'REMOVED');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "deliveryAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "paymentMethods" "PaymentMethod"[],
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Listing_status_category_idx" ON "Listing"("status", "category");

-- CreateIndex
CREATE INDEX "Listing_createdAt_idx" ON "Listing"("createdAt");
