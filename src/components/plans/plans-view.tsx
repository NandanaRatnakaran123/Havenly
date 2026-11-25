"use client";

import { Check, Crown } from "lucide-react";
import { getPlan, plans } from "@/data/plans";
import { cn } from "@/lib/utils";
import { usePlan } from "@/store/plan";

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" });

export function PlansView() {
  const { hydrated, plan: current, purchases, takePlan } = usePlan();

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const isCurrent = hydrated && current === p.id;
          return (
            <section
              key={p.id}
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900",
                p.popular
                  ? "border-emerald-500"
                  : "border-slate-200 dark:border-slate-800",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  {p.popular && <Crown className="size-5 text-emerald-600" aria-hidden />}
                  {p.name}
                </h2>
                {p.popular && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500">{p.tagline}</p>

              <p className="mt-6 text-4xl font-extrabold">
                {p.price === 0 ? (
                  "Free"
                ) : (
                  <>
                    ₹{new Intl.NumberFormat("en-IN").format(p.price)}
                    <span className="ml-1 text-sm font-normal text-slate-500">/month</span>
                  </>
                )}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="size-4 shrink-0 text-emerald-600" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              {p.price === 0 ? (
                <div className="mt-6 rounded-lg border border-slate-200 py-3 text-center text-sm text-slate-500 dark:border-slate-700">
                  Included for everyone
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isCurrent}
                  onClick={() => takePlan(p.id, p.price)}
                  className="mt-6 rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-default disabled:bg-slate-200 disabled:text-slate-500 dark:disabled:bg-slate-800"
                >
                  {isCurrent ? "Current plan" : `Take ${p.name}`}
                </button>
              )}
            </section>
          );
        })}
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Recent plan purchases</h2>
        {hydrated && purchases.length > 0 ? (
          <ul className="mt-4 divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {purchases.map((x) => (
              <li key={x.id} className="flex items-center justify-between gap-4 py-3">
                <span className="font-medium">{getPlan(x.plan).name}</span>
                <span className="text-slate-500">{dateFmt.format(new Date(x.date))}</span>
                <span className="font-semibold">
                  ₹{new Intl.NumberFormat("en-IN").format(x.amount)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-slate-500">No plans taken yet.</p>
        )}
      </section>
    </>
  );
}
