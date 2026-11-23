"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, CheckCircle2, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import type { Property } from "@/types/property";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900";

const roleLabel = { owner: "Owner", agent: "Agent", builder: "Builder" } as const;

export function EnquiryForm({ property: p }: { property: Property }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { iAm: "buyer", email: "", consent: false },
  });

  const onSubmit = async (data: EnquiryInput) => {
    // TODO: POST to the backend, e.g. api("/enquiries", { method: "POST", body: JSON.stringify({ propertyId: p.id, ...data }) })
    void data;
  };

  return (
    <div
      id="enquiry"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {p.postedBy.name.charAt(0)}
        </span>
        <div>
          <p className="font-semibold">{p.postedBy.name}</p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            {roleLabel[p.postedBy.role]}
            {p.verified && (
              <span className="inline-flex items-center gap-0.5 text-emerald-600">
                <BadgeCheck className="size-3.5" /> Verified
              </span>
            )}
          </p>
        </div>
      </div>

      {isSubmitSuccessful ? (
        <div
          role="status"
          className="mt-5 rounded-xl bg-emerald-50 p-5 text-center dark:bg-emerald-950/50"
        >
          <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
          <p className="mt-2 font-bold">Enquiry sent!</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {p.postedBy.name} will contact you shortly about this property.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-3">
          <h2 className="font-bold">Get phone number &amp; details</h2>
          <div>
            <input
              placeholder="Your name"
              autoComplete="name"
              className={field}
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <input
              placeholder="Mobile number"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              className={field}
              {...register("phone")}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <input
              placeholder="Email (optional)"
              type="email"
              autoComplete="email"
              className={field}
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="flex gap-4 text-sm">
            {(["buyer", "agent"] as const).map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-1.5">
                <input type="radio" value={v} className="accent-emerald-600" {...register("iAm")} />
                I&apos;m {v === "buyer" ? (p.type === "sale" ? "a buyer" : "a tenant") : "an agent"}
              </label>
            ))}
          </div>
          <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-500">
            <input type="checkbox" className="mt-0.5 accent-emerald-600" {...register("consent")} />
            I agree to be contacted by Havenly and the advertiser about this property.
          </label>
          {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            <Phone className="size-4" />
            {isSubmitting ? "Sending…" : "Contact " + roleLabel[p.postedBy.role].toLowerCase()}
          </button>
        </form>
      )}
    </div>
  );
}
