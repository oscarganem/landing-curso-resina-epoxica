import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appSource = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const landingSource = readFileSync(new URL("../client/src/pages/MeridaLanding.tsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

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
    expect(landingSource).toContain("QUIERO INSCRIBIRME");
    expect(landingSource).toContain("VER TODA LA INFORMACIÓN");
    expect(landingSource).toContain('href="#informacion"');
    expect(landingSource).toContain('id="informacion"');
    expect(landingSource).toContain("Domingo 20 de septiembre");
    expect(landingSource).toContain("CANACINTRA");
    expect(landingSource).toContain("CANACINTRA Mérida");
    expect(landingSource).toContain("Aprenderás crear acabados: flake, granito antiderrapante, marmoleados, metálicos y 3D.");
    expect(landingSource).toContain("Manual del Aplicador PRO + Calculadora Epóxica para calcular tus materiales paso a paso.");
    expect(landingSource).not.toContain('Building2 aria-hidden="true" /> CANACINTRA');
    expect(landingSource).not.toContain('<span className="placeholder-index" aria-hidden="true">01</span>');
    expect(landingSource).not.toContain("Cancún");
    expect(landingSource).not.toContain("WaitlistModal");
  });

  it("mantiene el CTA secundario a la derecha en escritorio y lo apila solo en móvil", () => {
    expect(stylesSource).toContain(".hero-cta-group {\n  display: flex;\n  flex-wrap: nowrap;");
    expect(stylesSource).toContain(".hero-cta-group { display: grid;");
    expect(stylesSource).toContain("transform: translateY(-28px);");
    expect(stylesSource).toContain("min-height: 52px;");
  });
});
