"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { categoryLabels, cities } from "@/config/site";
import { requirementSchema, type RequirementInput } from "@/lib/validations";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function RequirementForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RequirementInput>({
    resolver: zodResolver(requirementSchema),
    defaultValues: { listingType: "sale", category: "apartment", city: "", email: "" },
  });

  const onSubmit = async (data: RequirementInput) => {
    // TODO: POST to the backend, e.g. api("/requirements", { method: "POST", body: JSON.stringify(data) })
    void data;
  };

  if (isSubmitSuccessful) {
    return (
      <div
        role="status"
        className="grid place-items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-900 dark:bg-emerald-950/40"
      >
        <CheckCircle2 className="size-14 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-bold">Requirement posted!</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Owners and agents with matching properties will contact you.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full border border-emerald-600 px-5 py-2 font-semibold text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-950"
        >
          Post another requirement
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input autoComplete="name" className={field} {...register("name")} />
        </Field>
        <Field label="Mobile number" error={errors.phone?.message}>
          <input
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            className={field}
            {...register("phone")}
          />
        </Field>
        <Field label="Email (optional)" error={errors.email?.message}>
          <input type="email" autoComplete="email" className={field} {...register("email")} />
        </Field>
        <Field label="I want to">
          <select className={field} {...register("listingType")}>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </Field>
        <Field label="Property type">
          <select className={field} {...register("category")}>
            {Object.entries(categoryLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="City" error={errors.city?.message}>
          <select className={field} {...register("city")}>
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred locality (optional)">
          <input className={field} {...register("locality")} />
        </Field>
        <Field label="Maximum budget (₹)" error={errors.budget?.message}>
          <input
            type="number"
            min={0}
            className={field}
            {...register("budget", { valueAsNumber: true })}
          />
        </Field>
      </div>
      <Field label="Anything else? (optional)" error={errors.notes?.message}>
        <textarea rows={3} className={field} {...register("notes")} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {isSubmitting ? "Posting…" : "Post my requirement"}
      </button>
    </form>
  );
}
