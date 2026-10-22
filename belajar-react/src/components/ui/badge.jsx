import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * ====================================================================
 * SHADCN UI BADGE COMPONENT
 * ====================================================================
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-sky-600 text-white shadow hover:bg-sky-700",
        secondary:
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200",
        destructive:
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        outline:
          "text-slate-800 border-slate-200",
        success:
          "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        amber:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        sky:
          "border-transparent bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
