"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/property/property-card";
import { categoryLabels, cities } from "@/config/site";
import {
  budgetOptions,
  filterProperties,
  sortLabels,
  type PropertyFilters,
  type SortKey,
} from "@/lib/filters";
import { cn } from "@/lib/utils";
import type { ListingType, Property, PropertyCategory } from "@/types/property";

const field =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900";

function parseFilters(sp: URLSearchParams): PropertyFilters {
  const typeParam = sp.get("type");
  const type: ListingType | undefined =
    typeParam === "rent" ? "rent" : typeParam === "sale" ? "sale" : undefined;
  const category = sp.get("category") as PropertyCategory | null;
  const beds = sp.get("beds");
  const budget = sp.get("budget");
  const sort = sp.get("sort") as SortKey | null;
  const by = sp.get("by");
  const budgetIdx = budget !== null ? Number(budget) : undefined;

  return {
    type,
    city: sp.get("city") || undefined,
    category: category && category in categoryLabels ? category : undefined,
    beds: beds ? Number(beds) : undefined,
    budget:
      type && budgetIdx !== undefined && budgetOptions[type][budgetIdx] ? budgetIdx : undefined,
    q: sp.get("q") || undefined,
    verified: sp.get("verified") === "1",
    by: by === "owner" || by === "agent" || by === "builder" ? by : undefined,
    sort: sort && sort in sortLabels ? sort : "relevance",
  };
}

export function PropertyExplorer({ all }: { all: Property[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const filters = useMemo(() => parseFilters(new URLSearchParams(searchParams)), [searchParams]);
  const results = useMemo(() => filterProperties(all, filters), [all, filters]);

  function update(changes: Record<string, string | undefined>) {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  const forWhat = filters.type === "sale" ? " for sale" : filters.type === "rent" ? " for rent" : "";
  const title = `${filters.category ? categoryLabels[filters.category] : "Properties"}${forWhat}${
    filters.city ? ` in ${filters.city}` : ""
  }`;

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <span className="mb-2 block text-sm font-semibold">I want to</span>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          {([undefined, "sale", "rent"] as const).map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              onClick={() => update({ type: t, budget: undefined })}
              className={cn(
                "rounded-md py-1.5 text-sm font-semibold",
                filters.type === t
                  ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-950 dark:text-emerald-400"
                  : "text-slate-600 dark:text-slate-400",
              )}
            >
              {t === undefined ? "All" : t === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Locality, district or property ID</span>
        <input
          key={filters.q ?? ""}
          defaultValue={filters.q}
          placeholder="e.g. Whitefield, Thrissur, HVN1004"
          onBlur={(e) => update({ q: e.target.value.trim() || undefined })}
          onKeyDown={(e) => {
            if (e.key === "Enter") update({ q: e.currentTarget.value.trim() || undefined });
          }}
          className={field}
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">City</span>
        <select
          value={filters.city ?? ""}
          onChange={(e) => update({ city: e.target.value || undefined })}
          className={field}
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Property type</span>
        <select
          value={filters.category ?? ""}
          onChange={(e) => update({ category: e.target.value || undefined })}
          className={field}
        >
          <option value="">All types</option>
          {(Object.keys(categoryLabels) as PropertyCategory[]).map((k) => (
            <option key={k} value={k}>
              {categoryLabels[k]}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Budget</span>
        <select
          value={filters.budget ?? ""}
          disabled={!filters.type}
          onChange={(e) => update({ budget: e.target.value || undefined })}
          className={cn(field, "disabled:opacity-60")}
        >
          <option value="">{filters.type ? "Any budget" : "Pick Buy or Rent first"}</option>
          {(filters.type ? budgetOptions[filters.type] : []).map((b, i) => (
            <option key={b.label} value={i}>
              {b.label}
            </option>
          ))}
        </select>
      </label>

      <div>
        <span className="mb-2 block text-sm font-semibold">Bedrooms</span>
        <div className="flex flex-wrap gap-2">
          {[undefined, 1, 2, 3, 4].map((n) => (
            <button
              key={n ?? "any"}
              type="button"
              aria-pressed={filters.beds === n}
              onClick={() => update({ beds: n ? String(n) : undefined })}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                filters.beds === n
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 hover:border-emerald-500 dark:border-slate-700",
              )}
            >
              {n === undefined ? "Any" : n === 4 ? "4+" : n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm font-semibold">Posted by</span>
        <div className="flex flex-wrap gap-2">
          {[undefined, "owner", "builder", "agent"].map((r) => (
            <button
              key={r ?? "all"}
              type="button"
              aria-pressed={filters.by === r}
              onClick={() => update({ by: r })}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition",
                filters.by === r
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 hover:border-emerald-500 dark:border-slate-700",
              )}
            >
              {r ?? "All"}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={!!filters.verified}
          onChange={(e) => update({ verified: e.target.checked ? "1" : undefined })}
          className="size-4 accent-emerald-600"
        />
        Verified listings only
      </label>

      <button
        type="button"
        onClick={() =>
          router.replace(filters.type ? `${pathname}?type=${filters.type}` : pathname, {
            scroll: false,
          })
        }
        className="w-full rounded-lg border border-slate-200 py-2 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-slate-500" aria-live="polite">
            {results.length} {results.length === 1 ? "property" : "properties"} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            aria-expanded={showFilters}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold lg:hidden dark:border-slate-700"
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="hidden text-slate-500 sm:inline">Sort by</span>
            <select
              value={filters.sort}
              onChange={(e) =>
                update({ sort: e.target.value === "relevance" ? undefined : e.target.value })
              }
              className={cn(field, "w-auto")}
            >
              {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {sortLabels[k]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside
          aria-label="Filters"
          className={cn(
            "h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24 lg:block dark:border-slate-800 dark:bg-slate-900",
            showFilters ? "block" : "hidden",
          )}
        >
          {filterPanel}
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-slate-300 px-6 py-20 text-center dark:border-slate-700">
              <SearchX className="size-12 text-slate-400" />
              <h2 className="mt-4 text-xl font-bold">No properties match your search</h2>
              <p className="mt-1 text-slate-500">Try removing a filter or widening your budget.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
