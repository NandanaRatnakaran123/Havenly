import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calculator,
  FileSignature,
  Hammer,
  Home,
  MapPin,
  MessageSquareQuote,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { categoryImages, categoryLabels, cities, keralaDistricts } from "@/config/site";
import { guides } from "@/data/guides";
import { formatDate } from "@/lib/utils";
import type { PropertyCategory } from "@/types/property";

export function SectionHeading({
  title,
  subtitle,
  href,
  cta,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700"
        >
          {cta ?? "View all"} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

export function Stats() {
  const stats = [
    { value: "50,000+", label: "Verified listings" },
    { value: "10", label: "Major cities" },
    { value: "2 Lakh+", label: "Happy customers" },
    { value: "4.8/5", label: "Average rating" },
  ];
  return (
    <dl className="mt-10 grid grid-cols-2 gap-6 text-white sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-2xl font-extrabold sm:text-3xl">{s.value}</dd>
          <dd className="text-sm text-white/90">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PropertyTypes() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading
        title="Explore by property type"
        subtitle="Whatever you are looking for, start here."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {(Object.keys(categoryLabels) as PropertyCategory[]).map((k) => (
          <Link
            key={k}
            href={`/properties?category=${k}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="overflow-hidden">
              <Image
                src={categoryImages[k]}
                alt={`${categoryLabels[k]} properties`}
                width={400}
                height={300}
                className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-semibold">{categoryLabels[k]}</span>
              <ArrowRight className="size-4 text-emerald-600 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PopularCities() {
  return (
    <section className="bg-white py-14 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Top cities to find your home"
          subtitle="Browse the most searched markets."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {cities.map((c) => (
            <Link
              key={c.name}
              href={`/properties?city=${encodeURIComponent(c.name)}`}
              style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
              className="group relative flex min-h-36 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Building2 className="absolute -top-3 -right-3 size-24 text-white/20 transition group-hover:scale-110" />
              <h3 className="text-xl font-bold">{c.name}</h3>
              <p className="text-sm text-white/85">{c.tagline}</p>
              <p className="mt-1 text-xs font-semibold text-white/90">
                {c.listings.toLocaleString("en-IN")}+ properties
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyHavenly() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Verified listings",
      body: "Every listing marked Verified is checked by our team, so you spend time on real homes, not dead ends.",
    },
    {
      icon: Users,
      title: "Direct owner contact",
      body: "Talk to owners, agents and builders directly. Send an enquiry and get a call back, usually within the hour.",
    },
    {
      icon: Sparkles,
      title: "Smart search",
      body: "Filter by city, budget, bedrooms and more, then save your favourites and compare them later.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading title="Why people choose Havenly" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-emerald-600 text-white">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PostCta() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-emerald-900 p-8 text-white sm:p-10">
        <Home className="absolute -right-6 -bottom-6 size-48 text-white/5" />
        <p className="text-sm font-semibold tracking-wide text-emerald-300 uppercase">
          For owners, agents and builders
        </p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Selling or renting out? List your property for free.
        </h2>
        <p className="mt-3 text-slate-300">
          Reach thousands of serious buyers and tenants every day, with enquiries straight to your
          phone.
        </p>
        <Link
          href="/post-property"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
        >
          Post your property <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-400 via-amber-300 to-yellow-200 p-8 text-amber-950 sm:p-10">
        <Search className="absolute -right-6 -bottom-6 size-48 text-amber-950/5" />
        <p className="text-sm font-semibold tracking-wide text-amber-900 uppercase">
          For buyers and tenants
        </p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Can&apos;t find what you need? Post your requirement.
        </h2>
        <p className="mt-3 text-amber-900">
          Tell us your budget, location and type of property. Matching owners and agents will reach
          out to you.
        </p>
        <Link
          href="/post-requirement"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-950 px-6 py-3 font-semibold text-white transition hover:bg-amber-900"
        >
          Post requirement <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

export function ServicesBand() {
  const items = [
    {
      icon: Calculator,
      title: "Home loan & EMI",
      body: "Calculate your EMI and eligibility, and get help comparing loan offers.",
      href: "/finance",
    },
    {
      icon: Scale,
      title: "Legal advice",
      body: "Title checks and agreement reviews by property lawyers.",
      href: "/services#legal",
    },
    {
      icon: FileSignature,
      title: "Property registration",
      body: "Stamp duty, documents and registration, step by step.",
      href: "/services#registration",
    },
    {
      icon: Hammer,
      title: "Building plan & permits",
      body: "Design, approvals and permits for your own plot.",
      href: "/services#building",
    },
  ];
  return (
    <section className="bg-white py-14 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="More than just listings"
          subtitle="Everything you need from first search to final signature."
          href="/services"
          cta="All services"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg dark:border-slate-800"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function KeralaDistricts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading
        title="Search properties by district in Kerala"
        subtitle="From the backwaters to the hills — find homes and land across God's own country."
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {keralaDistricts.map((d) => (
          <li key={d}>
            <Link
              href={`/properties?q=${encodeURIComponent(d)}`}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900"
            >
              <MapPin className="size-4 shrink-0 text-emerald-600" />
              {d}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LatestGuides() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading
        title="Latest property guides"
        subtitle="Advice for buyers, owners and NRIs."
        href="/blog"
        cta="All guides"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {guides.slice(0, 3).map((g) => (
          <article
            key={g.slug}
            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {g.category}
            </span>
            <h3 className="mt-3 font-bold">
              <Link
                href={`/blog/${g.slug}`}
                className="group-hover:text-emerald-600 after:absolute after:inset-0 after:content-['']"
              >
                {g.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{g.excerpt}</p>
            <p className="mt-4 text-xs text-slate-500">
              {formatDate(g.publishedAt)} · {g.readMins} min read
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Priya Nair",
    place: "Bought a 3 BHK in Whitefield",
    quote:
      "The filters saved me weeks. I shortlisted four flats, sent enquiries and had site visits booked the same weekend.",
  },
  {
    name: "Arjun Malhotra",
    place: "Rented in Gurugram",
    quote:
      "Listings were accurate and the owners actually picked up the phone. Closed the deal in under ten days.",
  },
  {
    name: "Fatima Sheikh",
    place: "Sold a plot in Pune",
    quote:
      "I posted my plot for free and got genuine buyer calls within two days. Very smooth experience.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-14 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Loved by home seekers"
          subtitle="Real stories from people who found their place."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <MessageSquareQuote className="size-8 text-emerald-500" />
              <div className="mt-3 flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-slate-700 dark:text-slate-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="block text-slate-500">{t.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
