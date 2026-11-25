import { PlansView } from "@/components/plans/plans-view";

export const metadata = {
  title: "Plans",
  description:
    "Post up to 3 listings free. Upgrade to Premium or Business to list more and get priority placement.",
};

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Plans</h1>
      <p className="mt-2 mb-8 text-slate-600 dark:text-slate-400">
        Premium plans for owners, agents and builders. Taking a plan records a payment.
      </p>
      <PlansView />
    </div>
  );
}
