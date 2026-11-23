import type { PropertyCategory } from "@/types/property";

export const siteConfig = {
  name: "Havenly",
  description:
    "Find your perfect home with Havenly — verified flats, villas, plots and offices to buy or rent across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Optional WhatsApp number (digits only, with country code). The button is hidden when unset. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  nav: [
    { label: "Buy", href: "/properties?type=sale" },
    { label: "Rent", href: "/properties?type=rent" },
    { label: "Commercial", href: "/properties?category=commercial" },
    { label: "Plots", href: "/properties?category=plot" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "EMI & eligibility calculators", href: "/finance" },
        { label: "Legal advice", href: "/services#legal" },
        { label: "Property registration", href: "/services#registration" },
        { label: "Building plan & permits", href: "/services#building" },
        { label: "Post your requirement", href: "/post-requirement" },
      ],
    },
    { label: "Guides", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const keralaDistricts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
] as const;

export const cities = [
  {
    name: "Bengaluru",
    tagline: "Silicon Valley of India",
    listings: 12400,
    from: "#0f766e",
    to: "#34d399",
  },
  { name: "Mumbai", tagline: "City of dreams", listings: 18200, from: "#1d4ed8", to: "#60a5fa" },
  { name: "Hyderabad", tagline: "Pearl city", listings: 9600, from: "#7c3aed", to: "#c4b5fd" },
  { name: "Pune", tagline: "Oxford of the East", listings: 8100, from: "#be123c", to: "#fb7185" },
  { name: "Gurugram", tagline: "Millennium city", listings: 7300, from: "#b45309", to: "#fbbf24" },
  {
    name: "Chennai",
    tagline: "Gateway of the South",
    listings: 6500,
    from: "#0369a1",
    to: "#38bdf8",
  },
  {
    name: "Kochi",
    tagline: "Queen of the Arabian Sea",
    listings: 3900,
    from: "#15803d",
    to: "#86efac",
  },
  {
    name: "Thiruvananthapuram",
    tagline: "Kerala's capital city",
    listings: 2800,
    from: "#9d174d",
    to: "#f9a8d4",
  },
  { name: "Kozhikode", tagline: "City of spices", listings: 2600, from: "#92400e", to: "#fcd34d" },
  { name: "Thrissur", tagline: "Cultural capital", listings: 2100, from: "#4338ca", to: "#a5b4fc" },
] as const;

/**
 * Single source of truth for category pictures (type tiles, and anywhere else
 * a category image is needed). To use your own photos, drop them in
 * `public/images/categories/` and change the paths here.
 */
export const categoryImages: Record<PropertyCategory, string> = {
  apartment: "/images/categories/apartment.png",
  villa: "/images/categories/villa.png",
  house: "/images/categories/house.png",
  plot: "/images/categories/plot.png",
  commercial: "/images/categories/commercial.png",
};

/**
 * All photos available per category. The first one is the "cover" (same as
 * `categoryImages`); listings rotate through the list so a page full of
 * apartments doesn't repeat one picture. Append more files here to add variety.
 */
export const categoryGallery: Record<PropertyCategory, string[]> = {
  apartment: [categoryImages.apartment, "/images/categories/apartment-2.png"],
  villa: [categoryImages.villa],
  house: [categoryImages.house, "/images/categories/house-2.png"],
  plot: [categoryImages.plot],
  commercial: [categoryImages.commercial],
};

export const categoryLabels: Record<PropertyCategory, string> = {
  apartment: "Apartment",
  villa: "Villa",
  house: "Independent house",
  plot: "Plot / Land",
  commercial: "Commercial",
};
