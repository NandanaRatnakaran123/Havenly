import { HeroSearch } from "@/components/home/hero-search";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import {
  KeralaDistricts,
  LatestGuides,
  PopularCities,
  PostCta,
  PropertyTypes,
  SectionHeading,
  ServicesBand,
  Stats,
  Testimonials,
  WhyHavenly,
} from "@/components/home/sections";
import { PropertyCard } from "@/components/property/property-card";
import { properties } from "@/data/properties";

export const metadata = {
  title: { absolute: "Havenly | Buy, rent & sell property in India" },
};

export default function HomePage() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const recent = [...properties].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-700">
        <HeroSlideshow />
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:pt-24 sm:pb-16">
          <h1 className="max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find a home you&apos;ll <span className="text-amber-300">love living in.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            Verified flats, villas, plots and offices to buy or rent across India — contact owners
            directly, with no brokerage hassle.
          </p>
          {/* Generous gap so the slideshow photo stays visible above the search card */}
          <div className="mt-16 sm:mt-28 lg:mt-44">
            <HeroSearch />
          </div>
          <Stats />
        </div>
      </section>

      <PropertyTypes />

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionHeading
          title="Featured properties"
          subtitle="Hand-picked homes our customers love."
          href="/properties"
          cta="Browse all"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <PopularCities />
      <KeralaDistricts />
      <ServicesBand />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          title="Newly posted"
          subtitle="Be among the first to enquire."
          href="/properties"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <WhyHavenly />
      <PostCta />
      <LatestGuides />
      <Testimonials />
    </>
  );
}
