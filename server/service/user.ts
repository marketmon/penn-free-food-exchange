import { WebhookRequestType } from "@/lib/types";
import { createUser, deleteUser, updateUser } from "../repository/user";

export async function createUserService(data: WebhookRequestType) {
  const {
    id,
    first_name,
    last_name,
    unsafe_metadata,
    email_addresses,
    primary_email_address_id,
  } = data;

  const firstName = first_name;
  const lastName = last_name;
  const meadow = unsafe_metadata.meadow;
  const primaryEmail = email_addresses.find(
    (email) => (email.id = primary_email_address_id)
  )!.email_address;

  await createUser(id!, firstName, lastName, meadow, primaryEmail);
}

export async function updateUserService(data: WebhookRequestType) {
  const {
    id,
    first_name,
    last_name,
    email_addresses,
    primary_email_address_id,
    phone_numbers,
    primary_phone_number_id,
  } = data;

  const firstName = first_name;
  const lastName = last_name;
  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  )!.email_address;

  let primaryPhone = phone_numbers.find(
    (phone) => phone.id === primary_phone_number_id
  )?.phone_number;

  // edge case where primary_phone_number_id is undefined but there is a verified primary phone number
  if (
    !primaryPhone &&
    phone_numbers.length > 0 &&
    phone_numbers[0].verification?.status === "verified"
  ) {
    primaryPhone = phone_numbers[0].phone_number;
  }

  await updateUser(id!, firstName, lastName, primaryEmail, primaryPhone);
}

export async function deleteUserService(data: WebhookRequestType) {
  const { id } = data;
  await deleteUser(id!);
}
