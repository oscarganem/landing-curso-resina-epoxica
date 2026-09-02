import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const thankYouSource = readFileSync(new URL("../client/src/pages/ThankYou.tsx", import.meta.url), "utf8");
const communityUrl = "https://chat.whatsapp.com/I5HJaRynpn9LnyFUKV45bV";

describe("Página de gracias: comunidad de WhatsApp", () => {
  it("dirige ambos CTA a la comunidad privada de WhatsApp", () => {
    expect(thankYouSource).toContain(`const whatsappCommunityUrl = "${communityUrl}"`);
    expect(thankYouSource.match(/href=\{whatsappCommunityUrl\}/g)).toHaveLength(2);
    expect(thankYouSource.match(/UNIRME AL GRUPO DE WHATSAPP/g)).toHaveLength(2);
    expect(thankYouSource).toContain("Únete al grupo");
    expect(thankYouSource).toContain("tu descuento de Preventa");
  });

  it("elimina el texto y enlace del pase individual anterior", () => {
    expect(thankYouSource).not.toContain("whatsappPassUrl");
    expect(thankYouSource).not.toContain("Solicitar mi pase GRATIS por WhatsApp");
  });
});
