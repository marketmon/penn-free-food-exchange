import {
  DeletedObjectJSON,
  EmailJSON,
  OrganizationInvitationJSON,
  OrganizationJSON,
  OrganizationMembershipJSON,
  SMSMessageJSON,
  SessionJSON,
  UserJSON,
} from "@clerk/nextjs/server";

export type MeadowsType = {
  id: string,
  domain: string,
  name: string,
  latitude: number,
  longitude: number,
};

export type FormInput = {
  name: string;
  label: string;
  type: string;
};

export type SignUp = {
  create: (credentials: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    unsafeMetadata: { [key: string]: string };
  }) => Promise<any>;
  prepareEmailAddressVerification: (config: {
    strategy: "email_code";
  }) => Promise<any>;
  attemptEmailAddressVerification: (config: { code: string }) => Promise<any>;
};

export type SignIn = {
  create: (credentials: {
    identifier: string;
    strategy?: "reset_password_email_code";
    password?: string;
  }) => Promise<any>;
  attemptFirstFactor: (credentials: {
    strategy: "reset_password_email_code";
    code: string;
  }) => Promise<any>;
  resetPassword: (credentials: { password: string }) => Promise<any>;
};

type PhoneVerificationType = {
  status: "unverified" | "verified";
};

type ClerkRequestDataType = {
  first_name: "string";
  last_name: "string";
  unsafe_metadata: { [key: string]: string };
  email_addresses: { id: string; email_address: string }[];
  primary_email_address_id: string;
  phone_numbers: {
    id: string;
    phone_number: string;
    verification: PhoneVerificationType | null;
  }[];
  primary_phone_number_id: string;
};

export type WebhookRequestType = (
  | UserJSON
  | DeletedObjectJSON
  | SessionJSON
  | EmailJSON
  | SMSMessageJSON
  | OrganizationJSON
  | OrganizationMembershipJSON
  | OrganizationInvitationJSON
) &
  ClerkRequestDataType;
