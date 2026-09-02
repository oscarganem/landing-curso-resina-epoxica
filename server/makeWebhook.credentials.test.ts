import { describe, expect, it } from "vitest";

describe("Webhook de Make", () => {
  it("está configurado y responde sin activar un escenario", async () => {
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    expect(webhookUrl).toBeTruthy();

    const response = await fetch(webhookUrl!, {
      method: "HEAD",
      redirect: "manual",
    });

    // Make puede responder 405 a HEAD aunque el webhook exista. Un 404 indicaría
    // una URL inválida o eliminada, y no se aceptan errores del servidor.
    expect(response.status).not.toBe(404);
    expect(response.status).toBeLessThan(500);
  }, 15_000);
});
