import type { WaitlistSignup } from "../drizzle/schema";
import { getMexicanWhatsAppParts } from "../shared/phone";

const MAKE_EVENT_TYPE = "waitlist_signup.created";
const MAKE_CAMPAIGN = "curso-playadelcarmen-sep26";
const MAKE_CITY = "Playa del Carmen";

export type MakeWebhookResult =
  | { synced: true }
  | { synced: false; reason: "not_configured" };

export function buildMakeWaitlistPayload(signup: WaitlistSignup) {
  const phoneParts = getMexicanWhatsAppParts(signup.whatsapp);
  const countryCode = signup.whatsappCountryCode || phoneParts.countryCode;
  const nationalNumber = signup.whatsappNationalNumber || phoneParts.nationalNumber;

  return {
    event_type: MAKE_EVENT_TYPE,
    event_id: `waitlist_${signup.id}`,
    campaign: MAKE_CAMPAIGN,
    city: MAKE_CITY,
    source: "ocares_academy_landing",
    signup_id: signup.id,
    name: signup.fullName,
    email: signup.email,
    phone: signup.whatsapp,
    whatsapp: signup.whatsapp,
    country_code: countryCode,
    whatsapp_number: nationalNumber,
    registered_at: signup.createdAt.toISOString(),
  };
}

export async function sendWaitlistSignupToMake(signup: WaitlistSignup): Promise<MakeWebhookResult> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL?.trim();
  if (!webhookUrl) return { synced: false, reason: "not_configured" };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildMakeWaitlistPayload(signup)),
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new Error(`Make respondió ${response.status} al recibir el registro.`);
  }

  return { synced: true };
}
