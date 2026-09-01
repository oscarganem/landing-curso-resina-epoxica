import { afterEach, describe, expect, it, vi } from "vitest";
import { syncWaitlistSignupToSender } from "./sender";

const signup = {
  fullName: "Oscar Cárdenas Ganem",
  email: "oscar@example.com",
  whatsapp: "+525580608254",
};

describe("syncWaitlistSignupToSender", () => {
  const originalToken = process.env.SENDER_API_ACCESS_TOKEN;
  const originalGroupId = process.env.SENDER_GROUP_ID;

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env.SENDER_API_ACCESS_TOKEN = originalToken;
    process.env.SENDER_GROUP_ID = originalGroupId;
  });

  it("crea el suscriptor en el grupo sin activar automatizaciones", async () => {
    process.env.SENDER_API_ACCESS_TOKEN = "test-token";
    process.env.SENDER_GROUP_ID = "group-123";
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(syncWaitlistSignupToSender(signup)).resolves.toEqual({ synced: true });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.sender.net/v2/subscribers",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
        body: JSON.stringify({
          email: signup.email,
          firstname: "Oscar",
          lastname: "Cárdenas Ganem",
          phone: signup.whatsapp,
          groups: ["group-123"],
          trigger_automation: false,
        }),
      }),
    );
  });

  it("agrega al grupo existente cuando Sender devuelve conflicto por correo", async () => {
    process.env.SENDER_API_ACCESS_TOKEN = "test-token";
    process.env.SENDER_GROUP_ID = "group-123";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("{}", { status: 422 }))
      .mockResolvedValueOnce(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(syncWaitlistSignupToSender(signup)).resolves.toEqual({ synced: true });

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.sender.net/v2/subscribers/groups/group-123",
      expect.objectContaining({
        body: JSON.stringify({ subscribers: [signup.email], trigger_automation: false }),
      }),
    );
  });

  it("no hace una llamada cuando la integración aún no está configurada", async () => {
    delete process.env.SENDER_API_ACCESS_TOKEN;
    delete process.env.SENDER_GROUP_ID;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(syncWaitlistSignupToSender(signup)).resolves.toEqual({ synced: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
