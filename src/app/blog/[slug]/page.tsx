import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { getGuide, guides } from "@/data/guides";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  return g ? { title: g.title, description: g.excerpt } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
      >
        <ArrowLeft className="size-4" /> All guides
      </Link>
      <span className="mt-6 block w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        {g.category}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{g.title}</h1>
      <p className="mt-3 flex items-center gap-4 text-sm text-slate-500">
        <span>{formatDate(g.publishedAt)}</span>
        <span className="flex items-center gap-1">
          <Clock className="size-4" /> {g.readMins} min read
        </span>
      </p>
      <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">{g.excerpt}</p>

      {g.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-bold">{s.heading}</h2>
          {s.paragraphs?.map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="mt-3 space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="mt-1 size-4 shrink-0 text-emerald-600" /> {b}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <p className="mt-10 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
        This guide is general information, not legal or financial advice. Rules and rates change, so
        confirm the details with a qualified professional.{" "}
        <Link href="/services" className="font-semibold text-emerald-600 hover:underline">
          Talk to our experts
        </Link>
        .
      </p>

      <h2 className="mt-12 text-xl font-bold">Keep reading</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {more.map((m) => (
          <Link
            key={m.slug}
            href={`/blog/${m.slug}`}
            className="rounded-xl border border-slate-200 p-4 hover:border-emerald-500 dark:border-slate-800"
          >
            <p className="font-semibold">{m.title}</p>
            <p className="mt-1 text-xs text-slate-500">{m.readMins} min read</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
