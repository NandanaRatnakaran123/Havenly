import { z } from "zod";

const indianPhone = z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: indianPhone,
  email: z.union([z.literal(""), z.string().email("Enter a valid email")]),
  iAm: z.enum(["buyer", "agent"]),
  consent: z.boolean().refine((v) => v, "Please agree to be contacted"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const postPropertySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: indianPhone,
  email: z.string().email("Enter a valid email"),
  role: z.enum(["owner", "agent", "builder"]),
  listingType: z.enum(["sale", "rent"]),
  category: z.enum(["apartment", "villa", "house", "plot", "commercial"]),
  city: z.string().min(1, "Select a city"),
  locality: z.string().min(2, "Enter the locality"),
  price: z.number({ error: "Enter the expected price" }).positive("Price must be greater than 0"),
  areaSqft: z.number({ error: "Enter the area" }).positive("Area must be greater than 0"),
  description: z.string().min(20, "Add at least 20 characters describing the property"),
});

export type PostPropertyInput = z.infer<typeof postPropertySchema>;

export const serviceEnquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: indianPhone,
  email: z.union([z.literal(""), z.string().email("Enter a valid email")]),
  service: z.enum(["legal", "registration", "building", "finance"]),
  message: z.string().max(500, "Keep it under 500 characters").optional(),
});

export type ServiceEnquiryInput = z.infer<typeof serviceEnquirySchema>;

export const requirementSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: indianPhone,
  email: z.union([z.literal(""), z.string().email("Enter a valid email")]),
  listingType: z.enum(["sale", "rent"]),
  category: z.enum(["apartment", "villa", "house", "plot", "commercial"]),
  city: z.string().min(1, "Select a city"),
  locality: z.string().optional(),
  budget: z
    .number({ error: "Enter your maximum budget" })
    .positive("Budget must be greater than 0"),
  notes: z.string().max(500, "Keep it under 500 characters").optional(),
});

export type RequirementInput = z.infer<typeof requirementSchema>;
