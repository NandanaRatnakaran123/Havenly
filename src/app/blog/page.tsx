import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { guides } from "@/data/guides";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Property guides & advice",
  description: "Practical guides on buying, renting, financing and registering property in India.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Property <span className="text-emerald-600">guides</span>
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
        Clear, practical advice for buyers, tenants, owners and NRIs.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {guides.map((g) => (
          <article
            key={g.slug}
            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {g.category}
            </span>
            <h2 className="mt-3 text-xl font-bold">
              <Link
                href={`/blog/${g.slug}`}
                className="group-hover:text-emerald-600 after:absolute after:inset-0 after:content-['']"
              >
                {g.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{g.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{formatDate(g.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" /> {g.readMins} min read
              </span>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
              Read guide <ArrowRight className="size-4" />
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
