import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const faqSource = readFileSync(new URL("../client/src/pages/CancunFaqList.tsx", import.meta.url), "utf8");

describe("preguntas frecuentes de Cancún", () => {
  it("mantiene las opciones de precios y adapta la información de logística confirmada", () => {
    expect(faqSource).toContain("La opción de <strong>preventa cuesta $1,999</strong>");
    expect(faqSource).toContain("<strong>precio regular de $2,499</strong>");
    expect(faqSource).toContain("<strong>2 personas por $3,800</strong>");
    expect(faqSource).toContain("<strong>3 personas por $4,999</strong>");
    expect(faqSource).toContain("<strong>Cancún</strong> el <strong>19 de septiembre</strong>");
    expect(faqSource).toContain("La sede, dirección, horario y mapa se anunciarán en cuanto estén confirmados.");
    expect(faqSource).not.toContain("Mérida");
  });

  it("conserva el enlace interno hacia precios para elegir y asegurar un paquete", () => {
    expect(faqSource.match(/href="#precios"/g)).toHaveLength(2);
    expect(faqSource).toContain("Después de elegir tu paquete, presiona el botón correspondiente para continuar tu registro por WhatsApp.");
  });
});
