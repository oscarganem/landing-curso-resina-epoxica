import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appSource = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const landingSource = readFileSync(new URL("../client/src/pages/CancunLanding.tsx", import.meta.url), "utf8");

describe("landing de Cancún", () => {
  it("registra una ruta independiente dentro del mismo dominio", () => {
    expect(appSource).toContain('cancunCampaignPath');
    expect(appSource).toContain('path={cancunCampaignPath}');
  });

  it("no incorpora formulario, persistencia ni página de gracias", () => {
    expect(landingSource).not.toContain("WaitlistModal");
    expect(landingSource).not.toContain("trpc.");
    expect(landingSource).not.toContain("getThankYouPathForLanding");
    expect(landingSource).toContain('aria-disabled="true"');
  });
});
