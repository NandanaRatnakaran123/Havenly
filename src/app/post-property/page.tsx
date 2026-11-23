import { CheckCircle2 } from "lucide-react";
import { PostPropertyForm } from "@/components/property/post-property-form";

export const metadata = {
  title: "Post your property free",
  description:
    "List your property for sale or rent on Havenly and reach thousands of buyers and tenants.",
};

const perks = [
  "100% free listing for owners",
  "Genuine enquiries sent straight to your phone",
  "Reach buyers and tenants across 10 major cities",
  "Get a Verified badge for more trust",
];

export default function PostPropertyPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Post your property <span className="text-emerald-600">for free</span>
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Tell us a few details and our team will get your listing live, then connect you with
          serious buyers and tenants.
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
      <PostPropertyForm />
    </div>
  );
}
