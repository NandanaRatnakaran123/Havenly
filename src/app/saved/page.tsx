import { SavedList } from "@/components/property/saved-list";
import { properties } from "@/data/properties";

export const metadata = { title: "Saved properties" };

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Saved properties</h1>
      <SavedList all={properties} />
    </div>
  );
}
