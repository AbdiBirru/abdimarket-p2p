"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PhotoUpload from "@/components/listings/PhotoUpload";
import ListingDetailFields from "@/components/listings/ListingDetailFields";
import { CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";
import { parseListingDetails } from "@/lib/utils";
import { updateListing } from "@/lib/actions/manage-listing";
import { type ListingDetailData } from "@/lib/listings";

export default function EditListingForm({ listing }: { listing: ListingDetailData }) {
  const [category, setCategory] = useState(listing.category);
  const updateListingWithId = updateListing.bind(null, listing.id);
  const [state, formAction, isPending] = useActionState(updateListingWithId, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-coffee-950">
          Item title
        </label>
        <Input id="title" name="title" required defaultValue={listing.title} />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-coffee-950">
          Category
        </label>
        <Select
          id="category"
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number]["value"])}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      <ListingDetailFields
        key={category}
        category={category}
        initialDetails={category === listing.category ? parseListingDetails(listing.details) : {}}
      />

      <div>
        <label htmlFor="price" className="mb-1 block text-sm font-medium text-coffee-950">
          Price (Br)
        </label>
        <Input
          id="price"
          name="price"
          type="number"
          min="1"
          defaultValue={listing.price ?? ""}
          placeholder="e.g. 18500"
        />
        <label className="mt-2 flex items-center gap-2 text-sm text-coffee-950/70">
          <input
            type="checkbox"
            name="negotiable"
            defaultChecked={listing.price === null}
            className="h-4 w-4 rounded border-coffee-950/30 accent-marigold-500"
          />
          Price is negotiable
        </label>
      </div>

      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-coffee-950">
          Location / area
        </label>
        <Input id="location" name="location" required defaultValue={listing.location} />
      </div>

      <div>
        <p className="mb-2 block text-sm font-medium text-coffee-950">
          Accepted payment methods
        </p>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_METHODS.map((m) => (
            <label
              key={m.value}
              className="cursor-pointer rounded-full border border-coffee-950/15 px-4 py-2 text-sm text-coffee-950 has-[:checked]:border-marigold-500 has-[:checked]:bg-marigold-500 has-[:checked]:font-semibold"
            >
              <input
                type="checkbox"
                name="paymentMethods"
                value={m.value}
                defaultChecked={listing.paymentMethods.includes(m.value)}
                className="sr-only"
              />
              {m.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 block text-sm font-medium text-coffee-950">Delivery available?</p>
        <div className="flex gap-2">
          <label className="flex-1 cursor-pointer rounded-xl border border-coffee-950/15 px-4 py-2.5 text-center text-sm text-coffee-950 has-[:checked]:border-marigold-500 has-[:checked]:bg-marigold-500 has-[:checked]:font-semibold">
            <input
              type="radio"
              name="deliveryAvailable"
              value="yes"
              defaultChecked={listing.deliveryAvailable}
              className="sr-only"
            />
            Yes
          </label>
          <label className="flex-1 cursor-pointer rounded-xl border border-coffee-950/15 px-4 py-2.5 text-center text-sm text-coffee-950 has-[:checked]:border-marigold-500 has-[:checked]:bg-marigold-500 has-[:checked]:font-semibold">
            <input
              type="radio"
              name="deliveryAvailable"
              value="no"
              defaultChecked={!listing.deliveryAvailable}
              className="sr-only"
            />
            No
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-coffee-950">
          Contact phone number
        </label>
        <Input id="phone" name="phone" type="tel" required defaultValue={listing.phone} />
      </div>

      <PhotoUpload initialPhotos={listing.photos} />

      {state.error && (
        <p className="rounded-lg bg-brick-600/10 px-3 py-2 text-sm text-brick-600">{state.error}</p>
      )}

      <div className="flex gap-2">
        <Link
          href="/my-listings"
          className="flex flex-1 items-center justify-center rounded-full border border-coffee-950/15 px-5 py-2.5 text-sm font-semibold text-coffee-950"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
