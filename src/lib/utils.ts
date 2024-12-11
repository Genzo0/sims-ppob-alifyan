import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, addStyle?: boolean) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: addStyle ? "currency" : "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
}
