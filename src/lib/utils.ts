import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const trim = (n: number) => n.toFixed(2).replace(/\.?0+$/, "");

/** Indian price format: ₹1.55 Cr, ₹85 Lac, ₹45,000. */
export function formatPrice(value: number) {
  if (value >= 10_000_000) return `₹${trim(value / 10_000_000)} Cr`;
  if (value >= 100_000) return `₹${trim(value / 100_000)} Lac`;
  return `₹${new Intl.NumberFormat("en-IN").format(value)}`;
}

export function formatArea(sqft: number) {
  return `${new Intl.NumberFormat("en-IN").format(sqft)} sq.ft`;
}

export function pricePerSqft(price: number, sqft: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(Math.round(price / sqft))}/sq.ft`;
}

/** Human-friendly reference ID shown on listings, e.g. "HVN1004". Searchable. */
export function propertyRef(id: string) {
  return `HVN${1000 + Number(id)}`;
}

export function postedLabel(days: number) {
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  return `Posted ${days} days ago`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-10" -> "10 Nov 2026". Pure string formatting so it is safe for prerendering. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
