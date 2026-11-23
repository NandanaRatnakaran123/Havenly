import Link from "next/link";
import { Home, Mail, MapPin, Phone } from "lucide-react";
import { cities, siteConfig } from "@/config/site";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Buy a home", href: "/properties?type=sale" },
      { label: "Rent a home", href: "/properties?type=rent" },
      { label: "Commercial spaces", href: "/properties?category=commercial" },
      { label: "Plots & land", href: "/properties?category=plot" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "EMI calculator", href: "/finance" },
      { label: "Legal advice", href: "/services#legal" },
      { label: "Property registration", href: "/services#registration" },
      { label: "Building plan & permits", href: "/services#building" },
      { label: "Property guides", href: "/blog" },
    ],
  },
  {
    title: "For you",
    links: [
      { label: "Post property free", href: "/post-property" },
      { label: "Post your requirement", href: "/post-requirement" },
      { label: "Saved properties", href: "/saved" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-600">
              <Home className="size-4" />
            </span>
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Havenly connects buyers, tenants and owners with verified properties across India. No
            hidden fees, no spam — just homes.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-emerald-400" /> 1800-000-0000 (toll free)
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-emerald-400" /> hello@havenly.example
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-emerald-400" /> Bengaluru, India
            </li>
          </ul>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
              {c.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-emerald-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 px-4 py-5 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Popular cities:</span>
          {cities.map((c) => (
            <Link
              key={c.name}
              href={`/properties?city=${encodeURIComponent(c.name)}`}
              className="hover:text-emerald-400"
            >
              Properties in {c.name}
            </Link>
          ))}
        </div>
        <p className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
          © 2026 {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
