import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ====================================================================
 * SHADCN UTILITY HELPER (cn)
 * ====================================================================
 * Menggabungkan class Tailwind dengan resolusi konflik otomatis (twMerge).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
