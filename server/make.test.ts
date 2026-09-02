import { afterEach, describe, expect, it, vi } from "vitest";
import { buildMakeWaitlistPayload, sendWaitlistSignupToMake } from "./make";

const signup = {
  id: 48,
  fullName: "Oscar Cárdenas",
  email: "oscar@example.com",
  whatsapp: "+525580608254",
  whatsappCountryCode: "+52",
  whatsappNationalNumber: "5580608254",
  makeWebhookSentAt: null,
  createdAt: new Date("2026-09-02T18:00:00.000Z"),
  updatedAt: new Date("2026-09-02T18:00:00.000Z"),
};

describe("Webhook de Make para registros", () => {
  const originalWebhookUrl = process.env.MAKE_WEBHOOK_URL;

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env.MAKE_WEBHOOK_URL = originalWebhookUrl;
  });

  it("construye un payload estable con los datos de ManyChat", () => {
    expect(buildMakeWaitlistPayload(signup)).toEqual({
      event_type: "waitlist_signup.created",
      event_id: "waitlist_48",
      campaign: "curso-playadelcarmen-sep26",
      city: "Playa del Carmen",
      source: "ocares_academy_landing",
      signup_id: 48,
      name: "Oscar Cárdenas",
      email: "oscar@example.com",
      phone: "+525580608254",
      whatsapp: "+525580608254",
      country_code: "+52",
      whatsapp_number: "5580608254",
      registered_at: "2026-09-02T18:00:00.000Z",
    });
  });

  it("envía el webhook una vez con el identificador estable", async () => {
    process.env.MAKE_WEBHOOK_URL = "https://hook.example.test/make";
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendWaitlistSignupToMake(signup)).resolves.toEqual({ synced: true });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://hook.example.test/make",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(buildMakeWaitlistPayload(signup)),
      }),
    );
  });

  it("no realiza llamadas cuando el webhook no está configurado", async () => {
    delete process.env.MAKE_WEBHOOK_URL;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendWaitlistSignupToMake(signup)).resolves.toEqual({ synced: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
