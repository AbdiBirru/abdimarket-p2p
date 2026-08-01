import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-marigold-500 focus:ring-2 focus:ring-marigold-500/30",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
