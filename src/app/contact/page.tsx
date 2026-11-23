import { ContactForm } from "@/components/contact/contact-form";

export const metadata = {
  title: "Contact us",
  description: "Questions about a property or listing? Get in touch with the Havenly team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact us</h1>
      <ContactForm />
    </div>
  );
}
