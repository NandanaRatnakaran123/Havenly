import { propertyRef } from "@/lib/utils";
import type { ListingType, PosterRole, Property, PropertyCategory } from "@/types/property";

export interface BudgetOption {
  label: string;
  min: number;
  max: number;
}

const LAC = 100_000;
const CR = 10_000_000;

export const budgetOptions: Record<ListingType, BudgetOption[]> = {
  sale: [
    { label: "Under ₹50 Lac", min: 0, max: 50 * LAC },
    { label: "₹50 Lac – ₹1 Cr", min: 50 * LAC, max: CR },
    { label: "₹1 Cr – ₹2 Cr", min: CR, max: 2 * CR },
    { label: "₹2 Cr – ₹5 Cr", min: 2 * CR, max: 5 * CR },
    { label: "Above ₹5 Cr", min: 5 * CR, max: Infinity },
  ],
  rent: [
    { label: "Under ₹20,000", min: 0, max: 20_000 },
    { label: "₹20,000 – ₹50,000", min: 20_000, max: 50_000 },
    { label: "₹50,000 – ₹1 Lac", min: 50_000, max: LAC },
    { label: "Above ₹1 Lac", min: LAC, max: Infinity },
  ],
};

export type SortKey = "relevance" | "newest" | "price-asc" | "price-desc";

export const sortLabels: Record<SortKey, string> = {
  relevance: "Relevance",
  newest: "Newest first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export interface PropertyFilters {
  /** Omit to include both sale and rent listings. */
  type?: ListingType;
  city?: string;
  category?: PropertyCategory;
  /** Minimum bedrooms (4 means "4+"). */
  beds?: number;
  /** Index into `budgetOptions[type]`. */
  budget?: number;
  q?: string;
  verified?: boolean;
  /** Advertiser type. */
  by?: PosterRole;
  sort: SortKey;
}

export function filterProperties(list: Property[], f: PropertyFilters): Property[] {
  const budget =
    f.budget !== undefined && f.type ? budgetOptions[f.type][f.budget] : undefined;
  const q = f.q?.trim().toLowerCase();

  const result = list.filter((p) => {
    if (f.type && p.type !== f.type) return false;
    if (f.city && p.city !== f.city) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.beds !== undefined && p.bedrooms < f.beds) return false;
    if (budget && (p.price < budget.min || p.price >= budget.max)) return false;
    if (f.verified && !p.verified) return false;
    if (f.by && p.postedBy.role !== f.by) return false;
    if (q) {
      const haystack =
        `${p.title} ${p.locality} ${p.city} ${p.district ?? ""} ${p.address} ${propertyRef(p.id)}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  switch (f.sort) {
    case "newest":
      return result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    default:
      return result.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
}
