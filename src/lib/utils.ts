import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null) {
  if (price === null) return "Negotiable";
  return `Br ${price.toLocaleString("en-US")}`;
}
