import * as z from "zod";

const egyptPhoneRegex = /^01[0125][0-9]{8}$/;

export const loginSchema = z
  .object({
  
    email: z
      .string()
      .min(1, "Email is required")
      .pipe(z.email("Please enter a valid email"))
    ,
    password: z
      .string()
      .min(1, "Password is required")
      .min(9, "Password must be more than 8 characters")
      .regex(/^[A-Z]/, "Password must start with an uppercase letter")
      .regex(/^[A-Z][a-z]/, "Second character must be a lowercase letter")
      .regex(/^[A-Z][a-z][#$@%^&*!]/, "Third character must be a special character (#$@%^&*!)")
      .regex(/^[A-Z][a-z][#$@%^&*!][1-9]/, "Fourth character must be a number from 1 to 9"),

  })




 export type LoginType =z.infer<typeof loginSchema>

export default loginSchema;