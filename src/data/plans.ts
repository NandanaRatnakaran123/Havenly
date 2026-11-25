export type PlanId = "basic" | "premium" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  /** Monthly price in rupees; 0 means free. */
  price: number;
  /** Max active listings; `Infinity` means unlimited. */
  listingLimit: number;
  features: string[];
  popular?: boolean;
}

export const FREE_LISTING_LIMIT = 3;

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "For getting started",
    price: 0,
    listingLimit: FREE_LISTING_LIMIT,
    features: ["Up to 3 active listings", "Standard placement", "Email support"],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For active owners and agents",
    price: 999,
    listingLimit: 25,
    popular: true,
    features: [
      "Up to 25 active listings",
      "Priority placement in search",
      "Verified by Havenly badge",
      "Phone and WhatsApp support",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For builders and agencies",
    price: 2999,
    listingLimit: Infinity,
    features: [
      "Unlimited listings",
      "Featured listings included",
      "Verified by Havenly badge",
      "Dedicated account manager",
    ],
  },
];

export function getPlan(id: PlanId): Plan {
  return plans.find((p) => p.id === id) ?? plans[0];
}
