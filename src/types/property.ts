export type ListingType = "sale" | "rent";

export type PropertyCategory = "apartment" | "villa" | "house" | "plot" | "commercial";

export type Furnishing = "furnished" | "semi-furnished" | "unfurnished";

export type PosterRole = "owner" | "agent" | "builder";

export interface Property {
  id: string;
  title: string;
  description: string;
  /** Total price for sale listings, monthly rent for rent listings (INR). */
  price: number;
  type: ListingType;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  address: string;
  locality: string;
  city: string;
  /** Kerala district, where applicable (used for district search). */
  district?: string;
  image: string;
  /** Optional listing-specific photo. Overrides the category photo when set. */
  photo?: string;
  featured?: boolean;
  verified?: boolean;
  furnishing?: Furnishing;
  possession: string;
  postedDaysAgo: number;
  postedBy: { name: string; role: PosterRole };
  amenities: string[];
}
