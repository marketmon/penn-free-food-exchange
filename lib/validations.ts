import { meadows } from "@/lib/constants";
import * as z from "zod";

export const selectMeadowSchema = z.object({
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
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({
        message: "Invalid email",
      })
      .refine((email) => email.endsWith(domain), {
        message: `Email must be associated with ${domain}`,
      }),
    password: z
      .string()
      .refine((password) => password.length > 0, {
        message: "Password is required",
      })
      .refine((password) => password.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((password) => /[A-Z]/.test(password) && /[0-9]/.test(password), {
        message: "Password must have at least one uppercase and one number",
      }),
  });

export const verificationCodeSchema = z.object({
  verificationCode: z
    .string()
    .min(1, { message: "Verification code is required" })
    .refine((code) => /^\d{6}$/.test(code), {
      message: "Invalid verification code",
    }),
});

export const logInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const emailSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .refine((password) => password.length > 0, {
        message: "Password is required",
      })
      .refine((password) => password.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((password) => /[A-Z]/.test(password) && /[0-9]/.test(password), {
        message: "Password must have at least one uppercase and one number",
      }),
    verifyPassword: z
      .string()
      .min(1, { message: "Please verify the password" }),
  })
  .refine((data) => data.newPassword === data.verifyPassword, {
    message: "Passwords don't match",
    path: ["verifyPassword"],
  });
