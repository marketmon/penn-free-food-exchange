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

export type RequestConfig = {
  url: string;
  method: string;
};

export type DashboardFor = "view" | "manage" | "create" | "edit";

export type CurrentListing = {
  id: string;
  location: string;
  caption: string;
  contact: string;
  icon: string;
} | null;

export type ListingNavigationButton = {
  id: number;
  action: string;
  text: string;
};

export type User = {
  meadows: Meadow[];
};

export type ToggleAction = {
  action: "toggleThank" | "toggleStillThere";
};

export type ListingFromForm = {
  location: string;
  caption: string;
  contact: string;
  icon: string;
};

export type Listing = {
  id: string;
  lat: number;
  lng: number;
  location: string;
  caption: string;
  contact: string;
  icon: string;
  creatorId: string | null;
  meadowId: string;
  updatedAt: string;
  stillThere: boolean;
  stillThereUpdatedAt: string;
  usersThankedIds: string[];
};

export type Domain = { id: string; domain: string };

export type Meadow = {
  id: string;
  domain: string;
  name: string;
  lat: number;
  lng: number;
  listings: Listing[];
  userIds: string[];
};

export type FormInput = {
  name: string;
  label: string;
  type: string;
  disabled?: boolean;
};

export type Position = {
  lat: number;
  lng: number;
} | null;

export type Auth = {
  isLoaded: boolean;
  signIn?: SignIn;
  signUp?: SignUp;
  setActive: ((config: { session: string }) => Promise<void>) | undefined;
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

type PhoneVerification = {
  status: "unverified" | "verified";
};

type ClerkRequestData = {
  first_name: "string";
  last_name: "string";
  unsafe_metadata: { [key: string]: string };
  email_addresses: { id: string; email_address: string }[];
  primary_email_address_id: string;
  phone_numbers: {
    id: string;
    phone_number: string;
    verification: PhoneVerification | null;
  }[];
  primary_phone_number_id: string;
};

export type WebhookRequest = (
  | UserJSON
  | DeletedObjectJSON
  | SessionJSON
  | EmailJSON
  | SMSMessageJSON
  | OrganizationJSON
  | OrganizationMembershipJSON
  | OrganizationInvitationJSON
) &
  ClerkRequestData;
