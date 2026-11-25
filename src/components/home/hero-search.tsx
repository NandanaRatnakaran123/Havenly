"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { categoryLabels, cities } from "@/config/site";
import { budgetOptions } from "@/lib/filters";
import { cn } from "@/lib/utils";
import type { ListingType, PropertyCategory } from "@/types/property";

const tabs: { label: string; type?: ListingType; category?: PropertyCategory }[] = [
  { label: "All" },
  { label: "Buy", type: "sale" },
  { label: "Rent", type: "rent" },
  { label: "Commercial", type: "sale", category: "commercial" },
  { label: "Plots", type: "sale", category: "plot" },
];

const selectCls =
  "h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  const current = tabs[tab];
  const tabCategoryLocked = !!current.category;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (current.type) params.set("type", current.type);
    const cat = current.category ?? category;
    if (cat) params.set("category", cat);
    if (city) params.set("city", city);
    if (q.trim()) params.set("q", q.trim());
    if (budget) params.set("budget", budget);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl bg-white p-3 shadow-2xl shadow-emerald-950/20 sm:p-4 dark:bg-slate-900">
      <div role="tablist" aria-label="Search type" className="mb-3 flex gap-1 overflow-x-auto">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={tab === i}
            onClick={() => {
              setTab(i);
              setBudget("");
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition",
              tab === i
                ? "bg-emerald-600 text-white"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-12">
        <label className="md:col-span-3">
          <span className="sr-only">City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="md:col-span-3">
          <span className="sr-only">Locality or project</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Locality, project or landmark"
            className={selectCls}
          />
        </label>
        <label className="md:col-span-2">
          <span className="sr-only">Property type</span>
          <select
            value={tabCategoryLocked ? current.category : category}
            disabled={tabCategoryLocked}
            onChange={(e) => setCategory(e.target.value)}
            className={cn(selectCls, "disabled:opacity-70")}
          >
            <option value="">All types</option>
            {(Object.keys(categoryLabels) as PropertyCategory[]).map((k) => (
              <option key={k} value={k}>
                {categoryLabels[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="sr-only">Budget</span>
          <select
            value={budget}
            disabled={!current.type}
            onChange={(e) => setBudget(e.target.value)}
            className={cn(selectCls, "disabled:opacity-70")}
          >
            <option value="">{current.type ? "Any budget" : "Budget (pick Buy/Rent)"}</option>
            {(current.type ? budgetOptions[current.type] : []).map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 md:col-span-2"
        >
          <Search className="size-4" /> Search
        </button>
      </form>
    </div>
  );
}
