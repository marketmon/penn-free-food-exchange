import { WebhookRequest } from "@/lib/types";
import { createUser, deleteUser, updateUser } from "@/server/repository/users";

export async function createUserService(payload: {
  createdUserId: string;
  firstName: string;
  lastName: string;
  primaryEmail: string;
  meadowId: string;
}) {
  const { createdUserId, firstName, lastName, primaryEmail, meadowId } =
    payload;

  return await createUser(
    createdUserId,
    firstName,
    lastName,
    primaryEmail,
    meadowId
  );
}

export async function updateUserService(data: WebhookRequest) {
  const {
    id,
    first_name,
    last_name,
    email_addresses,
    primary_email_address_id,
    phone_numbers,
  } = data;

  const firstName = first_name;
  const lastName = last_name;
  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  )!.email_address;

  let primaryPhone;

  if (
    phone_numbers.length === 1 &&
    phone_numbers[0].verification?.status === "verified"
  ) {
    primaryPhone = phone_numbers[0].phone_number;
  }

  if (
    phone_numbers.length === 2 &&
    phone_numbers[1].verification?.status === "verified"
  ) {
    primaryPhone = phone_numbers[1].phone_number;
  }

  return await updateUser(id!, firstName, lastName, primaryEmail, primaryPhone);
}

export async function deleteUserService(data: WebhookRequest) {
  const { id } = data;
  return await deleteUser(id!);
}
