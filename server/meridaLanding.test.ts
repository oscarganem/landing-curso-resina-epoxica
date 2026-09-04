import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appSource = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const landingSource = readFileSync(new URL("../client/src/pages/MeridaLanding.tsx", import.meta.url), "utf8");

describe("landing de Mérida", () => {
  it("registra una ruta independiente dentro del mismo dominio", () => {
    expect(appSource).toContain('meridaCampaignPath');
    expect(appSource).toContain('path={meridaCampaignPath}');
  });

  it("no incorpora formulario, persistencia ni página de gracias", () => {
    expect(landingSource).not.toContain("WaitlistModal");
    expect(landingSource).not.toContain("trpc.");
    expect(landingSource).not.toContain("getThankYouPathForLanding");
    expect(landingSource).toContain('aria-disabled="true"');
  });

  it("muestra la oferta directa y la logística confirmada de Mérida", () => {
    expect(landingSource).toContain("VER PAQUETES Y ASEGURAR MI LUGAR");
    expect(landingSource).toContain("Domingo 20 de septiembre");
    expect(landingSource).toContain("CANACINTRA");
    expect(landingSource).toContain("CANACINTRA Mérida");
    expect(landingSource).toContain("Aprenderás a crear acabados profesionales");
    expect(landingSource).toContain("Manuales + Calculadora Epóxica");
    expect(landingSource).not.toContain("Cancún");
    expect(landingSource).not.toContain("WaitlistModal");
  });
});
