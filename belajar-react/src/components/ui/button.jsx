import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * ====================================================================
 * SHADCN UI BUTTON COMPONENT (Tailwind CSS + CVA)
 * ====================================================================
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-sky-600 text-white shadow hover:bg-sky-700 active:scale-95 shadow-sky-600/20",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-95",
        outline:
          "border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 hover:text-sky-600 hover:border-sky-300",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900",
        link:
          "text-sky-600 underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md hover:from-sky-500 hover:to-sky-600 active:scale-95",
        whatsapp:
          "bg-[#25D366] text-white shadow-md hover:bg-[#20ba59] active:scale-95 shadow-emerald-500/20",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-9 w-9",
        pill: "h-9 px-5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
