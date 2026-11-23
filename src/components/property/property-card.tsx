import Image from "next/image";
import Link from "next/link";
import { Bath, BadgeCheck, BedDouble, MapPin, Ruler } from "lucide-react";
import { FavoriteButton } from "@/components/property/favorite-button";
import { categoryLabels } from "@/config/site";
import { formatArea, formatPrice, postedLabel } from "@/lib/utils";
import type { Property } from "@/types/property";

export function PropertyCard({ property: p }: { property: Property }) {
  const hasRooms = p.bedrooms > 0;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.title} in ${p.locality}, ${p.city}`}
          width={800}
          height={500}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white">
            For {p.type === "sale" ? "sale" : "rent"}
          </span>
          {p.featured && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950">
              Featured
            </span>
          )}
        </div>
        <FavoriteButton id={p.id} className="absolute top-3 right-3 z-10" />
        {p.verified && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            <BadgeCheck className="size-3.5" /> Verified
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xl font-bold text-slate-900 dark:text-white">
          {formatPrice(p.price)}
          {p.type === "rent" && <span className="text-sm font-normal text-slate-500"> /mo</span>}
        </p>
        <h3 className="line-clamp-2 font-semibold">
          <Link
            href={`/properties/${p.id}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-emerald-600"
          >
            {p.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="size-4 shrink-0" />
          {p.locality}, {p.city}
        </p>

        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          {hasRooms && (
            <>
              <span className="flex items-center gap-1.5">
                <BedDouble className="size-4" /> {p.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="size-4" /> {p.bathrooms} Baths
              </span>
            </>
          )}
          <span className="flex items-center gap-1.5">
            <Ruler className="size-4" /> {formatArea(p.areaSqft)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-500">
          <span>{categoryLabels[p.category]}</span>
          <span>{postedLabel(p.postedDaysAgo)}</span>
        </div>
      </div>
    </article>
  );
}
