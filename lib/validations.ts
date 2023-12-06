import * as z from "zod";
import { PhoneNumberUtil, PhoneNumber } from "google-libphonenumber";
import { Meadow } from "@/lib/types";
import { COUNTRY_CODES } from "@/lib/constants";

export const selectMeadowSchema = (meadows: Meadow[]) =>
  z.object({
    meadowInfo: z.string().refine(
      // Check if the meadow value matches any of the meadow names
      (domainInfo) => {
        if (domainInfo) {
          const domainInfoParsed = JSON.parse(domainInfo);
          return meadows.some(
            (meadow) => meadow.domain === domainInfoParsed.domain
          );
        }
      },
      {
        message: "Please select a meadow",
      }
    ),
  });

export const signUpSchema = (domain: string) =>
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

export const editProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
});

export const phoneSchema = z.object({
  phone: z
    .string()
    .refine((phone) => !COUNTRY_CODES.includes(phone), {
      message: "Please enter your phone number",
    })
    .refine(isPhoneValid, {
      message: "Invalid phone number",
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

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
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

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
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

const phoneUtil = PhoneNumberUtil.getInstance();

export function isPhoneValid(phone: string): boolean {
  // only country code means user hasn't entered an optional phone number
  if (COUNTRY_CODES.includes(phone)) {
    return true;
  }
  try {
    const phoneNumber: PhoneNumber = phoneUtil.parseAndKeepRawInput(phone);
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (error) {
    return false;
  }
}

export const listingFormSchema = z.object({
  location: z
    .string()
    .min(1, { message: "Location is required" })
    .max(30, { message: "Location must be less than 30 characters" }),
  caption: z
    .string()
    .min(1, { message: "Caption is required" })
    .max(300, { message: "Caption must be less than 300 characters" }),
  contact: z.string().refine(isPhoneValid, {
    message: "Invalid phone number",
  }),
  icon: z.string().min(1, { message: "Icon is required" }),
});
