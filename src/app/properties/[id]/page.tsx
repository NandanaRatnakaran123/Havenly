import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  BadgeCheck,
  Bath,
  BedDouble,
  Calculator,
  Calendar,
  Check,
  ChevronRight,
  Compass,
  ExternalLink,
  MapPin,
  MessageCircle,
  Ruler,
  Sofa,
} from "lucide-react";
import { EnquiryForm } from "@/components/property/enquiry-form";
import { FavoriteButton } from "@/components/property/favorite-button";
import { PropertyCard } from "@/components/property/property-card";
import { categoryLabels, siteConfig } from "@/config/site";
import { getPropertyById, properties } from "@/data/properties";
import { estimateEmi } from "@/lib/finance";
import { formatArea, formatPrice, postedLabel, pricePerSqft, propertyRef } from "@/lib/utils";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.locality}`,
    description: `${p.title} in ${p.locality}, ${p.city} for ${formatPrice(p.price)}${
      p.type === "rent" ? "/month" : ""
    }. ${p.description.slice(0, 120)}`,
  };
}

function PropertyLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p role="status" className="text-slate-500">
        Loading property details...
      </p>
    </div>
  );
}

async function PropertyContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();

  const similar = properties
    .filter(
      (x) => x.id !== p.id && x.type === p.type && (x.city === p.city || x.category === p.category),
    )
    .slice(0, 3);

  const facts = [
    p.bedrooms > 0 && { icon: BedDouble, label: "Bedrooms", value: String(p.bedrooms) },
    p.bathrooms > 0 && { icon: Bath, label: "Bathrooms", value: String(p.bathrooms) },
    { icon: Ruler, label: "Area", value: formatArea(p.areaSqft) },
    { icon: Calendar, label: "Possession", value: p.possession },
    p.furnishing && {
      icon: Sofa,
      label: "Furnishing",
      value: p.furnishing.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase()),
    },
    { icon: Compass, label: "Type", value: categoryLabels[p.category] },
  ].filter((f): f is { icon: typeof Ruler; label: string; value: string } => !!f);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-1 text-sm text-slate-500"
      >
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href={`/properties?type=${p.type}`} className="hover:text-emerald-600">
          {p.type === "sale" ? "Buy" : "Rent"}
        </Link>
        <ChevronRight className="size-4" />
        <Link
          href={`/properties?type=${p.type}&city=${encodeURIComponent(p.city)}`}
          className="hover:text-emerald-600"
        >
          {p.city}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={p.image}
              alt={`${p.title} in ${p.locality}, ${p.city}`}
              width={1200}
              height={750}
              priority
              className="aspect-16/10 w-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
                For {p.type === "sale" ? "sale" : "rent"}
              </span>
              {p.featured && (
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-950">
                  Featured
                </span>
              )}
            </div>
            <FavoriteButton id={p.id} className="absolute top-4 right-4 size-10" />
          </div>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{p.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <MapPin className="size-4" /> {p.address}, {p.locality}, {p.city}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${p.address}, ${p.locality}, ${p.city}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
              >
                Open on Google Maps <ExternalLink className="size-3.5" />
              </a>
              <p className="mt-1 text-xs text-slate-400">
                {postedLabel(p.postedDaysAgo)} · Property ID: {propertyRef(p.id)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-emerald-600">
                {formatPrice(p.price)}
                {p.type === "rent" && (
                  <span className="text-base font-medium text-slate-500"> /mo</span>
                )}
              </p>
              {p.type === "sale" && (
                <>
                  <p className="text-sm text-slate-500">{pricePerSqft(p.price, p.areaSqft)}</p>
                  <Link
                    href={`/finance?amount=${p.price}`}
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-slate-300"
                  >
                    <Calculator className="size-4" />
                    EMI from {formatPrice(Math.round(estimateEmi(p.price)))}/mo*
                  </Link>
                </>
              )}
              {p.verified && (
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <BadgeCheck className="size-4" /> Verified by Havenly
                </p>
              )}
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <Icon className="size-5 text-emerald-600" />
                <div>
                  <dt className="text-xs text-slate-500">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <section className="mt-8">
            <h2 className="text-xl font-bold">About this property</h2>
            <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              {p.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">Amenities</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {p.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <Check className="size-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <EnquiryForm property={p} />
          {siteConfig.whatsapp && (
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                `Hi, I'm interested in "${p.title}" (${propertyRef(p.id)}) on ${siteConfig.name}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-emerald-600 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              <MessageCircle className="size-5" /> Chat on WhatsApp
            </a>
          )}
          {p.type === "sale" && (
            <p className="mt-3 text-xs text-slate-500">
              *Indicative EMI for an 80% loan at 8.5% over 20 years. Actual rates and eligibility
              depend on your lender.
            </p>
          )}
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight">Similar properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <PropertyCard key={s.id} property={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<PropertyLoading />}>
      <PropertyContent params={params} />
    </Suspense>
  );
}
