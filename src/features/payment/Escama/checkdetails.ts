import { z } from "zod";

export const EGYPT_CITIES = [
  "Cairo", "Giza", "Alexandria", "Qalyubia", "Port Said", "Suez", "Luxor", "Aswan",
  "Asyut", "Beheira", "Beni Suef", "Dakahlia", "Damietta", "Fayoum", "Gharbia",
  "Ismailia", "Kafr El Sheikh", "Matruh", "Minya", "Monufia", "New Valley",
  "North Sinai", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai",

  "Tanta", "Mansoura", "Zagazig", "Sadat City", "6th of October", "New Cairo",
  "Nasr City", "Maadi", "Heliopolis", "Hurghada", "Sharm El Sheikh", "El Mahalla El Kubra",
  "Shubra El Kheima", "Banha", "Damanhur", "Faiyum", "Beni Suef", "Marsa Alam",
] as const;

const normalize = (s: string) => s.trim().toLowerCase();

export const shippingSchema = z.object({

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .refine(
      (value) => EGYPT_CITIES.some((c) => normalize(c) === normalize(value)),
      "Please choose a valid Egyptian city"
    ),

  details: z
    .string()
    .trim()
    .min(10, "Please enter a more detailed address (street, building, floor...)")
    .max(200, "Address is too long"),

  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian number (e.g. 01012345678)"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;