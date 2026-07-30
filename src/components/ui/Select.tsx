import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-coffee-950/15 bg-white px-4 py-2.5 text-sm text-coffee-950 outline-none transition-colors focus:border-marigold-500 focus:ring-2 focus:ring-marigold-500/30",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export default Select;
