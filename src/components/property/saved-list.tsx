"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { useFavorites } from "@/store/favorites";
import type { Property } from "@/types/property";

export function SavedList({ all }: { all: Property[] }) {
  const ids = useFavorites((s) => s.ids);
  const saved = all.filter((p) => ids.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-slate-300 px-6 py-20 text-center dark:border-slate-700">
        <Heart className="size-12 text-slate-400" />
        <h2 className="mt-4 text-xl font-bold">No saved properties yet</h2>
        <p className="mt-1 text-slate-500">Tap the heart on any listing to shortlist it here.</p>
        <Link
          href="/properties"
          className="mt-5 rounded-full bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700"
        >
          Browse properties
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
