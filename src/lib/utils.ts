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

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta", // Use Jakarta timezone for WIB
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
    new Date(date),
  );

  return `${formattedDate} WIB`;
}
