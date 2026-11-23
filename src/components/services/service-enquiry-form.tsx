"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { serviceEnquirySchema, type ServiceEnquiryInput } from "@/lib/validations";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900";

export function ServiceEnquiryForm({
  defaultService = "legal",
}: {
  defaultService?: ServiceEnquiryInput["service"];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ServiceEnquiryInput>({
    resolver: zodResolver(serviceEnquirySchema),
    defaultValues: { service: defaultService, email: "" },
  });

  const onSubmit = async (data: ServiceEnquiryInput) => {
    // TODO: POST to the backend, e.g. api("/service-enquiries", { method: "POST", body: JSON.stringify(data) })
    void data;
  };

  if (isSubmitSuccessful) {
    return (
      <div
        role="status"
        className="grid place-items-center rounded-xl bg-emerald-50 p-8 text-center dark:bg-emerald-950/40"
      >
        <CheckCircle2 className="size-10 text-emerald-600" />
        <p className="mt-2 font-bold">Request received!</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Our team will call you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
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
          maxLength={10}
          autoComplete="tel-national"
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
      <select aria-label="Service" className={field} {...register("service")}>
        <option value="finance">Home loan assistance</option>
        <option value="legal">Legal advice</option>
        <option value="registration">Property registration</option>
        <option value="building">Building plan &amp; permits</option>
      </select>
      <textarea
        placeholder="Anything we should know? (optional)"
        rows={3}
        className={field}
        {...register("message")}
      />
      {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Request a call back"}
      </button>
    </form>
  );
}
