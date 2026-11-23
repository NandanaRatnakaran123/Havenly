import { CheckCircle2 } from "lucide-react";
import { RequirementForm } from "@/components/property/requirement-form";

export const metadata = {
  title: "Post your property requirement",
  description:
    "Tell us what you are looking for and let owners, agents and builders with matching properties contact you.",
};

const perks = [
  "Describe what you need once — we do the searching",
  "Matching owners and agents contact you directly",
  "Free for buyers and tenants",
  "Your number is shared only with relevant advertisers",
];

export default function PostRequirementPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Can&apos;t find it? <span className="text-emerald-600">Let it find you.</span>
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Post your requirement and get matching properties sent to you.
        </p>
        <ul className="mt-6 space-y-3">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <RequirementForm />
    </div>
  );
}
