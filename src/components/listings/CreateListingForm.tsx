"use client";

import { useActionState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";
import { createListingDraft } from "@/lib/actions/create-listing";

export default function CreateListingForm() {
  const [state, formAction, isPending] = useActionState(createListingDraft, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-coffee-950">
          Item title
        </label>
        <Input id="title" name="title" required placeholder="e.g. Samsung Galaxy A54 – Like New" />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-coffee-950">
          Category
        </label>
        <Select id="category" name="category" required defaultValue="">
          <option value="" disabled>
            Choose a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="price" className="mb-1 block text-sm font-medium text-coffee-950">
          Price (Br)
        </label>
        <Input id="price" name="price" type="number" min="1" placeholder="e.g. 18500" />
        <label className="mt-2 flex items-center gap-2 text-sm text-coffee-950/70">
          <input
            type="checkbox"
            name="negotiable"
            className="h-4 w-4 rounded border-coffee-950/30 accent-marigold-500"
          />
          Price is negotiable
        </label>
      </div>

      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-coffee-950">
          Location / area
        </label>
        <Input id="location" name="location" required placeholder="e.g. Bole, Addis Ababa" />
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
              <input type="checkbox" name="paymentMethods" value={m.value} className="sr-only" />
              {m.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 block text-sm font-medium text-coffee-950">Delivery available?</p>
        <div className="flex gap-2">
          <label className="flex-1 cursor-pointer rounded-xl border border-coffee-950/15 px-4 py-2.5 text-center text-sm text-coffee-950 has-[:checked]:border-marigold-500 has-[:checked]:bg-marigold-500 has-[:checked]:font-semibold">
            <input type="radio" name="deliveryAvailable" value="yes" className="sr-only" />
            Yes
          </label>
          <label className="flex-1 cursor-pointer rounded-xl border border-coffee-950/15 px-4 py-2.5 text-center text-sm text-coffee-950 has-[:checked]:border-marigold-500 has-[:checked]:bg-marigold-500 has-[:checked]:font-semibold">
            <input type="radio" name="deliveryAvailable" value="no" defaultChecked className="sr-only" />
            No
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-coffee-950">
          Contact phone number
        </label>
        <Input id="phone" name="phone" type="tel" required placeholder="+251 9XX XXX XXX" />
      </div>

      <div className="rounded-xl border border-dashed border-coffee-950/20 p-4 text-center text-sm text-coffee-950/50">
        Photo upload arrives on Day 13
      </div>

      {state.error && (
        <p className="rounded-lg bg-brick-600/10 px-3 py-2 text-sm text-brick-600">{state.error}</p>
      )}
      {state.success && (
        <p className="rounded-lg bg-eucalyptus-600/10 px-3 py-2 text-sm text-eucalyptus-600">
          Looks good — once photos are wired up (Day 13-14), this same form will actually publish your listing.
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Checking..." : "Continue"}
      </Button>
    </form>
  );
}
