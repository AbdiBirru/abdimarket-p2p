import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-coffee-950/10 bg-white shadow-sm shadow-coffee-950/5",
        className
      )}
      {...props}
    />
  );
}
