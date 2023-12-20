import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  createUserService,
  deleteUserService,
  updateUserService,
} from "@/server/service/users";
import { WebhookRequest } from "@/lib/types";

export async function POST(req: Request) {
  console.log('---------------------WEBHOOK---------------------')
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured - no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Server error", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;
  const data = evt.data;
  const dataTyped = data as WebhookRequest;

  console.log(eventType, data)
  let user;
  if (eventType === "user.created") {
    user = createUserService(dataTyped);
  } else if (eventType === "user.updated") {
    user = updateUserService(dataTyped);
  } else if (eventType === "user.deleted") {
    user = deleteUserService(dataTyped);
  }

  return new Response(JSON.stringify(user), {
    status: eventType === "user.created" ? 201 : 200,
  });
}
