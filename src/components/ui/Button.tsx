import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonVariants(variant: ButtonVariant = "primary") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    variant === "primary" &&
      "bg-marigold-500 text-coffee-950 hover:bg-marigold-600",
    variant === "secondary" &&
      "bg-coffee-950 text-cream-50 hover:bg-coffee-700 dark:bg-coffee-700 dark:hover:bg-coffee-600",
    variant === "ghost" &&
      "border border-line bg-transparent text-ink hover:bg-black/5 dark:hover:bg-white/5"
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants(variant), className)} {...props} />
  );
}
