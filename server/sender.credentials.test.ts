import { describe, expect, it } from "vitest";

describe("Credenciales de Sender", () => {
  it("autentica contra la API v2 sin exponer el token", async () => {
    const token = process.env.SENDER_API_ACCESS_TOKEN;

    expect(token).toBeTruthy();

    const response = await fetch("https://api.sender.net/v2/subscribers", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.ok).toBe(true);
  }, 15_000);

  it("encuentra el grupo destino configurado en la cuenta autenticada", async () => {
    const token = process.env.SENDER_API_ACCESS_TOKEN;
    const groupId = process.env.SENDER_GROUP_ID;

    expect(token).toBeTruthy();
    expect(groupId).toBeTruthy();

    const response = await fetch("https://api.sender.net/v2/groups", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.ok).toBe(true);

    const payload = (await response.json()) as { data?: Array<{ id?: string }> };
    expect(payload.data?.some(group => group.id === groupId)).toBe(true);
  }, 15_000);
});
