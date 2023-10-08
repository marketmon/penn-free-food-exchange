import { meadows } from "@/constants/meadows";
import * as z from "zod";

export const SignUpSelectMeadowSchema = z.object({
  meadow: z.string().refine(
    // Check if the meadow value matches any of the meadow names
    (meadow) => meadows.some((item) => item.name === meadow),
    {
      message: "Please select a meadow",
    }
  ),
});

export const SignUpSchema = (domain: string) =>
  z.object({
    email: z
      .string()
      .email({
        message: "Invalid email",
      })
      .refine((email) => email.endsWith(domain), {
        message: `Email must be associated with ${domain}`,
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((password) => /[A-Z]/.test(password) && /[0-9]/.test(password), {
        message: "Password must have at least one uppercase and one number",
      }),
  });

export const SignUpVerifySchema = z.object({
  verificationCode: z.string().refine((code) => /^\d{6}$/.test(code)),
});
