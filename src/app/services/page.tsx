import Link from "next/link";
import { Check, FileSignature, Hammer, Scale } from "lucide-react";
import { ServiceEnquiryForm } from "@/components/services/service-enquiry-form";
import { services, type Service } from "@/data/services";

export const metadata = {
  title: "Legal, registration & building services",
  description:
    "Legal advice, property registration support and building plan & permit services from Havenly.",
};

const icons: Record<Service["id"], React.ComponentType<{ className?: string }>> = {
  legal: Scale,
  registration: FileSignature,
  building: Hammer,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Services that go <span className="text-emerald-600">beyond the listing</span>
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
        Buying, selling or building is easier with the right help. Pick a service and we will
        connect you with a verified professional.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {services.map((s) => {
            const Icon = icons[s.id];
            return (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-emerald-600 text-white">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="text-xl font-bold">{s.title}</h2>
                </div>
                <p className="mt-3 text-slate-600 dark:text-slate-400">{s.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {p}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          <p className="text-sm text-slate-500">
            Planning a home loan?{" "}
            <Link href="/finance" className="font-semibold text-emerald-600 hover:underline">
              Try our EMI and eligibility calculators.
            </Link>
          </p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-bold">Talk to an expert</h2>
            <ServiceEnquiryForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
