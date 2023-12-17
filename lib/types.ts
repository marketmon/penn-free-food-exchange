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
import { SignInResource, SignUpResource } from "@clerk/types";

export type RequestConfig = {
  url: string;
  method: string;
};

export type DashboardFor = "view" | "manage" | "create" | "edit";

export type CurrentListing = {
  id: string;
  location: string;
  caption: string;
  contact: string | null;
  icon: string;
  imageUrl: string | null;
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
  imageUrl: string;
  creatorId: string | null;
  meadowId: string;
  updatedAt: string;
  stillThere: boolean;
  stillThereUpdatedAt: string;
  usersThankedIds: string[];
};

export type Icon = { id: string; icon: string };

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
  placeholder?: string;
  disabled?: boolean;
};

export type Position = {
  lat: number;
  lng: number;
} | null;

export type Auth = {
  isLoaded: boolean;
  signIn?: SignInResource | undefined;
  signUp?: SignUpResource | undefined;
  setActive:
    | ((config: { session: string | null }) => Promise<void>)
    | undefined;
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

export type BtnVariants =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "home";

export type WestPhillyHalloweenDataProject = {
  id: string;
  lat: number;
  long: number;
  costume: string;
  costume_category: string;
  worst: string;
  favorite: string;
  flavor_fav: string;
  type_fav: string;
  collectorName: string;
  fav_chocolate: number;
  fav_fruit: number;
  fav_caramel: number;
  fav_peanut: number;
  fav_sour: number;
  fav_gummy: number;
  fav_bar: number;
  fav_hard: number;
  fav_pieces: number;
  fav_wafer: number;
  fav_pure: number;
  timestamp: string;
};
