"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    // TODO: send to backend: api("/contact", { method: "POST", body: JSON.stringify(data) })
    void data;
  };

  const field =
    "w-full rounded-md border border-slate-300 bg-transparent p-2 dark:border-slate-700";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input placeholder="Name" className={field} {...register("name")} />
      {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      <input placeholder="Email" className={field} {...register("email")} />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      <input placeholder="Phone (optional)" className={field} {...register("phone")} />
      <textarea placeholder="Message" rows={5} className={field} {...register("message")} />
      {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      <Button type="submit" disabled={isSubmitting}>
        Send message
      </Button>
      {isSubmitSuccessful && <p className="text-emerald-600">Thanks! We will be in touch.</p>}
    </form>
  );
}
