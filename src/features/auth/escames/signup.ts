import * as z from "zod";

const egyptPhoneRegex = /^01[0125][0-9]{8}$/;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(9, "Password must be more than 8 characters")
      .regex(/^[A-Z]/, "Password must start with an uppercase letter")
      .regex(/^[A-Z][a-z]/, "Second character must be a lowercase letter")
      .regex(/^[A-Z][a-z][#$@%^&*!]/, "Third character must be a special character (#$@%^&*!)")
      .regex(/^[A-Z][a-z][#$@%^&*!][1-9]/, "Fourth character must be a number from 1 to 9"),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(egyptPhoneRegex, "Please enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });


 export type SignUpType =z.infer<typeof registerSchema>

export default registerSchema;