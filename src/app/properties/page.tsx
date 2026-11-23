import { Suspense } from "react";
import { PropertyExplorer } from "@/components/property/property-explorer";
import { properties } from "@/data/properties";

export const metadata = {
  title: "Properties for sale & rent",
  description: "Search verified flats, villas, plots and commercial spaces to buy or rent.",
};

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-slate-500">Loading properties…</div>
      }
    >
      <PropertyExplorer all={properties} />
    </Suspense>
  );
}
