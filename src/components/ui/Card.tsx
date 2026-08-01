import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-card shadow-sm shadow-black/5",
        className
      )}
      {...props}
    />
  );
}
