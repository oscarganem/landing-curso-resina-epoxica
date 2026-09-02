import type { InsertWaitlistSignup } from "../drizzle/schema";
import { getMexicanWhatsAppParts } from "../shared/phone";

const SENDER_API_BASE_URL = "https://api.sender.net/v2";

type SenderResponse = {
  success?: boolean;
  message?: unknown;
  data?: unknown;
};

export type SenderSyncResult =
  | { synced: true }
  | { synced: false; reason: "not_configured" };

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstname = parts.shift() ?? fullName.trim();
  const lastname = parts.join(" ");
  return { firstname, lastname };
}

function getSenderConfig() {
  const token = process.env.SENDER_API_ACCESS_TOKEN?.trim();
  const groupId = process.env.SENDER_GROUP_ID?.trim();
  if (!token || !groupId) return null;
  return { token, groupId };
}

async function senderRequest(path: string, token: string, body: Record<string, unknown>) {
  return fetch(`${SENDER_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function describeSenderError(response: Response) {
  let detail = "sin detalle";
  try {
    const payload = (await response.json()) as SenderResponse;
    if (typeof payload.message === "string") detail = payload.message;
  } catch {
    // Sender may return an empty response for some errors.
  }
  return `Sender respondió ${response.status}: ${detail}`;
}

export async function syncWaitlistSignupToSender(
  signup: InsertWaitlistSignup,
  options: { triggerAutomation?: boolean } = {},
): Promise<SenderSyncResult> {
  const config = getSenderConfig();
  if (!config) return { synced: false, reason: "not_configured" };

  const { firstname, lastname } = splitFullName(signup.fullName);
  const triggerAutomation = options.triggerAutomation ?? false;
  const phoneParts = getMexicanWhatsAppParts(signup.whatsapp);
  const countryCode = signup.whatsappCountryCode ?? phoneParts.countryCode;
  const nationalNumber = signup.whatsappNationalNumber ?? phoneParts.nationalNumber;
  const subscriberPayload = {
    email: signup.email,
    firstname,
    ...(lastname ? { lastname } : {}),
    phone: signup.whatsapp,
    fields: {
      "{{country_code}}": countryCode,
      "{{whatsapp_number}}": nationalNumber,
    },
    groups: [config.groupId],
    trigger_automation: triggerAutomation,
  };

  const createResponse = await senderRequest("/subscribers", config.token, subscriberPayload);
  if (createResponse.ok) return { synced: true };

  // Sender treats an existing email as a conflict/validation response in some accounts.
  // Adding the email to the target group is safe to retry and prevents duplicate contacts.
  if (createResponse.status === 409 || createResponse.status === 422) {
    const groupResponse = await senderRequest(`/subscribers/groups/${encodeURIComponent(config.groupId)}`, config.token, {
      subscribers: [signup.email],
      trigger_automation: triggerAutomation,
    });
    if (groupResponse.ok) return { synced: true };
    throw new Error(await describeSenderError(groupResponse));
  }

  throw new Error(await describeSenderError(createResponse));
}
