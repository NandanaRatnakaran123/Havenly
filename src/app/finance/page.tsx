import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FinanceTools } from "@/components/finance/finance-tools";
import { ServiceEnquiryForm } from "@/components/services/service-enquiry-form";

export const metadata = {
  title: "Home loan EMI & eligibility calculator",
  description:
    "Estimate your monthly home loan EMI and how much you can borrow, then talk to us about finance assistance.",
};

export default function FinancePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Finance <span className="text-emerald-600">assistance</span>
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
        Plan your purchase with confidence. Work out your EMI, check how much you may be able to
        borrow, and let our team help you compare home loan offers.
      </p>

      <div className="mt-8">
        <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-900" />}>
          <FinanceTools />
        </Suspense>
      </div>

      <section className="mt-10 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-xl font-bold">Need help with a home loan?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Share your details and a loan advisor will call you to explain the options, documents
            and timelines. There is no obligation.
          </p>
          <Link
            href="/properties?type=sale"
            className="mt-4 inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Browse homes to buy <ArrowRight className="size-4" />
          </Link>
        </div>
        <ServiceEnquiryForm defaultService="finance" />
      </section>
    </div>
  );
}
